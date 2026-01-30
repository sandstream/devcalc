/**
 * Safe expression parser and evaluator for DevCalc.
 * NO eval() - implements tokenizer and recursive descent parser.
 * Uses BigInt for 64-bit integer precision.
 */

// Token types for the lexer
type TokenType =
  | 'NUMBER'
  | 'PLUS'
  | 'MINUS'
  | 'MULTIPLY'
  | 'DIVIDE'
  | 'MODULO'
  | 'LPAREN'
  | 'RPAREN'
  | 'EOF';

interface Token {
  type: TokenType;
  value: string;
}

// Result with all base representations
export interface CalculatorResult {
  decimal: string;
  hex: string;
  binary: string;
  octal: string;
  isInteger: boolean;
}

// Error type for calculator
export class CalculatorError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CalculatorError';
  }
}

/**
 * Tokenizer: converts expression string into tokens
 */
function tokenize(expression: string): Token[] {
  const tokens: Token[] = [];
  let pos = 0;

  const isDigit = (c: string) => /[0-9]/.test(c);
  const isHexDigit = (c: string) => /[0-9a-fA-F]/.test(c);
  const isWhitespace = (c: string) => /\s/.test(c);

  while (pos < expression.length) {
    const char = expression[pos];

    // Skip whitespace
    if (isWhitespace(char)) {
      pos++;
      continue;
    }

    // Handle numbers with different bases
    if (isDigit(char) || (char === '0' && pos + 1 < expression.length)) {
      let numStr = '';

      // Check for base prefixes: 0x (hex), 0b (binary), 0o (octal)
      if (char === '0' && pos + 1 < expression.length) {
        const nextChar = expression[pos + 1].toLowerCase();

        if (nextChar === 'x') {
          // Hexadecimal: 0x...
          pos += 2;
          while (pos < expression.length && isHexDigit(expression[pos])) {
            numStr += expression[pos];
            pos++;
          }
          if (numStr.length === 0) {
            throw new CalculatorError('Invalid hexadecimal number');
          }
          tokens.push({ type: 'NUMBER', value: '0x' + numStr });
          continue;
        } else if (nextChar === 'b') {
          // Binary: 0b...
          pos += 2;
          while (pos < expression.length && /[01]/.test(expression[pos])) {
            numStr += expression[pos];
            pos++;
          }
          if (numStr.length === 0) {
            throw new CalculatorError('Invalid binary number');
          }
          tokens.push({ type: 'NUMBER', value: '0b' + numStr });
          continue;
        } else if (nextChar === 'o') {
          // Octal: 0o...
          pos += 2;
          while (pos < expression.length && /[0-7]/.test(expression[pos])) {
            numStr += expression[pos];
            pos++;
          }
          if (numStr.length === 0) {
            throw new CalculatorError('Invalid octal number');
          }
          tokens.push({ type: 'NUMBER', value: '0o' + numStr });
          continue;
        }
      }

      // Decimal number (may include decimal point)
      let hasDecimal = false;
      while (pos < expression.length) {
        const c = expression[pos];
        if (isDigit(c)) {
          numStr += c;
          pos++;
        } else if (c === '.' && !hasDecimal) {
          hasDecimal = true;
          numStr += c;
          pos++;
        } else {
          break;
        }
      }
      tokens.push({ type: 'NUMBER', value: numStr });
      continue;
    }

    // Operators and parentheses
    switch (char) {
      case '+':
        tokens.push({ type: 'PLUS', value: '+' });
        pos++;
        break;
      case '-':
        tokens.push({ type: 'MINUS', value: '-' });
        pos++;
        break;
      case '*':
        tokens.push({ type: 'MULTIPLY', value: '*' });
        pos++;
        break;
      case '/':
        tokens.push({ type: 'DIVIDE', value: '/' });
        pos++;
        break;
      case '%':
        tokens.push({ type: 'MODULO', value: '%' });
        pos++;
        break;
      case '(':
        tokens.push({ type: 'LPAREN', value: '(' });
        pos++;
        break;
      case ')':
        tokens.push({ type: 'RPAREN', value: ')' });
        pos++;
        break;
      default:
        throw new CalculatorError(`Unexpected character: ${char}`);
    }
  }

  tokens.push({ type: 'EOF', value: '' });
  return tokens;
}

/**
 * Parser: recursive descent parser for arithmetic expressions
 * Grammar:
 *   expression -> term (('+' | '-') term)*
 *   term -> factor (('*' | '/' | '%') factor)*
 *   factor -> NUMBER | '(' expression ')' | '-' factor | '+' factor
 */
class Parser {
  private tokens: Token[];
  private pos: number;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
    this.pos = 0;
  }

  private current(): Token {
    return this.tokens[this.pos];
  }

  private advance(): Token {
    const token = this.tokens[this.pos];
    if (this.pos < this.tokens.length - 1) {
      this.pos++;
    }
    return token;
  }

  private parseNumber(value: string): number {
    // Parse number with different bases
    if (value.startsWith('0x') || value.startsWith('0X')) {
      return parseInt(value.slice(2), 16);
    } else if (value.startsWith('0b') || value.startsWith('0B')) {
      return parseInt(value.slice(2), 2);
    } else if (value.startsWith('0o') || value.startsWith('0O')) {
      return parseInt(value.slice(2), 8);
    } else {
      return parseFloat(value);
    }
  }

  private factor(): number {
    const token = this.current();

    // Unary plus
    if (token.type === 'PLUS') {
      this.advance();
      return this.factor();
    }

    // Unary minus
    if (token.type === 'MINUS') {
      this.advance();
      return -this.factor();
    }

    // Number
    if (token.type === 'NUMBER') {
      this.advance();
      return this.parseNumber(token.value);
    }

    // Parenthesized expression
    if (token.type === 'LPAREN') {
      this.advance();
      const result = this.expression();
      if (this.current().type !== 'RPAREN') {
        throw new CalculatorError('Expected closing parenthesis');
      }
      this.advance();
      return result;
    }

    throw new CalculatorError(`Unexpected token: ${token.value || token.type}`);
  }

  private term(): number {
    let left = this.factor();

    while (
      this.current().type === 'MULTIPLY' ||
      this.current().type === 'DIVIDE' ||
      this.current().type === 'MODULO'
    ) {
      const op = this.advance();
      const right = this.factor();

      switch (op.type) {
        case 'MULTIPLY':
          left = left * right;
          break;
        case 'DIVIDE':
          if (right === 0) {
            throw new CalculatorError('Division by zero');
          }
          left = left / right;
          break;
        case 'MODULO':
          if (right === 0) {
            throw new CalculatorError('Modulo by zero');
          }
          left = left % right;
          break;
      }
    }

    return left;
  }

  expression(): number {
    let left = this.term();

    while (
      this.current().type === 'PLUS' ||
      this.current().type === 'MINUS'
    ) {
      const op = this.advance();
      const right = this.term();

      if (op.type === 'PLUS') {
        left = left + right;
      } else {
        left = left - right;
      }
    }

    return left;
  }

  parse(): number {
    const result = this.expression();
    if (this.current().type !== 'EOF') {
      throw new CalculatorError(`Unexpected token: ${this.current().value}`);
    }
    return result;
  }
}

/**
 * Convert a number to all base representations
 */
export function toAllBases(value: number): CalculatorResult {
  const isInteger = Number.isInteger(value) && Number.isFinite(value);

  // For integer values, use BigInt for precise representation
  if (isInteger && Math.abs(value) <= Number.MAX_SAFE_INTEGER) {
    const bigValue = BigInt(Math.trunc(value));
    const isNegative = bigValue < 0n;
    const absValue = isNegative ? -bigValue : bigValue;

    return {
      decimal: bigValue.toString(10),
      hex: (isNegative ? '-' : '') + '0x' + absValue.toString(16).toUpperCase(),
      binary: (isNegative ? '-' : '') + '0b' + absValue.toString(2),
      octal: (isNegative ? '-' : '') + '0o' + absValue.toString(8),
      isInteger: true,
    };
  }

  // For floating point, only decimal makes sense
  return {
    decimal: value.toString(),
    hex: 'N/A',
    binary: 'N/A',
    octal: 'N/A',
    isInteger: false,
  };
}

/**
 * Evaluate an expression and return results in all bases
 */
export function evaluate(expression: string): CalculatorResult {
  const trimmed = expression.trim();
  if (trimmed === '') {
    throw new CalculatorError('Empty expression');
  }

  const tokens = tokenize(trimmed);
  const parser = new Parser(tokens);
  const result = parser.parse();

  return toAllBases(result);
}

/**
 * Parse a single number (with base prefix) and return all base representations
 */
export function parseNumber(input: string): CalculatorResult {
  const trimmed = input.trim();
  if (trimmed === '') {
    throw new CalculatorError('Empty input');
  }

  let value: number;

  if (trimmed.startsWith('0x') || trimmed.startsWith('0X')) {
    value = parseInt(trimmed.slice(2), 16);
  } else if (trimmed.startsWith('0b') || trimmed.startsWith('0B')) {
    value = parseInt(trimmed.slice(2), 2);
  } else if (trimmed.startsWith('0o') || trimmed.startsWith('0O')) {
    value = parseInt(trimmed.slice(2), 8);
  } else {
    value = parseFloat(trimmed);
  }

  if (isNaN(value)) {
    throw new CalculatorError('Invalid number');
  }

  return toAllBases(value);
}

import { describe, it, expect } from 'vitest';
import { evaluate, parseNumber, CalculatorError } from './calculator';

describe('Calculator Engine', () => {
  describe('Basic Arithmetic', () => {
    it('evaluates simple addition', () => {
      const result = evaluate('2 + 2');
      expect(result.decimal).toBe('4');
    });

    it('evaluates subtraction', () => {
      const result = evaluate('10 - 3');
      expect(result.decimal).toBe('7');
    });

    it('evaluates multiplication', () => {
      const result = evaluate('6 * 7');
      expect(result.decimal).toBe('42');
    });

    it('evaluates division', () => {
      const result = evaluate('20 / 4');
      expect(result.decimal).toBe('5');
    });

    it('evaluates modulo', () => {
      const result = evaluate('17 % 5');
      expect(result.decimal).toBe('2');
    });
  });

  describe('Operator Precedence', () => {
    it('respects multiplication over addition: 2 + 2 * 3 = 8', () => {
      const result = evaluate('2 + 2 * 3');
      expect(result.decimal).toBe('8');
    });

    it('respects division over subtraction', () => {
      const result = evaluate('10 - 6 / 2');
      expect(result.decimal).toBe('7');
    });

    it('handles parentheses: (2 + 2) * 3 = 12', () => {
      const result = evaluate('(2 + 2) * 3');
      expect(result.decimal).toBe('12');
    });

    it('handles nested parentheses', () => {
      const result = evaluate('((2 + 3) * (4 - 1))');
      expect(result.decimal).toBe('15');
    });
  });

  describe('Unary Operators', () => {
    it('handles unary minus', () => {
      const result = evaluate('-5');
      expect(result.decimal).toBe('-5');
    });

    it('handles unary plus', () => {
      const result = evaluate('+5');
      expect(result.decimal).toBe('5');
    });

    it('handles unary minus in expression', () => {
      const result = evaluate('10 + -3');
      expect(result.decimal).toBe('7');
    });

    it('handles double negative', () => {
      const result = evaluate('--5');
      expect(result.decimal).toBe('5');
    });
  });

  describe('Hexadecimal Input (0x prefix)', () => {
    it('parses 0xFF as 255', () => {
      const result = evaluate('0xFF');
      expect(result.decimal).toBe('255');
    });

    it('parses 0x10 as 16', () => {
      const result = evaluate('0x10');
      expect(result.decimal).toBe('16');
    });

    it('parses hex in arithmetic', () => {
      const result = evaluate('0xFF + 1');
      expect(result.decimal).toBe('256');
    });

    it('handles lowercase hex', () => {
      const result = evaluate('0xab');
      expect(result.decimal).toBe('171');
    });
  });

  describe('Binary Input (0b prefix)', () => {
    it('parses 0b1010 as 10', () => {
      const result = evaluate('0b1010');
      expect(result.decimal).toBe('10');
    });

    it('parses 0b11111111 as 255', () => {
      const result = evaluate('0b11111111');
      expect(result.decimal).toBe('255');
    });

    it('parses binary in arithmetic', () => {
      const result = evaluate('0b100 + 0b100');
      expect(result.decimal).toBe('8');
    });
  });

  describe('Octal Input (0o prefix)', () => {
    it('parses 0o10 as 8', () => {
      const result = evaluate('0o10');
      expect(result.decimal).toBe('8');
    });

    it('parses 0o777 as 511', () => {
      const result = evaluate('0o777');
      expect(result.decimal).toBe('511');
    });

    it('parses octal in arithmetic', () => {
      const result = evaluate('0o10 * 2');
      expect(result.decimal).toBe('16');
    });
  });

  describe('Base Conversion Output', () => {
    it('converts 255 to all bases', () => {
      const result = evaluate('255');
      expect(result.decimal).toBe('255');
      expect(result.hex).toBe('0xFF');
      expect(result.binary).toBe('0b11111111');
      expect(result.octal).toBe('0o377');
      expect(result.isInteger).toBe(true);
    });

    it('converts 0xFF to show 255 in decimal', () => {
      const result = evaluate('0xFF');
      expect(result.decimal).toBe('255');
      expect(result.hex).toBe('0xFF');
    });

    it('handles negative numbers in all bases', () => {
      const result = evaluate('-16');
      expect(result.decimal).toBe('-16');
      expect(result.hex).toBe('-0x10');
      expect(result.binary).toBe('-0b10000');
      expect(result.octal).toBe('-0o20');
    });

    it('marks floating point as non-integer', () => {
      const result = evaluate('5 / 2');
      expect(result.decimal).toBe('2.5');
      expect(result.hex).toBe('N/A');
      expect(result.binary).toBe('N/A');
      expect(result.octal).toBe('N/A');
      expect(result.isInteger).toBe(false);
    });
  });

  describe('parseNumber function', () => {
    it('parses decimal number', () => {
      const result = parseNumber('42');
      expect(result.decimal).toBe('42');
    });

    it('parses hex number', () => {
      const result = parseNumber('0xFF');
      expect(result.decimal).toBe('255');
    });

    it('parses binary number', () => {
      const result = parseNumber('0b1010');
      expect(result.decimal).toBe('10');
    });

    it('parses octal number', () => {
      const result = parseNumber('0o77');
      expect(result.decimal).toBe('63');
    });
  });

  describe('Error Handling', () => {
    it('throws on empty expression', () => {
      expect(() => evaluate('')).toThrow(CalculatorError);
    });

    it('throws on whitespace only', () => {
      expect(() => evaluate('   ')).toThrow(CalculatorError);
    });

    it('throws on invalid character', () => {
      expect(() => evaluate('2 @ 3')).toThrow(CalculatorError);
    });

    it('throws on mismatched parentheses', () => {
      expect(() => evaluate('(2 + 3')).toThrow(CalculatorError);
    });

    it('throws on division by zero', () => {
      expect(() => evaluate('5 / 0')).toThrow(CalculatorError);
    });

    it('throws on modulo by zero', () => {
      expect(() => evaluate('5 % 0')).toThrow(CalculatorError);
    });

    it('throws on invalid hex', () => {
      expect(() => evaluate('0x')).toThrow(CalculatorError);
    });

    it('throws on invalid binary', () => {
      expect(() => evaluate('0b')).toThrow(CalculatorError);
    });

    it('throws on invalid octal', () => {
      expect(() => evaluate('0o')).toThrow(CalculatorError);
    });
  });

  describe('Complex Expressions', () => {
    it('evaluates complex expression with mixed bases', () => {
      const result = evaluate('0xFF - 0b1111 - 0o17');
      // 255 - 15 - 15 = 225
      expect(result.decimal).toBe('225');
    });

    it('evaluates long expression', () => {
      const result = evaluate('1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10');
      expect(result.decimal).toBe('55');
    });

    it('handles deeply nested parentheses', () => {
      const result = evaluate('(((((5)))))');
      expect(result.decimal).toBe('5');
    });
  });

  describe('Bitwise Operations', () => {
    describe('Bitwise AND (&)', () => {
      it('evaluates 42 & 15 as 10', () => {
        const result = evaluate('42 & 15');
        expect(result.decimal).toBe('10');
      });

      it('evaluates 0xFF & 0x0F as 15', () => {
        const result = evaluate('0xFF & 0x0F');
        expect(result.decimal).toBe('15');
      });

      it('evaluates "42 AND 15" word syntax as 10', () => {
        const result = evaluate('42 AND 15');
        expect(result.decimal).toBe('10');
      });
    });

    describe('Bitwise OR (|)', () => {
      it('evaluates 42 | 15 as 47', () => {
        const result = evaluate('42 | 15');
        expect(result.decimal).toBe('47');
      });

      it('evaluates 0xF0 | 0x0F as 255', () => {
        const result = evaluate('0xF0 | 0x0F');
        expect(result.decimal).toBe('255');
      });

      it('evaluates "8 OR 4" word syntax as 12', () => {
        const result = evaluate('8 OR 4');
        expect(result.decimal).toBe('12');
      });
    });

    describe('Bitwise XOR (^)', () => {
      it('evaluates 42 ^ 15 as 37', () => {
        const result = evaluate('42 ^ 15');
        expect(result.decimal).toBe('37');
      });

      it('evaluates 0xFF ^ 0x0F as 240', () => {
        const result = evaluate('0xFF ^ 0x0F');
        expect(result.decimal).toBe('240');
      });

      it('evaluates "42 XOR 15" word syntax as 37', () => {
        const result = evaluate('42 XOR 15');
        expect(result.decimal).toBe('37');
      });
    });

    describe('Bitwise NOT (~)', () => {
      it('evaluates ~0 as -1', () => {
        const result = evaluate('~0');
        expect(result.decimal).toBe('-1');
      });

      it('evaluates ~255 as -256', () => {
        const result = evaluate('~255');
        expect(result.decimal).toBe('-256');
      });

      it('evaluates "NOT 0" word syntax as -1', () => {
        const result = evaluate('NOT 0');
        expect(result.decimal).toBe('-1');
      });
    });

    describe('Left Shift (<<)', () => {
      it('evaluates 1 << 4 as 16', () => {
        const result = evaluate('1 << 4');
        expect(result.decimal).toBe('16');
      });

      it('evaluates 8 << 2 as 32', () => {
        const result = evaluate('8 << 2');
        expect(result.decimal).toBe('32');
      });

      it('evaluates "1 SHL 4" word syntax as 16', () => {
        const result = evaluate('1 SHL 4');
        expect(result.decimal).toBe('16');
      });
    });

    describe('Right Shift (>>)', () => {
      it('evaluates 16 >> 2 as 4', () => {
        const result = evaluate('16 >> 2');
        expect(result.decimal).toBe('4');
      });

      it('evaluates 255 >> 4 as 15', () => {
        const result = evaluate('255 >> 4');
        expect(result.decimal).toBe('15');
      });

      it('evaluates "16 SHR 2" word syntax as 4', () => {
        const result = evaluate('16 SHR 2');
        expect(result.decimal).toBe('4');
      });
    });

    describe('Bitwise Operator Precedence', () => {
      it('respects precedence: 1 | 2 ^ 3 & 4 evaluates correctly', () => {
        // & has higher precedence than ^, which has higher precedence than |
        // 3 & 4 = 0, then 2 ^ 0 = 2, then 1 | 2 = 3
        const result = evaluate('1 | 2 ^ 3 & 4');
        expect(result.decimal).toBe('3');
      });

      it('respects shift vs arithmetic precedence: 1 + 1 << 2 = 8', () => {
        // + has higher precedence than <<
        // 1 + 1 = 2, then 2 << 2 = 8
        const result = evaluate('1 + 1 << 2');
        expect(result.decimal).toBe('8');
      });

      it('handles parentheses with bitwise ops', () => {
        const result = evaluate('(1 | 2) << 2');
        expect(result.decimal).toBe('12');
      });
    });

    describe('Mixed Bitwise and Arithmetic', () => {
      it('evaluates (10 + 5) & 0xF as 15', () => {
        const result = evaluate('(10 + 5) & 0xF');
        expect(result.decimal).toBe('15');
      });

      it('evaluates complex mixed expression', () => {
        const result = evaluate('(0xFF & 0xF0) >> 4');
        // 0xFF & 0xF0 = 0xF0 = 240, 240 >> 4 = 15
        expect(result.decimal).toBe('15');
      });
    });

    describe('Word Syntax Case Insensitivity', () => {
      it('handles lowercase "and"', () => {
        const result = evaluate('42 and 15');
        expect(result.decimal).toBe('10');
      });

      it('handles mixed case "And"', () => {
        const result = evaluate('42 And 15');
        expect(result.decimal).toBe('10');
      });

      it('handles lowercase "or"', () => {
        const result = evaluate('8 or 4');
        expect(result.decimal).toBe('12');
      });

      it('handles lowercase "xor"', () => {
        const result = evaluate('42 xor 15');
        expect(result.decimal).toBe('37');
      });

      it('handles lowercase "not"', () => {
        const result = evaluate('not 0');
        expect(result.decimal).toBe('-1');
      });

      it('handles lowercase "shl"', () => {
        const result = evaluate('1 shl 4');
        expect(result.decimal).toBe('16');
      });

      it('handles lowercase "shr"', () => {
        const result = evaluate('16 shr 2');
        expect(result.decimal).toBe('4');
      });
    });
  });
});

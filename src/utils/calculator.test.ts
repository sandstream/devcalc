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
});

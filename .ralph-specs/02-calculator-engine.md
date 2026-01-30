# Calculator Engine

Create a safe expression parser and evaluator that handles arithmetic and base conversions.

## Requirements
- Parse arithmetic expressions (+, -, *, /, %, parentheses)
- Support hex (0x), binary (0b), octal (0o) input prefixes
- Use BigInt for integer precision (64-bit support)
- NO eval() - implement safe tokenizer/parser
- Return results in all bases: decimal, hex, binary, octal

## E2E Test
Write test in `e2e/calculator.spec.ts` that verifies:
- "2 + 2" returns 4
- "0xFF" shows 255 in decimal
- "255" shows 0xFF in hex

## Done when
- [ ] Build passes
- [ ] Can evaluate "2 + 2 * 3" = 8
- [ ] Can parse hex/bin/oct prefixes
- [ ] Results available in all bases

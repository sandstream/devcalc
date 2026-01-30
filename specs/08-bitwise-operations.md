# Bitwise Operations

Add support for bitwise operators in expressions.

## Requirements
- Support AND (&), OR (|), XOR (^), NOT (~)
- Support left shift (<<) and right shift (>>)
- Allow word syntax: "42 AND 15" or "42 & 15"
- Show bit-level result visualization (optional)

## E2E Test
Write test in `e2e/bitwise.spec.ts` that verifies:
- "42 ^ 15" equals 37
- "0xFF & 0x0F" equals 15
- "1 << 4" equals 16

## Done when
- [ ] Build passes
- [ ] All bitwise operators work
- [ ] Word and symbol syntax both work

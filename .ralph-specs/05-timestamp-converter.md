# Timestamp Converter

Add unix timestamp to human-readable date conversion and vice versa.

## Requirements
- Detect when input looks like a timestamp (10 or 13 digits)
- Show human-readable date in UTC and local timezone
- Support both seconds (10 digits) and milliseconds (13 digits)
- Show "now" button to insert current timestamp
- Format: "YYYY-MM-DD HH:mm:ss"

## E2E Test
Write test in `e2e/timestamp.spec.ts` that verifies:
- "1706612400" shows date "2024-01-30"
- "now" button inserts current timestamp

## Done when
- [ ] Build passes
- [ ] Timestamps auto-detected and converted
- [ ] Both seconds and milliseconds work

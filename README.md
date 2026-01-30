# DevCalc 🧮

A developer-focused calculator with live base conversion, timestamp tools, and bitwise operations.

**🔗 Live Demo:** https://devcalc-sigma.vercel.app

---

## 🔥 Built with Ralph Inferno - One Shot

This entire project was generated autonomously by [Ralph Inferno](https://github.com/sandstream/ralph-inferno) in **34 minutes**.

**The prompt:** "I want a calculator"

**The result:**

```
🎉 RALPH COMPLETE!
┌─────────────────────────────────────────────────────────────┐
│                      RALPH STATUS                           │
├─────────────────────────────────────────────────────────────┤
│ 📊 Progress: 10/10 specs  ████████████████████  100%        │
│ ⏹️  Status:   COMPLETED                                     │
│ ⏱️  Total time: ~34 minutes                                 │
├─────────────────────────────────────────────────────────────┤
│ Results:                                                    │
│   ✅ 10 specs completed                                     │
│   ⚠️  1 had issues (but passed after retry)                 │
│   ✅ All E2E tests passing                                  │
└─────────────────────────────────────────────────────────────┘
```

---

## ✨ Features

- **Live Base Conversion** - See hex/dec/bin/oct simultaneously
- **Unix Timestamp ↔️ Human Date** - Instant conversion
- **Basic Arithmetic** - Standard calculator operations
- **Bitwise Operations** - AND, OR, XOR, shifts
- **Copy to Clipboard** - One-click copy any value
- **Keyboard Navigation** - Full keyboard support
- **Persistent History** - Saved in localStorage
- **Dark/Light Theme** - System-aware theming

---

## 🏗️ Project Structure

```
src/
├── App.tsx                    # Main app component
├── main.tsx                   # Entry point
├── components/
│   ├── ResultsDisplay.tsx     # Multi-base output
│   ├── TimestampDisplay.tsx   # Unix timestamp converter
│   ├── HistoryPanel.tsx       # Persistent history
│   ├── ThemeToggle.tsx        # Dark/light theme switch
│   └── Toast.tsx              # Copy feedback
├── hooks/
│   ├── useDebounce.ts         # Input debouncing
│   ├── useTheme.ts            # Theme management
│   ├── useClipboard.ts        # Copy to clipboard
│   └── useHistory.ts          # localStorage history
└── utils/
    ├── calculator.ts          # Safe expression parser
    ├── calculator.test.ts     # Unit tests
    └── timestamp.ts           # Timestamp utilities
```

---

## 🧪 Testing

10 E2E test suites, all passing:

- ✅ smoke.spec.ts
- ✅ calculator.spec.ts
- ✅ input.spec.ts
- ✅ display.spec.ts
- ✅ timestamp.spec.ts
- ✅ clipboard.spec.ts
- ✅ keyboard.spec.ts
- ✅ bitwise.spec.ts
- ✅ history.spec.ts
- ✅ theme.spec.ts

---

## 🚀 Run Locally

```bash
npm install
npm run dev
```

---

## 📋 Specs Completed

Ralph generated and executed these specs autonomously:

1. **01-project-setup** - Vite + React + TypeScript + Tailwind
2. **02-calculator-engine** - Safe expression parser
3. **03-input-component** - Expression input with validation
4. **04-display-component** - Multi-base results display
5. **05-timestamp-converter** - Unix ↔️ human date
6. **06-copy-to-clipboard** - Clipboard integration
7. **07-keyboard-navigation** - Full keyboard support
8. **08-bitwise-operations** - AND, OR, XOR, shifts
9. **09-persistent-history** - localStorage history
10. **10-dark-light-theme** - Theme switching

---

## 🤖 About Ralph Inferno

Ralph Inferno is an autonomous development workflow that turns ideas into production-ready code while you sleep (or grab coffee).

**Try it yourself:**
```bash
npx ralph-inferno install
claude
/ralph:idea "your app idea"
```

GitHub: https://github.com/sandstream/ralph-inferno

---

*Built autonomously. Deployed to production. No manual coding required.* 🔥

# DevCalc - Product Requirements Document

## Executive Summary

DevCalc är en modern, keyboard-first webkalkylator byggd för utvecklare. Den erbjuder instant hex/dec/bin/oct-konvertering, unix timestamp-hantering, och bitwise operations - allt med en clean, 2024-värdig design. Till skillnad från mobila appar eller macOS-specifika verktyg fungerar DevCalc överallt via webben.

## Vision & Problem Statement

**Problem:** Utvecklare behöver ofta konvertera mellan talsystem (hex, binary, decimal), hantera unix timestamps, eller utföra bitwise operations. Nuvarande lösningar är antingen:
- Daterade (Windows Calculator ser ut som 2005)
- Plattformslåsta (Raycast = macOS only)
- Fragmenterade (olika verktyg för olika uppgifter)
- Slow (Google = ny tab, vänta på sökresultat)

**Vision:** En snabb, snygg, keyboard-first webapp som utvecklare har öppen i en tab hela dagen. "Spotlight för utvecklare" - instant results utan att lämna flow state.

## Market Analysis

### Competitive Landscape

| Konkurrent | Typ | Styrkor | Svagheter |
|------------|-----|---------|-----------|
| **Raycast** | macOS app | Fantastisk UX, keyboard-first, extensions | macOS only, kräver installation |
| **Soulver** | Native app | Natural language, text+calc hybrid | $35+, Apple only, inte dev-fokuserad |
| **calc.penjee.com** | Webb | 64-bit, bitwise ops | Daterad UI, ingen history |
| **BitCalculator** | Android | Gratis, visar alla baser | Mobile only, basic |
| **Windows Calc** | Desktop | Inbyggd, programmer mode | Windows only, clunky UI |
| **Google** | Webb | Alltid tillgänglig | Ny tab, ingen history, basic |

### Market Opportunity

**Gap:** Det finns ingen modern, snabb, keyboard-first web-baserad developer calculator.

- Webb = fungerar på alla OS utan installation
- Keyboard-first = snabbare än point-and-click
- Modern UI = trevligt att använda dagligen
- History = återanvänd tidigare beräkningar

## Target Users

### Primary Persona: Dev Dana

| Attribut | Beskrivning |
|----------|-------------|
| **Demografi** | 28 år, frontend-utvecklare, jobbar remote |
| **Tech Comfort** | High |
| **Goals** | Snabbt konvertera hex-färger, debugga timestamps, stanna i flow |
| **Pains** | Googla varje gång → ny tab → tappar fokus → frustrerad |
| **Current Solution** | Google, macOS calc, random websites |
| **Trigger** | Tröttnat på att öppna nya tabbar mitt i kodning |
| **Quote** | "Jag vill bara ha svaret, inte 10 blue links" |

### Secondary Persona: Student Sam

| Attribut | Beskrivning |
|----------|-------------|
| **Demografi** | 22 år, CS-student |
| **Tech Comfort** | Medium-High |
| **Goals** | Förstå hur binär/hex fungerar, övning inför tentamen |
| **Pains** | Svårt visualisera bit-operationer, daterade universitetverktyg |
| **Current Solution** | Windows Calculator programmer mode |
| **Trigger** | Behöver bättre verktyg för kurslabb |
| **Quote** | "Jag fattar inte bitwise XOR - kan jag se det visuellt?" |

### Tertiary Persona: DevOps Derek

| Attribut | Beskrivning |
|----------|-------------|
| **Demografi** | 35 år, infrastructure engineer |
| **Tech Comfort** | Very High |
| **Goals** | Unix timestamps, memory calculations snabbt |
| **Pains** | CLI-verktyg är obekväma för snabba lookups |
| **Current Solution** | `date` command, Python one-liners |
| **Trigger** | Vill ha något snabbare än att skriva scripts |

## User Journeys

### Journey 1: Quick Hex Conversion

```
Trigger: Ser hex-färg i design spec (#1A2B3C)
─────────────────────────────────────────────
1. Cmd+Tab till DevCalc (redan öppen tab)
2. Börjar skriva "1A2B3C"
3. Ser direkt: dec, bin, RGB (26, 43, 60)
4. Cmd+C kopierar resultatet
─────────────────────────────────────────────
Success: Har värden på <3 sekunder
```

### Journey 2: Timestamp Debug

```
Trigger: Ser unix timestamp i loggar (1706612400)
─────────────────────────────────────────────
1. Öppnar DevCalc
2. Klistrar in timestamp
3. Ser: "2024-01-30 10:00:00 UTC"
4. Kan justera timezone
─────────────────────────────────────────────
Success: Vet exakt när eventet hände
```

### Journey 3: Bitwise Operation

```
Trigger: Behöver beräkna 42 XOR 15
─────────────────────────────────────────────
1. Skriver "42 XOR 15" eller "42 ^ 15"
2. Ser resultat: 37
3. Ser alla baser: 0x25, 0b100101, 37
─────────────────────────────────────────────
Success: Förstår resultatet direkt
```

### Journey 4: Return Visit

```
Trigger: Kommer tillbaka nästa dag
─────────────────────────────────────────────
1. Öppnar DevCalc
2. Ser history från igår
3. Klickar på tidigare beräkning
4. Modifierar och kör igen
─────────────────────────────────────────────
Success: Slipper skriva om samma sak
```

## Feature Requirements

### Must Have (MVP)

| # | Feature | Description | Acceptance Criteria |
|---|---------|-------------|---------------------|
| 1 | **Live Base Conversion** | Visa hex/dec/bin/oct samtidigt vid input | Skriver "255" → ser 0xFF, 0b11111111, 0o377 live |
| 2 | **Unix Timestamp** | Konvertera timestamp ↔ human readable | 1706612400 → "2024-01-30 10:00:00" och vice versa |
| 3 | **Basic Arithmetic** | +, -, *, /, %, parenteser | Standard calc funktionalitet |
| 4 | **Keyboard Input** | Fungera helt utan mus | Tab, Enter, arrow keys, shortcuts |
| 5 | **Copy to Clipboard** | Kopiera resultat med ett klick/shortcut | Cmd+C eller klick → kopierat |
| 6 | **Responsive Design** | Fungera på desktop och tablet | Inga horisontella scrollbars, touch-friendly |

### Should Have

| # | Feature | Description |
|---|---------|-------------|
| 7 | **Bitwise Operations** | AND, OR, XOR, NOT, shifts (<<, >>) |
| 8 | **Persistent History** | Sparas i localStorage mellan sessions |
| 9 | **Dark/Light Theme** | System preference + manual toggle |
| 10 | **Keyboard Shortcuts** | Cmd+K command palette style |

### Could Have

| # | Feature | Description |
|---|---------|-------------|
| 11 | Color picker | Hex ↔ RGB ↔ HSL conversion |
| 12 | Help overlay | Visa alla keyboard shortcuts |
| 13 | PWA support | Installera som app, offline |
| 14 | Export history | Kopiera/ladda ner som text |

### Won't Have (v1)

| Feature | Reason |
|---------|--------|
| Natural language input | Scope creep, complex parsing |
| Base64/JSON tools | Different product |
| User accounts/sync | Overkill för MVP |
| Mobile-first design | Desktop är primary use case |

## Technical Architecture

### Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Framework** | React 18 + Vite | Fast dev, great DX, portfolio-worthy |
| **Language** | TypeScript | Type safety, better tooling |
| **Styling** | Tailwind CSS | Rapid iteration, design tokens |
| **State** | React useState/useReducer | Simple app, no Redux needed |
| **Storage** | localStorage | History persistence, no backend |
| **Big Numbers** | Native BigInt | 64-bit integer support |
| **Testing** | Vitest + Playwright | Unit + E2E coverage |
| **Hosting** | Vercel | Free tier, instant deploys |

### System Diagram

```
┌─────────────────────────────────────────────────────┐
│                    Browser                          │
├─────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│  │   Input     │  │  Calculator │  │   Display   │ │
│  │  Component  │──│    Engine   │──│  Component  │ │
│  └─────────────┘  └─────────────┘  └─────────────┘ │
│         │                │                │        │
│         ▼                ▼                ▼        │
│  ┌─────────────────────────────────────────────┐   │
│  │              React State                     │   │
│  │  (input, result, history, theme)            │   │
│  └─────────────────────────────────────────────┘   │
│                        │                           │
│                        ▼                           │
│  ┌─────────────────────────────────────────────┐   │
│  │              localStorage                    │   │
│  │  (history, preferences)                     │   │
│  └─────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

### Key Technical Decisions

1. **No eval()** - Använd säker expression parser (math.js eller custom)
2. **BigInt för precision** - Undvik JavaScript number limitations
3. **Debounced input** - Beräkna live men inte på varje keystroke
4. **Keyboard event handling** - useHotkeys eller liknande

### Technical Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| BigInt edge cases | Low | Medium | Comprehensive test suite |
| Keyboard conflicts | Low | Low | Use standard shortcuts |
| Mobile UX | Medium | Low | Desktop-first, mobile acceptable |

## Security & Compliance

| Area | Requirement | Implementation |
|------|-------------|----------------|
| **Data Storage** | Client-only | All data in localStorage |
| **User Data** | None collected | No analytics in MVP |
| **XSS Prevention** | Sanitize input | No eval(), proper escaping |
| **GDPR** | N/A | No personal data |
| **CSP** | Strict policy | Vercel default + custom headers |

## Design Guidelines

### Visual Design

- **Style**: Clean, minimal, developer-aesthetic
- **Colors**: Dark theme default, high contrast
- **Typography**: Monospace for numbers (JetBrains Mono / Fira Code)
- **Spacing**: Generous, breathable
- **Inspiration**: Raycast, Linear, Vercel dashboard

### Color Tokens

```css
/* Dark theme (default) */
--bg-primary: #0a0a0a;
--bg-secondary: #1a1a1a;
--text-primary: #fafafa;
--text-secondary: #a0a0a0;
--accent: #3b82f6;
--success: #22c55e;
--error: #ef4444;

/* Light theme */
--bg-primary: #ffffff;
--bg-secondary: #f5f5f5;
--text-primary: #0a0a0a;
--text-secondary: #6b7280;
```

## Success Metrics

| Metric | Target | How to Measure |
|--------|--------|----------------|
| **Build Success** | 100% | CI/CD green |
| **E2E Tests Pass** | 100% | Playwright suite |
| **Lighthouse Score** | >90 | Lighthouse CI |
| **Personal Use** | Daily | Do I actually use it? |

## Open Questions

*Alla frågor från PROJECT-BRIEF har besvarats:*

| Original Question | Answer |
|-------------------|--------|
| Tech stack? | React + Vite + TypeScript + Tailwind |
| PWA från start? | Could have, inte must |
| BigInt? | Ja, native BigInt |
| Keyboard shortcuts? | Standard: Cmd+K, Cmd+C, etc |
| History persist? | Ja, localStorage |
| Monetization? | N/A - portfolio project |

## Appendix

### From PROJECT-BRIEF

Se `docs/PROJECT-BRIEF.md` för original brainstorm inkluderande:
- 5 Whys analys
- Crazy 8s varianter
- Competitor mashups
- SCAMPER insights

### Research Sources

- [Raycast vs Alfred comparison](https://www.raycast.com/raycast-vs-alfred)
- [Soulver pricing and features](https://soulver.app/)
- [Penjee Programmer Calculator](https://calc.penjee.com/)

---

*Generated by Ralph Analyst Mode*
*Next step: /ralph:plan to create implementation specs*

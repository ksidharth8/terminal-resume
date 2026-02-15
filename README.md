# Terminal Resume — Interactive CLI Portfolio

An interactive, browser-based terminal that showcases my resume through a command-line interface.

Built to demonstrate system design thinking, command architecture, AI grounding, and frontend engineering — not just visual creativity.

---

## Overview

Terminal Resume is a fully interactive CLI-inspired portfolio built using Next.js and TypeScript.

It replicates real shell behavior including:

- Command parsing
- Autocomplete (Tab cycling)
- History navigation (↑ ↓)
- Theme switching
- Manual pages (`man`)
- Typo suggestions
- Session persistence
- Interactive CLI forms (`contact`)
- Grounded AI assistant (`ask`)

The project is designed with clean separation of concerns and modular architecture.

---

## Key Features

### Interactive CLI Engine
- Command registry system
- Structured parser
- Context-based execution model
- Modular command metadata
- Interactive state machine support

### Interactive Contact Command

A fully inquirer-style CLI contact form:

```
contact
? Name:
? Email:
? Message:
? Confirm send? (y/n)
```


#### Features:
- True inline validation (field-level validation before proceeding)
- No API call until data is valid
- ESC key support to cancel interaction
- Async sending with real-time status replacement
- HTML email template (modern dark UI)
- Optional LinkedIn redirect after submission

#### Architecture:
- Interactive flow isolated from terminal engine
- State-driven multi-step wizard
- No UI duplication between prompt and history
- Clean separation of active input vs finalized output

### Theme System
- Dracula
- Nord
- Gruvbox
- Solarized
- Tokyo Night
- Default

Theme changes persist across sessions.

### AI-Powered `ask` Command
- Fully grounded in structured JSON resume data
- No hallucination policy
- Strict prompt constraints
- Deterministic low-temperature generation
- Clickable link rendering
- Markdown-resistant formatting layer

Example:
```

ask What projects has he built with repo links

```

### Manual Pages
Unix-style manual system:
```

man
man projects
man ask

```

### Autocomplete
- First-word completion
- Second-word completion
- Flag completion
- Cycling support

### Typo Suggestions
```

projecs
→ Did you mean: projects ?

```

### Session Persistence
- Theme persistence (localStorage)
- History persistence
- Boot sequence session control

---

## Architecture

```

src/
├── app/                 # Next.js App Router
├── components/terminal/ # UI layer
├── core/terminal/       # CLI engine
│   ├── ai/              # AI grounding & formatting
│   ├── commands/        # Command modules
|   ├── interactive/     # Interactive CLI flows (contact)
│   ├── utils/           # Suggestion logic
│   ├── parser.ts        # Input parser
│   ├── output.tsx       # Output rendering engine
│   ├── themes.ts        # Theme system
│   └── types.ts         # Shared types
└── data/                # Structured resume JSON

```

### Design Principles

- Separation of data and logic
- Theme-aware rendering
- No hardcoded resume content in commands
- Strict AI grounding
- Minimal global state
- Modular extensibility

---

## Tech Stack

- Next.js (App Router)
- TypeScript
- React
- Tailwind CSS
- Vercel (deployment)

AI:
- Structured prompt injection
- Resume-context grounding
- Deterministic inference

---

## Commands

```

man              # List all commands
about            # Profile summary
education        # Academic background
projects         # View projects
skills           # Technical skills
experience       # Engineering experience
achievements     # Awards & ranks
socials          # External links
contact          # Send message via interactive CLI form
theme <name>     # Switch theme
repo             # Open repository
ask <question>   # AI-powered resume query
clear            # Clear terminal

```

---

## Why This Project Exists

This is not a gimmick portfolio.

It demonstrates:

- Command architecture design
- Clean UI-state separation
- Interactive state machine implementation
- Context-driven execution
- Prompt engineering with grounding
- Defensive AI integration
- UX polish without over-engineering

It reflects how I think about building systems.

---

## Local Development

```bash
git clone https://github.com/ksidharth8/terminal-resume
cd terminal-resume
npm install
npm run dev
```

---

## Deployment

Optimized for Vercel deployment.

No server required.

---

## Future Enhancements

* AI answer caching
* Structured response modes
* Multi-session persistence
* Extended flag support
* Arrow-key interactive selection
* Loading spinner animation
* Enhanced accessibility support

---

## Author

Kumar Sidharth

GitHub: [https://github.com/ksidharth8](https://github.com/ksidharth8)

---

## License MIT License
[License](LICENSE)
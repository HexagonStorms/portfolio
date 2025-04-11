# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands
- No formal build system detected
- To serve locally: Use a simple HTTP server (e.g., `python -m http.server` or `npx serve`)
- No lint or test commands identified

## Code Style Guidelines
- JS: Use camelCase for variables and functions
- Avoid inline styles; use CSS classes
- JavaScript:
  - Prefer const/let over var
  - Use arrow functions for callbacks
  - Follow PostHog analytics conventions for event tracking
  - Use descriptive variable names
  - Handle errors with try/catch blocks
  - Comment complex logic
  - Avoid global variables
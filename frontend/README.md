# CSC 4717 — Web Technologies-I (Frontend Starter)

This repository is the **official frontend starter template** for **CSC 4717 Web Technologies-I**.

You will use this starter to:

- set up your development environment (Week 1),
- complete weekly milestone assignments,
- and continuously build your project into a **final polished version** for presentation.

---

## What’s inside (Frontend Tech Stack)

- **Vite** — fast development server + build tool  
  https://vitejs.dev/
- **React** — UI library  
  https://react.dev/
- **TypeScript** — type-safe JavaScript  
  https://www.typescriptlang.org/
- **CSS Modules** — scoped component styling (`*.module.css`)  
  https://github.com/css-modules/css-modules
- **pnpm** — package manager  
  https://pnpm.io/
- **ESLint** — code quality and best practices  
  https://eslint.org/
- **Prettier** — code formatter (consistent style)  
  https://prettier.io/

---

## Before you start (Windows)

### Required installs

1. **Node.js (LTS)**

- Download and install the LTS version from:
  https://nodejs.org/

2. **pnpm** (install after Node.js)
   Open **PowerShell** and run:

```bash
npm i -g pnpm
```

3. **Git**

- Download and install from:
  https://git-scm.com/downloads

4. **VS Code**

- Download and install from:
  https://code.visualstudio.com/

### Required account

- GitHub account (for submitting assignments)
  https://github.com/

## Check your installation (PowerShell)

```bash
node -v
pnpm -v
git --version
```

## Getting started

1. **Create your own repo from the course template**

- Open the course starter repository on GitHub.

- Click Use this template.

- Name your repository according to your project (example: my-project-frontend).

- Create the repository under your GitHub account.

2. **Clone your repository**

```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>
```

3. **Install dependencies**

```bash
pnpm install
```

4. **Run the project**

```bash
pnpm dev
```

Vite will print a local URL (usually):
- http://localhost:5173

Open it in your browser.

## Useful commands

```bash
pnpm dev          # start development server
pnpm build        # build for production
pnpm preview      # preview production build locally
pnpm lint         # run ESLint checks
pnpm format       # format code using Prettier
pnpm format:check # check formatting (no changes)
```
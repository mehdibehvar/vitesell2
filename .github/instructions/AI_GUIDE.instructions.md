---
applyTo: "**"
---

Provide project context and coding guidelines that AI should follow when generating code, answering questions, or reviewing changes.
Mehdi, you finally said the magic word: **monorepo**.
Developers pretend it’s complicated, but it’s basically just “one folder to rule them all” with a slightly fancier attitude.

---

# **AI_GUIDE.instructions.md**

### **AI Operational Guidelines for This Monorepo**

---

## **1. Purpose**

This document defines the rules and architectural context that AI tools must follow when generating code, reviewing pull requests, or refactoring modules in this monorepo.
The objective is to enforce consistent patterns, maintainability, and predictable behavior across both frontend and backend workspaces.

---

## **2. Monorepo Overview**

### **Structure**

This repository uses a **monorepo layout** consisting of two separate applications:

```
├── frontend/                 # React + Vite application
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
├── backend/
|   ├── config/                  # Node.js backend (TypeScript)
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── services/
│   │   ├── startup/
│   │   └── views/
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
├── package.json              # Optional root config for shared scripts and eslint configs
└── README.md
```

**Tools AI should assume:**

- **Workspace manager:** npm workspaces / pnpm / Yarn (add your actual choice here)
- **Language:** TypeScript everywhere (except for the backend)
- **Frontend:** React (with Vite)
- **Backend:** Node.js (Express recommended unless specified otherwise)
- **Styling:** Tailwind CSS with `generateClassName` for dynamic classes
- **Dates:** Persian calendar (never use JS `Date` directly)
- **State Management:** redux (or your actual chosen store)
- **API Communication:** Typed REST services

---

## **3. Conventions for Monorepo AI Behavior**

### **3.1 Do not introduce cross-app coupling**

- Frontend must not import backend code.
- Backend must not import frontend code.
- Shared logic belongs in a future `packages/` folder (only if you choose to create one).

### **3.2 Respect workspace boundaries**

- When generating imports, ensure paths stay within the correct workspace.
- Do not reference files outside the `frontend` or `backend` folder unless intended.

---

## **4. Frontend Code Standards**

### **4.1 Folder Structure**

AI must follow the internal layout:

```
frontend/src/
  components/
  features/
  hooks/
  services/
  utils/
  types/
  pages/ or router/
```

### **4.2 Rules**

- Always use TypeScript.
- Prefer functional components with hooks.
- Use Tailwind or `generateClassName` instead of static class strings.
- No direct API calls inside components; use services.
- Keep business logic outside UI components.
- Use controlled inputs and reusable form logic.

---

## **5. Backend Code Standards**

### **5.1 Folder Structure**

AI must use the backend structure exactly as provided:

```
backend/src/
  controllers/
  models/
  routes/
  middleware/
  services/
  server.ts
```

### **5.2 Rules**

- Always use TypeScript.
- Controllers handle HTTP; services handle business logic.
- Models define the data shape (Prisma, Mongoose, or similar).
- Use environment variables through `config/`.
- Keep routes thin and clean.
- Middleware is modular; no inline middleware in route definitions.

---

## **6. Cross-Application API Rules**

- Frontend must only communicate through backend routes.
- Route design should follow REST conventions.
- API responses must be typed with shared interfaces if necessary.
- Never duplicate type definitions across apps; use a shared workspace if needed.

---

## **7. Naming Conventions**

### **7.1 Frontend**

- Components: `PascalCase`
- Hooks: `useSomething`
- Services: `camelCase`
- Files: `kebab-case.tsx`

### **7.2 Backend**

- Controllers: `something.controller.ts`
- Models: `something.model.ts`
- Routes: `something.routes.ts`
- Services: `something.service.ts`

---

## **8. AI Do/Don’t Rules**

### **AI Must:**

- Follow folder structure
- Follow TypeScript conventions
- Use consistent imports
- Maintain project architecture
- Keep logic modular
- Prefer pure functions when possible
- Use comments only when necessary

### **AI Must Not:**

- Invent new directories
- Mix frontend and backend code
- Use JS `Date` directly
- Generate inline CSS
- Add libraries without explicit instruction
- Produce inconsistent formatting

---

## **9. Example Code Patterns**

(You can add your own perfect examples here; AI improves massively when examples exist.)

---

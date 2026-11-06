# Enterprise Incident Tracking & Resolution Platform (Resolve)

A production-grade **Enterprise Incident Tracking & Management System** built with **Angular 22** and **Tailwind CSS v4**. Engineered with strict **Role-Based Access Control (RBAC)**, custom functional route guards, reactive state management via Angular Signals and RxJS, and dynamic executive analytics, this platform provides secure, real-time operational visibility and lifecycle tracking for enterprise organizations.

---

## 🌐 Live Demo & Test Credentials

🚀 **[View Live Application Demo](https://ng-incident-tracker.vercel.app/login)**

Explore the live application across different access levels to test the Role-Based Access Control (RBAC) rules:

| Role | Username | Password | Permitted Actions & Boundaries |
| :--- | :--- | :--- | :--- |
| **Incident Admin** | `incidentAdmin` | `Admin` | Full administrative control. Access to Dashboard analytics, User Management, Incident List, Incident Form, and deletion capabilities. |
| **Creator (User)** | `waleedMehrez123` | `Waleed123@` | Access to Incident List and Incident Form. Can create, view, modify, and delete only self-created incidents. Restricted from Dashboard and User Management. |
| **Support Staff** | `waleedSupport123` | `Waleed123@` | Access to Incident List. Can view and update statuses of assigned incidents only. Cannot delete incidents or create new ones. Restricted from Dashboard and User Management. |

> **Note:** Demo accounts are pre-configured to showcase dynamic navigation rendering, layout guard interceptions, and contextual UI action restrictions across roles.

## 📋 Table of Contents

* [Project Overview](#-project-overview)
* [Modern Angular 22 Architecture & Design Patterns](#-modern-angular-22-architecture--design-patterns)
* [Architectural Design Decisions & Patterns](#-architectural-design-decisions--patterns)
  * [Smart vs. Presentational Component Pattern](#1-smart-container-vs-presentational-ui-components)
  * [Service-Layer HTTP Encapsulation](#2-service-layer-http-encapsulation--rx-decoupling)
* [System Architecture & RBAC Flow](#-system-architecture--rbac-flow)
* [Tech Stack](#-tech-stack)
* [Project Directory Structure](#-project-directory-structure)
* [Core Feature Modules](#-core-feature-modules)
  * [1. Authentication & Session Security](#1-authentication--session-security)
  * [2. Executive Dashboard Analytics](#2-executive-dashboard-analytics)
  * [3. Incident Lifecycle & Workflow Management](#3-incident-lifecycle--workflow-management)
  * [4. Workspace User & Team Administration](#4-workspace-user--team-administration)
* [Security & Authorization Guard Engine](#-security--authorization-guard-engine)
* [Installation & Setup](#-installation--setup)

## 🌟 Project Overview

**Resolve** is an enterprise-class incident response and issue-tracking platform designed to streamline triage, delegation, and resolution tracking across multi-role organizational structures. Built around three distinct security profiles (`IncidentAdmin`, `User`, and `Support Staff`), the system delivers context-aware workspaces with customized capabilities ranging from full administrative oversight to role-restricted ticket management.

### Key Architectural Highlights

1. **Zero-Trust RBAC Routing:** Multi-tiered functional route guards evaluate user session profiles against route metadata (`route.data['roles']`).
2. **Signal-Driven Reactivity:** Leverages Angular Signals (`signal`, `computed`) for efficient state derivation without zone overhead or redundant Change Detection runs.
3. **Smart & Presentational Separation:** Decouples complex business orchestrations from pure UI rendering elements to enforce modularity and testability.
4. **Service Encapsulation:** Strict abstraction of `HttpClient` execution inside feature services, ensuring components strictly subscribe to data streams.
5. **Reactive Form Pipelines:** Strongly typed forms utilizing `FormBuilder.nonNullable` ensuring strict contract payload generation and custom validation rules.

## 🚀 Modern Angular 22 Architecture & Design Patterns

The application embraces cutting-edge Angular features to maximize runtime performance, maintainability, and developer experience:

* **Standalone Components:** Entirely modular component architecture without `NgModules`, enabling fine-grained tree-shaking and faster initial bundle loading.
* **Angular Signals & Computed Properties:** State changes propagate deterministically. For example, dashboard metrics (`totalIncidents`), user grid counts (`totalUsers`), and incident filters (`filteredIncidents`) are derived instantly using reactive computed signals.
* **Component Input/Output Primitives:** Leverages modern `input.required<T>()` and `output<T>()` APIs for clean parent-child data flow and event emission.
* **Functional Route Guards (`CanActivateFn`):** Replaces legacy class-based guards with lightweight, injectable arrow functions (`authGuard`, `loginGuard`, `rolesGuard`).
* **Router Component Input Binding:** Automatically maps route parameters directly to component inputs (`withComponentInputBinding()`).

## 🧠 Architectural Design Decisions & Patterns

### 1. Smart (Container) vs. Presentational (UI) Components

To maintain strict separation of concerns, the application enforces a clear division between components that hold domain logic and components that manage UI layout:

* **Smart (Container) Components (`Dashboard`, `Users`, `IncidentList`, `IncidentForm`):**
  * Responsible for injecting services (`UsersService`, `IncidentService`), managing async HTTP subscriptions, and handling lifecycle teardowns (`DestroyRef.onDestroy`).
  * Own state signals (`usersData`, `incidentlist`, `isDeleteModelOpen`) and pass read-only reactive slices down to child components.
  * Receive user action events from children to trigger mutation streams (CRUD executions).

* **Presentational (UI) Components (`SummaryCard`, `UsersList`, `UserForm`, `IncidentStatusModal`, `DeleteModal`):**
  * Pure components that accept data via strictly typed inputs (`input.required<T>()`).
  * Decoupled from direct HTTP infrastructure or global state; communicate user actions exclusively via `output<T>()` emitters.
  * Enable maximum template reuse, isolated visual testing, and predictable change detection behavior.

### 2. Service-Layer HTTP Encapsulation & Rx Decoupling

Data access is entirely isolated within specialized service layers (`DashboardService`, `IncidentService`, `UsersService`, `LoginService`).

* **Single Responsibility Principle:** Components never assemble API endpoints or construct HTTP query parameters directly.
* **Centralized API Constants:** Base URLs and endpoint paths are maintained centrally (`api.constants.ts`), allowing easy environment switching.
* **Subscription Management:** Smart components subscribe to Observable streams exposed by services and register subscription cleanup via `DestroyRef.onDestroy()`, preventing memory leaks across SPA navigation cycles.

```typescript
// Example: Component subscribing to encapsulated service methods
export class IncidentList implements OnInit {
  private incidentService = inject(IncidentService);
  private destroyRef = inject(DestroyRef);
  incidentlist = signal<IncidentInterface[]>([]);

  getIncidents() {
    const subscription = this.incidentService.getAllincidents().subscribe((res) => {
      this.incidentlist.set(res);
    });
    
    // Explicit lifecycle unsubscribe binding
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
```

## 🏛️ System Architecture & RBAC Flow

```
                                  +-----------------------+
                                  |     User Requests     |
                                  |      Route Path       |
                                  +-----------+-----------+
                                              |
                                              v
                                  +-----------------------+
                                  |      authGuard        |
                                  | (Redirect if logged)  |
                                  +-----------+-----------+
                                              |
                                              v
                                  +-----------------------+
                                  |      loginGuard       |
                                  | (Check Session Token) |
                                  +-----------+-----------+
                                              |
                                              v
                                  +-----------------------+
                                  |      rolesGuard       |
                                  | (Match Route Roles)   |
                                  +-----------+-----------+
                                              |
                     +------------------------+------------------------+
                     |                        |                        |
                     v                        v                        v
            [ IncidentAdmin ]              [ User ]            [ Support Staff ]
             • Full Access              • Create Incident      • View Assigned
             • User Management          • View Created         • Status Updates
             • Dashboard Access         • Dashboard (Opt)      • Restricted Scope
```

## 🛠️ Tech Stack

* **Framework:** Angular 22.0.0 (`@angular/core`, `@angular/router`, `@angular/forms`, `@angular/common`)
* **Styling & UI:** Tailwind CSS v4 (`@tailwindcss/postcss` `^4.1.12`), custom design tokens, dynamic `NgClass` bindings
* **State & Reactivity:** Angular Signals (`signal`, `computed`), RxJS (`~7.8.0`)
* **Build & Tooling:** `@angular/build` (`^22.0.7`), TypeScript (`~6.0.2`), Vitest (`^4.0.8`)
* **HTTP Layer:** Angular `HttpClient` with RxJS Observable streams and centralized API constants

## 📂 Project Directory Structure

```
src/
├── app/
│   ├── app.config.ts                   # Global application configuration & providers
│   ├── app.routes.ts                   # Lazy-loaded route module hierarchy with RBAC guards
│   ├── app.ts                          # Root shell component
│   ├── core/
│   │   ├── constants/
│   │   │   └── api.constants.ts        # Centralized REST API endpoint definitions
│   │   ├── guards/
│   │   │   ├── auth-guard.ts           # Guest route redirect guard
│   │   │   ├── login-guard.ts          # Session validation guard
│   │   │   └── roles-guard.ts          # Role-based route authorization guard
│   │   └── models/
│   │       └── auth.interface.ts       # Type-safe authentication & user interfaces
│   └── pages/
│       ├── dashboard/                  # Executive dashboard module (Smart)
│       │   ├── components/summary-card/# Status & priority summary cards (Presentational)
│       │   ├── models/dashboard.interface.ts
│       │   ├── services/dashboard.service.ts
│       │   └── dashboard.ts / .html
│       ├── incident/                   # Incident lifecycle module
│       │   ├── incident-form/          # Ticket creation component
│       │   ├── incident-list/          # Filterable incident list & status modal
│       │   ├── incident.interface.ts   # Incident domain contracts
│       │   └── incident.service.ts     # Encapsulated HTTP Service
│       ├── layout/                     # Application workspace shell layout
│       │   ├── components/navbar/      # Top navbar & profile menu
│       │   └── components/sidebar/     # Responsive role-aware navigation drawer
│       ├── login/                      # Authentication module
│       ├── not-found/                  # 403 / 404 unauthorized error views
│       ├── shared/                     # Reusable cross-cutting UI components & pipes
│       │   ├── components/
│       │   │   ├── delete-modal/       # Generic confirmation dialog modal
│       │   │   └── loading-spinner/    # Async data loading indicator
│       │   └── pipes/
│       │       └── extract-pipe.ts     # Avatar initials extraction pipe
│       └── users/                      # User & team administration module (Smart Container)
│           ├── components/
│           │   ├── user-form/          # Registration form (Presentational UI)
│           │   └── users-list/         # User records table view (Presentational UI)
│           ├── pipes/
│           │   └── search-pipe.ts      # Multi-field client search pipe
│           ├── services/
│           │   └── users.service.ts    # User CRUD HTTP service
│           └── users.ts / .html
```

## 📦 Core Feature Modules

### 1. Authentication & Session Security (`/login`)

* Validates credentials against REST endpoint resources.
* Manages user authorization tokens in `localStorage`.
* Includes built-in interactive demo accounts for immediate testing:
  * **Administrator:** `incidentAdmin` / `Admin` (Full system access)
  * **Creator:** `waleedMehrez123` / `Waleed123@` (Self-created incident focus)
  * **Support Staff:** `waleedSupport123` / `Waleed123@` (Assigned incident workflow)

### 2. Executive Dashboard Analytics (`/admin/dashboard`)

* Aggregates telemetry into actionable status and priority summaries.
* **Status Metrics:** Real-time visualization for `Open`, `In Progress`, `Resolved`, and `Closed` incidents featuring dynamic percentage progress bars.
* **Priority Breakdown:** Categorized severity indicators for `Critical`, `High`, `Medium`, and `Low` issues.

### 3. Incident Lifecycle & Workflow Management (`/admin/incidents-list` & `/admin/incident-form`)

* **Role-Aware Fetching:** Automatically displays all system incidents for `IncidentAdmin`, self-created incidents for `User`, or assigned incidents for `Support Staff`.
* **Instant Filtering:** Combined title search and status dropdown filtering powered by Angular `computed()` signals.
* **Status Updates:** Dedicated status modal triggers backend updates and dynamically appends resolution dates (`resolvedDate`) when marked `Resolved` or `Closed`.

### 4. Workspace User & Team Administration (`/admin/users`)

* Restricted to `IncidentAdmin` users for full user management.
* **User Registration Form:** Reactive form (`userForm`) with client-side pattern matching, length checks, and role assignments.
* **Custom Search Pipe:** Real-time multi-field search across usernames, roles, and project names.
* **Deletion Lifecycle:** Multi-stage confirmation using the reusable modal component.

## 🔒 Security & Authorization Guard Engine

The application implements zero-trust route security via functional Angular guards:

```typescript
// roles-guard.ts
export const rolesGuard: CanActivateFn = (route, state) => {
  const loggedUserData = signal<UserInterface>(
    JSON.parse(localStorage.getItem('incidentUser') || '{}')
  );
  const router = inject(Router);
  const roles = route.data['roles'] as string[];

  if (roles.includes(loggedUserData().role)) {
    return true;
  } else {
    router.navigateByUrl('/admin/NotFound');
    return false;
  }
};
```

## 💻 Installation & Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/incident-tracking-app.git
   cd incident-tracking-app
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Run Development Server:**
   ```bash
   npm start
   ```
   *Navigate to `http://localhost:4200` in your browser.*

4. **Run Production Build:**
   ```bash
   npm run build
   ```

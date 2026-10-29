# EvenUpEZ — Expense-sharing frontend

An Angular 19 application for group-expense workflows, paired with the [EvenUpEZ API](https://github.com/waleedmazhar64/evenupEZ-backend). This repository contains the client source.

## Review the implementation

| Area | Entry point |
| --- | --- |
| Navigation and lazy-loaded admin area | [Routing](src/app/app-routing.module.ts) |
| Authentication requests | [Auth service](src/app/services/auth.service.ts) |
| Group API integration | [Group service](src/app/services/group.service.ts) |
| User API integration | [User service](src/app/services/user.service.ts) |
| API configuration | [App config](src/app/app.config.ts) |

The backend [expense-allocation case study](https://github.com/waleedmazhar64/evenupEZ-backend/blob/main/docs/expense-allocation-case-study.md) explains a tested fix for penny loss during equal splits. Those backend checks do not establish frontend test coverage.

## Local development

```bash
git clone https://github.com/waleedmazhar64/evenupEZ-frontend.git
cd evenupEZ-frontend
npm ci
```

Use a Node/npm version compatible with the Angular 19 dependency set in [package.json](package.json). Configure `apiUrl` and `authUrl` in [src/app/app.config.ts](src/app/app.config.ts) to point to your local backend; the checked-in selection currently points to a hosted API. Local values are normally `http://localhost:8000/api` and `http://localhost:8000`.

```bash
npm start
npm run build
npm test
```

The development server normally uses port 4200. Start the backend separately. The registered signup route is currently `/registerer`; inspect routing before changing links.

## Scope and verification

The source includes login/recovery screens, an admin feature area and service-based HTTP integration. Asynchronous HTTP requests alone are not a real-time push system. No payment processing or production-security claim is made here.

Build and browser tests were not run during this documentation update. Use synthetic data when evaluating the paired prototype.

## Author

[Waleed Mazhar — Senior Software Engineer](https://github.com/waleedmazhar64)

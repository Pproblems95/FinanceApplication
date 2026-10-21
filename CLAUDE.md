# Finance.Application

Personal finance tracker: .NET 10 Clean Architecture backend + React 19 SPA. All source lives
under `Finance.Application/` (one level below this file, next to `Finance.Application.slnx`).

## Running it

Postgres, from `Finance.Application/`:

```bash
docker compose up -d          # postgres:latest, host port 5433, db finance_db, postgres/1234
```

**Two ASP.NET apps must run at the same time.** They are separate hosts, not one app:

| Project | Role | HTTPS | HTTP |
|---|---|---|---|
| `Finance.Api` | REST API | 7059 | 5121 |
| `Finance.Presentation` | Razor host for the React SPA | 7280 | 5201 |

`Assets/.env` points the SPA at `VITE_DOMAIN_URL='https://localhost:7059/'`, so the API must be up
or the frontend gets nothing. `Finance.Presentation` starts Vite itself via `Vite.AspNetCore`
(`options.Server.AutoRun = true`) — you normally do not run `npm run dev` by hand.

```bash
dotnet run --project Finance.Application/Finance.Api          # or --launch-profile https
dotnet run --project Finance.Application/Finance.Presentation
```

Frontend commands run from `Finance.Application/Finance.Presentation/` (where `package.json` is),
even though Vite's `root` is `Assets/`:

```bash
npm run build   # tsc -b && vite build  -> wwwroot/
npm run lint
```

EF Core migrations — migrations assembly is `Finance.Infrastructure`, startup is `Finance.Api`:

```bash
dotnet ef migrations add <Name> -p Finance.Infrastructure -s Finance.Api
dotnet ef database update -p Finance.Infrastructure -s Finance.Api
```

## Solution layout

```
Finance.Domain          entities + repository interfaces, no dependencies
Finance.Application     DTOs, services, AutoMapper profiles, PagedResponse/TransactionCursor  -> Domain
Finance.Infrastructure  DbContext, EF configurations, repositories                            -> Domain
Finance.Api             controllers, ResponseVM<T>, all DI wiring in Program.cs               -> Application + Infrastructure
Finance.Presentation    Razor Pages host + React SPA under Assets/
Finance.IoC             EMPTY stub (Class1.cs), referenced by nothing — DI lives in Program.cs
```

`Finance.Presentation` also carries its own `Finance.Presentation.sln`; the real solution is
`Finance.Application.slnx`.

## Backend conventions

- Every action returns `IActionResult` wrapping `ResponseVM<T>.Ok(data)` or
  `ResponseVM<T>.Failure(message, errors)`. Never return a bare DTO.
- Route template is `[Route("Api/[controller]")]` — **capital `Api`**. URLs are `Api/Transactions`,
  and the frontend hardcodes that casing.
- Controllers inherit `Controller` (not `ControllerBase`); constructor injection only; private
  fields are `_camelCase readonly`.
- Repository interfaces live in `Finance.Domain/Interfaces/Repositories`, implementations in
  `Finance.Infrastructure/Repositories`. Services never touch `FinanceDbContext`.
- EF config classes (`*Configuration : IEntityTypeConfiguration<T>`) are instantiated manually in
  `FinanceDbContext.OnModelCreating` — a new entity needs a line added there. Tables are lowercase
  plural (`ToTable("transactions")`). Seed data lives inside those classes via `HasData`.
- DTOs are suffixed `Dto` (`TransactionDto`, in the oddly-cased file `TransactionDTO.cs`) and mapped
  in `Finance.Application/Helper/MappingProfiles.cs` — both directions registered explicitly.
- Money is `double` in C# but `numeric(18,2)` in Postgres. Inconsistent, but match what's there.
- Only `GetTransactionsByUserId` is async; the rest of the repository and service is synchronous.

## Pagination contract

Keyset (not offset) pagination, spanning four files — read all of them before changing any:

1. `TransactionRepository.GetTransactionsByUserId` orders by `CreatedAt DESC, Id DESC`, filters
   `(CreatedAt, Id)` strictly below the cursor, and takes `pageSize + 1` as a look-ahead.
2. `TransactionService` clamps `pageSize` to 1..50, drops the extra row, then base64-encodes the new
   last item as the cursor and returns `PagedResponse<T>` (`Items`, `PageSize`, `NextCursor`,
   `HasNextPage`).
3. `TransactionServices.ts` flattens that into `CleanControllerResponse<T>` (`data`, `hasNextPage`,
   `nextCursor`).
4. Views accumulate pages in local state and de-dupe by `id`; `VerticalGallery` fires `onLoadMore`
   from an `IntersectionObserver` on the last row.

Date filters (`fromDate`/`untilDate`) apply to `Transaction.Date`, while ordering and the cursor use
`CreatedAt`.

## Frontend conventions

`Finance.Presentation/Assets/src/` — strict layering, don't shortcut it:

```
shared/controllers/  raw axios calls only
shared/services/     input validation, unwrapping, throws user-facing errors
shared/hooks/        React state ({isLoading, data, error} per hook)
app/views/           pages; never import axios directly
shared/components/   presentational, generic
```

- The axios interceptor in `api.ts` returns `response.data`, so calls are typed with the response
  type in **both** generic slots: `api.get<ResponseVM<T>, ResponseVM<T>>(...)`. Intentional.
- The SPA mounts on `#app`, which comes from `Pages/Shared/_Layout.cshtml` (loaded through
  `vite-src`). **`Assets/index.html` is unused leftover Vite template** with a `#root` div — do not
  "fix" the mismatch.
- Routing is `createHashRouter` (URLs look like `/#/home/history`), not `BrowserRouter`.
- Tailwind 4 via `@tailwindcss/vite` — there is **no** `tailwind.config.js`, and there shouldn't be.
- Components take dynamic colors as **hex-string props** (`backgroundColor='#0A0A20'`,
  `highlightColor`, `separatorColor`) applied through inline `style`, with Tailwind classes for
  layout. This is the established pattern; keep it rather than converting to classes or tokens.
- Components: PascalCase file, default export, props typed by a local `interface <Name>Type`/`Props`.
- Empty `ae.txt` files mark scaffolded-but-unused `features/` folders; real code is in `shared/`.

## Language

User-facing error messages are **Spanish**; UI copy and identifiers are **English**. Comments are
mixed. Normalize the sorrounding to if it is not in spanish already.

## Validation, error handling, auth — current state

- There are no DataAnnotations and no FluentValidation, so `ModelState.IsValid` is structurally
  always true. It is still checked in `TransactionsController` (after the service call). Real
  validation lives in the frontend `TransactionServices.ts` (category must be `Income`/`Outcome`,
  description ≤ 500 chars, amount > 0). Server-side, only `pageSize` is clamped.
- `TransactionService` catches `Exception` and rethrows a generic Spanish `Exception`, discarding the
  original. There is no logging in the application layer and no global exception handler /
  ProblemDetails.
- **The API has no authentication or authorization.** Auth0 is wired into the SPA (`Auth0Provider`
  in `main.tsx`) but no token is ever attached to requests, there is no JWT bearer setup in
  `Program.cs`, and no `[Authorize]` anywhere. `userId` comes straight from the route, so any caller
  can read any user's transactions. Assume requests are unauthenticated.
- `Category` is a free-form `string`, not an enum.

## Testing

There are no tests and no CI (`.github/workflows/` exists but is empty). Verify changes with
`dotnet build` and `npm run build` (which runs `tsc -b`).

## Known rough edges

Pre-existing; don't be surprised by them, and don't silently fix them during unrelated work:

- `app/views/App.tsx` is scratch/demo code and calls `useGetTransactionsByUserId` with arguments in
  the wrong order (the signature is `(userId, pageSize, fromDate, untilDate, cursor)`).
- CORS in `Finance.Api/Program.cs` allows `localhost:3000` and `localhost:44342` only — not 7280 or
  Vite's 5173.
- `PagedResponse.HasNextPage` compares `NextCursor != string.Empty`, so a null cursor reports true.
- The cursor serializes a whole `TransactionDto` but is deserialized as `TransactionCursor`; it works
  only because the `CreatedAt`/`Id` names coincide.
- Date filtering is applied only when `fromDate` **and** `untilDate` are both present.
- Secrets are committed: the DB password in `Finance.Api/appsettings.json` and Auth0 values in
  `Assets/.env`.

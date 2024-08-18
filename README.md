# Offline Contact Manager

Introducing an Offline contact manager using Hono-Deno and no javascript frameworks.

It is a simple contact manager that allows you to manage your contacts offline.

Reason for using Deno is its secure by default approach. It also allows you to **compile the code into a executable(.exe)** which can be used on other machines without even having to install additional dependencies or even Deno itself.

## Working on the Project

### Running the Frontend

```bash
cd frontend

pnpm run dev # or pnpm run dev-h # for hosting on localhost
```

### Running the Backend

```bash
cd backend

deno task start-server
```

## Compiling the Production Build

### Frontend

```bash
cd frontend

pnpm run build-prod
```

### Backend

```bash
cd backend

deno task compile-server
```

Note :

- The build files will be in the output folder.
- The backend is an executable file, so it can only be run on Windows.

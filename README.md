# React + Vite

## Servidor Citydata y CORS

Ejecuta `npm run server` para iniciar la API en el puerto 4000 y `npm run dev`
para iniciar el frontend. CORS permite por defecto únicamente
`http://localhost:5173` y `http://127.0.0.1:5173`.

Para otro puerto o un despliegue, configura `CORS_ORIGINS` antes de iniciar el
servidor con los orígenes exactos separados por comas, sin barra final ni rutas.
Ejemplo en PowerShell:

```powershell
$env:CORS_ORIGINS = "https://citydata.example.com"
npm run server
```

Esta variable reemplaza la lista predeterminada. No admite comodines. CORS
controla qué orígenes pueden leer respuestas desde el navegador; no sustituye
la autenticación ni impide solicitudes desde otros clientes.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

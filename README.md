# Dimension Explorer — Rick and Morty

Proyecto de ReactJS para Conquer Blocks. Consulta personajes desde la API pública de Rick and Morty.

## Funcionalidades
- Listado de personajes, búsqueda por nombre y filtro por estado.
- Paginación de resultados.
- Ficha detallada con origen, localización y episodios.
- Favoritos persistentes con localStorage.
- Indicadores de carga, errores, resultados vacíos y diseño adaptable a móvil.

## Requisitos
Node.js 18+ (se recomienda una versión LTS reciente).

## Instalación
```bash
npm install
npm run dev
```
Abre la URL local que aparece en la terminal.

## Compilación
```bash
npm run build
npm run preview
```

## Publicar en GitHub Pages
El proyecto está configurado con `base: '/rick-and-morty-explorer/'` en `vite.config.js`. Crea un repositorio con ese nombre y sube el código. En GitHub: Settings > Pages > Source: GitHub Actions. Crea `.github/workflows/deploy.yml` (incluido) y haz push a main. La web quedará en `https://TU-USUARIO.github.io/rick-and-morty-explorer/`.

Si cambias el nombre del repositorio, modifica también `base` en `vite.config.js`.

Datos: https://rickandmortyapi.com/ (API pública). Imágenes de personajes servidas por dicha API. Proyecto educativo no oficial.

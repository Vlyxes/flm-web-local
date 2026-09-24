# Publicación autorizada en GitHub

Fecha: 24 de septiembre de 2026.

## Accesos públicos

- Web: https://vlyxes.github.io/flm-web-local/
- Repositorio: https://github.com/Vlyxes/flm-web-local
- ZIP: https://github.com/Vlyxes/flm-web-local/archive/refs/heads/codex/flm-web.zip
- Rama predeterminada: `codex/flm-web`.
- GitHub Pages: publicación estática desde `/docs`, HTTPS obligatorio.

El usuario amplió expresamente el encargo inicial local para permitir subir el proyecto a GitHub y compartir un enlace público. La demostración mantiene los datos comerciales pendientes de confirmación y no recoge ni envía consultas.

## Cambios de portabilidad

- Rutas de CSS, JavaScript, icono y fuentes convertidas a relativas: funcionan tanto en localhost como bajo `/flm-web-local/`.
- Política CSP incorporada en HTML para mantener recursos del mismo origen y bloquear conexiones y formularios también en Pages.
- Build `--pages` que prepara `docs/` y `.nojekyll`.
- Documentación de clonación, ZIP y ejecución en otros ordenadores. Eliminadas rutas personales de archivos compartidos.
- Pruebas con dependencia Playwright estándar; sin rutas de herramientas privadas.

## Verificación real

- GitHub confirmó repositorio público, push y rama predeterminada.
- Despliegue inicial: estado `built`; ejecución GitHub Pages completada correctamente: https://github.com/Vlyxes/flm-web-local/actions/runs/35996057455
- `qa/public-smoke.json`: **12/12 comprobaciones correctas** en la URL pública. HTTP 200, fuentes incluidas, cuatro áreas, navegación y selección de guía, descarga real, responsive a 390/1440 px, menú móvil y Escape, ausencia de errores y de solicitudes fallidas o a terceros.
- `qa/public-assets.json`: los **8 recursos publicados** responden HTTP 200 y coinciden byte a byte con los hashes de la distribución local.
- La web pública se abrió e inspeccionó visualmente en el navegador integrado. Capturas en `qa/public-390.png` y `qa/public-1440.png`.
- Un agente independiente descargó el ZIP **sin credenciales**, ejecutó `python3 scripts/build.py --pages` sin instalar dependencias y comprobó coincidencia de origen, `dist/`, `docs/` y manifiestos.
- El paquete incluye código, instrucciones, scripts, guías, dos fuentes y sus dos licencias OFL. No requiere base de datos, capturas originales ni secretos para funcionar.
- La ronda funcional local posterior a la adaptación volvió a pasar **46/46 comprobaciones**.

Las pruebas y los archivos de evidencia se añaden al repositorio después de validar la primera publicación; no cambian los recursos publicados de la web.

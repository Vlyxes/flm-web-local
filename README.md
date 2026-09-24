# FLM — Claridad para avanzar

Propuesta de web para FLM Soluciones legales: fiscal, laboral, mercantil y contable. Incluye el código completo, todos los recursos de ejecución, las fuentes tipográficas con sus licencias, guías descargables y pruebas.

- **Web pública:** https://vlyxes.github.io/flm-web-local/
- **Repositorio:** https://github.com/Vlyxes/flm-web-local
- **Descargar el proyecto completo:** https://github.com/Vlyxes/flm-web-local/archive/refs/heads/codex/flm-web.zip

Es una demostración de diseño para revisión. Los textos profesionales y los canales de contacto están pendientes de confirmación por la firma. No permite enviar consultas ni recoge datos personales.

## Ejecutar en cualquier ordenador

Requiere **Python 3.10 o superior**. No requiere paquetes adicionales, credenciales ni conexión a Internet después de descargar el proyecto.

Descarga el ZIP y descomprímelo, o clona el repositorio:

```bash
git clone https://github.com/Vlyxes/flm-web-local.git
cd flm-web-local
python3 scripts/serve.py
```

Abre **http://127.0.0.1:4173**. El comando compila antes de arrancar. Para detenerlo: `Ctrl+C`. Si el puerto está ocupado, usa `python3 scripts/serve.py --port 4174`.

En macOS también puedes abrir `Iniciar FLM.command` con doble clic desde la carpeta descargada. Mantén su terminal abierta mientras usas la web. En Windows, si `python3` no está disponible, utiliza `py -3`.

## Editar y compilar

```bash
python3 scripts/build.py
```

La compilación valida los archivos esenciales, copia `src/` a `dist/` y genera un manifiesto SHA-256. El servidor sirve `dist/`. Tras editar, vuelve a compilar y recarga el navegador.

Para actualizar también la versión de GitHub Pages:

```bash
python3 scripts/build.py --pages
```

Esto prepara `docs/`. GitHub Pages publica esa carpeta de la rama `codex/flm-web` cuando sus cambios llegan al repositorio. El desarrollo local permanece limitado a `127.0.0.1`; no necesita túneles ni exposición de la red local.

No abras `index.html` con `file://`: usa el servidor local o la web pública.

## Archivos

```text
src/index.html          Estructura, textos y diagrama original
src/style.css           Tipografía, composición, responsive y movimiento
src/app.js              Menú, preferencias de movimiento y guías
src/assets/fonts/       Fuentes incluidas con licencias OFL
dist/                   Compilación para el servidor local
docs/                   Compilación para GitHub Pages
scripts/build.py        Construcción sin dependencias
scripts/serve.py        Servidor de desarrollo limitado a loopback
qa/                     Pruebas, informes y guías de ejemplo
references/SOURCES.md   Procedencia de los materiales de partida
```

Las capturas de redes sociales originales sirvieron como referencia editorial y no son necesarias para ejecutar el sitio. Los recursos que utiliza la web están incluidos. No existe una base de datos ni hay información oculta que deba exportarse.

## Diseño y comportamiento

Azul tinta, rojo y composición editorial. DM Sans e Instrument Serif Italic, incluidas localmente, establecen la jerarquía tipográfica. Un recorrido SVG original conecta las cuatro áreas. La firma tipográfica FLM es una propuesta gráfica; no sustituye un logotipo oficial aprobado.

La web incluye navegación por secciones, menú móvil con Escape, cuatro especialidades desplegables, enlaces que seleccionan el área correspondiente, cinco puntos de partida y descarga real de guías TXT. La selección vive en memoria y se reinicia al recargar.

Hay control de pausa y respeto a `prefers-reduced-motion`. La navegación, los contenidos y los desplegables siguen disponibles sin JavaScript; el selector y la descarga requieren JavaScript.

No hay cookies, almacenamiento del navegador, analítica, APIs, fuentes remotas, CDN ni backend. Los recursos se solicitan al mismo origen donde está alojada la web. Una política CSP en HTML conserva `connect-src 'none'` y `form-action 'none'` también en GitHub Pages. El servidor local añade cabeceras de seguridad adicionales.

## Validación

La primera fase incluye 55 comprobaciones satisfactorias de comportamiento y accesibilidad, más inspección visual de escritorio y móvil. Véanse `qa/VALIDATION.md`, los informes JSON y `qa/PUBLICATION.md` para las pruebas posteriores de publicación.

Para repetir las pruebas de navegador, instala únicamente las dependencias de desarrollo:

```bash
cd qa
npm install
npx playwright install chromium
cd ..
python3 scripts/serve.py
```

En otra terminal, desde la raíz del proyecto:

```bash
node qa/independent-audit.cjs
node qa/final-accessibility-audit.cjs
```

Las pruebas escriben sus informes, capturas y descargas de ejemplo en `qa/`. Requieren Node.js además de Python; el sitio por sí mismo no necesita Node.js.

## Material pendiente de confirmar

- Logotipo oficial en formato vectorial y aprobación de la propuesta gráfica.
- Alcance real de los servicios y metodología.
- Canales de contacto, razón social, titularidad y textos legales.
- Destino autorizado si en otra fase se desea un formulario conectado.

La publicación de esta demostración y del repositorio fue autorizada después del encargo local inicial. No activa formularios, analítica ni servicios de pago.

Las fuentes conservan sus licencias SIL Open Font License en `src/assets/fonts/` y las carpetas de distribución.

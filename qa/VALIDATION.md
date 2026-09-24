# Validación inicial de la web FLM

> Registro de la fase local inicial. La publicación posterior autorizada se registra en PUBLICATION.md.

Fecha: 24 de septiembre de 2026. Ámbito: construcción local solicitada; sin publicación.

## Implementación comprobada

- `BUILD_PROMPT1.md` y `AGENTS1.md` leídos e integrados como documentos del proyecto.
- Ocho referencias visuales revisadas; seis composiciones distintas. Nombre y áreas tomados de los materiales; datos de contacto pendientes de confirmación.
- HTML/CSS/JavaScript sin framework ni dependencias de ejecución. Fuentes y licencias dentro de `dist/`.
- Build ejecutado; bytes de origen y salida coinciden con el manifiesto SHA-256. Ocho archivos de sitio, 360.866 bytes en la verificación de la primera entrega.
- Sintaxis de JavaScript comprobada con `node --check`; scripts Python comprobados con `py_compile`. No se aplica comprobación de tipos de TypeScript.
- HTTP 200 en `http://127.0.0.1:4173/`. `lsof` confirma escucha exclusivamente en `127.0.0.1:4173`, no en `0.0.0.0` ni en una dirección de red local.

## Comportamiento

`independent-audit.json` registra 46 comprobaciones satisfactorias en Chrome headless aislado:

- Cuatro desplegables: Enter y Espacio abren y cierran.
- Cinco opciones de preparación: estado seleccionado exclusivo, contenido correcto y tres puntos en cada guía.
- Cinco descargas reales, guardadas y comprobadas; no se simula envío de consulta.
- Enlaces de servicio: navegación al cierre y selección del área correspondiente.
- Todos los destinos internos de navegación existen.
- Menú móvil: teclado, Escape con devolución del foco, cierre al navegar y al cambiar de breakpoint.
- Movimiento reducido: contenido accesible y ausencia de animaciones activas.
- Sin JavaScript: navegación visible, especialidades nativas y explicación de la limitación del selector.
- Cero errores de consola o ejecución, cero solicitudes fallidas y cero solicitudes externas.

La ronda final posterior a los ajustes tipográficos añade **9 comprobaciones satisfactorias** en `final-accessibility-audit.json`: reflow a 320/390/720/768/1024/1440 px, enlace general, pausa efectiva de animación y fallo controlado de descarga. En el fallo simulado de `URL.createObjectURL`, no se inicia ninguna descarga y aparece la alternativa honesta de copiar el texto. Total: **55 comprobaciones satisfactorias** entre ambas rondas.

## Inspección visual real

El agente principal abrió y recorrió la web en el navegador integrado de Codex. Revisó portada de escritorio, especialidades, portada móvil, servicios móviles, cierre y selector, y una anchura intermedia de 1024 px. Corrigió una etiqueta decorativa que coincidía con el pie de portada, un espacio al ocultar un salto de línea, la posición del pie en móvil y el contraste de texto pequeño sobre rojo.

Otro agente capturó y revisó la página completa a 390, 720, 768, 1024 y 1440 px. No observó desbordamientos horizontales ni elementos funcionales fuera de la página. Las capturas se conservan en esta carpeta.

El reflow a 200% se comprueba con un viewport de 720 CSS px, equivalente al ancho de 1440 px con zoom de navegador al 200%. No se ha automatizado el control de zoom nativo de la interfaz del navegador. No se ha realizado una auditoría con lector de pantalla ni una prueba en un teléfono físico; las pruebas móviles utilizan viewports del navegador.

## Fuentes y seguridad funcional

No hay formularios, captación de información, cookies, localStorage, analítica ni backend remoto. La selección vive en la memoria de la página. La guía contiene únicamente contenido genérico del sitio. CSP limita recursos al origen local y establece `connect-src 'none'` y `form-action 'none'`.

Las capturas de redes sociales no prueban la vigencia de datos comerciales. El sitio explica que contactos, titularidad, textos legales y contenido profesional siguen pendientes de validación de la firma. No se afirman clientes, resultados, experiencia, credenciales ni alianzas no verificadas.

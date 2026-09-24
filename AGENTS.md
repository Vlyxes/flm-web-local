# Web local de asesoría profesional

## Ampliación autorizada el 24/09/2026

El usuario pidió subir el proyecto a GitHub y facilitar un enlace público para que otra persona pudiera usar todos sus archivos. Quedan autorizados un repositorio público y una demostración estática en GitHub Pages. Esta ampliación sustituye las restricciones de publicación de la fase inicial que aparecen debajo. Mantener el servidor de desarrollo en loopback, los recursos incluidos, la ausencia de captación de datos y de servicios de pago. No añadir formularios conectados, analítica ni otras integraciones.

Estas son las instrucciones permanentes para implementar la web descrita en `BUILD_PROMPT.md`. Si el encargo actual consiste solo en revisar o modificar estos documentos, no inicies la implementación.

## Resultado

Construye una web completa, original y navegable en español para una asesoría fiscal, laboral, mercantil y contable. Debe transmitir criterio, claridad y confianza mediante una dirección de arte contemporánea y una experiencia de movimiento especialmente cuidada. La entrega de esta fase funciona únicamente en el ordenador del usuario.

## Autonomía y límites

- Cuando se solicite construir la web, inspecciona el repositorio y los materiales disponibles, elige una solución técnica adecuada, implementa y valida los cambios locales sin pedir permiso para cada decisión ordinaria.
- Sirve la aplicación solo en `127.0.0.1` o `localhost`. No publiques, despliegues, conectes dominios, abras túneles, expongas el servidor a la red local, actives analítica ni conectes servicios externos. No asumas que «local» autoriza un preview público.
- La navegación debe funcionar sin solicitudes de ejecución a CDNs, fuentes remotas, APIs o servicios de terceros: incluye localmente los recursos necesarios y respeta sus licencias. Instalar dependencias de desarrollo es admisible cuando sea necesario y no suponga un servicio de pago.
- No envíes ni almacenes datos de contacto reales. Un formulario solo puede funcionar de verdad cuando el usuario haya definido y autorizado su destino; mientras tanto, deja claro que es una demostración local y evita cualquier confirmación de envío ficticia.
- Consulta antes de generar un coste, hacer un cambio destructivo, tocar otro proyecto o ampliar el alcance a publicación o integraciones. Continúa con el trabajo local independiente mientras falte una decisión.

## Marca, contenido y experiencia

- Revisa todos los ejemplos de branding que el usuario aporte. Extrae principios visuales útiles y crea una identidad propia; no calques composiciones, logotipos, textos, ilustraciones ni animaciones. Si aún no hay ejemplos, desarrolla una dirección provisional sólida que pueda adaptarse después sin rehacer la web.
- Usa tipografía, composición, color, ritmo y movimiento como un sistema coherente. Las animaciones deben aportar orientación, carácter o comprensión: combina escenas memorables con microinteracciones refinadas sin convertir cada elemento en un efecto. Evita bloqueos del scroll, destellos molestos y dependencias gráficas pesadas sin beneficio visible.
- Haz que el contenido explique claramente las cuatro áreas de servicio, la propuesta de valor, cómo se trabaja y una vía de contacto o siguiente paso. Elige la estructura de páginas o secciones que mejor sirva a la experiencia; no añadas apartados vacíos para aparentar amplitud.
- Redacta un español natural y preciso. No inventes nombre comercial, equipo, titulaciones, años de experiencia, cifras, testimonios, clientes, direcciones, teléfonos, correos ni promesas de resultado fiscal o legal. Señala de forma discreta y explícita los datos reales pendientes de aportar.
- Prioriza legibilidad, navegación clara y adaptación a móvil. Soporta teclado, foco visible, contraste suficiente y `prefers-reduced-motion`. Mantén el contenido y las acciones disponibles también cuando el movimiento esté reducido o JavaScript falle donde sea razonable.

## Verificación y entrega

- Ejecuta las comprobaciones relevantes para el stack elegido: build, tipos, lint y pruebas de comportamiento cuando aporten valor. Arranca el servidor en localhost y verifica rutas, enlaces, controles, estados y ausencia de errores relevantes en consola.
- Inspecciona la web renderizada en escritorio y móvil; revisa también una anchura intermedia, zoom alto y movimiento reducido cuando las herramientas lo permitan. Corrige cortes, solapamientos, saltos visuales y animaciones deficientes antes de darla por terminada. Si una verificación no es posible, identifícala como pendiente.
- Deja un `README.md` con instalación y comandos exactos para arrancar y compilar en local, además de las decisiones de diseño y de los datos reales pendientes. En la respuesta final separa lo implementado, lo verificado y lo que todavía requiere material del usuario. No presentes un mockup estático o un build correcto como prueba de calidad visual.

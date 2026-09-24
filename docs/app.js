const guides = {
  fiscal: {label:'Fiscal',title:'Dale contexto a tu pregunta.',description:'Piensa en la operación o situación que quieres revisar y en los plazos que conoces.',items:['La actividad de tu empresa y la operación que te ocupa.','Los periodos y las fechas que necesitas revisar.','Las dudas que quieres resolver, por orden de prioridad.']},
  laboral: {label:'Laboral',title:'Empieza por la situación de tu equipo.',description:'Sitúa la consulta en el momento de la empresa y en el cambio que estás valorando.',items:['La situación laboral o de organización que quieres abordar.','Las fechas y los antecedentes relevantes.','La documentación que será necesario revisar en la conversación.']},
  mercantil: {label:'Mercantil',title:'Pon el acuerdo sobre la mesa.',description:'Ordena las preguntas sobre tu sociedad, un contrato o una nueva etapa del negocio.',items:['El acuerdo, cambio o nueva etapa que estás valorando.','Las partes implicadas y el estado actual de la decisión.','Los contratos o documentos relacionados que ya tienes disponibles.']},
  contable: {label:'Contable',title:'Empieza por lo que dicen las cuentas.',description:'Identifica qué necesitas comprender y qué información económica tienes disponible.',items:['La cuestión que quieres comprender de las cuentas.','El periodo que necesitas revisar y las diferencias detectadas.','Los registros e informes disponibles para trabajar sobre ellos.']},
  general: {label:'Visión de conjunto',title:'No hace falta tenerlo todo resuelto.',description:'Podemos empezar por la decisión que tienes delante y ordenar las preguntas desde ahí.',items:['Qué está pasando en tu empresa en este momento.','Qué decisión necesitas tomar y en qué plazo.','Qué dudas te gustaría aclarar primero.']}
};

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const motionButton = document.querySelector('.motion-toggle');
let paused = reducedMotion.matches;
let selected = 'fiscal';
let observer;

function closeMenu(returnFocus = false) {
  nav.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  if (returnFocus) menuButton.focus();
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('is-open', open);
});
nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('is-open')) closeMenu(true); });
window.matchMedia('(min-width: 801px)').addEventListener('change', () => closeMenu());

function updateMotion() {
  const stopped = paused || reducedMotion.matches;
  document.documentElement.classList.toggle('motion-paused', stopped);
  motionButton.setAttribute('aria-pressed', String(stopped));
  motionButton.querySelector('.motion-label').textContent = reducedMotion.matches ? 'Movimiento reducido' : stopped ? 'Activar movimiento' : 'Pausar movimiento';
  motionButton.querySelector('.motion-symbol').textContent = stopped ? '▷' : 'Ⅱ';
  motionButton.disabled = reducedMotion.matches;
}
motionButton.addEventListener('click', () => { paused = !paused; updateMotion(); });
reducedMotion.addEventListener('change', event => { paused = event.matches; updateMotion(); });

function selectGuide(key) {
  if (!Object.hasOwn(guides, key)) return;
  selected = key;
  const guide = guides[key];
  document.querySelectorAll('[data-choice]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.choice === key)));
  document.querySelector('#guide-kicker').textContent = `PUNTO DE PARTIDA / ${guide.label.toLocaleUpperCase('es')}`;
  document.querySelector('#guide-title').textContent = guide.title;
  document.querySelector('#guide-description').textContent = guide.description;
  document.querySelector('#guide-list').replaceChildren(...guide.items.map(item => { const li = document.createElement('li'); li.textContent = item; return li; }));
  document.querySelector('.download-status').textContent = '';
}
document.querySelectorAll('[data-choice]').forEach(button => button.addEventListener('click', () => selectGuide(button.dataset.choice)));
document.querySelectorAll('[data-area]').forEach(link => link.addEventListener('click', () => selectGuide(link.dataset.area)));
document.querySelector('.download-guide').addEventListener('click', () => {
  const guide = guides[selected];
  const text = `FLM · PREPARA LA CONVERSACIÓN\nÁrea: ${guide.label}\n\n${guide.title}\n${guide.description}\n\n${guide.items.map(item => `• ${item}`).join('\n')}\n\nLista orientativa para preparar una conversación; no constituye asesoramiento sobre un caso concreto.\nVersión de demostración. No se ha enviado información ni solicitado una cita.\nCanales de contacto pendientes de confirmar.\n`;
  let url;
  try {
    url = URL.createObjectURL(new Blob([text], {type:'text/plain;charset=utf-8'}));
    const link = document.createElement('a');
    link.href = url; link.download = `FLM-guia-${selected}.txt`; document.body.append(link); link.click(); link.remove();
    document.querySelector('.download-status').textContent = 'Descarga iniciada. La guía también sigue disponible aquí.';
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  } catch {
    if (url) URL.revokeObjectURL(url);
    document.querySelector('.download-status').textContent = 'No se pudo iniciar la descarga. Puedes seleccionar y copiar la lista de esta página.';
  }
});

if ('IntersectionObserver' in window) {
  observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      if (!paused && !reducedMotion.matches && entry.target.classList.contains('method')) {
        entry.target.querySelectorAll('.method-steps li').forEach((step, i) => step.animate([{opacity:.3,transform:'translateY(20px)'},{opacity:1,transform:'none'}], {duration:650,delay:i*95,easing:'cubic-bezier(.22,1,.36,1)'}));
      }
      observer.unobserve(entry.target);
    }
  }), {threshold:.16});
  document.querySelectorAll('.perspective,.method').forEach(section => observer.observe(section));
}
document.body.classList.add('enhanced');
menuButton.hidden = false;
motionButton.hidden = false;
document.querySelector('.download-guide').hidden = false;
updateMotion();

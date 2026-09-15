"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const checkoutUrl = "https://directortecnico.com/checkout?productId=congreso-edt&currency=ARS&paymentStep=2";
const congressStart = new Date("2026-11-10T18:00:00-03:00").getTime();

const days = [
  {
    number: "01", title: "Dirección técnica y toma de decisiones", copy: "Cómo se arma un cuerpo técnico, cómo se gestiona un plantel y qué decisiones se toman bajo presión en la semana de partido.", summary: "Primera jornada centrada en cómo se arma y gestiona un cuerpo técnico integral.",
    summaryReleaseAt: new Date("2026-11-10T22:00:00-03:00").getTime(),
    highlights: [
      { title: "Diego Cagna", topic: "Armado de cuerpo técnico", copy: "Planteó qué roles son indispensables en un cuerpo técnico moderno y cómo se reparten las responsabilidades entre el DT, el ayudante de campo y el preparador físico." },
      { title: "Claudia Bravo", topic: "Gestión de plantel profesional", copy: "Compartió casos reales de manejo de grupo, comunicación con jugadores suplentes y decisiones bajo presión en semana de partido." },
    ],
  },
  {
    number: "02", title: "Rendimiento físico y prevención", copy: "Preparación física aplicada, carga de trabajo y prevención de lesiones en el fútbol de alto rendimiento.", summary: "Claves para planificar la carga, prevenir lesiones y sostener el rendimiento.",
    summaryReleaseAt: new Date("2026-11-11T22:00:00-03:00").getTime(),
    highlights: [
      { title: "Preparación física aplicada", topic: "Carga y recuperación", copy: "Criterios para ordenar el trabajo semanal, interpretar señales de fatiga y ajustar las cargas de entrenamiento." },
      { title: "Prevención de lesiones", topic: "Decisiones interdisciplinarias", copy: "Cómo dialogan el cuerpo técnico, la preparación física y el área médica para cuidar la disponibilidad del plantel." },
    ],
  },
  {
    number: "03", title: "Scouting, datos y gestión de clubes", copy: "Cómo se profesionaliza la búsqueda de talento y la gestión institucional con análisis de datos.", summary: "Una mirada aplicada sobre scouting, datos y gestión en el fútbol profesional.",
    summaryReleaseAt: new Date("2026-11-12T22:00:00-03:00").getTime(),
    highlights: [
      { title: "Scouting y datos", topic: "Búsqueda de talento", copy: "Qué preguntas ayudan a combinar observación, contexto y métricas al momento de evaluar futbolistas." },
      { title: "Gestión de clubes", topic: "Decisiones con información", copy: "Una síntesis de herramientas para transformar datos e informes en decisiones deportivas y de gestión." },
    ],
  },
];

function useCountdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  return useMemo(() => {
    if (now === null) return [[0, "días"], [0, "horas"], [0, "min"], [0, "seg"]] as const;
    const remaining = Math.max(0, congressStart - now);
    return [
      [Math.floor(remaining / 86_400_000), "días"],
      [Math.floor((remaining % 86_400_000) / 3_600_000), "horas"],
      [Math.floor((remaining % 3_600_000) / 60_000), "min"],
      [Math.floor((remaining % 60_000) / 1_000), "seg"],
    ];
  }, [now]);
}

function RegisterButton({ className = "", label = "Inscribirme al Congreso" }: { className?: string; label?: string }) {
  return <a className={`button button-primary ${className}`} href={checkoutUrl}>{label} <span aria-hidden="true">↗</span></a>;
}

export default function Home() {
  const countdown = useCountdown();
  const [selectedSummary, setSelectedSummary] = useState<(typeof days)[number] | null>(null);
  const [summaryNow, setSummaryNow] = useState<number | null>(null);
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!selectedSummary) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setSelectedSummary(null); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKeyDown); };
  }, [selectedSummary]);
  useEffect(() => {
    const updateTime = () => setSummaryNow(Date.now());
    updateTime();
    const timer = window.setInterval(updateTime, 60_000);
    return () => window.clearInterval(timer);
  }, []);
  return (
    <main>
      <a className="promo-bar" href={checkoutUrl}>
        <span><b>Congreso Virtual EDT 2026</b> · Inscripciones abiertas</span>
        <span className="promo-action">Reservá tu lugar <i aria-hidden="true">→</i></span>
      </a>
      <header className="header">
        <a className="brand" href="#inicio" aria-label="Congreso Virtual EDT 2026, ir al inicio">
          <Image src="/edt-logo.png" alt="Escuela EDT" width={48} height={48} priority />
          <span className="brand-rule" />
          <Image className="congreso-mark" src="/congreso-icon.png" alt="" width={36} height={36} />
          <span><strong>Congreso</strong><small>por EDT</small></span>
        </a>
        <div className="header-actions"><RegisterButton className="header-register" label="Inscribirme" /><a className="school-link" href="https://directortecnico.com">Escuela EDT <span aria-hidden="true">↗</span></a></div>
      </header>
      <RegisterButton className="floating-register" label="Inscribirme" />

      <section className="hero" id="inicio">
        <div className="container hero-grid">
          <div className="hero-copy enter">
            <p className="eyebrow">Escuela EDT · Tres jornadas online</p>
            <h1>Congreso Virtual EDT 2026 <em>Tres días para pensar el fútbol profesional.</em></h1>
            <p className="lead">Charlas en vivo con referentes de la dirección técnica, la preparación física, el scouting y la gestión de clubes. Un espacio online, intensivo y aplicable.</p>
            <div className="hero-actions"><RegisterButton /><a className="button button-secondary" href="#programa">Ver programa <span aria-hidden="true">↓</span></a></div>
            <div className="countdown" aria-label="Cuenta regresiva al Congreso">
              {countdown.map(([value, label]) => <div className="time-unit" key={label}><strong>{String(value).padStart(2, "0")}</strong><span>{label}</span></div>)}
            </div>
          </div>
          <aside className="include-card enter delay-1">
            <p className="card-label">Tu inscripción incluye</p>
            <ul>
              <li><i>01</i><span>Acceso en vivo a las tres jornadas, vía streaming.</span></li>
              <li><i>02</i><span>Resúmenes y contenidos destacados al finalizar cada día.</span></li>
              <li><i>03</i><span>Certificado de participación de Escuela EDT.</span></li>
              <li><i>04</i><span>Un espacio para llevar ideas directamente a tu trabajo.</span></li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section" id="congreso">
        <div className="container">
          <div className="section-head reveal"><p className="eyebrow">Sobre el Congreso</p><h2>Tres jornadas, tres miradas del fútbol profesional.</h2><p>Cada día reúne a especialistas que trabajan hoy en clubes profesionales de la región.</p></div>
          <div className="pitch-photo reveal"><Image src="https://images.unsplash.com/photo-1729843352938-0e10fbf96585?auto=format&fit=crop&w=1600&q=82" alt="Vista aérea de una cancha de fútbol" fill sizes="(max-width: 900px) 100vw, 1040px" /></div>
          <div className="axes-grid">{days.map((day, index) => <article className="axis-card reveal" style={{ transitionDelay: `${index * 90}ms` }} key={day.number}><span>{day.number}</span><h3>{day.title}</h3><p>{day.copy}</p></article>)}</div>
        </div>
      </section>

      <section className="section program-section" id="programa">
        <div className="container">
          <div className="section-head reveal"><p className="eyebrow">Programa</p><h2>Una experiencia hecha para mirar, conversar y aplicar.</h2><p>El acceso al Congreso reúne las tres jornadas y los contenidos que se liberan después de cada encuentro.</p></div>
          <div className="program-grid">
            {days.map((day, index) => {
              const summaryAvailable = summaryNow !== null && summaryNow >= day.summaryReleaseAt;
              return <article className="program-card reveal" style={{ transitionDelay: `${index * 100}ms` }} key={day.number}>
                <div className="program-top"><span>Día {day.number}</span>{summaryAvailable ? <b><i aria-hidden="true" />Resumen disponible</b> : <b className="program-locked-status">Próximamente</b>}</div>
                {summaryAvailable ? <>
                  <div className="program-body"><h3>{day.title}</h3><div className="summary-preview" aria-hidden="true">✓</div><p>{day.summary}</p></div>
                  <button className="program-summary-link" type="button" onClick={() => setSelectedSummary(day)}>⚽ <span>Ver resumen del día</span></button>
                </> : <>
                  <div className="program-locked-content"><p className="program-number">{day.number}</p><h3>{day.title}</h3><p>{day.copy}</p></div>
                  <a className="program-register-link" href={checkoutUrl}>Reservar mi lugar <span aria-hidden="true">→</span></a>
                </>}
              </article>;
            })}
          </div>
        </div>
      </section>

      <section className="section final-section">
        <div className="container"><div className="final-card reveal"><div><p className="eyebrow">Cupos limitados</p><h2>Reservá tu lugar en el Congreso EDT.</h2><p>Todo el contenido, una sola inscripción y una experiencia pensada para quienes quieren trabajar mejor en fútbol.</p></div><RegisterButton /></div></div>
      </section>

      {selectedSummary && <div className="summary-modal-backdrop" role="presentation" onMouseDown={() => setSelectedSummary(null)}>
        <section className="summary-modal" role="dialog" aria-modal="true" aria-labelledby="summary-modal-title" onMouseDown={(event) => event.stopPropagation()}>
          <div className="summary-modal-head"><p className="eyebrow">Resumen del día {selectedSummary.number}</p><button type="button" onClick={() => setSelectedSummary(null)} aria-label="Cerrar resumen">×</button></div>
          <h2 id="summary-modal-title">{selectedSummary.title}</h2>
          <p className="summary-modal-intro">{selectedSummary.summary}</p>
          <div className="summary-video-placeholder"><b>Resumen · máx. 1 min</b><span>Video pendiente de carga</span></div>
          <div className="summary-highlights">
            {selectedSummary.highlights.map((highlight) => <article key={highlight.title}>
              <div><h3>{highlight.title}</h3><span>{highlight.topic}</span></div>
              <p>{highlight.copy}</p>
            </article>)}
          </div>
        </section>
      </div>}

      <footer className="footer"><div className="container footer-content"><div className="footer-brand"><Image src="/edt-logo.png" alt="Escuela EDT" width={38} height={38} /><span>Congreso EDT</span></div><p>Escuela de Dirección Técnica · Formación para profesionales del fútbol.</p><p>© {new Date().getFullYear()} Escuela EDT. Todos los derechos reservados.</p></div></footer>
    </main>
  );
}

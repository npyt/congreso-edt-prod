"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const checkoutUrl = "https://directortecnico.com/checkout?productId=congreso-edt&currency=ARS&paymentStep=2";
const congressStart = new Date("2026-10-16T18:30:00-03:00").getTime();

const schedule = [
  { day: "Día 1", date: "Viernes 16 de octubre", time: "18:30 a 22:00 hs", accent: "blue" },
  { day: "Día 2", date: "Sábado 17 de octubre", time: "9:00 a 12:30 hs", accent: "cyan" },
  { day: "Día 3", date: "Domingo 18 de octubre", time: "9:00 a 12:30 hs", accent: "violet" },
];

type SpeakerHistoryEntry = {
  club: string;
  role: string;
  logo?: string;
  period?: string;
};

type Speaker = {
  name: string;
  poster: string;
  role: string;
  topic: string;
  copy: string;
  context: string;
  history: SpeakerHistoryEntry[];
  published: boolean;
};

// Each profile is intentionally published one by one. Keep future profiles with published: false
// until their communication piece is approved.
const speakers: Speaker[] = [
  {
    name: "Darío Curti",
    poster: "/speaker-posters/curti.jpg",
    role: "Entrenador de fútbol · Secretario técnico · Analista de rendimiento",
    topic: "Organización de un club semiamateur",
    copy: "Cómo ordenar roles, construir una identidad y sostener un trabajo colectivo que haga crecer a un club.",
    context: "También desarrolló tareas de gestión y formación en ATFA, Libro de Pases y La Pizarra del DT.",
    history: [
      { club: "Independiente", role: "Reserva · cuerpo técnico", logo: "/club-badges/independiente.png" },
      { club: "Santamarina", role: "Primer equipo · cuerpo técnico", logo: "/club-badges/santamarina.png" },
      { club: "Tigre", role: "Secretaría deportiva y coordinación de inferiores", logo: "/club-badges/tigre.png" },
      { club: "Deportivo Maldonado", role: "Primer equipo · cuerpo técnico", logo: "/club-badges/deportivo-maldonado.png" },
    ],
    published: true,
  },
  {
    name: "Diego Fernández",
    poster: "/speaker-posters/fernandez.jpg",
    role: "Director técnico de fútbol profesional",
    topic: "La cabeza del entrenador: el arte de vivir en la cuerda floja",
    copy: "Una mirada honesta sobre la conducción, la presión de decidir y el cuidado de la salud mental en el trabajo cotidiano del entrenador.",
    context: "Su recorrido reúne experiencias en fútbol argentino, brasileño y colombiano.",
    history: [
      { club: "Corinthians", role: "Experiencia en fútbol profesional", logo: "/club-badges/corinthians.png" },
      { club: "Patronato", role: "Experiencia en fútbol profesional", logo: "/club-badges/patronato.png" },
      { club: "Cúcuta Deportivo", role: "Experiencia en fútbol profesional", logo: "/club-badges/cucuta-deportivo.png" },
      { club: "Quilmes", role: "Experiencia en fútbol profesional", logo: "/club-badges/quilmes.png" },
      { club: "Sarmiento de Junín", role: "Experiencia en fútbol profesional", logo: "/club-badges/sarmiento-junin.png" },
      { club: "Central Córdoba", role: "Experiencia en fútbol profesional", logo: "/club-badges/central-cordoba.png" },
      { club: "Gimnasia y Esgrima de Mendoza", role: "Experiencia en fútbol profesional", logo: "/club-badges/gimnasia-mendoza.png" },
      { club: "Independiente Rivadavia", role: "Experiencia en fútbol profesional", logo: "/club-badges/independiente-rivadavia.png" },
      { club: "Águilas Doradas", role: "Experiencia en fútbol profesional", logo: "/club-badges/aguilas-doradas.png" },
    ],
    published: true,
  },
  {
    name: "Guido Thompson",
    poster: "/speaker-posters/thompson.jpg",
    role: "Licenciado en Educación Física · Preparador físico de fútbol",
    topic: "Organización de la semana de entrenamiento en la altura",
    copy: "Criterios para planificar, controlar y adaptar el trabajo semanal cuando el contexto exige respuestas específicas.",
    context: "Más de dos décadas de experiencia en fútbol formativo, reserva y planteles profesionales. Fue gerente deportivo de Vélez Sarsfield y es director académico de Escuela EDT.",
    history: [
      { club: "Vélez Sarsfield", role: "Fútbol juvenil, reserva y plantel profesional", logo: "/club-badges/velez.png", period: "1998–2020" },
    ],
    published: true,
  },
  {
    name: "Diego Herrero",
    poster: "/speaker-posters/herrero.jpg",
    role: "Director técnico · Gestión deportiva",
    topic: "Creación de herramientas de trabajo aplicadas al fútbol",
    copy: "Cómo convertir una idea de juego en herramientas claras para entrenar, comunicar y tomar mejores decisiones.",
    context: "Además de su trabajo como entrenador, fue cofundador y coordinador general de CIFA.",
    history: [
      { club: "Deportivo Español", role: "Manager, coordinador general y DT principal", logo: "/club-badges/deportivo-espanol.png", period: "2017–2024" },
      { club: "Liniers", role: "DT principal · Primera B Metropolitana", logo: "/club-badges/liniers.png", period: "2024–2025" },
      { club: "Ituzaingó", role: "DT principal · Primera B Metropolitana", logo: "/club-badges/ituzaingo.png", period: "2026" },
      { club: "Fénix", role: "DT principal · Primera División", logo: "/club-badges/fenix.png", period: "Actualidad" },
    ],
    published: true,
  },
  {
    name: "Hamin Kwon",
    poster: "/speaker-posters/kwon.jpg",
    role: "PhD (c), CSCS, CPSS · Preparador físico y ciencia aplicada al deporte",
    topic: "Ciencias aplicadas al fútbol",
    copy: "Cómo traducir datos y ciencia del deporte en decisiones concretas para entrenar y preparar mejor a los jugadores.",
    context: "También es founder y CEO de Real_AMS y trabaja en el área de Human Performance.",
    history: [
      { club: "Atlas FC", role: "Head de ciencias aplicadas del deporte y datos", logo: "/club-badges/atlas.png", period: "2026–actualidad" },
      { club: "FC Dallas", role: "Preparador físico", logo: "/club-badges/fc-dallas.png", period: "2025" },
      { club: "Indy Eleven", role: "Rendimiento y ciencias del deporte", logo: "/club-badges/indy-eleven.png", period: "2024" },
      { club: "Nashville SC", role: "Pasantía en deporte y rendimiento", logo: "/club-badges/nashville.png", period: "2023" },
    ],
    published: true,
  },
  {
    name: "Paola Yanque",
    poster: "/speaker-posters/yanque.jpg",
    role: "Nutricionista · Especialista en nutrición deportiva",
    topic: "Nutrición estratégica en el fútbol: cómo alimentar al jugador antes, durante y después del partido",
    copy: "Una guía aplicable para que la alimentación acompañe el rendimiento, la recuperación y la disponibilidad del jugador.",
    context: "Licenciada en Nutrición por la Universidad Nacional de San Agustín y con formación complementaria en fútbol y suplementación deportiva.",
    history: [
      { club: "FBC Melgar", role: "Nutrición deportiva", logo: "/club-badges/melgar.png", period: "2024–actualidad" },
    ],
    published: true,
  },
  {
    name: "Matías Diego Passarelli",
    poster: "/speaker-posters/passarelli.jpg",
    role: "Ex jugador de fútbol profesional · Técnico de fútbol",
    topic: "Microciclo en divisiones inferiores",
    copy: "Cómo diseñar una semana de trabajo en juveniles que conecte preparación, análisis y compromiso competitivo.",
    context: "Actualmente trabaja en metodología de estructuras juveniles y coordinación de técnica específica en Defensa y Justicia; también es coordinador académico y docente en EDT.",
    history: [
      { club: "Defensa y Justicia", role: "Metodología y videoanálisis de juveniles", logo: "/club-badges/defensa-y-justicia.png", period: "2024–actualidad" },
      { club: "Lanús", role: "Ayudante técnico · Octava División", logo: "/club-badges/lanus.png", period: "2021–2022" },
      { club: "Comunicaciones", role: "Ayudante de campo · Primera División", logo: "/club-badges/comunicaciones.png", period: "2022–2023" },
      { club: "El Porvenir", role: "Ayudante de campo · Primera División", logo: "/club-badges/el-porvenir.png", period: "2021–2022" },
      { club: "Sportivo Barracas", role: "Ayudante de campo · Primera División", logo: "/club-badges/sportivo-barracas.png", period: "2021–2022" },
      { club: "Tristán Suárez", role: "Ayudante de campo y DT de Novena", logo: "/club-badges/tristan-suarez.png", period: "2019–2021" },
    ],
    published: true,
  },
  {
    name: "Pablo Javier Pérez Martínez",
    poster: "/speaker-posters/perez-martinez.jpg",
    role: "Licenciado en Psicología (UBA) · Psicoanalista",
    topic: "El futbolista hiperconectado: gestión de redes, foco atencional y blindaje mental",
    copy: "Una charla para entender cómo las redes, la presión y la atención inciden en el bienestar y el rendimiento del futbolista.",
    context: "Profesor titular en psicología, salud mental, formación humana y psicología del deporte en UCU; también participa como disertante y conductor de espacios de innovación educativa.",
    history: [
      { club: "Universidad de Concepción del Uruguay", role: "Docencia universitaria en psicología, salud mental y deporte", period: "2009–actualidad" },
      { club: "UNER", role: "Docente · Ciclo de Promoción de la Salud", period: "2013" },
    ],
    published: true,
  },
  {
    name: "Leandro J. Clocchiatti",
    poster: "/speaker-posters/clocchiatti.jpg",
    role: "Profesor de Educación Física · Preparador físico de fútbol",
    topic: "Trabajo de fuerza dentro del microciclo de las fuerzas básicas del Toluca",
    copy: "Cómo integrar fuerza, planificación y análisis dentro de una semana de trabajo orientada al rendimiento.",
    context: "Su recorrido combina fútbol formativo, profesional y coordinación de fútbol juvenil.",
    history: [
      { club: "Vélez Sarsfield", role: "Selectivo y reserva", logo: "/club-badges/velez.png", period: "2008–2020" },
      { club: "FBC Melgar", role: "Fútbol infantil, juvenil y profesional", logo: "/club-badges/melgar.png", period: "2021" },
      { club: "San Lorenzo", role: "Fútbol juvenil", logo: "/club-badges/san-lorenzo.png", period: "2022" },
      { club: "Platense", role: "Fútbol profesional · cuerpo técnico", logo: "/club-badges/platense.png", period: "2022" },
      { club: "Nueva Chicago", role: "Fútbol profesional", logo: "/club-badges/nueva-chicago.png", period: "2023" },
      { club: "Flandria", role: "Fútbol profesional", logo: "/club-badges/flandria.png", period: "2023" },
      { club: "Deportivo Toluca", role: "Coordinador de fútbol juvenil", logo: "/club-badges/toluca.png", period: "2024–actualidad" },
    ],
    published: true,
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
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!selectedSpeaker) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setSelectedSpeaker(null); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKeyDown); };
  }, [selectedSpeaker]);
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
            <div className="hero-actions"><RegisterButton /><a className="button button-secondary" href="#expositores">Ver expositores <span aria-hidden="true">↓</span></a></div>
            <div className="countdown" aria-label="Cuenta regresiva al Congreso">
              {countdown.map(([value, label]) => <div className="time-unit" key={label}><strong>{String(value).padStart(2, "0")}</strong><span>{label}</span></div>)}
            </div>
          </div>
          <aside className="include-card enter delay-1">
            <p className="card-label">Tu inscripción incluye</p>
            <p className="price-tag"><span>Valor de inscripción</span><strong>$50.000</strong></p>
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
          <div className="section-head reveal"><p className="eyebrow">Cronograma del Congreso</p><h2>12 expositores en tres días de fútbol real.</h2><p>Un encuentro virtual con charlas aplicadas, breaks y una mesa redonda final en cada jornada.</p></div>
          <div className="schedule-meta reveal"><span>Modalidad virtual</span><i aria-hidden="true" /> <span>12 expositores</span><i aria-hidden="true" /> <span>3 días</span></div>
          <div className="schedule-grid">{schedule.map((item, index) => <article className={`schedule-card ${item.accent} reveal`} style={{ transitionDelay: `${index * 90}ms` }} key={item.day}>
            <div className="schedule-card-day"><span>{item.day}</span><b>{String(index + 1).padStart(2, "0")}</b></div>
            <div className="schedule-card-main"><p>{item.date}</p><strong>{item.time}</strong></div>
            <ul><li>4 expositores</li><li>Breaks</li><li>Mesa redonda final</li></ul>
          </article>)}</div>
        </div>
      </section>

      <section className="section speakers-section" id="expositores">
        <div className="container">
          <div className="section-head reveal"><p className="eyebrow">Expositores anunciados</p><h2>Nuestros expositores</h2><p>Dirección técnica, rendimiento, nutrición, ciencia aplicada y salud mental. Estos son los perfiles confirmados hasta hoy.</p></div>
          <div className="speakers-grid">
            {speakers.filter((speaker) => speaker.published).map((speaker, index) => <article className="speaker-card reveal" style={{ transitionDelay: `${(index % 3) * 85}ms` }} key={speaker.name}>
              <div className="speaker-card-visual">
                <div className="speaker-portrait"><Image src={speaker.poster} alt="" fill sizes="(max-width: 560px) calc(100vw - 32px), (max-width: 850px) calc(50vw - 33px), 350px" /></div><div className="speaker-portrait-overlay" />
                <div className="speaker-card-head"><span>Nuestro expositor</span><b>{String(index + 1).padStart(2, "0")}</b></div>
                <div className="speaker-card-copy"><h3>{speaker.name}</h3><p className="speaker-role">{speaker.role}</p></div>
                <div className="speaker-topic"><span>Tema de su charla</span><strong>“{speaker.topic}”</strong></div>
              </div>
              {speaker.history.some((entry) => entry.logo) && <div className="speaker-club-strip" aria-label={`Clubes en la trayectoria de ${speaker.name}`}><span className="speaker-club-strip-title">Trayectoria</span><div>{speaker.history.filter((entry) => entry.logo).slice(0, 5).map((entry) => <Image key={entry.club} src={entry.logo!} alt={`Escudo de ${entry.club}`} width={34} height={34} />)}{speaker.history.filter((entry) => entry.logo).length > 5 && <span>+{speaker.history.filter((entry) => entry.logo).length - 5}</span>}</div></div>}
              <button className="speaker-history-link" type="button" onClick={() => setSelectedSpeaker(speaker)}>Ver ficha y trayectoria <span aria-hidden="true">→</span></button>
            </article>)}
          </div>
        </div>
      </section>

      <section className="section final-section">
        <div className="container"><div className="final-card reveal"><div><p className="eyebrow">Cupos limitados · Inscripción $50.000</p><h2>Reservá tu lugar en el Congreso EDT.</h2><p>Todo el contenido, una sola inscripción y una experiencia pensada para quienes quieren trabajar mejor en fútbol.</p></div><RegisterButton /></div></div>
      </section>

      {selectedSpeaker && <div className="summary-modal-backdrop" role="presentation" onMouseDown={() => setSelectedSpeaker(null)}>
        <section className="speaker-modal" role="dialog" aria-modal="true" aria-label={`Flyer de ${selectedSpeaker.name}`} onMouseDown={(event) => event.stopPropagation()}>
          <Image className="speaker-modal-flyer" src={selectedSpeaker.poster} alt={`Flyer de ${selectedSpeaker.name}`} width={1080} height={1350} priority />
          <button className="speaker-flyer-close" type="button" onClick={() => setSelectedSpeaker(null)} aria-label="Cerrar flyer">×</button>
        </section>
      </div>}

      <footer className="footer"><div className="container footer-content"><div className="footer-brand"><Image src="/edt-logo.png" alt="Escuela EDT" width={38} height={38} /><span>Congreso EDT</span></div><p>Escuela de Dirección Técnica · Formación para profesionales del fútbol.</p><p>© {new Date().getFullYear()} Escuela EDT. Todos los derechos reservados.</p></div></footer>
    </main>
  );
}

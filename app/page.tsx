"use client";

import Image from "next/image";
import { type FormEvent, useEffect, useState } from "react";

const baseCheckoutUrl = "https://directortecnico.com/checkout?productId=congreso-edt&currency=ARS&paymentStep=2";
// Enable the live experience before the first session so attendees can sign in early.
const liveAccessEnabled = true;
const congressProductSlug = "congreso-edt";
const apiRoot = "https://api.directortecnico.com";

const schedule = [
  { day: "Día 1", date: "Viernes 16 de octubre", time: "18:30 a 22:00 hs", accent: "blue" },
  { day: "Día 2", date: "Sábado 17 de octubre", time: "9:00 a 12:30 hs", accent: "cyan" },
  { day: "Día 3", date: "Domingo 18 de octubre", time: "9:00 a 12:30 hs", accent: "violet" },
];

const agenda = [
  {
    day: "Día 1",
    date: "Viernes 16 de octubre",
    accent: "blue",
    sessions: [
      { time: "18:30 – 19:10", speaker: "Diego Fernández", topic: "La cabeza del entrenador" },
      { time: "19:20 – 20:00", speaker: "Darío Curti", topic: "Organización de un club semiamateur" },
      { time: "20:10 – 20:50", speaker: "Matías Passarelli", topic: "Microciclo en divisiones inferiores" },
      { time: "21:00 – 21:40", speaker: "Guido Thompson", topic: "Organización de la semana de entrenamiento en la altura" },
    ],
    roundtable: "21:40 – 22:00",
  },
  {
    day: "Día 2",
    date: "Sábado 17 de octubre",
    accent: "cyan",
    sessions: [
      { time: "09:00 – 09:40", speaker: "Diego Herrero", topic: "Creación de herramientas de trabajo aplicadas al fútbol" },
      { time: "09:50 – 10:30", speaker: "Pablo Pérez", topic: "El futbolista hiperconectado: gestión de redes, foco atencional y blindaje mental" },
      { time: "10:40 – 11:20", speaker: "Damián Lanatta", topic: "Entrevista" },
      { time: "11:30 – 12:10", speaker: "Hamin Kwon", topic: "Ciencias aplicadas al fútbol" },
    ],
    roundtable: "12:10 – 12:30",
  },
  {
    day: "Día 3",
    date: "Domingo 18 de octubre",
    accent: "violet",
    sessions: [
      { time: "09:00 – 09:40", speaker: "Matías Ariel Carnival", topic: "Liderazgo consciente para las nuevas generaciones" },
      { time: "09:50 – 10:30", speaker: "Paola Yanque", topic: "Nutrición estratégica en el fútbol: cómo alimentar al jugador antes, durante y después del partido" },
      { time: "10:40 – 11:20", speaker: "Leandro Clocchiatti", topic: "Trabajo de fuerza dentro del microciclo de las fuerzas básicas del Toluca" },
      { time: "11:30 – 12:10", speaker: "Miguel Rondelli", topic: "Ventajas y desventajas en el juego" },
    ],
    roundtable: "12:10 – 12:30",
  },
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
  useFlyerCrop?: boolean;
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
  {
    name: "Damián Lanatta",
    poster: "/speaker-posters/lanatta.png",
    useFlyerCrop: true,
    role: "Preparador físico",
    topic: "Entrevista",
    copy: "Una conversación sobre experiencia, ciencia y alto rendimiento aplicados al fútbol profesional.",
    context: "Preparador físico con recorrido en Selección Colombia y clubes de Argentina, Paraguay y el fútbol formativo.",
    history: [
      { club: "Selección Colombia", role: "Segundo preparador físico de la Selección Mayor", period: "2024–julio 2026" },
      { club: "Central Córdoba", role: "Preparador físico de Primera División", logo: "/club-badges/central-cordoba.png", period: "2023" },
      { club: "Aldosivi", role: "Preparador físico de Primera División", period: "2023" },
      { club: "Rosario Central", role: "Preparador físico de Primera División", period: "2022" },
      { club: "Boca Juniors", role: "Preparador físico de Primera División", period: "2020" },
      { club: "Cerro Porteño", role: "Preparador físico de Primera División", period: "2019" },
      { club: "San Lorenzo", role: "Preparador físico de Primera División y Reserva", logo: "/club-badges/san-lorenzo.png", period: "2018–2019" },
      { club: "Vélez Sarsfield", role: "Preparador físico de Primera División, Reserva e inferiores", logo: "/club-badges/velez.png", period: "2008–2017" },
    ],
    published: true,
  },
  {
    name: "Matías Ariel Carnival",
    poster: "/speaker-posters/carnival.png",
    useFlyerCrop: true,
    role: "Coach ontológico profesional",
    topic: "Liderazgo consciente para las nuevas generaciones",
    copy: "Herramientas para liderar con conciencia, acompañar procesos y construir vínculos que mejoren el trabajo colectivo.",
    context: "Coach ontológico, periodista y director técnico nacional con 18 años de trayectoria como jugador profesional.",
    history: [
      { club: "Banfield", role: "Coordinador del fútbol infantil" },
      { club: "Huracán", role: "Coach del plantel profesional" },
      { club: "Talleres de Remedios de Escalada", role: "Coach del plantel profesional en tres ciclos institucionales" },
    ],
    published: true,
  },
  {
    name: "Miguel Rondelli",
    poster: "/speaker-posters/rondelli.png",
    useFlyerCrop: true,
    role: "Director técnico · FBC Melgar",
    topic: "Ventajas y desventajas en el juego",
    copy: "Una mirada sobre identidad de trabajo, disciplina y excelencia para competir y tomar decisiones dentro del juego.",
    context: "Entrenador con Licencia PRO Conmebol y experiencia en Perú, Ecuador, Argentina y el desarrollo metodológico de Vélez Sarsfield.",
    history: [
      { club: "FBC Melgar", role: "Director técnico principal", logo: "/club-badges/melgar.png", period: "2026–actualidad" },
      { club: "Cusco FC", role: "Director técnico principal", period: "2024–marzo 2026" },
      { club: "Emelec", role: "Director técnico principal", period: "2023" },
      { club: "Universidad Católica", role: "Director técnico principal", period: "2021–2022" },
      { club: "Vélez Sarsfield", role: "Dirección de metodología, fútbol infantil y reserva", logo: "/club-badges/velez.png", period: "2008–2017" },
    ],
    published: true,
  },
];

function RegisterButton({ href, className = "", label = "Inscribirme al Congreso" }: { href: string; className?: string; label?: string }) {
  return <a className={`button button-primary ${className}`} href={href}>{label} <span aria-hidden="true">↗</span></a>;
}

function useCheckoutUrl() {
  const [checkoutUrl, setCheckoutUrl] = useState(baseCheckoutUrl);

  useEffect(() => {
    const campaign = new URLSearchParams(window.location.search).get("utm_campaign")?.trim();
    if (!campaign) return;

    const checkout = new URL(baseCheckoutUrl);
    checkout.searchParams.set("utm_campaign", campaign);
    setCheckoutUrl(checkout.toString());
  }, []);

  return checkoutUrl;
}


type ProductContent = { type?: string; url?: string; title?: string; order?: number };
type SignedInUser = { firstName?: string | null; lastName?: string | null };
type AccessStep = "choice" | "email" | "requesting-code" | "code" | "verifying-code" | "ready" | "unregistered" | "missing-link" | "account-not-found";

function LiveAccess({ checkoutUrl }: { checkoutUrl: string }) {
  const [step, setStep] = useState<AccessStep>("choice");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [user, setUser] = useState<SignedInUser | null>(null);
  const [zoomUrl, setZoomUrl] = useState("");
  const [error, setError] = useState("");

  const goToEmail = () => { setError(""); setCode(""); setStep("email"); };

  const requestCode = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setStep("requesting-code");

    try {
      const codeResponse = await fetch(`${apiRoot}/users/one-time-login-codes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });

      if (!codeResponse.ok) {
        if (codeResponse.status === 404) {
          setStep("account-not-found");
          return;
        }
        setStep("email");
        setError(codeResponse.status === 429
          ? "Esperá un minuto antes de pedir otro código."
          : "No pudimos enviar el código. Intentá nuevamente en unos minutos.");
        return;
      }

      setStep("code");
    } catch {
      setStep("email");
      setError("No pudimos conectar con EDT. Revisá tu conexión e intentá de nuevo.");
    }
  };

  const verifyCode = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setStep("verifying-code");

    try {
      const signInResponse = await fetch(`${apiRoot}/users/one-time-login-codes/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), code: code.trim().toUpperCase() }),
      });
      const token = signInResponse.headers.get("Authorization");

      if (!signInResponse.ok || !token) {
        setStep("code");
        setError("El código no es válido o venció. Revisalo o pedí uno nuevo.");
        return;
      }

      const signedInUser = await signInResponse.json() as SignedInUser;
      setUser(signedInUser);

      const contentResponse = await fetch(`${apiRoot}/products/${congressProductSlug}/content`, {
        headers: { Authorization: token },
      });

      if (!contentResponse.ok) {
        setStep("unregistered");
        return;
      }

      const contents = await contentResponse.json() as ProductContent[];
      const meeting = contents
        .filter((content) => content.type === "LINK" && content.url)
        .sort((first, second) => (first.order ?? 0) - (second.order ?? 0))[0];
      const configuredZoomUrl = process.env.NEXT_PUBLIC_CONGRESS_ZOOM_URL;
      const link = meeting?.url || configuredZoomUrl;

      if (!link) {
        setStep("missing-link");
        return;
      }

      setZoomUrl(link);
      setStep("ready");
    } catch {
      setStep("code");
      setError("No pudimos conectar con EDT. Revisá tu conexión e intentá de nuevo.");
    }
  };

  if (step === "ready") {
    const name = [user?.firstName, user?.lastName].filter(Boolean).join(" ");
    return <aside className="live-access-card live-access-ready" aria-live="polite">
      <span className="live-card-kicker"><i aria-hidden="true" />Acceso confirmado</span>
      <h2>{name ? `Bienvenido, ${name.split(" ")[0]}.` : "Tu lugar está listo."}</h2>
      <p>La sala de Zoom está abierta. Entrá cuando quieras y disfrutá de la jornada en vivo.</p>
      <a className="live-zoom-button" href={zoomUrl} target="_blank" rel="noreferrer">Ingresar a Zoom <span aria-hidden="true">↗</span></a>
      <button className="live-back-link" type="button" onClick={() => setStep("choice")}>Usar otra cuenta</button>
    </aside>;
  }

  if (step === "unregistered") {
    return <aside className="live-access-card" aria-live="polite">
      <span className="live-card-kicker"><i aria-hidden="true" />Cuenta encontrada</span>
      <h2>Esta cuenta todavía no tiene acceso.</h2>
      <p>Si ya te inscribiste, revisá que hayas ingresado con el mismo correo. Si aún no participás, podés reservar tu lugar ahora.</p>
      <RegisterButton href={checkoutUrl} className="live-register-button" label="Quiero participar del Congreso" />
      <button className="live-back-link" type="button" onClick={goToEmail}>Probar con otro correo</button>
    </aside>;
  }

  if (step === "account-not-found") {
    return <aside className="live-access-card" aria-live="polite">
      <span className="live-card-kicker"><i aria-hidden="true" />Cuenta no encontrada</span>
      <h2>No encontramos una cuenta con ese correo.</h2>
      <p>Probá con el correo que usaste al inscribirte. Si todavía no tenés tu lugar, podés reservarlo ahora.</p>
      <RegisterButton href={checkoutUrl} className="live-register-button" label="Quiero participar del Congreso" />
      <button className="live-back-link" type="button" onClick={goToEmail}>Usar otro correo</button>
    </aside>;
  }

  if (step === "missing-link") {
    return <aside className="live-access-card" aria-live="polite">
      <span className="live-card-kicker"><i aria-hidden="true" />Acceso confirmado</span>
      <h2>Estamos preparando la sala.</h2>
      <p>Tu inscripción está confirmada. El botón de ingreso se habilitará apenas la sala de Zoom esté disponible.</p>
      <button className="live-back-link" type="button" onClick={() => setStep("choice")}>Volver</button>
    </aside>;
  }

  if (step === "email" || step === "requesting-code") {
    return <aside className="live-access-card live-code-card">
      <button className="live-close" type="button" onClick={() => setStep("choice")} aria-label="Volver a las opciones de acceso">×</button>
      <span className="live-card-kicker"><i aria-hidden="true" />Ya estoy registrado</span>
      <h2>Ingresá con tu correo.</h2>
      <p>Te vamos a enviar un código único de seis caracteres para confirmar tu acceso. No necesitás recordar tu contraseña.</p>
      <form className="live-code-form" onSubmit={requestCode}>
        <label>Correo electrónico<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" placeholder="nombre@correo.com" required /></label>
        {error && <p className="live-form-error" role="alert">{error}</p>}
        <button className="live-zoom-button" type="submit" disabled={step === "requesting-code"}>{step === "requesting-code" ? "Enviando código…" : "Continuar"}<span aria-hidden="true">→</span></button>
      </form>
    </aside>;
  }

  if (step === "code" || step === "verifying-code") {
    return <aside className="live-access-card live-code-card">
      <button className="live-close" type="button" onClick={goToEmail} aria-label="Cambiar correo">×</button>
      <span className="live-card-kicker"><i aria-hidden="true" />Revisá tu correo</span>
      <h2>Ingresá tu código.</h2>
      <p>Enviamos un código de seis caracteres a <strong className="live-email-hint">{email.trim().toLowerCase()}</strong>. Vence en 10 minutos.</p>
      <form className="live-code-form" onSubmit={verifyCode}>
        <label>Código de acceso<input className="live-code-input" type="text" value={code} onChange={(event) => setCode(event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6))} autoComplete="one-time-code" inputMode="text" placeholder="ABC123" maxLength={6} required /></label>
        {error && <p className="live-form-error" role="alert">{error}</p>}
        <button className="live-zoom-button" type="submit" disabled={step === "verifying-code"}>{step === "verifying-code" ? "Verificando acceso…" : "Ingresar al Congreso"}<span aria-hidden="true">→</span></button>
      </form>
      <button className="live-back-link" type="button" onClick={() => { setError(""); setStep("email"); }}>Cambiar correo o pedir otro código</button>
    </aside>;
  }

  return <aside className="live-access-card">
    <span className="live-card-kicker"><i aria-hidden="true" />Elegí cómo ingresar</span>
    <h2>Tu acceso al Congreso.</h2>
    <p>Si ya tenés tu lugar, entrá con tu cuenta de EDT. Todavía estás a tiempo de sumarte a la experiencia.</p>
    <div className="live-options">
      <button className="live-option live-option-primary" type="button" onClick={goToEmail}><span className="live-option-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M4 12h15M14 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></span><span><b>Ya estoy registrado</b><small>Recibir código de acceso</small></span></button>
      <RegisterButton href={checkoutUrl} className="live-option live-option-secondary" label="Quiero participar" />
    </div>
  </aside>;
}

export default function Home() {
  const checkoutUrl = useCheckoutUrl();
  const isLive = liveAccessEnabled;
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
      <a className={`promo-bar${isLive ? " promo-bar-live" : ""}`} href={isLive ? "#en-vivo" : checkoutUrl}>
        <span><b>Congreso Virtual EDT 2026</b> · {isLive ? "Ya estamos en vivo" : "Inscripciones abiertas"}</span>
        <span className="promo-action">{isLive ? "Ingresar al Congreso" : "Reservá tu lugar"} <i aria-hidden="true">→</i></span>
      </a>
      <header className="header">
        <a className="brand" href="#inicio" aria-label="Congreso Virtual EDT 2026, ir al inicio">
          <Image src="/edt-logo.png" alt="Escuela EDT" width={48} height={48} priority />
          <span className="brand-rule" />
          <Image className="congreso-mark" src="/congreso-icon.png" alt="" width={36} height={36} />
          <span><strong>Congreso</strong><small>por EDT</small></span>
        </a>
        <div className="header-actions">{isLive ? <a className="header-live-link" href="#en-vivo"><i aria-hidden="true" />En vivo</a> : <RegisterButton href={checkoutUrl} className="header-register" label="Inscribirme" />}<a className="school-link" href="https://directortecnico.com">Escuela EDT <span aria-hidden="true">↗</span></a></div>
      </header>
      {isLive ? <a className="floating-register floating-live" href="#en-vivo"><i aria-hidden="true" />Ingresar en vivo</a> : <RegisterButton href={checkoutUrl} className="floating-register" label="Inscribirme" />}

      <section className={`hero${isLive ? " hero-live" : ""}`} id="inicio">
        <div className="container hero-grid">
          {isLive ? <>
            <div className="hero-copy enter">
              <p className="eyebrow live-eyebrow"><i aria-hidden="true" />Transmisión en vivo · Congreso EDT 2026</p>
              <h1>Ya estamos <em>en vivo.</em></h1>
              <p className="lead">Las ideas, experiencias y herramientas del fútbol profesional ya están en juego. Ingresá con tu cuenta EDT y sumate a la jornada desde donde estés.</p>
              <div className="live-signal-row"><span className="live-pulse" aria-hidden="true" /><span>Señal en directo</span><b>Zoom · acceso para inscriptos</b></div>
            </div>
            <div className="enter delay-1" id="en-vivo"><LiveAccess checkoutUrl={checkoutUrl} /></div>
          </> : <>
            <div className="hero-copy enter">
              <p className="eyebrow">Escuela EDT · Tres jornadas online</p>
              <h1>Congreso Virtual EDT 2026 <em>Tres días para pensar el fútbol profesional.</em></h1>
              <p className="lead">Charlas en vivo con referentes de la dirección técnica, la preparación física, el scouting y la gestión de clubes. Un espacio online, intensivo y aplicable.</p>
              <div className="hero-actions"><RegisterButton href={checkoutUrl} /><a className="button button-secondary" href="#agenda">Ver agenda <span aria-hidden="true">↓</span></a></div>
            </div>
            <aside className="include-card enter delay-1">
              <p className="card-label">Tu inscripción incluye</p>
              <p className="price-tag"><span>Valor de inscripción</span><strong>$50.000</strong></p>
              <ul>
                <li><i>01</i><span>Acceso en vivo a las tres jornadas, vía streaming.</span></li>
                <li><i>02</i><span>Resúmenes y contenidos destacados al finalizar cada día.</span></li>
                <li><i>03</i><span>Certificado de participación de Escuela EDT.</span></li>
                <li><i>04</i><span>Un espacio para llevar ideas directamente a tu trabajo.</span></li>
                <li><i>05</i><span>Grabación completa para volver a ver el Congreso.</span></li>
                <li><i>06</i><span>Participación en el sorteo por una beca para un curso de EDT.</span></li>
              </ul>
            </aside>
          </>}
        </div>
      </section>

      <section className="section" id="congreso">
        <div className="container">
          <div className="section-head reveal"><p className="eyebrow">Cronograma del Congreso</p><h2>12 expositores en tres días de fútbol real.</h2><p>Un encuentro virtual con charlas aplicadas, breaks y una mesa redonda final en cada jornada.</p></div>
          <div className="schedule-meta reveal"><span>Modalidad virtual</span><i aria-hidden="true" /> <span>12 expositores</span><i aria-hidden="true" /> <span>3 días</span></div>
          <div className="schedule-grid">{schedule.map((item, index) => <article className={`schedule-card ${item.accent} reveal`} style={{ transitionDelay: `${index * 90}ms` }} key={item.day}>
            <div className="schedule-card-day"><span>{item.day}</span></div>
            <div className="schedule-card-main"><p>{item.date}</p><strong>{item.time}</strong></div>
            <ul><li>4 expositores</li><li>Breaks</li><li>Mesa redonda final</li></ul>
          </article>)}</div>
        </div>
      </section>

      <section className="section agenda-section" id="agenda">
        <div className="container">
          <div className="section-head reveal"><p className="eyebrow">Planificación por horario</p><h2>Una agenda para vivir cada charla.</h2><p>Doce exposiciones de 40 minutos y una mesa redonda para cerrar cada jornada.</p></div>
          <div className="agenda-days">
            {agenda.map((day, index) => <article className={`agenda-day ${day.accent} reveal`} style={{ transitionDelay: `${index * 90}ms` }} key={day.day}>
              <header className="agenda-day-head"><p>{day.day}</p><h3>{day.date}</h3></header>
              <div className="agenda-sessions">
                {day.sessions.map((session) => <div className="agenda-session" key={`${day.day}-${session.time}`}><time>{session.time}</time><div><strong>{session.speaker}</strong><p>{session.topic}</p></div></div>)}
              </div>
              <footer className="agenda-roundtable"><time>{day.roundtable}</time><span>Mesa redonda de expositores</span></footer>
            </article>)}
          </div>
        </div>
      </section>

      <section className="section speakers-section" id="expositores">
        <div className="container">
          <div className="section-head reveal"><p className="eyebrow">Expositores anunciados</p><h2>Nuestros expositores</h2><p>Dirección técnica, rendimiento, nutrición, ciencia aplicada y salud mental. Estos son los perfiles confirmados hasta hoy.</p></div>
          <div className="speakers-grid">
            {speakers.filter((speaker) => speaker.published).map((speaker, index) => <article className={`speaker-card ${speaker.useFlyerCrop ? "speaker-card-flyer" : ""} reveal`} style={{ transitionDelay: `${(index % 3) * 85}ms` }} key={speaker.name}>
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
        <div className="container"><div className="final-card reveal"><div><p className="eyebrow">Cupos limitados · Inscripción $50.000</p><h2>Reservá tu lugar en el Congreso EDT.</h2><p>Todo el contenido, una sola inscripción y una experiencia pensada para quienes quieren trabajar mejor en fútbol.</p></div><RegisterButton href={checkoutUrl} /></div></div>
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

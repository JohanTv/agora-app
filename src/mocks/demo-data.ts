import {
  AlertTriangle,
  ArrowDown,
  Heart,
  MessageCircle,
  Repeat,
  Send,
  XCircle,
} from "lucide-react";

// --- Types for the Demo ---
export type DemoUser = {
  id: string;
  name: string;
  handle: string;
  avatarUrl: string;
  bio?: string;
  followersCount?: string;
};

export type PostStatus = "PUBLISHED" | "REJECTED_BY_AI";

export type DemoPost = {
  id: string;
  author: DemoUser;
  content: string;
  images?: string[];
  createdAt: string;
  likes: number;
  repliesCount: number;
  parentId?: string;
  status: PostStatus;
  aiFeedback?: string;
};

// --- 1. CURRENT USER (Jaime Sobrados) ---
export const currentUser: DemoUser = {
  id: "user_me",
  name: "Jaime Sobrados",
  handle: "@j_sobrados",
  avatarUrl:
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Jaime&eyebrows=default&clothing=blazerAndShirt",
  bio: "Consultor en Políticas Públicas. Buscando consensos en el disenso. Hincha de la 'U'. 🇵🇪",
  followersCount: "3.4k",
};

// --- Other Users (Perfiles Peruanos Formales) ---
const userA: DemoUser = {
  id: "u1",
  name: "Dra. Fernanda Alayza",
  handle: "@fer_alayza_pol",
  avatarUrl:
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Fernanda&clothing=collarAndSweater",
};
const userB: DemoUser = {
  id: "u2",
  name: "Humberto Ghezzi",
  handle: "@h_ghezzi_econ",
  avatarUrl:
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Humberto&facialHair=beardMedium",
};
const userC: DemoUser = {
  id: "u3",
  name: "Valeria Quispe",
  handle: "@vale_quispe",
  avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Valeria",
};

// --- 2. THE "HERO POST" (Tema: Voto a los 16 años) ---
export const heroPostId = "hero_post_1";
export const heroPost: DemoPost = {
  id: heroPostId,
  author: userA, // Fernanda Alayza
  content:
    "Propuesta Constitucional: El voto debería ser facultativo a partir de los 16 años. Si un joven tributa al comprar una gaseosa y es imputable penalmente en ciertos casos, debería tener derecho a elegir a sus gobernantes. ¿Es momento de debatir esto en el Congreso? 🏛️",
  createdAt: "4h",
  likes: 1342,
  repliesCount: 86,
  status: "PUBLISHED",
};

// --- The 10 consistent replies to the Hero Post ---
export const heroPostReplies: DemoPost[] = [
  // Nivel 1: El académico en desacuerdo
  {
    id: "r1",
    author: userB,
    parentId: heroPostId,
    content:
      "Estimada Fernanda, discrepo profundamente. La neurociencia indica que el lóbulo frontal no termina de madurar hasta los 25 años. A los 16, el voto sería puramente emocional y capturable por populismos de turno.",
    createdAt: "3h",
    likes: 245,
    repliesCount: 2,
    status: "PUBLISHED",
  },

  // Nivel 2 (Respuesta a userB) - Jaime entra al debate
  {
    id: "r1_1",
    author: currentUser,
    parentId: "r1",
    content:
      "Humberto, con todo respeto, ese argumento es paternalista. Bajo esa lógica, muchos adultos de 50 años tampoco califican por su 'emocionalidad' al votar. La ciudadanía se construye ejerciendo derechos, no restringiéndolos.",
    createdAt: "2h",
    likes: 120,
    repliesCount: 0,
    status: "PUBLISHED",
  },

  // Nivel 2 (Apoyo a Jaime)
  {
    id: "r1_2",
    author: userC,
    parentId: "r1",
    content:
      "Exacto. Además, históricamente se usó el argumento de la 'falta de capacidad' para negar el voto a la mujer en el Perú hasta 1955.",
    createdAt: "2h",
    likes: 95,
    repliesCount: 0,
    status: "PUBLISHED",
  },

  // Nivel 1: Apoyo
  {
    id: "r2",
    author: userC,
    parentId: heroPostId,
    content:
      "Totalmente a favor. En mi universidad vemos chicos de 17 años con más conciencia cívica que sus padres. Es hora de renovar el padrón electoral.",
    createdAt: "3h",
    likes: 189,
    repliesCount: 1,
    status: "PUBLISHED",
  },
  // Nivel 2
  {
    id: "r2_1",
    author: userA,
    parentId: "r2",
    content:
      "Gracias Valeria. La renovación generacional es clave para oxigenar nuestra política.",
    createdAt: "1h",
    likes: 45,
    repliesCount: 0,
    status: "PUBLISHED",
  },

  // Otros comentarios de Nivel 1 (Relleno con nombres peruanos)
  {
    id: "r3",
    author: {
      id: "u4",
      name: "Carlos Huamán",
      handle: "@chuaman",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
    },
    parentId: heroPostId,
    content:
      "Esto solo beneficiaría a los partidos radicales que captan gente en universidades y academias. Peligroso.",
    createdAt: "2h",
    likes: 32,
    repliesCount: 0,
    status: "PUBLISHED",
  },

  {
    id: "r4",
    author: {
      id: "u5",
      name: "Ana María Flores",
      handle: "@ana_m_flores",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
    },
    parentId: heroPostId,
    content:
      "Quizás un punto medio: Voto voluntario desde los 16, obligatorio desde los 21.",
    createdAt: "1h",
    likes: 15,
    repliesCount: 0,
    status: "PUBLISHED",
  },

  {
    id: "r5",
    author: {
      id: "u6",
      name: "Lucho Zegarra",
      handle: "@lucho_z",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Luis",
    },
    parentId: heroPostId,
    content:
      "✋ Parcialmente de acuerdo. Pero primero invirtamos en el curso de Educación Cívica, que casi ha desaparecido.",
    createdAt: "30m",
    likes: 58,
    repliesCount: 0,
    status: "PUBLISHED",
  },

  {
    id: "r6",
    author: {
      id: "u7",
      name: "Marta Castillo",
      handle: "@marta_cas",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marta",
    },
    parentId: heroPostId,
    content: "No creo que pase en este Congreso. No hay votos.",
    createdAt: "10m",
    likes: 12,
    repliesCount: 0,
    status: "PUBLISHED",
  },

  {
    id: "r7",
    author: {
      id: "u8",
      name: "Jorge Benavides",
      handle: "@jorge_bena",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jorge",
    },
    parentId: heroPostId,
    content: "👍 De acuerdo.",
    createdAt: "5m",
    likes: 4,
    repliesCount: 0,
    status: "PUBLISHED",
  },
];

// --- 3. MAIN FEED DATA (5 Posts mixed) ---
export const feedPosts: DemoPost[] = [
  heroPost, // Post principal arriba
  {
    id: "f2",
    author: userC,
    content:
      "He estado probando el 'Juez Imparcial' de la app. Me acaba de rechazar un post por falta de sustento técnico sobre la minería en el sur. 😅 Es estricto, pero creo que ayuda a elevar el nivel del debate. Menos gritos, más datos.",
    createdAt: "6h",
    likes: 210,
    repliesCount: 14,
    status: "PUBLISHED",
  },
  {
    id: "f3",
    author: currentUser, // Jaime Sobrados
    content:
      "La burocracia digital en el Estado es insostenible. No puede ser que en 2026 sigamos haciendo colas para trámites que deberían ser 100% online. Necesitamos interoperabilidad real entre ministerios. 📉",
    createdAt: "1d",
    likes: 546,
    repliesCount: 32,
    status: "PUBLISHED",
  },
  {
    id: "f4",
    author: userB,
    content:
      "Comparto la proyección de crecimiento del BCR para este trimestre. Si bien la inflación cede, la inversión privada sigue estancada. [Gráfico Económico]",
    images: [
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ],
    createdAt: "1d",
    likes: 410,
    repliesCount: 45,
    status: "PUBLISHED",
  },
  {
    id: "f5",
    author: {
      id: "u9",
      name: "Renzo Costa",
      handle: "@renzo_urb",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Renzo",
    },
    content:
      "¿Alguien ha leído la última columna sobre la reforma del transporte? Me parece que ignora la realidad de los colectiveros informales.",
    createdAt: "2d",
    likes: 101,
    repliesCount: 18,
    status: "PUBLISHED",
  },
];

// --- 4. PROFILE DATA ---
export const myProfilePosts: DemoPost[] = feedPosts.filter(
  (p) => p.author.id === currentUser.id,
);
export const myProfileReplies: DemoPost[] = heroPostReplies.filter(
  (p) => p.author.id === currentUser.id,
);

// --- 5. AI REJECTED POSTS (Notificaciones) ---
export const aiRejectedNotifications = [
  {
    id: "notif_ai_1",
    type: "AI_REJECTION",
    timestamp: "2m",
    postContentSnippet:
      "Todos los congresistas son unas ratas que no merecen ni el aire que respiran...",
    aiFeedbackHeadline: "Publicación Rechazada: Lenguaje Ofensivo",
    aiFeedbackBody:
      "El Juez IA detectó generalizaciones ofensivas e insultos. Esta plataforma promueve el debate crítico, no el ataque personal. Por favor, reformula tu crítica sin adjetivos denigrantes.",
    icon: XCircle,
    color: "text-red-500",
  },
  {
    id: "notif_ai_2",
    type: "AI_REJECTION",
    timestamp: "1h",
    postContentSnippet:
      "La solución a la pobreza es imprimir billetes y repartirlos en las plazas.",
    aiFeedbackHeadline: "Publicación Rechazada: Argumento Insuficiente",
    aiFeedbackBody:
      "El Juez IA considera que esta propuesta carece de sustento lógico económico (falacia de emisión inorgánica). Para debatir políticas públicas, por favor explica el 'cómo' y las consecuencias de tu propuesta.",
    icon: AlertTriangle,
    color: "text-amber-500",
  },
];

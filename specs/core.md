# PROJECT_CONTEXT.md

## 2. Reglas de Negocio Clave
1.  **Estructura Unificada:** No existe tabla `Comments`. Todo es un `Post`. Si `parentId` es null, es un hilo principal. Si tiene valor, es un comentario.
2.  **Moderación IA:**
    - Todo Post nace con estado `PENDING`.
    - Un proceso (Server Action o API Route) evalúa el contenido.
    - Estados finales: `PUBLISHED` (visible) o `REJECTED` (visible solo para el autor con feedback).
3.  **Profundidad:** Ilimitada (Modelo recursivo).
4.  **Reacciones:** Many-to-Many (`PostReaction`). Tipos: `AGREE`, `PARTIAL`, `DISAGREE`.

## 3. Estado del Schema (Prisma Draft)
```prisma
enum PostStatus {
  PENDING
  PUBLISHED
  REJECTED
}

enum ReactionType {
  AGREE
  PARTIAL
  DISAGREE
}

model User {
  id            String    @id @default(cuid())
  name          String
  email         String    @unique
  emailVerified Boolean?
  image         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  posts         Post[]
  reactions     PostReaction[]

  // Follow System
  followedBy    Follows[] @relation("following")
  following     Follows[] @relation("follower")

  // Better-auth fields (simplificado, ajustar según necesidad real de better-auth)
  sessions      Session[]
  accounts      Account[]
}

model Post {
  id          String     @id @default(cuid())
  content     String     @db.Text
  images      String[]   // Array de URLs
  status      PostStatus @default(PENDING)
  aiFeedback  String?    @db.Text // Razón del rechazo si aplica

  authorId    String
  author      User       @relation(fields: [authorId], references: [id])

  parentId    String?
  parent      Post?      @relation("PostToPost", fields: [parentId], references: [id])
  children    Post[]     @relation("PostToPost")

  reactions   PostReaction[]

  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt

  // Índices para optimizar búsquedas y el feed
  @@index([authorId])
  @@index([parentId])
  @@index([status])
}

model PostReaction {
  id        String       @id @default(cuid())
  type      ReactionType

  userId    String
  user      User         @relation(fields: [userId], references: [id])

  postId    String
  post      Post         @relation(fields: [postId], references: [id])

  createdAt DateTime     @default(now())

  @@unique([userId, postId]) // Un usuario solo puede reaccionar una vez por post
}

model Follows {
  followerId  String
  followingId String

  follower    User @relation("follower", fields: [followerId], references: [id])
  following   User @relation("following", fields: [followingId], references: [id])

  @@id([followerId, followingId])
}
```

import { type } from "arktype";

// ==========================================
// CREATE POST SCHEMA
// ==========================================
export const CreatePostSchema = type({
  content: "string",
  "images?": "string[]",
  "parentId?": "string",
});

// Separate validation for content length
export const validatePostContent = (content: string) => {
  if (content.length < 3) {
    return "El contenido debe tener al menos 3 caracteres.";
  }
  if (content.length > 500) {
    return "El contenido no puede exceder 500 caracteres.";
  }
  return null;
};

// Separate validation for images array
export const validatePostImages = (images?: string[]) => {
  if (images && images.length > 3) {
    return "Puedes subir un máximo de 3 imágenes.";
  }
  return null;
};

// ==========================================
// UPDATE POST SCHEMA
// ==========================================
export const UpdatePostSchema = type({
  postId: "string",
  content: "string",
});

// ==========================================
// TYPE INFERENCE
// ==========================================
export type CreatePost = typeof CreatePostSchema.infer;
export type UpdatePost = typeof UpdatePostSchema.infer;

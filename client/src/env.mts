import z from "zod";

const envSchema = z.object({
  VITE_SERVER_URL: z.string().default("http://localhost:4001/"),
  VITE_API_KEY: z.string(),
  VITE_SNACKBAR_AUTOHIDE_DURATION: z.number().default(6000),
});

export const ENV = envSchema.parse(import.meta.env);

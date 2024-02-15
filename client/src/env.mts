import z from "zod";

const envSchema = z.object({
  VITE_SERVER_URL: z.string().default("http://localhost:4001/"),
  VITE_API_KEY: z.string(),
  VITE_SNACKBAR_AUTOHIDE_DURATION: z.number().default(6000),
  VITE_AUTH0_AUDIENCE: z.string(),
  VITE_AUTH0_CLIENT_ID: z.string(),
  VITE_AUTH0_DOMAIN: z.string(),
});

export const ENV = envSchema.parse(import.meta.env);

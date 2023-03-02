import Medusa from "@medusajs/medusa-js";

const BACKEND_URL =
 // @ts-ignore
 import.meta.env.VITE_MEDUSA_BACKEND_URL || "http://localhost:9000";

// @ts-ignore
export const createClient = () => new Medusa({ baseUrl: BACKEND_URL });
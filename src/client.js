import Medusa from "@medusajs/medusa-js";

const BACKEND_URL = import.meta.env.VITE_MEDUSA_BACKEND_URL || "http://localhost:8000";

export const createClient = () => new Medusa({ baseUrl: BACKEND_URL });
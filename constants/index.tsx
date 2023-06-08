export const API_URL =
  process.env.NODE_ENV === "production"
    ? process.env.API_URL
    : "http://localhost:8080";

export const SESSION_PASSWORD = process.env.SESSION_PASSWORD;

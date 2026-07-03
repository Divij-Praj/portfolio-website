import axios from "axios";

/**
 * Single Axios instance for the whole app.
 * Base URL comes from an env var so dev/staging/prod never get hard-coded.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Normalizes errors from the backend's { success, message, errors } shape
 * into a plain string/array the UI can render directly, instead of every
 * call site having to know Axios's error shape.
 */
const normalizeError = (error) => {
  if (error.response) {
    const { data, status } = error.response;
    return {
      status,
      message: data?.message || "Something went wrong. Please try again.",
      fieldErrors: data?.errors || [],
    };
  }
  if (error.request) {
    return { status: 0, message: "Network error — is the API reachable?", fieldErrors: [] };
  }
  return { status: -1, message: error.message, fieldErrors: [] };
};

/* --------------------------------------------------------------------- */
/*  Projects                                                              */
/* --------------------------------------------------------------------- */

export const fetchProjects = async ({ featured } = {}) => {
  try {
    const { data } = await api.get("/projects", {
      params: featured ? { featured: true } : undefined,
    });
    return data.data; // array of projects
  } catch (err) {
    throw normalizeError(err);
  }
};

export const fetchProjectById = async (id) => {
  try {
    const { data } = await api.get(`/projects/${id}`);
    return data.data;
  } catch (err) {
    throw normalizeError(err);
  }
};

/* --------------------------------------------------------------------- */
/*  Contact form                                                         */
/* --------------------------------------------------------------------- */

/**
 * Posts the contact form. `honeypot` should be bound to a visually-hidden
 * input in the form — real users leave it empty, most bots don't.
 */
export const sendMessage = async ({ name, email, content, honeypot = "" }) => {
  try {
    const { data } = await api.post("/messages", {
      name,
      email,
      content,
      _gotcha: honeypot,
    });
    return data;
  } catch (err) {
    throw normalizeError(err);
  }
};

export default api;

import { createClient } from "@sanity/client";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET;

export const sanity = createClient({
  projectId,
  dataset,
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION || "2026-02-13",
  useCdn: false,
});

export const hasSanityConfig = Boolean(projectId && dataset);

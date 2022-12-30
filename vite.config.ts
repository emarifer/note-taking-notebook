import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default ({ mode }) => {
  const url = loadEnv(mode, process.cwd()).VITE_BASE_URL;
  const base =
    mode === "production" ? (url && url.length !== 0 ? `/${url}/` : "/") : "";

  return defineConfig({
    base,
    plugins: [react()],
  });
};

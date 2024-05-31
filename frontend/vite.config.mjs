// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     // host: true,
//     // proxy: {
//     //   "/api": {
//     //     // target: "https://super-market-be.vercel.app",
//     //     // target: "https://supermarketbe.onrender.com",
//     //     target: "http://localhost:5000",
//     //     changeOrigin: true,
//     //     // rewrite: (path) => path.replace("/api", ""),
//     //     rewrite: (path) => path.replace(/^\/api/, ""),
//     //   },
//     // },
//     proxy: {
//       "/api": "http://localhost:5000",
//     },
//   },
// });
// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";

// export default defineConfig({
//   plugins: [react()],
//   // Remove the server configuration for deployment
//   // server: {}, // This line is commented out

//   // Assuming your frontend is built for production
//   build: {
//     outDir: "dist", // Output directory for the production build
//     emptyOutDir: true, // Clear the output directory before building
//   },
// });
// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";
// export default defineConfig({
//   plugins: [react()],
//   define:{'process.env.VITE_BACK_URL'},
//   base: "http://localhost:5000",
// });
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "https://super-market-be.vercel.app",
  //       // target: "http://localhost:5000",
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ""),
  //     },
  //   },
  // },
});

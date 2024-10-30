import app from "./app"; // import แอป Hono.js ของคุณ

const PORT = 3000;

console.log(`Hono is running at http://localhost:${PORT}`);

// ใช้ Bun เพื่อรันเซิร์ฟเวอร์
Bun.serve({
  fetch: app.fetch, // ผูก Hono กับ Bun's HTTP server
  port: PORT,
});

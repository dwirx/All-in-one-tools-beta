import { createApp } from './app';
import { appConfig } from './config/app';

const app = createApp();

// Start the Express server with Bun.js
app.listen(appConfig.port, () => {
  console.log(`🚀 Server running at http://localhost:${appConfig.port}`);
  console.log("📁 Ensure you have 'public', 'game', 'tools', 'experiment', and 'blog' folders.");
  console.log("📄 Put your .html and .md files into these folders.");
  console.log("🧩 For Mermaid, use: <div class=\"mermaid\">...</div>");
  console.log("🔢 For LaTeX, use: $$...$$ (display) or \\\\(...\\\\) or \\(...\\) (inline, \\\\ may be safer).");
  console.log("⚡ Running on Bun.js with TypeScript!");
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down server...');
  process.exit(0);
});

export default app; 
import express from 'express';
import { appConfig } from './config/app.js';
import { createFolderIfNotExists } from './utils/fileSystem.js';
import { HomeRoutes } from './routes/homeRoutes.js';
import { FileRoutes } from './routes/fileRoutes.js';

export function createApp(): express.Application {
  const app = express();

  // Middleware untuk menyajikan file statis dari folder 'public'
  app.use(express.static("public"));

  // Buat semua folder dasar saat startup
  appConfig.baseFolders.forEach(createFolderIfNotExists);

  // Routes
  setupRoutes(app);

  return app;
}

function setupRoutes(app: express.Application): void {
  // Home route
  app.get("/", HomeRoutes.home);

  // Folder index routes
  app.get("/game", FileRoutes.gameIndex);
  app.get("/tools", FileRoutes.toolsIndex); 
  app.get("/experiment", FileRoutes.experimentIndex);
  app.get("/blog", FileRoutes.blogIndex);

  // File serving routes
  app.get("/game/:file", FileRoutes.gameFile);
  app.get("/tools/:file", FileRoutes.toolsFile);
  app.get("/experiment/:file", FileRoutes.experimentFile);
  app.get("/blog/:file", FileRoutes.blogFile);
} 
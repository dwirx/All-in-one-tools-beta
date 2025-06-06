import type { AppConfig } from '../types/index.js';

export const appConfig: AppConfig = {
  port: 3000,
  baseFolders: ["./public", "./game", "./tools", "./experiment", "./blog"],
  itemsPerPage: 20,
};

export const SUPPORTED_EXTENSIONS = /\.(html|md)$/i; 
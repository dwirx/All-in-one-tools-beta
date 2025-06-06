import fs from 'fs';
import path from 'path';
import type { FileData } from '../types/index.js';
import { SUPPORTED_EXTENSIONS } from '../config/app.js';

export function createFolderIfNotExists(folderPath: string): void {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
    console.log(`Folder created: ${folderPath}`);
  }
}

export function getFileList(folder: string, itemsPerPage: number, currentPage: number): FileData {
  createFolderIfNotExists(folder);
  let files: string[] = [];
  
  try {
    files = fs.readdirSync(folder);
  } catch (err) {
    console.error(`Error reading directory ${folder}:`, err);
    return { 
      files: [], 
      totalPages: 0, 
      error: `Could not read directory: ${folder}` 
    };
  }

  const relevantFiles = files
    .filter((file) => SUPPORTED_EXTENSIONS.test(path.extname(file)))
    .sort();

  const totalPages = Math.ceil(relevantFiles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFiles = relevantFiles.slice(startIndex, endIndex);

  return {
    files: currentFiles,
    totalPages: totalPages,
  };
}

export function fileExists(filePath: string): boolean {
  return fs.existsSync(filePath);
}

export function readFileContent(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
} 
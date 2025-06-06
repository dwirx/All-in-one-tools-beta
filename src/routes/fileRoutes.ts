import { Request, Response } from 'express';
import path from 'path';
import { fileExists, readFileContent } from '../utils/fileSystem';
import { MarkdownService } from '../services/markdownService';
import { generateFolderIndexTemplate } from '../templates/htmlTemplate';
import { getFileList } from '../utils/fileSystem';
import type { FolderType } from '../types/index';

export class FileRoutes {
  static async serveFileOrRenderMarkdown(folder: string, fileName: string, res: Response): Promise<void> {
    const filePath = path.join(process.cwd(), folder, fileName);
    
    if (!fileExists(filePath)) {
      res.status(404).send("File not found.");
      return;
    }

    if (fileName.toLowerCase().endsWith(".md")) {
      try {
        const mdContent = await readFileContent(filePath);
        const htmlPage = await MarkdownService.processMarkdownFile(filePath, fileName, mdContent);
        res.send(htmlPage);
      } catch (error) {
        console.error("Error reading Markdown file:", error);
        res.status(500).send("Error reading Markdown file.");
      }
    } else if (fileName.toLowerCase().endsWith(".html")) {
      res.sendFile(filePath);
    } else {
      res.status(400).send("Unsupported file type. Only HTML and Markdown files are viewable.");
    }
  }

  static serveFolderIndex(req: Request, res: Response, folderName: string, itemType: string): void {
    const folderPath = `./${folderName}`;
    const filesData = getFileList(folderPath, 9999, 1);
    
    if (filesData.error) {
      res.status(500).send(`Error reading directory: ${folderPath}`);
      return;
    }

    const html = generateFolderIndexTemplate(folderName, itemType, filesData.files);
    res.send(html);
  }

  // Route handlers
  static gameFile = (req: Request, res: Response) => 
    FileRoutes.serveFileOrRenderMarkdown("game", req.params.file, res);
  
  static toolsFile = (req: Request, res: Response) => 
    FileRoutes.serveFileOrRenderMarkdown("tools", req.params.file, res);
  
  static experimentFile = (req: Request, res: Response) => 
    FileRoutes.serveFileOrRenderMarkdown("experiment", req.params.file, res);
  
  static blogFile = (req: Request, res: Response) => 
    FileRoutes.serveFileOrRenderMarkdown("blog", req.params.file, res);

  // Index handlers
  static gameIndex = (req: Request, res: Response) => 
    FileRoutes.serveFolderIndex(req, res, "game", "Game");
  
  static toolsIndex = (req: Request, res: Response) => 
    FileRoutes.serveFolderIndex(req, res, "tools", "Tool");
  
  static experimentIndex = (req: Request, res: Response) => 
    FileRoutes.serveFolderIndex(req, res, "experiment", "Experiment");
  
  static blogIndex = (req: Request, res: Response) => 
    FileRoutes.serveFolderIndex(req, res, "blog", "Blog Post");
} 
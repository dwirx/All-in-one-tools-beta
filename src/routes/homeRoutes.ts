import { Request, Response } from 'express';
import { getFileList } from '../utils/fileSystem.js';
import { generateMainTemplate, generateSection } from '../templates/htmlTemplate.js';
import type { FilterType, FileData } from '../types/index.js';

export class HomeRoutes {
  static home(req: Request, res: Response): void {
    const itemsPerPage = parseInt(req.query.items as string) || 20;
    const currentPage = parseInt(req.query.page as string) || 1;
    const filter = (req.query.filter as FilterType) || "all";

    const gameFolder = "./game";
    const toolsFolder = "./tools";
    const experimentFolder = "./experiment";
    const blogFolder = "./blog";

    let gameFilesData: FileData = { files: [], totalPages: 0 };
    let toolsFilesData: FileData = { files: [], totalPages: 0 };
    let experimentFilesData: FileData = { files: [], totalPages: 0 };
    let blogFilesData: FileData = { files: [], totalPages: 0 };

    // Load data based on filter
    if (filter === "all" || filter === "games") {
      gameFilesData = getFileList(gameFolder, itemsPerPage, currentPage);
    }
    if (filter === "all" || filter === "tools") {
      toolsFilesData = getFileList(toolsFolder, itemsPerPage, currentPage);
    }
    if (filter === "all" || filter === "experiments") {
      experimentFilesData = getFileList(experimentFolder, itemsPerPage, currentPage);
    }
    if (filter === "all" || filter === "blog") {
      blogFilesData = getFileList(blogFolder, itemsPerPage, currentPage);
    }

    // Generate sections
    const gameSection = (filter === "all" || filter === "games") && gameFilesData.files ? 
      generateSection(
        "games-section", 
        "Games", 
        "border-blue-500", 
        gameFilesData.files, 
        "game", 
        "Play", 
        "fa-play", 
        "btn-secondary",
        gameFilesData
      ) : "";

    const toolsSection = (filter === "all" || filter === "tools") && toolsFilesData.files ? 
      generateSection(
        "tools-section", 
        "Tools", 
        "border-blue-500", 
        toolsFilesData.files, 
        "tools", 
        "Use", 
        "fa-tools", 
        "btn-secondary",
        toolsFilesData
      ) : "";

    const experimentSection = (filter === "all" || filter === "experiments") && experimentFilesData.files ? 
      generateSection(
        "experiments-section", 
        "Experiments", 
        "border-blue-500", 
        experimentFilesData.files, 
        "experiment", 
        "Run", 
        "fa-flask", 
        "btn-secondary",
        experimentFilesData
      ) : "";

    const blogSection = (filter === "all" || filter === "blog") && blogFilesData.files ? 
      generateSection(
        "blog-section", 
        "Blog Posts", 
        "border-yellow-500", 
        blogFilesData.files, 
        "blog", 
        "Read", 
        "fa-book-open", 
        "btn-blog-action",
        blogFilesData
      ) : "";

    const html = generateMainTemplate(
      itemsPerPage,
      filter,
      gameSection,
      toolsSection,
      experimentSection,
      blogSection
    );

    res.send(html);
  }
} 
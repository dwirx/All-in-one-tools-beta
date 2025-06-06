export interface FileData {
  files: string[];
  totalPages: number;
  error?: string;
}

export interface FileListResult {
  files: string[];
  totalPages: number;
}

export interface AppConfig {
  port: number;
  baseFolders: string[];
  itemsPerPage: number;
}

export type FilterType = 'all' | 'games' | 'tools' | 'experiments' | 'blog';

export type FolderType = 'game' | 'tools' | 'experiment' | 'blog'; 
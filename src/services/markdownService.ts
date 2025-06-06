import { marked } from 'marked';
import { generateMarkdownPageTemplate } from '../templates/htmlTemplate';

export class MarkdownService {
  static async processMarkdownFile(filePath: string, fileName: string, content: string): Promise<string> {
    try {
      const htmlContent = await marked.parse(content);
      return generateMarkdownPageTemplate(fileName, htmlContent);
    } catch (error) {
      console.error('Error processing Markdown:', error);
      throw new Error('Failed to process Markdown file');
    }
  }
} 
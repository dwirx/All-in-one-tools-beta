import type { FileData, FilterType } from '../types/index';

export function getNoFilesMessage(categoryName: string, filesObject: FileData): string {
  if (filesObject.error) {
    return `<p class="col-span-full text-center text-red-500 py-4">${filesObject.error}</p>`;
  }
  if (filesObject.files.length > 0) return "";
  
  let baseMsg = `No ${categoryName} found`;
  baseMsg += ` on this page. Ensure files are HTML or Markdown.`;
  
  return `<p class="col-span-full text-center text-gray-500 py-4 hacker-theme:text-gray-400">${baseMsg}</p>`;
}

export function generateFileCard(file: string, folder: string, actionText: string, iconClass: string, btnClass: string): string {
  const isMd = file.toLowerCase().endsWith(".md");
  const fileType = isMd ? "Markdown Document" : "HTML Application";
  const actionIcon = isMd ? 'fa-eye' : iconClass;
  const actionLabel = isMd ? 'View' : actionText;

  return `
    <div class="card bg-white rounded-lg shadow-md p-4 hover:shadow-lg flex flex-col justify-between">
      <div>
        <h3 class="font-semibold text-gray-800 mb-2 truncate" title="${file}">${file}</h3>
        <p class="text-sm text-gray-500 mb-3">${fileType}</p>
      </div>
      <div class="flex space-x-2 mt-auto">
        <button class="btn bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded text-sm flex items-center btn-secondary" onclick="loadFile('${folder}', '${file}')">
          <i class="fas ${actionIcon} mr-1"></i>${actionLabel}
        </button>
        <a href="/${folder}/${file}" target="_blank" class="btn bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded text-sm flex items-center btn-primary">
          <i class="fas fa-external-link-alt mr-1"></i>Open
        </a>
      </div>
    </div>`;
}

export function generateSection(
  sectionId: string,
  title: string,
  borderColor: string,
  files: string[],
  folder: string,
  actionText: string,
  iconClass: string,
  btnClass: string,
  filesData: FileData
): string {
  const fileCards = files.map(file => 
    generateFileCard(file, folder, actionText, iconClass, btnClass)
  ).join("");

  return `
    <section id="${sectionId}" class="mb-12">
      <h2 class="text-3xl font-semibold mb-6 text-gray-800 border-b-2 ${borderColor} pb-2">${title}</h2>
      <div id="${folder}-list" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        ${fileCards}
        ${getNoFilesMessage(title.toLowerCase(), filesData)}
      </div>
    </section>`;
}

export function generateMainTemplate(
  itemsPerPage: number,
  filter: FilterType,
  gameSection: string,
  toolsSection: string,
  experimentSection: string,
  blogSection: string
): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>My Project Hub: Games, Tools, Experiments, Blog</title>
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
      <style>
        ${getStyles()}
      </style>
    </head>
    <body class="bg-gray-100 min-h-screen" id="body">
      <div id="main-container" class="container mx-auto px-4 py-8">
        ${getHeader()}
        ${getControlPanel(itemsPerPage, filter)}
        <div id="folders-container">
          ${gameSection}
          ${toolsSection}
          ${experimentSection}
          ${blogSection}
        </div>
        ${getFileContainer()}
      </div>
      ${getJavaScript()}
    </body>
    </html>
  `;
}

function getStyles(): string {
  return `
    body { transition: background-color 0.3s, color 0.3s; }
    .file-frame { width: 100%; height: 100%; border: none; }
    .control-buttons { display: flex; flex-wrap: wrap; justify-content: center; sm:justify-content: flex-end; gap: 0.5rem; margin-bottom: 0.5rem; }
    .control-button { background-color: #E5E7EB; border: none; padding: 0.5rem 1rem; cursor: pointer; border-radius: 0.25rem; font-weight: 500; transition: background-color 0.2s; }
    .control-button:hover { background-color: #D1D5DB; }
    .hacker-theme { background-color: #0C0C0C; color: #00FF00; font-family: 'Courier New', monospace; }
    .hacker-theme .bg-gray-100 { background-color: #0C0C0C !important; }
    .hacker-theme .bg-white { background-color: #1A1A1A !important; color: #00FF00; border-color: #00FF00 !important; }
    .hacker-theme .text-gray-800, .hacker-theme h1, .hacker-theme h2, .hacker-theme h3, .hacker-theme p { color: #00FF00 !important; }
    .hacker-theme .text-gray-600 { color: #00cc00 !important; }
    .hacker-theme .text-gray-500 { color: #9ca3af !important; }
    .hacker-theme .hacker-theme\\:text-gray-400 { color: #a0aec0 !important; }
    .hacker-theme a:not(.control-button):not(.pagination-link) { color: #33FF33; } 
    .hacker-theme a:hover:not(.control-button):not(.pagination-link) { color: #66FF66; }
    .hacker-theme .btn-primary { background-color: #0056b3 !important; border: 1px solid #00FF00; color: #00FF00 !important; }
    .hacker-theme .btn-primary:hover { background-color: #004494 !important; }
    .hacker-theme .btn-secondary { background-color: #008000 !important; border: 1px solid #00FF00; color: #00FF00 !important; }
    .hacker-theme .btn-secondary:hover { background-color: #006400 !important; }
    .hacker-theme .btn-tertiary { background-color: #581c87 !important; border: 1px solid #00FF00; color: #00FF00 !important; }
    .hacker-theme .btn-tertiary:hover { background-color: #441669 !important; }
    .hacker-theme .btn-blog-action { background-color: #b8860b !important; border: 1px solid #00FF00; color: #00FF00 !important; }
    .hacker-theme .btn-blog-action:hover { background-color: #936c09 !important; }
    .hacker-theme .shadow-md { box-shadow: 0 0 5px #00FF00; }
    .hacker-theme .hover\\:shadow-lg:hover { box-shadow: 0 0 10px #00FF00; }
    .hacker-theme .border-gray-300 { border-color: #00FF00 !important; }
    .hacker-theme select, .hacker-theme input[type="text"], .hacker-theme input[type="search"] { background-color: #1C1C1C !important; color: #00FF00; border: 1px solid #00FF00; }
    .hacker-theme option { background-color: #1C1C1C; color: #00FF00; }
    .hacker-theme .control-button { background-color: #222; color: #00FF00; border: 1px solid #00FF00; }
    .hacker-theme .control-button:hover { background-color: #333; }
    .hacker-theme .placeholder\\:text-gray-400::placeholder { color: #555 !important; }
    .card { transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out; }
    .card:hover { transform: translateY(-5px); }
    .btn { transition: background-color 0.2s, transform 0.2s; }
    .btn:hover { transform: scale(1.05); }
    .hacker-theme .border-blue-500 { border-color: #00cc66 !important; }
    .hacker-theme .border-yellow-500 { border-color: #ffd700 !important; }
  `;
}

function getHeader(): string {
  return `
    <header class="text-center mb-10">
      <h1 class="text-4xl sm:text-5xl font-bold text-gray-800">My Project Hub</h1>
      <p class="text-xl text-gray-600">Explore Games, Tools, Experiments & Blog Posts</p>
    </header>
  `;
}

function getControlPanel(itemsPerPage: number, filter: FilterType): string {
  return `
    <div class="mb-8 p-4 bg-white shadow-md rounded-lg flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:justify-between sm:items-center">
      <div class="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 items-stretch">
        <div>
          <label for="itemsPerPage" class="block text-sm font-medium text-gray-700 hacker-theme:text-gray-300 mb-1">Show:</label>
          <select id="itemsPerPage" class="bg-white border border-gray-300 rounded-md px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500" onchange="changeItemsPerPage()">
            <option value="20" ${itemsPerPage === 20 ? "selected" : ""}>20 items</option>
            <option value="50" ${itemsPerPage === 50 ? "selected" : ""}>50 items</option>
            <option value="100" ${itemsPerPage === 100 ? "selected" : ""}>100 items</option>
            <option value="9999" ${itemsPerPage === 9999 ? "selected" : ""}>All items</option> 
          </select>
        </div>
        <div>
          <label for="filterSelect" class="block text-sm font-medium text-gray-700 hacker-theme:text-gray-300 mb-1">Category:</label>
          <select id="filterSelect" class="bg-white border border-gray-300 rounded-md px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500" onchange="changeFilter()">
            <option value="all" ${filter === "all" ? "selected" : ""}>All Categories</option>
            <option value="games" ${filter === "games" ? "selected" : ""}>Games</option>
            <option value="tools" ${filter === "tools" ? "selected" : ""}>Tools</option>
            <option value="experiments" ${filter === "experiments" ? "selected" : ""}>Experiments</option>
            <option value="blog" ${filter === "blog" ? "selected" : ""}>Blog</option>
          </select>
        </div>
      </div>
      <div class="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:flex-wrap items-stretch sm:items-center sm:gap-2">
        <button id="toggleViewBtn" class="btn bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded btn-primary flex items-center justify-center" onclick="toggleMainView()">
          <i class="fas fa-list-alt mr-2"></i>Show List
        </button>
        <button id="fullscreenBtn" class="btn bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded btn-secondary flex items-center justify-center" onclick="togglePageFullscreen()">
          <i class="fas fa-expand-arrows-alt mr-2"></i>Page Fullscreen
        </button>
        <button id="themeToggleBtn" class="btn bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded btn-tertiary flex items-center justify-center" onclick="toggleTheme()">
          <i class="fas fa-paint-brush mr-2"></i>Hacker Theme
        </button>
      </div>
    </div>
  `;
}

function getFileContainer(): string {
  return `
    <div id="file-container" class="mt-8 hidden">
      <div class="control-buttons">
        <button class="control-button" onclick="minimizeFile()"><i class="fas fa-window-minimize mr-1"></i>Minimize</button>
        <button class="control-button" onclick="toggleIframeFullscreen()"><i class="fas fa-expand mr-1"></i>Fullscreen Iframe</button>
        <button class="control-button" onclick="closeFile()"><i class="fas fa-times mr-1"></i>Close</button>
      </div>
      <h2 id="file-title" class="text-2xl font-bold text-gray-800 mb-4 truncate"></h2>
      <div id="frame-container" class="w-full bg-white shadow-lg rounded-md overflow-hidden" style="height: 80vh;">
        <iframe id="file-frame" class="file-frame" sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"></iframe>
      </div>
    </div>
  `;
}

function getJavaScript(): string {
  return `
    <script>
      function updateURL() {
        const items = document.getElementById('itemsPerPage').value;
        const filterVal = document.getElementById('filterSelect').value;
        window.location.href = '/?items=' + items + '&filter=' + filterVal; 
      }
      function changeItemsPerPage() { updateURL(); }
      function changeFilter() { updateURL(); }
      function toggleMainView() {
        const foldersContainer = document.getElementById('folders-container');
        const fileContainer = document.getElementById('file-container');
        if (foldersContainer.style.display === 'none') {
          foldersContainer.style.display = 'block';
          fileContainer.style.display = 'none';
          document.getElementById('file-frame').src = 'about:blank';
        } else {
          closeFile();
        }
      }
      function loadFile(folder, file) {
        const fileTitle = document.getElementById('file-title');
        const fileFrame = document.getElementById('file-frame');
        const fileContainer = document.getElementById('file-container');
        const foldersContainer = document.getElementById('folders-container');
        fileTitle.textContent = file;
        fileFrame.src = '/' + folder + '/' + file;
        fileContainer.style.display = 'block';
        foldersContainer.style.display = 'none';
        document.getElementById('file-container').scrollIntoView({ behavior: 'smooth', block: 'start' });
        document.getElementById('frame-container').style.height = window.innerWidth < 768 ? '50vh' : '80vh';
      }
      function closeFile() {
        const fileContainer = document.getElementById('file-container');
        const foldersContainer = document.getElementById('folders-container');
        const fileFrame = document.getElementById('file-frame');
        fileFrame.src = 'about:blank';
        fileContainer.style.display = 'none';
        foldersContainer.style.display = 'block';
      }
      function minimizeFile() {
        const frameContainer = document.getElementById('frame-container');
        const currentHeight = frameContainer.style.height;
        if (currentHeight === '40vh' || currentHeight === '25vh') {
           frameContainer.style.height = window.innerWidth < 768 ? '50vh' : '80vh';
        } else {
           frameContainer.style.height = window.innerWidth < 768 ? '25vh' : '40vh';
        }
      }
      function togglePageFullscreen() {
        const pageElement = document.documentElement;
        if (!document.fullscreenElement) {
          if (pageElement.requestFullscreen) pageElement.requestFullscreen();
          else if (pageElement.mozRequestFullScreen) pageElement.mozRequestFullScreen();
          else if (pageElement.webkitRequestFullscreen) pageElement.webkitRequestFullscreen();
          else if (pageElement.msRequestFullscreen) pageElement.msRequestFullscreen();
        } else {
          if (document.exitFullscreen) document.exitFullscreen();
        }
      }
      function toggleIframeFullscreen() {
        const frameContainer = document.getElementById('frame-container');
        if (!document.fullscreenElement) {
          if (frameContainer.requestFullscreen) frameContainer.requestFullscreen();
          else if (frameContainer.mozRequestFullScreen) frameContainer.mozRequestFullScreen();
          else if (frameContainer.webkitRequestFullscreen) frameContainer.webkitRequestFullscreen();
          else if (frameContainer.msRequestFullscreen) frameContainer.msRequestFullscreen();
        } else {
          if (document.exitFullscreen) document.exitFullscreen();
        }
      }
      function toggleTheme() {
        const body = document.getElementById('body');
        const themeToggleBtn = document.getElementById('themeToggleBtn');
        body.classList.toggle('hacker-theme');
        if (body.classList.contains('hacker-theme')) {
          themeToggleBtn.innerHTML = '<i class="fas fa-sun mr-2"></i>Normal Theme';
          localStorage.setItem('theme', 'hacker-theme');
        } else {
          themeToggleBtn.innerHTML = '<i class="fas fa-paint-brush mr-2"></i>Hacker Theme';
          localStorage.setItem('theme', 'normal');
        }
      }
      function handleMainFullscreenChange() {
        const pageFullscreenBtn = document.getElementById('fullscreenBtn');
        const frameContainer = document.getElementById('frame-container');
        if (document.fullscreenElement) {
          if (document.fullscreenElement === document.documentElement) {
            pageFullscreenBtn.innerHTML = '<i class="fas fa-compress-arrows-alt mr-2"></i>Exit Fullscreen';
          }
          if (document.fullscreenElement === frameContainer) {
            frameContainer.style.height = '100vh';
          }
        } else { 
          pageFullscreenBtn.innerHTML = '<i class="fas fa-expand-arrows-alt mr-2"></i>Page Fullscreen';
          const fileContainer = document.getElementById('file-container');
          if (fileContainer.style.display !== 'none') {
               frameContainer.style.height = window.innerWidth < 768 ? '50vh' : '80vh';
          }
        }
      }
      window.addEventListener('resize', function() {
        const fileContainer = document.getElementById('file-container');
        const frameContainer = document.getElementById('frame-container');
        if (fileContainer.style.display !== 'none' && !document.fullscreenElement) {
          frameContainer.style.height = window.innerWidth < 768 ? '50vh' : '80vh';
        }
      });
      document.addEventListener('fullscreenchange', handleMainFullscreenChange);
      document.addEventListener('webkitfullscreenchange', handleMainFullscreenChange);
      document.addEventListener('mozfullscreenchange', handleMainFullscreenChange);
      document.addEventListener('MSFullscreenChange', handleMainFullscreenChange);
      if (localStorage.getItem('theme') === 'hacker-theme') {
        document.getElementById('body').classList.add('hacker-theme');
        document.getElementById('themeToggleBtn').innerHTML = '<i class="fas fa-sun mr-2"></i>Normal Theme';
      } else {
        document.getElementById('themeToggleBtn').innerHTML = '<i class="fas fa-paint-brush mr-2"></i>Hacker Theme';
      }
    </script>
  `;
}

export function generateMarkdownPageTemplate(fileName: string, htmlContent: string): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${fileName}</title>
      <script>
        window.MathJax = {
          tex: {
            inlineMath: [['\\\\(', '\\\\)'], ['\\(', '\\)']],
            displayMath: [['$$', '$$'], ['\\\\[', '\\\\]']]
          },
          svg: {
            fontCache: 'global'
          }
        };
      </script>
      <script type="text/javascript" id="MathJax-script" async
        src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js">
      </script>
      <style>
        ${getMarkdownStyles()}
      </style>
    </head>
    <body>
      <article class="markdown-body">
        ${htmlContent}
      </article>
      <script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
      <script>
        try {
          let mermaidTheme = 'default';
          if (window.localStorage && localStorage.getItem('theme') === 'hacker-theme') {
            document.documentElement.classList.add('hacker-theme-md');
            mermaidTheme = 'dark';
          }
          mermaid.initialize({ startOnLoad: true, theme: mermaidTheme });
        } catch (e) {
          console.warn('Error during Mermaid setup:', e);
          mermaid.initialize({ startOnLoad: true, theme: 'default' });
        }
      </script>
    </body>
    </html>
  `;
}

function getMarkdownStyles(): string {
  return `
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"; line-height: 1.6; padding: 20px; margin: 0; background-color: #f9f9f9; color: #333; }
    .markdown-body { max-width: 800px; margin: 0 auto; background-color: #fff; border: 1px solid #ddd; padding: 20px 40px; border-radius: 6px; }
    h1,h2,h3,h4,h5,h6{margin-top:24px;margin-bottom:16px;font-weight:600;line-height:1.25;border-bottom:1px solid #eee;padding-bottom:.3em}h1{font-size:2em}h2{font-size:1.5em}h3{font-size:1.25em}
    p{margin-bottom:16px}a{color:#0366d6;text-decoration:none}a:hover{text-decoration:underline}
    code:not(.language-mermaid){font-family:"SFMono-Regular",Consolas,"Liberation Mono",Menlo,Courier,monospace;font-size:85%;padding:.2em .4em;margin:0;background-color:rgba(27,31,35,.05);border-radius:3px}
    pre:not(.mermaid){font-family:"SFMono-Regular",Consolas,"Liberation Mono",Menlo,Courier,monospace;font-size:85%;line-height:1.45;background-color:#f6f8fa;border-radius:3px;padding:16px;overflow-x:auto}
    pre:not(.mermaid) code{padding:0;margin:0;background-color:transparent;border:0;font-size:100%}
    blockquote{margin:0 0 16px 0;padding:0 1em;color:#6a737d;border-left:.25em solid #dfe2e5}
    ul,ol{padding-left:2em;margin-bottom:16px}
    table{border-collapse:collapse;width:100%;margin-bottom:16px;display:block;overflow-x:auto}
    th,td{border:1px solid #dfe2e5;padding:6px 13px}th{font-weight:600}
    img{max-width:100%;height:auto;box-sizing:content-box;background-color:#fff}
    hr{height:.25em;padding:0;margin:24px 0;background-color:#e1e4e8;border:0}
    .mermaid{text-align:center;margin-bottom:16px;overflow-x:auto}
    .hacker-theme-md body{background-color:#0d1117;color:#c9d1d9}
    .hacker-theme-md .markdown-body{background-color:#161b22;border-color:#30363d}
    .hacker-theme-md h1,.hacker-theme-md h2,.hacker-theme-md h3,.hacker-theme-md h4,.hacker-theme-md h5,.hacker-theme-md h6{border-bottom-color:#21262d;color:#c9d1d9}
    .hacker-theme-md a{color:#58a6ff}
    .hacker-theme-md code:not(.language-mermaid){background-color:rgba(110,118,129,.4);color:#c9d1d9}
    .hacker-theme-md pre:not(.mermaid){background-color:#0d1117}
    .hacker-theme-md blockquote{color:#8b949e;border-left-color:#30363d}
    .hacker-theme-md th,.hacker-theme-md td{border-color:#30363d}
    .hacker-theme-md hr{background-color:#30363d}
    .hacker-theme-md .mermaid svg{filter:invert(90%) hue-rotate(180deg) brightness(1.1) contrast(.9)}
    .hacker-theme-md mjx-container { color: #c9d1d9 !important; }
  `;
}

export function generateFolderIndexTemplate(folderName: string, itemType: string, relevantFiles: string[]): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <title>${itemType} Index</title>
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    </head>
    <body class="bg-gray-100 p-8">
      <h1 class="text-3xl font-bold mb-4">${itemType} Index</h1>
      <ul class="list-disc pl-5 mb-4">
        ${relevantFiles.map(file => `<li><a href="/${folderName}/${file}" class="text-blue-600 hover:underline">${file}</a></li>`).join('')}
      </ul>
      <a href="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        <i class="fas fa-home mr-2"></i>Home
      </a>
    </body>
    </html>
  `;
} 
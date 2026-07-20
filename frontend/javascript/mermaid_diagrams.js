// Mermaid is loaded on demand from a CDN (like hljs and Alpine in _head.erb)
// so pages without diagrams don't pay for the ~500KB library.
const MERMAID_URL = "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";

const ZOOM_MIN = 0.25;
const ZOOM_MAX = 4;
const ZOOM_STEP = 1.25;

function currentTheme() {
  return document.documentElement.classList.contains("dark") ? "dark" : "default";
}

function buildDiagramFigure(code) {
  const figure = document.createElement("div");
  figure.className = "mermaid-figure relative my-6 rounded-md border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800";

  const container = document.createElement("pre");
  container.className = "mermaid !my-0 !bg-transparent !p-0";
  container.dataset.diagram = code.textContent.trim();
  container.textContent = container.dataset.diagram;

  const fullScreenButton = document.createElement("button");
  fullScreenButton.type = "button";
  fullScreenButton.textContent = "Full Screen";
  fullScreenButton.className = "absolute top-2 right-2 rounded-md border border-slate-200 bg-white px-2 py-1 text-2xs font-medium text-slate-600 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600";
  fullScreenButton.addEventListener("click", () => openFullScreen(container));

  figure.appendChild(container);
  figure.appendChild(fullScreenButton);
  return figure;
}

function toolbarButton(label, title) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = label;
  button.title = title;
  button.className = "rounded-md border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600";
  return button;
}

function openFullScreen(container) {
  const svg = container.querySelector("svg");
  if (!svg) return;

  const overlay = document.createElement("div");
  overlay.className = "fixed inset-0 z-50 flex flex-col bg-slate-50 dark:bg-slate-900";

  const toolbar = document.createElement("div");
  toolbar.className = "flex items-center justify-end gap-2 border-b border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800";

  const zoomOut = toolbarButton("−", "Zoom out");
  const zoomLevel = document.createElement("span");
  zoomLevel.className = "w-14 text-center text-sm text-slate-600 dark:text-slate-300";
  const zoomIn = toolbarButton("+", "Zoom in");
  const reset = toolbarButton("Reset", "Reset zoom");
  const close = toolbarButton("Close", "Close full screen (Esc)");

  toolbar.append(zoomOut, zoomLevel, zoomIn, reset, close);

  const scroller = document.createElement("div");
  scroller.className = "flex-1 overflow-auto p-6";

  const stage = document.createElement("div");
  stage.className = "flex min-h-full min-w-full items-center justify-center w-max";

  const clone = svg.cloneNode(true);
  // Mermaid caps the inline SVG with a max-width style; drop it so the clone
  // can be sized freely for zooming.
  const baseWidth = parseFloat(clone.style.maxWidth) || svg.getBoundingClientRect().width;
  clone.style.maxWidth = "none";

  let zoom = 1;
  const applyZoom = () => {
    clone.style.width = `${baseWidth * zoom}px`;
    zoomLevel.textContent = `${Math.round(zoom * 100)}%`;
  };
  applyZoom();

  zoomIn.addEventListener("click", () => {
    zoom = Math.min(zoom * ZOOM_STEP, ZOOM_MAX);
    applyZoom();
  });
  zoomOut.addEventListener("click", () => {
    zoom = Math.max(zoom / ZOOM_STEP, ZOOM_MIN);
    applyZoom();
  });
  reset.addEventListener("click", () => {
    zoom = 1;
    applyZoom();
  });

  const dismiss = () => {
    document.removeEventListener("keydown", onKeyDown);
    overlay.remove();
    document.body.style.overflow = "";
  };
  const onKeyDown = (event) => {
    if (event.key === "Escape") dismiss();
  };
  close.addEventListener("click", dismiss);
  document.addEventListener("keydown", onKeyDown);

  stage.appendChild(clone);
  scroller.appendChild(stage);
  overlay.append(toolbar, scroller);
  document.body.appendChild(overlay);
  document.body.style.overflow = "hidden";
}

export function renderMermaidDiagrams() {
  // Kramdown renders ```mermaid fences as <pre><code class="language-mermaid">.
  // Swap them for the <pre class="mermaid"> containers mermaid.run() expects
  // synchronously, before hljs and the copy-button code see them.
  const blocks = document.querySelectorAll("pre > code.language-mermaid");
  blocks.forEach((code) => {
    code.parentNode.replaceWith(buildDiagramFigure(code));
  });

  if (blocks.length === 0) return;

  import(MERMAID_URL)
    .then(({ default: mermaid }) => {
      let renderedTheme = null;
      const run = async () => {
        if (renderedTheme === currentTheme()) return;
        renderedTheme = currentTheme();
        mermaid.initialize({ startOnLoad: false, theme: renderedTheme });
        document.querySelectorAll("pre.mermaid").forEach((el) => {
          el.removeAttribute("data-processed");
          el.textContent = el.dataset.diagram;
        });
        await mermaid.run();
      };

      run();

      // Re-render when the Alpine theme toggle flips the `dark` class on <html>.
      new MutationObserver((mutations) => {
        if (mutations.some((m) => m.attributeName === "class")) run();
      }).observe(document.documentElement, { attributes: true });
    })
    .catch((error) => {
      // Leave the raw diagram text visible as a fallback.
      console.error("Failed to load mermaid:", error);
    });
}

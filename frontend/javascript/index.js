import "$styles/index.css"
import "$styles/syntax-highlighting.css"

// Import all JavaScript & CSS files from src/_components
import components from "$components/**/*.{js,jsx,js.rb,css}"

console.info("Bridgetown is loaded!")

function enableCodeHighlighting() {
  document.querySelectorAll('pre code').forEach(block => block.textContent = block.textContent.trim());
  hljs.highlightAll();
}

function enableDocSearch() {
  docsearch({
    appId: "RDM4DTADEP",
    apiKey: "c0fb830900a6cd24677d8f3d791ed567",
    indexName: "onebusaway-onrender",
    insights: true, // Optional, automatically send insights when user interacts with search results
    container: '#oba-docs-search-container--desktop',
    debug: false // Set debug to true if you want to inspect the modal
  });

  docsearch({
    appId: "RDM4DTADEP",
    apiKey: "c0fb830900a6cd24677d8f3d791ed567",
    indexName: "onebusaway-onrender",
    insights: true, // Optional, automatically send insights when user interacts with search results
    container: '#oba-docs-search-container--mobile',
    debug: false // Set debug to true if you want to inspect the modal
  });
}

function enableScrollToTop() {
  const scrollToTopBtn = document.getElementById('scrollToTopBtn');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollToTopBtn.classList.remove('hidden');
    } else {
      scrollToTopBtn.classList.add('hidden');
    }
  });

  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

document.addEventListener("DOMContentLoaded", function(event) {
  enableCodeHighlighting();
  enableDocSearch();
  enableScrollToTop();
});

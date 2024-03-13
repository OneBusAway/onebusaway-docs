import "$styles/index.css"
import "$styles/syntax-highlighting.css"

import {
  enableCodeHighlighting,
  insertCodeSnippetCopyButtons
} from "./code_snippets";

import {
  enableScrollToTop,
  saveAndRestoreNavigationPosition
} from "./page_navigation";

import { enableDocSearch } from "./search";

// Import all JavaScript & CSS files from src/_components
import components from "$components/**/*.{js,jsx,js.rb,css}"

console.info("Bridgetown is loaded!")

document.addEventListener("DOMContentLoaded", function(event) {
  const headings = document.querySelectorAll('article h2, article h3, article h4, article h5, article h6, main h2, main h3, main h4, main h5, main h6');

  headings.forEach(function(heading) {
    const linkIcon = document.createElement('span');
    linkIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 22 22" id="link"><g fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><g stroke="#fff" stroke-width="2" transform="translate(-981 -1753)"><g transform="translate(982 1754)"><path d="M8 11a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07L9.75 3.18"></path><path d="M12 9a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></g></g></g></svg>';
    linkIcon.style.color = '#ffffff';
    linkIcon.style.cursor = 'pointer';
    linkIcon.style.position = 'relative';
    linkIcon.style.left = '10px';
    linkIcon.style.display = 'none';

    heading.appendChild(linkIcon);

    linkIcon.addEventListener('click', function(event) {
      event.stopPropagation();
      const id = heading.getAttribute('id');
      const url = window.location.href.split('#')[0] + '#' + id;
      navigator.clipboard.writeText(url);
      document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    });

    heading.addEventListener('mouseover', function() {
      linkIcon.style.display = 'inline-block'; // Show the link icon on hover
    });

    heading.addEventListener('mouseout', function() {
      linkIcon.style.display = 'none'; // Hide the link icon when not hovering
    });
  });
});



document.addEventListener("DOMContentLoaded", function(event) {
  enableCodeHighlighting();
  insertCodeSnippetCopyButtons();
  enableDocSearch('#oba-docs-search-container--desktop');
  enableDocSearch('#oba-docs-search-container--mobile');
  enableScrollToTop();
  saveAndRestoreNavigationPosition();
});

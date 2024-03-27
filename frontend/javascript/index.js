import "$styles/index.css";
import "$styles/syntax-highlighting.css";
import "jsoneditor/dist/jsoneditor.min.css";

import {
  enableCodeHighlighting,
  insertCodeSnippetCopyButtons,
  copyHeadingDirectLinks,
  initializeJSONEditor,
} from "./code_snippets";

import {
  enableScrollToTop,
  saveAndRestoreNavigationPosition,
  setupSidebar
} from "./page_navigation";

import { enableDocSearch } from "./search";

// Import all JavaScript & CSS files from src/_components
import components from "$components/**/*.{js,jsx,js.rb,css}"

console.info("Bridgetown is loaded!")

document.addEventListener("DOMContentLoaded", function(event) {
  copyHeadingDirectLinks();
  enableCodeHighlighting();
  insertCodeSnippetCopyButtons();
  initializeJSONEditor();
  enableDocSearch('#oba-docs-search-container--desktop');
  enableDocSearch('#oba-docs-search-container--mobile');
  enableScrollToTop();
  saveAndRestoreNavigationPosition();
  setupSidebar();
});

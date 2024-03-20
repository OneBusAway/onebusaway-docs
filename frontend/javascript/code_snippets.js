import JSONEditor from "jsoneditor";

export function enableCodeHighlighting() {
  document.querySelectorAll('pre code').forEach(block => block.textContent = block.textContent.trim());
  hljs.highlightAll();
}

export function copyHeadingDirectLinks() {
  const headings = document.querySelectorAll('article h2, article h3, article h4, article h5, article h6, main h2, main h3, main h4, main h5, main h6');

  headings.forEach(function (heading) {
    const linkIcon = document.createElement('span');
    linkIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 22 22" id="direct-heading-link"><g fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><g stroke="#34D399" stroke-width="2" transform="translate(-981 -1753)"><g transform="translate(982 1754)"><path d="M8 11a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07L9.75 3.18"></path><path d="M12 9a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></g></g></g></svg>';
    linkIcon.style.cursor = 'pointer';
    linkIcon.style.position = 'relative';
    linkIcon.style.left = '10px';
    linkIcon.style.display = 'none';

    heading.appendChild(linkIcon);

    linkIcon.addEventListener('click', function (event) {
      event.stopPropagation();
      const id = heading.getAttribute('id');
      const url = window.location.href.split('#')[0] + '#' + id;
      navigator.clipboard.writeText(url);
    });

    heading.addEventListener('mouseover', function () {
      linkIcon.style.display = 'inline-block'; // Show the link icon on hover
    });

    heading.addEventListener('mouseout', function () {
      linkIcon.style.display = 'none'; // Hide the link icon when not hovering
    });
  });
}

export function insertCodeSnippetCopyButtons() {
  const codeBlocks = document.querySelectorAll('pre code');
  codeBlocks.forEach(function (block) {
    const pre = block.parentNode;
    const copyButton = document.createElement('button');
    const svgIcon = `<svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 11C6 8.17157 6 6.75736 6.87868 5.87868C7.75736 5 9.17157 5 12 5H15C17.8284 5 19.2426 5 20.1213 5.87868C21 6.75736 21 8.17157 21 11V16C21 18.8284 21 20.2426 20.1213 21.1213C19.2426 22 17.8284 22 15 22H12C9.17157 22 7.75736 22 6.87868 21.1213C6 20.2426 6 18.8284 6 16V11Z" stroke="var(--tw-prose-code)" stroke-width="1.5"/>
    <path d="M6 19C4.34315 19 3 17.6569 3 16V10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H15C16.6569 2 18 3.34315 18 5" stroke="var(--tw-prose-code)" stroke-width="1.5"/>
    </svg>`

    copyButton.innerHTML = svgIcon;
    copyButton.classList.add('copy-button');
    copyButton.setAttribute('title', 'Copy Code Snippet');
    pre.appendChild(copyButton);
    pre.style.position = 'relative';
    copyButton.style.position = 'absolute';
    copyButton.style.right = '7px';
    copyButton.style.top = '10px';
    copyButton.style.zIndex = '1';
    copyButton.style.border = '1px solid var(--tw-prose-code-bg)'; // Add border style
    copyButton.style.padding = '10px';
    copyButton.style.backdropFilter = 'blur(20px)';
    copyButton.style.cursor = 'pointer';
    copyButton.style.fontSize = '14px';
    copyButton.style.borderRadius='10px';
    copyButton.style.boxShadow= 'inset 0 0 0 1.5px var(--tw-prose-code-ring)';

    copyButton.addEventListener('click', function () {
      const contentToCopy = block.innerText;
      const tempTextarea = document.createElement('textarea');
      tempTextarea.value = contentToCopy;
      document.body.appendChild(tempTextarea);
      tempTextarea.select();
      document.execCommand('copy');
      document.body.removeChild(tempTextarea);
      const copiedIcon = `<svg width="16px" height="16px" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.5 12.5L10.167 17L19.5 8" stroke="#22b322" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
       fill="#B4B4B8"/>
      </svg>`;
      copyButton.innerHTML = copiedIcon;
      setTimeout(function () {
        copyButton.innerHTML = svgIcon;
      }, 2000);
    });
  });
}

export function initializeJSONEditor() {
  // Does the page have JSON data?
  const jsonTextElt = document.getElementById("json-data");
  if (!jsonTextElt) {
    return;
  }

  // Can we turn it into a JS object?
  const jsonData = JSON.parse(jsonTextElt.innerText);
  if (!jsonData) {
    return;
  }

  // create the editor
  const container = document.getElementById("json-editor");
  const options = {
    mode: 'code',
    modes: ['code', 'view'], // allowed modes
  }
  const editor = new JSONEditor(container, options);
  editor.set(jsonData);
}

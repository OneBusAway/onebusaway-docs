export function enableCodeHighlighting() {
  document.querySelectorAll('pre code').forEach(block => block.textContent = block.textContent.trim());
  hljs.highlightAll();
}

const h1Elements = document.querySelectorAll('h1');
const h2Elements = document.querySelectorAll('h2');
const sidebar = document.querySelector('.sidebar');
sidebar.style.position = 'fixed';
sidebar.style.top = '100px';
sidebar.style.right = '50px';
sidebar.style.width = 'fit-content';
sidebar.style.maxWidth = '300px';
sidebar.style.height = '100%';
function appendSidebarItem(textContent, tagName) {
  const newItem = document.createElement('p');
  newItem.textContent = textContent;
  if(tagName === 'h1') {
    newItem.classList.add('sidebar-item');
    newItem.style.color = '#10b981';
  }
  if(tagName === 'h2') {
    newItem.classList.add('sidebar-item-h2');
    newItem.style.color = 'gray';
    newItem.style.marginLeft = '20px';
    newItem.style.cursor = 'pointer';
  }
  sidebar.appendChild(newItem);
}

document.addEventListener('DOMContentLoaded', function() {
  const sidebarItems = document.querySelectorAll('.sidebar-item-h2');

  sidebarItems.forEach(function(item) {
     item.addEventListener('mouseenter', function() {
      item.style.color = '#34d399';
     });
     item.addEventListener('mouseleave', function() {
      item.style.color = 'gray';
      });
      item.addEventListener('click', function() {
          const currentVersion = item.textContent;
          const headings = document.querySelectorAll('h2');
          let targetElement = null;
          headings.forEach(function(heading) {
              if (heading.textContent.trim() === currentVersion.trim()) {
                  targetElement = heading;
              }
          });
          if (targetElement) {
              window.scrollTo(0, targetElement.offsetTop - 100);
          }
      });
  });
});


h1Elements.forEach(function(element) {
  appendSidebarItem(element.textContent, 'h1');
});
let categories=0;
h2Elements.forEach(function(element) {
  if(categories>4)
  {
    appendSidebarItem(element.textContent, 'h2');
  }
  categories++;
});

export function insertCodeSnippetCopyButtons() {
  const codeBlocks = document.querySelectorAll('pre code');
  codeBlocks.forEach(function(block) {
    const pre = block.parentNode;
    const copyButton = document.createElement('button');
    const svgIcon = `<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 11C6 8.17157 6 6.75736 6.87868 5.87868C7.75736 5 9.17157 5 12 5H15C17.8284 5 19.2426 5 20.1213 5.87868C21 6.75736 21 8.17157 21 11V16C21 18.8284 21 20.2426 20.1213 21.1213C19.2426 22 17.8284 22 15 22H12C9.17157 22 7.75736 22 6.87868 21.1213C6 20.2426 6 18.8284 6 16V11Z" stroke="#B4B4B8" stroke-width="1.5"/>
    <path d="M6 19C4.34315 19 3 17.6569 3 16V10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H15C16.6569 2 18 3.34315 18 5" stroke="#B4B4B8" stroke-width="1.5"/>
    </svg>`

    copyButton.innerHTML = svgIcon;
    copyButton.classList.add('copy-button');
    copyButton.setAttribute('title', 'Copy Code Snippet');
    pre.appendChild(copyButton);
    pre.style.position = 'relative';
    copyButton.style.position = 'absolute';
    copyButton.style.right = '5px';
    copyButton.style.top = '5px';
    copyButton.style.zIndex = '1';
    copyButton.style.border = 'none';
    copyButton.style.padding = '5px';
    copyButton.style.cursor = 'pointer';
    copyButton.style.fontSize = '14px';

    copyButton.addEventListener('click', function() {
      const contentToCopy = block.innerText;
      const tempTextarea = document.createElement('textarea');
      tempTextarea.value = contentToCopy;
      document.body.appendChild(tempTextarea);
      tempTextarea.select();
      document.execCommand('copy');
      document.body.removeChild(tempTextarea);
      const copiedIcon = `<svg width="24px" height="24px" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.5 12.5L10.167 17L19.5 8" stroke="#B4B4B8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
       fill="#B4B4B8"/>
      </svg>`;
       copyButton.innerHTML = copiedIcon;
      setTimeout(function() {
        copyButton.innerHTML = svgIcon;
      }, 2000);
    });
  });
}
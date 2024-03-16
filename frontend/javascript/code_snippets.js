export function enableCodeHighlighting() {
  document.querySelectorAll('pre code').forEach(block => block.textContent = block.textContent.trim());
  hljs.highlightAll();
}

export function insertCodeSnippetCopyButtons() {
  const codeBlocks = document.querySelectorAll('pre code');
  codeBlocks.forEach(function(block) {
    const heading = block.result.language || block.secondBest.language;
    const pre = block.parentNode;
    const copyButton = document.createElement('button');
    const svgIcon = `<span style="pointer-events: none;"><svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 11C6 8.17157 6 6.75736 6.87868 5.87868C7.75736 5 9.17157 5 12 5H15C17.8284 5 19.2426 5 20.1213 5.87868C21 6.75736 21 8.17157 21 11V16C21 18.8284 21 20.2426 20.1213 21.1213C19.2426 22 17.8284 22 15 22H12C9.17157 22 7.75736 22 6.87868 21.1213C6 20.2426 6 18.8284 6 16V11Z" stroke="#B4B4B8" stroke-width="1.5"/>
    <path d="M6 19C4.34315 19 3 17.6569 3 16V10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H15C16.6569 2 18 3.34315 18 5" stroke="#B4B4B8" stroke-width="1.5"/>
    </svg></span>`

    copyButton.innerText = heading;
    copyButton.classList.add('copy-button');
    copyButton.setAttribute('title', 'Copy Code Snippet');
    pre.appendChild(copyButton);
    pre.style.position = 'relative';
    copyButton.style.position = 'absolute';
    copyButton.style.right = '1px';
    copyButton.style.top = '1px';
    copyButton.style.zIndex = '1';
    copyButton.style.border = 'none';
    copyButton.style.borderRadius = '12px';
    copyButton.style.padding = '10px';
    copyButton.style.backdropFilter = 'blur(5px)';
    copyButton.style.cursor = 'pointer';
    copyButton.style.fontSize = '14px';

    pre.addEventListener('mouseenter', function() {
      copyButton.innerText = '';
      copyButton.innerHTML = svgIcon;
    });

    pre.addEventListener ('mouseleave',function(){
      copyButton.innerText = heading;
    })

    copyButton.addEventListener('click', function() {
      const contentToCopy = block.innerText;
      const tempTextarea = document.createElement('textarea');
      tempTextarea.value = contentToCopy;
      document.body.appendChild(tempTextarea);
      tempTextarea.select();
      document.execCommand('copy');
      document.body.removeChild(tempTextarea);
      const copiedIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
    </svg>`;
       copyButton.innerHTML = copiedIcon;
      setTimeout(function() {
        copyButton.innerText = heading;
      }, 2000);
   });
  });
}
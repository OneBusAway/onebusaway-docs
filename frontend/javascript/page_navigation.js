export function enableScrollToTop() {
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

export function setupSidebar() {
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
    if (tagName === 'h1') {
      newItem.classList.add('sidebar-item');
      newItem.classList.add('text-green-500'); 
    }
    if (tagName === 'h2') {
      newItem.classList.add('sidebar-item-h2');
      newItem.classList.add('text-gray-500'); 
      newItem.style.marginLeft = '20px';
      newItem.style.cursor = 'pointer';
    }
    sidebar.appendChild(newItem);
  }

  h1Elements.forEach(function (element) {
    appendSidebarItem(element.textContent, 'h1');
  });

  let categories = 0;
  h2Elements.forEach(function (element) {
    if (categories > 4) {
      appendSidebarItem(element.textContent, 'h2');
    }
    categories++;
  });
}

export function saveAndRestoreNavigationPosition() {
  var scrollPosition = sessionStorage.getItem('scrollPosition');
  if (scrollPosition !== undefined) {
    document.querySelector('#navigation-sidebar').scrollTop = parseInt(scrollPosition);
  }
  document.querySelector('#navigation-sidebar').addEventListener('click', function() {
    var scrollPosition = document.querySelector('#navigation-sidebar').scrollTop;
    sessionStorage.setItem('scrollPosition', scrollPosition);
    console.log('clicked')
  });
};

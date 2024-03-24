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
  const h2Elements = document.querySelectorAll('article h2');
  if (h2Elements.length === 0) {
    // If there are no h2 headings, do not set up the sidebar
    return;
  }
  const sidebar = document.querySelector('.sidebar');
  function appendSidebarItem(textContent, tagName) {
    const newItem = document.createElement('a');
    newItem.textContent = textContent;
    if (tagName === 'h2') {
      newItem.classList.add('sidebar-item-h2', 'text-gray-500', 'hover:text-green-400', 'ml-4', 'cursor-pointer');
    }
    sidebar.appendChild(newItem);

    newItem.addEventListener('click', function() {
      const allSidebarItems = document.querySelectorAll('.sidebar a');
      allSidebarItems.forEach(function(item) {
        item.style.color = ''; // Reset color
        item.style.fontWeight='';
      });

      // Change color of clicked item
      newItem.style.color = '#34D399';
      newItem.style.fontWeight='bold';

      const currentVersion = newItem.textContent;
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
  }

  const sidebarHeading = document.createElement('div');
  sidebarHeading.textContent = 'ON THIS PAGE';
  sidebarHeading.classList.add('sidebar-heading');
  sidebarHeading.style.color = '#34D399';
  sidebarHeading.style.fontSize = '15px';
  sidebarHeading.style.fontWeight='bold';
  sidebarHeading.style.paddingBottom='15px';
  sidebar.appendChild(sidebarHeading);

  h2Elements.forEach(function (element) {
    appendSidebarItem(element.textContent, 'h2');
  });

  const h2Items = document.querySelectorAll('.sidebar-item-h2');
  h2Items.forEach(item => {
    item.style.paddingTop = '5px';
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

function appendSidebarItem(textContent, tagName) {
  const sidebar = document.querySelector('.sidebar');
  const newItem = document.createElement('a');
  newItem.textContent = textContent;
  if (tagName === 'h1') {
    newItem.classList.add('sidebar-item', 'text-green-500', 'block');
  }
  else if (tagName === 'h2') {
    newItem.classList.add('sidebar-item-h2', 'text-gray-500', 'hover:text-green-400', 'ml-4', 'block', 'cursor-pointer');
  }
  sidebar.appendChild(newItem);

  newItem.addEventListener('click', function() {
    const currentVersion = newItem.textContent;
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
}

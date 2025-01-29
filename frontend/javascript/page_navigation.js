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

  if (h2Elements.length == 0) {
    return;
  }

  h1Elements.forEach(function (element) {
    appendSidebarItem(element.textContent, 'h1');
  });

  h2Elements.forEach(function (element) {
    appendSidebarItem(element.textContent, 'h2');
  });

  const h2Items = document.querySelectorAll('.sidebar-item-h2');
  h2Items.forEach(item => {
    item.style.paddingTop = '10px';
  });

  window.addEventListener('scroll', highlightSidebarItem);
}

function appendSidebarItem(textContent, tagName) {
  const sidebar = document.querySelector('.sidebar');
  const newItem = document.createElement('a');
  newItem.textContent = textContent;
  if (tagName === 'h1') {
    newItem.classList.add('sidebar-item', 'text-green-500', 'block');
  } else if (tagName === 'h2') {
    newItem.classList.add('sidebar-item-h2', 'text-gray-500', 'hover:text-green-400', 'ml-4', 'block', 'cursor-pointer');
  }
  sidebar.appendChild(newItem);

  newItem.addEventListener('click', function () {
    const allSidebarItems = document.querySelectorAll('.sidebar a');

    const currentVersion = newItem.textContent;
    const headings = document.querySelectorAll('h2');
    let targetElement = null;
    headings.forEach(function (heading) {
      if (heading.textContent.trim() === currentVersion.trim()) {
        targetElement = heading;
      }
    });
    if (targetElement) {
      window.scrollTo(0, targetElement.offsetTop - 100);
    }
  });
}

function highlightSidebarItem() {
  const scrollPosition = window.scrollY;
  const windowHeight = window.innerHeight;

  const h2Items = document.querySelectorAll('.sidebar-item-h2');
  h2Items.forEach((item, index) => {
    const sectionId = item.textContent.trim().toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');
    const section = document.getElementById(sectionId);
    if (section) {
      const sectionTop = section.offsetTop;

      let nextSectionTop = Infinity;
      if (index < h2Items.length - 1) {
        const nextItem = h2Items[index + 1];
        const nextSectionId = nextItem.textContent.trim().toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');
        const nextSection = document.getElementById(nextSectionId);
        if (nextSection) {
          nextSectionTop = nextSection.offsetTop;
        }
      }

      const sectionMiddle = sectionTop + section.offsetHeight / 2;
      let shouldHighlight = false;
      if (scrollPosition >= sectionTop - windowHeight / 3 && scrollPosition < nextSectionTop - windowHeight / 3) {
        shouldHighlight = true;
      } else if (scrollPosition >= sectionTop - 200 && scrollPosition >= nextSectionTop - windowHeight / 3 && index === h2Items.length - 1) {
        shouldHighlight = true;
      }
      if (shouldHighlight) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    }
  });
}
window.addEventListener('scroll', highlightSidebarItem);


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
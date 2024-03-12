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

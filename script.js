document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let visibleItems = [];
  let currentIndex = 0;

  // 1. Filtering Logic
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active filter button style
      document.querySelector('.filter-btn.active').classList.remove('active');
      btn.classList.add('active');

      const filterCategory = btn.dataset.category;

      galleryItems.forEach(item => {
        const itemCategory = item.dataset.category;
        if (filterCategory === 'all' || filterCategory === itemCategory) {
          item.classList.remove('hide');
        } else {
          item.classList.add('hide');
        }
      });

      updateVisibleItems();
    });
  });

  function updateVisibleItems() {
    visibleItems = Array.from(galleryItems).filter(item => !item.classList.contains('hide'));
  }

  updateVisibleItems(); // Initial state

  // 2. Lightbox Open
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      currentIndex = visibleItems.indexOf(item);
      showLightboxImage(currentIndex);
      lightbox.classList.add('active');
    });
  });

  function showLightboxImage(index) {
    if (visibleItems.length === 0) return;
    const selectedItem = visibleItems[index];
    const imgElement = selectedItem.querySelector('img');
    const titleElement = selectedItem.querySelector('.overlay h3');

    lightboxImg.src = imgElement.src;
    lightboxCaption.textContent = titleElement.textContent;
  }

  // 3. Navigation Controls
  lightboxNext.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % visibleItems.length;
    showLightboxImage(currentIndex);
  });

  lightboxPrev.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
    showLightboxImage(currentIndex);
  });

  // 4. Close Lightbox
  lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
    }
  });

  // Keyboard Navigation Support (Arrow keys & Escape)
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') lightbox.classList.remove('active');
    if (e.key === 'ArrowRight') lightboxNext.click();
    if (e.key === 'ArrowLeft') lightboxPrev.click();
  });
});
document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Navigation Active State
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-links a');
  
  // Basic active state highlighting based on filename
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href !== '#' && currentPath.includes(href)) {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });

  // 2. Course Filtering Logic (courses.html)
  const filterTags = document.querySelectorAll('.filter-tag');
  const courseCards = document.querySelectorAll('.course-grid .course-card');
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');

  if (filterTags.length > 0 && courseCards.length > 0) {
    
    // Filter by tag
    filterTags.forEach(tag => {
      tag.addEventListener('click', () => {
        // Update active class
        filterTags.forEach(t => t.classList.remove('active'));
        tag.classList.add('active');
        
        const filterValue = tag.getAttribute('data-filter');
        filterCourses(filterValue, searchInput ? searchInput.value : '');
      });
    });

    // Search functionality
    if (searchInput && searchBtn) {
      const handleSearch = () => {
        const activeTag = document.querySelector('.filter-tag.active');
        const filterValue = activeTag ? activeTag.getAttribute('data-filter') : 'all';
        filterCourses(filterValue, searchInput.value);
      };

      searchBtn.addEventListener('click', handleSearch);
      searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') handleSearch();
      });
    }

    function filterCourses(category, searchTerm) {
      const term = searchTerm.toLowerCase();
      
      courseCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        const title = card.querySelector('.course-title').textContent.toLowerCase();
        const desc = card.querySelector('.course-desc').textContent.toLowerCase();
        
        const matchesCategory = (category === 'all' || cardCategory === category);
        const matchesSearch = (title.includes(term) || desc.includes(term));
        
        if (matchesCategory && matchesSearch) {
          card.style.display = 'flex';
          // Re-trigger animation
          card.style.animation = 'none';
          card.offsetHeight; /* trigger reflow */
          card.style.animation = null; 
        } else {
          card.style.display = 'none';
        }
      });
    }
  }

  // 3. Accordion Logic (course-detail.html)
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  if (accordionHeaders.length > 0) {
    
    // Initialize heights
    document.querySelectorAll('.accordion-item').forEach(item => {
      if (item.classList.contains('active')) {
        const content = item.querySelector('.accordion-content');
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });

    accordionHeaders.forEach(header => {
      header.addEventListener('click', () => {
        const item = header.parentElement;
        const isActive = item.classList.contains('active');
        const content = item.querySelector('.accordion-content');
        
        // Close all other accordions
        document.querySelectorAll('.accordion-item').forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherContent = otherItem.querySelector('.accordion-content');
            otherContent.style.maxHeight = null;
          }
        });
        
        // Toggle current accordion
        if (isActive) {
          item.classList.remove('active');
          content.style.maxHeight = null;
        } else {
          item.classList.add('active');
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    });
  }

  // 4. Video Modal Logic (course-detail.html)
  const playBtn = document.getElementById('playBtn');
  const videoModal = document.getElementById('videoModal');
  const closeVideo = document.getElementById('closeVideo');

  if (playBtn && videoModal && closeVideo) {
    playBtn.addEventListener('click', () => {
      videoModal.style.display = 'flex';
      videoModal.style.opacity = '0';
      
      // Simple fade in
      let opacity = 0;
      const fadeIn = setInterval(() => {
        if (opacity >= 1) clearInterval(fadeIn);
        videoModal.style.opacity = opacity;
        opacity += 0.1;
      }, 20);
    });

    closeVideo.addEventListener('click', () => {
      videoModal.style.display = 'none';
    });

    // Close on background click
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) {
        videoModal.style.display = 'none';
      }
    });
  }
});

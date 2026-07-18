/**
 * Emerald Brew - Premium Korean Modern Aesthetic Coffee Shop
 * Core Javascript Logic (Vanilla JS)
 * Ujian Akhir Semester - Aplikasi Komputer Bisnis
 * Kampus STIE Ekadharma Indonesia
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Loading Screen Fadeout
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.classList.add('fade-out');
    }, 1200);
  }

  // 2. Scroll Progress Bar & Sticky Header
  const progressBar = document.getElementById('scroll-progress');
  const header = document.querySelector('header');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    // Progress calculation
    const windowScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (height > 0) {
      const scrolled = (windowScroll / height) * 100;
      if (progressBar) progressBar.style.width = scrolled + '%';
    }

    // Sticky Navbar shadow & background
    if (header) {
      if (windowScroll > 50) {
        header.classList.add('bg-white', 'shadow-md', 'py-4');
        header.classList.remove('bg-transparent', 'py-6');
      } else {
        header.classList.remove('bg-white', 'shadow-md', 'py-4');
        header.classList.add('bg-transparent', 'py-6');
      }
    }

    // Back to top visible trigger
    if (backToTopBtn) {
      if (windowScroll > 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }
  });

  // 3. Back to Top Click
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 4. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileMenuIcon = mobileMenuBtn ? mobileMenuBtn.querySelector('i') : null;

  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('hidden');
      if (mobileMenuIcon) {
        if (mobileNav.classList.contains('hidden')) {
          mobileMenuIcon.className = 'fa-solid fa-bars';
        } else {
          mobileMenuIcon.className = 'fa-solid fa-xmark';
        }
      }
    });

    // Close mobile nav when clicking a link
    const mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.add('hidden');
        if (mobileMenuIcon) mobileMenuIcon.className = 'fa-solid fa-bars';
      });
    });
  }

  // 5. Button Ripple Animation
  const rippleButtons = document.querySelectorAll('.btn-ripple');
  rippleButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      const circle = document.createElement('span');
      const diameter = Math.max(this.clientWidth, this.clientHeight);
      const radius = diameter / 2;

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - this.getBoundingClientRect().left - radius}px`;
      circle.style.top = `${e.clientY - this.getBoundingClientRect().top - radius}px`;
      circle.classList.add('ripple-effect');

      // Create inline ripple element style
      circle.style.position = 'absolute';
      circle.style.borderRadius = '50%';
      circle.style.transform = 'scale(0)';
      circle.style.background = 'rgba(255, 255, 255, 0.4)';
      circle.style.pointerEvents = 'none';
      circle.style.animation = 'ripple-animation 0.6s linear';

      // Ensure style definition has rule for keyframe
      if (!document.getElementById('ripple-keyframe')) {
        const style = document.createElement('style');
        style.id = 'ripple-keyframe';
        style.innerHTML = `
          @keyframes ripple-animation {
            to { transform: scale(4); opacity: 0; }
          }
        `;
        document.head.appendChild(style);
      }

      const existingRipple = this.querySelector('.ripple-effect');
      if (existingRipple) {
        existingRipple.remove();
      }

      this.appendChild(circle);
    });
  });

  // 6. Intersection Observer for Scroll Reveal
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => observer.observe(el));
  } else {
    // Fallback
    reveals.forEach(el => el.classList.add('active'));
  }

  // 7. Menu Interactive Filtering
  const filterBtns = document.querySelectorAll('.menu-tab');
  const menuCards = document.querySelectorAll('.menu-card-item');

  if (filterBtns.length > 0 && menuCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from other buttons
        filterBtns.forEach(b => b.classList.remove('bg-[#0F5E4F]', 'text-white'));
        filterBtns.forEach(b => b.classList.add('bg-white', 'text-[#6B7280]'));
        
        // Add active class to clicked button
        btn.classList.add('bg-[#0F5E4F]', 'text-white');
        btn.classList.remove('bg-white', 'text-[#6B7280]');

        const category = btn.getAttribute('data-filter');

        menuCards.forEach(card => {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          
          setTimeout(() => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
              card.style.display = 'flex';
              setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
              }, 50);
            } else {
              card.style.display = 'none';
            }
          }, 300);
        });
      });
    });
  }

  // 8. Reservation Form handling to WhatsApp
  const reservationForm = document.getElementById('reservation-form');
  if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('res-name').value;
      const phone = document.getElementById('res-phone').value;
      const guests = document.getElementById('res-guests').value;
      const date = document.getElementById('res-date').value;
      const time = document.getElementById('res-time').value;
      const notes = document.getElementById('res-notes').value || '-';

      const waNumber = '6281234567890'; // Custom static wa number formatted correctly
      
      const message = `Nama : ${name}\n` +
        `Nomor HP : ${phone}\n` +
        `Jumlah Orang : ${guests}\n` +
        `Tanggal : ${date}\n` +
        `Jam : ${time}\n` +
        `Catatan : ${notes}`;

      const encodedMessage = encodeURIComponent(message);
      const url = `https://wa.me/${waNumber}?text=${encodedMessage}`;
      
      window.open(url, '_blank');
    });
  }

  // 9. Student feedback submission and persistent local storage list
  const studentFeedbackForm = document.getElementById('student-feedback-form');
  const feedbackListContainer = document.getElementById('feedback-list-container');

  // Initial local storage loader
  let localFeedback = [];
  const storedFeedback = localStorage.getItem('emerald_brew_feedback');
  
  if (storedFeedback) {
    try {
      localFeedback = JSON.parse(storedFeedback);
    } catch(e) {
      localFeedback = [];
    }
  } else {
    // Sample reviews
    localFeedback = [
      {
        name: 'Budi Santoso',
        rating: 5,
        message: 'Mata kuliah Aplikasi Komputer Bisnis ini sangat luar biasa! Kami diajarkan cara mengimplementasikan ide bisnis riil ke dalam platform teknologi modern. Sukses selalu Kampus STIE Ekadharma Indonesia!',
        date: '18 Jul 2026'
      },
      {
        name: 'Siti Aminah',
        rating: 5,
        message: 'Sangat menyukai penugasan praktis seperti ini. Kita tidak hanya belajar teori tapi langsung praktek membuat UI/UX digital kafe yang indah.',
        date: '17 Jul 2026'
      }
    ];
    localStorage.setItem('emerald_brew_feedback', JSON.stringify(localFeedback));
  }

  function renderFeedbacks() {
    if (!feedbackListContainer) return;
    feedbackListContainer.innerHTML = '';
    
    localFeedback.forEach(item => {
      const card = document.createElement('div');
      card.className = 'bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-xs space-y-3';
      
      let stars = '';
      for (let i = 1; i <= 5; i++) {
        stars += i <= item.rating ? '★' : '☆';
      }

      card.innerHTML = `
        <div class="flex justify-between items-center">
          <div>
            <span class="block font-bold text-xs text-[#1F2937]">${item.name}</span>
            <span class="block text-[9px] text-[#6B7280] mt-0.5">${item.date}</span>
          </div>
          <div class="text-yellow-400 text-xs">${stars}</div>
        </div>
        <p class="text-xs text-[#6B7280] leading-relaxed font-light">${item.message}</p>
      `;
      feedbackListContainer.appendChild(card);
    });
  }

  // Render on load
  renderFeedbacks();

  if (studentFeedbackForm) {
    studentFeedbackForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('feedback-name').value;
      const rating = document.getElementById('feedback-rating').value;
      const message = document.getElementById('feedback-msg').value;

      const dateStr = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

      const newObj = {
        name: name,
        rating: parseInt(rating),
        message: message,
        date: dateStr
      };

      localFeedback.unshift(newObj);
      localStorage.setItem('emerald_brew_feedback', JSON.stringify(localFeedback));
      
      renderFeedbacks();

      // Reset form
      studentFeedbackForm.reset();
    });
  }

});

document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
      navbar.style.background = 'rgba(15, 23, 42, 0.95)';
      navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
    } else {
      navbar.style.background = 'rgba(15, 23, 42, 0.8)';
      navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
  });

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  const revealElements = document.querySelectorAll('[data-aos]');
  
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;

    revealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      
      if (elementTop < windowHeight - elementVisible) {
        const delay = element.getAttribute('data-aos-delay') || 0;
        
        setTimeout(() => {
          element.classList.add('aos-animate');
        }, delay);
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();

  const skillBars = document.querySelectorAll('.skill-progress');
  
  const animateSkillBars = () => {
    skillBars.forEach(bar => {
      const rect = bar.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      if (rect.top < windowHeight - 50) {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = progress + '%';
      }
    });
  };

  window.addEventListener('scroll', animateSkillBars);
  setTimeout(animateSkillBars, 500);

  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {      
      const existingOverlay = document.querySelector('.mobile-menu-overlay');
      
      if (existingOverlay) {
        existingOverlay.remove();
        document.body.style.overflow = '';
        return;
      }
      
      const overlay = document.createElement('div');
      overlay.className = 'mobile-menu-overlay';
      overlay.innerHTML = `
        <div class="mobile-menu-content">
          <button class="mobile-menu-close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
          <ul class="mobile-nav-links">
            <li><a href="#home">Beranda</a></li>
            <li><a href="#about">Tentang</a></li>
            <li><a href="#skills">Keahlian</a></li>
            <li><a href="#portfolio">Portofolio</a></li>
            <li><a href="#contact">Kontak</a></li>
          </ul>
        </div>
      `;
             
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(15, 23, 42, 0.98);
        z-index: 2000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease;
      `;
      
      const style = document.createElement('style');
      style.textContent = `
        .mobile-menu-content {
          text-align: center;
        }
        .mobile-menu-close {
          position: absolute;
          top: 20px;
          right: 20px;
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          padding: 10px;
        }
        .mobile-nav-links {
          list-style: none;
          padding: 0;
        }
        .mobile-nav-links li {
          margin: 20px 0;
        }
        .mobile-nav-links a {
          color: white;
          text-decoration: none;
          font-size: 24px;
          font-weight: 600;
          transition: color 0.3s;
        }
        .mobile-nav-links a:hover {
          color: #6366f1;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `;
      
      document.head.appendChild(style);
      document.body.appendChild(overlay);
      document.body.style.overflow = 'hidden';
             
      overlay.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = link.getAttribute('href');
          overlay.remove();
          document.body.style.overflow = '';
          
          setTimeout(() => {
            document.querySelector(targetId).scrollIntoView({
              behavior: 'smooth'
            });
          }, 100);
        });
      });
            
      overlay.querySelector('.mobile-menu-close').addEventListener('click', () => {
        overlay.remove();
        document.body.style.overflow = '';
      });
    });
  }

  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
             
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();
           
      if (!name || !email || !subject || !message) {
        showNotification('Mohon lengkapi semua field!', 'error');
        return;
      }
      
      const mailtoLink = `mailto:delon.pratama@email.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        `Nama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`
      )}`;
      
      window.location.href = mailtoLink;
    });
  }
  
  function showNotification(message, type = 'success') {    
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        ${type === 'success' 
          ? '<polyline points="20 6 9 17 4 12"/>'
          : '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>'
        }
      </svg>
      <span>${message}</span>
    `;
         
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: ${type === 'success' ? '#10b981' : '#ef4444'};
      color: white;
      padding: 16px 24px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      gap: 12px;
      font-weight: 500;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
      z-index: 3000;
      animation: slideIn 0.3s ease;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
    `;
    
    if (!document.querySelector('#notification-style')) {
      style.id = 'notification-style';
      document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideIn 0.3s ease reverse';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  const heroImage = document.querySelector('.hero-image');
  
  if (heroImage && window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.3;
      
      heroImage.style.transform = `translateY(${rate}px)`;
    });
  }
  
  const preloader = document.createElement('div');
  preloader.className = 'preloader';
  preloader.innerHTML = `
    <div class="preloader-content">
      <svg width="60" height="60" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="8" fill="#6366f1"/>
        <path d="M8 12h16M8 16h12M8 20h8" stroke="white" stroke-width="2" stroke-linecap="round"/>
      </svg>
      <span>Delon.</span>
    </div>
  `;
  
  preloader.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #0f172a;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.5s ease, visibility 0.5s ease;
  `;
  
  const preloaderStyle = document.createElement('style');
  preloaderStyle.textContent = `
    .preloader-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      animation: pulse 2s infinite;
    }
    .preloader-content span {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 24px;
      font-weight: 800;
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.8; transform: scale(0.95); }
    }
  `;
  
  document.head.appendChild(preloaderStyle);
  document.body.appendChild(preloader);
  document.body.style.overflow = 'hidden';
  
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.style.opacity = '0';
      preloader.style.visibility = 'hidden';
      document.body.style.overflow = '';
      
      setTimeout(() => {
        preloader.remove();
      }, 500);
    }, 1000);
  });

  if (window.innerWidth > 1024) {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
      width: 20px;
      height: 20px;
      border: 2px solid #6366f1;
      border-radius: 50%;
      position: fixed;
      pointer-events: none;
      z-index: 9998;
      transition: transform 0.15s ease, opacity 0.15s ease;
      mix-blend-mode: difference;
    `;
    
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    cursorDot.style.cssText = `
      width: 6px;
      height: 6px;
      background: #6366f1;
      border-radius: 50%;
      position: fixed;
      pointer-events: none;
      z-index: 9999;
      transition: transform 0.05s ease;
    `;
    
    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
        
    function animateCursor() {       
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;
      
      dotX += (mouseX - dotX) * 0.3;
      dotY += (mouseY - dotY) * 0.3;
      
      cursor.style.left = cursorX - 10 + 'px';
      cursor.style.top = cursorY - 10 + 'px';
      
      cursorDot.style.left = dotX - 3 + 'px';
      cursorDot.style.top = dotY - 3 + 'px';
      
      requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    const interactiveElements = document.querySelectorAll('a, button, .skill-card, .portfolio-card');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
        cursor.style.borderColor = '#10b981';
      });
      
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.borderColor = '#6366f1';
      });
    });
  }

  console.log('%c Portofolio Delon Pratama ', 'background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 10px;');
  console.log('%c Dibuat untuk pendaftaran SMK TKJ ', 'color: #6366f1; font-size: 14px;');
});
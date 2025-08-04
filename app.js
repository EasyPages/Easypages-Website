document.addEventListener('DOMContentLoaded', function() {

  // 1. Scroll Animations (runs on all pages)
  const animatedElements = document.querySelectorAll('.fade-in-section');
  if (animatedElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    animatedElements.forEach(element => {
      observer.observe(element);
    });
  }

  // 2. Image Modal (runs on pages with galleries)
  const modal = document.getElementById('imageModal');
  if (modal) {
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.close-button');
    const galleryImages = document.querySelectorAll('.project-image-gallery img, .gallery-grid img, .collage-grid img');

    galleryImages.forEach(img => {
      img.addEventListener('click', function() {
        modal.classList.add('active');
        modalImg.src = this.src;
      });
    });

    function closeModal() {
      modal.classList.remove('active');
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }
    
    modal.addEventListener('click', function(event) {
      if (event.target === modal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  // 3. Contact Form (runs only on the contact page)
  const form = document.getElementById('contact-form');
  if (form) {
    const status = document.getElementById('form-status');
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      const data = new FormData(form);
      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          form.reset();
          status.className = 'success';
          // Use .innerHTML to add a clickable link
          status.innerHTML = '✅ Your message has been sent successfully! <br><br> <a href="https://g.page/r/CYRtDY_TGG-jEAE/review" target="_blank" style="color: #ffe600; text-decoration: underline;">Please consider leaving us a review!</a>';
        } else {
          throw new Error('Network response was not ok.');
        }
      } catch (error) {
        status.className = 'error';
        status.textContent = '❌ Submission failed. Please try again later.';
      } finally {
        status.style.display = 'block';
        setTimeout(() => {
          status.style.display = 'none';
        }, 5000);
      }
    });
  }

});
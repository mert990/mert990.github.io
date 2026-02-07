(function () {
  'use strict';

  // Mobile nav toggle
  var nav = document.querySelector('.nav');
  var toggle = document.querySelector('.nav-toggle');
  if (nav && toggle) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen);
    });
    document.addEventListener('click', function (e) {
      if (nav.classList.contains('is-open') && !nav.contains(e.target) && e.target !== toggle) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Contact form: Formspree ile info@alliancevize.com adresine mail gider
  var form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var text = btn.textContent;
      var replytoInput = document.getElementById('form-replyto');
      if (replytoInput) replytoInput.value = form.querySelector('input[name="email"]').value;

      btn.textContent = 'Gönderiliyor…';
      btn.disabled = true;

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      })
        .then(function (res) {
          if (res.ok) {
            btn.textContent = 'Mesaj gönderildi';
            form.reset();
          } else {
            btn.textContent = 'Bir hata oluştu, tekrar deneyin';
          }
        })
        .catch(function () {
          btn.textContent = 'Bağlantı hatası, tekrar deneyin';
        })
        .finally(function () {
          btn.disabled = false;
          setTimeout(function () { btn.textContent = text; }, 3000);
        });
    });
  }
})();

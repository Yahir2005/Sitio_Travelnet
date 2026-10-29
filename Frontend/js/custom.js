/**
 * TRAVELNET - Scripts de interactividad y animaciones
 */

$(document).ready(function () {
  'use strict';

  // 1. Animación suave de bajada / subida al hacer click en los enlaces del navbar
  $('a.js-scroll-trigger[href*="#"]:not([href="#"]), .info-nav a[href*="#"]:not([href="#"]), a.scroll-down-link').on('click', function (e) {
    if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      
      if (target.length) {
        e.preventDefault();
        
        // Calcular altura dinámica del navbar
        var navbarHeight = $('.header_section').outerHeight() || 75;
        var targetOffset = target.offset().top - navbarHeight + 2;

        // Cerrar menú móvil si está abierto
        if ($('.navbar-collapse').hasClass('show')) {
          $('.navbar-collapse').collapse('hide');
        }

        // Animación suave de bajada con easing
        $('html, body').stop().animate({
          scrollTop: Math.max(0, targetOffset)
        }, 850, 'swing', function () {
          // Efecto de foco sutil en la sección destino
          target.addClass('section-focused');
          setTimeout(function () {
            target.removeClass('section-focused');
          }, 1400);
        });

        // Actualizar clase activa en el navbar
        $('.navbar-nav .nav-item').removeClass('active');
        $(this).closest('.nav-item').addClass('active');

        // Actualizar URL hash sin salto brusco
        if (history.pushState) {
          history.pushState(null, null, target.selector);
        }
      }
    }
  });

  // 2. Control de Navbar sticky y botón Volver Arriba al hacer scroll
  $(window).on('scroll', function () {
    var scrollPosition = $(window).scrollTop();
    var navbarHeight = $('.header_section').outerHeight() || 75;

    // Sombra y estilo del navbar al scrollear
    if (scrollPosition > 50) {
      $('.header_section').addClass('scrolled');
      $('#back-to-top').addClass('visible');
    } else {
      $('.header_section').removeClass('scrolled');
      $('#back-to-top').removeClass('visible');
    }

    // ScrollSpy: Detectar sección en pantalla y actualizar nav-link activo
    $('section[id], div[id].map-container').each(function () {
      var top = $(this).offset().top - navbarHeight - 40;
      var bottom = top + $(this).outerHeight();
      var id = $(this).attr('id');

      if (scrollPosition >= top && scrollPosition < bottom) {
        $('.navbar-nav .nav-item').removeClass('active');
        $('.navbar-nav .nav-item a[href="#' + id + '"]').closest('.nav-item').addClass('active');
      }
    });
  });

  // 3. Botón flotante Volver Arriba
  $('#back-to-top').on('click', function (e) {
    e.preventDefault();
    $('html, body').stop().animate({
      scrollTop: 0
    }, 800, 'swing');
  });

  // 4. Animaciones al entrar en pantalla (IntersectionObserver)
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -30px 0px'
    });

    document.querySelectorAll('.animate-on-scroll').forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Si el navegador no soporta IntersectionObserver, mostrar directamente
    $('.animate-on-scroll').addClass('is-visible');
  }
});

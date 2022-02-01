(function ($) {
    'use strict';



    // Sticky Menu
    $(window).scroll(function () {
        if ($('.navigation').offset().top > 100) {
            $('.navigation').addClass('nav-bg');
        } else {
            $('.navigation').removeClass('nav-bg');
        }
    });

    // Background-images
    $('[data-background]').each(function () {
        $(this).css({
            'background-image': 'url(' + $(this).data('background') + ')'
        });
    });

    // background color
    $('[data-color]').each(function () {
        $(this).css({
            'background-color': $(this).data('color')
        });
    });

    // progress bar
    $('[data-progress]').each(function () {
        $(this).css({
            'bottom': $(this).data('progress')
        });
    });


    /* ########################################### parallax ############################################## */
    window.onload = function () {

        var parallaxBox = document.getElementById('parallax');
        var
            /* c1left = document.getElementById('l1').offsetLeft,
                       c1top = document.getElementById('l1').offsetTop, */
            c2left = document.getElementById('l2').offsetLeft,
            c2top = document.getElementById('l2').offsetTop,
            c3left = document.getElementById('l3').offsetLeft,
            c3top = document.getElementById('l3').offsetTop,
            c4left = document.getElementById('l4').offsetLeft,
            c4top = document.getElementById('l4').offsetTop,
            c5left = document.getElementById('l5').offsetLeft,
            c5top = document.getElementById('l5').offsetTop,
            c6left = document.getElementById('l6').offsetLeft,
            c6top = document.getElementById('l6').offsetTop,
            c7left = document.getElementById('l7').offsetLeft,
            c7top = document.getElementById('l7').offsetTop,
            c8left = document.getElementById('l8').offsetLeft,
            c8top = document.getElementById('l8').offsetTop,
            c9left = document.getElementById('l9').offsetLeft,
            c9top = document.getElementById('l9').offsetTop;

        parallaxBox.onmousemove = function (event) {
            event = event || window.event;
            var x = event.clientX - parallaxBox.offsetLeft,
                y = event.clientY - parallaxBox.offsetTop;

            /*  mouseParallax('l1', c1left, c1top, x, y, 5); */
            mouseParallax('l2', c2left, c2top, x, y, 25);
            mouseParallax('l3', c3left, c3top, x, y, 20);
            mouseParallax('l4', c4left, c4top, x, y, 35);
            mouseParallax('l5', c5left, c5top, x, y, 30);
            mouseParallax('l6', c6left, c6top, x, y, 45);
            mouseParallax('l7', c7left, c7top, x, y, 30);
            mouseParallax('l8', c8left, c8top, x, y, 25);
            mouseParallax('l9', c9left, c9top, x, y, 40);
        };

    };

    function mouseParallax(id, left, top, mouseX, mouseY, speed) {
        var obj = document.getElementById(id);
        var parentObj = obj.parentNode,
            containerWidth = parseInt(parentObj.offsetWidth),
            containerHeight = parseInt(parentObj.offsetHeight);
        obj.style.left = left - (((mouseX - (parseInt(obj.offsetWidth) / 2 + left)) / containerWidth) * speed) + 'px';
        obj.style.top = top - (((mouseY - (parseInt(obj.offsetHeight) / 2 + top)) / containerHeight) * speed) + 'px';
    }
    /* ########################################### parallax ############################################## */

    // testimonial-slider
    $('.testimonial-slider').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        arrows: false,
        adaptiveHeight: true
    });

    // profile gallery slider

    $('.profile-gallery-slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        dots: true,
        arrows: false
    });

    // clients logo slider
    $('.client-logo-slider').slick({
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        dots: false,
        arrows: false,
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    // Shuffle js filter and masonry
    'use strict';

    var Shuffle = window.Shuffle;
    
    var Demo = function (element) {
      this.shapes = Array.from(document.querySelectorAll('.js-shapes input'));
      this.colors = Array.from(document.querySelectorAll('.js-colors button'));
    
      this.shuffle = new Shuffle(element, {
        easing: 'cubic-bezier(0.165, 0.840, 0.440, 1.000)', // easeOutQuart
        sizer: '.the-sizer',
      });
    
      this.filters = {
        shapes: [],
        colors: [],
      };
    
      this._bindEventListeners();
    };
    
    /**
     * Bind event listeners for when the filters change.
     */
    Demo.prototype._bindEventListeners = function () {
      this._onShapeChange = this._handleShapeChange.bind(this);
      this._onColorChange = this._handleColorChange.bind(this);
    
      this.shapes.forEach(function (input) {
        input.addEventListener('change', this._onShapeChange);
      }, this);
    
      this.colors.forEach(function (button) {
        button.addEventListener('click', this._onColorChange);
      }, this);
    };
    
    /**
     * Get the values of each checked input.
     * @return {Array.<string>}
     */
    Demo.prototype._getCurrentShapeFilters = function () {
      return this.shapes.filter(function (input) {
        return input.checked;
      }).map(function (input) {
        return input.value;
      });
    };
    
    /**
     * Get the values of each `active` button.
     * @return {Array.<string>}
     */
    Demo.prototype._getCurrentColorFilters = function () {
      return this.colors.filter(function (button) {
        return button.classList.contains('active');
      }).map(function (button) {
        return button.getAttribute('data-value');
      });
    };
    
    /**
     * A shape input check state changed, update the current filters and filte.r
     */
    Demo.prototype._handleShapeChange = function () {
      this.filters.shapes = this._getCurrentShapeFilters();
      this.filter();
    };
    
    /**
     * A color button was clicked. Update filters and display.
     * @param {Event} evt Click event object.
     */
    Demo.prototype._handleColorChange = function (evt) {
      var button = evt.currentTarget;
    
      // Treat these buttons like radio buttons where only 1 can be selected.
      if (button.classList.contains('active')) {
        button.classList.remove('active');
      } else {
        this.colors.forEach(function (btn) {
          btn.classList.remove('active');
        });
    
        button.classList.add('active');
      }
    
      this.filters.colors = this._getCurrentColorFilters();
      this.filter();
    };
    
    /**
     * Filter shuffle based on the current state of filters.
     */
    Demo.prototype.filter = function () {
      if (this.hasActiveFilters()) {
        this.shuffle.filter(this.itemPassesFilters.bind(this));
      } else {
        this.shuffle.filter(Shuffle.ALL_ITEMS);
      }
    };
    
    /**
     * If any of the arrays in the `filters` property have a length of more than zero,
     * that means there is an active filter.
     * @return {boolean}
     */
    Demo.prototype.hasActiveFilters = function () {
      return Object.keys(this.filters).some(function (key) {
        return this.filters[key].length > 0;
      }, this);
    };
    
    /**
     * Determine whether an element passes the current filters.
     * @param {Element} element Element to test.
     * @return {boolean} Whether it satisfies all current filters.
     */
    Demo.prototype.itemPassesFilters = function (element) {
      var shapes = this.filters.shapes;
      var colors = this.filters.colors;
      var shape = element.getAttribute('data-shape');
      var color = element.getAttribute('data-color');
    
      // If there are active shape filters and this shape is not in that array.
      if (shapes.length > 0 && !shapes.includes(shape)) {
        return false;
      }
    
      // If there are active color filters and this color is not in that array.
      if (colors.length > 0 && !colors.includes(color)) {
        return false;
      }
    
      return true;
    };
    
    document.addEventListener('DOMContentLoaded', function () {
      window.demo = new Demo(document.querySelector('.js-shuffle'));
    });



})(jQuery);
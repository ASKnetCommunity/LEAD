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


    var Shuffle = window.Shuffle;

    class Demo {
        constructor(element) {
            this.element = element;
            this.countries = Array.from(document.querySelectorAll('.filter-country button'));
            this.shuffle = new Shuffle(element, {
                itemSelector: '.picture-item',
                sizer: element.querySelector('.my-sizer-element'),
            });

            // Log events.
            this.addShuffleEventListeners();
            this.filters = {
                countries: [],
                regions: [],
            };
            this.addCountryButtons();
            this.addRegionButtons();
            this.addSorting();
            this.addSearchFilter();
        }

        /**
         * Shuffle uses the CustomEvent constructor to dispatch events. You can listen
         * for them like you normally would (with jQuery for example).
         */
        addShuffleEventListeners() {
            this.shuffle.on(Shuffle.EventType.LAYOUT, (data) => {
                console.log('layout. data:', data);
            });
            this.shuffle.on(Shuffle.EventType.REMOVED, (data) => {
                console.log('removed. data:', data);
            });
        }

        addCountryButtons() {
            const options = document.querySelector('.filter-country');
            if (!options) {
                return;
            }

            const filterButtons = Array.from(options.children);
            const onClick = this._handleFilterClick.bind(this);
            filterButtons.forEach((button) => {
                button.addEventListener('click', onClick, false);
            });
        }

        addRegionButtons() {
            const options = document.querySelector('.filter-region');
            if (!options) {
                return;
            }

            const filterButtons = Array.from(options.children);
            const onClick = this._handleFilterClick.bind(this);
            filterButtons.forEach((button) => {
                button.addEventListener('click', onClick, false);
            });
        }

        _getCurrentCountryFilters = function () {
            return this.countries.filter(function (button) {
                return button.classList.contains('active');
            }).map(function (button) {
                return button.getAttribute('data-country');
            });
        };


        _handleFilterClick(evt) {
            const btn = evt.currentTarget;
            const isActive = btn.classList.contains('active');
            const btnGroup = btn.getAttribute('data-country');

            this._removeActiveClassFromChildren(btn.parentNode);

            let filterGroup;
            if (isActive) {
                btn.classList.remove('active');
                filterGroup = Shuffle.ALL_ITEMS;
            } else {
                btn.classList.add('active');
                filterGroup = btnGroup;
                console.log('filterGroup: ' + filterGroup);
            }

            this.filters.countries = this._getCurrentCountryFilters();
            console.log('this.filters.countries: ' + this.filters.countries);
            this.filter();
            console.log('-------------------------');
        }


        /**
         * Filter shuffle based on the current state of filters.
         */
        filter = function () {
            console.log('function filter()');
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
        hasActiveFilters = function () {
            return Object.keys(this.filters).some(function (key) {
                return this.filters[key].length > 0;
            }, this);
        };

        /**
         * Determine whether an element passes the current filters.
         * @param {Element} element Element to test.
         * @return {boolean} Whether it satisfies all current filters.
         */
        itemPassesFilters = function (element) {
            var countries = this.filters.countries;
            var regions = this.filters.regions;
            var country = JSON.parse(element.getAttribute('data-countries'));
                console.log('item country: ' + country.toString());
            var region = element.getAttribute('data-regions');

            // If there are active shape filters and this shape is not in that array.
                console.log('filter countries: ' + countries + typeof country);
                console.log('countries.includes(country): ' + countries.includes(country) + '\n \n');
            if (countries.length > 0 && !countries.includes(country)) {
                return false;
            }

            // If there are active color filters and this color is not in that array.
            if (regions.length > 0 && !regions.includes(region)) {
                return false;
            }

            return true;
        };


        _removeActiveClassFromChildren(parent) {
            const { children } = parent;
            for (let i = children.length - 1; i >= 0; i--) {
                children[i].classList.remove('active');
            }
        }

        addSorting() {
            const buttonGroup = document.querySelector('.sort-options');
            if (!buttonGroup) {
                return;
            }
            buttonGroup.addEventListener('change', this._handleSortChange.bind(this));
        }

        _handleSortChange(evt) {
            // Add and remove `active` class from buttons.
            const buttons = Array.from(evt.currentTarget.children);
            buttons.forEach((button) => {
                if (button.querySelector('input').value === evt.target.value) {
                    button.classList.add('active');
                } else {
                    button.classList.remove('active');
                }
            });

            // Create the sort options to give to Shuffle.
            const { value } = evt.target;
            let options = {};

            function sortByDate(element) {
                return element.getAttribute('data-created');
            }

            function sortByTitle(element) {
                return element.getAttribute('data-title').toLowerCase();
            }

            if (value === 'date-created') {
                options = {
                    reverse: true,
                    by: sortByDate,
                };
            } else if (value === 'title') {
                options = {
                    by: sortByTitle,
                };
            }
            this.shuffle.sort(options);
        }

        // Advanced filtering
        addSearchFilter() {
            const searchInput = document.querySelector('.js-shuffle-search');
            if (!searchInput) {
                return;
            }
            searchInput.addEventListener('keyup', this._handleSearchKeyup.bind(this));
        }

        /**
         * Filter the shuffle instance by items with a title that matches the search input.
         * @param {Event} evt Event object.
         */
        _handleSearchKeyup(evt) {
            const searchText = evt.target.value.toLowerCase();
            this.shuffle.filter((element, shuffle) => {
                // If there is a current filter applied, ignore elements that don't match it.
                if (shuffle.group !== Shuffle.ALL_ITEMS) {
                    // Get the item's groups.
                    const groups = JSON.parse(element.getAttribute('data-countries'));
                    const isElementInCurrentGroup = groups.indexOf(shuffle.group) !== -1;
                    // Only search elements in the current group
                    if (!isElementInCurrentGroup) {
                        return false;
                    }
                }
                const titleElement = element.querySelector('.picture-item__title');
                const titleText = titleElement.textContent.toLowerCase().trim();
                return titleText.indexOf(searchText) !== -1;
            });
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        window.demo = new Demo(document.getElementById('grid'));
    });



})(jQuery);
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
    // window.onload = function () {

    //     var parallaxBox = document.getElementById('parallax');
    //     var
    //         /* c1left = document.getElementById('l1').offsetLeft,
    //                    c1top = document.getElementById('l1').offsetTop, */
    //         c2left = document.getElementById('l2').offsetLeft,
    //         c2top = document.getElementById('l2').offsetTop,
    //         c3left = document.getElementById('l3').offsetLeft,
    //         c3top = document.getElementById('l3').offsetTop,
    //         c4left = document.getElementById('l4').offsetLeft,
    //         c4top = document.getElementById('l4').offsetTop,
    //         c5left = document.getElementById('l5').offsetLeft,
    //         c5top = document.getElementById('l5').offsetTop,
    //         c6left = document.getElementById('l6').offsetLeft,
    //         c6top = document.getElementById('l6').offsetTop,
    //         c7left = document.getElementById('l7').offsetLeft,
    //         c7top = document.getElementById('l7').offsetTop,
    //         c8left = document.getElementById('l8').offsetLeft,
    //         c8top = document.getElementById('l8').offsetTop,
    //         c9left = document.getElementById('l9').offsetLeft,
    //         c9top = document.getElementById('l9').offsetTop;

    //     parallaxBox.onmousemove = function (event) {
    //         event = event || window.event;
    //         var x = event.clientX - parallaxBox.offsetLeft,
    //             y = event.clientY - parallaxBox.offsetTop;

    //         /*  mouseParallax('l1', c1left, c1top, x, y, 5); */
    //         mouseParallax('l2', c2left, c2top, x, y, 25);
    //         mouseParallax('l3', c3left, c3top, x, y, 20);
    //         mouseParallax('l4', c4left, c4top, x, y, 35);
    //         mouseParallax('l5', c5left, c5top, x, y, 30);
    //         mouseParallax('l6', c6left, c6top, x, y, 45);
    //         mouseParallax('l7', c7left, c7top, x, y, 30);
    //         mouseParallax('l8', c8left, c8top, x, y, 25);
    //         mouseParallax('l9', c9left, c9top, x, y, 40);
    //     };

    // };

    // function mouseParallax(id, left, top, mouseX, mouseY, speed) {
    //     var obj = document.getElementById(id);
    //     var parentObj = obj.parentNode,
    //         containerWidth = parseInt(parentObj.offsetWidth),
    //         containerHeight = parseInt(parentObj.offsetHeight);
    //     obj.style.left = left - (((mouseX - (parseInt(obj.offsetWidth) / 2 + left)) / containerWidth) * speed) + 'px';
    //     obj.style.top = top - (((mouseY - (parseInt(obj.offsetHeight) / 2 + top)) / containerHeight) * speed) + 'px';
    // }
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
            this.regions = Array.from(document.querySelectorAll('.filter-region button'));
            this.skills = Array.from(document.querySelectorAll('.filter-skill button'));
            this.shuffle = new Shuffle(element, {
                itemSelector: '.profile-item',
                sizer: element.querySelector('.my-sizer-element'),
            });

            // Log events.
            this.addShuffleEventListeners();
            this.filters = {
                countries: [],
                regions: [],
                skills: [],
            };
            this._bindEventListeners();

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

        /**
         * Bind event listeners for when the filters change.
         */
        _bindEventListeners = function () {
            this._onCountryChange = this._handleCountryChange.bind(this);
            this._onRegionChange = this._handleRegionChange.bind(this);
            this._onSkillChange = this._handleSkillChange.bind(this);

            this.countries.forEach(function (button) {
                button.addEventListener('click', this._onCountryChange);
            }, this);

            this.regions.forEach(function (button) {
                button.addEventListener('click', this._onRegionChange);
            }, this);

            this.skills.forEach(function (button) {
                button.addEventListener('click', this._onSkillChange);
            }, this);
        };


        /**
         * Get the values of each `active` button.
         * @return {Array.<string>}
         */
        _getCurrentCountryFilters = function () {
            return this.countries.filter(function (button) {
                return button.classList.contains('active');
            }).map(function (button) {
                return button.getAttribute('data-country');
            });
        };

        _getCurrentRegionFilters = function () {
            return this.regions.filter(function (button) {
                return button.classList.contains('active');
            }).map(function (button) {
                return button.getAttribute('data-region');
            });
        };

        _getCurrentSkillFilters = function () {
            return this.skills.filter(function (button) {
                return button.classList.contains('active');
            }).map(function (button) {
                return button.getAttribute('data-skill');
            });
        };




        /**
         * A country button was clicked. Update filters and display.
         * @param {Event} evt Click event object.
         */
        _handleCountryChange = function (evt) {
            var button = evt.currentTarget;

            // Treat these buttons like radio buttons where only 1 can be selected.
            if (button.classList.contains('active')) {
                button.classList.remove('active');
            } else {
                this.countries.forEach(function (btn) {
                    btn.classList.remove('active');
                });

                button.classList.add('active');
            }

            this.filters.countries = this._getCurrentCountryFilters();
            this.filter();
        };


        /**
         * A region  state changed, update the current filters and filte.r
         */
         _handleRegionChange = function (evt) {
            var button = evt.currentTarget;

            if (button.classList.contains('active')) {
                button.classList.remove('active');
            } else {
                button.classList.add('active');
            }

            this.filters.regions = this._getCurrentRegionFilters();
            this.filter();
        };


        /**
         * A skill  state changed, update the current filters and filte.r
         */
         _handleSkillChange = function (evt) {
            var button = evt.currentTarget;

            if (button.classList.contains('active')) {
                button.classList.remove('active');
            } else {
                button.classList.add('active');
            }

            this.filters.skills = this._getCurrentSkillFilters();
            this.filter();
        };



        /**
         * Filter shuffle based on the current state of filters.
         */
        filter = function () {
            console.log('function filter()\n this.hasActiveFilters():', this.hasActiveFilters(), '\n this.filters: ', this.filters);
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
            // extending the prototype of the Array,
            // with a named method/function:
            Array.prototype.commonElements = function (arr2) {

                // iterating over the 'this' array:
                return this.some(function (el) {

                    // looks for the array-value
                    // represented by 'el', and
                    // comparing the returned index
                    // to see if it's greater than
                    // -1 (and so is found in 'this' array):
                    return arr2.indexOf(el) > -1;
                });
            }

            var countries = this.filters.countries;
            var regions = this.filters.regions;
            var skills = this.filters.skills;
            var country = JSON.parse(element.getAttribute('data-countries'));
            var region = JSON.parse(element.getAttribute('data-regions'));
            var skill = JSON.parse(element.getAttribute('data-skills'));
                console.log('-- item-skills: ', skill);
            
            // does country filter array contain at least one match with item countries array?
            if (countries.commonElements(country)) {
                return true;
            }

            // does region filter array contain at least one match with item regions array?
            if (regions.commonElements(region)) {
                return true;
            }

            // does skill filter array contain at least one match with item skills array?
            if (skills.commonElements(skill)) {
                return true;
            }

            return false;
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
                const titleElement = element.querySelector('.profile-item__name');
                const titleText = titleElement.textContent.toLowerCase().trim();
                return titleText.indexOf(searchText) !== -1;
            });
        }
    }

    document.addEventListener('DOMContentLoaded', function () {
        window.demo = new Demo(document.querySelector('.my-shuffle-container'));
    });



})(jQuery);
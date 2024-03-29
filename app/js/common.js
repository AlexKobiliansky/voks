$(document).ready(function() {



    /**
     * mobile-mnu customization
     */
    var mmenu = $('#mobile-mnu');
    var menuLogo = mmenu.data("logo");
    var $mmenu = mmenu.mmenu({
        navbars: [{
            content: [ "<img src=" + menuLogo + " class=\"img-responsive mm-logo\" alt=\"alt\"/>" ],
            height: 3
        }],
        "pageScroll": true,

        "navbar": {
            "title" : "",
        },
        "extensions": [
            "theme-dark",
            "pagedim-black",
            "position-front",
            "fx-listitems-slide",
        ],
    }, {
        offCanvas: {
            pageSelector: "#page-container"
        },
    });

    var mmenuBtn = $("#mmenu-btn");
    var API = $mmenu.data("mmenu");

    mmenuBtn.click(function() {
        API.open();
        $(this).addClass('is-active')
    });


    API.bind( "close:start", function() {
        setTimeout(function() {
            mmenuBtn.removeClass( "is-active" );
        }, 300);
    });
    /**
     * end mobile-mnu customization
     */

    $(".main-mnu a").mPageScroll2id();

    $('img.svg').each(function(){
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
            if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }

            // Replace image with new SVG
            $img.replaceWith($svg);
        }, 'xml');
    });


    $( ".any-content" ).tabs();

    $('.key-tabs-controls.top li:first-child').addClass('active');
    $('.key-item:first-child').addClass('active');

    $('.key-tabs-container').each(function(){                             // Находим список вкладок
        var $this = $(this);                                      // Сохраняем этот список
        var $tab = $this.find('li.active');                       // Получаем активный элемент списка
        var $link = $tab.find('a');                               // Получаем ссылку из активной вкладки
        var $panel = $($link.attr('href'));                       // Получаем активную панель

        $this.on('click', '.key-control', function(e) {           // При щелчке по вкладке
            e.preventDefault();                                       // Отменяем действие ссылки
            var $link = $(this);                                      // Сохраняем текущую ссылку
            var id = this.hash;                                       // Получаем href нажатой вкладки

            if (id && !$link.is('.active')) {                         // Если уже не активны
                $panel.removeClass('active');                           // Деактивируем панель
                $tab.removeClass('active');                             // Деактивируем вкладку

                $panel = $(id).addClass('active');                      // Делаем новую панель активной
                $tab = $link.parent().addClass('active');               // Делаем новую вкладку активной
            }
        });
    });



    $('.objects-slider').owlCarousel({
        loop:true,
        nav: true,
        items: 1,
        margin: 15,
        dots: false,
        autoHeight: false,
        navText: ["",""],
    });

    $('.changes-slider').owlCarousel({
        loop:true,
        nav: true,
        items: 1,
        margin: 15,
        autoHeight: false,
        navText: ["",""],
        responsive: {
            0: {
                dots: true
            },
            480: {
                dots:false
            }
        }
    });



    $('.intro-slider').owlCarousel({
        loop:true,
        nav:false,
        items: 1,
        thumbs: true,
        thumbsPrerendered: true,
        thumbItemClass: 'nav-item',
        animateIn: "fadeIn",
        animateOut: "fadeOut",
        responsive: {
            0: {
                dots: true,
                margin: 15,
                mouseDrag: true,
                nav: false
            },
            768: {
                dots: false,
                margin: 0,
                mouseDrag: false,
                nav: false
            }
        }
    });

    $('.team-slider').each(function(){
        $(this).owlCarousel({
            loop:true,
            nav: false,
            items: 4,
            margin: 30,
            dots: true,
            autoHeight: false,
            navText: ["",""],
            responsive: {
                0: {
                    items: 1
                },
                480: {
                    items: 2
                },
                992: {
                    items: 3
                },
                1200: {
                    items: 4
                }
            }
        });
    });

    $('.any-slider').each(function(){
        $(this).owlCarousel({
            loop:true,
            nav: true,
            items: 1,
            margin: 15,
            dots: false,
            autoHeight: true,
            navText: ["",""]
        });
    });



    $('.any-slider').photoswipe();
    $('.object-item-img').photoswipe();
    $('.change-item-img').photoswipe();
















    /**
     * YOUTUBE SCRIPT
     */
    var tag = document.createElement('script');
    tag.src = "//www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var vp;

    // var $videoID = 'yu5TPBX8290';
    var $playerID = 'videoPlayer-0';

    onYouTubeIframeAPIReady = function () {



        $("a[href='#video-popup']").on('click', function(){

            console.log('its working!');

            var $videoID = $(this).data("video");


            vp = new YT.Player($playerID, {
                videoId: $videoID,
                playerVars: {
                    'autoplay': 1,
                    'rel': 0,
                    'showinfo': 0
                },
                events: {
                    'onStateChange': onPlayerStateChange
                }
            });
        });
    };




    onPlayerStateChange = function (event) {
        if (event.data == YT.PlayerState.ENDED) {
            console.log('ended');
            $.magnificPopup.close();
        }
    };







    /**
     * end YOUTUBE SCRIPT
     */




    $(function () {
        $("a[href='#video-popup']").magnificPopup({
            type: "inline",
            fixedContentPos: !1,
            fixedBgPos: !0,
            overflowY: "auto",
            closeBtnInside: !0,
            preloader: !1,
            midClick: !0,
            removalDelay: 300,
            mainClass: "popup-zoom-in",

            callbacks: {
                close: function(){
                   console.log('closed');
                    vp.stopVideo();
                    vp.destroy();
                }
            }



        })
    });

















    function heightses() {
        if ($(window).width()<480) {
            $('.any-control-desc').matchHeight();
        }

        if ($(window).width()>=480) {
            $('.project-item-title').height('auto').equalHeights();
            $('.project-item-desc').height('auto').equalHeights();
            $('.team-item-surname').height('auto').equalHeights();
            $('.team-item-name').height('auto').equalHeights();
            $('.team-item-post').height('auto').equalHeights();
        }

        $('.key-control-desc').height('auto').equalHeights();


        $('.nav-item-title').matchHeight();
        $('.intro-slide').matchHeight();
    }

    $(window).resize(function() {
        heightses();
    });

    heightses();


    $(function() {
        $("a[href='#popup-form']").magnificPopup({
            type: "inline",
            fixedContentPos: !1,
            fixedBgPos: !0,
            overflowY: "auto",
            closeBtnInside: !0,
            preloader: !1,
            midClick: !0,
            removalDelay: 300,
            mainClass: "my-mfp-zoom-in"
        })
    });

    /**
     * FORMS
     */
    var uPhone = $('.user-phone');
    uPhone.mask("+7 (999) 999-99-99",{autoclear: false});

    uPhone.on('click', function (ele) {
        var needelem = ele.target || event.srcElement;
        needelem.setSelectionRange(4,4);
        needelem.focus();
    });

    $.validate({
        form : '.contact-form',
        scrollToTopOnError: false
    });

    //E-mail Ajax Send
    $("form").submit(function() { //Change
        var th = $(this);
        var t = th.find(".btn").text();
        th.find(".btn").prop("disabled", "disabled").addClass("disabled").text("Отправлено!");

        $.ajax({
            type: "POST",
            url: "/mail.php", //Change
            data: th.serialize()
        }).done(function() {
            setTimeout(function() {
                th.find(".btn").removeAttr('disabled').removeClass("disabled").text(t);
                th.trigger("reset");
                $.magnificPopup.close();
            }, 2000);
        });
        return false;
    });
    /**
     * FORMS end
     */



    /**
     * PARALLAX
     */
    (function() {
        var Parallax, initMap, throttle;

        window.scrollList = [];

        throttle = function(fn, env, time) {
            if (((time + 30) - Date.now()) < 0) {
                fn.call(env);
                return true;
            } else {
                return false;
            }
        };

        Parallax = (function() {
            function Parallax(node) {
                var top;
                this.node = $(node);
                this.listed = this.node.find(' > *');
                this.coef = [0.1, 0.2, 0.3, 0.4, 0.5];
                top = this.node.offset().top;
                this.top = top + parseInt(this.node.data('totop') ? this.node.data('totop') : 0);
                this.bot = top + this.node.height() + parseInt(this.node.data('tobot') ? this.node.data('tobot') : 0);
                this.reverse = this.node.data('reverse') ? true : false;
                this.horizontal = this.node.data('horizontal') ? true : false;
                this.doc = document.documentElement;
                this.init();
            }

            Parallax.prototype.init = function() {
                if (this.reverse) {
                    if (!this.horizontal) {
                        return window.scrollList.push([this.rscroll, this]);
                    } else {
                        return window.scrollList.push([this.hrscroll, this]);
                    }
                } else {
                    if (!this.horizontal) {
                        return window.scrollList.push([this.scroll, this]);
                    } else {
                        return window.scrollList.push([this.hscroll, this]);
                    }
                }
            };

            Parallax.prototype.scroll = function() {
                var P, rbot, rtop, top, wh;
                P = this;
                top = (window.pageYOffset || this.doc.scrollTop) + (this.doc.clientTop || 0);
                wh = window.innerHeight;
                rtop = this.top - wh;
                rbot = this.bot;
                if (top > rtop && top < rbot) {
                    return this.listed.each(function(index, o) {
                        var mt, obj;
                        obj = $(o);
                        mt = parseInt((P.top - top) * P.coef[index]);
                        return obj.css('margin-top', mt + 'px');
                    });
                }
            };

            Parallax.prototype.rscroll = function() {
                var P, rbot, rtop, top, wh;
                P = this;
                top = (window.pageYOffset || this.doc.scrollTop) + (this.doc.clientTop || 0);
                wh = window.innerHeight;
                rtop = this.top - wh;
                rbot = this.bot;
                if (top > rtop && top < rbot) {
                    return this.listed.each(function(index, o) {
                        var mt, obj;
                        obj = $(o);
                        mt = parseInt((top - P.top) * P.coef[index]);
                        return obj.css('margin-top', mt + 'px');
                    });
                }
            };

            Parallax.prototype.hscroll = function() {
                var P, mt, rbot, rtop, top, wh;
                P = this;
                top = (window.pageYOffset || this.doc.scrollTop) + (this.doc.clientTop || 0);
                wh = window.innerHeight;
                rtop = this.top - wh;
                rbot = this.bot;
                if (top > rtop && top < rbot) {
                    mt = parseInt((this.top - top) * this.coef[2]);
                    return this.node.css('background-position', mt + 'px top');
                }
            };

            Parallax.prototype.hrscroll = function() {
                var P, mt, rbot, rtop, top, wh;
                P = this;
                top = (window.pageYOffset || this.doc.scrollTop) + (this.doc.clientTop || 0);
                wh = window.innerHeight;
                rtop = this.top - wh;
                rbot = this.bot;
                if (top > rtop && top < rbot) {
                    mt = parseInt((top - this.top) * this.coef[2]);
                    return this.node.css('background-position', mt + 'px top');
                }
            };

            return Parallax;
        })();

        $('document').ready(function() {
            var parallaxTime;
            $('[data-node="parallax"]').each(function(index, node) {
                new Parallax(node);
                return true;
            });
            parallaxTime = Date.now();
            $(document).on('scroll', function() {
                var fnwe, j, len, ref, reset;
                reset = false;
                ref = window.scrollList;
                for (j = 0, len = ref.length; j < len; j++) {
                    fnwe = ref[j];
                    if (throttle(fnwe[0], fnwe[1], parallaxTime)) {
                        reset = true;
                    }
                }
                if (reset) {
                    return parallaxTime = Date.now();
                }
            });
            setTimeout(function() {
                return $(document).trigger('scroll');
            }, 100);
        });

    }).call(this);
    /**
     * end PARALLAX
     */

    $('.preloader').fadeOut();

    $(window).scroll(function() {
        if($(this).scrollTop() > 30) {
            $('.main-head').addClass('sticky')
        } else {
            $('.main-head').removeClass('sticky')
        }
    });

});

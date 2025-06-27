// MENU NAVIGASI OTOMATIS
$("#LinkList96").each(function () {
    var k = "<ul id='menu-main-nav'><li><ul class='sub-menu'>";
    $("#LinkList96 li").each(function () {
        var a = $(this).text(),
            o = a.substr(0, 1),
            p = a.substr(1);
        "_" == o
            ? (o = $(this).find("a").attr("href"), k += '<li><a href="' + o + '">' + p + "</a></li>")
            : (o = $(this).find("a").attr("href"), k += '</ul></li><li><a href="' + o + '">' + a + "</a><ul class='sub-menu'>");
    });
    k += "</ul></li></ul>";
    $(this).html(k);
    $("#LinkList96 ul, #LinkList96 li").each(function () {
        if ($(this).html().replace(/\s|&nbsp;/g, "").length == 0) $(this).remove();
    });
});

// TAMBAHAN MENU INTERAKTIF
$(document).ready(function () {
    $("#menu").show();
    $("ul.sub-menu").parent("li").addClass("has-children");
    $("#menu ul li").each(function () {
        $(this).hover(
            function () { $(this).children("ul").slideDown(); },
            function () { $(this).children("ul").hide(); }
        );
    });

    $('#search-icon').on('click', function () {
        $('#nav-search').slideToggle(250);
    });

    // TOMBOL SCROLL KE ATAS
    $(window).scroll(function () {
        if ($(this).scrollTop() > 1000) {
            $('#back-to-top').fadeIn();
        } else {
            $('#back-to-top').fadeOut();
        }
    });

    $('#back-to-top').click(function () {
        $('body,html').animate({ scrollTop: 0 }, 800);
        return false;
    });

    // EFEK GAMBAR SCROLL
    $('body').addClass('img-anime');
    $(window).on('load resize scroll', function () {
        var windowHeight = $(this).height();
        $('.box-image,.bf-thumb,.rcthumb,.PopularPosts img,.home .block-image .thumb a,.tc-thumb a,.related-thumb a,.PopularPosts .item-thumbnail a,.cmm-img').each(function () {
            var animHeight = 0.1 * $(this).height();
            var imgPos = animHeight - windowHeight + $(this).offset().top;
            var scrollTop = $(document).scrollTop();
            if (scrollTop > imgPos) {
                $(this).addClass('img-effect');
            }
        });
    });
});
// === CLEAN SLIDER ===
$('.slider-wrapper .HTML .widget-content').each(function () {
    var cat = $(this).find("div").attr("data-label"),
        num = $(this).find("div").attr("data-results"),
        b1 = "recent",
        b2 = "label",
        box = $(this).find("div").attr("class");

    function buildSlider(data) {
        var url = "";
        var featcode = '<div id="featured-slider"><ul class="slides">';
        for (var i = 0; i < data.feed.entry.length; i++) {
            for (var j = 0; j < data.feed.entry[i].link.length; j++) {
                if (data.feed.entry[i].link[j].rel == "alternate") {
                    url = data.feed.entry[i].link[j].href;
                    break;
                }
            }
            var title = data.feed.entry[i].title.$t;
            var author_name = data.feed.entry[i].author[0].name.$t;
            var get_date = data.feed.entry[i].published.$t,
                year = get_date.substring(0, 4),
                month = get_date.substring(5, 7),
                day = get_date.substring(8, 10),
                date = MONTH_FORMAT[parseInt(month, 10)] + ' ' + day + ', ' + year;
            var tag = data.feed.entry[i].category[0].term;
            var content = data.feed.entry[i].content.$t;
            var $content = $('<div>').html(content);
            var image = NO_IMAGE;
            if (content.indexOf("http://www.youtube.com/embed/") > -1 || content.indexOf("https://www.youtube.com/embed/") > -1) {
                image = data.feed.entry[i].media$thumbnail.url;
            } else if (content.indexOf("<img") > -1) {
                image = $content.find('img:first').attr('src');
            }

            featcode += '<li><a class="slider-img" href="' + url + '"><div class="feets" style="background-image:url(' + image + ');"></div></a><div class="slide-cap"><h1 class="post-title"><a href="' + url + '">' + title + '</a></h1><span class="feat-divider"></span><span class="post-date">' + date + '</span></div><div class="slide-cap-bg"></div><a href="' + url + '" class="slide-overlay"></a></li>';
        }
        featcode += '</ul><div id="slider-nav"/></div>';
        return featcode;
    }

    if (box.match(b1)) {
        $.ajax({
            url: "/feeds/posts/default?alt=json-in-script&max-results=" + num,
            type: 'get',
            dataType: "jsonp",
            success: function (data) {
                var featcode = buildSlider(data);
                $('.slider-wrapper .HTML .widget-content').each(function () {
                    if ($(this).find("div").attr("class").match("recent")) {
                        $(this).html(featcode);
                        $(this).removeClass('widget-content').addClass('slider-content');
                        $('#featured-slider').flexslider({
                            controlsContainer: '#slider-nav',
                            controlNav: false,
                            pauseOnAction: false,
                            pauseOnHover: true,
                            animation: 'fade',
                            animationSpeed: 1200,
                            slideshowSpeed: 7000,
                            prevText: '',
                            nextText: ''
                        });
                        $(this).find('.rcp-thumb').each(function () {
                            $(this).attr('style', function (i, src) {
                                return src.replace('/default.jpg', '/hqdefault.jpg')
                            }).attr('style', function (i, src) {
                                return src.replace('s72-c', 's1600')
                            });
                        });
                    }
                });
            }
        });
    } else if (box.match(b2)) {
        $.ajax({
            url: "/feeds/posts/default/-/" + cat + "?alt=json-in-script&max-results=" + num,
            type: 'get',
            dataType: "jsonp",
            success: function (data) {
                var featcode = buildSlider(data);
                $('.slider-wrapper .HTML .widget-content').each(function () {
                    if ($(this).find("div").attr("class").match("label")) {
                        $(this).html(featcode);
                        $(this).removeClass('widget-content').addClass('slider-content');
                        $('#featured-slider').flexslider({
                            controlsContainer: '#slider-nav',
                            controlNav: false,
                            pauseOnAction: false,
                            pauseOnHover: true,
                            animation: 'fade',
                            animationSpeed: 1200,
                            slideshowSpeed: 7000,
                            prevText: '',
                            nextText: ''
                        });
                        $(this).find('.rcp-thumb').each(function () {
                            $(this).attr('style', function (i, src) {
                                return src.replace('/default.jpg', '/hqdefault.jpg')
                            }).attr('style', function (i, src) {
                                return src.replace('s72-c', 's1600')
                            });
                        });
                    }
                });
            }
        });
    }
});

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
});

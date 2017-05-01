/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {

    /*
     * Remplace SVG
     */
    jQuery('img.svg').each(function () {
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');
        jQuery.get(imgURL, function (data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');
            // Add replaced image's ID to the new SVG
            if (typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if (typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass + ' replaced-svg');
            }
            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');
            // Replace image with new SVG
            $img.replaceWith($svg);
        }, 'xml');
    });

    /**
     * Carousel
     */
    fitCarousel();
    $(window).resize(function () {
        fitCarousel();
    });
    $('#main-carousel').carousel({
        interval: 1000 * 15
    });

    /*
     * Animations
     */
    //menu
    $('.main-title').fadeIn(800);
    $(".main-title").each(function () {
        $message = $(this).html();
        $(this).empty();
        showText($(this), $message, 0, 50);
    });
    $("#nav li a").hover(
            function () {
                $(this).stop().animate({color: "#1DBBAD"}, 300);
            },
            function () {
                $(this).stop().animate({color: "#000000"}, 300);
            });
    setTimeout(function () {
        $('#icons img').each(function (index, value) {
            $(this).delay(400 * index).slideUp(400).animate({"height": 40}, 400).delay(800).fadeIn(400);
        });
    }, 800);

    $('#icons img').mouseenter(function () {
        if (!$(this).is(':animated')) {
            $(this).effect("shake", {times: 3, distance: 2}, 'slow');
        }
    });
    //boutons
    $('.btn-primary, .plans-offre').mouseenter(function () {
        var img = $(this).find('img');
        if (!img.is(':animated')) {
            img.effect("bounce", {times: 3}, "slow");
        }
    });
    //ancre
    $(document).on('click', 'a', function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top - 100
        }, 500);
    });
    //markers
    min = Math.ceil(25);
    max = Math.floor(75);
    setTimeout(function () {
        $('.marker-map').each(function (index, value) {
            var left = (Math.floor(Math.random() * (max - min + 1)) + min);
            var top = (Math.floor(Math.random() * (max - min + 1)) + min);
            var markerInfo = $(this).attr('data-target');
            $(this).css({
                left: left + '%',
                top: top + '%'
            });
            $('#' + markerInfo).css({
                left: left + '%',
                top: top + '%'
            });
            $(this).delay(400 * index).slideUp(400).delay(400).fadeIn(400);
        });
    }, 2000);

    $('.marker-map').click(function () {
        $(this).fadeOut();
        var markerInfo = $(this).attr('data-target');
        $('#' + markerInfo).fadeIn(400);
        makeFloat($('#' + markerInfo));

    });

    $('.marker-dialog .marker-close img').click(function () {
        $(this).parent().parent().stop(true).fadeOut();
        $('div[data-target="' + $(this).parent().parent().attr('id') + '"]').fadeIn(400);
    });

    $('.marker-dialog .marker-close img').mouseenter(function () {
        $(this).animate({"height": 38, "width": 38}, 100);
    });
    $('.marker-dialog .marker-close img').mouseleave(function () {
        $(this).animate({"height": 35, "width": 35}, 100);
    });

});

function fitCarousel() {
    var height = $(window).height();
    $('#main-carousel').css('height', height + 'px');
}

function showText(target, message, index, interval) {
    if (index < message.length) {
        target.append(message[index++]);
        setTimeout(function () {
            showText(target, message, index, interval);
        }, interval);
    }
}

function makeFloat(element) {
    element.animate({top: '+=20'}, 1000);
    element.animate({top: '-=20'}, 1000);
    makeFloat(element)
}
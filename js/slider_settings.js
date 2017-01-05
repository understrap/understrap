
    jQuery(document).ready(function() {
        var owl = jQuery('.owl-carousel');
        owl.owlCarousel({
            items:1,
            loop:true,
            autoplay:true,
            autoplayTimeout:5000,
            animateOut: 'fadeOut',
            animateIn: 'fadeIn',
            nav: false,
            dots: true,
            autoplayHoverPause:true,
            margin:0,
            autoHeight:true
        });

        jQuery('.play').on('click',function(){
            owl.trigger('autoplay.play.owl',[1000])
        });
        jQuery('.stop').on('click',function(){
            owl.trigger('autoplay.stop.owl')
        });
    });

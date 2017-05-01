$(function() {
	var $menu = $(".header");
    var $menuHeight = $menu.innerHeight;

	//SVG Fallback
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() {
			return $(this).attr("src").replace(".svg", ".png");
		});
	};

	$('.fullpage').fullpage({
		responsive: 1024,
	});

	$(".header_language li.active a").on("click", function(e){

		e.preventDefault();
		$(".header_language").toggleClass("open");
		$(".header_language li:not(.active)").fadeToggle(250);

	});

	$(".video_section .video_play_wrap_in a").on("click", function(){
		$(".video_section .video_wrapper iframe")[0].src += "&autoplay=1";
		$(".video_section .video_wrapper").fadeIn(300);
	});

	$(".header_mobile .menu_open").on("click", function(){
		$(".header_mobile_hidden").fadeIn(300);
	});

	$(".header_mobile .menu_close").on("click", function(){
		$(".header_mobile_hidden").fadeOut(300);
	});

	$(".recepies_header").on("click", function(){
		if(window.innerWidth <= 767){
			$(this).siblings(".info").slideToggle(300);
		}	
	});

	
	$(".gallery_images .image:not(.no_image)").on("click", function(){
        var image = $(this).children("img").data("image");
        var parent = $(this).parent();
        var main_image = parent.siblings(".main_image");
        main_image.find("img").fadeOut(250, function(){
            $(this).attr("src", image).fadeIn(250);
        });
        parent.find(".image").removeClass("active");
        $(this).addClass("active");
    });

    $(".news_header").on("click", function(){
    	if(window.innerWidth <= 767){
			$(this).siblings(".news_text").slideToggle(300);
		}	
    });

});

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
		responsive: 991,
	});

	$(".header_language li.active a").on("click", function(e){

		e.preventDefault();
		$(".header_language").toggleClass("open");
		$(".header_language li:not(.active)").fadeToggle(250);

	});


});

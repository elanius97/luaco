$(function() {
	gmapDiv = $(".map");
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
		afterLoad: function(anchorLink, index){
			//using index
			if(index == 1 && ( window.location.pathname == "/" || window.location.pathname == "/index.html" || window.location.pathname == "/index.php") ){
				$(".header_desktop .discover").css("display", "none");
			}
		},
		onLeave: function(index, nextIndex, direction){
			if(nextIndex != 1 && ( window.location.pathname == "/" || window.location.pathname == "/index.html" || window.location.pathname == "/index.php") ){
				$(".header_desktop .discover").css("display", "inline-block");
			}
			else if(index == 2 && direction == 'up' && ( window.location.pathname == "/" || window.location.pathname == "/index.html" || window.location.pathname == "/index.php") ){
				$(".header_desktop .discover").css("display", "none");
			}

			if (nextIndex != 1) {
				$(".header").addClass("scroll");
				player.playVideo();
			} else if (index == 2) {
				$(".header").removeClass("scroll");
			}
		}
	});


	$(".btn_down").on("click", function(){
		$.fn.fullpage.moveSectionDown();
	});

	$(".header_language li.active a").on("click", function(e){

		e.preventDefault();
		$(".header_language").toggleClass("open");
		$(".header_language li:not(.active)").fadeToggle(250);

	});

	$(".video_section .video_play_wrap_in a").on("click", function(){
		$(".video_section .video_wrapper iframe")[0].src += "&autoplay=1";
		setTimeout(function(){
			$(".video_section .video_wrapper").fadeIn(300)
		}, 250);
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

    if(gmapDiv.length) {
    	$(".map").gmap3({
	    	address:"Unit 747, 7/f, Star house, 3 Salisbury Road, Tsim Sha Kowloon, Hong Kong",
	    	zoom: 10,
	    	mapTypeId: "shadeOfGrey", // to select it directly
	        mapTypeControlOptions: {
	          mapTypeIds: [google.maps.MapTypeId.ROADMAP, "shadeOfGrey"]
	        },
	        mapTypeControl: false,
	        navigationControl: false,
	        scrollwheel: true,
	        streetViewControl: false
	  	})
	  	.styledmaptype(
	        "shadeOfGrey",
	        [
	          {"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},
	          {"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},
	          {"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},
	          {"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},
	          {"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},
	          {"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},
	          {"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},
	          {"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},
	          {"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},
	          {"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},
	          {"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},
	          {"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},
	          {"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}
	        ],
	        {name: "Shades of Grey"}
	  	)
	  	.marker([
	    	{address:"Unit 747, 7/f, Star house, 3 Salisbury Road, Tsim Sha Kowloon, Hong Kong", icon: 'img/map.png'},
		]);
    }

    function getCookie(name) {
		var matches = document.cookie.match(new RegExp(
			"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		))
		return matches ? decodeURIComponent(matches[1]) : undefined
	}

	function setCookie(name, value, props) {
		props = props || {}
		var exp = props.expires
		if (typeof exp == "number" && exp) {
			var d = new Date()
			d.setTime(d.getTime() + exp*1000)
			exp = props.expires = d
		}
		if(exp && exp.toUTCString) { props.expires = exp.toUTCString() }

		value = encodeURIComponent(value)
		var updatedCookie = name + "=" + value
		for(var propName in props){
			updatedCookie += "; " + propName
			var propValue = props[propName]
			if(propValue !== true){ updatedCookie += "=" + propValue }
		}
		document.cookie = updatedCookie

	}

	function deleteCookie(name) {
		setCookie(name, null, { expires: -1 })
	}

	if (getCookie('popupShowed') !== null) {
		var popupShowed = getCookie('popupShowed');
	}


	var magnificPopup = $.magnificPopup.instance; // save instance in magnificPopup variable


	 // Close popup that is currently opened

	if (popupShowed != 'true') {
		magnificPopup.open({
			items: {
				src: '#popup'
			},
			closeOnBgClick: false,
			type: 'inline',
			callbacks: {
				close: function(){
					setCookie('popupShowed', 'true');
				}
			}
		});
	}

	

	function getAge(dateString) {
      var day = parseInt(dateString.substring(0,2));
      var month = parseInt(dateString.substring(3,5));
      var year = parseInt(dateString.substring(6,10));

      var today = new Date();
      var birthDate = new Date(year, month - 1, day); // 'month - 1' т.к. нумерация месяцев начинается с 0 
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) { 
          age--;
      }
      return age;
    }

    $(".popup .discover").on("click", function(){
    	var d = $("#day").val();
		var m = $("#month").val();
		var y = $("#year").val();
		if (y > 0 && y <=17) {
			y = "20" + y;
		} else {
			y = "19" + y;
		}

		var string = d + "." + m + "." + y;

		var age = getAge(string);

		if (age >= 18) {
			magnificPopup.close();
		} else {
			$(".popup .warning").fadeIn(250);
		}
    });

	$(window).on("scroll", function(){
		if(window.innerWidth >= 1200){ 
			if ($(window).scrollTop() > 0) {
				$(".header").addClass("scroll");
			} else {
				$(".header").removeClass("scroll");
			}
		}
	});


});

import $ from 'jquery';
import anime from 'animejs';


let preLoader = (callback) => {
	let loaderSpan = document.querySelector('.pre_loader-s');
	

	let speed = 14;
	let iterations = 0;
	let maxIterations = 55;
    // let maxIterations = 5;
	let deg = 0;

	let animation = setInterval(()=>{

		if(iterations++ < maxIterations/2){
			speed = speed*1.1;
			deg = deg+speed;
		}

		else {
			speed--;
			deg = deg+speed;
		}


		$(loaderSpan).css('transform', 'rotate('+deg+'deg)');

		if(iterations >= maxIterations){
			loaderSpan.style.transform = "rotate(0deg)";

			loaderSpan.style.left = "47px";
			loaderSpan.style.top  = "15px";
			loaderSpan.style.color  = "#444";
			loaderSpan.style.fontSize  = "30px";

			// $('.pre_loader').animate({
			// 		opacity: 0,
			// 	},
			// 	function() {
			//       $( this ).hide();
			//       $('.header__logo').css('border-width', '1px');
			//     }
			// );

            $('.header__logo').css('border-width', '1px');

			let whiteWallOverScreen = anime({
				targets: document.querySelector('.wall__overflow'),
				height: '100%',
                borderBottomWidth: '0px',
				delay: 1000,
				duration: 1000,
				easing: 'linear',
				complete: function(){
                    document.querySelector('.wall__container').style.display = 'none';
                    $('.pre_loader').css('display' , 'none');
				}
			});


			$('.header__logo').animate({
				opacity: 1,
			}, function(){
				setTimeout(function(){
					document.querySelector('.overflowY-hidden').classList.remove('overflowY-hidden');
					$(loaderSpan).addClass('animated wobble');
					callback();
				},1450);
			});
			clearInterval(animation);

		}		
	
	},60)


}


module.exports = preLoader;
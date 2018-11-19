


let conf = {
	wowConf: {
	    boxClass:     'wow',      // animated element css class (default is wow)
	    animateClass: 'animated', // animation css class (default is animated)
	    offset:       0,          // distance to the element when triggering the animation (default is 0)
	    mobile:       false,       // trigger animations on mobile devices (default is true)
	    live:         true,       // act on asynchronously loaded content (default is true)
	    callback:     function(box) {
	      // the callback is fired every time an animation is started
	      // the argument that is passed in is the DOM node being animated
	    },
	    scrollContainer: null,    // optional scroll container selector, otherwise use window,
	    resetAnimation: true,     // reset animation on end (default is true)
	},

	videoFrames: {
		
		dragg: '/images/video-frames/dragg.mp4',
		shooter: '/images/video-frames/shooter.mp4',
		circlesEat: 'frames/circles_eat/index.html',
		bil: 'frames/bil/index.html'

	}
	
} 

module.exports = conf;
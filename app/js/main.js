
import WOW from 'wow.js';
import conf from './conf.js';
import preLoader from './pre_loader.js';
import afterPreLoader from './after_preloader.js';
import fixCss from './fixCss.js';
import works from './works.js';
import ScrollPages from './ScrollPages.js';
import slickSliderInit from './slickSliderInit.js';
import animatiaonsInit from './animatiaonsInit.js';
import pagesCounter from './pagesCounter.js';
import desktopModal from './desktopModal.js';
import mouseCoordinateListener from './mouseCoordinateListener';

let wowConf = new WOW(conf.wowConf);
//
mouseCoordinateListener();


window.addEventListener('load', function(){


	//fix old browsers css
	fixCss();
	
    if( window.innerWidth  > 700 ) {
        var scrollController = new ScrollPages();
		
		//init lib for animation with conf
		wowConf.init();

		animatiaonsInit( scrollController );
		pagesCounter( scrollController );
    } else {
		var scrollController = null;
	}


	//init preloader
	preLoader(afterPreLoader);
	desktopModal( scrollController );
	// init clickables and modal on works example
	// works();

	// init slide for modal on works example
    slickSliderInit( scrollController );





});


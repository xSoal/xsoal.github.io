


import $ from 'jquery';
import conf from './conf.js';

import tingle from 'tingle.js';


let videoFrames = conf.videoFrames;


let f = function() {
	// instanciate new modal
	var modal = new tingle.modal({
	    footer: true,
	    stickyFooter: false,
	    closeMethods: ['overlay', 'button', 'escape'],
	    closeLabel: "Закрыть",
	    cssClass: ['custom-class-1', 'custom-class-2'],
	    onOpen: function() {
	        // console.log('modal open');
	    },
	    onClose: function() {
	        console.log('modal closed');
	        modal.setContent('');
	    },
	    beforeClose: function() {
	        // here's goes some logic
	        // e.g. save content before closing the modal
	        return true; // close the modal
	        return false; // nothing happens
	    }
	});

	// modal.setContent('<h1>here\'s some content</h1>');
	// add a button
	// modal.addFooterBtn('<=', 'tingle-btn tingle-btn--primary tingle-btn-left', function() {
	//     // here goes some logic
	//     modal.close();
	// });

	// // add another button
	// modal.addFooterBtn('=>', 'tingle-btn tingle-btn--primary tingle-btn-right', function() {
	//     // here goes some logic
	//     modal.close();
	// });

	// open modal
	
	class Modal{
		constructor(){

		}

		modal(){
			modal.setContent(this.content);
		}

		open(){
			modal.open();
		}
	}

	class videoModal extends Modal{
		constructor(src){
			super();
			let video = document.createElement('VIDEO');
			video.src = src;
			this.content = video;
			video.autoplay = true;
			video.controls = true;

			video.onloadeddata = () => {
				
				this.modal();
			}
		}
	}

	class frameModal extends Modal{
		constructor(src){
			super();
			let frame = document.createElement('iframe');
			frame.src = window.location.href + src;
			this.content = frame;

			
			document.querySelector('body').appendChild(frame);
			this.modal();

			this.resizeble();
			// window.addEventListener('resize', () => {
			// 	this.resizeble();
			// });
		}


		resizeble(){
			console.log(this.getSize());
			this.content.width  = this.getSize().w  + "px";
			this.content.height = this.getSize().h  + "px";
		}

		getSize(){
			let w = window.innerWidth;
			let h = window.innerHieght;

			// h = w *= 0.5;
			
			if(w<h){
				w = h *= 0.4;
			}

			else {
				h = w *= 0.4;
			}



			return {
				'w':w,
				'h':h
			}
		}
	}

	let dragg = new videoModal(videoFrames.dragg);
	let shoot = new videoModal(videoFrames.shooter);
	let eat   = new frameModal(videoFrames.circlesEat);
	let bil   = new frameModal(videoFrames.bil);

	document.querySelector('.work-dragg').onclick = function(){
		dragg.modal();
		dragg.open();
	}

	document.querySelector('.work-shooter').onclick = function(){
		shoot.modal();
		shoot.open();
	}

	document.querySelector('.work-eat').onclick = function(){
		eat.modal();
		eat.open();
	}

	document.querySelector('.work-bil').onclick = function(){
		bil.modal();
		bil.open();
	}	

}


module.exports = f;

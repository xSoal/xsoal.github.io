import $ from 'jquery';

let fixCss = () => {

	$('html').css('height', window.innerHeight + 'px');
	$('body').css('height', window.innerHeight + 'px');

}



module.exports = fixCss;
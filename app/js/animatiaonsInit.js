
import LetsScale from './LetsScale';
import mouseElementCatcher from './mouseElementCatcher';

export default function animatiaonsInit ( scrollController ) {

    let scaleAboutMeBlock = new LetsScale('.intro', '.aboute_me', 2);

    scrollController.addHandlerOnSlideEvent( function( slideElementNode, slideNumber ){
        // console.log(slideElementNode, slideNumber);
    })

    mouseElementCatcher( scrollController );

}
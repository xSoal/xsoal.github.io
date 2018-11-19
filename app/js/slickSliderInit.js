
import $ from 'jquery';
import slick from 'slick-carousel';
import EventTimeControll from './eventTimeControll';

export default function slickSliderInit ( scrollController ) {
    window.scrollController = scrollController;

    let eventHandlerControll;
    let lastDirectionSlider;
    const worksCont = document.querySelector('.page_4');

    const worksSlider = $('.works').slick({
        infinite: false,
        slidesToShow: 2,
        slidesToScroll: 2,
        adaptiveHeight: true,
    });


    document.querySelector('body').addEventListener('slideOwn', (event)=>{
        let currentSlide = event.detail.currentSlide;
        if( currentSlide == worksCont ) {
            eventHandlerControll.goEvent();
            scrollController.canselEvent();

            // $(worksSlider).slickGoTo(0);
        };

    });




    let currentSlideDirection;

    let eventHandlerFn = function(e) {
        if (e.deltaY > 0) {
            currentSlideDirection = 'next';
            $(worksSlider).slick('slickNext');
        } else {
            currentSlideDirection = 'prev';
            $(worksSlider).slick('slickPrev');
        }
    };


    eventHandlerControll = new EventTimeControll( 'wheel', eventHandlerFn, 400, null, worksCont );

    worksSlider.on('afterChange', function(event, slick, currentSlide, nextSlide){
        console.log(currentSlide, slick.slideCount, '!!!!!')
        // show 2 slide on screen; that's why last slide screen is slick.slideCount / 2
        if( currentSlideDirection === 'next'
            && lastDirectionSlider == currentSlideDirection){
            // last slide screen
            
            if( currentSlide >= slick.slideCount - 2 ){
                eventHandlerControll.stopEvent();
                scrollController.restartEvent();
            }
            // scrollController.prepereSlideNext();

        }
        else if(currentSlideDirection === 'prev'
            && lastDirectionSlider == currentSlideDirection) {
            // first slide screen stopped slider listing also, if try top scrolling
            if (currentSlide == 0) {
                eventHandlerControll.stopEvent();
                scrollController.restartEvent();
            }
            // scrollController.prepereSlidePrev();
        }

        lastDirectionSlider = currentSlideDirection;
    });
    // worksSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
    //     console.log( arguments, ' before CHANGE' );
    // });
}
import $ from 'jquery';
import EventTimeControll from './eventTimeControll';


export default class scrollPages{
    constructor(){
        this.conf = {
            scrollDuratation: 1500,

        };
        this.activeScrollPoint = 0;
        this.mousewhellEventHandler;
        this.scrollPoints = document.querySelectorAll('.scrollPoint');

        this.directionOfLastSlideMove = '';

        this.callBacks = {};
        this.callBacksID = 0;
        this.stopped = false;
        this.init();

    }

    init(){

        document.body.classList.add('overflowY-hidden-desk');
        this.scrollTopOfWindow();

        this.mousewhellEventHandler = new EventTimeControll(
            'wheel',
            this.mouseWheel,
            this.conf.scrollDuratation,
            this,
        );
    }

    mouseWheel (event) {
        if(this.stopped) return false;
        event.preventDefault();
        let deltaY = event.deltaY;
        this.scrollControll(deltaY, event);
    }

    scrollControll(deltaY){
        deltaY > 0 ? this.prepereSlideNext() : this.prepereSlidePrev();

    }

    prepereSlidePrev(){
        this.directionOfLastSlideMove = 'top';
        if( this.activeScrollPoint > 0 ) {
            --this.activeScrollPoint;
            this.slide();
        }
    }
    prepereSlideNext(){
        this.directionOfLastSlideMove = 'bottom';
        this.activeScrollPoint === this.scrollPoints.length - 1
            ? this.activeScrollPoint = 0
            : ++this.activeScrollPoint;
        this.slide();
    }


    slide( elNumber = false ){
        let toScrollEl = elNumber ?
            this.scrollPoints[ elNumber ]
            : this.scrollPoints[ this.activeScrollPoint ];


        $('html,body').animate({
            scrollTop: $(toScrollEl).offset().top
        }, this.conf.scrollDuratation , function () {

        });

        this.callCustomEvents();
        this.doCallBacks();
    }

    scrollTopOfWindow(){
        $('html,body').animate({
            scrollTop: 0
        }, 100 );
    }

    canselEvent(){
        this.mousewhellEventHandler.stopEvent();
    }

    restartEvent(){
        console.log( 'restart event scroll' )
        this.mousewhellEventHandler.goEvent();
    }
    stopEvent(){
        this.stopped = true;
    }
    goEvent(){
        this.stopped = false;
    }

    callCustomEvents(){
        var widgetEvent = new CustomEvent("slideOwn", {
            bubbles: true,
            detail: {
                currentSlide: this.getCurrentSlide(),
                currentSlideNumber: this.getActiveSlideNumber(),
            }
        });
        document.querySelector('body').dispatchEvent(widgetEvent);
    }

    addHandlerOnSlideEvent( func ) {
        this.callBacks[ this.callBacksID++ ] = func;
        return this.callBacksID;
    }

    removeCallBack ( funcID ) {
        delete this.callBacks[ funcID ];
    }

    doCallBacks(){
        for( let funcID in this.callBacks ) {
            this.callBacks[funcID](
                this.scrollPoints[ this.activeScrollPoint ], // node of active el
                this.activeScrollPoint, // number of active el,
                this.directionOfLastSlideMove, // to bottom or top going
            );
        }
    }

    getCurrentDirection(){
        return this.directionOfLastSlideMove;
    }

    getCurrentSlide(){
        return this.scrollPoints[ this.activeScrollPoint ];
    }

    getNumberOfAllPages(){
        return this.scrollPoints.length - 1;
    }

    getActiveSlideNumber(){
        return this.activeScrollPoint;
    }

}
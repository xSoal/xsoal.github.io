

import eventTimeControll from './eventTimeControll';


export default class LetsScale {
    constructor( whereScaleSelector, whatScaleSelector, coefOfScale = 1 ){
        this.whereEl = document.querySelector(whereScaleSelector);
        this.whatEl  = document.querySelector(whatScaleSelector);
        this.coefOfScale = coefOfScale;
        this.whatEl.style.animationFillMode = 'none';

        this.middlePoint = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
        };
        this.startScale();
    }

    startScale(){
        this.eventHandler = new eventTimeControll('mousemove', this.scale, 50, this, this.whereEl);
    }

    stopScale(){
        this.whereEl.mousemove = null;
    }

    scale( event ){
        let mousePoint = {
            x: event.x,
            y: event.y,
        };

        let xScale = ( (mousePoint.x - this.middlePoint.x) / (this.coefOfScale * 1500000) ).toFixed(5) ;
        let yScale = ( (mousePoint.y - this.middlePoint.y) / (this.coefOfScale * 1500000) ).toFixed(5) ;

        this.whatEl.style.transform = "matrix3d( 1, 0, 0,"+xScale+",     0, 1, 0,"+yScale+",     0, 0, 1, 0,     0, 0, 0, 1  )";
    }


}
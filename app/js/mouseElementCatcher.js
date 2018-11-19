import anime from 'animejs';

// this function will enable handlers on active scroll element on page
// for init animation for catching need's elements by mouse
let isCached  = false;
let isAnimationBlocked = false;
let currentSlideNumber = 0;
export default function mouseElementCatcher ( scrollController ) {
    let handlers  = [{
        fn: onAbouteMePageHandler,
        nodeToListens: [{
            el: document.querySelector('.testButton'),
            x: document.querySelector('.testButton').getBoundingClientRect().left,
            y: document.querySelector('.testButton').getBoundingClientRect().top
        }]
    }];

    // at first load we init first handler without event from scroll
    document.addEventListener('mousemove', onAbouteMePageHandler );

    // it's listeners of event of scroll control and init need's
    // fn's to need's pages from array of handlers
    document.querySelector('body').addEventListener('slideOwn', (event)=>{

        let currentSlide = event.detail.currentSlide;
        let currentSlideNumber = currentSlide.getAttribute('data-slide');
        cancelAllHandlers();
        // on chrome i have don't see error after try cancel event from undefined,
        // in anyway throw error
        try{
            document.addEventListener('mousemove', handlers[currentSlideNumber].fn );
        }catch (e) {
            console.log('there is no such listener for this page');
        }
    });

    // firs page handler
    function onAbouteMePageHandler (event){
        if( isAnimationBlocked ) return false;
        let listenerElements =  handlers[currentSlideNumber].nodeToListens;
        listenerElements.forEach(function (item) {
            let mouseCoord = {
               x: parseInt(window.mouseCoord.x),
               y: parseInt(window.mouseCoord.y),
           };

           let distance = getDistance({
               x: item.x + item.el.clientWidth,
               y: item.y + item.el.clientHeight,
           }, mouseCoord);
            // console.log(distance, 'distance');
            if (distance < 150) {
                if(!isCached) {
                    let x = mouseCoord.x - item.el.clientWidth/2;
                    let y = mouseCoord.y - item.el.clientHeight/2;
                    animatedMoveElement(item.el, {x:x, y:y}, distance );
                    isAnimationBlocked = true;
                    // setTimeout(function(){
                    //     isAnimationBlocked = false;
                    // },500);
                } else {
                    cacheMouseElem(item.el, {x: item.x, y: item.y,}, mouseCoord);
                }
                isCached = true;

            } else if (isCached) {
                isCached = false;
                animatedMoveElementToStart(item.el, {x: item.x, y: item.y,});
            }

        });

    }

    function cacheMouseElem(item, itemCoord, mouseCoord){
        // console.log('from caching')
        let itemNeedBeX = mouseCoord.x - item.clientWidth/2;
        let itemNeedBeY = mouseCoord.y - item.clientHeight/2;

        item.style.left = `${itemNeedBeX}px`;
        item.style.top  = `${itemNeedBeY}px`;
    }

    function cancelAllHandlers(){
        handlers.forEach(function (fn) {
            document.removeEventListener('mousemove', fn);
        });
    };

}

// el = node, to == obj{ x: float, y: float }
function animatedMoveElement(el, to, distance) {
    console.log('start interval')
    let movingElForMouse = setInterval(function(){
        if (!(Math.abs((el.getBoundingClientRect().left + el.clientWidth / 2) - window.mouseCoord.x) > 5
            || Math.abs((el.getBoundingClientRect().top + el.clientHeight / 2) - window.mouseCoord.y) > 5)
        ) {
            clearInterval(movingElForMouse);
            isAnimationBlocked = false;
        } else {
            anime({
                targets: el,
                left: window.mouseCoord.x - el.clientWidth / 2,
                top: window.mouseCoord.y - el.clientHeight / 2,
                duration: 215,
                easing: 'linear',
                complete: function () {
                    console.log(' moooving ', distance );
                    el.classList.add('isCached');
                }
            });
        }
    }, 255); 
    
}

function animatedMoveElementToStart(el, to){
    isAnimationBlocked = true;
    anime({
        targets: el,
        left: to.x,
        top: to.y,
        duration: 250,
        easing: 'linear',
        complete: function(){
            el.classList.remove('isCached');
            isAnimationBlocked = false;
        }
    });
}


function getDistance(el1Obj, el2Obg){
    let side1 = Math.abs(el1Obj.x - el2Obg.x);
    let side2 = Math.abs(el1Obj.y - el2Obg.y);
    // distance
    return  Math.sqrt( Math.pow(side1,2) + Math.pow(side2,2) );

}
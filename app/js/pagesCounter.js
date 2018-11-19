
import anime from 'animejs';



export default function pagesCounter ( scrollController ) {

    let pagesCount = scrollController.getNumberOfAllPages();

    let pagesCounterNode = document.querySelector('.pagesCounter');

    let pageNow  = document.querySelector('.pagesCounter__pageNow');
    let allPages = document.querySelector('.pagesCounter__allPages');
    let lastDirection = 'bottom';
    allPages.innerHTML = pagesCount;

    // let pagesObg = { curentPage: 0 };

    scrollController.addHandlerOnSlideEvent(function( activeNode, activeNumber, slideMoveDirection ){



        let fontColor = activeNumber%2 === 1 ? '#fff' : '#000';
        anime({
            targets: pagesCounterNode,
            color: fontColor,
            complete: function(){
            }
        });

        if( lastDirection !== slideMoveDirection ) {
            pagesCounterNode.style.top = 'auto';
            pagesCounterNode.style.bottom = 'auto';
            if( slideMoveDirection === 'bottom' ) {
                console.log('bottom go')
                anime({
                    targets: pagesCounterNode,
                    bottom: '5%',
                    duration: 400,
                });
            } else {
                console.log('top go')
                anime({
                    targets: pagesCounterNode,
                    top: '5%',
                    duration: 400,
                });
            }
        }




        let timeLine = anime.timeline();
        timeLine.add({
            targets: pageNow,
            duration: 700,
            delay: 400,
            // opacity: {
            //     value: 0,
            //     delay: 100,
            // },
            opacity: {
                value: 0,
                duration: 700,
            },
            bottom: 15,
        })
            .add({
                targets: pageNow,
                duration: 100,
                bottom: -20,
                complete: function () {
                    pageNow.innerHTML = activeNumber;
                }
            })
            .add({
                targets: pageNow,
                duration: 250,
                opacity: 1,
                bottom: 0,
                delay: 250,
            })


        lastDirection = slideMoveDirection;
    });
}
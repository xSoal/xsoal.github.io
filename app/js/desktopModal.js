import anime from 'animejs';

export default function desktopModal (scrollController) {
    // scrollController.canselEvent();
    // scrollController.restartEvent();
    var modalCont    = document.querySelector('.modalDesktop');
    var modalHeader  = document.querySelector('.modalDesktop__modalHeader');
    var modalBody    = document.querySelector('.modalDesktop__modalBody');
    var closeButton  = document.querySelector('.closeButton');
    var closeButton__lineLeft  = document.querySelector('.closeButton__line-left .closeButton__innerLine');
    var closeButton__lineRight = document.querySelector('.closeButton__line-right .closeButton__innerLine');
    var preLoader              = document.querySelector('.modalBody__preLoader');
    var modalContent           = document.querySelector('.modalBody__contentOverflow');
    var modalText      = document.querySelector('.modalHeader__text');

   
    var isScreenSmall = window.innerWidth < 700 ? true : false;
    var headerSize = isScreenSmall ? '10%' : '15%';
    


    var promiseLoadWork = new Promise(function(resolve,reject){});

    // var promiseLoadWork = new Promise(function(resolve,reject){
    //     setTimeout(function () {
    //         resolve();
    //     },500)
    // });

    // setTimeout(openModal,100);

    document.querySelector('.works').addEventListener('click', function(event){
        var targetNodeWork = event.target;
        if( !targetNodeWork.classList.contains('work') ) return false;
        openModal();

        var workSrc  = targetNodeWork.querySelector('.view').getAttribute('data-work-src');
        var workType = targetNodeWork.querySelector('.view').getAttribute('data-work-type');
        var workText = targetNodeWork.querySelector('.view').getAttribute('data-work-text');
        switch ( workType ) {
            case 'video':
                loadVideo( workSrc, modalContent, workText );
                break;
            case 'iframe':
                loadIframe( workSrc, modalContent, workText );
                break;
        }

    });

    closeButton.onclick = closeModal;

    function closeModal() {
        promiseLoadWork = new Promise(function(resolve,reject){});
        if(scrollController) {
            scrollController.goEvent();
        }
        if(isScreenSmall) {
            document.querySelector('body').classList.remove('overflowY-hidden');
        }
        
        var modalAnimateAll = anime.timeline();

        modalAnimateAll
            // .add({
            //     targets: modalHeader,
            //     height: '0px',
            //     duration: 1350,
            //     easing: 'linear'
            // })

            .add({
                targets: [modalContent,modalText],
                opacity: 0,
                duration: 250,
            })
            .add({
                targets: modalBody,
                backgroundColor: 'rgba(0,0,0,0)',
                duration: 250,
                easing: 'linear',
            })
            .add({
                targets: closeButton,
                opacity: 0,
                duration: 200,
            })
            .add({
                targets: [closeButton__lineLeft, closeButton__lineRight],
                width: '0px',
                duration: 250,
                complete: function(){
                    modalContent.innerHTML = '';
                    anime({
                        targets: modalHeader,
                        height: '0px',
                        duration: 1000,
                        easing: 'linear',
                        complete: function(){
                            modalCont.style.display = 'none';
                            modalText.innerHTML = "";
                        }
                    })
                }
            })


    }

    function openModal() {
        modalCont.style.display = 'flex';
        if(scrollController){
            scrollController.stopEvent();
        }
        if(isScreenSmall) {
            document.querySelector('body').classList.add('overflowY-hidden');
        }
        
        var modalAnimateAll = anime.timeline();
        modalAnimateAll
            .add({
                targets: modalHeader,
                height: headerSize,
                duration: 450,
                easing: 'linear'
            })
            .add({
                targets: closeButton,
                opacity: 1,
                duration: 250,
            })
            .add({
                targets: closeButton__lineLeft,
                width: '100%',
                duration: 455,
                delay: 200,
            })
            .add({
                targets: closeButton__lineRight,
                width: '100%',
                duration: 455,
            })
            .add({
                targets: modalBody,
                backgroundColor: '#fff',
                duration: 450,
                easing: 'linear',
            })
            .add({
                targets: preLoader,
                opacity: 1,
                delay: 150,
                duration: 200,
                complete: function(){

                    promiseLoadWork
                        .then(function( objResponce ){
                            var afterContentLoadAnimeTimeline = anime.timeline();
                            afterContentLoadAnimeTimeline
                                .add({
                                    targets: preLoader,
                                    opacity: 0,
                                    duration: 100,
                                })
                                .add({
                                    targets: modalContent,
                                    opacity: 1,
                                    duration: 300,
                                    complete: function(){
                                        objResponce.wherePaste.innerHTML = '';
                                        objResponce.wherePaste.appendChild( objResponce.node );
                                        modalText.style.opacity = 0;
                                        modalText.innerHTML = objResponce.workText;
                                        anime({
                                            targets: modalText,
                                            opacity: 1,
                                        });
                                    }
                                });
                        });
                },
            });

    }


    function loadVideo( src, wherePasteNode, workText ) {
        var video = document.createElement('video');

        promiseLoadWork = new Promise(function( resolve, reject ){
            resolve({
                node: video,
                wherePaste: wherePasteNode,
                workText: workText,
            });
        });
        video.autoplay = true;
        video.controls = true;
        video.muted    = true;
        video.src = src;
    }

    function loadIframe( src, wherePasteNode, workText ) {
        var iframe = document.createElement('iframe');

        promiseLoadWork = new Promise(function( resolve, reject ){
            resolve({
                node: iframe,
                wherePaste: wherePasteNode,
                workText: workText,
            });
        });

        iframe.muted    = true;
        iframe.src = src;  
    }
}




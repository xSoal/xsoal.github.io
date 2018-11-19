
let mouse = {
    x: null,
    y: null,
};

window.mouseCoord = mouse;

export default function mouseCoordinateListener () {
    document.addEventListener('mousemove', function(event){
        mouse.x = event.x;
        mouse.y = event.y;
    });
}
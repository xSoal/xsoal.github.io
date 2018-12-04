


var randomizeConts = ["top2", "top3", "counter_cont", "nout_book", "chess", "darts" , "bottom"];

function compareRandom(a, b) {
    return Math.random() - 0.5;
}

// randomizeConts.sort(compareRandom);

// var count = 0;
// function compareRandom(a,b) {
// 	return a - b;
// }

randomizeConts.sort(compareRandom);
randomizeConts.sort(compareRandom);
randomizeConts.sort(compareRandom);
randomizeConts.sort(compareRandom);




console.log(randomizeConts)

var chars = location.pathname;


if(chars !== "/") {


    for(var i = 0; i<randomizeConts.length; i++){
        if(i != randomizeConts.length-2){

            var e1 = jQuery("."+randomizeConts[i]);
            // var e2 = jQuery("."+randomizeConts[i+1])
            // e1.after(e2);

            jQuery('.top1.section').after(e1);



            // var e1 = jQuery("."+randomizeConts[i]);
            // var e2 = jQuery("."+randomizeConts[i+1])
            // e1.before(e2);

            // var e1 = jQuery("."+randomizeConts[i]);
            // var e2 = jQuery("."+randomizeConts[i+1])
            // e1.after(e2);

        }
    }

    // for(var i = 0; i<randomizeConts.length; i++){
    // 	// jQuery(".main_cont").prepend(jQuery("."+randomizeConts[i]));
    // }


    document.querySelector(".section.datrs").style.marginTop = "auto";
    document.querySelector(".top1").style.padding = "0px;";


    jQuery("html, body").animate({ scrollTop: jQuery('.top1.section').offset().top });


}





var video_pre_img = document.getElementById("video_img_pre");
var video_link    = document.getElementById("video_link").href;

// video_pre_img.onclick = function() {
// 	var w = this.clientWidth;
// 	var h = this.clientHeight;
// 	var url = this.parentElement.getAttribute("data-video") + "?autoplay=1";
// 	this.parentElement.innerHTML = "<iframe width='"+w+"' height='"+h+"' src='"+url+"' frameborder='0'></iframe>"
// }

// video_pre_img.onclick = function() {
// 	var w = this.clientWidth;
// 	var h = this.clientHeight;
// 	var url = video_link;

// 	this.parentElement.innerHTML = "<video controls autoplay width='"+w+"' height='"+h+"' src='"+url+"' frameborder='0'></video>"
// }



var video  = document.querySelector("video");
video.onclick = function(){
    if(this.classList.contains("stop")){
        this.pause();
        this.classList.remove("stop");
        this.classList.add("play");
    }

    else {
        this.play();
        this.classList.remove("play");
        this.classList.add("stop");
    }
}



var max_multiply_time = 20; // max СѓРјРЅРѕР¶РёС‚РµР»СЊ

var days_cont = document.querySelector("div[data-counter=days]");
var hours_cont = document.querySelector("div[data-counter=hours]");
var minutes_cont = document.querySelector("div[data-counter=minutes]");
var seconds_cont = document.querySelector("div[data-counter=seconds]");


function setTime(){
    // var all_time = parseInt(+new Date()/1000);
    // var time_start = parseInt(Date.parse('2018.03.26 1:20:0')/1000); // РІР»РёСЏРµС‚ С‡Р°СЃРѕРІРѕР№ РїРѕСЏСЃ
    // var time_that_workink = all_time - time_start;

    var all_time    = new Date();
    var time_start  = new Date(2018,2,26,1,20,0); // РќР°С‡Р°Р»Рѕ РѕС‚СЃС‡РµС‚Р°, РІР»РёСЏРµС‚ С‡Р°СЃРѕРІРѕР№ РїРѕСЏСЃ, 1 РјРµСЃСЏС† СЃ 0-Р»СЏ  **** 0 - СЏРЅРІР°СЂСЊ, 1 - С„РµРІСЂР°Р»СЊ , ...
    var time_that_workink = parseInt((all_time - time_start)/1000);



    var weeks_conts = 60 * 60 * 24 * 7;
    var weeks_from_start = parseInt(time_that_workink / weeks_conts);
    var conts_multiply = 1;

    if(weeks_from_start > 0) {
        conts_multiply = weeks_from_start + 1;
    }

    if(weeks_from_start > max_multiply_time) {
        conts_multiply = max_multiply_time;
    }

    time_with_conts = time_that_workink;
    time_with_conts = time_that_workink*conts_multiply;




    var days_conts    = 60 * 60 * 24;
    var hours_conts   = 60 * 60;
    var minutes_conts = 60;

    var days  	= parseInt(time_with_conts/days_conts);
    // var hours 	= parseInt(time_that_workink%days_conts/hours_conts);
    // var minutes = parseInt(time_that_workink%hours_conts/minutes_conts);
    // var seconds = time_that_workink%60;

    var hours = parseInt(days*1.5);
    var minutes = parseInt(days/4);
    var seconds = parseInt(days*0.08);


    // console.log(time_that_workink, conts_multiply)


    days_cont.innerHTML = days;
    hours_cont.innerHTML = hours;
    minutes_cont.innerHTML = minutes;
    seconds_cont.innerHTML = seconds;

}

setTime();

// setInterval(setTime, 1000);

setInterval(function(){
    var now = parseInt(seconds_cont.innerHTML);
    seconds_cont.innerHTML = now+1;

},1000*60);





function rundomize_block(){

}



// var buttons = document.querySelectorAll(".button_more ");
// for(var i = 0; i<buttons.length; i++){
// 	buttons[i].onclick = function(){
// 		jQuery("html, body").animate({ scrollTop: jQuery('.top1').offset().top }, "slow");
// 	}
// }



document.getElementById("scroll_up").onclick = function(){

    jQuery("html, body").animate({ scrollTop: jQuery('html').offset().top }, "slow");
}




jQuery( window ).resize(function() {
    doResize();
});



function doResize(){
    // var w_w = jQuery("body").width();
    // var w_w = screen.width;
    var w_w = window.innerWidth;
    // alert(w_w)
    /// СЃРјРµРЅР° РїРѕСЂСЏРґРєР° Р±РµР· СЃРјРµРЅС‹ С…С‚РјР»
    function changeOrder(img){

        if(w_w < 1000){
            var text = img.parent().children(".f");
            text.before(img);

        }

        else{
            var text = img.parent().children(".f");
            img.before(text);
        }


    }

    changeOrder(jQuery(".datrs .cont > .i_img "));
    changeOrder(jQuery(".top3 .cont > .i_img "));




    if(w_w < 600){
        jQuery(".section.nout_book").append(jQuery(".book_up_text"));
    }
    else{
        jQuery(".section .book_up.cont").append(jQuery(".book_up_text"));
    };


    if(w_w < 1000 ){
        jQuery(".bottom_text").before(jQuery(".bottom_bg"));
    }

    else{
        jQuery(".bottom_cont_first").after(jQuery(".bottom_bg"));
    };


    //СЂРµСЃР°Р№Р· РєР°СЂС‚РёРєРё, С‚СЂРµР±СѓСЋС‰РµР№ РїСЂРѕРїРѕСЂС†РёСЏ РґР»СЏ СЌРєСЂР°РЅРѕРІ СЂР°Р·РЅС‹С… СЃРѕРѕС‚РЅРѕС€РµРЅРёР№
    function hand_back_resize(){
        // ---- huck
        var hand_back_cont = document.querySelector(".chess_bg_cont");
        var orig_w = 1920;
        var orig_h = 1036;

        if(orig_w>orig_h){
            var coef_hand_cont   = orig_h/orig_w;
        }
        else {
            var coef_hand_cont   = orig_w/orig_h;
        };

        var w = hand_back_cont.clientWidth;

        if(w_w>1000){
            hand_back_cont.style.height = w*coef_hand_cont + "px";
        }
        console.log(w_w)
        if(w_w<1000) {
            hand_back_cont.style.height = "auto";
        }

    }

    hand_back_resize();

}

doResize();


// РёР· РјРёРѕРЅРёС‚РѕСЂР° РЅРѕСѓС‚Р°














var spinnerRotable = document.querySelector(".spinner_bg");
var spinnerCenter  = document.querySelector(".spinner_cat");
var degSpinner = 0;
var minusDeg   = 0;



function rotateSpinner(){

    degSpinner += 0.4;

    if(degSpinner > 360) degSpinner = 0;

    minusDeg = 0 - degSpinner;

    spinnerRotable.style.transform = "rotate("+degSpinner+"deg)";

    rotate = requestAnimationFrame(rotateSpinner)

    // var divs = document.querySelector(".spinner_bg > div");
}

var rotate = requestAnimationFrame(rotateSpinner);

spinnerRotable.onmouseover = function(){
    cancelAnimationFrame(rotate);
}

spinnerRotable.onmouseleave = function(){
    rotate = requestAnimationFrame(rotateSpinner);
}




// С„СѓРЅРєС†РёСЏ, РєРѕС‚РѕСЂР°СЏ РїРѕ Р·Р°РґР°РЅРЅРѕРјСѓ СЃРµР»РµРєС‚РѕСЂСѓ
// РЅР°Р№РґРµС‚ СЃРѕРѕС‚РІРµС‚СЃС‚РІСѓСЋС‰РёРµ РµРјСѓ СЌР»РµРјРµРЅС‚С‹, РєРѕС‚РѕСЂС‹Рµ
// РїСЂРё СЌС‚РѕРј РїРѕРїР°РґР°СЋС‚ РІ РІРёРґРёРјСѓСЋ РѕР±Р»Р°СЃС‚СЊ РѕРєРЅР°
function inWindow(s){
    var scrollTop = $(window).scrollTop();
    var windowHeight = $(window).height();
    var currentEls = $(s);
    var result = [];
    currentEls.each(function(){
        var el = $(this);
        var offset = el.offset();
        if(scrollTop <= offset.top && (el.height() + offset.top) < (scrollTop + windowHeight))
            result.push(this);
    });
    return $(result);
}

window.addEventListener("scroll", function(){
    // var e = inWindow(jQuery(".menu_cont"));
    // if( e.length > 0 ){
    // 	document.querySelector(".header_dinamic_spinner_cont").classList.add("spinner_upper");
    // 	document.querySelector("#scroll_up").classList.add("spinner_upper");

    // }
    // else {
    // 	document.querySelector(".header_dinamic_spinner_cont").classList.remove("spinner_upper");
    // 	document.querySelector("#scroll_up").classList.remove("spinner_upper");
    // }
});


$( ".menu_button:first-child" ).hover(
    function() {
        document.querySelector(".header_dinamic_spinner_cont").classList.add("spinner_upper");
    },
    function() {
        document.querySelector(".header_dinamic_spinner_cont").classList.remove("spinner_upper");
    }
);

$( ".menu_button:last-child" ).hover(
    function() {
        document.querySelector("#scroll_up").classList.add("spinner_upper");
    },
    function() {
        document.querySelector("#scroll_up").classList.remove("spinner_upper");
    }
);




setTimeout(function(){
    try{
        document.querySelector('.jivo-iframe-container-bottom').style.display = "none !important";
        jQuery('.jivo-iframe-container-bottom').css('display: none !important;');
    }
    catch(err){

    }

},4455);



// mobile submenu sorr_f
var sub_uls = document.querySelectorAll('.pushy-submenu > ul');

setSubMenuWidth();
window.addEventListener('resize', setSubMenuWidth);

function setSubMenuWidth() {

    for(var i = 0; i<sub_uls.length; i++){
        if(window.innerWidth < 1360){
            sub_uls[i].style.width = window.innerWidth + "px";

            if(i%2 != 0 && i != 0 ){
                sub_uls[i].style.marginLeft = "-"+window.innerWidth/2+"px";
            }

        }
        else {
            sub_uls[i].style.width = "auto";
            sub_uls[i].style.marginRight = "auto";
        }

    }

}
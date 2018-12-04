var zIndexModal = 215;
(function(){
    var minBlur=2,
        maxBlur=200,
        isUpdatingBlur=false,
        updateBlurStopTimeout=null,
        multiplier=0.25
    ;

    $.fn.toggleBlur=function(v){
        var blurId=$(this).data("blur-id");
        var value=v?"url(#"+blurId+")":"none";
        $(this).css({
            webkitFilter:value,
            filter:value
        });
    }
    $.fn.setBlur=function(v){
        var blur=$(this).data("blur");
        v=Math.round(v);
        if($(this).data("blur-value")!=v){
            if(v==0){
                $(this).toggleBlur(false);
            }else{
                $(this).toggleBlur(true);

                blur.firstElementChild.setAttribute("stdDeviation",v+",0");
                $(this).data("blur-value",v);
            }
        }
    }
    $.fn.initBlur=function(_multiplier){
        if(typeof _multiplier=="undefined") _multiplier=0.25;
        multiplier=_multiplier;
        var defs=$(".filters defs").get(0);
        var blur=$("#blur").get(0);
        $(this).each(function(i){
            var blurClone=blur.cloneNode(true);
            var blurId="blur"+i;
            blurClone.setAttribute("id",blurId);
            defs.appendChild(blurClone);
            $(this)
                .data("blur",blurClone)
                .data("blur-id",blurId)
                .data("blur-value",0)
                .data("last-pos",$(this).offset())
            ;
        });
    }

    $.updateBlur=function(){
        $(".js-blur").each(function(){
            var pos=$(this).offset();
            var lastPos=$(this).data("last-pos");
            var v=Math.abs(pos.left-lastPos.left)*multiplier;
            $(this).data("last-pos",pos);
            $(this).setBlur(v);
        })
        if(isUpdatingBlur){
            requestAnimationFrame($.updateBlur);
        }
    }
    $.startUpdatingBlur=function(stopDelay){
        // if(typeof stopDelay=="undefined"){
        // 	stopDelay=-1;
        // }
        // if(updateBlurStopTimeout!=null){
        // 	clearTimeout(updateBlurStopTimeout);
        // 	updateBlurStopTimeout=null;
        // }
        // if(!isUpdatingBlur){
        // 	isUpdatingBlur=true;
        // 	$.updateBlur();
        // }
        // if(stopDelay>-1){
        // 	updateBlurStopTimeout=setTimeout($.stopUpdatingBlur,stopDelay);
        // }
    }
    $.stopUpdatingBlur=function(){
        isUpdatingBlur=false;
    }
})();


// Modal Window
function modalInit(cont, open_button){
    var $modal = cont.find(".modal"),
        $overlay = cont.find(".modal-overlay"),
        blocked = false,
        unblockTimeout=null
    ;

    TweenMax.set($modal,{
        autoAlpha:0
    })

    var isOpen = false;

    function openModal() {
        if (!blocked) {
            block(400);

            TweenMax.to($overlay, 0.3, {
                autoAlpha: 1
            });

            TweenMax.fromTo($modal, 0.5, {
                x: (-$(window).width() - $modal.width()) / 2 - 50,
                scale:0.9,
                autoAlpha:1,
                zIndex: zIndexModal++,
            }, {
                delay: 0.1,
                rotationY:0,
                scale:1,
                opacity:1,
                x: 0,
                z:0,
                ease: Elastic.easeOut,
                easeParams: [0.4, 0.3],
                force3D: false
            });
            $.startUpdatingBlur(800);
        }
    }

    function closeModal() {
        if(!blocked){
            block(400);
            TweenMax.to($overlay, 0.3, {
                delay: 0.3,
                autoAlpha: 0
            });
            TweenMax.to($modal, 0.3,{
                x: ($(window).width() + $modal.width()) / 2 + 100,
                scale:0.9,
                ease: Quad.easeInOut,
                force3D: false,
                onComplete:function(){
                    TweenMax.set($modal,{
                        autoAlpha:0
                    });
                }
            });
            $.startUpdatingBlur(400);
        }
    }
    function block(t){
        blocked=true;
        if(unblockTimeout!=null){
            clearTimeout(unblockTimeout);
            unblockTimeout=null;
        }
        unblockTimeout=setTimeout(unblock,t);
    }
    function unblock(){
        blocked=false;
    }
    open_button.click(function() {
        openModal();
    })
    cont.find(".close-modal,.modal-overlay,.input-submit").click(function() {
        closeModal();
    })

    // console.log($modal)
    // $modal.initBlur(0.5);


}


modalInit($(".container_modal_message"), $(".spinner__message"));


// modalInit($(".container_modal_call"), $(".spinner__call"));
var tel = document.getElementById("tel").href;
document.querySelector(".spinner__call").onclick = function(){
    window.location.href = tel;
}

modalInit($(".container_modal_call_red"), $(".spinner__call_red"));


// modalInit($(".container_modal_jivo"), $(".spinner__jivo"));

document.querySelector(".spinner__jivo").onclick = function(){
    try{
        document.querySelector('.jivo-iframe-container-bottom').style.display = "block important";
        document.querySelector('#jivo-iframe-container').style.display = "block important";
        document.querySelector(".globalClass_ET").classList.add("jivo_show");
    }
    catch(err){

    }


    jivo_api.open();
    // document.querySelector("body div#jivo-iframe-container:not(.jivo-c-mobile)").style.zIndex = "999999";
    // jQuery('body div#jivo-iframe-container').style('z-index', '15', 'important');

    // document.querySelector("body div#jivo-iframe-container").style.zIndex = "999999 !important";

    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = '/css/jivo_see.css';
    document.head.appendChild(link);

    document.querySelector("#scroll_up").classList.add("scroll_up_upper");
    document.querySelector(".menu_cont").classList.add("menu_uppper");
}



var e = document.querySelector("input[name='Phone']");

e.oninput = function(){
    this.value = this.value.replace(/[^0-9\+\(\)\.]/gi, "");
    if(this.value !== "" && this.value.indexOf("+") === -1){
        this.value = this.value.replace(/([0-9\+]+)/gi, "+$&");
    }
}




var s_call = document.querySelector(".s_call");

s_call.onclick = function(){
    var name  = document.querySelector(".container_modal_call_red input[name='Name']")
    var phone = document.querySelector(".container_modal_call_red input[name='Phone']")
    name.classList.remove("non_valid");
    phone.classList.remove("non_valid");

    if(name.value !== "" && phone.value !== ""){
        var obj = {};
        obj.name = name.value;
        obj.phone = phone.value;
        var data = JSON.stringify(obj);

        jQuery.post('ajax/mail.php',{phone:data}, function(rep){
            if(rep === "ok"){
                var text = "РЎРѕРѕР±С‰РµРЅРёРµ РѕС‚РїСЂР°РІР»РµРЅРѕ!";
            }

            else {
                var text = "Р§С‚Рѕ-С‚Рѕ РїРѕС€Р»Рѕ РЅРµ С‚Р°Рє. <br> РџРѕР¶Р°Р»СѓР№СЃС‚Р°, РїРѕРїСЂРѕР±СѓР№С‚Рµ РїРµСЂРµР·Р°РіСЂСѓР·РёС‚СЊ СЃС‚СЂР°РЅРёС†Сѓ РёР»Рё РїРѕРїСЂРѕР±РѕРІР°С‚СЊ РїРѕР·Р¶Рµ.";
            }

            s_call.parentNode.classList.add("message_after_send");
            s_call.parentNode.innerHTML = text;

            console.log(rep);
        });
    }

    if(name.value === "") name.classList.add("non_valid");
    if(phone.value === "") phone.classList.add("non_valid");

}


var s_mail =  document.querySelector(".s_mail");

s_mail.onclick = function(){
    var name  = document.querySelector(".container_modal_message input[name='Name']")
    var email = document.querySelector(".container_modal_message input[name='Email']")
    name.classList.remove("non_valid");
    email.classList.remove("non_valid");

    if(name.value !== "" && email.value !== ""){
        var obj = {};
        obj.name = name.value;
        obj.email = email.value;
        var data = JSON.stringify(obj);


        jQuery.post('ajax/mail.php',{mail:data}, function(rep){
            if(rep === "ok"){
                var text = "РЎРѕРѕР±С‰РµРЅРёРµ РѕС‚РїСЂР°РІР»РµРЅРѕ!";
            }

            else {
                var text = "Р§С‚Рѕ-С‚Рѕ РїРѕС€Р»Рѕ РЅРµ С‚Р°Рє. <br> РџРѕР¶Р°Р»СѓР№СЃС‚Р°, РїРѕРїСЂРѕР±СѓР№С‚Рµ РїРµСЂРµР·Р°РіСЂСѓР·РёС‚СЊ СЃС‚СЂР°РЅРёС†Сѓ РёР»Рё РїРѕРїСЂРѕР±РѕРІР°С‚СЊ РїРѕР·Р¶Рµ.";
            }

            s_mail.parentNode.classList.add("message_after_send");
            s_mail.parentNode.innerHTML = text;

        });


    }

    if(name.value === "") name.classList.add("non_valid");
    if(email.value === "") email.classList.add("non_valid");

}
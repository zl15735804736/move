$(function () {
    var num=0;
    var flag=true;
    var h=$(window).height();
    $("#fullpage").mousedown(function (e) {
        e.preventDefault();
    })
    $("#fullpage").mousemove(function (e) {
        e.preventDefault();
    })
    touch.on("body","swipeup","#fullpage",function () {
        if (!flag){
            return ;
        }
        num++;
        if (num==$("section").length){
            num=$("section").length-1;
            return ;
        }
        $("#fullpage").css({
            marginTop:-num*h,
            transition:"margin-top 1s ease"
        })
        flag=false;
    })
    touch.on("body","swipedown","#fullpage",function () {
        if (!flag){
            return ;
        }
        num--;
        if (num==-1){
            num=0;
            return ;
        }
        $("#fullpage").css({
            marginTop:-num*h,
            transition:"margin-top 1s ease"
        })
        flag=false;
    })
    //检测动画是否完成
    $("#fullpage")[0].addEventListener("webkitTransitionEnd",function () {
        flag=true;
    })
})

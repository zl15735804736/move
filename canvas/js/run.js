window.onload=function(){
    var canvas=document.querySelector("canvas");
    var cobj=canvas.getContext("2d");
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;

    /*程序运行*/
    var runImg=document.querySelectorAll(".run");
    var jumpImg=document.querySelectorAll(".jump");
    var hinderImg=document.querySelectorAll(".hinder");
    var gameObj=new game(canvas,cobj,runImg,jumpImg,hinderImg);

    //选项卡
    var start=$(".start");
    //遮罩
    var mask=$(".mask");
    //开始按钮
    var startBtn=$(".btn");

    startBtn.one("click",function () {
        gameObj.play(start,mask);
    })
};
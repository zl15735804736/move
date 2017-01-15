
// 人物
    function person(canvas,cobj,runImg,jumpImg) {
        this.canvas = canvas;
        this.cobj = cobj;
        this.x =0;
        this.y = 460;
        this.width = 80;
        this.height = 80;
        this.runImg = runImg;
        this.jumpImg = jumpImg;
        this.status = "runImg";
        this.state = 0;
        this.num=0;
        this.speedx = 8;
        this.life=2;
    }
    person.prototype = {
        draw: function () {
            this.cobj.save();
            this.cobj.translate(this.x,this.y);
            this.cobj.drawImage(this[this.status][this.state],0,0,80,80,0,0,this.width,this.height);
            this.cobj.restore();
        }
    };
function lizi(cobj){
    this.cobj=cobj;
    this.x=200;
    this.y=200;
    this.r=1+2*Math.random();
    this.color="red";
    this.speedy=6*Math.random()-3;
    this.speedx=6*Math.random()-3;
    this.zhongli=0.3;
    this.speedr=0.1;
}

lizi.prototype={
    draw:function(){
        var cobj=this.cobj;
        cobj.save();
        cobj.translate(this.x,this.y);
        cobj.beginPath();
        cobj.fillStyle=this.color;
        cobj.arc(0,0,this.r,0,2*Math.PI);
        cobj.fill();
        cobj.restore();
    },
    update:function(){
        this.x+=this.speedx;
        this.speedy+=this.zhongli;
        this.y+=this.speedy;
        this.r-=this.speedr;
    }
}



function xue(cobj,x,y){
    var arr=[];
    for(var i=0;i<30;i++){
        var obj=new lizi(cobj);
        obj.x=x;
        obj.y=y;
        arr.push(obj);
    }

    var t=setInterval(function(){
        for(var i=0;i<arr.length;i++){
            arr[i].draw();
            arr[i].update();
            if(arr[i].r<0){
                arr.splice(i,1);
            }
        }
        if(arr.length==0){
            clearInterval(t);
        }
    },50)
}


function zidan(canvas,cobj){
    this.x=0;
    this.y=0;
    this.width=50;
    this.height=10;
    this.color="green";
    this.speedx=5;
    this.jia=1;
    this.cobj=cobj;
    this.canvas=canvas;
}
zidan.prototype={
    draw:function(){
        var cobj=this.cobj;
        cobj.save();
        cobj.translate(this.x,this.y);
        cobj.fillStyle=this.color;
        cobj.fillRect(0,0,this.width,this.height);
        cobj.restore();
    }
}

// 障碍物
    function hinder(canvas,cobj,hinderImg){
        this.canvas = canvas;
        this.cobj = cobj;
        this.hinderImg = hinderImg;
        this.state = 0;
        this.x = canvas.width-50;
        this.y = 478;
        this.width=84;
        this.height=60;
        this.speedx=8;
    }
    hinder.prototype={
        draw:function(){
            this.cobj.save();
            this.cobj.translate(this.x,this.y);
            this.cobj.drawImage(this.hinderImg[this.state],0,0,564,400,0,0,this.width,this.height);
            this.cobj.restore();
        }
    }

// 游戏的主类
    function game(canvas,cobj,runImg,jumpImg,hinderImg){
        this.canvas = canvas;
        this.cobj = cobj;
        this.width = canvas.width;
        this.height = canvas.height;
        this.hinderImg=hinderImg;
        this.person = new person(canvas, cobj, runImg, jumpImg);
        this.backx = 0;
        this.backSpeed = 8;
        this.isfire = false;
        this.hinderArr = [];
        this.score=0;
        this.zidan=new zidan(canvas,cobj);
    }
    game.prototype={
        play:function(start,mask){
            start.css("animation","start1 2s ease forwards");
            mask.css("animation","mask1 2s ease forwards");
            this.run();
            this.key();
            this.mouse();
        },
        run:function () {
            var that=this;
            var num=0;
            var rand=(2+Math.ceil(6*Math.random()))*1000;
            setInterval(function () {
                num+=50;
                that.cobj.clearRect(0,0,that.width,that.height);
                that.person.num++;
                if(that.person.status=="runImg"){
                    that.person.state=that.person.num%8;
                }else if(that.person.status=="jumpImg"){
                    that.person.state=0;
                }
                that.person.x+=that.person.speedx;
                if(that.person.x>=that.width/3){
                    that.person.x=that.width/3;
                }

                that.person.draw();
                // 障碍物
                if(num%rand==0){
                    rand=(2+Math.ceil(6*Math.random()))*1000;
                    num=0;
                    var obj=new hinder(that.canvas,that.cobj,that.hinderImg);
                    obj.state=Math.floor(Math.random()*that.hinderImg.length);
                    that.hinderArr.push(obj);
                }

                for(var i=0;i<that.hinderArr.length;i++){
                    that.hinderArr[i].x-=that.hinderArr[i].speedx;
                    that.hinderArr[i].draw();

                    if(hitPix(that.canvas,that.cobj,that.person,that.hinderArr[i])){
                        if(!that.hinderArr[i].flag) {
                            xue(that.cobj,that.person.x+that.person.width/2,that.person.y+that.person.height/2);
                            that.person.life--;
                            console.log(that.person.life);
                            if(that.person.life<0){
                                alert("game over!");
                                location.reload();
                            }
                            that.hinderArr[i].flag=true;
                        }
                    }

                    if(that.person.x>that.hinderArr[i].x+that.hinderArr[i].width){
                        if(!that.hinderArr[i].flag&&!that.hinderArr[i].flag1){
                            that.score++;
                            document.title=that.score;
                            that.hinderArr[i].flag1=true;
                        }
                    }

                    if(that.isfire){
                        if(hitPix(that.canvas,that.cobj,that.zidan,that.hinderArr[i])){
                            // alert(1);
                        }
                    }
                }

                /*操作子弹*/
                if(that.isfire){
                    if(that.zidan.x>that.width){
                        that.isfire=false;
                    }
                    that.zidan.speedx+=that.zidan.jia;
                    that.zidan.x+=that.zidan.speedx;
                    that.zidan.draw();
                }

                that.backx-=that.backSpeed;
                that.canvas.style.backgroundPositionX=that.backx+"px";
            },50)
        },
        key:function () {
            var that=this;
            var flag=true;
            document.onkeydown=function(e){
                if(!flag){
                    return false;
                }
                flag=false;
                if(e.keyCode==32){
                    that.person.status="jumpImg";
                    var inita=0;
                    var speeda=6 ;
                    var r=150;
                    var y=that.person.y;
                    var t=setInterval(function(){
                        inita+=speeda;
                        if(inita>180){
                            clearInterval(t);
                            that.person.y=y;
                            that.person.status ="runImg";
                            flag=true;
                        }else{
                            var top=Math.sin(inita*Math.PI/180)*r;
                            that.person.y=y-top;
                        }
                    },50)
                }
            }
        },
        mouse:function(){
            var that=this;
            document.querySelector(".mask").onclick=function(){
                if(that.isfire){
                    return false;
                }
                that.zidan.x=that.person.x+that.person.width/2;
                that.zidan.y=that.person.y+that.person.height/2;
                that.zidan.speedx=5;
                that.isfire=true;


            }
        }
    }
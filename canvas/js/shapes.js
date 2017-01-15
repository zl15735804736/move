function shape(canvas,cobj){
    this.canvas=canvas;
    this.cobj=cobj;
    this.width=canvas.width;
    this.height=canvas.height;
    this.type='line';
    this.style='stroke';
    this.strokeStyle="#000";
    this.fillStyle="#000";
    this.lineWidth=1;
    this.bianNum=3;
    this.jiaoNum=5;
    this.history=[];
}
shape.prototype={
    init:function(){
        this.cobj.lineWidth=this.lineWidth;
        this.cobj.strokeStyle=this.strokeStyle;
        this.cobj.fillStyle=this.fillStyle;
    },
    draw:function(){
        var that=this;
        that.canvas.onmousedown=function(e){
            var startX=e.offsetX;
            var startY=e.offsetY;
            that.canvas.onmousemove=function(e){
                that.init();
                var endX=e.offsetX;
                var endY=e.offsetY;
                that.cobj.clearRect(0,0,that.width,that.height);
                if(that.history.length>0){
                    that.cobj.putImageData(that.history[that.history.length-1],0,0);
                }
                that[that.type](startX,startY,endX,endY);
            }
            that.canvas.onmouseup=function(){
                that.history.push(that.cobj.getImageData(0,0,that.width,that.height));
                that.canvas.onmousemove=null;
                that.canvas.onmouseup=null;
            }
        }
    },
    line:function(x,y,x1,y1){
        this.cobj.beginPath();
        this.cobj.moveTo(x,y);
        this.cobj.lineTo(x1,y1);
        this.cobj.stroke();
    },
    rect:function(x,y,x1,y1){
        this.cobj.beginPath();
        this.cobj.rect(x,y,x1-x,y1-y);
        this.cobj[this.style]();
    },
    arc:function(x,y,x1,y1){
        this.cobj.beginPath();
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        this.cobj.arc(x,y,r,0,2*Math.PI);
        this.cobj[this.style]();
    },
    bian:function(x,y,x1,y1){
        this.cobj.beginPath();
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        var angle=360/this.bianNum*Math.PI/180;
        for(var i=0;i<this.bianNum;i++){
            this.cobj.lineTo(Math.cos(angle*i)*r+x,Math.sin(angle*i)*r+y);
        }
        this.cobj.closePath();
        this.cobj[this.style]();
    },
    jiao:function(x,y,x1,y1){
        this.cobj.beginPath();
        var r1=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        var r2=r1/3;
        var angle=360/this.jiaoNum/2*Math.PI/180;
        for(var i=0;i<this.jiaoNum*2;i++){
            if(i%2==0){
                this.cobj.lineTo(Math.cos(angle*i)*r1+x,Math.sin(angle*i)*r1+y);
            }else{
                this.cobj.lineTo(Math.cos(angle*i)*r2+x,Math.sin(angle*i)*r2+y);
            }
        }
        this.cobj.closePath();
        this.cobj[this.style]();
    }
}
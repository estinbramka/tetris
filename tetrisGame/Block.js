
export class Block {
    constructor(color, x, y, tetrisGame) {
        this.color=color;
        this.x=x;
        this.y=y;
        this.tetrisGame=tetrisGame;
    }

    update() {
        let pixelX = this.x * this.tetrisGame.state.blockDim.width;
        let pixelY = this.y * this.tetrisGame.state.blockDim.height;
        //this.tetrisGame.ctx.fillStyle = this.color;
        //this.tetrisGame.ctx.fillRect(pixelX, pixelY, this.tetrisGame.state.blockDim.width, this.tetrisGame.state.blockDim.height);
        let topLeft = {
            x: pixelX,
            y: pixelY
        }
        let topRight = {
            x: pixelX,
            y: pixelY + this.tetrisGame.state.blockDim.height
        }
        let bottomLeft = {
            x: pixelX + this.tetrisGame.state.blockDim.width,
            y: pixelY
        }
        let bottomRight = {
            x: pixelX + this.tetrisGame.state.blockDim.width,
            y: pixelY + this.tetrisGame.state.blockDim.height
        }

        this.tetrisGame.ctx.fillStyle = this.pSBC( -0.5, this.color );
        this.tetrisGame.ctx.beginPath();
        this.tetrisGame.ctx.moveTo(topRight.x,topRight.y);
        this.tetrisGame.ctx.lineTo(bottomRight.x,bottomRight.y);
        this.tetrisGame.ctx.lineTo(bottomLeft.x,bottomLeft.y);
        this.tetrisGame.ctx.lineTo(topRight.x,topRight.y);
        this.tetrisGame.ctx.fill();

        this.tetrisGame.ctx.fillStyle = this.pSBC( 0.25, this.color );
        this.tetrisGame.ctx.beginPath();
        this.tetrisGame.ctx.moveTo(topLeft.x,topLeft.y);
        this.tetrisGame.ctx.lineTo(topRight.x,topRight.y);
        this.tetrisGame.ctx.lineTo(bottomLeft.x,bottomLeft.y);
        this.tetrisGame.ctx.lineTo(topLeft.x,topLeft.y);
        this.tetrisGame.ctx.fill();

        this.tetrisGame.ctx.fillStyle = this.color;
        let shrinkRect = 0.35;
        let shrinkedBlockDim = {
            width: this.tetrisGame.state.blockDim.width * shrinkRect,
            height: this.tetrisGame.state.blockDim.height * shrinkRect,
        }
        this.tetrisGame.ctx.fillRect(
            pixelX+(shrinkedBlockDim.width/2),
            pixelY+(shrinkedBlockDim.height/2), 
            this.tetrisGame.state.blockDim.width-shrinkedBlockDim.width, 
            this.tetrisGame.state.blockDim.height-shrinkedBlockDim.height
        );
    }

    pSBC(p,c0,c1,l) {
        let r,g,b,P,f,t,h,i=parseInt,m=Math.round,a=typeof(c1)=="string";
        if(typeof(p)!="number"||p<-1||p>1||typeof(c0)!="string"||(c0[0]!='r'&&c0[0]!='#')||(c1&&!a))return null;
        if(!this.pSBCr)this.pSBCr=(d)=>{
            let n=d.length,x={};
            if(n>9){
                [r,g,b,a]=d=d.split(","),n=d.length;
                if(n<3||n>4)return null;
                x.r=i(r[3]=="a"?r.slice(5):r.slice(4)),x.g=i(g),x.b=i(b),x.a=a?parseFloat(a):-1
            }else{
                if(n==8||n==6||n<4)return null;
                if(n<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(n>4?d[4]+d[4]:"");
                d=i(d.slice(1),16);
                if(n==9||n==5)x.r=d>>24&255,x.g=d>>16&255,x.b=d>>8&255,x.a=m((d&255)/0.255)/1000;
                else x.r=d>>16,x.g=d>>8&255,x.b=d&255,x.a=-1
            }return x};
        h=c0.length>9,h=a?c1.length>9?true:c1=="c"?!h:false:h,f=this.pSBCr(c0),P=p<0,t=c1&&c1!="c"?this.pSBCr(c1):P?{r:0,g:0,b:0,a:-1}:{r:255,g:255,b:255,a:-1},p=P?p*-1:p,P=1-p;
        if(!f||!t)return null;
        if(l)r=m(P*f.r+p*t.r),g=m(P*f.g+p*t.g),b=m(P*f.b+p*t.b);
        else r=m((P*f.r**2+p*t.r**2)**0.5),g=m((P*f.g**2+p*t.g**2)**0.5),b=m((P*f.b**2+p*t.b**2)**0.5);
        a=f.a,t=t.a,f=a>=0||t>=0,a=f?a<0?t:t<0?a:a*P+t*p:0;
        if(h)return"rgb"+(f?"a(":"(")+r+","+g+","+b+(f?","+m(a*1000)/1000:"")+")";
        else return"#"+(4294967296+r*16777216+g*65536+b*256+(f?m(a*255):0)).toString(16).slice(1,f?undefined:-2)
    }
}
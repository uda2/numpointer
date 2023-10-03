// new numPointer("#sample",[
// { "x": 12, "y": 25, "w": 32, "h": 32 }
// ],{});
class numPointer {
  constructor(query, data, options) {
    this.fcolor = (options.fcolor)? options.fcolor:"#FC8600";
    this.bcolor = (options.bcolor)? options.bcolor:"#FFFFFF";
    this.lineWidth = (options.lineWidth)? options.lineWidth:4;
    this.witeWidth = (options.witeWidth)? options.witeWidth:3;
    this.font = (options.font)? options.font:"22px 'Arial Black'";
    this.radius = (options.radius)? options.radius:15;
    this.pointerBase = (options.pointerBase)? options.pointerBase:8;
    this.pointerLength = (options.pointerLength)? options.pointerLength:8;
		this.pointerBaseRad = Math.atan2(this.pointerBase / 2, Math.sqrt(this.radius ** 2 - (this.pointerBase / 2) ** 2));
    this.data = data;
		this.canvas;
		this.canvasWidth;
		this.canvasHeight;
		this.ctx;
		this.imgelm = document.querySelector(query);
		this.toRad =  Math.PI / 180;
		this.imgobj = new Image();
		if (this.imgelm.complete && this.imgelm.naturalWidth > 0) {
			this.start();
		} else {
			this.imgelm.onload = function() {
				this.start();
			};
		}
  }
	start() {
		this.imgobj.src = this.imgelm.getAttribute('src');
		if (this.imgobj.complete) {
			this.initialize();
		} else {
			this.imgobj.onload = function() {
				this.initialize();
			};
		}
	}
	initialize(){
		this.canvasWidth = this.imgobj.width;
		this.canvasHeight = this.imgobj.height;
		this.canvas = document.createElement("canvas");
		if (!this.canvas || !this.canvas.getContext) return false;
		this.ctx = this.canvas.getContext("2d");
		this.canvas.width = this.canvasWidth;
		this.canvas.height = this.canvasHeight;
		this.drawAll();
		this.imgelm.src = this.canvas.toDataURL();
	}
	drawAll(){
		this.ctx.drawImage(this.imgobj, 0, 0);
		for (const mydata of this.data){
			if (mydata.id === undefined) this.drawRect(mydata.x, mydata.y, mydata.w, mydata.h, this.fcolor);
			else this.drawNum(mydata.x, mydata.y, mydata.v, mydata.id, this.fcolor);
		}
	}
	drawNum(x,y,deg,str,color){
		const ctx = this.ctx;
		ctx.font = this.font;
		ctx.strokeStyle = this.bcolor;
		ctx.lineWidth = this.witeWidth;
		ctx.textAlign = "center";
		ctx.strokeText (str, x, y + this.radius / 2);
		ctx.fillStyle = color;
		ctx.fillText(str, x, y + this.radius / 2);

		ctx.strokeStyle = this.bcolor;
		ctx.lineWidth = this.lineWidth + this.witeWidth;
		ctx.beginPath();
		ctx.arc(x, y, this.radius, 0, Math.PI * 2, false);
		ctx.stroke();

		if (deg != -1) {
			ctx.lineWidth = this.witeWidth;
			this.drawTriangle(x,y,deg);
			ctx.stroke();
			ctx.fillStyle = color;
			this.drawTriangle(x,y,deg);
			ctx.fill();
		}

		ctx.strokeStyle = color;
		ctx.lineWidth = this.lineWidth;
		ctx.beginPath();
		ctx.arc(x, y, this.radius, 0, Math.PI * 2, false);
		ctx.stroke();
	}

	drawRect(x, y, w, h, color){
		const ctx = this.ctx;
		ctx.strokeStyle = this.bcolor;
		ctx.lineWidth = this.lineWidth + 2;
		ctx.beginPath();
		ctx.strokeRect(x, y, w, h);
		ctx.strokeStyle = color;
		ctx.lineWidth = this.lineWidth;
		ctx.beginPath();
		ctx.strokeRect(x, y, w, h);
	}

	drawTriangle(x, y, deg){
		const ctx = this.ctx;
		let rad = 0;
		ctx.beginPath();
		rad = deg * this.toRad;
		ctx.moveTo(x + Math.round(Math.cos(rad)*(this.radius + this.pointerLength)), y + Math.round(Math.sin(rad)*(this.radius + this.pointerLength)));
		rad = deg * this.toRad + this.pointerBaseRad;
		ctx.lineTo(x + Math.round(Math.cos(rad)*this.radius), y + Math.round(Math.sin(rad)*this.radius));
		rad = deg * this.toRad - this.pointerBaseRad;
		ctx.lineTo(x + Math.round(Math.cos(rad)*this.radius), y + Math.round(Math.sin(rad)*this.radius));
		ctx.closePath();
	}
}
class ContextFetcher {
  constructor(str){
    this.str = str;
    this.canvas = document.getElementById("hiddenCanvas");
    this.ctx = this.canvas.getContext('2d');
    this.init();
  }
  init(){
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
  }
  fetch(){
    const W = this.canvas.width;
    const H = this.canvas.height;
    this.ctx.clearRect(0, 0, W, H);
    const CANVAS_RADIUS = Math.min(W,H)/2 * Math.sqrt(3)/2;
    const SIZE = 80;
    this.ctx.font = SIZE + "px SAO";
    const strs = this.str.split("\n");
    const width = strs.map(str => this.ctx.measureText(str).width).reduce((a,b) => a > b ? a : b);
    const height = strs.length * SIZE;
    const textRadius = Math.sqrt(width*width+height*height)/2;
    const scale = CANVAS_RADIUS / textRadius;
    this.ctx.font = Math.floor(SIZE * scale) + "px SAO";
    strs.forEach((str, i) => {
      this.ctx.fillText(str, this.canvas.width / 2, this.canvas.height / 2 + SIZE * scale * (i-strs.length/2+0.5));
    });
    const uri = this.canvas.toDataURL();
    return uri;
  }
}

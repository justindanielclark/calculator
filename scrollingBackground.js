

const background = {
    canvas: document.querySelector(`#scrollingBackground`),
    colors: [],
    boxSize: 100,
    shiftX: 3,
    shiftY: -2,
    shiftXTotal: 0,
    shiftYTotal: 0,
    insetShift: null,
    init: function(){
        this.canvas.width = this.canvas.getBoundingClientRect().width;
        this.canvas.height = this.canvas.getBoundingClientRect().height;

        this.colors.push(this.generatePastelColor());
        this.colors.push(this.generatePastelColor(this.colors[0]));

        this.insetShift = this.boxSize/10;
        
    },
    draw: function(){
        let ctx = this.canvas.getContext(`2d`);
        for (let i = -2; i < Math.floor(this.canvas.width/this.boxSize)+1; i++){
            for (let j = -2; j < Math.floor(this.canvas.height/this.boxSize)+1; j++){
                let x = i*this.boxSize+this.shiftXTotal;
                let y = j*this.boxSize+this.shiftYTotal;
                let xDiff = (i+1)*this.boxSize+this.shiftXTotal;
                let yDiff = (j+1)*this.boxSize+this.shiftYTotal;

                let color = this.colors[Math.abs((i+j))%2];
                let grd = ctx.createLinearGradient(x, y, xDiff, yDiff);
                grd.addColorStop(0, color);
                grd.addColorStop(.5, `hsl(${color.hue}, ${color.saturation}%, ${color.lightness+10}%)`);
                grd.addColorStop(1, color);
                ctx.fillStyle = grd;
                ctx.fillRect(x, y, xDiff, yDiff);
                
                ctx.fillStyle = color.lighter();
                ctx.beginPath();
                ctx.moveTo(x, yDiff);
                ctx.lineTo(x+this.insetShift, yDiff-this.insetShift)
                ctx.lineTo(x+this.insetShift, y+this.insetShift)
                ctx.lineTo(xDiff-this.insetShift, y+this.insetShift)
                ctx.lineTo(xDiff, y)
                ctx.lineTo(x, y)
                ctx.fill();

                ctx.fillStyle = color.darker();
                ctx.beginPath();
                ctx.moveTo(x, yDiff);
                ctx.lineTo(x+this.insetShift, yDiff-this.insetShift);
                ctx.lineTo(xDiff-this.insetShift, yDiff-this.insetShift);
                ctx.lineTo(xDiff-this.insetShift, y+this.insetShift);
                ctx.lineTo(xDiff, y);
                ctx.lineTo(xDiff, yDiff);
                ctx.fill();
            }
        }
        this.shiftXTotal = (this.shiftXTotal - this.shiftX)%this.boxSize
        this.shiftYTotal = (this.shiftYTotal - this.shiftY)%this.boxSize
    },
    generatePastelColor: function(color = null){
        if(!color){
            return {hue: 360*Math.random(),
                saturation: 20,
                lightness: 75,
                toString: function(){
                    return `hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%)`;
                },
                lighter: function(){
                    return `hsl(${this.hue}, ${this.saturation}%, ${this.lightness + 10}%)`
                },
                darker: function(){
                    return `hsl(${this.hue}, ${this.saturation}%, ${this.lightness - 10}%)`
                }
            } 
        } else {
            return {hue: (color.hue + 100) % 360,
                saturation: color.saturation,
                lightness: color.lightness,
                toString: function(){
                    return `hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%)`;
                },
                lighter: function(){
                    return `hsl(${this.hue}, ${this.saturation}%, ${this.lightness + 10}%)`
                },
                darker: function(){
                    return `hsl(${this.hue}, ${this.saturation}%, ${this.lightness - 10}%)`
                }
            }
        } 
    },
    setUpdateTimer: function(timer){
        setInterval(()=>{this.draw()}, 50)
    }
}

background.init();
background.draw();




const Calculator= {
    heldNumber: null,
    heldOperand: null,
    displayNumber: null,
    DisplayEl: document.querySelector(`#display`),
    OperandDisplayEl: document.querySelector(`#operand`),
    HeldDisplayEL: document.querySelector(`#held`),
    keysDownMap: new Map(),
    keysMap: new Map(),
    divideByZeroMessage: `lol no`,

    init: function(){
        this.keysMap.set(`0`, `number`);
        this.keysMap.set(`1`, `number`);
        this.keysMap.set(`2`, `number`);
        this.keysMap.set(`3`, `number`);
        this.keysMap.set(`4`, `number`);
        this.keysMap.set(`5`, `number`);
        this.keysMap.set(`6`, `number`);
        this.keysMap.set(`7`, `number`);
        this.keysMap.set(`8`, `number`);
        this.keysMap.set(`9`, `number`);
        this.keysMap.set(`.`, `number`);
        this.keysMap.set(`+`, `operand`);
        this.keysMap.set(`-`, `operand`);
        this.keysMap.set(`/`, `operand`);
        this.keysMap.set(`*`, `operand`);
        this.keysMap.set(`Enter`, `operation`)
        this.keysMap.set(`Backspace`, `operation`);
        this.keysMap.set(`Delete`, `operation`);

        window.addEventListener('keydown', (e)=>this.handleKeyDown(e));

        window.addEventListener('keyup', (e)=>this.handleKeyUp(e));

        document.querySelectorAll(`#calculator>button`).forEach(btn=>{
            btn.addEventListener('click', (e)=>this.handleButton(e));
        });
    },
    handleKeyDown: function(e){
        if (this.keysMap.get(e.key) && !this.keysDownMap.get(e.key)){
            this.keysDownMap.set(e.key, true);
            if (this.keysMap.get(e.key) === `number`){
                this.handleNumber(e.key);
            }
            if (this.keysMap.get(e.key) === `operand`){
                this.handleOperand(e.key);
            }
            if (this.keysMap.get(e.key) === `operation`){
                this.handleOperation(e.key);
            }
        }
    },
    handleKeyUp: function(e){
        if (this.keysDownMap.get(e.key)){
            this.keysDownMap.delete(e.key);
        }
    },
    handleButton: function(e){
        if (e.target.dataset.operand){
            this.handleOperand(e.target.dataset.operand);
        }
        else if (e.target.dataset.operation){
            this.handleOperation(e.target.dataset.operation);
        }
        else if (e.target.dataset.number){
            this.handleNumber(e.target.dataset.number);
        }
    },
    handleNumber: function(number){
        if(this.displayNumber === this.divideByZeroMessage){return};
        number = number.toString();
        if (number === `.`){
            if (this.displayNumber === null){
                this.displayNumber = `0.`;
            } else if (!this.displayNumber.includes(`.`)){
                this.displayNumber += number;
            }
        } else if (number === `0`){
            if (this.displayNumber === null){
                this.displayNumber = `0`
            } else if (this.displayNumber === `0`){
                return;
            } else {
                this.displayNumber += '0';
            }
        } else {
            if (this.displayNumber === `0`){
                this.displayNumber = number;
            } else if (this.displayNumber === null){
                this.displayNumber = number;
            }
            else {
                this.displayNumber += number;
            }
        }
        this.updateView();
    },
    handleOperand: function(operand){
        if (this.displayNumber !==  this.divideByZeroMessage){
            if (this.heldNumber !== null && this.heldOperand === operand && this.displayNumber !== null){
                switch(operand){
                    case `+`: {
                        this.heldNumber = math.format((math.add(math.bignumber(this.heldNumber), math.bignumber(this.displayNumber))), {notation: `fixed`}).toString();
                        break;
                    }
                    case `-`: {
                        this.heldNumber = math.format((math.subtract(math.bignumber(this.heldNumber), math.bignumber(this.displayNumber))), {notation: `fixed`}).toString();
                        break;
                    }
                    case `/`: {
                        if(this.displayNumber === `0`){
                            this.heldNumber = null;
                            this.displayNumber = `lol no`;
                            return;
                        } else {
                            this.heldNumber = math.format((math.divide(math.bignumber(this.heldNumber), math.bignumber(this.displayNumber))), {notation: `fixed`}).toString();
                        }
                        break;
                    }
                    case `*`: {
                        this.heldNumber = math.format((math.multiply(math.bignumber(this.heldNumber), math.bignumber(this.displayNumber))), {notation: `fixed`}).toString();
                        break;
                    }
                }
                this.displayNumber = null;
            } else if(this.heldNumber !== null && this.heldOperand !== null && this.heldOperand !== operand && this.displayNumber !== null){
                this.handleOperand(this.heldOperand);
                this.heldOperand = operand;
            } else if (this.heldNumber !== null && this.heldOperand === null && this.displayNumber !== null){
                this.heldNumber = this.displayNumber;
                this.heldOperand = operand;
                this.displayNumber = null;
            } else if (this.heldNumber !== null && this.heldOperand === null && this.displayNumber === null){
                this.heldOperand = operand;
            } else if (this.heldNumber === null && this.heldOperand === null && this.displayNumber !== null){
                this.heldNumber = this.displayNumber;
                this.heldOperand = operand;
                this.displayNumber = null;
            } else if (this.heldNumber !== null && this.heldOperand !== null && this.heldOperand !== operand && this.displayNumber === null){
                this.heldOperand = operand;
            }
            this.updateView();
        }
    },
    handleOperation: function(operation){
        switch(operation){
            case `Delete`: {
                this.heldNumber = null;
                this.heldOperand = null;
                this.displayNumber = null;
                break;
            }
            case `Backspace`: {
                if(this.displayNumber === this.divideByZeroMessage){return};
                if(this.displayNumber !== null){
                    if (this.displayNumber.length === 1){
                        this.displayNumber = null;
                    } else {
                        this.displayNumber = this.displayNumber.slice(0,-1);
                    }
                }
                break;
            }
            case `Enter`: {
                if(this.displayNumber === this.divideByZeroMessage){return};
                if (this.heldOperand === null && this.displayNumber !== null){
                    this.heldNumber = this.displayNumber;
                    this.displayNumber = null;
                }
                else if (this.heldNumber !== null & this.heldOperand !== null && this.displayNumber !== null){
                    this.handleOperand(this.heldOperand);
                    this.heldOperand = null;
                } else if (this.heldNumber !== null & this.heldOperand !== null && this.displayNumber === null){
                    this.heldOperand = null;
                }
                break;
            }
        }
        this.updateView();
    },
    updateView: function(){
        if(this.heldNumber !== null){
            this.HeldDisplayEL.innerText = this.trimExcess(this.heldNumber);
        } else {
            this.HeldDisplayEL.innerText = null;
        }
        this.OperandDisplayEl.innerText = this.heldOperand;
        if(this.displayNumber !== null){
            this.DisplayEl.innerHTML = this.trimExcess(this.displayNumber);
        } else {
            this.DisplayEl.innerHTML = null;
        }
    },
    trimExcess: function(numString){
        if(numString.length < 14){return numString}
        let decimalLoc = numString.indexOf(`.`)
        if(decimalLoc === -1){  
            return numString.slice(0,1) + `.` + numString.slice(1, 5) + `e${numString.length-1}`;
        }

        if(numString.startsWith(`0.`)){
            let count = 2;
            while(numString[count]===`0`){
                count++;
            }
            if(count === numString.length){
                return `0.0e-${count-2}`
            }
            return numString.slice(count, this.notToExceed(count+10, numString.length)) + `e-${count-1}`;
        }
        if(decimalLoc > 13){
            return numString.slice(0,1) + `.` + numString.slice(1,5) + `e${decimalLoc-1}`
        }
        return numString.slice(0,13);
    },
    notToExceed: function(value, max){
        if(value > max) return max;
        return value;
    }
}
const background = {
    canvas: document.querySelector(`#scrollingBackground`),
    colors: [],
    boxSize: 50,
    shiftX: 1,
    shiftY: 1,
    shiftXTotal: 0,
    shiftYTotal: 0,
    insetShift: null, // set as 1/10th of boxSize in init();
    init: function(){
        this.setWidthAndHeight();
        this.colors.push(this.generatePastelColor());
        this.colors.push(this.generatePastelColor(this.colors[0]));
        this.insetShift = this.boxSize/10;
        this.handleResize();
    },
    setWidthAndHeight: function(){
        this.canvas.width = this.canvas.getBoundingClientRect().width;
        this.canvas.height = this.canvas.getBoundingClientRect().height;
    },
    draw: function(){
        let ctx = this.canvas.getContext(`2d`);
        ctx.clearRect(0-this.boxSize, 0-this.boxSize, this.canvas.width+this.boxSize, this.canvas.height+this.boxSize);
        for (let i = -1; i < Math.floor(this.canvas.width/this.boxSize)+1; i++){
            for (let j = -1; j < Math.floor(this.canvas.height/this.boxSize)+1; j++){
                let x = i*this.boxSize+this.shiftXTotal;
                let xInset = i*this.boxSize+this.shiftXTotal+this.insetShift;
                let y = j*this.boxSize+this.shiftYTotal;
                let yInset = j*this.boxSize+this.shiftYTotal+this.insetShift;
                let xDiff = (i+1)*this.boxSize+this.shiftXTotal;
                let xDiffInset = (i+1)*this.boxSize+this.shiftXTotal-this.insetShift;
                let yDiff = (j+1)*this.boxSize+this.shiftYTotal;
                let yDiffInset = (j+1)*this.boxSize+this.shiftYTotal-this.insetShift;

                let color = this.colors[Math.abs((i+j))%2];
                ctx.fillStyle = color;
                let grd = ctx.createLinearGradient(xInset, yInset, xDiffInset, yDiffInset);
                grd.addColorStop(0, color);
                grd.addColorStop(.5, `hsl(${color.hue}, ${color.saturation}%, ${color.lightness-15}%)`);
                grd.addColorStop(1, color);
                ctx.fillStyle = grd;
                ctx.fillRect(x, y, this.boxSize, this.boxSize);
                
                ctx.fillStyle = color.lighter();
                ctx.beginPath();
                ctx.moveTo(x, yDiff);
                ctx.lineTo(xInset, yDiffInset)
                ctx.lineTo(xInset, yInset)
                ctx.lineTo(xDiffInset, yInset)
                ctx.lineTo(xDiff, y)
                ctx.lineTo(x, y)
                ctx.fill();

                ctx.fillStyle = color.darker();
                ctx.beginPath();
                ctx.moveTo(x, yDiff);
                ctx.lineTo(xInset, yDiffInset);
                ctx.lineTo(xDiffInset, yDiffInset);
                ctx.lineTo(xDiffInset, yInset);
                ctx.lineTo(xDiff, y);
                ctx.lineTo(xDiff, yDiff);
                ctx.fill();
            }
        }
        this.shiftXTotal += this.shiftX;
        this.shiftYTotal += this.shiftY;

        if(this.shiftXTotal > this.boxSize){
            this.shiftXTotal = this.shiftXTotal % this.boxSize;
        }
        if(this.shiftYTotal > this.boxSize){
            this.shiftYTotal = this.shiftYTotal % this.boxSize
        }
        
    },
    handleResize(){
        window.addEventListener('resize', ()=>this.setWidthAndHeight());
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
            return {hue: (color.hue + 60) % 360,
                saturation: color.saturation,
                lightness: color.lightness,
                toString: function(){
                    return `hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%)`;
                },
                lighter: function(){
                    return `hsl(${this.hue}, ${this.saturation}%, ${this.lightness + 15}%)`
                },
                darker: function(){
                    return `hsl(${this.hue}, ${this.saturation}%, ${this.lightness - 20}%)`
                }
            }
        } 
    },
    setUpdateTimer: function(timer){
        setInterval(()=>{this.draw()}, 30)
    },
    clamp: function(value, min, max){
        if(value < min) return min;
        else if(value > max) return max;
        return value;
    }
}


Calculator.init();
background.init();
background.setUpdateTimer();
const Calculator= {
    heldNumber: null,
    heldOperand: null,
    displayNumber: null,
    DisplayEl: document.querySelector(`#display`),
    OperandDisplayEl: document.querySelector(`#operand`),
    HeldDisplayEL: document.querySelector(`#held`),
    keysDownMap: new Map(),
    keysMap: new Map(),

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
        if (this.heldNumber !== null && this.heldOperand === operand && this.displayNumber !== null){
            switch(operand){
                case `+`: {
                    this.heldNumber = (math.add(math.bignumber(this.heldNumber), math.bignumber(this.displayNumber))).toString();
                    break;
                }
                case `-`: {
                    this.heldNumber = (math.subtract(math.bignumber(this.heldNumber), math.bignumber(this.displayNumber))).toString();
                    break;
                }
                case `/`: {
                    this.heldNumber = (math.divide(math.bignumber(this.heldNumber), math.bignumber(this.displayNumber))).toString();
                    break;
                }
                case `*`: {
                    this.heldNumber = (math.multiply(math.bignumber(this.heldNumber), math.bignumber(this.displayNumber))).toString();
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
                if (this.heldNumber === null && this.heldOperand === null && this.displayNumber !== null){
                    this.heldNumber = this.displayNumber;
                    this.displayNumber = null;
                }
                else if (this.heldNumber !== null && this.heldOperand === null && this.displayNumber !== null){
                    this.heldNumber = this.displayNumber;
                    this.displayNumber = null;
                } else if (this.heldNumber !== null & this.heldOperand !== null && this.displayNumber !== null){
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
            this.HeldDisplayEL.innerText = this.heldNumber;
        } else {
            this.HeldDisplayEL.innerText = null;
        }
        this.OperandDisplayEl.innerText = this.heldOperand;
        if(this.displayNumber !== null){
            this.DisplayEl.innerHTML = this.displayNumber
        } else {
            this.DisplayEl.innerHTML = null;
        }
    }
}

Calculator.init();
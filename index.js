const Calculator= {
    heldNumber: ``,
    heldOperand: ``,
    displayNumber: `0`,
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

        window.addEventListener('keydown', (e)=>this.handleKeyDown(e));

        window.addEventListener('keyup', (e)=>this.handleKeyUp(e));

        document.querySelectorAll(`#calculator>button`).forEach(btn=>{
            btn.addEventListener('click', (e)=>this.handleButton(e));
        });
    },
    handleKeyDown: function(e){
        if(this.keysMap.get(e.key) && !this.keysDownMap.get(e.key)){
            this.keysDownMap.set(e.key, true);
            if(this.keysMap.get(e.key) === `number`){
                this.handleNumber(e.key);
            }
            if(this.keysMap.get(e.key) === `operand`){
                this.handleOperand(e.key);
            }
            if(this.keysMap.get(e.key) === `operation`){
                this.handleOperation(e.key);
            }
        }
    },
    handleKeyUp: function(e){
        if(this.keysDownMap.get(e.key)){
            this.keysDownMap.delete(e.key);
        }
    },
    handleButton: function(e){
        if(e.target.dataset.operand){
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
        if (number === `.`){
            if (!this.displayNumber.includes(`.`)){
                this.displayNumber += number;
                this.DisplayEl.innerText = this.displayNumber;
            }
        } else if (number === `0` && !(this.displayNumber === `0`)){
            this.displayNumber += number;
            this.DisplayEl.innerText = this.displayNumber;
        } else {
            if(this.displayNumber === `0`){
                this.displayNumber = number;
            } else {
                this.displayNumber += number;
            }
            this.DisplayEl.innerText = this.displayNumber;
        }
    },
    handleOperand: function(operand){
        switch(operand){
            case `+`: {
                if(this.heldNumber){
                    this.heldNumber = (parseFloat(this.heldNumber) + parseFloat(this.displayNumber)).toString();
                    this.HeldDisplayEL.innerText = this.heldNumber;
                    this.displayNumber = `0`;
                    this.DisplayEl.innerText = this.displayNumber;
                } else {
                    this.heldNumber = this.displayNumber;
                    this.HeldDisplayEL.innerText = this.displayNumber;
                    this.displayNumber = `0`;
                    this.DisplayEl.innerText = this.displayNumber;
                }
                this.OperandDisplayEl.innerText = `+`
                break;
            }
            case `-`: {
                break;
            }
            case `/`: {
                break;
            }
            case `*`: {
                break;
            }
        }

    },
    handleOperation: function(operation){
        switch(operation){
            case `Clear`: {
                if(this.displayNumber === `0`){
                    this.heldNumber = `0`;
                    this.HeldDisplayEL.innerText = `0`;
                    this.heldOperand = ``;
                    this.OperandDisplayEl.innerText = this.heldOperand;
                }
                this.displayNumber = `0`;
                this.DisplayEl.innerText = this.displayNumber;
                break;
            }
            case `Backspace`: {
                if(this.displayNumber.length === 1){
                    this.displayNumber = `0`;
                    this.DisplayEl.innerText = this.displayNumber;
                } else {
                    this.displayNumber = this.displayNumber.slice(0, -1);
                    this.DisplayEl.innerText = this.displayNumber;
                }
                break;
            }
            case `Enter`: {
                
                return;
                break;
            }
        }

    },
    updateView: function(){
        this.HeldDisplayEL.innerText = this.heldNumber;
        this.OperandDisplayEl.innerText = this.heldOperand;
        this.DisplayEl.innerHTML = this.displayNumber;
    }
}

Calculator.init();
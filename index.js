const Calculator= {
    heldNumber: ``,
    heldOperand: ``,
    displayNumber: `0`,
    DisplayEl: document.querySelector(`#display`),
    OperationDisplayEl: document.querySelector(`operation`),
    HeldDisplayEL: document.querySelector(`held`),
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
        this.keysMap.set(`Enter`, `operator`)
        this.keysMap.set(`Backspace`, `operator`);

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
        }
    },
    handleKeyUp: function(e){
        if(this.keysDownMap.get(e.key)){
            this.keysDownMap.delete(e.key);
        }
    },
    handleButton: function(e){
        if(e.target.dataset.operand){
            console.log(`operand`);
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

    },
    handleOperation: function(operation){
        switch(operation){
            case `Clear`: {
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
    
                break;
            }
        }

    }
}

Calculator.init();
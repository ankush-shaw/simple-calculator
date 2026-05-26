let btn = document.querySelectorAll('.btn');
let screen = document.getElementById('screen');


let a = 0;
let b = null;
let operator = null;

const clear = () => {
    screen.value = '';
    a = 0;
    b = null;
    operator = null;
};


btn.forEach(function (button) {
    button.addEventListener('click', function () {
        let value = this.innerText;
        if(value !== 'Undefined' && value !== 'NaN' && value !== 'Infinity'){
        
            if (value >= '1' && value <= '9') {
                screen.value += value;
            }
    
            else if (value === '0') {
                if (screen.value !== '') {
                    screen.value += value;
                }
            }
            else if (value === 'AC') {
                clear();
            }
    
            else if (value === '←') {
                screen.value = screen.value.slice(0, -1);
            }
    
            else if (value === '+' || value === '-' || value === '×' || value === '÷') {
                if(value === '-' && !screen.value){
                    screen.value = '-'
                }
                else{
    
                    a = Number(screen.value);
                    operator = value;
                    screen.value = '';
                }
            }
    
            else if (value === '=') {
                b = Number(screen.value);
                let result;
    
                switch (operator) {
                    case '+':
                        result = a + b;
                        break;
                    case '-':
                        result = a - b;
                        break;
                    case '×':
                        result = a * b;
                        break;
                    case '÷':
                        result = a / b;
                        break;
                }
    
                screen.value = result;
            }
    
            else if (value === '.') {
                if (screen.value && !screen.value.includes('.')) {
                    screen.value += '.';
                }
            }
    
            else if (value === '%') {
                screen.value = Number(screen.value) / 100;
            }
        }
    });
});

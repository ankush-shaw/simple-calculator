let btn = document.querySelectorAll('.btn');
let screen = document.getElementById('screen');


let a = null;
let b = null;
let operator = null;

const clear = () => {
    screen.value = '';
    a = null;
    b = null;
    operator = null;
};

const isBadDisplay = () => {
    return screen.value === 'NaN' || screen.value === 'Infinity' || screen.value === 'Error';
};

const getNumberFromScreen = () => {
    if (screen.value === '') return null;
    const n = Number(screen.value);
    return Number.isNaN(n) ? null : n;
};

const setError = () => {
    // Prevents the classic "NaN6" / "Infinity7" issue by resetting state.
    screen.value = 'Error';
    a = null;
    b = null;
    operator = null;
};


btn.forEach(function (button) {
    button.addEventListener('click', function () {
        let value = this.innerText;
        if(value !== 'Undefined' && value !== 'NaN' && value !== 'Infinity'){
        
            if (value >= '1' && value <= '9') {
                if (isBadDisplay()) screen.value = value;
                else screen.value += value;
            }
    
            else if (value === '0') {
                if (isBadDisplay()) {
                    screen.value = '0';
                } else if (screen.value !== '') {
                    screen.value += value;
                }
            }
            else if (value === 'AC') {
                clear();
            }
    
            else if (value === '←') {
                if (isBadDisplay()) {
                    screen.value = '';
                    return;
                }
                screen.value = screen.value.slice(0, -1);
            }
    
            else if (value === '+' || value === '-' || value === '×' || value === '÷') {
                if(value === '-' && !screen.value){
                    screen.value = '-'
                }
                else{
                    const curr = getNumberFromScreen();
                    if (curr === null) {
                        setError();
                        return;
                    }
                    a = curr;
                    operator = value;
                    screen.value = '';
                }
            }
    
            else if (value === '=') {
                const curr = getNumberFromScreen();
                if (operator === null || a === null || curr === null) return;

                b = curr;
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
                        if (b === 0) {
                            setError();
                            return;
                        }
                        result = a / b;
                        break;
                }
    
                if (Number.isNaN(result) || !Number.isFinite(result)) {
                    setError();
                    return;
                }

                screen.value = result;
                // After evaluation, we clear operator so the next number starts a fresh chain.
                operator = null;
            }
    
            else if (value === '.') {
                if (isBadDisplay()) {
                    screen.value = '0';
                }
                if (screen.value && !screen.value.includes('.')) {
                    screen.value += '.';
                }
            }
    
            else if (value === '%') {
                if (isBadDisplay()) return;
                const curr = getNumberFromScreen();
                if (curr === null) return;
                screen.value = curr / 100;
            }
        }
    });
});

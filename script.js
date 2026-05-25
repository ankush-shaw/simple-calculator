let btn = document.querySelectorAll('.btn');
let screen = document.getElementById('screen');
btn.forEach(function(button){
    if(button.innerText == 'AC'){
        button.addEventListener('click', function(){
            screen.value = '';
        });
    }
     else if(button.innerText === "←"){
        button.addEventListener('click', function(){
            screen.value = screen.value.slice(0, -1);
        });
    }
     else if(button.innerText === '='){
        button.addEventListener('click', function(){
            try {
                if (screen.value) {
                    screen.value = eval(screen.value);
                }
            } catch (e) {
                screen.value = "Error";
            }
        });
    }
    else if(button.innerText === 'x'){
        button.addEventListener('click', function(e){
            let value = e.target.innerText;
            screen.value += '*';
        });
    }
    else if(button.innerText === '÷'){
        button.addEventListener('click', function(e){
            let value = e.target.innerText;
            screen.value += '/';
        });}
        else if(button.innerText === '%'){
            button.addEventListener('click', function(e){
                let value = e.target.innerText;
                screen.value += '%';

            });}
    else{
        button.addEventListener('click', function(e){
            let value = e.target.innerText;
            screen.value += value;
        });
    }
});

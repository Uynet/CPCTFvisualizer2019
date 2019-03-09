let K = (function (){
    let up, down, left, right, w, s;
    up = down = left = right = w = s = false;

    const keys = {};
    const before = {};

    function keyDownFunc(e){
        if(e.keyCode != 82)e.preventDefault();
        if(e.keyCode == 37) left = true;
        if(e.keyCode == 38) up = true;
        if(e.keyCode == 39) right = true;
        if(e.keyCode == 40) down = true;
        if(e.keyCode == 83) s = true;
        if(e.keyCode == 87) w = true;
        keys[e.key] = true;
    };

    function keyUpFunc(e){
        e.preventDefault();
        if(e.keyCode == 37) left = false;
        if(e.keyCode == 38) up = false;
        if(e.keyCode == 39) right = false;
        if(e.keyCode == 40) down = false;
        if(e.keyCode == 83) s = false;
        if(e.keyCode == 87) w = false;
        keys[e.key] = false;
    };

    function isUp(){
        return up;
    };

    function isDown(){
        return down;
    };

    function isRight(){
        return right;
    };
    
    function isLeft(){
        return left;
    };

    function isW(){
        return w;
    };

    function isS(){
        return s;
    };

    return {
        // key states
        up: isUp,
        down: isDown,
        left: isLeft,
        right: isRight,
        w: isW,
        s: isS,
        // functions
        keyDownFunc: keyDownFunc,
        keyUpFunc: keyUpFunc,
        keys : keys,
        justPressed : key => keys[key] && !before[key],
        step : () => {
            for (let key in keys) {
                before[key] = keys[key];
                keys[key] = false;
            }
        }
    };
})();

window.addEventListener('keydown', K.keyDownFunc);
window.addEventListener('keyup', K.keyUpFunc);


export default class Input{

    // static ongoingTouches = [];
    static canvas = null;
    static ctx = null;

    constructor( _canvas ){
        Input.canvas    = _canvas;
        Input.ctx       = _canvas.getContext("2d");
        _canvas.addEventListener( "touchend", Input.handleEnd, false);
        // _canvas.addEventListener( "touchmove", Input.handleMove, false);
        _canvas.addEventListener( "touchstart", Input.handleStart, false);
        // _canvas.addEventListener( "touchcancel", Input.handleCancel, false);
    }

    static handleStart = (evt) => {
        evt.preventDefault();
        var ctx = Input.ctx;
        var touches = evt.changedTouches;
        const clientWidth = Input.canvas.clientWidth/2;
        const width = Input.canvas.width/2;
        debugger;
        for (var i = 0; i < touches.length; i++) {
            if( touches[i].pageX < clientWidth ){
                // Input.leftLabel.push({});
                ctx.fillRect(0, 0, width, width );
                console.log('left');
            } else {
                // Input.leftLabel.push({});
                console.log('right');
                ctx.fillRect(width, 0, width, width );
            }
            console.log(width);
            console.log(touches[i].pageX);
        }
    }

    // static handleEnd = (evt) => {
    //     evt.preventDefault();
    //     var ctx     = Input.ctx;
    //     var touches = evt.changedTouches;
    
    //     for (var i = 0; i < touches.length; i++) {
    //         console.log("touchstart:" + touches[i].pageX);

    //     }
    // }
    

    // static handleMove = (evt) => {
    //     evt.preventDefault();
    //     Input.log("moving");
    //     var el = document.getElementById("game");
    //     var ctx = el.getContext("2d");
    //     var touches = evt.changedTouches;
    
    //     for (var i = 0; i < touches.length; i++) {
    //         var color = Input.colorForTouch(touches[i]);
    //         var idx = Input.ongoingTouchIndexById(touches[i].identifier);
        
    //         if (idx >= 0) {
    //             console.log("continuing touch "+idx);
    //             ctx.beginPath();
    //             console.log("ctx.moveTo(" + Input.ongoingTouches[idx].pageX + ", " + Input.ongoingTouches[idx].pageY + ");");
    //             ctx.moveTo(Input.ongoingTouches[idx].pageX, Input.ongoingTouches[idx].pageY);
    //             console.log("ctx.lineTo(" + touches[i].pageX + ", " + touches[i].pageY + ");");
    //             ctx.lineTo(touches[i].pageX, touches[i].pageY);
    //             ctx.lineWidth = 4;
    //             ctx.strokeStyle = color;
    //             ctx.stroke();
        
    //             Input.ongoingTouches.splice(idx, 1, Input.copyTouch(touches[i]));  // swap in the new touch record
    //             console.log(".");
    //         } else {
    //             console.log("can't figure out which touch to continue");
    //         }
    //     }
    // }

    // static handleCancel = (evt) => {
    //     evt.preventDefault();
    //     console.log("touchcancel.");
    //     var touches = evt.changedTouches;

    //     for (var i = 0; i < touches.length; i++) {
    //         var idx = Input.ongoingTouchIndexById(touches[i].identifier);
    //         Input.ongoingTouches.splice(idx, 1);  // remove it; we're done
    //     }
    // }

    // static colorForTouch(touch) {
    //     var r = touch.identifier % 16;
    //     var g = Math.floor(touch.identifier / 3) % 16;
    //     var b = Math.floor(touch.identifier / 7) % 16;
    //     r = r.toString(32); // make it a hex digit
    //     g = g.toString(32); // make it a hex digit
    //     b = b.toString(32); // make it a hex digit
    //     var color = "#" + '0000ff';
    //     console.log("color for touch with identifier " + touch.identifier + " = " + color);
    //     return color;
    // }

    // static copyTouch(touch) {
    //     return { identifier: touch.identifier, pageX: touch.pageX, pageY: touch.pageY };
    // }

    // static ongoingTouchIndexById(idToFind) {
    //     for (var i = 0; i < Input.ongoingTouches.length; i++) {
    //         var id = Input.ongoingTouches[i].identifier;
            
    //         if (id === idToFind) {
    //             debugger;
    //             return i;
    //         }
    //     }
    //     return -1;
    // }

    // static log(msg) {
    //     var p = document.getElementById('log');
    //     p.innerHTML = msg + "\n" + p.innerHTML;
    // }
}
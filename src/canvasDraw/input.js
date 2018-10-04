export default class Input{

    static ctx = null;
    static labels = [];
    static video = null;
    static canvas = null;

    constructor( _canvas ){
        Input.canvas    = _canvas;
        Input.ctx       = _canvas.getContext("2d");
        Input.video     = document.getElementById("videoGamePlayer");
        _canvas.addEventListener( "touchend", Input.handleEnd, false);
        _canvas.addEventListener( "touchstart", Input.handleStart, false);
    }

    static handleStart = (evt) => {
        evt.preventDefault();
        var ctx = Input.ctx;
        var touches = evt.changedTouches;
        const clientWidth = Input.canvas.clientWidth/2;
        const width = Input.canvas.width/2;
        for (var i = 0; i < touches.length; i++) {
            if( touches[i].pageX < clientWidth ){
                Input.labels.push({
                    side: 'left',
                    value: true,
                    time: Input.video.currentTime
                });
                ctx.fillRect(0, 0, width, width );
            } else {
                Input.labels.push({
                    side: 'right',
                    value: false,
                    time: Input.video.currentTime
                });
                ctx.fillRect(width, 0, width, width );
            }
        }
    }
}
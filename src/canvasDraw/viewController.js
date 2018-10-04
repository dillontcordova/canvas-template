import View from './view';
let instance = null;

class ViewController {

    static viewList     = [];
    static ctx          = null;
    static canvasWidth  = null;
    static canvasHeight = null;
    static isLoaded     = false;

    constructor( _ctx, _canvasWidth, _canvasHeight ){
        if( instance ){throw new Error('Can not instantiate a singleton class twice');}
        instance                    = this;

        ViewController.ctx          = _ctx;
        ViewController.isLoaded     = false;
        ViewController.canvasWidth  = _canvasWidth;
        ViewController.canvasHeight = _canvasHeight;
        View.ctx                    = View.ctx || _ctx;
        View.canvasWidth            = View.canvasWidth || _canvasWidth;
        View.canvasHeight           = View.canvasHeight || _canvasHeight;
    }

    static getInstance = () => {
        if( !instance ){
		    return new ViewController(...arguments);
        }
        return instance;
    }
 
    static addView( _actor, _gameObject ){
        ViewController.viewList.push( new View(_actor, _gameObject.imageSheet, _gameObject.frames) );
        ViewController.isLoaded = false;
    }

    static load( cb ){
        return Promise.all( ViewController.viewList.map((view) => {
            return view.loadImage();
        }))
        .then((data) => {
            ViewController.ctx.clearRect( 0, 0, ViewController.canvasWidth, ViewController.canvasHeight );
            ViewController.isLoaded = true;
            cb( data );
        })
        .catch((e) => {
            console.error( e );
        })
    }

    static render() {
        // if( !ViewController.isLoaded ){
        //     throw new Error('need to load All images first');
        // }
        ViewController.ctx.clearRect( 0, 0, ViewController.canvasWidth, ViewController.canvasHeight );
        for( let i = ViewController.viewList.length - 1; i >= 0; i-- ){
            ViewController.viewList[i].render();
        }
    }
}

export default ViewController;
import View from './view';

class ViewController {

    constructor( _ctx, _canvasWidth, _canvasHeight ){
        this.viewList       = [];
        this.ctx            = _ctx;
        this.isLoaded       = false;
        this.canvasWidth    = _canvasWidth;
        this.canvasHeight   = _canvasHeight;
        View.ctx            = View.ctx || _ctx;
        View.canvasWidth    = View.canvasWidth || _canvasWidth;
        View.canvasHeight   = View.canvasHeight || _canvasHeight;
    }
 
    addView( _actor, _fileName, _metaPath){
        this.viewList.push( new View(_actor, _fileName, _metaPath) );
    }

    load( cb ){
        return Promise.all( this.viewList.map((view) => {
            return view.loadImage();
        }))
        .then((data) => {
            this.ctx.clearRect( 0, 0, this.canvasWidth, this.canvasHeight );
            this.isLoaded = true;
            cb( data );
        })
        .catch((e) => {
            console.error( e );
        })
    }

    render() {
        if( !this.isLoaded ){
            throw new Error('need to load images first');
        }

        this.ctx.clearRect( 0, 0, this.canvasWidth, this.canvasHeight );
        for( let i = this.viewList.length - 1; i >= 0; i-- ){
            this.viewList[i].render();
        }
    }
}

export default ViewController;
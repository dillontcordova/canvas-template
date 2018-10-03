export default class View {

    constructor( _model, _sheetFilePath, _sheetMetaPath ){
        this.curAnimationFrame  = 0;
        this.spriteWidth        = null;
        this.spriteHeight       = null;
        this.animationClips     = null;
        this.imageSheet         = null;
        this.sheetMeta          = null;
        this.model              = _model;
        this.sheetFilePath      = _sheetFilePath;
        this.sheetMetaPath      = _sheetMetaPath;
    }

    render() {
        const model = this.model;
        this.draw( model.x, model.y, model.width, model.height );
    }

    draw( _x, _y, _width, _height ){
        if( !_width || !_height ){
            if( this.imageSheet ){
                _width = this.imageSheet.width;
                _height = this.imageSheet.height;
            }
        }

        this.drawCurrentFrame( _x, _y, _width, _height );
    }

    drawCurrentFrame = ( _x, _y, _width, _height ) => {
        const sizes = this.sheetMeta.frames[this.curAnimationFrame].frame;
        View.ctx.drawImage( this.imageSheet,
                            sizes.x, sizes.y, sizes.w, sizes.h,
                            _x, _y, _width, _height
                            );
        this.nextFrame();
    }

    nextFrame(){
        ++this.curAnimationFrame;
        if( this.curAnimationFrame >= this.sheetMeta.frames.length ){
            this.curAnimationFrame = 0;
        }
    };

    readTextFile = (file, callback) => {
        var rawFile = new XMLHttpRequest();
        rawFile.overrideMimeType("application/json");
        rawFile.open("GET", file, true);
        rawFile.onreadystatechange = function() {
            if (rawFile.readyState === 4 && rawFile.status === 200) {
                return callback(null, rawFile.responseText);
            }
        }
        rawFile.send(null);
    }

    loadImage( ){
        const me = this;
        return new Promise((resolve, reject) => {
            const imageSheet         = new Image();
            imageSheet.crossOrigin   = 'anonymous';
            imageSheet.onload        = () => {
                View.ctx.drawImage( imageSheet, 0, 0 );

                me.readTextFile( me.sheetMetaPath, (err, sheetMetaText) => {
                    if( err ){
                        return reject(err);
                    }

                    me.imageSheet = imageSheet;
                    me.sheetMeta = JSON.parse(sheetMetaText);
                    resolve();
                })
            };
            imageSheet.src = me.sheetFilePath;
        });
    };
}

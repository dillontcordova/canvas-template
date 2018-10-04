import Actor from "./actor";
let instance = null;

export default class Game {

    static jsonPathList = [/*'./actorMetadata/coinTest.json', './actorMetadata/orangeRobot.json', */'./actorMetadata/roboSpeaking.json'];
    static gameObjects  = [];
    static canvas = null;
    static ctx = null;

    constructor( _canvas, _ctx ){
        if( instance ){throw new Error('Can not instantiate a singleton class twice');}
        instance = this;
        Game.ctx = _ctx;
        Game.canvas = _canvas;
    }

    static getInstance = () => {
        if( !instance ){
		    return new Game(...arguments);
        }
        return instance;
    }

    static setJsonPathList = (_jsonPathList) => {
        Game.jsonPathList = _jsonPathList;
    }

    static createGameObjects = ( cb ) => {
        Promise.all( Game.jsonPathList.map( jsonPath => {
            return Game.readTextFile( jsonPath );
        }))
        .then( jsonMetaList => {
            Promise.all( jsonMetaList.map( jsonMeta => {
                return Game.loadImage( jsonMeta );
            }))
            .then( gameObjects => {
                Game.gameObjects = gameObjects;
                gameObjects.forEach( gameObj => {
                    const actorWidth = 20;
                    const actorHeight = 20;
                    const startX = Game.canvas.width/2 - actorWidth/2;

                    new Actor( startX, gameObj.meta.startingY, actorWidth, actorHeight, gameObj );
                })
                cb( null, gameObjects );
            })
            .catch( e => {
                console.error( e );
                cb( e );
            });
        })
        .catch( e => {
            console.error( e );
            cb( e );
        });
    }

    static readTextFile = (file) => {
        return new Promise((resolve, reject)=>{
            var rawFile = new XMLHttpRequest();
            rawFile.overrideMimeType("application/json");
            rawFile.open("GET", file, true);
            rawFile.onreadystatechange = function() {
                if (rawFile.readyState === 4 && rawFile.status === 200) {
                    resolve( JSON.parse(rawFile.responseText) );
                }
            }
            rawFile.send(null);
        })
    }

    static loadImage( _jsonMeta ){
        const sheetFilePath = `./${_jsonMeta.meta.image}`;

        return new Promise((resolve, reject) => {
            const imageSheet         = new Image();
            imageSheet.crossOrigin   = 'anonymous';
            imageSheet.onload        = () => {
                resolve( {
                    imageSheet: imageSheet,
                    frames: _jsonMeta.frames,
                    meta: _jsonMeta.meta
                })
            };
            imageSheet.onerror = () => {
                reject(`[${sheetFilePath}] could not load properly`);
            }
            imageSheet.src = sheetFilePath;
        });
    };
}
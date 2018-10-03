import View from './view';
import ActorController from './actorController';
import ViewController from './viewController';
export default class Actor {

    constructor( x, y, w, h ){
        this._x = x;
        this._y = y;
        this._width = w;
        this._height = h;

        // ActorController.addActor(this);
        // ViewController.addView(this);
    }

    get x(){return this._x;}
    set x( _x ){this._x = _x;}

    get y(){return this._y;}
    set y(_y){this._y = _y;}

    get width(){return this._width;}
    set width(_width){this._width = _width;}

    get height(){return this._height;}
    set height(_height){this._height = _height;}

    
}
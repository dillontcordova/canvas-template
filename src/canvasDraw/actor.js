import ActorController from './actorController';
import ViewController from './viewController';
import Input from './input';
import AWS from 'aws-sdk';
export default class Actor {

    constructor( x, y, w, h, gameObject ){
        this._x     = x;
        this._y     = y;
        this._width = w;
        this._height= h;

        this.docClient = new AWS.DynamoDB.DocumentClient({service: new AWS.DynamoDB({region:'us-west-2'})})
        ActorController.addActor(this);
        ViewController.addView(this, gameObject);
    }

    tick = (_actors) => {
        // http request
        if(Input.labels.length){
            const assetParams = {
                TableName: 'labels',
                Item: {
                    id: '1234567890',
                    labels: Input.labels
                }
            };
            
            this.docClient.post(assetParams, (err, data) => {
                Input.labels = [];
            });
        }
	};

    get x(){return this._x;}
    set x( _x ){this._x = _x;}

    get y(){return this._y;}
    set y(_y){this._y = _y;}

    get width(){return this._width;}
    set width(_width){this._width = _width;}

    get height(){return this._height;}
    set height(_height){this._height = _height;}

    
}
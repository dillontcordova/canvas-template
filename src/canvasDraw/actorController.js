let instance = null;

class ActorController {

    static actorList = [];

    constructor( /*_input*/ ){
        if( instance ){throw new Error('Can not instantiate a singleton class twice');}
        instance    = this;
        // this.input  = _input;
    }

    static getInstance = () => {
        if( !instance ){
		    return new ActorController(...arguments);
        }
        return instance;
    }
 
    static addActor( _actor ){
        ActorController.actorList.push( _actor );
    }

    static tick() {
        for( let i = ActorController.actorList.length - 1; i >= 0; i-- ){
            ActorController.actorList[i].tick();
        }
    }
}

export default ActorController;
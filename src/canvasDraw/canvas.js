import React, { Component } from 'react';
import ViewController from './viewController';
import Actor from './actor';

class Canvas extends Component {

    constructor( props ){
        super( props );

        this.defaults = {
            render      : 60,
            calc        : 120,
            width       : 512,
            height      : 256,
            isRunning   : true,
            isPaused    : false
        };

        const ONE_SEC   = 1000;
        const CALC_FPS  = props.calcFps     || this.defaults.calc;
        const RENDER_FPS= props.renderFps   || this.defaults.render;

        this.frameCalcDuration  = ONE_SEC / CALC_FPS;
        this.frameRenderDuration= ONE_SEC / RENDER_FPS;
        this.width              = props.width       || this.defaults.width;
        this.height             = props.height      || this.defaults.height;
        this.isPaused           = props.isPaused    || this.defaults.isPaused;
        this.isRunning          = props.isRunning   || this.defaults.isRunning;
        this.canvas             = <canvas id="game" width={this.width} height={this.height}></canvas>;
    }

    defaultRenderFunction = (duration) => {
        return function(callback){
            setTimeout( callback, duration );     
        }
    }

    requestFrameToRenderOn = (callback) => {
        let renderFunction = this.defaultRenderFunction(this.frameRenderDuration);

        if( this.frameRenderDuration === this.defaults.render ){
            renderFunction = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || renderFunction;
        }

        return renderFunction(callback);
    };

    calcLoop = () => {
        if( this.isRunning ){
            // ActorController.tick();
            // PropsController.tick();
            // LevelController.tick();
            setTimeout( this.CalcLoop, this.frameCalcDuration );
        }
    };
    
    renderLoop = () => {
        if( this.isRunning && !this.isPaused ){
            this.viewCtrl.render();
            
            this.requestFrameToRenderOn( this.renderLoop );
        }
    };

    componentDidMount(){
        const canvas= document.getElementById("game");
        this.ctx    = canvas.getContext("2d");

        this.viewCtrl = new ViewController( this.ctx, this.width, this.height );
        this.viewCtrl.addView( new Actor(0,0,7,10), './coinTest.png', `${window.location.href}/coinTest.json` );
        this.viewCtrl.load( (data) => {
            debugger;
            this.renderLoop();
            this.calcLoop();
        });
    }

    render() {
        return (
            <section>
                {this.canvas}
            </section>
        );
    }
}

export default Canvas;

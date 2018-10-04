import React, { Component } from 'react';
import ViewController from './viewController';
import ActorController from './actorController';
import Input from './input';
import Game from './Game';

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
            ActorController.tick();
            setTimeout( this.calcLoop, this.frameCalcDuration );
        }
    };
    
    renderLoop = () => {
        if( this.isRunning && !this.isPaused ){
            ViewController.render();
            
            this.requestFrameToRenderOn( this.renderLoop );
        }
    };

    componentDidMount(){
        const canvas= document.getElementById("game");
        this.ctx    = canvas.getContext("2d");

        new Game( canvas , this.ctx );
        new Input( canvas );
        new ViewController( this.ctx, this.width, this.height );
        new ActorController( /*input*/ );

        Game.createGameObjects((err, data) => {
            this.renderLoop();
            this.calcLoop();
        });
    }

    render() {
        return (
            <div id="canvas-container">
                <canvas id="game"></canvas>
            </div>
        );
    }
}

export default Canvas;

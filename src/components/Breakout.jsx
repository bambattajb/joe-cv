import React, { Component } from 'react';
import {addToBreakoutHallOfFame} from '../actions';
import connect from "react-redux/es/connect/connect";
import Typography from '@material-ui/core/Typography';

const headerStyle = {
    fontSize : '45px',
    marginBottom : '10px',
    marginTop: '30px',
    clear: 'both'
};


class Breakout extends Component {

    static const = {
        canvas : {}, canvasContext : {},
        defaultBallSpeedX : 5,
        defaultBallSpeedY : 7
    };

    constructor(props) {
        super(props);

        this.state = {

            // Ball speed and start position
            ballX : 75,
            ballY : 75,
            ballSpeedX : 5,
            ballSpeedY : 7,

            // Paddle config
            paddleX : 400,
            paddleWidth : 100,
            paddleThickness : 10,
            paddleDistFromEdge : 60,

            // Brick config
            brickW : 80,
            brickH : 20,
            brickGap : 2,
            brickCols : 10,
            brickRows : 14,
            brickGrid : [], // This will be brickCols * brickRows

            // Declare mouse position vars
            mouseX : 0,
            mouseY : 0,

            // Amount of lives
            livesStart : 4, // Set to 4 = 3 lives (0 is a life)
            livesLeft : 0, // This will be set to default

            // Score
            score : 0,

            // Aesthetic bits
            fps : 30,
            loop : {}, // The game loop
            hallOfFame:[]
        };

        // IMPORTANT
        // Bind state to certain methods requiring most
        // up-to-date values for setState
        // MIGHT be a better way of doing this as it's a little messy
        this.init = this.init.bind(this);
        this.updateMousePos = this.updateMousePos.bind(this);
        this.ballReset = this.ballReset.bind(this);
        this.moveAll = this.moveAll.bind(this);
        this.playAgain = this.playAgain.bind(this);

    }

    isTopScorer() {
        const { hallOfFame } = this.props.hallOfFame;
        let lastTopScorer = hallOfFame[hallOfFame.length-1];
        if(this.state.score>lastTopScorer.score) {
            return true;
        }
        return false;
    }

    addToHallOfFame(name, score) {
        this.props.addToBreakoutHallOfFame({
            name,score
        });
    }

    componentDidMount() {

        Breakout.const.canvas = document.getElementById('breakout');
        Breakout.const.canvasContext = Breakout.const.canvas.getContext('2d');

        // Test canvas defined
        //console.log('CanvasContext:' + Breakout.const.canvasContext);

        // Start by drawing the scene
        this.drawScene();
        this.colorText("TO start game click START", Breakout.const.canvas.width/2, Breakout.const.canvas.height/2, 'white', 'center');
        let container   = document.getElementById('bWrapper');
        let startButton = document.createElement('button');
        startButton.setAttribute('style', 'position:absolute;top:52%;left:50%;margin-left:-36px');
        startButton.innerHTML = 'START';

        container.appendChild(startButton, container);


        var self = this;
        this.setState({
            loop : new this.loop(self)
        });

        startButton.addEventListener('click', function(e) {
            startButton.remove();
            self.init();
        });
    }

    init() {

        // Start loop
        if(!this.state.loop.isRunning()) {
            this.state.loop.start();
        }

        // Apply states
        // Pass an update function to setState so we can
        // get state data whilst running setState as per
        // https://reactjs.org/docs/faq-state.html
        this.setState((state) => {
                return {
                    brickGrid: [state.brickCols * state.brickRows],
                    livesLeft: state.livesStart
                }
            }
        );

        // Listen for mousemove and keep updating its position
        Breakout.const.canvas.addEventListener('mousemove', this.updateMousePos);

        // Add all the bricks
        this.brickReset();

        // Add the ball
        this.ballReset();

        // console.log(this.state);
    }

    /**
     * Event loop
     */
    loop(self) {
        var loop = false;
        var fps = self.state.fps;

        this.start = function() {
            loop = setInterval(() => self.updateAll(), 1000/fps);
        };
        this.stop = function () {
            clearInterval(loop);
            loop = false;
        };
        this.isRunning = function () {
            return loop !== false;
        };
    }

    /**
     * Publish changes to the view
     * Unless game over
     */
    updateAll() {
        if(this.state.livesLeft===0) {
            this.gameOver();
        } else {
            this.moveAll();
            this.drawAll();
        }
    }

    /**
     * Get position of mouse inside canvas
     * @param evt
     */
    updateMousePos(evt) {
        let rect = Breakout.const.canvas.getBoundingClientRect();
        let root = document.documentElement;

        this.setState((state) => {
            return {
                mouseX : evt.clientX - rect.left - root.scrollLeft,
                mouseY : evt.clientY - rect.top - root.scrollTop,
                paddleX : state.mouseX - state.paddleWidth / 2
            }
        });
    }

    /**
     * Position the bricks
     * iterate over brickCols * brickRows and assign number
     * to each brick in brickGrid array
     */
    brickReset() {
        var brickGrid = [];
        for(var i=0;i<this.state.brickCols * this.state.brickRows;i++) {
            brickGrid[i] = true;
        }
        this.setState({
            brickGrid : brickGrid
        });
    }

    /**
     * Reset the position of the ball
     * Somewhere in the middle of the scene
     */
    ballReset() {

        this.setState((state) => {
            return {
                ballX : Breakout.const.canvas.width/2,
                ballY : Breakout.const.canvas.height/2,

                // Reset ball speed to default as the speed varies
                // depending on where the ball hit the paddle
                ballSpeedX : Breakout.const.defaultBallSpeedX,
                ballSpeedY : Breakout.const.defaultBallSpeedY,

                // When ball is reset take a life
                livesLeft : state.livesLeft - 1
            }
        });

    }

    /**
     * Move the paddle and ball
     */
    moveAll() {
        // Ball is moving
        this.setState((state) => {
            return {
                ballX : state.ballX += state.ballSpeedX,
                ballY : state.ballY += state.ballSpeedY
            }
        });

        // Set the scene boundaries so the ball
        // can bounce off
        if(this.state.ballX > Breakout.const.canvas.width) { //left
            this.setState((state) => {
                return {
                    ballSpeedX : state.ballSpeedX *= -1
                }
            });
        }
        if(this.state.ballX < 0) { // right
            this.setState((state) => {
                return {
                    ballSpeedX : state.ballSpeedX *= -1
                }
            });
        }
        if(this.state.ballY < 0) { // top
            this.setState((state) => {
                return {
                    ballSpeedY : state.ballSpeedY *= -1
                }
            });
        }
        if(this.state.ballY > Breakout.const.canvas.height) { // bottom
            // If the ball goes out the bottom reset. Life is lost :(
            this.ballReset();
        }

        // Detect collision of the ball against the bricks
        // Get position of ball
        var ballBrickCol = Math.floor(this.state.ballX / this.state.brickW);
        var ballBrickRow = Math.floor(this.state.ballY / this.state.brickH);
        // ... check if the position of ball can return a brick array index...
        var brickIndexUnderBall = this.rowColToArrayIndex(ballBrickCol, ballBrickRow);

        // ... make sure the ball position has not the height of cols
        // or length of rows ...
        if(
            ballBrickCol >= 0 && ballBrickCol < this.state.brickCols &&
            ballBrickRow >= 0 && ballBrickRow < this.state.brickRows
        ) {

            // .. if array index is present and true ...
            if(this.state.brickGrid[brickIndexUnderBall]) {

                // .. set that particular brick to false ...
                var brickGrid = this.state.brickGrid;
                brickGrid[brickIndexUnderBall] = false;

                // .. and reverse the ball movement, update the brick grid
                // and the score ...
                this.setState((state) => {
                    return {
                        ballSpeedY: state.ballSpeedY *= -1,
                        brickGrid : brickGrid,
                        score : state.score + 10
                    }
                })
            }
        }

        // Detect collision off the paddle
        var paddleTopEdgeY = Breakout.const.canvas.height - this.state.paddleDistFromEdge;
        var paddleBottomEdgeY = paddleTopEdgeY + this.state.paddleThickness;
        var paddleLeftEdgeX = this.state.paddleX;
        var paddleRightEdgeX = paddleLeftEdgeX + this.state.paddleWidth;
        if(
            this.state.ballY > paddleTopEdgeY &&  // below the top of paddle
            this.state.ballY < paddleBottomEdgeY && // above bottom of paddle
            this.state.ballX > paddleLeftEdgeX && // right of the left side of paddle
            this.state.ballX < paddleRightEdgeX // left of the right side of paddle
        ) {
            this.setState((state) => {
                return {
                    ballSpeedY : state.ballSpeedY *= -1
                }
            });

            var centerOfPaddleX = this.state.paddleX + this.state.paddleWidth/2;
            var ballDistFromPaddleCenterX = this.state.ballX - centerOfPaddleX;

            // Increase the speed of the ball based on where it hit the paddle
            // 0.35 * the position of the ball from the middle of the paddle
            this.setState({
                ballSpeedX : ballDistFromPaddleCenterX * 0.35
            });
        }
    }

    /**
     * Draw just the scene
     */
    drawScene() {
        this.colorRect(0,0, Breakout.const.canvas.width,Breakout.const.canvas.height,'black'); // Scene
    }

    /**
     * Draw everything on screen
     */
    drawAll() {
        this.drawScene();
        this.colorCircle(this.state.ballX,this.state.ballY, 10, 'red'); // Ball
        this.colorRect(this.state.paddleX, Breakout.const.canvas.height - this.state.paddleDistFromEdge, this.state.paddleWidth, this.state.paddleThickness, 'white'); // Paddle

        this.drawBricks();

        // Position lives HUD in bottom left corner
        this.colorText("Lives: "+this.state.livesLeft, this.state.paddleDistFromEdge/2,Breakout.const.canvas.height - this.state.paddleDistFromEdge/2, 'white');
        // Position score HUD in bottom right corner
        this.colorText("Score:" + this.state.score, Breakout.const.canvas.width - 100, Breakout.const.canvas.height - this.state.paddleDistFromEdge/2, "white");
    }

    /**
     * Draw bricks on screen
     */
    drawBricks() {
        // For each row of bricks
        for(var eachRow=0;eachRow<this.state.brickRows;eachRow++) {
            // Put the amount of columns of bricks
            for (var eachCol=0; eachCol<this.state.brickCols;eachCol++) {
                // Add array index to each brick
                if (this.state.brickGrid[this.rowColToArrayIndex(eachCol, eachRow)]) {
                    // Draw the brick
                    this.colorRect(this.state.brickW*eachCol,this.state.brickH*eachRow, this.state.brickW-this.state.brickGap, this.state.brickH-this.state.brickGap, 'blue');
                }
            }
        }
    }

    /**
     * Play again after game over
     */
    playAgain() {
        this.setState((state) => {
            return {
                // Reset lives
                livesLeft : state.livesStart,
                // Reset score
                score : 0
            }
        });

        this.init();
    }

    /**
     * Show hall of fame
     */
    showHallOfFame() {
         const { hallOfFame } = this.props.hallOfFame;

         return (
             <div>
                 <Typography variant="headline">
                     <div style={headerStyle}>Hall of Fame</div>

                         {
                             hallOfFame.map(topScorer => {
                                 return (
                                     <div key={Math.random()}>
                                         {topScorer.name} -:- <b>{topScorer.score}</b>
                                     </div>
                                 )
                             })
                         }

                 </Typography>
             </div>
         )
    }

    showIntroText() {
        return (
            <div>
                <Typography variant="headline">
                    <div style={headerStyle}>Breakout!</div>
                    <p>This is a JavaScript (HTML5 Canvas) version of the classic 'Breakout' I've been working on.</p>
                    <p>I started this by following a tutorial and then I added my own functionality such as limiting lives and a scoring system with Hall of Fame.</p>
                    <p>I simply refactored the game code into a <b>React</b> component and used <b>Redux</b> to store and update the Hall of Fame entries.</p>
                    <p>Use the mouse to move the paddle left and right.</p>
                </Typography>
            </div>
        )
    }

    /**
     * All lives are lost and game has ended
     */
    gameOver() {
        let self = this;
        let container = document.getElementById('bWrapper');

        this.drawScene();
        if(this.isTopScorer() && this.state.score!==0) {
            let input = document.createElement('input');
            input.setAttribute('type', 'text');
            input.setAttribute('style', 'position:absolute;top:50%;left:50%;margin-left:-122px');
            input.addEventListener('keypress', function(ev) {
                if (ev.keyCode === 13) {
                    self.addToHallOfFame(this.value, self.state.score);
                    input.remove();

                    self.setState({
                        score: 0
                    });

                    self.state.loop.start();
                }
            });

            container.appendChild(input, container);
            this.colorText("You have a new high score. Please enter your name", Breakout.const.canvas.width/2, Breakout.const.canvas.height/2, 'white', 'center');


        } else {
            this.colorText("GAME OVER", Breakout.const.canvas.width/2, Breakout.const.canvas.height/2, 'white', 'center');

            let playAgainButton = document.createElement('button');
            playAgainButton.setAttribute('style', 'position:absolute;top:52%;left:50%;margin-left:-56.5px');
            playAgainButton.innerHTML = 'PLAY AGAIN';

            container.appendChild(playAgainButton, container);

            playAgainButton.addEventListener('click', function(ev) {
                playAgainButton.remove();
                self.playAgain();
            });
        }

        self.state.loop.stop();

    }

    /**
     * Render the component HTML
     * @returns {*}
     */
    render() {
        return(
            <div>
                {this.showIntroText()}
                <div id="bWrapper" style={{ position:'relative' }}>
                <canvas id="breakout" width="800" height="600"></canvas>
                </div>
                <br />
                {this.showHallOfFame()}
            </div>
        );
    }

    /**
     * Helper methods for drawing stuff
     * Just a little abstraction to simplify canvas methods
     */
    colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
        Breakout.const.canvasContext.fillStyle = fillColor;
        Breakout.const.canvasContext.fillRect(topLeftX,topLeftY, boxWidth, boxHeight);
    }

    colorCircle(centerX,centerY, radius, fillColor) {
        Breakout.const.canvasContext.fillStyle = fillColor;
        Breakout.const.canvasContext.beginPath();
        Breakout.const.canvasContext.arc(centerX,centerY, radius, 0,Math.PI*2, true);
        Breakout.const.canvasContext.fill();
    }

    colorText(showWords, textX, textY, fillColor, align) {
        Breakout.const.canvasContext.textAlign = align;
        Breakout.const.canvasContext.fillStyle = fillColor;
        Breakout.const.canvasContext.fillText(showWords, textX,textY);
    }

    // Return the brick index
    rowColToArrayIndex(col, row) {
        return col + this.state.brickCols * row;
    }
}

function mapStateToProps(state) {
    return {
        hallOfFame: state
    }
}

export default connect(mapStateToProps, {addToBreakoutHallOfFame})(Breakout);
import React, { Component } from "react";
import "./Title.css";

class Title extends Component
{   state =
    {   score: 0,
        updateScore: this.props.updateScore
    }
    
    incrementScore = () =>
    {   const newScore = this.state.score + 1;
        this.setState ({ score: newScore });
    }

    resetScore = () =>
    {   this.setState ({ score: 0 });
    }

    render ()
    {   return (
            <header className="header-div">
                <div className="title-div">Memory Game</div>
                <div className="score-div">
                    { this.state.score} correct in a row
                </div>
            </header>
        )
    }
}

export default Title;
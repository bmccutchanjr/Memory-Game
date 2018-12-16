import React, { Component } from "react";
import "./Card.css";

class Card extends Component
{   
    handleClick = event =>
    {   // The event handler for click events on the cards.  handleClick() checks to see if the card has
        // been clicked previously and then either resets the game (if the card has already been selected)
        // or increments the score (if it has not)

        event.preventDefault();

        // handleClick() originally did more than this, but when I realized that I couldn't use the
        // state property to keep track of selected cards (the state property belongs to the component,
        // which does not get shuffled when App.js shuffles animals[]).  But even though this function now
        // does very little, it still appears to be necessary.  I don't seem to be able to pass a parameter
        // to incrementScore() in JSX.

        this.props.incrementScore(this.props.id)
    }

    render ()
    {   return (
            <div className="card" onClick={ this.handleClick }>
                <img src={ this.props.image} alt={ this.props.name}/>
                <div className="name-div">{ this.props.name }</div>
            </div>
        )
    }
}

export default Card;
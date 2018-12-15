import React, { Component } from "react";
import "./Card.css";

class Card extends Component
{   
    // state =
    // {   isSeleted: false
    // }
    

    handleClick = event =>
    {   // The event handler for click events on the cards.  handleClick() checks to see if the card has
        // been clicked previously and then either resets the game (if the card has already been selected)
        // or increments the score (if it has not)
        event.preventDefault();

        //  If the card has already been selected.  That's the end of the game...
        // if (this.state.isSelected)
// alert("selected: " + this.props.isSelected)
        if (this.props.isSelected)
            this.props.resetGame()
        else
        {   // If the card has not been selected, set isSecelected to true and inctrement the score
            // this.setState({ isSelected: true })
            // this.props.incrementScore()
            this.props.incrementScore(this.props.id)
        }
    }

    render ()
    {   return (
            <div className="card" onClick={ this.handleClick }>
            {/* <div className="card" onClick={ this.props.incrementScore(this.props.id) }> */}
                <img src={ this.props.image} alt={ this.props.name}/>
                <div className="name-div">{ this.props.name }</div>
            </div>
        )
    }
}

export default Card;
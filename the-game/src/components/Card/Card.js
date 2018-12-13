import React, { Component } from "react";
import "./Card.css";

class Card extends Component
{   state =
    {   isSeleted: false
    }
    

    handleClick = event =>
    {   event.preventDefault();
        alert(`Name: ${ this.props.name }`)
    }

    render ()
    {   return (
            // <div className="card" onClick={ this.handleClick }>
            <div className="card" onClick={ this.props.incrementScore }>
                <img src={ this.props.image} alt={ this.props.name}/>
                <div className="name-div">{ this.props.name }</div>
            </div>
        )
    }
}

export default Card;
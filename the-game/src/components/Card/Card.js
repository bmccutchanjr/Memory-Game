import React, { Component } from "react";
import "./Card.css";

class Card extends Component
{   constructor (props)
    {   super (props);
        this.state =
        {   isSeleted: false
        }
    }

    render ()
    {   return (
            <div className="card">
                <img src={ this.props.image} alt={ this.props.name}/>
                <div className="name-div">{ this.props.name }</div>
            </div>
        )
    }
}

export default Card;
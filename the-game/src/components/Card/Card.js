import React, { Component } from "react";
import "./Card.css";

class Card extends Component
{   constructor (props)
    {   super (props);
        this.state =
        {   isSeleted: false
        }
    }

    handleClick ()
    {   alert("this.props.name")
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
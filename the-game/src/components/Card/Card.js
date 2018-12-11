import React from "react";
import "./Card.css";

const Card = props =>
(
    <div className="card">
        <img src={ props.image } alt={ props.name }/>
        <div className="name-div">{ props.name }</div>
    </div>
)

export default Card;
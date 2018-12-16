import React from "react";
import "./Title.css";

const Title = (props) =>
{   return (
        <header className="header-div">
            <div className="title-div">Memory Game</div>
            <div className="score-div">
                { props.score} correct in a row
            </div>
        </header>
    )
}

export default Title;
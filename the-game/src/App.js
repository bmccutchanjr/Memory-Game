import React, {Component} from "react";
import Card from "./components/Card";
import Title from"./components/Title";
import Wrapper from "./components/Wrapper";
import animals from "./animals.json";
import "./App.css";

class App extends Component
{   state = 
    {   animals,
        theScore: 0
    };

    // theScore = 1106;

    // incrementScore = () =>
    // {   this.score += 1;
    //     Title.theScore (this.score)
    // }
    incrementScore = () =>
    {   
        // alert("Score: " + this.theScore)
        const newScore = this.state.theScore + 1;
        this.setState({ theScore: newScore });
        // Title.setScore (this.theScore)
    }

    resetGame = () =>
    {   this.setState({ TheScore: 0 });
        // Title.theScore (this.score)
    }

    render ()
    {   return (
            <Wrapper>
                {/* <h1 className="title">Memory Game</h1> */}
                {/* <Title score = { 0 } /> */}
                <Title score = { this.state.theScore } />
                <main>
                    { this.state.animals.map(animal =>
                    (   <Card
                            name={ animal.name }
                            image={ animal.img }
                            incrementScore={ this.incrementScore }
                            resetGame={ this.resetGame }
                        />
                    ))}
                </main>
            </Wrapper>
        )
    }
};

export default App;

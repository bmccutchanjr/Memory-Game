import React, {Component} from "react";
import Card from "./components/Card";
import Title from"./components/Title";
import Wrapper from "./components/Wrapper";
import animals from "./animals.json";
import "./App.css";

class App extends Component
{
    state = 
    {   animals
    };

    render ()
    {   return (
            <Wrapper>
                {/* <h1 className="title">Memory Game</h1> */}
                <Title score = { 0 } />
                <main>
                    { this.state.animals.map(animal =>
                    (   <Card
                            name={animal.name}
                            image={animal.img}
                        />
                    ))}
                </main>
            </Wrapper>
        )
    }
};

export default App;

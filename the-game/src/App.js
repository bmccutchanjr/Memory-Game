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

    theCount = 0;

    randomize = () =>
    {   // Randomly arrange the animals to make the game more than trivial

        // First I need a copy of animals[] because React won't let me directly mutate properties
        // of state

        const aLen = animals.length;
        let newArray = [];
        for (let i=0; i<aLen; i++)
        {   newArray[i] = animals[i]
        }

        for (let i=aLen; i>=0; i--)
        {   // randomly select some index from the first i elements in the array
            //
            // i is initialized to qLen and decrements with each iteration.  A random number from 0 to 11
            // is chosen on the first iteration, 0 to 10 on the second, and so on.
            //
            // Remove the element from animals[] at the randomly selected index and .push() that value to the
            // end of the array.  The loop iterates, the range of the random number is reduced by 1 so that
            // the next randomly selected element is one that has not been selected previously.  The values
            // pushed to the end of the array cannot be chosen again

            var randomIndex = Math.floor(Math.random() * (i));

            // save the value of the element at randomIndex
            var saveIndex = newArray[randomIndex];

            // remove the randomly selected index from animals[]
            newArray.splice(randomIndex, 1);

            // and push the saved value to the end of animals[]
            newArray.push(saveIndex);
        }

        // Now I can mutate this.state.animals[]
        this.setState ({ animals: newArray })
    }

    // incrementScore = () =>
    incrementScore = (id) =>
    {
        // This function is used by <Card> to increment the score when a tile card has been guessed
        // correctly.  incrementScore() is passed to <Card> in props.

        // But first things first...  Reshuffling animals[] does not shuffle the <Card> components, just
        // the data rendered in the component.  So the state property of the <Card> component no longer
        // references the animal, but the component.  That means I can't track whether an animal has
        // been selected in the <Card> component.  I have to do it here.
        //
        // <Card> now gets the id of the animal object as well as the name and image url.  When the
        // <card> calls this function it will pass the id as a parameter so this function knows which
        // animal was selected.
        //
        // Keep in mind that the data has been shuffled, and the elements are no longer in numeric order
        // of id.  I need to find that element first...

        let index = 0;
        const aLen = this.state.animals.length;

        for (let i=0; i<aLen; i++)
        {   if (this.state.animals[i].id === id) index = i;
        }

        if (this.state.animals[index].isSelected)
        {   // This animal was selected previously...that's game over!
            this.resetGame()
        }
        else
        {
            // this.setState({ animals[index].isSelected: true });
            this.state.animals[index].isSelected = true;
            // this.setState({ [animals[index].isSelected]: true });
            this.setState({ theScore: this.state.theScore + 1 });

            this.theCount += 1;
            
            if (this.theCount === 12)
            {   // There are 12 cards.  The game is won if all the cards are selected.
alert("You won!")
                this.resetGame();
            }
            else
            {   // If the game isn't over, reanrrange the cards for the next guess
                this.randomize()
            }
        }
    }

    resetGame = () =>
    {   // Reset game properties and reshuffle the cards for the next round...

        this.setState({ theScore: 0 });
        this.randomize();
        this.theCount = 0;

        const aLen = this.state.animals.length;

        for (let i=0; i<aLen; i++)
        {   // Don't forget to reset isSelected!
        
            this.state.animals[i].isSelected = false;
        }
    }

    render ()
    {   return (
            <Wrapper>
                <Title score = { this.state.theScore } />
                <main>
                    { this.state.animals.map(animal =>
                    (   <Card
                            id={ animal.id }
                            name={ animal.name }
                            image={ animal.img }
                            isSelected={ animal.isSelected }
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

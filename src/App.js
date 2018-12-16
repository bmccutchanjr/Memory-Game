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
    loser = new Audio ("./audio/loser.mp3");
    tada = new Audio ("./audio/ta-da.mp3");
    ting = new Audio ("./audio/ting.mp3");

    playAudio (audio)
    {   // To be sure the audio is played each time, it must be loaded each time before it is played
    
        audio.load();
        audio.play();
    }

    randomize = () =>
    {   // Randomly arrange the animals to make the game a little more than trivial

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
            this.playAudio(this.loser)
            this.resetGame()
        }
        else
        {   // This animal has not been selected -- at least not during this round of play.  Set
            // animal[].isSelected = true for the animal indicated by the variable index.  Increment
            // theScore and use setState() to push theScore to <Title> and render the component.

            // I don't seem to be able to reference the isSelected property of the element in
            // animals[] in a call to setState().  Everything I tried is either a syntax error or
            // else had no effect.  But I only need to use setState() to signal React to render
            // components.  So, because animals[index].isSelected is not rendered on the page anywhere,
            // I can get away with directly mutating it's value.
            //
            // May not be kosher -- but it works

            // eslint-disable-next-line
            this.state.animals[index].isSelected = true;

            this.setState({ theScore: this.state.theScore + 1 });

            this.theCount += 1;
            
            // if (this.state.theScore === 12)
            if (this.theCount === 12)
            {   // There are 12 cards.  The game is won if all the cards are selected.

                // Although this.state.theScore increments correctly (the value rendered to the screen
                // increments as cards are selected) I don't appear to be able to reference it in this
                // if-block?  So I'm using an additional counter, theCount, to determine if the game
                // has been won.

                this.playAudio(this.tada);
                this.resetGame();
            }
            else
            {   // If the game isn't over, reanrrange the cards for the next guess
                this.playAudio(this.ting);
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

            // eslint-disable-next-line
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

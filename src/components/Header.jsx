import { getFarewellText } from "../messages.js";

export function Header(props){
     let farewellMessage=getFarewellText(props.farewellMessage)
    return(
        <header>
            <h1>Assembly: Endgame</h1>
            <p>Guess the word in under 9 attempts to keep the programming world safe from Assembly!</p>
            { props.farewellMessage && <div className="messageKilled">
                        <p>{farewellMessage}</p>
            </div>}
            {props.gameWon && <div className="messageWon">
                        <h2>YOU WIN!</h2>
                        <p>Well done!</p>
            </div>}
            {props.gameLost && <div className="messageLost">
                        <h2>Game Over</h2>
                        <p>You lose! Better start learning Assembly</p>
                        <p>- {props.word.toUpperCase()} -</p>
            </div>}
        </header>
    )
}
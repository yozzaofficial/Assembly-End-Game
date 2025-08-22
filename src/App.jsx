import { LettersKeyboard } from "./components/LettersKeyboard"
import { CodeLanguages } from "./components/CodeLangauges"
import { Header } from "./components/Header"
import { generate, count } from "random-words";
import { nanoid } from 'nanoid'
import React from "react"
import { Boxes } from "./components/Boxes";
import languages from "./languages.js";
import Confetti from 'react-confetti';
import keyboardJs from "./keyboard,js";
function App() {


  let [theWord, setTheWord] = React.useState(() => generate());
  const [letter,setLetter] = React.useState(theWordInLetters(theWord))
  const [langaugeCode,setLanguageCode] = React.useState(languages)
  const [farewellMessage, setFarewellMessage] = React.useState("")
  const [keyboard, setKeyboard] = React.useState(keyboardJs)

  function theWordInLetters(word){
    let letters =[]
    for(let i=0;i<word.length;i++){
       letters.push({
        id: nanoid(),
        letter:word.substring(i,i+1),
        isRev:false
      })
    }
    return letters
  }

   let liElement = letter.map((letterr)=>{
    return (
        <Boxes 
          key={letterr.id} 
          id={letterr.id} 
          isRev={letterr.isRev}
          value={letterr.letter}
        />
        
    )
})

const languageElement = langaugeCode.map(lan=>{
  return <CodeLanguages 
    key={lan.id}       
    id={lan.id}
    name={lan.name}
    color={lan.color}
    isDead={lan.isDead}
  />
})

const buttonkeyboard = keyboard.map(lett=>{
  return <LettersKeyboard 
    key={lett.letter}
    letter={lett.letter}
    color={lett.color}
    clickHandler={letterClicked}
  />
})

function letterClicked(letterClicked){
  const letterExists = letter.some(el => el.letter === letterClicked.toLowerCase());
  if(letterExists && !gameWon && !gameLost){

      setKeyboard(prev => prev.map(el => 
      el.letter === letterClicked
        ? { ...el, color: "#4CAF50" } 
        : el
    ));

       setFarewellMessage("")
       setLetter(prev =>prev.map(el => {
        if(el.letter === letterClicked.toLowerCase()) {
            return { ...el, isRev: true } }
        else
          return el 
    }
    ))
  }
  else{
        setKeyboard(prev => prev.map(el => 
      el.letter === letterClicked
        ? { ...el, color: "#B22222" } 
        : el
    ));
    killCode()
  }
}



function killCode(){
  setLanguageCode(prev => {
     let killed = false
    return prev.map(el=>{ if(!el.isDead && !killed){killed = true;getFarewellMessage(el.name);return{ ...el, isDead:true}}
                            else return el
   
                        }
                    )
  })
}

function getFarewellMessage(name){
  setFarewellMessage(name)
}

let gameLost = langaugeCode.every(lang => lang.isDead)
let gameWon = letter.every(lett => lett.isRev)

  function resetGame(){
    const newWord = generate()
    setTheWord(newWord)
    setLetter(theWordInLetters(newWord))
    setLanguageCode(languages)
    setKeyboard(keyboardJs)
  }
  return (
    <>
      <main>
        <Header farewellMessage={farewellMessage} gameLost={gameLost} gameWon={gameWon} word={theWord}/>
         <div className="codeLanguages">
          {languageElement}
        </div>
        <div className="boxContainer">
          <ul className="boxList">
            {liElement}
          </ul>
        </div>
        <div className="buttonsContainer" >
         {buttonkeyboard}
        </div>
        {(gameLost || gameWon) && <button onClick={resetGame} className="playAgain">Play again!</button>}
       {gameWon && <Confetti  gravity={0.4} recycle={false}/>}
      </main>
    </>
  )
}

export default App


export function LettersKeyboard(props){

    return(
      <button key={props.letter} onClick={() => props.clickHandler(props.letter)} style={{ backgroundColor: `${props.color}` }} >{props.letter}</button>
    )

}
// "#00cc66" : "#FFB300"
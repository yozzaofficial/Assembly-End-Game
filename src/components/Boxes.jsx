

export function Boxes(props){
    return(
        <li className={`${props.isRev ? 'rev' : ""}`} >{props.isRev ? props.value.toUpperCase() : ""}</li>
    )
}
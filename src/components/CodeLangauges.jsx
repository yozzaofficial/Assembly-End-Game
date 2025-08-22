import deadImg from "../assets/dead.png"
export function CodeLanguages(props){
    const style ={
        backgroundColor: `${props.isDead ? "black"  :props.color}`,
    }
    return(
        <span className={`${props.isDead ? 'dead' : ""}`} style={style}>{props.name}</span>
    )
}
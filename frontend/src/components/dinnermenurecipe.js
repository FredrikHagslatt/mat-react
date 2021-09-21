import '../css/myStyle.css';

function DinnerMenuRecipe(props){
    const day = props.day;
    return (
        <a href={props.recipe.url} className="item">
            <div className="desc">
                <h3>{day}</h3>
                <p>{props.recipe.name}</p>
            </div>
            <img 
                src={process.env.PUBLIC_URL + '/images/recipes/' + props.recipe.image} 
                alt={props.recipe.name}
            />
        </a>
    );
}export default DinnerMenuRecipe;
import '../css/myStyle.css';

function Recipe(props){
    if(props.showImg === true){
        return (
            <a href={props.recipe.url} className="item">
                <div className="desc">
                    <p>{props.recipe.name}</p>
                </div>
                <img 
                    src={process.env.PUBLIC_URL + '/images/recipes/' + props.recipe.image} 
                    alt={props.recipe.name} 
                />
            </a>
        );    
    }else{
        return (
            <a href={props.recipe.url}  className="item">
                <div className="desc">
                    <p>{props.recipe.name}</p>
                </div>
            </a>
        );
    }
}export default Recipe;
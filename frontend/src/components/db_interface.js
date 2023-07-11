class DBInterface {
    constructor() {
        this.name = '';
        this.age = 0;
        this.dinnerMenu = {};
        this.moreRecipes = {};
    }


    GetDinnerMenu() {
        return (fetch('/api/dinnermenu')
            .then((response) =>
                response.json())
            .then((response) => response.data)
        );
    }


    GetMoreRecipes() {
        return (fetch('/api/morerecipes')
            .then((response) =>
                response.json())
            .then((response) => response.data)
        );
    }


    GetRecipe(id) {
        return (fetch('/api/recipe',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 'id': id }),
            })
            .then((response) =>
                response.json())
            .then((response) => response.data)
        );
    }


    AddRecipe() {
    }

} export default DBInterface;

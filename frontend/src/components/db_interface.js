class DBInterface {
    constructor() {
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


    static async addExternalRecipe(name, url) {
        try {
            const response = await fetch('/api/addrecipe/external', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, url }),
            });

            if (!response.ok) {
                throw new Error('Failed to add external recipe');
            }

            const data = await response.json();
        } catch (error) {
            throw error; // Rethrow the error to handle it in the frontend
        }
    }


    static async addInternalRecipe(name, description, ingredients) {
        try {
            const response = await fetch('/api/addrecipe/internal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, description, ingredients }),
            });


            const data = await response.json();
            if (!response.ok) {
                if (data && data.error) {
                    throw new Error(data.error);
                }
                throw new Error('Failed to add internal recipe');
            }

        } catch (error) {
            throw error; // Rethrow the error to handle it in the frontend
        }
    }
}

export default DBInterface;

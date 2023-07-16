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
            console.log(data); // Success message or other response data
        } catch (error) {
            console.error('Error adding external recipe:', error);
            // Handle the error
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

            if (response.ok) {
                // Recipe added successfully
                console.log('Internal recipe added successfully!');
                // Optionally, you can perform additional actions or show a success message to the user
            } else {
                // Failed to add recipe
                console.error('Failed to add internal recipe:', response.statusText);
                // Optionally, you can handle the error or show an error message to the user
            }
        } catch (error) {
            console.error('Error adding internal recipe:', error);
            // Optionally, you can handle the error or show an error message to the user
        }
    }


    AddRecipe() {
    }

} export default DBInterface;

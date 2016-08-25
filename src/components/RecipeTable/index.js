import React, { PropTypes } from 'react';

const IngredientsList = ({ ingredients, filterRecipesByIngredient }) => (
    <span>
        {ingredients.map((ingredient, idx) => {
            return (
                <span key={idx}>
                    <a href="#" onClick={filterRecipesByIngredient.bind(this, ingredient)}>{ingredient}</a>
                    {idx < ingredients.length - 1 ? ', ' : ''}
                </span>
            );
        })}
    </span>
);

IngredientsList.propTypes = {
    ingredients: PropTypes.array,
    filterRecipesByIngredient: PropTypes.func
};

IngredientsList.defaultProps = {
    ingredients: []
};

const RecipeTable = ({ recipes, filterRecipesByIngredient, toggleRecipe, selectedIngredient }) => (
    <table className="table table-bordered table-hover">
        <thead>
            <tr>
                <th>&nbsp;</th>
                <th>Name</th>
                <th>Type</th>
                <th>Cook Time</th>
                <th>
                    Ingredients
                    <span className={selectedIngredient ? 'show' : 'hidden'}>
                        <button className="btn btn-warning btn-xs" onClick={filterRecipesByIngredient.bind(this, '')}>
                            {selectedIngredient}
                        </button>
                    </span>
                </th>
            </tr>
        </thead>
        <tbody className="table-striped">
            {recipes.map((r, idx) => (
                <tr key={idx} className={r.selected ? 'active': ''}>
                    <td><input type="checkbox" onChange={toggleRecipe.bind(this, [r.name])} checked={r.selected} /></td>
                    <td>{r.name}</td>
                    <td>{r.type}</td>
                    <td>{r.cook_time}</td>
                    <td><IngredientsList ingredients={r.ingredients} filterRecipesByIngredient={filterRecipesByIngredient}/></td>
                </tr>
            ))}
        </tbody>
    </table>
);

RecipeTable.propTypes = {
    recipes: PropTypes.array,
    filterRecipesByIngredient: PropTypes.func,
    toggleRecipe: PropTypes.func,
    selectedIngredient: PropTypes.string
};

RecipeTable.defaultProps = {
    recipes: []
};

export default RecipeTable;

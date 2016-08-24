import { createSelector } from 'reselect';

const GET_RECIPES = 'GET_RECIPES';
const FILTER_RECIPES_BY_INGREDIENT = 'FILTER_RECIPES_BY_INGREDIENT';
const TOGGLE_RECIPES = 'TOGGLE_RECIPE';

export const ActionTypes = {
    GET_RECIPES,
    FILTER_RECIPES_BY_INGREDIENT,
    TOGGLE_RECIPES
}

// Action Creators
const getRecipes = () => ({
    type: GET_RECIPES,
    payload: require('./recipes.json')
});

const toggleRecipe = (name) => ({
    type: TOGGLE_RECIPES,
    payload: name
});

const filterRecipesByIngredient = (ingredient) => ({
    type: FILTER_RECIPES_BY_INGREDIENT,
    payload: ingredient
});

export const Actions = {
    getRecipes,
    toggleRecipe,
    filterRecipesByIngredient
};

// Reducer
const initialState = {
    data: [],
    selectedIngredient: undefined
};

export const recipesReducer = (state = initialState, action) => {
    switch (action.type) {
    case GET_RECIPES: {
        return { ...state, data: action.payload };
    }
    case FILTER_RECIPES_BY_INGREDIENT: {
        return { ...state, selectedIngredient: action.payload };
    }
    case TOGGLE_RECIPES: {
        const data = state.data.map(recipe => {
            if (action.payload.indexOf(recipe.name) === -1) {
                return recipe;
            }

            return {
                ...recipe,
                selected: !recipe.selected
            };
        });

        return { ...state, data };
    }
    default: {
        return state;
    }
    }
};

// Selectors
const getSelectedIngredientFilter = (state) => state.selectedIngredient;

const getRecipesList = (state) => state.data;

const selectRecipesByIngredient = createSelector(
    [getSelectedIngredientFilter, getRecipesList],
    (selectedIngredientFilter, recipes) => {
        if (!selectedIngredientFilter) {
            return recipes;
        }
        return recipes.filter(recipe =>
            recipe.ingredients.find(ingredient =>
                ingredient.toLowerCase() === selectedIngredientFilter.toLowerCase()));
    }
);


const selectIngredientsFromSelectedRecipes = createSelector(
    [getRecipesList],
    (recipes) => recipes
            .filter(recipe => recipe.selected)
            .map(r => r.ingredients)
            .reduce((prev, curr) => prev.concat(curr).filter((ingredient, idx, arr) => arr.indexOf(ingredient) === idx), [])
            .sort()
);

export const Selectors = {
    selectRecipesByIngredient,
    selectIngredientsFromSelectedRecipes
};

export default recipesReducer;

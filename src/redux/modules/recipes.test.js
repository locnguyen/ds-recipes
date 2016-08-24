import { expect } from 'chai';
import { ActionTypes, Actions, recipesReducer, Selectors } from './recipes';

describe('Recipe actions', () => {
    it('should create an action for getting recipes', () => {
        const expectedAction = {
            type: ActionTypes.GET_RECIPES,
            payload: require('./recipes.json')
        };

        expect(Actions.getRecipes()).to.eql(expectedAction)
    });

    it('should create an action for toggling a recipe', () => {
        const expectedAction = {
            type: ActionTypes.TOGGLE_RECIPES,
            payload: 'Hummus'
        };

        expect(Actions.toggleRecipe('Hummus')).to.eql(expectedAction);
    });

    it('should create an action for filtering the recipes by one ingredient', () => {
        const expectedAction = {
            type: ActionTypes.FILTER_RECIPES_BY_INGREDIENT,
            payload: 'Milk'
        };

        expect(Actions.filterRecipesByIngredient('Milk')).to.eql(expectedAction);
    })
});

describe('Recipes reducer', () => {
    it('should return an array of recipes in the state', () => {
        const reducerResult = recipesReducer(undefined, Actions.getRecipes())
        expect(reducerResult.data).to.eql(require('./recipes.json'));
    });

    it('should toggle the boolean value when toggling a recipe', () => {
        const state = {
            data: [{
                'name': 'Enchiladas',
                'type': 'Mexican',
                'cook_time': 50,
                'ingredients': ['Tomato Sauce', 'Tomato', 'Corn Tortillas', 'Cheddar Cheese', 'Onion', 'Olives', 'Salt', 'Chicken'],
                'selected': false
            }]
        };

        const reducerResult = recipesReducer(state, Actions.toggleRecipe('Enchiladas'));

        expect(reducerResult.data).to.eql([{
            'name': 'Enchiladas',
            'type': 'Mexican',
            'cook_time': 50,
            'ingredients': ['Tomato Sauce', 'Tomato', 'Corn Tortillas', 'Cheddar Cheese', 'Onion', 'Olives', 'Salt', 'Chicken'],
            'selected': true
        }])
    });
});

describe('Recipes selector', () => {
    it('should filter the recipes list by a single ingredient', () => {
        const data = require('./recipes.json');

        const expectedRecipes = [{
            'name': 'Risotto',
            'type': 'Italian',
            'cook_time': 60,
            'ingredients': ['Rice', 'Chicken Stock', 'Parmesan Cheese', 'White Wine', 'Butter', 'Salt', 'Pepper', 'Peas']
        }, {
            'name': 'Fried Rice',
            'type': 'Chinese',
            'cook_time': 28,
            'ingredients': ['Onion', 'Oil', 'Rice', 'Egg', 'Soy Sauce', 'Sesame Oil', 'Chicken', 'Carrot', 'Peas']
        }];

        const state = {
            data,
            selectedIngredient: 'Rice'
        };

        const selectedRecipes = Selectors.selectRecipesByIngredient(state);
        expect(selectedRecipes).to.eql(expectedRecipes);
    });

    it('should return an empty array if no recipes have the ingredient', () => {
        const data = require('./recipes.json');

        const expectedRecipes = [];

        const state = {
            data,
            selectedIngredient: 'secret sauce'
        };

        const selectedRecipes = Selectors.selectRecipesByIngredient(state);
        expect(selectedRecipes).to.eql(expectedRecipes);
    });

    it('should return the entire recipes list if no ingredient is supplied', () => {
        const data = require('./recipes.json');

        const state = {
            data,
            selectedIngredient: null
        };

        const recipesByIngredient = Selectors.selectRecipesByIngredient(state);

        expect(recipesByIngredient).to.eql(data);
    });

    describe('should return a list of ingredients from selected recipes', () => {
        it('should be alphabetically ordered and distinct', () => {
            const state = {
                data: [{
                    name: 'Pancakes',
                    type: 'Breakfast',
                    cook_time : 25,
                    ingredients: ['Milk', 'Flour', 'Sugar', 'Butter', 'Baking Powder', 'Baking Soda', 'Egg', 'Salt'],
                    selected: true
                }, {
                    name: 'Pierogi',
                    type: 'Polish',
                    cook_time: 105,
                    ingredients: ['Butter', 'Onion', 'Salt', 'Pepper', 'Potato', 'Egg', 'Flour', 'Baking Powder'],
                    selected: true
                },     {
                    name: 'Pupusa',
                    type: 'Salvadoran',
                    cook_time: 40,
                    ingredients: ['Masa', 'Water', 'Queso Fresco'],
                    selected: false
                }]
            }

            const selectedIngredients = Selectors.selectIngredientsFromSelectedRecipes(state);

            expect(selectedIngredients).to.eql(['Baking Powder', 'Baking Soda', 'Butter', 'Egg', 'Flour', 'Milk', 'Onion', 'Pepper', 'Potato', 'Salt', 'Sugar']);
        });

        it('should update as recipes are selected/unselected');
    });
});

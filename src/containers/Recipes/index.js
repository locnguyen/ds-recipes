import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import RecipeTable from '../../components/RecipeTable';
import { Actions, Selectors } from '../../redux/modules/recipes';

class Recipes extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (!this.props.recipes.length) {
            this.props.getRecipes();
        }
    }

    render() {
        return (
            <div>
                <h1>DataScience Recipes</h1>

                <RecipeTable {...this.props} />

                <div>
                    <h2>Ingredients for selected recipes</h2>
                    {this.props.allIngredients.join(', ')}
                </div>
            </div>
        );
    }
}

Recipes.propTypes = {
    recipes: PropTypes.array,
    selectedIngredient: PropTypes.string,
    filterRecipesByIngredient: PropTypes.func,
    toggleRecipe: PropTypes.func,
    allIngredients: PropTypes.array
};

Recipes.defaultProps = {
    recipes: [],
    selectedIngredient: null,
    allIngredients: []
};


const mapStateToProps = (state) => ({
    selectedIngredient: state.recipes.selectedIngredient,
    recipes: Selectors.selectRecipesByIngredient(state.recipes),
    allIngredients: Selectors.selectIngredientsFromSelectedRecipes(state.recipes)
});

const mapDispatchToProps = (dispatch) => ({
    getRecipes: () => dispatch(Actions.getRecipes()),
    filterRecipesByIngredient: (ingredient) => dispatch(Actions.filterRecipesByIngredient(ingredient)),
    toggleRecipe: (recipeName) => dispatch(Actions.toggleRecipe(recipeName))
});

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);

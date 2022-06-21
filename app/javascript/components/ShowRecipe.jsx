

import React, { Component } from 'react';

class ShowRecipe extends Component {
  constructor(props) {
    super(props);
    console.log('Recipe: ' + JSON.stringify(this.props.recipe));

    this.state = {
      ingredients: []
    };

    this._renderRecipe = this._renderRecipe.bind(this);
    this._formatIngredients = this._formatIngredients.bind(this);
  }

  componentDidMount() {
    this._formatIngredients();
  }

  componentDidUpdate(prevProps) {
    if (this.props?.recipe?.idMeal != prevProps?.recipe?.idMeal) this._formatIngredients();
  }

  render() {
    return (
      <div className={this.props.showRecipeClass}>
        {this.props.recipe ? this._renderRecipe() : null}
      </div>
    )
  }

  _renderRecipe() {
    return (
      <div>
        <img className="closeButton" src="https://img.icons8.com/material-outlined/24/000000/delete-sign.png" onClick={() => this.props.hideRecipe(this.props.recipe)}/>
        <h1 className="main-color">{this.props.recipe.strMeal}</h1>
        <h2 className="main-color">Ingredients</h2>
        <ul>
          {this.state.ingredients.map((ingredient, index) => {
            return <li key={index}>{ingredient}</li>
          })}
        </ul>
        <h2 className="main-color">Instructions</h2>
        <p>{this.props.recipe.strInstructions}</p>
      </div>
    );
  }

  _formatIngredients() {
    let ingredients = Object.keys(this.props?.recipe || {})
      .filter(key => key.includes('strIngredient'))
      .map((key) => this.props.recipe[key])
      .filter(ingredient => ingredient)

    this.setState({ ingredients: ingredients });
  }
}

export default ShowRecipe;

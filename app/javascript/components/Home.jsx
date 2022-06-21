

import React, { Component } from 'react';
import ShuffledRecipe from './ShuffledRecipe';
import Shuffler from './Shuffler';
import Loader from './Loader';
import ShowRecipe from './ShowRecipe';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      local: {},
      external: {},
      isLoadingRecipes: true,
      showRecipe: false,
      currentRecipe: null,
      showRecipeClass: 'showRecipe',
      currentTimeout: null
    };

    this._shuffle = this._shuffle.bind(this);
    this._showRecipe = this._showRecipe.bind(this);
    this._fetchRecipes = this._fetchRecipes.bind(this);
    this._resetRecipePostion = this._resetRecipePostion.bind(this);
  }

  componentDidMount() {
    this._fetchRecipes(1000);
  }

  render() {
    // console.log('State: ' + JSON.stringify(this.state));
    return (
      <div className='home'>
        {this.state.isLoadingRecipes ? <Loader/> : this._renderRecipes()}
      </div>
    )
  }

  _renderRecipes() {
    return (
      <div style={{ height: '100%', width: '100%', overflow: 'hidden' }}>
        <div className="shuffleContainer">
          <ShuffledRecipe recipe={this.state.local} showRecipe={this._showRecipe} position='left'/>
          <ShuffledRecipe recipe={this.state.external} showRecipe={this._showRecipe} position='right'/>
          <Shuffler shuffle={this._shuffle} isRecipeShown={this.state.currentRecipe != null}/>
        </div>
        <ShowRecipe recipe={this.state.currentRecipe} showRecipeClass={this.state.showRecipeClass} hideRecipe={this._showRecipe}/>
      </div>
    )
  }

  _shuffle() {
    if (this.state.currentRecipe && this.state.showRecipe) this._showRecipe(this.state.currentRecipe);
    this.setState({
      isLoadingRecipes: true
    });
    this._fetchRecipes();
  }

  _showRecipe(currentRecipe) {
    if (this.state.currentTimeout) clearTimeout(this.state.currentTimeout);

    if (this.state.showRecipe) {
      let showRecipePosition = this.state.local.idMeal === this.state.currentRecipe.idMeal ? 'showRecipeRight' : 'showRecipeLeft';
      this.setState({
        showRecipe: false,
        showRecipeClass: `showRecipe ${showRecipePosition}`,
        currentTimeout: setTimeout(() => this._resetRecipePostion(), 500)
      });
    } else {
      let showRecipePosition = this.state.local.idMeal === currentRecipe.idMeal ? 'showRecipeRight' : 'showRecipeLeft';
      this.setState({
        showRecipe: true,
        currentRecipe: currentRecipe,
        currentTimeout: setTimeout(() => this._showRecipePosition(showRecipePosition), 100)
      })
    }
  }

  _showRecipePosition(showRecipePosition) {
    this.setState({
      showRecipeClass: `showRecipe showRecipeActive ${showRecipePosition}`
    });
  }

  _resetRecipePostion() {
    this.setState({
      currentRecipe: null,
      showRecipeClass: `showRecipe`
    });
  }

  _fetchRecipes(stopLoading = 200) {
    fetch(`${window.origin}/api/private/recipes/index`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          local: data.local.meals[0],
          external: data.external.meals[0]
        });
        setTimeout(this._stopLoading.bind(this), stopLoading);
      })
      .catch((err) => {
        console.log(err);
      }
    );
  }

  _stopLoading() {
    this.setState({
      isLoadingRecipes: false
    });
  }
}

export default Home;

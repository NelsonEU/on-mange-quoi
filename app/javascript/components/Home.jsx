

import React, { Component } from 'react';
import ShuffledRecipe from './ShuffledRecipe';
import Shuffler from './Shuffler';
import Loader from './Loader';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      local: {},
      external: {},
      isLoadingRecipes: true,
      showRecipe: false,
      currentPicture: null,
      showRecipeClass: 'showRecipe'
    };

    this._shuffle = this._shuffle.bind(this);
    this._showRecipe = this._showRecipe.bind(this);
    this._fetchRecipes = this._fetchRecipes.bind(this);
  }

  componentDidMount() {
    this._fetchRecipes();
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
      <div className="shuffleContainer">
        <ShuffledRecipe picture={this.state.local} showRecipe={this._showRecipe} position='left'/>
        <ShuffledRecipe picture={this.state.external} showRecipe={this._showRecipe} position='right'/>
        <div className={this.state.showRecipeClass}>
            <h1>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
            terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
            labore wes anderson cred nesciunt sapiente ea proident.</h1>
        </div>
        <Shuffler shuffle={this._shuffle}/>
      </div>
    )
  }

  _shuffle() {
    this.setState({
      isLoadingRecipes: true
    });
    this._fetchRecipes();
  }

  _showRecipe(currentPicture) {
    this.setState({
      showRecipe: true,
      currentPicture: currentPicture,
      showRecipeClass: 'showRecipe visible'
    });
  }

  _fetchRecipes() {
    fetch(`${window.origin}/api/private/recipes/index`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          local: data.local.meals[0],
          external: data.external.meals[0]
        });
        setTimeout(this._stopLoading.bind(this), 200);
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

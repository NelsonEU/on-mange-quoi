

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
      isLoadingRecipes: true
    };

    this._shuffle = this._shuffle.bind(this);
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
        <ShuffledRecipe picture={this.state.local} position='left'/>
        <ShuffledRecipe picture={this.state.external} position='right'/>
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

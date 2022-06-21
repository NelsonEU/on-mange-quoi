import React, { Component } from 'react';

class Shuffler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shuffleClass: ''
    };
  }

  componentDidMount() {
    this._setShuffleClass();
  }

  componentDidUpdate(prevProps) {
    if (this.props.isRecipeShown != prevProps.isRecipeShown) this._setShuffleClass();
  }

  render() {
    return (
      <div className={this.state.shuffleClass} onClick={this.props.shuffle}>
        Shuffle!
      </div>
    )
  }

  _setShuffleClass() {
    const baseClass= "shuffler primaryTitle";

    return this.setState({
      shuffleClass: baseClass + (this.props.isRecipeShown ? " recipeShown" : "")
    });
  }
}


export default Shuffler;

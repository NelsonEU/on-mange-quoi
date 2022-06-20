

import React, { Component } from 'react';

class Shuffler extends Component {
  render() {
    return (
      <div className="shuffler primaryTitle" onClick={this.props.shuffle}>
        Shuffle!
      </div>
    )
  }
}

export default Shuffler;

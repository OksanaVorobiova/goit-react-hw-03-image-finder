import { Component } from 'react';
import { Button } from './Button.styled';

class LoadMoreBtn extends Component {
  state = {
    loadedImages: null,
  };

  handleClick = e => {
    this.props.loadMore().then(images => this.props.refreshState(images));
  };

  render() {
    return (
      <Button type="button" onClick={this.handleClick}>
        Load more
      </Button>
    );
  }
}

export default LoadMoreBtn;

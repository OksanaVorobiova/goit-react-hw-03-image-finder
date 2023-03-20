import { Component } from 'react';
import { Button } from './Button.styled';

class LoadMoreBtn extends Component {
  state = {
    page: 2,
  };

  handleClick = e => {
    this.props.page(this.state.page);
    this.setState({ page: this.state.page + 1 });
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

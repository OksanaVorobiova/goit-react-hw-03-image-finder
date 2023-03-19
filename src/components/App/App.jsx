import { Component } from 'react';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import LoadMoreBtn from 'components/Button/Button';
import { loadMore } from 'api/api';
import { Loader } from 'components/Loader/Loader';
import { Container } from './App.styled';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class App extends Component {
  state = {
    query: '',
    images: null,
    status: STATUS.IDLE,
  };

  handleFormSubmit = value => {
    this.setState({ query: value, status: STATUS.PENDING });
  };

  loadMoreImages = images => {
    this.setState({ images: [...images.data.hits], status: STATUS.PENDING });
  };

  changeStatus = status => {
    this.setState({ status });
  };

  render() {
    return (
      <Container>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          query={this.state.query}
          newImages={this.state.images}
          changeStatus={this.changeStatus}
        />

        {this.state.status === STATUS.RESOLVED && (
          <LoadMoreBtn
            loadMore={() => loadMore(this.state.query)}
            refreshState={this.loadMoreImages}
          />
        )}

        {this.state.status === STATUS.PENDING && <Loader />}
      </Container>
    );
  }
}

export default App;

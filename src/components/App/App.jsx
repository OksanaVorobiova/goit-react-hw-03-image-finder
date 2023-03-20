import { Component } from 'react';
import Searchbar from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import LoadMoreBtn from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Container } from './App.styled';
import { getImages } from 'api/api';
import { Notify } from 'notiflix';

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

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      try {
        getImages(this.state.query, 1).then(res => {
          if (res.data.hits.length !== 0) {
            this.setState({
              images: [...res.data.hits],
              status: STATUS.RESOLVED,
            });
          } else {
            //this.setState({ status: STATUS.REJECTED });
            this.changeStatus(STATUS.REJECTED);
            this.showAlert();
            Notify.failure('There are no images by this query');
          }
        });
      } catch (error) {
        console.log(error.message);
        // this.setState({ status: STATUS.REJECTED });
        this.changeStatus(STATUS.REJECTED);
        this.showAlert();
        Notify.failure('There are no images by this query');
      }
    }
  }

  handleFormSubmit = value => {
    this.setState({ query: value, status: STATUS.PENDING });
  };

  loadMoreImages = page => {
    try {
      this.setState({ status: STATUS.PENDING });
      getImages(this.state.query, page)
        .then(res =>
          this.setState({
            images: [...this.state.images, ...res.data.hits],
          })
        )
        .then(this.changeStatus(STATUS.RESOLVED));
    } catch (error) {
      console.log(error.message);
      // this.setState({ status: STATUS.REJECTED });
      this.changeStatus(STATUS.REJECTED);
    }
  };

  changeStatus = status => {
    this.setState({ status });
  };

  showAlert = () => {
    if (this.state.status === STATUS.REJECTED) {
      Notify.failure('There are no images by this query');
    }
  };

  render() {
    const { images, status } = this.state;

    return (
      <Container>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {status === STATUS.RESOLVED && <ImageGallery images={images} />}

        {status === STATUS.RESOLVED && (
          <LoadMoreBtn page={this.loadMoreImages} />
        )}

        {status === STATUS.PENDING && <Loader />}
      </Container>
    );
  }
}

export default App;

import { Component } from 'react';
import { getImages } from 'api/api';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';

class ImageGallery extends Component {
  state = {
    images: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.query !== this.props.query) {
      try {
        getImages(this.props.query)
          .then(res =>
            this.setState({
              images: [...res.data.hits],
            })
          )
          .then(this.props.changeStatus('resolved'));
      } catch (error) {
        console.log(error.message);
      }
    } else if (prevProps.newImages !== this.props.newImages) {
      this.setState({
        images: [...this.state.images, ...this.props.newImages],
      });

      this.props.changeStatus('resolved');
    }
  }

  render() {
    const { images } = this.state;
    return (
      <Gallery>
        {images &&
          images.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              tags={tags}
            />
          ))}
      </Gallery>
    );
  }
}

export default ImageGallery;

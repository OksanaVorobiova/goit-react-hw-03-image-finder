import { ImageCard } from './ImageGalleryItem.styled';
import { Component } from 'react';
import Modal from 'components/Modal/Modal';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  handleItemClick = e => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { webformatURL, largeImageURL, tags } = this.props;

    return (
      <>
        <ImageCard onClick={this.handleItemClick}>
          <img src={webformatURL} alt={tags} />
        </ImageCard>

        {this.state.showModal && (
          <Modal src={largeImageURL} tags={tags} closeModal={this.closeModal} />
        )}
      </>
    );
  }
}

export default ImageGalleryItem;

import { Overlay, ModalWindow } from './Modal.styled';
import { Component } from 'react';

class Modal extends Component {
  state = {};

  componentDidMount() {
    window.addEventListener('click', this.closeModalByClick);
    window.addEventListener('keydown', this.closeModalByKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.closeModalByClick);
    window.removeEventListener('keydown', this.closeModalByKeydown);
  }

  closeModalByKeydown = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  closeModalByClick = e => {
    if (e.target.nodeName === 'DIV') {
      this.props.closeModal();
    }
  };

  render() {
    return (
      <Overlay>
        <ModalWindow>
          <img src={this.props.src} alt={this.props.tags} />
        </ModalWindow>
      </Overlay>
    );
  }
}

export default Modal;

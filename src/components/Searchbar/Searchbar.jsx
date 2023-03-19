import { Component } from 'react';
import { SearchbarStyled } from './Searchbar.styled';
import { AiOutlineSearch } from 'react-icons/ai';

class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = e => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.query);
  };

  render() {
    return (
      <SearchbarStyled>
        <form onSubmit={this.handleSubmit}>
          <button type="submit">
            <AiOutlineSearch size="30px" color="black" />
          </button>

          <input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </form>
      </SearchbarStyled>
    );
  }
}

export default Searchbar;

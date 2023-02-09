import { Component } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export class SearchForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const query = e.target.elements.query.value.trim();
    if (!query) {
      alert(`введіть слово для пошуку`);
      return;
    }
    this.props.onSubmit(query);
    e.target.reset();
  };

  render() {
    return (
      <SearchFormStyled onSubmit={this.handleSubmit}>
        <InputSearch name="query" />
        <FormBtn type="submit">
          <FiSearch />
        </FormBtn>
      </SearchFormStyled>
    );
  }
}

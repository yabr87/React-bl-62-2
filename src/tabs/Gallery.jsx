import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';
import { FiCloudLightning } from 'react-icons/fi';

export class Gallery extends Component {
  state = {
    photos: [],
    page: 1,
    query: '',
  };

  async componentDidUpdate(_, prevState) {
    if (prevState.query !== this.state.query) {
      const data = await ImageService.getImages(
        this.state.query,
        this.state.page
      );
      console.log(data);
    }
  }

  onFormSubmit = query => {
    this.setState({ query });
  };

  render() {
    return (
      <>
        <SearchForm onSubmit={this.onFormSubmit} />
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      </>
    );
  }
}

import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';
import { FiCloudLightning } from 'react-icons/fi';

export class Gallery extends Component {
  state = {
    photos: [],
    page: 1,
    query: '',
    btnShow: false,
    loaderShow: false,
    isEmpty: false,
    error: null,
  };

  async componentDidUpdate(_, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      try {
        this.setState({ loaderShow: true });
        const data = await ImageService.getImages(
          this.state.query,
          this.state.page
        );

        console.log(data.photos.length);

        if (data.photos.length === 0) {
          this.setState({ isEmpty: true });
          return;
        }
        this.setState(prevState => {
          return {
            photos: [...prevState.photos, ...data.photos],
            btnShow: this.state.page < Math.ceil(data.total_results / 15),
          };
        });
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ loaderShow: false });
      }
    }
  }

  onFormSubmit = query => {
    this.setState({
      query,
      photos: [],
      page: 1,
      btnShow: false,
      isEmpty: false,
      error: null,
    });
  };

  handlePagination = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { photos, btnShow, error, isEmpty, loaderShow } = this.state;

    return (
      <>
        <SearchForm onSubmit={this.onFormSubmit} />
        {isEmpty && (
          <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        )}

        {photos.length > 0 && (
          <Grid>
            {photos.map(({ id, avg_color, alt, src }) => {
              return (
                <GridItem key={id}>
                  <CardItem color={avg_color}>
                    <img src={src.large} alt={alt} />
                  </CardItem>
                </GridItem>
              );
            })}
          </Grid>
        )}

        {btnShow && <Button onClick={this.handlePagination}>Load more</Button>}

        {error && <p>{error}</p>}

        {loaderShow && <p>Loading....</p>}
      </>
    );
  }
}

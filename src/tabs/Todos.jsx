import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

export class Todos extends Component {
  state = {
    todos: [],
  };

  componentDidMount() {
    const todos = JSON.parse(localStorage.getItem('todos'));

    if (todos) {
      this.setState(() => ({ todos }));
    }
  }
  componentDidUpdate(_, prevState) {
    if (this.state.todos !== prevState.todos) {
      localStorage.setItem('todos', JSON.stringify(this.state.todos));
    }
  }

  onFormSubmit = text => {
    this.setState(prevState => {
      return { todos: [...prevState.todos, { text, id: nanoid(4) }] };
    });
  };

  removeTodo = id => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(item => item.id !== id),
    }));
  };

  render() {
    return (
      <>
        <SearchForm onSubmit={this.onFormSubmit} />
        <Grid>
          {this.state.todos.map(({ id, text }, index) => {
            return (
              <GridItem key={id}>
                <Todo
                  todo={text}
                  index={index + 1}
                  id={id}
                  remove={this.removeTodo}
                />
              </GridItem>
            );
          })}
        </Grid>
      </>
    );
  }
}

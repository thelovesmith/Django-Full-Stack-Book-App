import React, { Component } from 'react';
import { Form, Button, Label, Segment } from 'semantic-ui-react';

class CreateBook extends Component {
  constructor(){
    super();

    this.state = {
      title: '',
      author: '',
      year: ''
    }
  }
  updateBook = (e) => {
    this.setState({[e.currentTarget.name]: e.currentTarget.value})
  }
  render(){
    return (
      <Segment>
        <h4>Create Book</h4>
        <Form onSubmit={this.props.addBook.bind(null, this.state)}>
          <Label>title:</Label>
          <Form.Input type='text' name='title' value={this.state.title} onChange={this.updateBook}/>
          <Label>author:</Label>
          <Form.Input type='text' name='author' value={this.state.author} onChange={this.updateBook}/>
          <Label>year:</Label>
          <Form.Input type='text' name='year' value={this.state.year} onChange={this.updateBook}/>
          <Button color="green" type='Submit'>Create Book</Button>
        </Form>
      </Segment>
      )
  }
}

export default CreateBook;

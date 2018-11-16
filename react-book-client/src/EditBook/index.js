import React from 'react'
import { Modal, Form, Button, Label, Header } from 'semantic-ui-react';


const EditMovie = (props) => {
  console.log(props)
  return (
    <Modal open={props.open}>
      <Header>Edit Book</Header>
      <Modal.Content>
        <Form onSubmit={props.closeAndEdit}>
          <Label>
            Edit Book Title:
          </Label>
          <Form.Input type='text' name='title' value={props.bookToEdit.title} onChange={props.handleEditChange}/>
          <Label>
            Edit Book Author:
          </Label>
          <Form.Input type='text' name='author' value={props.bookToEdit.author} onChange={props.handleEditChange}/>
          <Label>
            Edit Book Year:
          </Label>
          <Form.Input type='text' name='year' value={props.bookToEdit.year} onChange={props.handleEditChange}/>
          <Modal.Actions>
            <Button color='green' type='submit'>Edit Book</Button>
          </Modal.Actions>
        </Form>
      </Modal.Content>
    </Modal>
    )
}

export default EditMovie;

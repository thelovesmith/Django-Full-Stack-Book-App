import React from 'react';
import { Card, Button} from 'semantic-ui-react';
// Pure Function, takes an input and renders ui
const Books = (props) => {
  // you'll propably have to map over the movies and create your list items here
  const books = props.books.map((book, i) => {

    return (
      <Card key={book.id}>
        <Card.Content>
          <Card.Header>{book.title}</Card.Header>
          <Card.Description>
            {book.author} | {book.year}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button color="green" onClick={props.openAndEdit.bind(null, book)}>Edit Book</Button>
          <Button color="red" onClick={props.deleteBook.bind(null, book.id)}>Delete Book</Button>
        </Card.Content>
      </Card>
      )
  })

  return (
    <div>
      <h3>Books</h3>
      <Card.Group className="centered">
        {books}
      </Card.Group>
    </div>
    )
}


export default Books;

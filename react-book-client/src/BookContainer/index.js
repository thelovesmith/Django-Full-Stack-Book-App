import React, { Component } from 'react';
import CreateBook from '../CreateBook';
import BookList from '../BookList';
import EditBook from '../EditBook';
import { Grid } from 'semantic-ui-react';
import getCookie from 'js-cookie';



class BookContainer extends Component {
  constructor(){
    super();

    this.state = {
      books: [],
      bookToEdit: {
        title: '',
        author: '',
        id: ''
      },
      showEditModal: false
    }
  }
  getBooks = async () => {
    const csrfCookie = await getCookie.get('csrftoken');
    console.log(csrfCookie, 'cookie');
    // Where We will make our fetch call to get all the movies
    const books = await fetch('http://localhost:8000/books/', {
      credentials: 'include',
      headers: {
        'X-CSRFToken': csrfCookie 
      }
    });
    const booksParsedJSON = await books.json();
    console.log( booksParsedJSON, 'books')
    return booksParsedJSON
  }
  componentDidMount(){
    // get ALl the movies, on the intial load of the APP
    this.getBooks().then((books) => {
      this.setState({books: books.data})
    }).catch((err) => {
      console.log(err);
    })
    /// Where you call this.getMovies
  }
  addBook = async (book, e) => {
    // .bind arguments take presidence over every other argument
    e.preventDefault();
    try {
      // We have to send JSON
      // createdMovie variable will store the response from the express API
      const csrfCookie = getCookie.get('csrftoken');
      console.log(csrfCookie, 'this is cookie');
      console.log(getCookie, 'get cookie');
      const createdBook = await fetch('http://localhost:8000/books/', {
        method: 'POST',
        body: JSON.stringify(book),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfCookie         
        }
      });

      // we have to turn the response from express into
      // an object we can use
      const parsedResponse = await createdBook.json();
      console.log(parsedResponse, ' create parsedResponse')
      // we are emptying all the movies that are living in state into a new array,
      // and then adding the movie we just created to the end of it
      // the newMovie is called parsedResponse.data
      this.setState({books: [...this.state.books, parsedResponse.data]})


    } catch(err){
      console.log('error')
      console.log(err)
    }
    // request address will start with 'http://localhost:9000'
    // Set up your post request with fetch, Maybe lookup how do i do post request with fetch,
    // headers: {'Content-Type': 'application/json'}
    // becuase after we create it, we want to add it to the movies array
  }
  deleteBook = async (id) => {

    const csrfCookie = getCookie.get('csrftoken')
    const deleteBookResponse = await fetch('http://localhost:8000/books/' + id + '/', {
                                              method: 'DELETE',
                                              credentials: 'include',
                                              headers: {
                                                'X-CSRFToken': csrfCookie
                                               
                                              }
                                            });

    // // This is the parsed response from express
    const deleteBookParsed = await deleteBookResponse;

    console.log(deleteBookResponse)


    // Now that the db has deleted our item, we need to remove it from state
    this.setState({books: this.state.books.filter((book) => book.id !== id )})


      // Then make the delete request, then remove the movie from the state array using filter
  }
  handleEditChange = (e) => {

    this.setState({
      bookToEdit: {
        ...this.state.bookToEdit,
        [e.currentTarget.name]: e.currentTarget.value
      }
    });


  }
  closeAndEdit = async (e) => {
    // Put request,
    e.preventDefault();
    // then update state
    try {
      const csrfCookie = getCookie.get('csrftoken')
      const editResponse = await fetch('http://localhost:8000/books/' + this.state.bookToEdit.id + '/', {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'X-CSRFToken': csrfCookie
          
        },
        body: JSON.stringify({
          title: this.state.bookToEdit.title,
          author: this.state.bookToEdit.author,
          year: this.state.bookToEdit.year
        })
      });

      const editResponseParsed = await editResponse.json();

      const newBookArrayWithEdit = this.state.books.map((book) => {

        if(book.id === editResponseParsed.data.id){
          book = editResponseParsed.data
        }

        return book
      });

      this.setState({
        showEditModal: false,
        books: newBookArrayWithEdit
      });

    } catch(err){
      console.log(err)
    }

    // If you feel up to make the modal (EditMovie Component) and show at the appropiate times

  }
  openAndEdit = (bookFromTheList) => {

    this.setState({
      showEditModal: true,
      bookToEdit: {
        ...bookFromTheList
      }
    })

  }
  render(){
    console.log('----------------------------')
    console.log(this.state, ' this is state')
    return (
      <Grid columns={2} divided textAlign='center' style={{ height: '100%' }} verticalAlign='top' stackable>
        <Grid.Row>
          <Grid.Column>
            <CreateBook addBook={this.addBook}/>
          </Grid.Column>

          <Grid.Column>
            <BookList books={this.state.books} deleteBook={this.deleteBook} openAndEdit={this.openAndEdit}/>
          </Grid.Column>
          <EditBook open={this.state.showEditModal} bookToEdit={this.state.bookToEdit} handleEditChange={this.handleEditChange} closeAndEdit={this.closeAndEdit}/>
        </Grid.Row>
      </Grid>
      )
  }
}

export default BookContainer;

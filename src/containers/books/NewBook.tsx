import { useDispatch } from 'react-redux';
import { Book } from '../../store/books/booksSlice';
import { useHistory } from 'react-router-dom'
import BookForm from '../../components/books/BookForm';
import { Button, Row } from 'react-bootstrap';
import { addBook } from '../../store/books/booksActions';

const NewBook = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const selectedBook = {} as Book;
  const handleFormSubmit = (book: Book) => {
    dispatch(addBook(book))
    history.push('/');
  }

  return (
    <>
      <Row>
        <h1 className="headerNav">BookInfo</h1>
      </Row>
      <Row>
        {selectedBook? <BookForm {...selectedBook} handleFormSubmit={handleFormSubmit} /> : <p>Book Not Found!</p>}
      </Row>
      <Row>
        <Button variant="outline-primary" onClick={() => history.push('/')}>Back</Button>
      </Row>
    </>
  );
}

export default NewBook;

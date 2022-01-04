import { useDispatch, useSelector } from 'react-redux';
import { addBook, Book, selectBookList, updateBookById } from '../../store/books/booksSlice';
import { useHistory, useParams } from 'react-router-dom'
import BookForm from '../../components/books/BookForm';
import { Button, Col, Row } from 'react-bootstrap';

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

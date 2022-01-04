import { useDispatch, useSelector } from 'react-redux';
import { Book, selectBookList, updateBookById } from '../../store/books/booksSlice';
import { useHistory, useParams } from 'react-router-dom'
import BookForm from '../../components/books/BookForm';
import { Button, Col, Row } from 'react-bootstrap';

type BookDetailParams = {
  bookID: string;
}

const BookDetail = () => {
  const bookList = useSelector(selectBookList);
  const {bookID} = useParams<BookDetailParams>();
  const history = useHistory();
  const dispatch = useDispatch();
  const selectedBook = bookList.find(b => b.id === bookID)
  const handleFormSubmit = (book: Book) => {
    dispatch(updateBookById({id: bookID, newBookInfo: book}))
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

export default BookDetail;

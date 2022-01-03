import { useSelector } from 'react-redux';
import { selectBookList } from '../../store/books/booksSlice';
import { useHistory, useParams } from 'react-router-dom'
import BookDetailForm from '../../components/books/BookDetailForm';
import { Button, Col, Row } from 'react-bootstrap';

type BookDetailParams = {
  bookID: string;
}

const BookDetail = () => {
  const bookList = useSelector(selectBookList);
  const {bookID} = useParams<BookDetailParams>();
  const history = useHistory();
  const selectedBook = bookList.find(b => b.id === bookID)

  return (
    <>
      <Row>
        <h1 className="headerNav">BookInfo</h1>
      </Row>
      <Row>
        {selectedBook? <BookDetailForm {...selectedBook} /> : <p>Book Not Found!</p>}
      </Row>
      <Row>
        <Button variant="outline-primary" onClick={() => history.push('/')}>Back</Button>
      </Row>
    </>
  );
}

export default BookDetail;

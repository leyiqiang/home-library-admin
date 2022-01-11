import { useDispatch, useSelector } from 'react-redux';
import { Book } from '../../store/books/booksSlice';
import { useHistory, useParams } from 'react-router-dom'
import BookForm from '../../components/books/BookForm';
import { Row, Spinner } from 'react-bootstrap';
import { bookInfoByID, editBook } from '../../store/books/booksActions';
import { selectCurrentBook, selectError, selectStatus } from '../../store/books/booksSelectors';
import { useEffect, useState } from 'react';
import { STATUS } from '../../utils/constants';
import { AppDispatch } from '../../store/store';

type BookDetailParams = {
  bookID: string;
}

const BookDetail = () => {
  const selectedBook = useSelector(selectCurrentBook);
  const { bookID } = useParams<BookDetailParams>();
  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();
  const bookStatus = useSelector(selectStatus);
  const error = useSelector(selectError);
  const [formErrMsg, setFormErrMsg] = useState<string | undefined>(undefined);
  const [formSuccessMsg, setFormSuccessMsg] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const handleFormSubmit = async (book: Book) => {
    setIsLoading(true);
    const resultAction = await dispatch(editBook({id: bookID, book}));
    if (editBook.fulfilled.match(resultAction)) {
      setFormErrMsg(undefined);
      setFormSuccessMsg("Success!")
    } else {
      if (resultAction.payload) {
        setFormErrMsg('Error: ' + resultAction.payload.message);
      } else {
        setFormErrMsg('Error: ' + resultAction.error.message);
      }
      setFormSuccessMsg(undefined)
    }
    setIsLoading(false);
  }

  useEffect(() => {
    dispatch(bookInfoByID(bookID));
  }, [])

  let content: JSX.Element | undefined;
  if (bookStatus === STATUS.LOADING) {
    content =
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
  } else if (bookStatus === STATUS.IDLE && !error) {
    content =
      <>
        <Row>
          <h1 className="headerNav">BookInfo</h1>
        </Row>
        <Row>
          {selectedBook ?
            <BookForm
              {...selectedBook}
              onBackClicked={() => history.push('/')}
              errMsg={formErrMsg}
              successMsg={formSuccessMsg}
              isLoading={isLoading}
              handleFormSubmit={handleFormSubmit}/>
            :
            <p>Book Not Found!</p>}
        </Row>
      </>
  } else if (error) {
    content = <p>Oops, something went wrong: {error}</p>;
  }
  return (
    <>
      {content}
    </>
  );
}

export default BookDetail;

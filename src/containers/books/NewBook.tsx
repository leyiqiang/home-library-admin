import { useDispatch } from 'react-redux';
import { Book } from '../../store/books/booksSlice';
import { useHistory } from 'react-router-dom'
import BookForm from '../../components/books/BookForm';
import { Button, Row, Toast, ToastContainer } from 'react-bootstrap';
import { addBook } from '../../store/books/booksActions';
import { useState } from 'react';
import { AppDispatch } from '../../store/store';

const NewBook = () => {
  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();
  const [showErr, setShowErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const selectedBook = {} as Book;
  const handleFormSubmit = async (book: Book) => {
    // try {
    //   const resultAction = await dispatch(addBook(book));
    //   const promiseResult = unwrapResult(resultAction);
    //   history.push('/');
    // } catch (err) {
    //   setShowErr(true);
    //   setErrMsg('Error: ' + (err as SerializedError).message || '');
    // }
    const resultAction = await dispatch(addBook(book));
    if (addBook.fulfilled.match(resultAction)) {
      history.push('/')
    } else {
      if (resultAction.payload) {
        setShowErr(true);
        console.log(resultAction.payload)
          setErrMsg('Error: ' + resultAction.payload.message);
      } else {
          setErrMsg('Error: ' + resultAction.error.message);
      }
    }

  }

  return (
    <>
      <Row>
        <h1 className="headerNav">BookInfo</h1>
      </Row>
      <Row>
        {selectedBook ?
          <BookForm
            {...selectedBook}
            handleFormSubmit={handleFormSubmit}
            onBackClicked={() => history.push('/')}
          /> :
          <p>Book Not Found!</p>}
        {showErr? <p style={{color:'red'}}>{errMsg}</p> : ''}
      </Row>
    </>
  );
}

export default NewBook;

import { useDispatch } from 'react-redux';
import { Book } from '../../store/books/booksSlice';
import { useHistory } from 'react-router-dom'
import BookForm from '../../components/books/BookForm';
import { Button, Row, Toast, ToastContainer } from 'react-bootstrap';
import { addBook } from '../../store/books/booksActions';
import { useState } from 'react';
import { SerializedError, unwrapResult } from '@reduxjs/toolkit';
import { AppDispatch } from '../../store/store';

const NewBook = () => {
  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();
  const [showErr, setShowErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const selectedBook = {} as Book;
  const handleFormSubmit = async (book: Book) => {
    try {
      const resultAction = await dispatch(addBook(book));
      const promiseResult = unwrapResult(resultAction);
      history.push('/');
    } catch (err) {
      setShowErr(true);
      setErrMsg('Error: ' + (err as SerializedError).message || '');
    }

  }

  return (
    <>
      <Row>
        <h1 className="headerNav">BookInfo</h1>
      </Row>
      <Row>
        {selectedBook ? <BookForm {...selectedBook} handleFormSubmit={handleFormSubmit}/> : <p>Book Not Found!</p>}
        {showErr? <p style={{color:'red'}}>{errMsg}</p> : ''}
      </Row>
      <Row>
        <Button variant="outline-primary" onClick={() => history.push('/')}>Back</Button>
      </Row>
    </>
  );
}

export default NewBook;

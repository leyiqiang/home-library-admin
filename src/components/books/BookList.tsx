import { useDispatch, useSelector } from 'react-redux';
import { selectBooksByCategory, selectStatus, allBooks, deleteBook, selectError } from '../../store/booksSlice';
import { Button, Card, Col, Modal, Row, Spinner } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { STATUS } from '../../utils/constants';

const BookList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const bookListByCategory = useSelector(selectBooksByCategory);
  const bookStatus = useSelector(selectStatus);
  const error = useSelector(selectError);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentBookID, setCurrentBookID] = useState('');
  const [currentBookTitle, setCurrentBookTitle] = useState('');

  useEffect(() => {
    if (bookStatus === STATUS.IDLE) {
      dispatch(allBooks());
    }
  }, [bookStatus, dispatch])
  const handleClose = () => {
    setCurrentBookID('');
    setCurrentBookTitle('');
    setShowDeleteModal(false)
  };

  const handleConfirmDelete = () => {
    dispatch(deleteBook(currentBookID));
    setCurrentBookID('');
    setCurrentBookTitle('');
    setShowDeleteModal(false)
  };

  const handleShow = (bookID: string, bookTitle: string) => {
    setCurrentBookID(bookID);
    setCurrentBookTitle(bookTitle);
    setShowDeleteModal(true);
  };

  let content : JSX.Element | undefined;
  if (bookStatus === STATUS.LOADING) {
    content =
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
  } else if (bookStatus === STATUS.SUCCEEDED) {
    content =
      <>
        <Row xs={1} md={3} className="g-4">
          {bookListByCategory.map((b) => {
            return (
              <Col key={b._id}>
                <Card>
                  <Card.Img variant="top" src="https://picsum.photos/200/300" className="bookImage"/>
                  <Card.Body>
                    <Card.Title><Link to={'/books/' + b._id}>{b.title}</Link></Card.Title>
                    <Card.Text>
                      {b.author}
                    </Card.Text>
                    <footer className="text-muted">
                      {b.category}
                    </footer>
                    <Button variant="primary" onClick={() => {
                      history.push('/books/' + b._id)
                    }}>Edit</Button>
                    <Button variant="danger" onClick={() => handleShow(b._id, b.title)}>Delete</Button>
                  </Card.Body>
                </Card>
              </Col>)
          })}
        </Row>
        <Modal show={showDeleteModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this book: {currentBookTitle}?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleConfirmDelete}>
              Confirm
            </Button>
            <Button variant="danger" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </>;
  } else if (bookStatus === STATUS.FAILED) {
    content = <p>Oops, something went wrong: {error}</p>;
  }
  return (
    <>
      {content}
    </>
  );
}

export default BookList;

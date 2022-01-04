import { useDispatch, useSelector } from 'react-redux';
import { selectBooksByCategory, deleteBookById } from '../../store/books/booksSlice';
import { Button, Card, Col, Modal, Row } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom'
import { useState } from 'react';

const BookList = () => {
  const bookListByCategory = useSelector(selectBooksByCategory);
  const history = useHistory();
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentBookID, setCurrentBookID] = useState('');
  const [currentBookTitle, setCurrentBookTitle] = useState('');

  const handleClose = () => {
    setCurrentBookID('');
    setCurrentBookTitle('');
    setShowDeleteModal(false)
  };

  const handleConfirmDelete = () => {
    dispatch(deleteBookById(currentBookID));
    setCurrentBookID('');
    setCurrentBookTitle('');
    setShowDeleteModal(false)
  };

  const handleShow = (bookID: string, bookTitle: string) => {
    setCurrentBookID(bookID);
    setCurrentBookTitle(bookTitle);
    setShowDeleteModal(true);
  };
  return (
    <>
      <Row xs={1} md={3} className="g-4">
        {bookListByCategory.map((b, idx) => {
          return (
            <Col key={idx}>
              <Card>
                <Card.Img variant="top" src="https://picsum.photos/200/300" className="bookImage"/>
                <Card.Body>
                  <Card.Title><Link to={'/books/' + b.id}>{b.title}</Link></Card.Title>
                  <Card.Text>
                    {b.author}
                  </Card.Text>
                  <footer className="text-muted">
                    {b.category}
                  </footer>
                  <Button variant="primary" onClick={() => {
                    history.push('/books/' + b.id)
                  }}>Edit</Button>
                  <Button variant="danger" onClick={() => handleShow(b.id, b.title)}>Delete</Button>
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
    </>
  );
}

export default BookList;

import BookFilters from '../../components/books/BookFilters';
import './books.css'
import { Row, Col } from 'react-bootstrap';
import BookList from '../../components/books/BookList';

const Books = () => {
  return (
    <>
      <Row>
        <h1 className="headerNav">Books</h1>
      </Row>

      <Row>

        <Col sm={12} md={4}>
          <BookFilters/>
        </Col>
        <Col sm={12} md={8}>
          <div>
            <BookList/>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default Books;

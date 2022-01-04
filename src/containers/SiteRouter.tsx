import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import BookDetail from './books/BookDetail';
import Books from './books/Books';
import NavBar from '../components/NavBar';
import Reservation from './Reservation';
import NewBook from './books/NewBook';

const SiteRouter = () => {
  return (
    <Router>
      <NavBar />
      <Container className="pageContainer">
        <Switch>
          <Route exact path="/book/new">
            <NewBook/>
          </Route>
          <Route exact path="/books/:bookID">
            <BookDetail/>
          </Route>
          <Route exact path="/reservation">
            <Reservation/>
          </Route>
          <Route path="/">
            <Books/>
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default SiteRouter;

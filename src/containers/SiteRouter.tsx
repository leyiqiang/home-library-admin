import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import BookDetail from './books/BookDetail';
import Books from './books/Books';
import NavBar from '../components/NavBar';
import Reservation from './Reservation';
import NewBook from './books/NewBook';
import NotFound from './NotFound';

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
          <Route exact path="/">
            <Redirect to ="/books" />
          </Route>
          <Route path="/books">
            <Books/>
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default SiteRouter;

import * as React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { selectBookCategories, selectCurrentCategory, setSearchByTitle } from '../../store/books/booksSlice';
import { Button, Dropdown, FormControl, InputGroup, ListGroup } from 'react-bootstrap';
import { setCurrentCategory } from '../../store/books/booksSlice';

const BookFilters = () => {
  const bookCategories = useSelector(selectBookCategories);
  const currentCategory = useSelector(selectCurrentCategory)
  const dispatch = useDispatch();


  const setCurrentCategoryAction = (category: string): void => {
    dispatch(setCurrentCategory(category));
  }

  const [keyword, setKeyword] = React.useState('');

  const onKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  const onSearchClicked = () => {
    dispatch(setSearchByTitle(keyword));
  }

  const onClearClicked = () => {
    setKeyword('')
    dispatch(setSearchByTitle(''))
  }

  const renderItems = (name: string, key: string | number) => {
    return (
      <ListGroup.Item
        action
        active={currentCategory === name}
        eventKey={key}
        key={key}
        onClick={() => setCurrentCategoryAction(name)}>
        {name}
      </ListGroup.Item>);
  }

  return (
    <div>
      <Dropdown show>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Type Keywords Here"
            aria-label="keywords"
            aria-describedby="basic-addon2"
            value={keyword}
            onChange={onKeywordChange}
          />
          <Button
            variant="outline-secondary"
            id="button-addon2"
            onClick={onSearchClicked}
          >
            Search
          </Button>
          <Button
            variant="outline-secondary"
            id="button-addon2"
            onClick={onClearClicked}
          >
            Clear
          </Button>
        </InputGroup>
        <Dropdown.Menu className="bookFilter">
          <Dropdown.Header>Category</ Dropdown.Header>
          <ListGroup variant="flush" defaultActiveKey="All">
          {bookCategories.map((categoryName, idx) => renderItems(categoryName, idx))}
          </ListGroup>
          {/*<Dropdown.Divider/>*/}
          {/*<Dropdown.Header>Author</Dropdown.Header>*/}
          {/*<Dropdown.Item>todo</Dropdown.Item>*/}
          {/*<Dropdown.Item>todo</Dropdown.Item>*/}
          {/*<Dropdown.Item>todo</Dropdown.Item>*/}
        </Dropdown.Menu>

      </Dropdown>
    </div>
  )
}

export default BookFilters;

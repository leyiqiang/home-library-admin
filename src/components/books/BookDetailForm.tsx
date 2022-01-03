import { Button, Col, Form, Image, Row } from 'react-bootstrap';
import { useState } from 'react';
import * as React from 'react';

type BookDetailFormProps = {
  id: string;
  title: string;
  author: string;
  publisher: string;
  importedDate: string;
  location: string;
  category: string;
  isbn: string;
}

type FormControlProps = {
  name: string;
  label: string;
  value: string;
  isRequired?: boolean;
}
const FormGroupComponent = ({ name, label, value, isRequired=false }: FormControlProps) => {
  const [inputValue, setInputValue] = useState(value);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }
  return <>
    <Form.Group as={Row} className="mb-3">
      <Form.Label column sm="2"><b>{name}</b></Form.Label>
      <Col sm="10">
        <Form.Control
          aria-label={label}
          value={inputValue}
          readOnly
          plaintext
          onChange={onInputChange}
        />
      </Col>
    </Form.Group>
  </>
}

const BookDetailForm = (props: BookDetailFormProps) => {
  const [validated, setValidated] = useState(false);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log('123')
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <>
      <Image src="https://picsum.photos/300/300" className="bookImage"/>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <FormGroupComponent name={'BookID'} label={'id'} value={props.id} isRequired/>
        <FormGroupComponent name={'Title'} label={'title'} value={props.title} />
        <FormGroupComponent name={'Author'} label={'author'} value={props.author} />
        <FormGroupComponent name={'Publisher'} label={'publisher'} value={props.publisher} />
        <FormGroupComponent name={'ImportedDate'} label={'importedDate'} value={props.importedDate}/>
        <FormGroupComponent name={'Location'} label={'location'} value={props.location} />
        <FormGroupComponent name={'Category'} label={'category'} value={props.category} />
        <FormGroupComponent name={'ISBN'} label={'isbn'} value={props.isbn}/>
      </Form>
    </>
  );
}

export default BookDetailForm;

import { Button, Col, Form, Image, Row } from 'react-bootstrap';
import * as React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Book } from '../../store/books/booksSlice';

type FormControlProps = {
  name: string;
  label: string;
  control: any;
  rules?: object;
  readOnly?: boolean;
  value: string;
}
const FormGroupComponent = ({ name, label, control, value, rules, readOnly = false }: FormControlProps) => {
  return <>
    <Controller
      name={name}
      rules={rules}
      control={control}
      defaultValue={value}
      render={({ field }) =>
        <Form.Group as={Row} className="mb-3" controlId="validationCustom01">
          <Form.Label column sm="2"><b>{label}</b></Form.Label>
          <Col sm="10">
            <Form.Control
              {...field}
              readOnly={readOnly}
            />
          </Col>
        </Form.Group>
      }
    />
  </>
}

interface IFormInput {
  id: string;
  title: string;
  author: string;
  publisher: string;
  importedDate: string;
  location: string;
  category: string;
  isbn: string;
}

type BookFormProps = {
  id?: string;
  title?: string;
  author?: string;
  publisher?: string;
  importedDate?: string;
  location?: string;
  category?: string;
  isbn?: string;
  handleFormSubmit: (book:Book) => void;
}
const BookForm = (props: BookFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data :Book) => {
    props.handleFormSubmit(data);
  };

  return (
    <>
      <Image src="https://picsum.photos/300/300" className="bookImage"/>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroupComponent name={'id'} label={'BookID'} control={control} value={props.id || ''}
                            rules={{ required: true }} readOnly/>
        <FormGroupComponent name={'title'} label={'Title'} control={control} rules={{ required: true }}
                            value={props.title || ''}/>
        <FormGroupComponent name={'author'} label={'Author'} control={control} value={props.author || ''}/>
        <FormGroupComponent name={'publisher'} label={'Publisher'} control={control} value={props.publisher || ''}/>
        <FormGroupComponent name={'importedDate'} label={'ImportedDate'} control={control} value={props.importedDate || ''}/>
        <FormGroupComponent name={'location'} label={'Location'} control={control} value={props.location || ''}/>
        <FormGroupComponent name={'category'} label={'Category'} control={control} value={props.category || ''}/>
        <FormGroupComponent name={'isbn'} label={'ISBN'} control={control} value={props.isbn || ''}/>
        <Button type="submit">Confirm</Button>
      </Form>

    </>
  );
}

export default BookForm;

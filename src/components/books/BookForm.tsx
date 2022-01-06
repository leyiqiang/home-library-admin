import { Alert, Button, Col, Form, Image, Row } from 'react-bootstrap';
import * as React from 'react';
import { useForm, Controller, SubmitHandler, FieldError } from 'react-hook-form';
import { Book } from '../../store/books/booksSlice';

type FormControlProps = {
  name: string;
  label: string;
  control: any;
  rules?: object;
  readOnly?: boolean;
  value: string;
  error?: string;
  type?: string;
}
const FormGroupComponent = ({ name, label, control, value, rules, error = '', type='text', readOnly = false }: FormControlProps) => {
  return <>
    <Controller
      name={name}
      rules={rules}
      control={control}
      defaultValue={value}
      render={({ field }) =>
        <Form.Group as={Col} className="mb-3" md="6" controlId={'validation' + name}>
          <Form.Label column sm="2">{label}</Form.Label>
          <Form.Control
            {...field}
            type={type}
            readOnly={readOnly}
            isInvalid={error !== ''}
          />
          <Form.Control.Feedback type="invalid">
            {error}
          </Form.Control.Feedback>
        </Form.Group>
      }
    />
  </>
}

interface IFormInput {
  _id: string;
  title: string;
  author: string;
  publisher: string;
  importedDate: string;
  location: string;
  category: string;
  isbn: string;
}

type BookFormProps = {
  _id?: string;
  title?: string;
  author?: string;
  publisher?: string;
  importedDate?: string;
  location?: string;
  category?: string;
  isbn?: string;
  handleFormSubmit: (book: Book) => void;
}
const BookForm = (props: BookFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data: Book) => {
    props.handleFormSubmit(data);
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Image src="https://picsum.photos/300/300" className="bookImage"/>
        {/*<FormGroupComponent name={'id'} label={'BookID'} control={control}*/}
        {/*                    value={props.id || ''}*/}
        {/*                    rules={{ required: true }}*/}
        {/*                    readOnly/>*/}
        <FormGroupComponent name={'title'} label={'Title'} control={control}
                            rules={{ required: true }}
                            error={errors.title ? 'Title is required' : ''}
                            value={props.title || ''}/>
        <FormGroupComponent name={'author'} label={'Author'} control={control} value={props.author || ''}/>
        <FormGroupComponent name={'publisher'} label={'Publisher'} control={control} value={props.publisher || ''}/>
        <FormGroupComponent name={'importedDate'} label={'ImportedDate'} control={control}
                            type={'date'}
                            value={props.importedDate || ''}/>
        <FormGroupComponent name={'location'} label={'Location'} control={control} value={props.location || ''}/>
        <FormGroupComponent name={'category'} label={'Category'} control={control} value={props.category || ''}/>
        <FormGroupComponent name={'isbn'} label={'ISBN'} control={control}
                            // rules={{ pattern: /^(97(8|9))?\d{9}(\d|X)$/i }}
                            error={errors.isbn ? 'Please enter proper ISBN format' : ''}
                            value={props.isbn || ''}/>
        <Button type="submit">Confirm</Button>
      </Form>

    </>
  );
}

export default BookForm;

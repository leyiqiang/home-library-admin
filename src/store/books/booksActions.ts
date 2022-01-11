import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteBookByID, getAllBooks, postNewBook } from '../../api/books';
import { Book, booksSlice } from './booksSlice';
import { AxiosError } from 'axios';

interface BookValidationError {
  message: string
}

export const { setCurrentCategory, setSearchByTitle, updateBookById } = booksSlice.actions;
export const allBooks = createAsyncThunk('/books/allBooks', async () => {
  const res = await getAllBooks();
  return res.data;
})

export const deleteBook = createAsyncThunk('/books/deleteBook', async (id: string) => {
  await deleteBookByID(id);
  return id;
})

export const addBook = createAsyncThunk<
  Book,
  Book,
  {rejectValue: BookValidationError}
  >('/books/addBook', async (book: Book, {rejectWithValue}) => {
  try {
    const res = await postNewBook(book);
    book._id = res.data.oid;
    return book;
  } catch (err) {
    let error = err as AxiosError<BookValidationError>;
    if (!error.response) {
      throw err
    }
    return rejectWithValue(error.response.data as BookValidationError);
  }

})

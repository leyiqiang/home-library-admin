import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteBookByID, getAllBooks, postNewBook } from '../../api/books';
import { Book, booksSlice } from './booksSlice';
import { AxiosError } from 'axios';

interface BookValidationError {
  error: string
}

export const { setCurrentCategory, setSearchByTitle, updateBookById } = booksSlice.actions;
export const allBooks = createAsyncThunk('/books/allBooks', async () => {
  const response = await getAllBooks();
  return response.data;
})

export const deleteBook = createAsyncThunk('/books/deleteBook', async (id: string) => {
  await deleteBookByID(id);
  return id;
})

export const addBook = createAsyncThunk('/books/addBook', async (book: Book, {rejectWithValue}) => {
  try {
    await postNewBook(book);
  } catch (err) {
    // let error: AxiosError<BookValidationError> = err
    return rejectWithValue(err.response.data as AxiosError<BookValidationError> )
  }

  return book;
})

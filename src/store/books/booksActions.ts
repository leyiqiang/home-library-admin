import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteBookByID, getAllBooks, postNewBook } from '../../api/books';
import { Book, booksSlice } from './booksSlice';

export const { setCurrentCategory, setSearchByTitle, updateBookById } = booksSlice.actions;
export const allBooks = createAsyncThunk('/books/allBooks', async () => {
  const response = await getAllBooks();
  return response.data;
})

export const deleteBook = createAsyncThunk('/books/deleteBook', async (id: string) => {
  await deleteBookByID(id);
  return id;
})

export const addBook = createAsyncThunk('/books/addBook', async (book: Book) => {
  await postNewBook(book);
  return book;
})

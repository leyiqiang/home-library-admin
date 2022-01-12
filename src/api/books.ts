import { axios } from './axios'
import { Book } from '../store/books/booksSlice';

const BOOK = '/book'
const BOOK_ALL = BOOK + '/all'

const ADMIN_BOOK = '/admin/book'


export const getAllBooks = async () => {
  return await axios.get<{ books: Book[] }>(BOOK_ALL);
}

export const getOneBookByID = async (id: string) => {
  return await axios.get<{ book: Book }>(BOOK + '/' + id);
}

export const deleteBookByID = async (id: string) => {
  return await axios.delete<object>(ADMIN_BOOK + '/' + id);
}

export const putBookInfo = async (id: string, book: Book) => {
  return await axios.put<{book: Book}>(ADMIN_BOOK + '/' + id, {
    ...book
  });
}

export const postNewBook = async (book: Book) => {
  return await axios.post<{oid: string}>(ADMIN_BOOK + '/', {
    ...book
  });
}

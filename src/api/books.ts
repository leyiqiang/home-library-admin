import { axios } from './axios'
import { Book } from '../store/booksSlice';

const BOOK = '/book'

const BOOK_ALL = BOOK + '/all'


export interface BookResponse {
  books: Book[];
}
export const getAllBooks = async () => {
  return await axios.get<BookResponse>(BOOK_ALL);
}

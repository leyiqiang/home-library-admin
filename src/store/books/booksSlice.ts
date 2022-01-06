import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { deleteBookByID, getAllBooks, postNewBook } from '../../api/books';
import { STATUS } from '../../utils/constants';
import { addBook, allBooks, deleteBook } from './booksActions';

export interface Book {
  _id: string;
  title: string;
  author: string;
  publisher: string;
  importedDate: string;
  location: string;
  category: string;
  isbn: string;
}

interface Books {
  currentCategory: string,
  searchByName: string;
  bookList: Book[];
  categories: string[];
  status:  STATUS.IDLE | STATUS.LOADING | STATUS.SUCCEEDED | STATUS.FAILED;
  error: string | undefined;
}

const initialState: Books = {
  status: STATUS.IDLE,
  error: undefined,
  currentCategory: 'All',
  searchByName: '',
  categories: ['All', 'Energy Industry Consult', 'Inspiration'],
  bookList: [
    {
      _id: 'EIC0001',
      title: '2019年中国电力行业投资报告',
      author: '南方电网 能源发展研究院',
      publisher: '中国电力出版社',
      importedDate: '2021-07-12',
      location: '2',
      category: 'Energy Industry Consult',
      isbn: '9787519840846'
    },
  ]
}
export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setCurrentCategory: (state, action: PayloadAction<string>) => {
      state.currentCategory = action.payload;
    },
    setSearchByTitle: (state, action: PayloadAction<string>) => {
      state.searchByName = action.payload;
    },
    updateBookById: (state, action: PayloadAction<{ id: string, newBookInfo: Book }>) => {
      const { id, newBookInfo } = action.payload;
      let idx = state.bookList.findIndex(b => b._id === id)
      newBookInfo._id = id;
      if (idx !== -1) {
        state.bookList[idx] = newBookInfo;
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(allBooks.pending, (state, action) => {
        state.status = STATUS.LOADING;
      })
      .addCase(allBooks.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.bookList = action.payload.books || [];
        const s : Set<string> = new Set(state.bookList.map(b => b.category));
        const a: string[] = Array.from(s);
        state.categories = ['All', ...a]
      })
      .addCase(allBooks.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.error.message;
      })
      .addCase(deleteBook.pending, (state, action) => {
        state.status = STATUS.LOADING;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.bookList = state.bookList.filter((b) => b._id !== action.payload)
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.error.message;
      })
      .addCase(addBook.pending, (state, action) => {
        state.status = STATUS.LOADING;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
          let book = action.payload;
          state.bookList.push(book);
      })
      .addCase(addBook.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.error.message;
      })
  }
})

// reducer
export default booksSlice.reducer;


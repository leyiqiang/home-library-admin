import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { getAllBooks } from '../api/books';
import { STATUS } from '../utils/constants';

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
    {
      _id: 'EIC0002',
      title: '2019年全球水电行业年度发展报告',
      author: '国家水电可持续发展 研究中心',
      publisher: '中国水利水电出版社',
      importedDate: '2021-07-12',
      location: '2',
      category: 'Energy Industry Consult',
      isbn: '9787517089216'
    },
    {
      _id: 'In0001',
      title: 'Sex & The Psych',
      author: 'Brett Kahr',
      publisher: '华东师范大学出版社',
      importedDate: '2021-07-12',
      location: '1',
      category: 'Inspiration',
      isbn: '9780141024844'
    }
  ]
}
export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<Book>) => {
      const id = Math.floor(Math.random() * 100).toString();
      let book = action.payload;
      book._id = id;
      state.bookList.push(book);
    },
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
    },
    deleteBookById: (state, action: PayloadAction<string>) => {
      state.bookList = state.bookList.filter((b) => b._id !== action.payload)
    }
  },
  extraReducers(builder) {
    builder
      .addCase(allBooks.pending, (state, action) => {
        state.status = STATUS.LOADING;
      })
      .addCase(allBooks.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.bookList = action.payload.books;
      })
      .addCase(allBooks.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.error.message;
      })
  }
})

// actions
export const { addBook, setCurrentCategory, setSearchByTitle, deleteBookById, updateBookById } = booksSlice.actions;
export const allBooks = createAsyncThunk('/books/allBooks', async () => {
  const response = await getAllBooks();
  console.log(response.data)
  return response.data;
})


// selectors
export const selectBookList = (state: RootState): Book[] => state.books.bookList;
export const selectBookCategories = (state: RootState): string[] => state.books.categories;
export const selectCurrentCategory = (state: RootState): string => state.books.currentCategory;
export const selectStatus = (state: RootState): string => state.books.status;

const selectSearchByTitle = (state: RootState): string => state.books.searchByName;


export const selectBooksByCategory = createSelector(
  selectBookList,
  selectCurrentCategory,
  selectSearchByTitle,
  (bookList, currentCategory, searchByTitle): Book[] => {
    if (currentCategory === '' || currentCategory === 'All') {
      return bookList.filter((b) => b.title.includes(searchByTitle));
    } else {
      return bookList.filter((b) => b.category === currentCategory && b.title.includes(searchByTitle))
    }
  }
)

// reducer
export default booksSlice.reducer;


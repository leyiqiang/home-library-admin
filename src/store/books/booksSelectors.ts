// selectors
import { RootState } from '../store';
import { createSelector } from '@reduxjs/toolkit';
import { Book } from './booksSlice';

export const selectBookList = (state: RootState): Book[] => state.books.bookList;
export const selectBookCategories = (state: RootState): string[] => state.books.categories;
export const selectCurrentCategory = (state: RootState): string => state.books.currentCategory;
export const selectStatus = (state: RootState): string => state.books.status;
export const selectError = (state: RootState): string | undefined => state.books.error;

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

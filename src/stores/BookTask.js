// stores/useBooksStore.js
import { defineStore } from 'pinia';

export const useBooksStore = defineStore('books', {
  state: () => ({
    books: [
      { title: 'Vue Basics', isFave: true },
      { title: 'Pinia Guide', isFave: false },
      { title: 'Nuxt Intro', isFave: true },
    ],
  }),
  actions: {
    addBook(book) {
      this.books.push(book);
    },
    toggleFave(title) {
      const book = this.books.find((b) => b.title === title);
      if (book) {
        book.isFave = !book.isFave;
      }
    },
    removeBook(title) {
      this.books = this.books.filter((b) => b.title !== title);
    },
  },
});

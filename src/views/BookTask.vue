<template>
  <div>
    <h2>📚 My Books</h2>
    <ul>
      <li v-for="book in booksStore.books" :key="book.title">
        {{ book.title }} -
        <span :style="{ color: book.isFave ? 'green' : 'red' }">
          {{ book.isFave ? 'Favorite' : 'Not Favorite' }}
        </span>
        <button @click="booksStore.toggleFave(book.title)">⭐</button>
        <button @click="booksStore.removeBook(book.title)">🗑 Remove</button>
      </li>
    </ul>

    <button @click="addNewBook">➕ Add Book</button>
  </div>
</template>

<script setup>
import { useBooksStore } from '../stores/BookTask.js';

const booksStore = useBooksStore();

function addNewBook() {
  booksStore.addBook({
    title: 'New Book ' + (booksStore.books.length + 1),
    isFave: false,
  });
}
</script>

<template>
  <div>
    <h1>قائمة المقالات</h1>

    <v-responsive class="mx-auto">
      <v-text-field v-model="newTitle" hide-details="auto" clearable></v-text-field>
    </v-responsive>
    <button @click="itemsStore.addItem(newTitle)">إضافة</button>
    <div class="w-100" v-for="(item, index) in itemsStore.items" :key="index">
      <v-row class="w-100">
        <v-col cols="12">
          <v-card class="d-flex justify-center">
            <div class="w-25">{{ item.title }}</div>
            <div class="w-25"><span v-if="item.isFave">⭐</span></div>
            <div class="w-25">
              <v-btn @click="itemsStore.toggleFave(index)" icon="mdi-heart"></v-btn>
            </div>
            <div class="w-25">
              <v-btn @click="itemsStore.removeItem(index)" icon="mdi-delete"></v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useItemsStore } from '../stores/TaskStore.js';

const itemsStore = useItemsStore();
const newTitle = ref('');
</script>

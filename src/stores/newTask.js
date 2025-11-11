import { defineStore } from 'pinia';

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: [
      { title: 'Vue Basics', isFave: true },
      { title: 'Pinia Intro', isFave: false },
    ],
  }),
});

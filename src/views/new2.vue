<template>
  <div>
    <h2>📌 My Tasks (with $state)</h2>

    <ul>
      <li v-for="(task, index) in tasksStore.tasks" :key="index">
        <span :style="{ color: task.isFave ? 'red' : 'black' }">
          {{ task.title }}
        </span>
      </li>
    </ul>

    <button @click="resetTasks">Reset Tasks</button>
  </div>
</template>

<script setup>
import { useTasksStore } from '../stores/new2.js';

const tasksStore = useTasksStore();

// ✅ استبدال كامل للـ state
function resetTasks() {
  tasksStore.$state = {
    tasks: [
      { title: 'New Task 1', isFave: false },
      { title: 'New Task 2', isFave: true },
    ],
  };
}
</script>

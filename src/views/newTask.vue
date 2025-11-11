<template>
  <div>
    <h2>📌 My Tasks (with $patch)</h2>

    <ul>
      <li v-for="(task, index) in tasksStore.tasks" :key="index">
        <span :style="{ color: task.isFave ? 'red' : 'black' }">
          {{ task.title }}
        </span>

        <!-- التعديلات -->
        <button @click="toggleFave(index)">Toggle Fave</button>
        <button @click="removeTask(index)">Delete</button>
      </li>
    </ul>

    <!-- إضافة تاسك جديد -->
    <input v-model="newTaskTitle" placeholder="New task..." />
    <button @click="addNewTask">Add Task</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useTasksStore } from '../stores/newTask.js';

const tasksStore = useTasksStore();
const newTaskTitle = ref('');

// ✅ إضافة تاسك جديد باستخدام $patch
function addNewTask() {
  if (!newTaskTitle.value) return;
  tasksStore.$patch((state) => {
    state.tasks.push({
      title: newTaskTitle.value,
      isFave: false,
    });
  });
  newTaskTitle.value = '';
}

// ✅ قلب حالة isFave باستخدام $patch
function toggleFave(index) {
  tasksStore.$patch((state) => {
    state.tasks[index].isFave = !state.tasks[index].isFave;
  });
}

// ✅ مسح تاسك باستخدام $patch
function removeTask(index) {
  tasksStore.$patch((state) => {
    state.tasks.splice(index, 1);
  });
}
</script>

<template>
  <div>Dashboard</div>
  <button>Log out??</button>
  <TaskItem/>
  <NewTask/>
</template>

<script>
import TaskItem from '../components/TaskItem.vue'
import NewTask from '../components/NewTask.vue';

export default {
  components: {
    TaskItem,
    NewTask
  }
}
</script>

<style>

</style>
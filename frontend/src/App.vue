<template>
  <div>
    <h1 class="title">Моя таблица</h1>
    <CreateRows />
    <TableZakup />
    <DataVisualization />
  </div>
</template>

<script>
import CreateRows from './components/CreateRows.vue';
import TableZakup from './components/TableZakup.vue';
import DataVisualization from './components/DataVisualization.vue';

export default {
  components: {
    CreateRows,
    TableZakup,
    DataVisualization,
  },
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  background-color: #f8f8f8;
  margin: 0;
  padding: 0;
}

.title {
  color: #007bff;
  text-align: center;
  padding: 20px;
}
</style>

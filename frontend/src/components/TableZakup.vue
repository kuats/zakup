<template>
  <div class="table-container">
    <table class="table">
      <thead>
        <tr>
          <th>Department</th>
          <th>GPZ</th>
          <th>TruType</th>
          <th>Purchase Name</th>
          <th>Purchase Status</th>
          <th>Price</th>
          <th>Contract</th>
          <th>Modified By</th>
          <th>Modified Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in tableData" :key="item._id" :style="getRowStyle(index)">
          <td>{{ item.department }}</td>
          <td>{{ item.gpz }}</td>
          <td>{{ item.truType }}</td>
          <td>{{ item.purchaseName }}</td>
          <td>{{ item.purchaseStatus }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.contract }}</td>
          <td>{{ item.modifiedBy }}</td>
          <td>{{ item.modifiedDate }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {
    this.fetchTableData();
  },
  methods: {
    fetchTableData() {
      // Выполните GET-запрос к API для получения данных таблицы
      fetch('/api/table')
        .then((response) => response.json())
        .then((data) => {
          this.tableData = data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getRowStyle(index) {
      const delay = index * 0.1;
      return {
        animation: `parallax 1.0s ease-out ${delay}s forwards`,
      };
    },
  },
};
</script>

<style>
.table-container {
  max-width: 800px;
  margin: 0 auto;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 10px;
  overflow: hidden;
  background-color: #fff;
}

th,
td {
  padding: 10px;
  text-align: left;
}

th {
  background-color: #007bff;
  color: #fff;
}

td {
  border-top: 1px solid #f2f2f2;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #e6e6e6;
}

@keyframes parallax {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>

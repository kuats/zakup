<template>
  <div class="container">
    <h2>Создать новую строку</h2>
    <form @submit.prevent="createRow" class="form">
      <div class="form-group">
        <label for="department">Отдел:</label>
        <select id="department" v-model="newRow.department">
          <option value="ДЭ Астана">ДЭ Астана</option>
          <option value="ЦТПиС Шымкент">ЦТПиС Шымкент</option>
          <option value="ЦТПиС Таукент">ЦТПиС Таукент</option>
          <option value="ЦТПиС Шиели">ЦТПиС Шиели</option>
        </select>
      </div>
      <div class="form-group">
        <label for="gpz">ГПЗ:</label>
        <input type="text" id="gpz" v-model="newRow.gpz" required>
      </div>
      <div class="form-group">
        <label for="truType">Тип Тру:</label>
        <select id="truType" v-model="newRow.truType">
          <option value="Товар">Товар</option>
          <option value="Работа">Работа</option>
          <option value="Услуга">Услуга</option>
        </select>
      </div>
      <div class="form-group">
        <label for="purchaseName">Наименование закупки:</label>
        <input type="text" id="purchaseName" v-model="newRow.purchaseName" required>
      </div>
      <div class="form-group">
        <label for="purchaseStatus">Статус закупки:</label>
        <select id="purchaseStatus" v-model="newRow.purchaseStatus">
          <option value="Разработка ТС">Разработка ТС</option>
          <option value="Маркет-анализ">Маркет-анализ</option>
          <option value="Инициирован закуп">Инициирован закуп</option>
          <option value="На корректировке у инициатора">На корректировке у инициатора</option>
          <option value="Заключен договор с поставщиком">Заключен договор с поставщиком</option>
        </select>
      </div>
      <div class="form-group">
        <label for="price">Цена:</label>
        <input type="number" id="price" v-model="newRow.price" required>
      </div>
      <button type="submit" class="btn-create">Создать</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      newRow: {
        department: '',
        gpz: '',
        truType: '',
        purchaseName: '',
        purchaseStatus: '',
        price: 0
      }
    };
  },
  methods: {
    createRow() {
      axios.post('/api/table', this.newRow)
        .then(response => {
          console.log(response.data);
          this.clearForm();
        })
        .catch(error => {
          console.error(error);
        });
    },
    clearForm() {
      this.newRow.department = '';
      this.newRow.gpz = '';
      this.newRow.truType = '';
      this.newRow.purchaseName = '';
      this.newRow.purchaseStatus = '';
      this.newRow.price = 0;
    }
  }
};
</script>

<style>
.container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  background-color: #f2f2f2;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

select, input[type="text"], input[type="number"] {
  width: 100%;
  padding: 8px 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button.btn-create {
  display: block;
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
}

button.btn-create:hover {
  background-color: #0069d9;
}
</style>

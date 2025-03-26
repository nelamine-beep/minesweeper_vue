<template>
    <div class="leaderboard">
        <h2>Таблица рекордов</h2>
        <ul>
            <li v-for="(record, index) in records" :key="index">
            #{{ index + 1 }} - Время: {{ record.time }} сек, Дата: {{ record.date }}, Поле: {{record.row}}*{{record.col}}, Мины: {{record.mines}}
            </li>
        </ul>
        </div>
</template>

<script>
import { useRecordStore } from '../stores/leaderboard';
import { ref, onMounted } from 'vue';

export default {
   setup() {
      const records = ref([]);
      onMounted(() => {
         const recordStore = useRecordStore();
         records.value = recordStore.getRecords;
      });
      return { records };
   }
}
</script>

<style scoped>
.leaderboard {
    margin: 20px auto;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
    width: 100%;
}
.leaderboard h2 {
    text-align: center;
    margin-bottom: 10px;
}
.leaderboard ul {
    list-style: none;
    padding: 0;
}
.leaderboard li {
    text-align: center;
    padding: 5px;
    border-bottom: 1px solid #dddddd;
    font-size: 1.2em;
}
</style>
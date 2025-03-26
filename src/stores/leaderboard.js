import { defineStore } from 'pinia';

export const useRecordStore = defineStore('recordStore', {
   state: () => ({
        records: JSON.parse(localStorage.getItem('records')) || []
    }),
   actions: {
      addRecord(record) {
        this.records.push(record);
        this.records.sort((a, b) => a.time - b.time);
        if (this.records.length > 10) {
          this.records = this.records.slice(0, 10);
        }
         this.saveRecords();
      },

      saveRecords() {
        localStorage.setItem('records', JSON.stringify(this.records));
      }
   },
   getters: {
      getRecords: (state) => state.records
   }
});
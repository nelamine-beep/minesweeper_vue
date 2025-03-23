<template>
    <div class="settings">
        <div class="choice-level" v-for="level in levels" :key="level.text">
            <input 
                type="radio" 
                :value="level" 
                v-model="selectedLevel" 
                :id="level.text"
            >
            <label :for="level.text">{{level.text}}, {{level.row}}*{{level.col}},  {{level.mines}} мин</label>
            <br>

        </div>
        <button @click="startGame">Начать игру</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            levels: [
                {text: "Простой", row: 8, col: 8, mines: 10},
                {text: "Средний", row: 16, col: 16, mines: 40},
                {text: "Сложный", row: 32, col: 16, mines: 100},
            ],
            selectedLevel: null,
        }
    },
    methods: {
        startGame() {
            if (!this.selectedLevel) {
                alert('Пожалуйста, выберите уровень игры!');
                return;
            }
            const settings = {
                row: this.selectedLevel.row,
                col: this.selectedLevel.col,
                mines: this.selectedLevel.mines,
            };
            this.$router.push({
                path: "/game",
                query: { 
                    row: settings.row, 
                    col: settings.col, 
                    mines: settings.mines 
                },
            });
        },
    }
}
</script>

<style scoped>
.settings {
    width: 40%;
    margin: 15px auto;
    display: flex;
    flex-direction: column;
    border: 5px solid rgb(212, 189, 211);;
}
.choice-level {
    font-size: 1.2rem;
    margin: 15px auto;
}

input[type="radio"] {
  accent-color: #ff6fe0;
  margin-right: 5px;
  width: 15px;
  height: 15px;
}
</style>
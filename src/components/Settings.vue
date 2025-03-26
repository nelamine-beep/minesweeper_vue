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
        <div class="choice-level">
            <input type="radio" id="custom" value="custom" v-model="selectedLevel">
            <label for="custom">Кастомный режим</label>
            <div v-if="selectedLevel === 'custom'" class="custom-options">
                <label>Кол-во рядов: <input type="number" v-model.number="customRow" min="2" max="50"></label>
                <label>Кол-во колонок: <input type="number" v-model.number="customCol" min="2" max="50"></label>
                <label>Кол-во мин: <input type="number" v-model.number="customMines" min="1" :max="maxMines"></label>
            </div>
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
            customCol: 2,
            customRow: 2,
            customMines: 2,
        }
    },
    computed: {
        maxMines() {
            return this.customRow * this.customCol - 1;
        }
    },
    methods: {
        startGame() {
            let settings;
            if (this.selectedLevel === "custom") {
                if (this.customMines >= this.maxMines) {
                    alert("Слишком много мин!");
                    return;
                }
                if (this.customRow > 50 || this.customCol > 50) {
                    alert("Слишком большие значения полей!");
                    return;
                }
                settings = {
                    row: this.customRow,
                    col: this.customCol,
                    mines: this.customMines,
                };
            } else if (this.selectedLevel) {
                settings = {
                    row: this.selectedLevel.row,
                    col: this.selectedLevel.col,
                    mines: this.selectedLevel.mines,
                };
            } else {
                alert("Пожалуйста, выберите уровень игры!");
                return;
            }
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
.custom-options {
    display: flex;
    flex-direction: column;
}
input[type="radio"] {
    accent-color: #ff6fe0;
    margin-right: 5px;
    width: 15px;
    height: 15px;
}
input[type="number"] {
    height: 25px;
    width: 100%;
    font-size: 100%;
}

@media (max-width: 740px) {
    .settings {
    width: 100%;
}
}
</style>
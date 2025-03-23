<template>
    <div>
        <div class="choice-level" v-for="level in levels">
            <input type="radio" v-bind:value="level" v-model="selectedLevel">
            <label>{{level.text}} {{level.row}}*{{level.col}}  {{level.mines}} мин</label>
            <br>
            <!-- <br>
            <span>Выбрано: </span> -->
        </div>
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
            ]
        }
    }
}
</script>

<style scoped>
.choice-level {
    
    margin: 15px auto;
}
</style>
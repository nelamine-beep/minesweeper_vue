<template>
    <div class="game">
        <div class="description">
            <h3>Размер поля: {{ row }} x {{ col }}</h3>
            <!-- <h3>Кол-во клеток без мин: {{row*col - mines}}</h3>
            <h3>Кол-во оставшихся свободных: {{row*col - mines - openedCells}}</h3> -->
            <h3>Оставшиеся мины: {{ mines - markedCells }}</h3>
            <h3>Время: {{ time }} секунд</h3>
            <div class="buttons">
                <button @click="restartGame">Перезапуск</button>
                <h2 v-if="gameWin === true">Вы выиграли!</h2>
                <h2 v-if="gameOver === true">Вы проиграли!</h2>
                <router-link to="/"><button>Назад</button></router-link>
            </div>
        </div>
        <div class="board">
            <div class="game-board">
              <div v-for="(row, rowIndex) in board" :key="rowIndex" class="row">
                <div v-for="(cell, colIndex) in row" 
                :key="colIndex" 
                class="cell" 
                :class="{opened: cell.opened, flagged: cell.flagged, questioned: cell.questioned, mined: cell.mined}"
                @click="openCell(rowIndex, colIndex)"
                @contextmenu.prevent="markCell(rowIndex, colIndex)">
                <span v-if="cell.opened && cell.count > 0" :class="'mine-' + cell.count">{{ cell.count }}</span>
                </div>
              </div>
          </div>
        </div>
      </div>
</template>

<script>
export default {
  data() {
    return {
        board: [],
        row: Number(this.$route.query.row) || 8,
        col: Number(this.$route.query.col) || 8,
        mines: Number(this.$route.query.mines) || 10,
        gameStart:false,
        gameOver: false,
        gameWin: false,
        firstMove: true,
        openedCells: 0,
        markedCells: 0,
        time: 0,
        timer: null,
    };
  },
  created() {
      this.initBoard();
  },
  methods: {
    initBoard() {
      this.board = Array.from({ length: this.row }, (_, rowIndex) => 
        Array.from({ length: this.col }, (_, col) => ({
          opened: false,
          flagged: false,
          questioned: false,
          mined: false,
          mineOnCell: false,
          count: 0,
        })));
    },
    startTimer() {
      this.timer = setInterval(() => { this.time++; }, 1000);
    },
    stopTimer() {
      clearInterval(this.timer);
    },
    putMine(firstMoveRow, firstMoveCol) {
      let countMines = this.mines;
      while (countMines > 0) {
        const randRow = Math.floor(Math.random()*this.row);
        const randCol = Math.floor(Math.random()*this.col);
        if ((randRow === firstMoveRow && randCol === firstMoveCol) || this.board[randRow][randCol].mineOnCell) {
          continue;
        }
          this.board[randRow][randCol].mineOnCell = true;
          this.countingNumbersOnCell(randRow, randCol);
          countMines--;
      }
    },
    countingNumbersOnCell(row, col) {
      const directions = [
        [-1, -1], [-1, 0], [-1, 1], 
        [0, -1],         [0, 1], 
        [1, -1], [1, 0], [1, 1]
      ];
      directions.forEach(([dx, dy]) => {
        const newRow = row + dx;
        const newCol = col + dy;
        if (newRow >= 0 && newRow < this.row && newCol >= 0 && newCol < this.col) {
          this.board[newRow][newCol].count++;
        }
      });
    },
    openCell(row, col) {
      if (this.gameOver) return;
      if (!this.gameStart){
        this.startTimer();
        this.gameStart = true;
      }
      const cell = this.board[row][col];
      if (this.firstMove) {
        this.firstMove = false;
        this.putMine(row, col);
      }
      if (cell.flagged || cell.questioned || cell.opened) return;
      if (cell.mineOnCell) {
        cell.mined = true;
        this.openedAllMines();
      } 
      else {
        cell.opened = true;
        this.openedCells++;
        if (cell.count === 0) {
          this.openedNeighbors(row, col);
        }
        const totalCells = this.row * this.col;
        const cellsWithoutMines = totalCells - this.mines;
        if (this.openedCells === cellsWithoutMines) {
          this.gameIsWon();
        }
      }
    },
    openedNeighbors(row, col) {
      const directions = [
            [-1, -1], [-1, 0], [-1, 1], 
            [0, -1], [0, 1], 
            [1, -1], [1, 0], [1, 1]
          ];
          directions.forEach(([dx, dy]) => {
            const newRow = row + dx;
            const newCol = col + dy;
            if (newRow >= 0 && newRow < this.row && newCol >= 0 && newCol < this.col) {
              const neighborCell = this.board[newRow][newCol];
              if (!neighborCell.opened && !neighborCell.flagged && !neighborCell.mineOnCell) {
                this.openCell(newRow, newCol);
              }
            }
          });
    },
    markCell(rowIndex, colIndex) {
      if (this.gameOver) return;
      if (!this.gameStart){
        this.startTimer();
        this.gameStart = true;
      }
      const cell = this.board[rowIndex][colIndex];
      if (this.markedCells === this.mines) {
        gameIsWon();
      }
      else {
        if (!cell.opened) {
          if (cell.flagged) {
              if (cell.mineOnCell) this.markedCells--;
              cell.flagged = false;
              cell.questioned = true;
          } else if (cell.questioned) {
              cell.questioned = false;
          } else {
              cell.flagged = true;
              if (cell.mineOnCell) this.markedCells++;
          }
        }
      }
    },
    openedAllMines() {
      this.board.forEach(row => {
        row.forEach(cell => {
          if (cell.mineOnCell) {
            cell.mined = true;
          }
        })
      });
      if (!this.gameWin) {
        this.gameOver = true;
      }
      this.stopTimer();
    },
    gameIsWon() {
      this.gameWin = true;
      this.openedAllMines();
      this.stopTimer();
    },
    restartGame() {
      this.initBoard();
      this.stopTimer();
      this.time = 0;
      this.markedCells = 0;
      this.openedCells = 0;
      this.gameWin = false;
      this.gameStart = false;
      this.gameOver = false;
      this.firstMove = true;
    }
  }
}
</script>

<style scoped>
  .description {
      width: 70%;
      margin: 0 auto;
  }
  .buttons {
      display: flex;
      justify-content: space-between;
  }
  .board {
    display: flex;
    justify-content: center;
  }
  .game-board {
    margin: 10px 0;
    display: grid;
    grid-template-columns: repeat(v-bind(row), minmax(30px, 1fr));
  }
  .cell {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    background-color:rgb(241, 194, 210);
    cursor: pointer;
    user-select: none;
  }
  .cell.opened {
    background-color: rgb(245, 213, 223);;
  }
  .cell.flagged {
    background-color: rgb(245, 213, 223);
    background-image: url(./../assets/flag.png);
    background-size: cover;
  }
  .cell.questioned {
    background-color: rgb(245, 213, 223);
    background-image: url(./../assets/question.png);
    background-size: cover;
  }
  .cell.mined {
    background-color: rgb(245, 213, 223);
    background-image: url(./../assets/bomb.png);
    background-size: cover;
  }
  .cell span {background-color: rgb(245, 213, 223);}
  .mine-1 {color: blue;}
  .mine-2 {color: green;}
  .mine-3 {color: red;}
  .mine-4 {color: darkblue;}
  .mine-5 {color: brown;}
  .mine-6 {color:darkturquoise;}
  .mine-7 {color: black;}
  .mine-8 {color: white;}
</style>
<template>
  <div class="container">
    <h1>Игра "Сапёр"</h1>
  </div>
  <main>
    <router-view />
  </main>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: rgb(249, 240, 255);
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.container h1 {
  margin: 30px auto;
  text-align: center;
}
</style>

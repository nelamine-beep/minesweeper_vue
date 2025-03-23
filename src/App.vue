<template>
  <div class="container">
    <h1>Игра "Сапёр"</h1>
    <nav>
      <ul>
        <li><router-link to="/settings">Настройки</router-link></li>
        <li><router-link to="/leaderboard">Таблица лидеров</router-link></li>
      </ul>
    </nav>
    <router-view />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: rgb(249, 240, 255);
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.container {
  /* max-width: 960px; */
  margin: 0 5%;
}

.container h1 {
  padding: 10px;
  border: 10px dotted rgb(212, 189, 211);
  margin: 20px auto;
  text-align: center;
}

nav ul {
  list-style: none;
  margin: 10px 0;
  padding: 0;
  display: flex;
  justify-content:center;
  background-color: rgb(211, 201, 210);
}

nav a {
  margin: 0 10px;
  padding: 5px 10px;
  text-decoration: none;
  color: #000;
  font-size: 1.5em;
}

nav a:hover {
  background-color: rgb(212, 189, 211);
}

button {
    border: none;
    background-color: rgb(212, 189, 211);
    padding: 10px 15px;
    font-size: 1.2em;
    cursor: pointer;
}

button:hover {
    box-shadow: 0px 5px 5px 0px rgba(34, 60, 80, 0.2);;
}
</style>

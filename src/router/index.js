import { createRouter, createWebHistory } from 'vue-router';
import Settings from '../components/Settings.vue';
import Game from '../components/GameBoard.vue';
import Leaderboard from '../components/LeaderBoard.vue';

const routes = [
  { path: '/', redirect: '/settings' },
  { path: '/settings', component: Settings },
  { path: '/game', component: Game },
  { path: '/leaderboard', component: Leaderboard },
  // добавить страницу ошибки 404
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
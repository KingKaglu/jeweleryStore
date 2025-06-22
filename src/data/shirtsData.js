// shirtsData.js
import retroShirts from './retroShirts.js';
import kidsRetroShirts from './kidsRetroShirts.js';
import playerSeasonShirts from './playerSeasonShirts.js';
import fanSeasonShirts from './fanSeasonShirts.js';

const addCategory = (items, categoryId) =>
  items.map(item => ({ ...item, category: categoryId }));

const shirtsData = [
  ...addCategory(retroShirts, 'retro'),
  ...addCategory(kidsRetroShirts, 'kids-retro'),
  ...addCategory(playerSeasonShirts, 'player-2025-2026'),
  ...addCategory(fanSeasonShirts, 'fan-2025-2026'),
];

export default shirtsData;

//initialization
// - find relevant section

import { showView } from './dom.js';

// - detach section from Dom
const section = document.getElementById('add-movie');
section.remove();

//Display logic
export function showCreate() {
    showView(section);
}
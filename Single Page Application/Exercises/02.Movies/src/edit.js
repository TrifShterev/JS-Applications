//initialization
// - find relevant section

import { showView } from './dom.js';

// - detach section from Dom
const section = document.getElementById('edit-movie');
section.remove();

//Display logic
export function showEdit() {
    showView(section);
}
//initialization
// - find relevant section

import { showView } from './dom.js';

// - detach section from Dom
const section = document.getElementById('form-sign-up');
section.remove();

//Display logic
export function showRegister() {
    showView(section);
}
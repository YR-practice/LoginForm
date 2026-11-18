export function writeName(name, container) {
    container.innerHTML = '';
 
    for (const letter of name) {
        const span = document.createElement('span');
        span.className = 'letter';
        span.textContent = letter;
        container.appendChild(span);
    }
}
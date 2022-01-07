import 'regenerator-runtime';
import App from './scripts/app';
import './styles/index.css';

const content = document.getElementById('app');
const app = new App(content);
window.addEventListener('hashchange', () => {
    app.renderPage();
});
window.addEventListener('load', () => {
    app.renderPage();
});

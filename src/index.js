import 'regenerator-runtime';
import App from './scripts/app';
import './styles/index.css';

// const hamburger = document.querySelector('#hamburger');
// const navigation = document.querySelector('#navigation');
// const drawer = document.querySelector('#drawer');
// const content = document.querySelector('#page-content');
// const whois = document.getElementById('whois-link');
// const domainAvailability = document.getElementById('domain-availability-link');
// const ipGeolocation = document.getElementById('ip-geolocation-link');
// const emailVerification = document.getElementById('email-verification-link');
// const about = document.getElementById('about-link');
// const links = document.querySelectorAll('.menu-link');
const content = document.getElementById('app');
// const navLink = document.querySelectorAll('.menu a');

// const clickedLinks = [
//     whois,
//     domainAvailability,
//     ipGeolocation,
//     emailVerification,
//     about,
// ];

const app = new App(content);

window.addEventListener('hashchange', () => {
    app.renderPage();
});

window.addEventListener('load', () => {
    app.renderPage();
});

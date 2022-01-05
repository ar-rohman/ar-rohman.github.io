import '../../components/back-header';
import '../../components/detail-page';
import '../../components/section/footer-section';

const Glow = {
    async render() {
        return `
            <back-header></back-header>
            <div id="js-detail-page"></div>
            <footer-section></footer-section>
        `;
    },

    async afterRender() {
        document.title = 'Glow Detail - ArRohman';
        const detailPage = document.getElementById('js-detail-page');
        const element = document.createElement('detail-page');
        const data = {
            title: 'Glow',
            description: 'Glow (Global Weather) is an application that provides weather data for any location on Earth.',
            features: [
                'Current weather forecast',
                'Hourly weather forecast',
                'Daily weather forecast',
                'Search weather forecast by city',
                'Set default city &amp; temperature',
                'Support dark mode',
                'Bilingual',
            ],
            technologies: [
                'Vue',
                'Tailwind',
                'Progressive Web App (PWA)',
                'Indexed DB',
                'Local Storage',
            ],
            repoLink: '#',
            demoLink: 'https://glow-forecast.web.app',
            disableRepo: true,
            disableDemo: false,
        };
        element.data = data;
        detailPage.appendChild(element);
    },
};

export default Glow;

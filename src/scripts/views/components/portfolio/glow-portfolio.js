import '../portfolio-card';
import portfolioImage from '../../../../assets/portfolio/glow-maskable.png';

class GlowPortfolio extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        const data = {
            image: portfolioImage,
            title: 'Glow',
            description: 'Glow (Global Weather) is an application that provides weather data for any location on Earth.',
            hastag: 'Vue',
            demoLink: 'https://glow-forecast.web.app',
            detailLink: '#/glow-detail',
            disableDemo: true,
        };
        const element = document.createElement('portfolio-card');
        element.portfolioData = data;
        this.appendChild(element);
    }
}

customElements.define('glow-portfolio', GlowPortfolio);

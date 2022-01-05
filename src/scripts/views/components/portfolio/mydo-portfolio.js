import '../portfolio-card';
import portfolioImage from '../../../../assets/portfolio/mydo.png';

class MydoPortfolio extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        const data = {
            image: portfolioImage,
            title: 'MyDo',
            description: 'MyDo is an application that provides domain and email information.',
            hastag: 'Javascript',
            demoLink: 'https://glow-forecast.web.app',
            detailLink: 'detail/glow.html',
        };
        const element = document.createElement('portfolio-card');
        element.portfolioData = data;
        this.appendChild(element);
    }
}

customElements.define('mydo-portfolio', MydoPortfolio);

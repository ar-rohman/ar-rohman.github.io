import data from '../../data';
import '../components/section/header-section';
import '../components/section/hello-section';
import '../components/section/about-section';
import '../components/section/contact-section';
import '../components/section/footer-section';
import '../components/portfolio-card';

const Main = {
    async render() {
        return `
            <header-section></header-section>
            <main>
                <hello-section></hello-section>
                <div id="portfolio" class="portfolio">
                    <div class="max-content">
                        <div class="portfolio-section">Portfolio</div>
                        <div class="portfolio-content" id="js-portfolio-content"></div>
                    </div>
                </div>
                <about-section></about-section>
                <contact-section></contact-section>
            </main>
            <div id="footer-section"></div>
        `;
    },

    async afterRender() {
        document.title = 'Portfolio - ArRohman';
        const portfolioContent = document.getElementById('js-portfolio-content');
        // .setAttribute("class", "democlass")
        const footerId = document.getElementById('footer-section');
        const footerSection = document.createElement('footer-section');
        footerSection.isNavMenu = true;
        footerId.appendChild(footerSection);
        // console.log(data);
        data.forEach((element) => {
            const card = document.createElement('portfolio-card');
            card.portfolioData = element;
            portfolioContent.appendChild(card);
            // console.log(item.title);
        });
    },
};

export default Main;

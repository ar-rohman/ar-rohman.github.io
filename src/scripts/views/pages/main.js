import data from '@/scripts/data';
import ActiveNav from '@/scripts/utils/active-nav';
import '../components/section/header-section';
import '../components/section/hello-section';
import '../components/section/about-section';
import '../components/section/contact-section';
import '../components/section/footer-section';
import '../components/portfolio-card';

const Main = {
    render() {
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

    afterRender() {
        const portfolioContent = document.getElementById('js-portfolio-content');
        const footerId = document.getElementById('footer-section');
        const footerSection = document.createElement('footer-section');
        footerSection.isNavMenu = true;
        footerId.appendChild(footerSection);
        data.forEach((element) => {
            const card = document.createElement('portfolio-card');
            card.setAttribute('class', 'card');
            card.portfolioData = element;
            portfolioContent.appendChild(card);
        });
        const hello = document.querySelector('#hello');
        const portfolio = document.querySelector('#portfolio');
        const about = document.querySelector('#about');
        const contact = document.querySelector('#contact');
        const pageSections = [hello, portfolio, about, contact];
        const navigation = document.querySelectorAll('.menu-nav');
        ActiveNav.scroll(pageSections, navigation);
    },

    async removeActiveState(links) {
        await links.forEach((active) => {
            active.classList.remove('active');
            active.querySelector('.outline').classList.remove('hide');
            active.querySelector('.solid').classList.add('hide');
        });
    },

    addActiveState(link) {
        link.classList.add('active');
        link.querySelector('.solid').classList.remove('hide');
        link.querySelector('.outline').classList.add('hide');
    },
};

export default Main;

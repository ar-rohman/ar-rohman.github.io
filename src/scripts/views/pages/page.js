import '../components/section/header-section';
import '../components/section/hello-section';
import '../components/section/about-section';
import '../components/section/contact-section';
import '../components/section/footer-section';
import '../components/portfolio/glow-portfolio';
import '../components/portfolio/mydo-portfolio';

const Page = {
    async render() {
        return `
            <header-section></header-section>
            <main>
                <hello-section></hello-section>
                <div id="portfolio" class="portfolio">
                    <div class="max-content">
                        <div class="portfolio-section">Portfolio</div>
                        <div class="portfolio-content">
                            <glow-portfolio></glow-portfolio>
                            <mydo-portfolio></mydo-portfolio>
                            <glow-portfolio></glow-portfolio>
                        </div>
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
        const footerId = document.getElementById('footer-section');
        const footerSection = document.createElement('footer-section');
        footerSection.isNavMenu = true;
        footerId.appendChild(footerSection);
    },
};

export default Page;

import data from '../../data';
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
        // document.title = 'Portfolio - ArRohman';
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
        // const x = document.getElementById('hello-nav');
        // const portfolio = document.querySelector('#portfolio');
        // console.log(x);
        // console.log(portfolio);
        // const navLink = document.querySelectorAll('.menu a');
        // const hello = document.querySelector('#hello');
        // const portfolio = document.querySelector('#portfolio');
        // const about = document.querySelector('#about');
        // const contact = document.querySelector('#contact');
        // const pageSections = [hello, portfolio, about, contact];

        // click event
        // navLink.forEach((element) => {
        //     element.addEventListener('click', async () => {
        //         // console.log(element);
        //         this.removeActiveState(navLink);
        //         this.addActiveState(element);
        //     });
        // });
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
    /*
    ////
    window.addEventListener('DOMContentLoaded', () => {
        // Add or remove active state at nav menu
        const removeActiveState = (links) => {
            links.forEach((active) => {
                active.classList.remove('active');
                active.querySelector('.outline').classList.remove('hide');
                active.querySelector('.solid').classList.add('hide');
            });
        };
        const addActiveState = (link) => {
            link.classList.add('active');
            link.querySelector('.solid').classList.remove('hide');
            link.querySelector('.outline').classList.add('hide');
        };

        const navLink = document.querySelectorAll('.menu a');
        const hello = document.querySelector('#hello');
        const portfolio = document.querySelector('#portfolio');
        const about = document.querySelector('#about');
        const contact = document.querySelector('#contact');
        const sections = [hello, portfolio, about, contact];

        // click event
        navLink.forEach((element) => {
            element.addEventListener('click', () => {
                removeActiveState(navLink);
                addActiveState(element);
            });
        });

        // scroll event
        window.addEventListener('scroll', () => {
            let index = sections.length;

            // Decrements the index with each iteration.
            // https://stackoverflow.com/a/55749862
            while (--index && window.scrollY + 50 < sections[index].offsetTop) {}
            removeActiveState(navLink);

            // add active class if within visible height of the element
            if (scrollY - sections[index].offsetHeight < sections[index].offsetTop) {
                addActiveState(navLink[index]);
            }
        });
    });
    ///
    */
};

export default Main;

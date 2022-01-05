// import portfolioIllustration from '../../../assets/illustrations/about.svg';
import './portfolio-card';

class PortfolioSection extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
        <div id="portfolio" class="portfolio">
        <div class="max-content">
            <div class="portfolio-section">Portfolio</div>
            <div class="portfolio-content">
                <porto-card></porto-card>
                <porto-card></porto-card>
                <porto-card></porto-card>
                <div class="card">
                    <div class="card-logo">
                        <img src="assets/images/portfolio/mydo.png" alt="mydo" height="64" width="64">
                    </div>
                    <div class="card-title">MyDo</div>
                    <div class="card-content">
                        <p>MyDo is an application that provides domain and email information.</p>
                    </div>
                    <div class="card-hashtag">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1
                                1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1
                                1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0
                                110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1
                                4h2.938l1-4H9.031z" clip-rule="evenodd" />
                        </svg>
                        <p>Javascript</p>
                    </div>
                    <div class="card-footer">
                        <a href="/mydo" target="_blank" class="demo-link">Demo</a>
                        <a href="detail/mydo.html" class="detail-link">Detail</a>
                    </div>
                </div>
                <div class="card">
                    <div class="card-logo">
                        <img src="assets/images/portfolio/dishmenu.png" alt="Glow" height="64" width="64">
                    </div>
                    <div class="card-title">dishmenu</div>
                    <div class="card-content">
                        <p>Dish information and review (dummy).</p>
                    </div>
                    <div class="card-hashtag">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1
                                1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1
                                1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0
                                110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1
                                4h2.938l1-4H9.031z" clip-rule="evenodd" />
                        </svg>
                        <p>Javascript</p>
                    </div>
                    <div class="card-footer">
                        <a href="#" target="_blank" class="demo-link disabled">Demo</a>
                        <a href="detail/dishmenu.html" class="detail-link">Detail</a>
                    </div>
                </div>
                <div class="card">
                    <div class="card-logo">
                        <img src="assets/images/portfolio/code-sport.png" alt="Glow" height="64" width="64">
                    </div>
                    <div class="card-title">Code Sport</div>
                    <div class="card-content">
                        <p>Provides information about Champions League.</p>
                    </div>
                    <div class="card-hashtag">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1
                                1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1
                                1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0
                                110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1
                                4h2.938l1-4H9.031z" clip-rule="evenodd" />
                        </svg>
                        <p>Vue</p>
                    </div>
                    <div class="card-footer">
                        <a href="https://code-sport.web.app" target="_blank" class="demo-link">Demo</a>
                        <a href="detail/code-sport.html" class="detail-link">Detail</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `;
    }
}

customElements.define('portfolio-section', PortfolioSection);

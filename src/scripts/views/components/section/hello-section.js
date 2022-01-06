import ActiveNav from '../../../utils/active-nav';
import helloIllustration from '../../../../assets/illustrations/hello.svg';

class HelloSection extends HTMLElement {
    connectedCallback() {
        this.render();
        this.navActiveState();
    }

    navActiveState() {
        this.goToPoftfolio = document.getElementById('portfolio-go-to');
        ActiveNav.click([this.goToPoftfolio]);
    }

    render() {
        this.innerHTML = `
            <div id="hello" class="hello">
                <div class="max-content">
                    <div class="hello-section">
                        <div class="hello-content">
                            <div>
                                <p>Hi,</p>
                                <p>Rohman is here.</p>
                                <p>This is my portfolio page.</p>
                                <p>Let's explore them.</p>
                            </div>
                            <img src="${helloIllustration}" alt="Hello" class="hello-illustration">
                        </div>
                        <div class="chevron-down">
                            <div class="chevron-down-content">
                                <div id="portfolio-go-to" class="chevron-down-rounded" tabindex="0">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('hello-section', HelloSection);

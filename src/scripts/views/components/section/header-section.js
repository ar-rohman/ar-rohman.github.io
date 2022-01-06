import ActiveNav from '../../../utils/active-nav';

class HeaderSection extends HTMLElement {
    connectedCallback() {
        this.render();
        this.navActiveState();
    }

    navActiveState() {
        this.navigation = document.querySelectorAll('.menu-nav');
        ActiveNav.click(this.navigation);
    }

    render() {
        this.innerHTML = `
            <header>
                <div class="max-content header-content">
                    <div class="brand">ArRohman</div>
                    <nav class="menu">
                        <div id="hello-nav" class="menu-nav active" tabindex="0">
                            <svg xmlns="http://www.w3.org/2000/svg" class="hide outline" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5
                                    0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0
                                    0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" class="solid" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M9 3a1 1 0 012 0v5.5a.5.5 0 001 0V4a1 1 0 112 0v4.5a.5.5 0 001 0V6a1
                                    1 0 112 0v5a7 7 0 11-14 0V9a1 1 0 012 0v2.5a.5.5 0 001 0V4a1 1 0 012 0v4.5a.5.5 0 001 0V3z"
                                    clip-rule="evenodd" />
                            </svg>
                            Hello!
                        </div>
                        <div id="portfolio-nav" class="menu-nav" tabindex="0">
                            <svg xmlns="http://www.w3.org/2000/svg" class="outline" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0
                                    012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" class="hide solid" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2
                                    11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                            </svg>
                            Portfolio
                        </div>
                        <div id="about-nav" class="menu-nav" tabindex="0">
                            <svg xmlns="http://www.w3.org/2000/svg" class="outline" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" class="hide solid" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1
                                    0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                            </svg>
                            About
                        </div>
                        <div id="contact-nav" class="menu-nav" tabindex="0">
                            <svg xmlns="http://www.w3.org/2000/svg" class="outline" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257
                                    1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0
                                    01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" class="hide solid" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037
                                    11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1
                                    1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                            Contact
                        </div>
                    </nav>
                </div>
            </header>
        `;
    }
}

customElements.define('header-section', HeaderSection);

class FooterSection extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    set isNavMenu(data) {
        this.navMenu = data;
    }

    render() {
        const className = this.navMenu ? 'footer-app' : 'footer-no-nav';
        const assetSource = this.navMenu ? '<a href="#/assets-source" id="asset-sources" class="link">Asset sources</a>' : '';
        const year = (new Date()).getFullYear();
        this.innerHTML = `
            <footer>
                <div class="max-content">
                    <div class="${className}">
                        ${assetSource}
                        <p>
                            Copyright &copy; 2021-${year} by
                            <a href="https://github.com/ar-rohman" class="link" target="_blank" rel="noopener">Rohman</a>
                        </p>
                    </div>
                </div>
            </footer>
        `;
    }
}

customElements.define('footer-section', FooterSection);

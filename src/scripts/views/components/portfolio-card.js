class PortfolioCard extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    set portfolioData(data) {
        this.image = data.image;
        this.projectTitle = data.title;
        this.description = data.description;
        this.hastag = data.hastag;
        this.demoLink = data.demoLink;
        this.detailLink = data.detailLink;
        this.disableDemo = data.demoLink ? '' : 'disabled';
    }

    render() {
        this.innerHTML = `
            <div class="card">
                <div class="card-logo">
                    <img src="${this.image}" alt="${this.projectTitle}" height="64" width="64">
                </div>
                <div class="card-title">${this.projectTitle}</div>
                <div class="card-content">
                    <p>${this.description}</p>
                </div>
                <div class="card-hashtag">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1
                            1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1
                            1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0
                            110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1
                            4h2.938l1-4H9.031z" clip-rule="evenodd" />
                    </svg>
                    <p>${this.hastag}</p>
                </div>
                <div class="card-footer">
                    <a href="${this.demoLink}" target="_blank" rel="noopener" class="demo-link ${this.disableDemo}">Demo</a>
                    <a href="${this.detailLink}" class="detail-link">Detail</a>
                </div>
            </div>
        `;
    }
}

customElements.define('portfolio-card', PortfolioCard);

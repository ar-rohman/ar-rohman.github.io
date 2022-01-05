import image from '../../../assets/illustrations/detail.svg';

class DetailPage extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    set data(data) {
        this.projectTitle = data.title;
        this.description = data.description;
        this.features = data.features.map((item) => `<li>${item}</li>`);
        this.technologies = data.technologies.map((item) => `<li>${item}</li>`);
        this.repoLink = data.repoLink;
        this.demoLink = data.demoLink;
        this.disableRepo = data.repoLink ? '' : 'disabled';
        this.disableDemo = data.demoLink ? '' : 'disabled';
    }

    render() {
        this.innerHTML = `
            <main>
                <div class="detail">
                    <div class="max-content">
                        <div class="detail-content">
                            <div>
                                <div class="detail-title">${this.projectTitle}</div>
                                <p class="detail-summary">${this.description}</p>
                                <div class="detail-list-header">Features</div>
                                <div class="detail-list">
                                    <ul>${this.features.join('')}</ul>
                                </div>
                                <div class="detail-list-header">Technology used</div>
                                <div class="detail-list">
                                    <ul>${this.technologies.join('')}</ul>
                                </div>
                                <div class="detail-button">
                                    <a href="${this.repoLink}" target="_blank" rel="noopener" class="detail-button-repo ${this.disableRepo}">
                                        Repository
                                    </a>
                                    <a href="${this.demoLink}" target="_blank" rel="noopener" class="detail-button-demo ${this.disableDemo}">Demo</a>
                                </div>
                            </div>
                            <img src="${image}" alt="Detail" class="detail-illustration">
                        </div>
                    </div>
                </div>
            </main>
        `;
    }
}

customElements.define('detail-page', DetailPage);

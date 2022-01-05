const UrlParser = {
    parseUrl() {
        const url = window.location.hash.slice(1).toLowerCase();
        const urlsSplits = url.split('/');
        return {
            resource: urlsSplits[1] || null,
            id: urlsSplits[2] || null,
            verb: urlsSplits[3] || null,
        };
    },

    parseUrlWithCombiner() {
        const splitedUrl = this.parseUrl();
        return this.urlCombiner(splitedUrl);
    },

    urlCombiner(splitedUrl) {
        return (splitedUrl.resource ? `/${splitedUrl.resource}` : '/')
            + (splitedUrl.id ? '/:id' : '')
            + (splitedUrl.verb ? `/${splitedUrl.verb}` : '');
    },
};

export default UrlParser;

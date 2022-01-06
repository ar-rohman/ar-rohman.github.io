const ActiveNav = {
    click(navMenu) {
        navMenu.forEach((link) => {
            link.addEventListener('click', () => {
                const section = link.id.split('-')[0];
                const sectionId = document.getElementById(section);
                sectionId.scrollIntoView();
                this.removeActiveState(navMenu);
                this.addActiveState(link);

                const capitalized = this.pascalCase(section);
                document.title = `${capitalized} - ArRohman`;
            });
        });
    },

    /**
     * Remove other active state if navigation link clicked
     * This is private method
     * @param {HTMLElement} navMenu - An array of navigation menu
     */
    removeActiveState(navMenu) {
        navMenu.forEach((element) => {
            element.classList.remove('active');
            element.querySelector('.outline').classList.remove('hide');
            element.querySelector('.solid').classList.add('hide');
        });
    },

    /**
     * Add active state if navigation link clicked
     * This is private method
     * @param {HTMLElement} link - A HTMLElement of link
     */
    addActiveState(link) {
        link.classList.add('active');
        link.querySelector('.solid').classList.remove('hide');
        link.querySelector('.outline').classList.add('hide');
    },

    /**
     * Capitalize each first word of string
     * This is private method
     * @param {String} string - A string param
     * @return {String} A pascal case string
     */
    pascalCase(string) {
        return string.replace(
            /\w\S*/g,
            (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase(),
        );
    },
};

export default ActiveNav;

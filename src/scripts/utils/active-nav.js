const ActiveNav = {

    /**
     * Add active class when nav menu clicked
     * @param {HTMLElement} navMenu - A HTMLElement of navigation
     */
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
     * Add active class when scrolled
     * @param {HTMLElement} sections - A HTMLElement of section
     * @param {HTMLElement} navigation - A HTMLElement of navigation
     */
    scroll(sections, navigation) {
        window.addEventListener('scroll', () => {
            let index = sections.length;

            // Decrements the index value each iteration.
            // see https://stackoverflow.com/a/55749862
            while (--index >= 0 && window.scrollY + 50 < sections[index].offsetTop) {
                // do nothing
                // just to decrement index value
            }
            this.removeActiveState(navigation);

            // add active class if within visible height of the element
            if (window.scrollY - sections[index].offsetHeight < sections[index].offsetTop) {
                this.addActiveState(navigation[index]);
            }
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

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

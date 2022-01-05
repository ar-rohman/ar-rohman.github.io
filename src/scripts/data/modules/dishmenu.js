import portfolioImage from '../../../assets/portfolio/dishmenu.png';

const projectTitle = 'dishmenu';
const projectslug = projectTitle.toLowerCase().replace(/\s/g, '-');

export default {
    title: projectTitle,
    slug: projectslug,
    description: 'Dish information and review (dummy).',
    image: portfolioImage,
    features: [
        'Dish list',
        'Dish Review',
    ],
    technologies: [
        'Javascript',
        'Webpack',
        'Progressive Web Application (PWA)',
        'SPA (Single Page Application)',
        'Indexed DB',
    ],
    hastag: 'Javascript',
    demoLink: '',
    detailLink: `#/portfolio/${projectslug}`,
    repoLink: 'https://github.com/ar-rohman/dishmenu',
};

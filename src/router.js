import {Test} from "./components/test.js";
import {Choice} from "./components/choice.js";

export class Router {
    constructor() {
        this.contentElement = document.getElementById('content');
        this.stylesElement = document.getElementById('styles');
        this.titleElement = document.getElementById('page-title');
        this.adaptiveStylesElement = document.getElementById('adaptiveStyles');

        this.routes = [
            {
                route: '#/',
                title: 'Главная',
                template: 'templates/index.html',
                styles: 'dist/styles/index.min.css',
                adaptiveStyles: 'dist/styles/adaptive/index.min.css',
            },
            {
                route: '#/choice/',
                title: 'Выбор',
                template: 'templates/choice.html',
                styles: 'dist/styles/choice.min.css',
                adaptiveStyles: 'dist/styles/adaptive/choice.min.css',
                load: () => {
                    new Choice();
                }
            },
            {
                route: '#/video/',
                title: 'Просмотр',
                template: 'templates/video.html',
                styles: 'dist/styles/video.min.css',
                adaptiveStyles: 'dist/styles/adaptive/video.min.css',
            },
            {
                route: '#/test/',
                title: 'Выбор',
                template: 'templates/test.html',
                styles: 'dist/styles/test.min.css',
                adaptiveStyles: 'dist/styles/adaptive/test.min.css',
                load: () => {
                    new Test();
                }
            }
        ]
    }

    async openRoute() {
        const urlRoute = window.location.hash.split('?')[0];

        const newRoute = this.routes.find(item => {
            return item.route === urlRoute;
        });

        if (!newRoute) {
            window.location.hash = '#/';
            return;
        }

        this.contentElement.innerHTML =
            await fetch(newRoute.template).then(response => response.text());
        this.stylesElement.setAttribute('href', newRoute.styles);
        this.adaptiveStylesElement.setAttribute('href', newRoute.adaptiveStyles);
        this.titleElement.innerText = newRoute.title;

        newRoute.load();
    }
}
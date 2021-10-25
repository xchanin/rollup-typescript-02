import { html, LitElement } from 'lit';
// import { commonStyles } from './assets/styles/global-scss.min.css';


export class ThemeUtils extends LitElement {
    // static styles = [commonStyles];

    public render(): any {
        return html 
        `
        <link rel="stylesheet" href="./assets/styles/global-scss.min.css">
        `
    }
}
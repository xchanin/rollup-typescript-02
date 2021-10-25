import { ThemeUtils } from './../utils/themes/Theme.utils';
import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
// import globalStyles from '../../assets/styles/css/sjs/'

@customElement('canvas-control')

export class CanvasControl extends LitElement implements ThemeUtils {

    static get styles() {
        // super.styles
        return [
            css `
        // #drawflow {
        //     position: relative;
        //     width: calc(100vw - 301px);
        //     height: calc(100% - 50px);
        //     background: var(--canvas-background-color);
        //     background-size: 25px 25px;
        // }
        `]
    }

    constructor() {
        super();
    }

    public render(): any {
        return html 
        `
        <div id="drawflow" class="drawflow">
            <slot></slot>
        </div>
        `
    }

    /**
     * Overrides the shadow DOM (turns it off) - one reason for this is to use 
     * global styles 
     * 
     * @returns this control
     */
    // public createRenderRoot(): CanvasControl {
    //     return this;
    // }
}
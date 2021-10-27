import { ThemeUtils } from './../utils/themes/Theme.utils';
import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
// import globalStyles from '../../assets/styles/css/sjs/'

@customElement('canvas-control')

export class CanvasControl extends LitElement {

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
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('canvas-control')

export class CanvasControl extends LitElement {

    constructor() {
        super();
    }


    public render(): any {
        return html 
        `
        <div>
            <slot></slot>
        </div>
        `
    }
}
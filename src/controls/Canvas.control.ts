import { html, LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('canvas-control')

export class CanvasControl extends LitElement {

    constructor() {
        super();
    }

    public Test(): void {
        alert('Inside canvas control');
    }

    public render(): TemplateResult {
        return html `<slot></slot>`
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
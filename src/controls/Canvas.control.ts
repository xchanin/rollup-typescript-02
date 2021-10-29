import { html, LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('canvas-control')

export class CanvasControl extends LitElement {

    constructor() {
        super();
    }

    public render(): TemplateResult {
        return html 
        `
        <div>
            <slot></slot>

            <!--
                ex.
                Can use name to target specific slots
                <slot name="canvas"></slot>
            -->
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
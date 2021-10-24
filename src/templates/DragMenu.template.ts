import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { MenuTemplatesUtils } from '../utils/menu-templates.utils';

@customElement('drag-menu-items')

export class DragMenuItems extends LitElement {

    constructor() {
        super();
    }

    set MenuItems(value: Array<any>) {
        MenuTemplatesUtils.Render(
          this, 
          value
        );
      }

    render() {
        return html 
        `
        <div>
            <slot></slot>
        </div>
        `
    }
}

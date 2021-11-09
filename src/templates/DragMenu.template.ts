import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MenuTemplateModel } from '../models/menu/menu-template.model.js';
import { MenuTemplatesUtils } from '../utils/menu-templates.utils.js';

@customElement('drag-menu-items')

export class DragMenuItems extends LitElement {

    private _menuItems: Array<MenuTemplateModel>;

    @property({ type: Array }) 
    public set MenuItems(value: Array<MenuTemplateModel>) {
        
        /**
         * Check if value actually changed
         */
        if (this._menuItems === value) {
            return;
        }

        // https://www.thisdot.co/blog/how-to-observe-property-changes-with-litelement-and-typescript
        const oldValue = this._menuItems;
        // console.log(`set MenuItems, oldValue: ${ this._menuItems }, newValue: ${ value }`);
        this._menuItems = value;

        /**
         * Called when an element should be updated
         */
        this.requestUpdate("MenuItems", oldValue);

        // console.count('RENDER MENU ITEMS');
        // console.log('VALUE', value);
       MenuTemplatesUtils.Render(
         this, 
         value
       );
     }

     public get MenuItems(): Array<MenuTemplateModel> {
         return this._menuItems;
     }

    constructor() {
        super();
    }

    updated(changedProperties: any): void {
        // console.log(changedProperties); // logs previous values
        // console.log(this.MenuItems); // logs current value
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

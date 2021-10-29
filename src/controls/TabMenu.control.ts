import { html, LitElement, TemplateResult } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { ModuleMenuModel } from '../models/menu/module-menu.model.js';

@customElement('tab-menu-control')

export class TabMenuControl extends LitElement {

    /**
     * Change module function passed in from parent
     */
    @property({ type: Function })
    public ChangeModuleEvent: Function;

    /**
     * Tab items
     */
    @property({ type: Array })
    public TabItems: Array<ModuleMenuModel>;

    constructor() {
        super();
    }

    /**
     * Add / remove styles on menu tab click
     **/
     protected menuTabSelected(event: any): void {
        const all = this.shadowRoot.querySelectorAll(".tab-menu ul li");
    
        /**
         * all this does is set the font in the tab to bold
        */
        for (var i = 0; i < all.length; i++) {
          all[i].classList.remove('selected');
        }
  
        event.target.classList.add('selected');
    }

    /**
     * 
     * @param module new module to load
     * @param e 
     */
    protected tabItemClicked(module: string, e: Event): void {
        this.ChangeModuleEvent(module);
        this.menuTabSelected(e);
    }

    public render(): TemplateResult {
        return html 
        `
        <link rel="stylesheet" href="./assets/styles/global-scss.min.css">

        <div class="tab-menu">
            <ul>
                ${ this.TabItems.map((item: ModuleMenuModel) => {
                    return html 
                    `
                    <li 
                    class=${ item.Class }
                    @click=${ (ev: Event) => { this.tabItemClicked(`${ item.Target }`, ev); }}>
                        ${ item.Label }
                    </li>
                    `
                }) }
            </ul>
        </div>
        `
    }
}
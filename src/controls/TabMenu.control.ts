import { html, LitElement, TemplateResult } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { FlowTool } from '../base-classes/FlowTool';

@customElement('tab-menu-control')

export class TabMenControl extends LitElement {

    /**
     * Change module function passed in from parent
     */
    @property()
    public ChangeModule: Function;

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
        this.ChangeModule(module);
        this.menuTabSelected(e);
    }

    public render(): TemplateResult {
        return html 
        `
        <link rel="stylesheet" href="./assets/styles/global-scss.min.css">
        <div class="tab-menu">
          <ul>
            <li class="selected" @click=${ (ev: Event) => { this.tabItemClicked('NapkinIDE', ev); }}>
                Napkin IDE Change
            </li>
            <li @click=${ (ev: Event) => { this.tabItemClicked('Home', ev); }}>
                Home
            </li>
            <!-- <li onclick="FlowTool.ChangeModule('Test'); 
                menuTabSelected(event);">
                Test Module
            </li> -->
          </ul>
        </div>
        `
    }
}
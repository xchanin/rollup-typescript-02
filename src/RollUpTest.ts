import { html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { DataFlowDataModel } from './models/dataflow-data.model';

export class RollUpTest extends LitElement {
  
  @property({ type: String }) Title: string;
  @property({ type: Number }) Counter: number;
  @property({ type: DataFlowDataModel }) FlowData: DataFlowDataModel;

  constructor() {
    super();

    /**
     * 
     * Set default value - overridden with passed in value
     */
    this.Title = 'This is a component';
    this.Counter = 5;
  }

  // static styles = css`
  //   :host {
  //     display: block;
  //     padding: 25px;
  //     color: var(--roll-up-test-text-color, #000);
  //   }
  // `;

  __increment() {
    this.Counter += 1;
  }

// <pre>${ this.FlowData }</pre>

  // render() {
  //   return html`
  //     <h2>${this.Title} Nr. ${ this.Counter }!</h2>
  //     <button @click=${this.__increment}>increment</button>
  //   `;
  // }
  render() {
    return html `
      <link rel="stylesheet" href="./assets/styles/global-scss.min.css">
      <link rel="stylesheet" href="./assets/styles/css/app.css">
      <template id="request">
        <div class="node-drop-shadow">
          <div class="gap flexbox-row request">
              <span df-Name></span>
              <input type="text" df-Host>
              <a href="#" df-Host></a>
          </div>
        </div>
      </template>
      <template id="request-template">
        <div class="node-drop-shadow">
          <div class="request">
              <span>Request</span>
          </div>
        </div>
      </template>

      <template id="project-template">
        <div class="node-drop-shadow">
          <div class="project gap flexbox-row flexbox-base">
              <span style="text-align: center" df-Name></span>
              <a href="#" df-Host style="color: white; text-align: center"></a>
          </div>
        </div>
      </template>

      <template id="route-template">
        <div class="node-drop-shadow">
          <div class="filter">
              <span>Filter</span>
          </div>
        </div>
      </template>

      <template id="application-template">
        <div class="node-drop-shadow">
          <div class="application">
            <div class="flexbox-base" style="height: 100px">
              <span>Application</span>
            </div>
          </div>
        </div>
      </template>

      <div class="base gap" style="margin-top: 30px; width: 100%; height: 75px;">
        <div class="request">Request</div>
        <div class="project">Project</div>
        <div class="filter">Route Filter</div>
        <div class="application">Application</div>
        <div class="modifier">DFS Modifier</div>
        <div class="join">Join</div>
        <div class="split">Split</div>
        <div class="decision">Decision</div>
        <div class="event">Event</div>
        <span class="node-drop-shadow">
          <span class="join">
            Join
          </span>
        </span>
    </div>

    <header class="my-header-class">
      <h2>Data Flow Tools</h2>
    </header>

    <div class="wrapper">
    
      <!-- 
        Left side menu items
      -->
      <div id="drag-items" class="col"></div>

      <div class="col-right">
        <div class="tab-menu">
          <ul>
            <li onclick="flowTool.ChangeModule('NapkinIDE'); 
              menuTabSelected(event);" class="selected">
              Napkin IDE Change
            </li>
            <li onclick="flowTool.ChangeModule('Home'); 
                menuTabSelected(event);">
              Test Module
            </li>
            <!-- <li onclick="flowTool.ChangeModule('Test'); 
                menuTabSelected(event);">
                Test Module
            </li> -->
          </ul>
        </div>

        <!-- Flow Tool -->
        <div 
          id="drawflow" 
          ondrop="DragDropUtils.Drop(event, addNodeToDrawFlow)" 
          ondragover="DragDropUtils.AllowDrop(event)">
        </div>
      </div>
    </div>
  </div>
    `
  }
}

import { html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { query } from 'lit/decorators/query.js';
import { DataFlowDataModel } from './models/dataflow-data.model';
import { FlowTool } from './controls/FlowTool';
import { VariablesUtils } from './utils/variables.utils';
import { DragDropUtils } from './utils/drag-drop.utils';
import { PositionUtils } from './utils/position.utils';
import { NodeTemplates } from './templates/node-templates';
export class RollUpTest extends LitElement {
  
  @property({ type: Number }) 
  public Counter: number;

  @query('#drag-items')
  public DragItems: HTMLElement;
  
  @property({ type: DataFlowDataModel }) 
  public FlowData: DataFlowDataModel;

  // @property({ type: FlowTool })
  // public FlowTool: FlowTool;

  @property({ type: String })
  public HeaderTitle: string;

  @property({ type: Array })
  public SideMenuItems: Array<any>

  @property({ type: String }) 
  public Title: string;

  /**
   * Internal reactive state refers to properties that aren't
   * part of the component's API. Typically marked protected or private
   */
  @state()
  protected canvas: HTMLElement;
  
  @state()
  protected flowTool: any;

  constructor() {
    super();

    /**
     * 
     * Set default value - overridden with passed in value
     */
    this.canvas = document.getElementById("drawflow");
    this.flowTool = new FlowTool(this.canvas);
    this.Title = 'This is a component';
    this.Counter = 5;
  }

  __increment() {
    this.Counter += 1;
  }

  protected addNodeToDrawFlow(name: string, x: number, y: number): any {
    
    if (VariablesUtils.EditorMode === 'fixed') {
      return false;
    }

    let posX = PositionUtils.DraggedNodeEndXPos(x);	
    let posY = PositionUtils.DraggedNodeEndYPos(y);

    switch (name) {
      case 'request':
        this.flowTool.AddNode
        (
          {
            ID: '1',
            AllowedOutputTypes: ['PROJECT'],
            Name: 'request', 
            NumOfInputs: 0, 
            NumOfOutputs: 1, 
            PosX: posX, 
            PosY: posY, 
            ClassList: [], 
            Data: {}, 
            HTML: NodeTemplates.Request,
            // HTML: document.getElementById('request').content,
            TypeNode: false
          }
        );
      break;
      case 'project':
        this.flowTool.AddNode
        (
          {
            Type: 'project',
            AllowedInputTypes: ['REQUEST'],
            ID: '222',
            Name: 'project', 
            NumOfInputs: 1, 
            NumOfOutputs: 1, 
            Outputs: {
              "output_1":
              {
                  "Connections":
                      []
              }
            },
            PosX: posX, 
            PosY: posY, 
            ClassList: [], 
            Data: {}, 
            HTML: NodeTemplates.Project,
            TypeNode: false
          }
        );
      break;
      case 'filter':
        this.flowTool.AddNode
        (
          {
            Name: 'filter', 
            NumOfInputs: 1, 
            NumOfOutputs: 1, 
            PosX: posX, 
            PosY: posY, 
            ClassList: [], 
            Data: {}, 
            HTML: NodeTemplates.Filter,
            TypeNode: false
          }
        );
      break;
      case 'application':
        this.flowTool.AddNode
        (
          {
            Name: 'application', 
            NumOfInputs: 0, 
            NumOfOutputs: 1, 
            PosX: posX, 
            PosY: posY, 
            ClassList: [], 
            Data: {}, 
            HTML: NodeTemplates.Application,
            TypeNode: false
          }
        );
      break;
      case 'modifier':
        this.flowTool.AddNode
        (
          {
            Name: 'modifier', 
            NumOfInputs: 0, 
            NumOfOutputs: 1, 
            PosX: posX, 
            PosY: posY, 
            ClassList: [], 
            Data: {}, 
            HTML: NodeTemplates.Modifier,
            TypeNode: false
          }
        );
      break;
      case 'join':
        this.flowTool.AddNode
        (
          {
            Name: 'join', 
            NumOfInputs: 1, 
            NumOfOutputs: 2, 
            PosX: posX, 
            PosY: posY, 
            ClassList: [], 
            Data: {}, 
            HTML: NodeTemplates.Join,
            TypeNode: false
          }
        );
      break;
      case 'split':
        this.flowTool.AddNode
        (
          {
            Name: 'split', 
            NumOfInputs: 2, 
            NumOfOutputs: 2, 
            PosX: posX, 
            PosY: posY, 
            ClassList: [], 
            Data: {}, 
            HTML: NodeTemplates.Split,
            TypeNode: false
          }
        );
      break;
      case 'decision':
        this.flowTool.AddNode
        (
          {
            Name: 'decision', 
            NumOfInputs: 1, 
            NumOfOutputs: 1, 
            PosX: posX, 
            PosY: posY, 
            ClassList: [], 
            Data: {}, 
            HTML: NodeTemplates.Decision,
            TypeNode: false
          }
        );
      break;
      case 'event':
        this.flowTool.AddNode
        (
          {
            Name: 'event', 
            NumOfInputs: 0, 
            NumOfOutputs: 1, 
            PosX: posX, 
            PosY: posY, 
            ClassList: [], 
            Data: {}, 
            HTML: NodeTemplates.Event,
            TypeNode: false
          }
        );
      break;
      case 'facebook':
        this.flowTool.AddNode
        (
          {
            Name: 'facebook', 
            NumOfInputs: 0, 
            NumOfOutputs: 1, 
            PosX: posX, 
            PosY: posY, 
            ClassList: ['facebook'], 
            Data: {}, 
            HTML: NodeTemplates.Facebook,
            TypeNode: false
          }
        );
        break;
      case 'slack':
        this.flowTool.AddNode
        (
          {
            Name: 'slack', 
            NumOfInputs: 1, 
            NumOfOutputs: 0, 
            PosX: posX, 
            PosY: posY, 
            ClassList: ['slack'], 
            Data: {}, 
            HTML: NodeTemplates.Slack,
            TypeNode: false
          }  
        );
        break;
      case 'github':
        this.flowTool.AddNode
        (
          {
            Name: 'github', 
            NumOfInputs: 0, 
            NumOfOutputs: 1, 
            PosX: posX, 
            PosY: posY, 
            ClassList: ['github'], 
            Data: {}, 
            HTML: NodeTemplates.Github,
            TypeNode: false
          }
        );
        break;
      case 'telegram':
        this.flowTool.AddNode
        (
          {
            Name: 'telegram', 
            NumOfInputs: 0, 
            NumOfOutputs: 1, 
            PosX: posX, 
            PosY: posY, 
            ClassList: ['telegram'], 
            Data: {}, 
            HTML: NodeTemplates.Telegram,
            TypeNode: false
          }
        );
        break;
      case 'aws':
        this.flowTool.AddNode
        (
          {
            Name: 'aws', 
            NumOfInputs: 0, 
            NumOfOutputs: 1, 
            PosX: posX, 
            PosY: posY, 
            ClassList: ['aws'], 
            Data: {}, 
            HTML: NodeTemplates.AWS,
            TypeNode: false
          }
        );
        break;
      case 'log':
        this.flowTool.AddNode
        (
          {
            Name: 'log', 
            NumOfInputs: 1, 
            NumOfOutputs: 1, 
            PosX: posX, 
            PosY: posY, 
            ClassList: ['log'], 
            Data: {}, 
            HTML: NodeTemplates.Log,
            TypeNode: false
          }
        );
        break;
      case 'google':
        this.flowTool.AddNode
        (
          {
            Name: 'google', 
            NumOfInputs: 1, 
            NumOfOutputs: 0, 
            PosX: posX, 
            PosY: posY, 
            ClassList: ['google'], 
            Data: {}, 
            HTML: NodeTemplates.Google,
            TypeNode: false
          }
        );
        break;
      case 'email':
        this.flowTool.AddNode
        (
          {
            Name: 'email', 
            NumOfInputs: 1, 
            NumOfOutputs: 0, 
            PosX: posX, 
            PosY: posY, 
            ClassList: ['email'], 
            Data: {}, 
            HTML: NodeTemplates.Email,
            TypeNode: false
          }
        );
        break;
      case 'template':
        this.flowTool.AddNode
        (
          {
            Name: 'template', 
            NumOfInputs: 1, 
            NumOfOutputs: 1, 
            PosX: posX, 
            PosY: posY, 
            ClassList: ['template'], 
            Data: {}, 
            HTML: NodeTemplates.Template,
            TypeNode: false
          }
        );
        break;
      case 'multiple':
        this.flowTool.AddNode
        (
          {
            Name: 'multiple', 
            NumOfInputs: 3, 
            NumOfOutputs: 4, 
            PosX: posX, 
            PosY: posY, 
            ClassList: ['multiple'], 
            Data: {}, 
            HTML: NodeTemplates.Multiple,
            TypeNode: false
          }
        );
        break;
      case 'personalized':
        this.flowTool.AddNode
        (
          {
            Name: 'personalized', 
            NumOfInputs: 1, 
            NumOfOutputs: 1, 
            PosX: posX, 
            PosY: posY, 
            ClassList: ['personalized'], 
            Data: {}, 
            HTML: NodeTemplates.Personalized,
            TypeNode: false
          }
        );
        break;
      case 'dbclick':
        this.flowTool.AddNode
        (
          {
            Name: 'dbclick', 
            NumOfInputs: 0, 
            NumOfOutputs: 1, 
            PosX: posX, 
            PosY: posY, 
            ClassList: ['dbclick'], 
            Data: {}, 
            HTML: NodeTemplates.DBLClick,
            TypeNode: false
          }
        );
        break;

      default:
    }
  }

  protected dragEvent(eventType: string, e: DragEvent): void {

    switch(eventType) {
      case 'drop':
        DragDropUtils.Drop(e, this.addNodeToDrawFlow);
        e.preventDefault();
        break;
      case 'dragover':
        DragDropUtils.AllowDrop(e);
        e.preventDefault();
        break;
    }
    
  }

  render() {
    return html `

      <link rel="stylesheet" href="./assets/styles/global-scss.min.css">

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

    <header>
      <h2>${ this.HeaderTitle }</h2>
    </header>

    <div class="wrapper">
    
      <!-- 
        Left side menu items
      -->
      <drag-menu-items 
        id="drag-items" 
        class="col"
        .MenuItems=${ this.SideMenuItems }>
      </drag-menu-items>

      <div class="col-right">
        <div class="tab-menu">
          <ul>
            <li onclick="FlowTool.ChangeModule('NapkinIDE'); 
              menuTabSelected(event);" class="selected">
              Napkin IDE Change
            </li>
            <li onclick="FlowTool.ChangeModule('Home'); 
                menuTabSelected(event);">
              Test Module
            </li>
            <!-- <li onclick="FlowTool.ChangeModule('Test'); 
                menuTabSelected(event);">
                Test Module
            </li> -->
          </ul>
        </div>

        <!-- Flow Tool -->
        <!--
        <div 
          id="drawflow" 
          @drop="${ (e: DragEvent) => this.dragEvent('drop', e) }" 
          @dragover="${ (e: DragEvent) => this.dragEvent('dragover', e) }">
        </div>
        -->
        <canvas-control 
          id="drawflow"
          class="drawflow"
          @drop="${ (e: DragEvent) => this.dragEvent('drop', e) }" 
          @dragover="${ (e: DragEvent) => this.dragEvent('dragover', e) }">

          <p>This is the Canvas</p>

        </canvas-control>
      </div>
    </div>
  </div>
    `
  }
}

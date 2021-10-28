import { html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { query } from 'lit/decorators/query.js';
import { DataFlowDataModel } from './models/dataflow-data.model';
import { FlowTool } from './base-classes/FlowTool';
import { VariablesUtils } from './utils/variables.utils';
import { DragDropUtils } from './utils/drag-drop.utils';
import { PositionUtils } from './utils/position.utils';
import { NodeTemplates } from './templates/node-templates';
export class RollUpTest extends LitElement {
  
  @property({ type: Number }) 
  public Counter: number;

  @query('#drawflow')
  public Canvas: HTMLElement;

  @query('#drag-items')
  public DragItems: HTMLElement;
  
  @state()
  private _flowData: DataFlowDataModel;

  @property({ type: DataFlowDataModel }) 
  public set FlowData(val: DataFlowDataModel) {
    this._flowData = val;

    // this.flowTool = new FlowTool(this.Canvas);
    // this.flowTool.Init(val);
  }

  public get FlowData(): DataFlowDataModel {
    return this._flowData;
  }

  @property({ type: String })
  public HeaderTitle: string;

  public get Root(): ShadowRoot | RollUpTest {
    return this.shadowRoot || this;
  }

  @property({ type: Array })
  public SideMenuItems: Array<any>

  @query("#tab-menu")
  public TabMenu: HTMLElement;

  @property({ type: String }) 
  public Title: string;

  /**
   * Internal reactive state refers to properties that aren't
   * part of the component's API. Typically marked protected or private
   */
  // @state()
  // protected canvas: HTMLElement;
  
  @state()
  protected flowTool: any;

  constructor() {
    super();

    // this.renderComplete.then(() => {

    // })

    /**
     * 
     * Set default value - overridden with passed in value
     */
    // this.canvas = document.getElementById("drawflow");
    this.flowTool = new FlowTool(this.Canvas);
    
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
            HTML: NodeTemplates.RequestTemplate,
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
            HTML: NodeTemplates.ProjectTemplate,
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
            HTML: NodeTemplates.RouteTemplate,
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
            HTML: NodeTemplates.ApplicationTemplate,
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
            HTML: NodeTemplates.ModifierTemplate,
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
            HTML: NodeTemplates.JoinTemplate,
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
            HTML: NodeTemplates.SplitTemplate,
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
            HTML: NodeTemplates.DecisionTemplate,
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
            HTML: NodeTemplates.EventTemplate,
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
            HTML: NodeTemplates.FacebookTemplate,
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
            HTML: NodeTemplates.SlackTemplate,
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
            HTML: NodeTemplates.GithubTemplate,
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
            HTML: NodeTemplates.TelegramTemplate,
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
            HTML: NodeTemplates.AWSTemplate,
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
            HTML: NodeTemplates.LogTemplate,
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
            HTML: NodeTemplates.GoogleTemplate,
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
            HTML: NodeTemplates.EmailTemplate,
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
            HTML: NodeTemplates.TemplateTemplate,
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
            HTML: NodeTemplates.MultipleTemplate,
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
            HTML: NodeTemplates.PersonalizedTemplate,
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
            HTML: NodeTemplates.DBLClickTemplate,
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

  /**
   * Called after the element’s DOM has been updated the first time, immediately before updated is called.
   * 
   * @param changedProperties Map - keys are the names of change properties
   * Values are the corresponding previous values
   * 
   * Property changes inside this method will trigger an element update
   */
  protected firstUpdated(changedProperties: any): any {

    changedProperties.forEach((oldValue: string, propName: string) => {
      console.log(`${propName} changed. oldValue: ${oldValue}`);
    });

    console.log('ROOT', this.Root);
    this.flowTool = new FlowTool(this.Canvas);
    this.flowTool.Init(this.FlowData);
  }



  render() {
    return html `

    <link rel="stylesheet" href="./assets/styles/global-scss.min.css">

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

        <!--Tab Menu-->
        <tab-menu-control 
          id="tab-menu"
          .ChangeModule=${ this.flowTool.ChangeModule.bind(this.flowTool) }>
        </tab-menu-control>

        <!-- Flow Tool -->
        <canvas-control 
          id="drawflow"
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

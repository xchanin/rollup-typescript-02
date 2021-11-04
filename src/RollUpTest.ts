import { EventsUtils } from './utils/events.utils';
import { html, LitElement } from 'lit';
import { property, queryAsync, state } from 'lit/decorators.js';
import { query } from 'lit/decorators/query.js';
import { DataFlowDataModel } from './models/dataflow-data.model.js';
import { FlowTool } from './base-classes/FlowTool.js';
import { VariablesUtils } from './utils/variables.utils.js';
import { DragDropUtils } from './utils/drag-drop.utils.js';
import { PositionUtils } from './utils/position.utils.js';
import { NodeTemplates } from './templates/node-templates.js';
import { ModuleMenuModel } from './models/menu/module-menu.model.js';
export class RollUpTest extends LitElement {

  /**
   * Get the canvas element
   *
   * @query is a decorator to access nodes in the component’s shadow root
   * equivalant to: this.renderRoot.querySelector('#first');
   * can't use document.querySelector('#first') in shadow root
   */
  @query('#drawflow')
  public Canvas!: HTMLElement;

  @query('#drag-items')
  public DragItems: HTMLElement;

  private _flowData: DataFlowDataModel;

  @property({ type: DataFlowDataModel })
  public set FlowData(val: DataFlowDataModel) {
    this._flowData = val;
  }

  public get FlowData(): DataFlowDataModel {
    return this._flowData;
  }

  /**
   * Internal reactive state refers to properties that aren't
   * part of the component's API. Typically marked protected or private
   */
  // @state()
  protected flowTool: FlowTool;

  @property({ type: String })
  public HeaderTitle: string;

  protected get root(): ShadowRoot | RollUpTest {
    return this.shadowRoot || this;
  }

  @property({ type: Array })
  public SideMenuItems: Array<any>;

  @property({ type: Array })
  protected TabMenuItems: Array<ModuleMenuModel>;

  @query("#tab-menu")
  public TabMenu: HTMLElement;

  constructor() {
    super();

    /**
     * Listen for module changed event
     */
    EventsUtils.OnEvent('moduleChanged', (moduleName: string) => {

     /**
      * On module change, rerender the canvas with new module data
      * */
     // this.requestUpdate();
    })

    /**
     * TODO: understand why I have to do this
     *
     * At this point the.Canvas doesn't exist, have to wait for things
     * to fully render - need to wait from updateComplete for this.Canvas
     * to be there, but updateComplete doesn't fire unless a property on this
     * class is updated, which is why I have to set the flowTool first?
     */
    this.flowTool = new FlowTool(this.Canvas);

    /**
     * Wait for everthing to render, then setup the flow tool
     */
    this.updateComplete.then((val: boolean) => {
      
      this.flowTool = new FlowTool(this.Canvas);
      this.flowTool.Init(this.FlowData);
    })

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
            ID: '2',
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
            Data: {
              Name: 'Google',
              Host: 'www.google.com'
            },
            HTML: NodeTemplates.ProjectTemplate,
            TypeNode: false
          }
        );
      break;
      case 'filter':
        this.flowTool.AddNode
        (
          {
            ID: '3',
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
            ID: '3',
            Name: 'application',
            NumOfInputs: 0,
            NumOfOutputs: 1,
            PosX: posX,
            PosY: posY,
            ClassList: [],
            Data: { 
              Name: 'App Test',
              Package: '@iot-ensemble/public-web',
              Version: 'latest',
             },
            HTML: NodeTemplates.ApplicationTemplate,
            TypeNode: false
          }
        );
      break;
      case 'modifier':
        this.flowTool.AddNode
        (
          {
            ID: '4',
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
            ID: '5',
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
            ID: '6',
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
            ID: '7',
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
            ID: '8',
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
            ID: '9',
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
            ID: '10',
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
            ID: '11',
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
            ID: '12',
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
            ID: '13',
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
            ID: '14',
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
            ID: '15',
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
            ID: '16',
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
            ID: '17',
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
            ID: '18',
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
            ID: '19',
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
            ID: '20',
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

  protected dragEvent(eventType: string, e: any): void {

    console.log('DragEvent');

    switch(eventType) {
      case 'drop':
        DragDropUtils.Drop(e, this.addNodeToDrawFlow.bind(this));
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
  protected firstUpdated(changedProperties: any): void {

   // alert('FirstUpdated');

    changedProperties.forEach((oldValue: string, propName: string) => {
      // console.log(`${propName} changed. oldValue: ${oldValue}`);
    });
  }


  /**
   * Return a lit-html `TemplateResult`.
   *
   * To create a `TemplateResult`, tag a JavaScript template literal
   * with the `html` helper function.
   */
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
        .MenuItems="${ this.SideMenuItems }">
      </drag-menu-items>

      <div class="col-right">

        <!--Tab Menu-->
        <tab-menu-control
          id="tab-menu"
          .TabItems=${ this.TabMenuItems }
          .ChangeModuleEvent=${ this.flowTool.ChangeModule.bind(this.flowTool) }>
        </tab-menu-control>

        <!--
          Canvas Area
         -->
        <canvas-control
          id="drawflow"
          @drop="${ (e: DragEvent) => this.dragEvent('drop', e) }"
          @dragover="${ (e: DragEvent) => this.dragEvent('dragover', e) }">
        </canvas-control>
      </div>
    </div>
  </div>
    `
  }


}

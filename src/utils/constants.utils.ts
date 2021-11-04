import { DispatchedEventsModel } from './../models/events/dispatched-events.model.js';
import { DataFlowDataModel } from '../models/dataflow-data.model.js';
import { NodeTemplates } from '../templates/node-templates.js';
import { NodeModel } from '../models/nodes/node.model.js';
// import {
//   TestNapkinIDEConfig,
//   TestNapkinIDEFlow,
//   NapkinIDENode,
//   NapkinIDEEdge,
// } from '@semanticjs/napkin-ide';

export const TestNapkinIDEConfig: any = {
  'NodeTypes': {
    request: {
      AllowedOutputTypes: ['PROJECT'],
      ClassList: ['entry-node'],
      HTMLTemplateID: 'RequestTemplate',
      InputCountLimit: 1,
    },
    project: {
      AllowedInputTypes: ['REQUEST'],
      HTMLTemplateID: 'ProjectTemplate',
      InputCountLimit: 1,
    },
    'route-filter': {
      AllowedInputTypes: ['PROJECT'],
      AllowedOutputTypes: ['APPLICATION'],
      HTMLTemplateID: 'RouteTemplate',
    },
    application: {
      AllowedInputTypes: ['ROUTE_FILTER'],
      ClassList: ['exit-node'],
      HTMLTemplateID: 'ApplicationTemplate',
      OutputCountLimit: 0,
    },
  },
};

export const TestNapkinIDEFlow: any = {
  Nodes: [
    {
      ID: '1',
      Type: 'request',
      ClassList: ['persisted-class'],
      Data: {},
    },
    {
      ID: '2',
      Type: 'project',
      Data: {
        Name: 'IoT Ensemble',
        Host: 'www.iot-ensemble.com',
      },
    },
    {
      ID: '3',
      Type: 'route-filter',
      Data: {
        Path: '/',
      },
    },
    {
      ID: '4',
      Type: 'application',
      Data: {
        Name: 'Application',
        Package: '@iot-ensemble/public-web',
        Version: 'latest',
      },
    },
  ],
  Edges: [
    {
      ID: '1',
      Outputs: {
        output_1: {
          Connections: [],
        }
      },
      NodeInID: '1',
      NodeOutID: '2',
    },
    {
      ID: '2',
      Inputs: {
        input_1: {
          Connections: [
            {
              node: '1',
              input: 'output_1',
            },
          ],
        }
      },
      Outputs: {
        output_1: {
          Connections: [],
        }
      },
      NodeInID: '2',
      NodeOutID: '3',
    },
    {
      ID: '3',
      Inputs: {
        input_1: {
          Connections: [
            {
              node: '2',
              input: 'output_1',
            },
          ],
        }
      },
      Outputs: {
        output_1: {
          Connections: [],
        },
        output_2: {
          Connections: [],
        }
      },
      NodeInID: '2',
      NodeOutID: '3',
    },
    {
      ID: '4',
      Inputs: {
        input_1: {
          Connections: [
            {
              node: '3',
              input: 'output_1',
            },
          ],
        }
      },
      NodeInID: '2',
      NodeOutID: '3',
    }
  ],
};

export class ConstantUtils {
  public static TEST_MODULE: DataFlowDataModel = {
    Module: 'NapkinIDE',
    Data: [
      {
        ID: '1',
        Name: 'one',
        NumOfInputs: 0,
        NumOfOutputs: 1,
        PosX: 50,
        PosY: 100,
        ClassList: [],
        Outputs: {
          output_1: {
            Connections: [],
          },
          output_2: {
            Connections: [],
          },
          output_3: {
            Connections: [],
          },
        },
        Data: {
          Title: 'IoT Ensemble',
          Name: 'Text Input',
          Host: 'http://www.iot-ensemble.com',
        },
        HTML: `
                        <div class="node-drop-shadow">
                            <div class="gap flexbox-column flexbox-base request">
                                <span style="text-align: center" df-Title></span>
                                <input style="
                                    padding: 0.2em; 
                                    width: 75%; 
                                    box-sizing:border-box" type=\"text\" df-Name>
                                <a href="#" df-Host></a>
                            </div>
                        </div>
                    `,
        TypeNode: false,
      },
      {
        ID: '2',
        Name: 'two',
        NumOfInputs: 0,
        NumOfOutputs: 1,
        PosX: 250,
        PosY: 100,
        ClassList: [],
        Data: {},
        Inputs: {
          input_1: {
            Connections: [
              {
                node: '1',
                input: 'output_1',
              },
            ],
          },
          input_2: {
            Connections: [],
          },
        },
        Outputs: {
          output_1: {
            Connections: [],
          },
        },
        HTML: NodeTemplates.ProjectTemplate, // this calls an HTML string
        TypeNode: false,
      },
      // {
      //     ID: '3',
      //     Name: 'three',
      //     NumOfInputs: 0,
      //     NumOfOutputs: 1,
      //     PosX: 50,
      //     PosY: 100,
      //     ClassList: [],
      //     Data: {},
      //     HTML: document.getElementById('request').content,
      //     TypeNode: true
      // },
    ],
  };

  static count: number = 0;

  protected static getProperty<T, K extends keyof T>(o: T, propertyName: K): T[K] {
    return o[propertyName];
  }

  public static NAPKIN_IDE_MODULE_DATA: DataFlowDataModel = {
    Module: 'NapkinIDE',
    Data: TestNapkinIDEFlow.Nodes!.map((node: any) => {
      const config = TestNapkinIDEConfig.NodeTypes![<string>node.Type];

      const inputs = TestNapkinIDEFlow.Edges?.filter(
        (edge: any) => edge.ID === node.ID
      ).map((edge: any) => {
        
        return edge.Inputs;
      });

      const outputs = TestNapkinIDEFlow.Edges?.filter(
        (edge: any) => edge.ID === node.ID
      ).map((edge: any) => { 

        return edge.Outputs
      });

      // HTML: <string>document.getElementById(<string>config.HTMLTemplateID)?.innerHTML

      return <NodeModel> {
        AllowedInputTypes: config.AllowedInputTypes,
        AllowedOutputTypes: config.AllowedOutputTypes,
        ClassList: node.ClassList,
        Data: node.Data,
        HTML: this.getProperty(NodeTemplates, config.HTMLTemplateID),
        ID: `${++ConstantUtils.count}`,
        Inputs: inputs[0],
        NodeType: node.Type.toUpperCase(),
        NumOfInputs: config.InputCountLimit,
        NumOfOutputs: config.OutputCountLimit,
        Outputs: outputs[0],
        PosY: node.PositionY || ConstantUtils.count * 150,
        PosX: node.PositionX || ConstantUtils.count * 100,
        TypeNode: false,
      };
    }),
  };

  public static HOME_MODULE_DATA: DataFlowDataModel = {
    Module: 'Home',
    Data: TestNapkinIDEFlow.Nodes!.map((node: any) => {
      const config = TestNapkinIDEConfig.NodeTypes![<string>node.Type];

      const inputs = TestNapkinIDEFlow.Edges?.filter(
        (edge: any) => edge.ID === node.ID
      ).map((edge: any) => {
        
        return edge.Inputs;
      });

      const outputs = TestNapkinIDEFlow.Edges?.filter(
        (edge: any) => edge.ID === node.ID
      ).map((edge: any) => { 

        return edge.Outputs
      });

      // HTML: <string>document.getElementById(<string>config.HTMLTemplateID)?.innerHTML

      return <NodeModel> {
        AllowedInputTypes: config.AllowedInputTypes,
        AllowedOutputTypes: config.AllowedOutputTypes,
        ClassList: node.ClassList,
        Data: node.Data,
        HTML: this.getProperty(NodeTemplates, config.HTMLTemplateID),
        ID: `${++ConstantUtils.count}`,
        Inputs: inputs[0],
        NodeType: node.Type.toUpperCase(),
        NumOfInputs: config.InputCountLimit,
        NumOfOutputs: config.OutputCountLimit,
        Outputs: outputs[0],
        PosY: node.PositionY || ConstantUtils.count * 150,
        PosX: node.PositionX || ConstantUtils.count * 100,
        TypeNode: false,
      };
    }),
  };
  
  // public static HOME_MODULE_DATA: DataFlowDataModel = {
  //   Module: 'Home',
  //   Data: [
  //     {
  //       ID: '1',
  //       Name: 'welcome',
  //       Data: {},
  //       ClassList: ['welcome'],
  //       HTML: '\n    <div>\n      <div class="title-box">👏 Welcome!!</div>\n      <div class="box">\n        <p>Simple flow library <b>demo</b>\n        <a href="https://github.com/jerosoler/Drawflow" target="_blank">Drawflow</a> by <b>Jero Soler</b></p><br>\n\n        <p>Multiple input / outputs<br>\n           Data sync nodes<br>\n           Import / export<br>\n           Modules support<br>\n           Simple use<br>\n           Type: Fixed or Edit<br>\n           Events: view console<br>\n           Pure Javascript<br>\n        </p>\n        <br>\n        <p><b><u>Shortkeys:</u></b></p>\n        <p>🎹 <b>Delete</b> for remove selected<br>\n        💠 Mouse Left Click == Move<br>\n        ❌ Mouse Right == Delete Option<br>\n        🔍 Ctrl + Wheel == Zoom<br>\n        📱 Mobile support<br>\n        ...</p>\n      </div>\n    </div>\n    ',
  //       TypeNode: false,
  //       NumOfInputs: 0,
  //       NumOfOutputs: 1,
  //       Inputs: [],
  //       Outputs: [],
  //       PosX: 50,
  //       PosY: 50,
  //     },
  //     {
  //       ID: '2',
  //       Name: 'slack',
  //       Data: {},
  //       ClassList: ['slack'],
  //       HTML: NodeTemplates.SlackTemplate,
  //       TypeNode: false,
  //       NumOfInputs: 0,
  //       NumOfOutputs: 1,
  //       Inputs: {
  //         input_1: {
  //           Connections: [{ node: '9', input: 'output_1' }],
  //         },
  //       },
  //       Outputs: {
  //         output_1: {
  //           Connections: [],
  //         },
  //       },
  //       PosX: 1028,
  //       PosY: 87,
  //     },
  //     {
  //       ID: '3',
  //       Name: 'telegram',
  //       Data: {
  //         channel: 'channel_2',
  //       },
  //       ClassList: ['telegram'],
  //       HTML: NodeTemplates.TelegramTemplate,
  //       TypeNode: false,
  //       Inputs: {
  //         input_1: {
  //           Connections: [{ node: '7', input: 'output_1' }],
  //         },
  //       },
  //       NumOfInputs: 0,
  //       NumOfOutputs: 1,
  //       Outputs: {
  //         output_1: {
  //           Connections: [],
  //         },
  //       },
  //       PosX: 1032,
  //       PosY: 184,
  //     },
  //     {
  //       ID: '4',
  //       Name: 'email',
  //       Data: {},
  //       ClassList: ['email'],
  //       HTML: NodeTemplates.EmailTemplate,
  //       TypeNode: false,
  //       Inputs: {
  //         input_1: {
  //           Connections: [
  //             { node: '5', input: 'output_1' }, // input from template
  //           ],
  //         },
  //       },
  //       Outputs: {
  //         output_1: {
  //           Connections: [],
  //         },
  //       },
  //       NumOfInputs: 0,
  //       NumOfOutputs: 1,
  //       PosX: 1033,
  //       PosY: 439,
  //     },
  //     {
  //       ID: '5',
  //       Name: 'template',
  //       Data: {
  //         template: 'Write your template',
  //       },
  //       ClassList: ['template'],
  //       HTML: NodeTemplates.TemplateTemplate,
  //       TypeNode: false,
  //       NumOfInputs: 0,
  //       NumOfOutputs: 1,
  //       Inputs: {
  //         input_1: {
  //           Connections: [
  //             { node: '8', input: 'output_1' }, // input from template
  //           ],
  //         },
  //       },
  //       Outputs: {
  //         output_1: {
  //           Connections: [
  //             { node: '4', output: 'input_1' }, // output to email
  //             { node: '11', output: 'input_1' }, // output to log file
  //           ],
  //         },
  //       },
  //       PosX: 298,
  //       PosY: 500,
  //     },
  //     {
  //       ID: '6',
  //       Name: 'github',
  //       Data: {
  //         name: 'https://github.com/jerosoler/Drawflow',
  //       },
  //       ClassList: ['github'],
  //       HTML: NodeTemplates.GithubTemplate,
  //       TypeNode: false,
  //       NumOfInputs: 0,
  //       NumOfOutputs: 1,
  //       Inputs: {
  //         input_1: {
  //           Connections: [],
  //         },
  //       },
  //       Outputs: {
  //         output_1: {
  //           Connections: [{ node: '5', output: 'input_1' }],
  //         },
  //       },
  //       PosX: 295,
  //       PosY: 50,
  //     },
  //     {
  //       ID: '7',
  //       Name: 'facebook',
  //       Data: {},
  //       ClassList: ['facebook'],
  //       HTML: NodeTemplates.FacebookTemplate,
  //       TypeNode: false,
  //       NumOfInputs: 0,
  //       NumOfOutputs: 1,
  //       Inputs: {
  //         input_1: {
  //           Connections: [],
  //         },
  //       },
  //       Outputs: {
  //         output_1: {
  //           Connections: [
  //             { node: '9', output: 'input_1' },
  //             { node: '3', output: 'input_1' },
  //             { node: '11', output: 'input_1' },
  //           ],
  //         },
  //       },
  //       PosX: 500,
  //       PosY: 87,
  //     },
  //     {
  //       ID: '8',
  //       Name: 'diamondTest',
  //       Data: {},
  //       ClassList: [''],
  //       HTML: '\n<div>\n<div>DDD</div>\n</div>\n',
  //       TypeNode: false,
  //       NumOfInputs: 0,
  //       NumOfOutputs: 1,
  //       Inputs: {
  //         input_1: {
  //           Connections: [{ node: '6', input: 'output_1' }], // input connection from github
  //         },
  //       },
  //       Outputs: {
  //         output_1: {
  //           Connections: [],
  //         }, // seems to need at least an empty output to show the output marker
  //       },
  //       PosX: 350,
  //       PosY: 350,
  //     },
  //     {
  //       ID: '9',
  //       Name: 'circleTest',
  //       Data: {},
  //       ClassList: [''],
  //       HTML: '\n<div>\n<div>circle</div>\n</div>\n',
  //       TypeNode: false,
  //       NumOfInputs: 0,
  //       NumOfOutputs: 1,
  //       Inputs: {
  //         input_1: {
  //           Connections: [{ node: '7', input: 'output_1' }],
  //         },
  //       },
  //       Outputs: {
  //         output_1: {
  //           Connections: [{ node: '2', output: 'input_1' }],
  //         },
  //       },
  //       PosX: 700,
  //       PosY: 75,
  //     },
  //     {
  //       ID: '11',
  //       Name: 'log',
  //       Data: {},
  //       ClassList: ['log'],
  //       HTML: NodeTemplates.LogTemplate,
  //       TypeNode: false,
  //       NumOfInputs: 0,
  //       NumOfOutputs: 1,
  //       Inputs: {
  //         input_1: {
  //           Connections: [
  //             { node: '5', input: 'output_1' },
  //             { node: '7', input: 'output_1' },
  //           ],
  //         },
  //       },
  //       Outputs: {
  //         output_1: {
  //           Connections: [],
  //         },
  //       },

  //       PosX: 1131,
  //       PosY: 600,
  //     },
  //   ],

  //   // public static OTHER_MODULE_DATA: DataFlowDataModel = {
  //   //     Module: 'Other',
  //   //     Data:
  //   //             {
  //   //                 "8":
  //   //                 {
  //   //                     "id": 8,
  //   //                     "name": "personalized",
  //   //                     "data": {},
  //   //                     "class": "personalized",
  //   //                     "html": "\n            <div>\n              Personalized\n            </div>\n            ",
  //   //                     "typenode": false,
  //   //                     "inputs":
  //   //                     {
  //   //                         "input_1":
  //   //                         {
  //   //                             "connections":
  //   //                                 [
  //   //                                     { "node": "12", "input": "output_1" },
  //   //                                     { "node": "12", "input": "output_2" },
  //   //                                     { "node": "12", "input": "output_3" },
  //   //                                     { "node": "12", "input": "output_4" }
  //   //                                 ]
  //   //                         }
  //   //                     },
  //   //                     "outputs":
  //   //                     {
  //   //                         "output_1":
  //   //                         {
  //   //                             "connections":
  //   //                                 [
  //   //                                     { "node": "9", "output": "input_1" }
  //   //                                 ]
  //   //                         }
  //   //                     },
  //   //                     "pos_x": 764,
  //   //                     "pos_y": 227
  //   //                 },
  //   //                 "9":
  //   //                 {
  //   //                     "id": 9,
  //   //                     "name": "dbclick",
  //   //                     "data":
  //   //                     {
  //   //                         "name": "Hello World!!"
  //   //                     },
  //   //                     "class": "dbclick",
  //   //                     "html": "\n            <div>\n            <div class=\"title-box\"><i class=\"fas fa-mouse\"></i> Db Click</div>\n              <div class=\"box dbclickbox\" ondblclick=\"showpopup(event)\">\n                Db Click here\n                <div class=\"modal\" style=\"display:none\">\n                  <div class=\"modal-content\">\n                    <span class=\"close\" onclick=\"closemodal(event)\">&times;</span>\n                    Change your variable {name} !\n                    <input type=\"text\" df-name>\n                  </div>\n\n                </div>\n              </div>\n            </div>\n            ",
  //   //                     "typenode": false,
  //   //                     "inputs":
  //   //                     {
  //   //                         "input_1":
  //   //                         {
  //   //                             "connections":
  //   //                                 [
  //   //                                     { "node": "8", "input": "output_1" }
  //   //                                 ]
  //   //                         }
  //   //                     }, "outputs":
  //   //                     {
  //   //                         "output_1":
  //   //                         {
  //   //                             "connections":
  //   //                                 [
  //   //                                     { "node": "12", "output": "input_2" }
  //   //                                 ]
  //   //                         }
  //   //                     },
  //   //                     "pos_x": 209,
  //   //                     "pos_y": 38
  //   //                 },
  //   //                 "12":
  //   //                 {
  //   //                     "id": 12,
  //   //                     "name": "multiple",
  //   //                     "data": {},
  //   //                     "class": "multiple",
  //   //                     "html": "\n            <div>\n              <div class=\"box\">\n                Multiple!\n              </div>\n            </div>\n            ",
  //   //                     "typenode": false,
  //   //                     "inputs":
  //   //                     {
  //   //                         "input_1":
  //   //                         {
  //   //                             "connections": []
  //   //                         },
  //   //                         "input_2":
  //   //                         {
  //   //                             "connections":
  //   //                                 [
  //   //                                     { "node": "9", "input": "output_1" }
  //   //                                 ]
  //   //                         },
  //   //                         "input_3": {
  //   //                             "connections": []
  //   //                         }
  //   //                     },
  //   //                     "outputs":
  //   //                     {
  //   //                         "output_1":
  //   //                         {
  //   //                             "connections":
  //   //                                 [
  //   //                                     { "node": "8", "output": "input_1" }
  //   //                                 ]
  //   //                         }, "output_2":
  //   //                         {
  //   //                             "connections":
  //   //                                 [
  //   //                                     { "node": "8", "output": "input_1" }
  //   //                                 ]
  //   //                         },
  //   //                         "output_3":
  //   //                         {
  //   //                             "connections":
  //   //                                 [
  //   //                                     { "node": "8", "output": "input_1" }
  //   //                                 ]
  //   //                         },
  //   //                         "output_4":
  //   //                         {
  //   //                             "connections":
  //   //                                 [
  //   //                                     { "node": "8", "output": "input_1" }
  //   //                                 ]
  //   //                         }
  //   //                     },
  //   //                     "pos_x": 179,
  //   //                     "pos_y": 272
  //   //                 }
  //   //             }
  // };

  public static DISPATCHED_EVENTS: Array<DispatchedEventsModel> = [
    { Event: 'mouseMove', Message: 'Mouse position', Params: ['x', 'y'] },
    { Event: 'nodeMoved', Message: 'Node moved' },
    { Event: 'nodeCreated', Message: 'Node created' },
    { Event: 'nodeRemoved', Message: 'Node removed' },
    { Event: 'nodeSelected', Message: 'Node selected' },
    { Event: 'moduleCreated', Message: 'Module created' },
    { Event: 'moduleChanged', Message: 'Module Changed' },
    { Event: 'connectionCreated', Message: 'Connection created' },
    { Event: 'zoom', Message: 'Zoom' },
    { Event: 'translate', Message: 'Translate' },
    { Event: 'addReroute', Message: 'Add reroute' },
    { Event: 'removeReroute', Message: 'Remove reroute' },
  ];
}

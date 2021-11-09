import { IdsUtils } from '../utils/ids.utils.js';
import { NodeModel } from '../models/nodes/node.model.js';
import { VariablesUtils } from '../utils/variables.utils.js';
import { DataFlowBaseClass } from './data-flow-base-class.js';
import { DataFlowDataModel } from '../models/dataflow-data.model.js';
import { ContainerEvent } from '../models/nodes/container-event.model.js';
import { EventsUtils } from '../utils/events.utils.js';
import { NodeBaseClass } from '../templates/node-base-class.js';

export class FlowTool extends DataFlowBaseClass {
 
    /**
     * List of event listeners
     */
     protected eventListeners: Array<ContainerEvent>;
     protected nodeBaseClass: NodeBaseClass;

     constructor(container: HTMLElement, render: any = null, parent: any = null) {
 
         super();

         this.nodeBaseClass = new NodeBaseClass();
         VariablesUtils.Parent = parent;
         VariablesUtils.Render = render;
         VariablesUtils.MainContainer = container;
 
         this.setEventListeners();
     }

     protected setEventListeners(): void {
      this.eventListeners = [
        {
            Event: 'mouseup', 
            Action: this.DragEnd.bind(this)
        },
        {
            Event: 'mousemove', 
            Action: this.Position.bind(this)
        },
        {
            Event: 'mousedown', 
            Action: this.Click.bind(this)
        },
        {
            Event: 'touchend', 
            Action: this.DragEnd.bind(this)
        },
        {
            Event: 'touchmove', 
            Action: this.Position.bind(this)
        },
        {
            Event: 'touchstart', 
            Action: this.Click.bind(this)
        },
        {
            Event: 'contextmenu', 
            Action: this.Contextmenu.bind(this)
        },
        {
            Event: 'keydown', 
            Action: this.KeyDown.bind(this)
        },
        {
            Event: 'wheel', 
            Action: this.Zoom_Enter.bind(this)
        },
        {
            Event: 'input', 
            Action: this.UpdateNodeValue.bind(this)
        },
        {
            Event: 'dblclick', 
            Action: this.DblClick.bind(this)
        },
        {
            Event: 'onpointerdown',
            Action: this.PointerDown.bind(this)
        },
        {
            Event: 'onpointermove',
            Action: this.PointerMove.bind(this)
        },
        {
            Event: 'onpointerup',
            Action: this.PointerUp.bind(this)
        },
        {
            Event: 'onpointercancel',
            Action: this.PointerUp.bind(this)
        },
        {
            Event: 'onpointerout',
            Action: this.PointerUp.bind(this)
        },
        {
            Event: 'onpointerleave',
            Action: this.PointerUp.bind(this)
        }
    ]
     }

    /**
      * Start creating nodes
      */
     protected start (): void {

      /**
       * Initialize UI events
       */
       EventsUtils.InitializeDispatchedEvents();

      /**
       * Parent container
       */
       VariablesUtils.MainContainer.classList.add('parent-drawflow');
       VariablesUtils.MainContainer.tabIndex = 0;

       /**
        * Container that holds everything
        */
       // const precanvas: HTMLElement | null = document.getElementById('flow-canvas');


       /**
        * if precanvas already exists, then remove it
        */
      //  if (precanvas && precanvas.parentNode) {
      //     precanvas.parentNode.removeChild(precanvas);
      //  }

      /**
       * Don't have access to document.getElementById, so remove canvas this way
       * 
       * Probably will find a better way to do this, but for now...
       */
      const mainContainerChildren: HTMLCollection = VariablesUtils.MainContainer.children;
      Array.from(mainContainerChildren).forEach((elm: Element) => {
        if (elm.id === 'flow-canvas') {
          VariablesUtils.MainContainer.removeChild(elm);
          VariablesUtils.PreCanvas = null;
        }
      })

       VariablesUtils.PreCanvas = document.createElement('div');
       VariablesUtils.PreCanvas.setAttribute('id', 'flow-canvas');
       VariablesUtils.PreCanvas.classList.add('drawflow');
       VariablesUtils.MainContainer.appendChild(VariablesUtils.PreCanvas);
 
     /**
      * add all eventlisteners to the container
      */
      EventsUtils.AddEventListeners(VariablesUtils.MainContainer, this.eventListeners);
 
       // VariablesUtils.load();
     }
     
     /**
      * load platform data
      */
     protected load(): void {
 
      for (var key in this.activeModule(VariablesUtils.ActiveModule).Data) {

        /**
         * Load nodes from config values
         */
        this.nodeBaseClass.LoadNodesFromConfig(this.activeModule(VariablesUtils.ActiveModule).Data[key], VariablesUtils.PreCanvas);
      }

       if(VariablesUtils.Reroute) {
         for (var key in this.activeModule(VariablesUtils.ActiveModule).Data) {
           this.addRerouteImport(this.activeModule(VariablesUtils.ActiveModule).Data[key]);
         }
       }
   
       for (var key in this.activeModule(VariablesUtils.ActiveModule).Data) {
         this.updateConnectionNodes('node-'+key);
       }
   
       const flowTool: any = this.activeModule(VariablesUtils.ActiveModule);

       let number = 1;

       Object.keys(flowTool).map(function(key, index) {
         Object.keys(flowTool[key]).map(function(id, index2) {

           if(parseInt(id) >= number) {
             number = parseInt(id) + 1;
           }
         });
       });

       VariablesUtils.NodeId = number;
     }
   
    //  registerNode(name: any, html: any, props = null, options = null) {
    //    VariablesUtils.noderegister[name] = {html: html, props: props, options: options};
    //  }

    /**
     * When dragging a node onto the canvas
     * 
     * @param val Node model
     * @returns node id
     */
    public AddNode(val:NodeModel): string {
      return this.nodeBaseClass.AddNode(val);
    }
    
      protected addRerouteImport(dataNode: any): void {
        const reroute_width = VariablesUtils.RerouteWidth
        const reroute_fix_curvature = VariablesUtils.RerouteFixCurvature
        const container = VariablesUtils.MainContainer;
        Object.keys(dataNode.outputs).map(function(output_item, index) {
          Object.keys(dataNode.outputs[output_item].Connections).map(function(input_item, index) {
            const points = dataNode.outputs[output_item].Connections[input_item].points
            if(points !== undefined) {
    
              points.forEach((item: any, i: any) => {
                const input_id = dataNode.outputs[output_item].Connections[input_item].node;
                const input_class = dataNode.outputs[output_item].Connections[input_item].output;
                const ele: any = container.querySelector('.connection.node_in_node-'+input_id+'.node_out_node-'+dataNode.id+'.'+output_item+'.'+input_class);
    
                if(reroute_fix_curvature) {
                  if(i === 0) {
                    for (var z = 0; z < points.length; z++) {
                      var path = document.createElementNS('http://www.w3.org/2000/svg','path');
                      path.classList.add('main-path');
                      path.setAttributeNS(null, 'd', '');
                      ele.appendChild(path);
    
                    }
                  }
                }
    
                const point = document.createElementNS('http://www.w3.org/2000/svg','circle');
                point.classList.add('point');
                var pos_x = item.pos_x;
                var pos_y = item.pos_y;
    
                point.setAttributeNS(null, 'cx', pos_x);
                point.setAttributeNS(null, 'cy', pos_y);
                point.setAttributeNS(null, 'r', reroute_width.toString());
    
                ele.appendChild(point);
              });
            };
          });
        });
     }

    //  updateNodeDataFromId(id: any, data: any) {
    //    var moduleName: any = this.getModuleFromNodeId(id)
    //    this.activeModule(VariablesUtils.CurrentModule).Data[id].data = data;
    //    if(VariablesUtils.CurrentModule === moduleName) {
    //      const content: any = VariablesUtils.MainContainer.querySelector('#node-'+id);
   
    //      Object.entries(data).forEach(function (key, value) {
    //        if(typeof key[1] === 'object') {
    //          insertObjectkeys(null, key[0], key[0]);
    //        } else {
    //          var elems = content.querySelectorAll('[df-'+key[0]+']');
    //            for(var i = 0; i < elems.length; i++) {
    //              elems[i].value = key[1];
    //            }
    //        }
    //      })
   
    //      function insertObjectkeys(object: any, name: any, completname: any) {
    //        if(object === null) {
    //          var object = data[name];
    //        } else {
    //          var object = object[name]
    //        }
    //        if(object !== null) {
    //          Object.entries(object).forEach(function (key, value) {
    //            if(typeof key[1] === 'object') {
    //              insertObjectkeys(object, key[0], completname+'-'+key[0]);
    //            } else {
    //              var elems = content.querySelectorAll('[df-'+completname+'-'+key[0]+']');
    //                for(var i = 0; i < elems.length; i++) {
    //                  elems[i].value = key[1];
    //                }
    //            }
    //          });
    //        }
    //      }
   
    //    }
    //  }
   
    //  addNodeInput(id: any) {
    //    var moduleName: any = this.getModuleFromNodeId(id)
    //    const infoNode: any = this.getNodeFromId(id)
    //    const numInputs: any = Object.keys(infoNode.inputs).length;
    //    if(VariablesUtils.CurrentModule === moduleName) {
    //      //Draw input
    //      const input = document.createElement('div');
    //      input.classList.add('input');
    //      input.classList.add('input_'+(numInputs+1));
    //      const parent: any = VariablesUtils.MainContainer.querySelector('#node-'+id+' .inputs');
    //      parent.appendChild(input);
    //      this.updateConnectionNodes('node-'+id);
   
    //    }
    //    this.activeModule(VariablesUtils.CurrentModule).Data[id].inputs['input_'+(numInputs+1)] = { 'connections': []};
    //  }
   
    //  addNodeOutput(id: any) {
    //    var moduleName: any = this.getModuleFromNodeId(id)
    //    const infoNode: any = this.getNodeFromId(id)
    //    const numOutputs: any = Object.keys(infoNode.outputs).length;
    //    if(VariablesUtils.CurrentModule === moduleName) {
    //      //Draw output
    //      const output = document.createElement('div');
    //      output.classList.add('output');
    //      output.classList.add('output_'+(numOutputs+1));
    //      const parent: any = VariablesUtils.MainContainer.querySelector('#node-'+id+' .outputs');
    //      parent.appendChild(output);
    //      this.updateConnectionNodes('node-'+id);
   
    //    }
    //    this.activeModule(VariablesUtils.CurrentModule).Data[id].outputs['output_'+(numOutputs+1)] = { 'connections': []};
    //  }
   
    //  removeNodeInput(id: any, input_class: any) {
    //    var moduleName: any = this.getModuleFromNodeId(id)
    //    const infoNode: any = this.getNodeFromId(id)
    //    if(VariablesUtils.CurrentModule === moduleName) {
    //      VariablesUtils.MainContainer.querySelector('#node-'+id+' .inputs .input.'+input_class).remove();
    //    }
    //    const removeInputs: any = [];
    //    Object.keys(infoNode.inputs[input_class].connections).map(function(key, index) {
    //      const id_output = infoNode.inputs[input_class].connections[index].node;
    //      const output_class = infoNode.inputs[input_class].connections[index].input;
    //      removeInputs.push({id_output, id, output_class, input_class})
    //    })
    //    // Remove connections
    //    removeInputs.forEach((item: any, i: any) => {
    //      this.removeSingleConnection(item.id_output, item.id, item.output_class, item.input_class);
    //    });
   
    //    delete this.activeModule(VariablesUtils.CurrentModule).Data[id].inputs[input_class];
   
    //    // Update connection
    //    const connections: Array<any> = [];
    //    const connectionsInputs = this.activeModule(VariablesUtils.CurrentModule).Data[id].inputs
    //    Object.keys(connectionsInputs).map(function(key, index) {
    //      connections.push(connectionsInputs[key]);
    //    });
    //    this.activeModule(VariablesUtils.CurrentModule).Data[id].inputs = {};
    //    const input_class_id = input_class.slice(6);
    //    let nodeUpdates: any = [];
    //    connections.forEach((item, i) => {
    //      item.connections.forEach((itemx: any, f: any) => {
    //        nodeUpdates.push(itemx);
    //      });
    //      this.activeModule(VariablesUtils.CurrentModule).Data[id].inputs['input_'+ (i+1)] = item;
    //    });
    //    nodeUpdates =  new Set(nodeUpdates.map((e: any) => JSON.stringify(e)));
    //    nodeUpdates = Array.from(nodeUpdates).map((e: any) => JSON.parse(e));
   
    //    if(VariablesUtils.CurrentModule === moduleName) {
    //      const eles = VariablesUtils.MainContainer.querySelectorAll('#node-'+id +' .inputs .input');
    //      eles.forEach((item: any, i: any) => {
    //        const id_class: any = item.classList[1].slice(6);
    //        if(parseInt(input_class_id) < parseInt(id_class)) {
    //          item.classList.remove('input_'+id_class);
    //          item.classList.add('input_'+(id_class-1));
    //        }
    //      });
   
    //    }
   
    //    nodeUpdates.forEach((itemx: any, i: any) => {
    //      this.activeModule(VariablesUtils.CurrentModule).Data[itemx.node].outputs[itemx.input].connections.forEach((itemz: any, g: any) => {
    //          if(itemz.node == id) {
    //            const output_id = itemz.output.slice(6);
    //            if(parseInt(input_class_id) < parseInt(output_id)) {
    //              if(VariablesUtils.CurrentModule === moduleName) {
    //                const ele: any = VariablesUtils.MainContainer.querySelector('.connection.node_in_node-'+id+'.node_out_node-'+itemx.node+'.'+itemx.input+'.input_'+output_id);
    //                ele.classList.remove('input_'+output_id);
    //                ele.classList.add('input_'+(output_id-1));
    //              }
    //              if(itemz.points) {
    //                  this.activeModule(VariablesUtils.CurrentModule).Data[itemx.node].outputs[itemx.input].connections[g] = { node: itemz.node, output: 'input_'+(output_id-1), points: itemz.points }
    //              } else {
    //                  this.activeModule(VariablesUtils.CurrentModule).Data[itemx.node].outputs[itemx.input].connections[g] = { node: itemz.node, output: 'input_'+(output_id-1)}
    //              }
    //            }
    //          }
    //      });
    //    });
    //    this.updateConnectionNodes('node-'+id);
    //  }
   
    //  removeNodeOutput(id: any, output_class: string) {
    //    var moduleName: any = this.getModuleFromNodeId(id)
    //    const infoNode: any = this.getNodeFromId(id)
    //    if(VariablesUtils.CurrentModule === moduleName) {
    //        VariablesUtils.container
    //      VariablesUtils.MainContainer.querySelector('#node-'+id+' .outputs .output.' + output_class).remove();
    //    }
    //    const removeOutputs: Array<any> = [];
    //    Object.keys(infoNode.outputs[output_class].connections).map(function(key, index) {
    //      const id_input = infoNode.outputs[output_class].connections[index].node;
    //      const input_class = infoNode.outputs[output_class].connections[index].output;
    //      removeOutputs.push({id, id_input, output_class, input_class})
    //    })
    //    // Remove connections
    //    removeOutputs.forEach((item: any, i: any) => {
    //      this.removeSingleConnection(item.id, item.id_input, item.output_class, item.input_class);
    //    });
   
    //    delete this.activeModule(VariablesUtils.CurrentModule).Data[id].outputs[output_class];
   
    //    // Update connection
    //    const connections: Array<any> = [];
    //    const connectionsOuputs = this.activeModule(VariablesUtils.CurrentModule).Data[id].outputs
    //    Object.keys(connectionsOuputs).map(function(key, index) {
    //      connections.push(connectionsOuputs[key]);
    //    });
    //    this.activeModule(VariablesUtils.CurrentModule).Data[id].outputs = {};
    //    const output_class_id = output_class.slice(7);
    //    let nodeUpdates: any = [];
    //    connections.forEach((item, i) => {
    //      item.connections.forEach((itemx: any, f: any) => {
    //        nodeUpdates.push({ node: itemx.node, output: itemx.output });
    //      });
    //      this.activeModule(VariablesUtils.CurrentModule).Data[id].outputs['output_'+ (i+1)] = item;
    //    });
    //    nodeUpdates =  new Set(nodeUpdates.map((e: any) => JSON.stringify(e)));
    //    nodeUpdates = Array.from(nodeUpdates).map((e: any) => JSON.parse(e));
   
    //    if(VariablesUtils.CurrentModule === moduleName) {
    //      const eles = VariablesUtils.MainContainer.querySelectorAll('#node-'+id +' .outputs .output');
    //      eles.forEach((item: any, i: any) => {
    //        const id_class: any = item.classList[1].slice(7);
    //        if(parseInt(output_class_id) < parseInt(id_class)) {
    //          item.classList.remove('output_'+id_class);
    //          item.classList.add('output_'+(id_class-1));
    //        }
    //      });
   
    //    }
   
    //    nodeUpdates.forEach((itemx: any, i: any) => {
    //      this.activeModule(VariablesUtils.CurrentModule).Data[itemx.node].inputs[itemx.output].connections.forEach((itemz: any, g: any) => {
    //          if(itemz.node == id) {
    //            const input_id = itemz.input.slice(7);
    //            if(parseInt(output_class_id) < parseInt(input_id)) {
    //              if(VariablesUtils.CurrentModule === moduleName) {
   
    //                const ele: any = VariablesUtils.MainContainer.querySelector('.connection.node_in_node-'+itemx.node+'.node_out_node-'+id+'.output_'+input_id+'.'+itemx.output);
    //                ele.classList.remove('output_'+input_id);
    //                ele.classList.remove(itemx.output);
    //                ele.classList.add('output_'+(input_id-1));
    //                ele.classList.add(itemx.output);
    //              }
    //              if(itemz.points) {
    //                  this.activeModule(VariablesUtils.CurrentModule).Data[itemx.node].inputs[itemx.output].connections[g] = { node: itemz.node, input: 'output_'+(input_id-1), points: itemz.points }
    //              } else {
    //                  this.activeModule(VariablesUtils.CurrentModule).Data[itemx.node].inputs[itemx.output].connections[g] = { node: itemz.node, input: 'output_'+(input_id-1)}
    //              }
    //            }
    //          }
    //      });
    //    });
   
    //    this.updateConnectionNodes('node-'+id);
    //  }
   
    //  removeSingleConnection(id_output: any, id_input: any, output_class: any, input_class: any) {
    //    var nodeOneModule: any = this.getModuleFromNodeId(id_output);
    //    var nodeTwoModule: any = this.getModuleFromNodeId(id_input);
    //    if(nodeOneModule === nodeTwoModule) {
    //      // Check nodes in same module.
   
    //      // Check connection exist
    //      var exists = this.activeModule(nodeOneModule).data[id_output].outputs[output_class].connections.findIndex(function(item: any,i: any) {
    //        return item.node == id_input && item.output === input_class
    //      });
    //      if(exists > -1) {
   
    //        if(VariablesUtils.CurrentModule === nodeOneModule) {
    //          // In same module with view.
    //          VariablesUtils.MainContainer.querySelector('.connection.node_in_node-'+id_input+'.node_out_node-'+id_output+'.'+output_class+'.'+input_class).remove();
    //        }
   
    //        var index_out = this.activeModule(nodeOneModule).data[id_output].outputs[output_class].connections.findIndex(function(item: any,i: any) {
    //          return item.node == id_input && item.output === input_class
    //        });
    //        this.activeModule(nodeOneModule).data[id_output].outputs[output_class].connections.splice(index_out,1);
   
    //        var index_in = this.activeModule(nodeOneModule).data[id_input].inputs[input_class].connections.findIndex(function(item: any,i: any) {
    //          return item.node == id_output && item.input === output_class
    //        });
    //        this.activeModule(nodeOneModule).data[id_input].inputs[input_class].connections.splice(index_in,1);
   
    //        this.Dispatch('connectionRemoved', { output_id: id_output, input_id: id_input, output_class:  output_class, input_class: input_class});
    //        return true;
   
    //      } else {
    //        return false;
    //      }
    //    } else {
    //      return false;
    //    }
    //  }
   
    //  addModule(name: any) {
    //  //   VariablesUtils.drawflow.drawflow[name] =  { 'data': {} };
 
    //    const newModule: DataFlowDataModel = new DataFlowDataModel(
    //        {
    //            Data: {},
    //            Module: name
    //        }
    //    );
 
    //    VariablesUtils.DataFlowModuleData.push(newModule)
    //    this.Dispatch('moduleCreated', name);
    //  }

    /**
     * When switching modules - clicking menu tab buttons
     * 
     * @param name module to load
     */
     public ChangeModule(name: string): void {

       this.Dispatch('moduleChanged', name);

       VariablesUtils.ActiveModule = name;
       VariablesUtils.PreCanvas.innerHTML = '';
       VariablesUtils.CanvasX = 0;
       VariablesUtils.CanvasY = 0;
       VariablesUtils.PosX = 0;
       VariablesUtils.PosY = 0;
       VariablesUtils.MouseX = 0;
       VariablesUtils.MouseY = 0;
       VariablesUtils.Zoom = 1;
       VariablesUtils.ZoomLastValue = 1;
       VariablesUtils.PreCanvas.style.transform = '';

       this.Init(this.activeModule(VariablesUtils.ActiveModule), false);
     }
   
    //  removeModule(name: any) {
    //    if(VariablesUtils.CurrentModule === name) {
    //      this.changeModule('Home');
    //    }
    //    // delete VariablesUtils.drawflow.drawflow[name];
 
    //    const index: number = VariablesUtils.DataFlowModuleData.findIndex((e:DataFlowDataModel) => {
    //      return e.Module === 'name';
    //    });
 
    //    if (index !== -1) {
    //        VariablesUtils.DataFlowModuleData.splice(index, 1);
    //    }
       
    //    this.Dispatch('moduleRemoved', name);
    //  }
   
    //  clearModuleSelected() {
    //    VariablesUtils.PreCanvas.innerHTML = '';
 
    //    VariablesUtils.DataFlowModuleData.find((e: DataFlowDataModel) => {
    //      if (e.Module === VariablesUtils.CurrentModule) {
    //          e.Data = {};
    //      }
    //    })
 
    //    // this.activeModule(VariablesUtils.CurrentModule) =  { 'data': {} };
    //  }
   
    /**
     * Clear canvas to add new nodes
     */
     protected clear(): void {
         if (VariablesUtils.PreCanvas) {
             VariablesUtils.PreCanvas.innerHTML = '';
             // VariablesUtils.drawflow = { 'drawflow': { 'Home': { 'data': {} }}};
         }
      
     }
    //  export () {
    //  //   const dataExport = JSON.parse(JSON.stringify(VariablesUtils.drawflow));
    //  //   this.Dispatch('export', dataExport);
    //  //   return dataExport;
    //  }
   
   /**
    * 
    * @param data DataFlow data
    * @param notifi dispatch event when data has been imported
    * @returns 
    */
     public Init (data: DataFlowDataModel, notify: boolean = true): void {

      /**
       * If no data, then ignore functionality
       */
        if (!data || Object.keys(data.Data).length === 0) {
          return;
        }

         this.clear();
         this.start();
  
         const flowData: DataFlowDataModel = new DataFlowDataModel(
            {
                Data: JSON.parse(JSON.stringify(data)).Data, 
                Module: data.Module
            }
         );
      
         /**
          * Should only do this when adding new data
          */
      //  VariablesUtils.DataFlowModuleData.push(flowData);
 
       this.load();
 
       if(notify) {
         EventsUtils.Dispatch('import', 'import');
       }
     }
   }
   
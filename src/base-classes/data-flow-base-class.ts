import { VariablesUtils } from '../utils/variables.utils.js';
import { DrawingUtils } from '../utils/drawing.utils.js';
import { BaseFunctions } from './base-functions.js';
import { NodeModel } from '../models/nodes/node.model.js';

export class DataFlowBaseClass extends BaseFunctions {

  constructor() {
    super();
  }

  /**
   * 
   * @param event Event
   */
    public DragEnd(event: DragEvent): void {
        let e_pos_x: number;
        let e_pos_y: number;
        let ele_last: any;
        let input_class: any;
        
      if (event.type === 'touchend') {
        e_pos_x = VariablesUtils.MouseX;
        e_pos_y = VariablesUtils.MouseY;
        ele_last = document.elementFromPoint(e_pos_x, e_pos_y);

      } else {

        e_pos_x = event.clientX;
        e_pos_y = event.clientY;
        ele_last = event.target;
      }
  
      if(VariablesUtils.Dragging) {
        if(VariablesUtils.PosXStart != e_pos_x || VariablesUtils.PosYStart != e_pos_y) {
          this.Dispatch('nodeMoved', VariablesUtils.SelectedElement.id.slice(5));
        }
      }
  
      if(VariablesUtils.DragPoint) {
        VariablesUtils.SelectedElement.classList.remove('selected');
          if(VariablesUtils.PosXStart != e_pos_x || VariablesUtils.PosYStart != e_pos_y) {
            this.Dispatch('rerouteMoved', VariablesUtils.SelectedElement.parentElement.classList[2].slice(14));
          }
      }
  
      if(VariablesUtils.EditorIsSelected) {
        VariablesUtils.CanvasX = VariablesUtils.CanvasX + (-(VariablesUtils.PosX - e_pos_x));
        VariablesUtils.CanvasY = VariablesUtils.CanvasY + (-(VariablesUtils.PosY - e_pos_y));
        VariablesUtils.EditorIsSelected = false;
      }
      
      if(VariablesUtils.Connection === true) {

        /**
         * Check if the connection line is being set to an input connection
         */
        if(ele_last.classList[0] === 'input' || 
          (VariablesUtils.ForceFirstInput && 
          (ele_last.closest('.drawflow_content_node') != null || 
          ele_last.classList[0] === VariablesUtils.NodeClass))) {
  
          if(VariablesUtils.ForceFirstInput && (ele_last.closest('.drawflow_content_node') != null || ele_last.classList[0] === VariablesUtils.NodeClass)) {
            if(ele_last.closest('.drawflow_content_node') != null) {
              var input_id = ele_last.closest('.drawflow_content_node').parentElement.id;
           
            } else {
              var input_id = ele_last.id;
            }
            
           if(Object.keys(this.getNodeFromId(input_id.slice(5)).inputs).length === 0) {
             input_class = false;

           } else {
            input_class = 'input_1';
           }
  
  
         } else {
           // Fix connection;
           var input_id = ele_last.parentElement.parentElement.id;
           input_class = ele_last.classList[1];
         }
  
         var output_id = VariablesUtils.SelectedElement.parentElement.parentElement.id;
         var output_class = VariablesUtils.SelectedElement.classList[1];
  
        if(output_id !== input_id && input_class !== false) {
  
            if(VariablesUtils.MainContainer.querySelectorAll('.connection.node_in_'+input_id+'.node_out_'+output_id+'.'+output_class+'.'+input_class).length === 0) {
            // Conection doesn't exist, save connection
  
            let id_input = input_id.slice(5);
            let id_output = output_id.slice(5);

            /**
             * Get output element the connection is going from
             */
            let outputElement: Array<any> = this.activeModule(VariablesUtils.ActiveModule).Data.filter((obj: NodeModel) => {
              return obj.ID === id_output;
            });

            /**
             * Get input element the connection is going to
             */
             let inputElement: Array<any> = this.activeModule(VariablesUtils.ActiveModule).Data.filter((obj: NodeModel) => {
              return obj.ID === id_input;
            });
  
            /**
             * If nodes can be connected, then...
             */
            if (this.canConnect(event, inputElement, outputElement)) {
              VariablesUtils.ConnectionElement.classList.add('node_in_'+input_id);
              VariablesUtils.ConnectionElement.classList.add('node_out_'+output_id);
              VariablesUtils.ConnectionElement.classList.add(output_class);
              VariablesUtils.ConnectionElement.classList.add(input_class);

              outputElement[0].Outputs[output_class].Connections.push( {'node': id_input, 'output': input_class});
              inputElement[0].Inputs[input_class].Connections.push( {'node': id_output, 'input': output_class});

              // this.activeModule(VariablesUtils.ActiveModule).Data[id_output].Outputs[output_class].Connections.push( {'node': id_input, 'output': input_class});
              // this.activeModule(VariablesUtils.ActiveModule).Data[id_input].Inputs[input_class].Connections.push( {'node': id_output, 'input': output_class});
            
              this.updateConnectionNodes('node-'+id_output);
              this.updateConnectionNodes('node-'+id_input);
              this.Dispatch('connectionCreated', { output_id: id_output, input_id: id_input, output_class:  output_class, input_class: input_class});
            
            /**
             * Error connecting nodes
             * 
             * This works, but would be better if you received the error before clicking
             * the node.
             */
            } else {
              // VariablesUtils.ConnectionElement.closest('path').classList.add('error');
              // VariablesUtils.ConnectionElement.closest('svg').children[0].classList.add('error');
            
              const closestSVG = VariablesUtils.ConnectionElement.closest('svg');
              closestSVG.querySelector('path').classList.add('error');
             
              // alert('Cannot connect nodes');
              // this.Dispatch('connectionCancel', true);
              
              VariablesUtils.ConnectionElement.remove();
            }
          } else {
            this.Dispatch('connectionCancel', true);
            VariablesUtils.ConnectionElement.remove();
          }
  
           // VariablesUtils.ConnectionElement = null; - testing without this, shannon
        } else {
          // Connection exists Remove Connection;
          this.Dispatch('connectionCancel', true);
          VariablesUtils.ConnectionElement.remove();
          // VariablesUtils.ConnectionElement = null; - testing without this, shannon
        }
  
        } else {
          // Remove Connection;
          this.Dispatch('connectionCancel', true);
          VariablesUtils.ConnectionElement.remove();
          // VariablesUtils.ConnectionElement = null; - testing without this, shannon
        }
      }
  
      VariablesUtils.Dragging = false;
      VariablesUtils.DragPoint = false;
      VariablesUtils.Connection = false;
      VariablesUtils.SelectedElement = null;
      VariablesUtils.EditorIsSelected = false;
  
    }

    /**
     * Mouse position
     * 
     * @param e event
     */
    public Position(event: any): void {
      if (event.type === 'touchmove') {
        var e_pos_x = event.touches[0].clientX;
        var e_pos_y = event.touches[0].clientY;
      } else {
        var e_pos_x = event.clientX;
        var e_pos_y = event.clientY;
      }
  
      if(VariablesUtils.Connection) {
        this.updateConnection(e_pos_x, e_pos_y);
      }

      if(VariablesUtils.EditorIsSelected) {
        x =  VariablesUtils.CanvasX + (-(VariablesUtils.PosX - e_pos_x))
        y = VariablesUtils.CanvasY + (-(VariablesUtils.PosY - e_pos_y))
        this.Dispatch('translate', { x: x, y: y});
        VariablesUtils.PreCanvas.style.transform = 'translate('+x+'px, '+y+'px) scale('+VariablesUtils.Zoom+')';
      }

      if(VariablesUtils.Dragging) {
        
        var x = (VariablesUtils.PosX - e_pos_x) * VariablesUtils.PreCanvas.clientWidth / (VariablesUtils.PreCanvas.clientWidth * VariablesUtils.Zoom);
        var y = (VariablesUtils.PosY - e_pos_y) * VariablesUtils.PreCanvas.clientHeight / (VariablesUtils.PreCanvas.clientHeight * VariablesUtils.Zoom);
        VariablesUtils.PosX = e_pos_x;
        VariablesUtils.PosY = e_pos_y;
  
        VariablesUtils.SelectedElement.style.top = (VariablesUtils.SelectedElement.offsetTop - y) + 'px';
        VariablesUtils.SelectedElement.style.left = (VariablesUtils.SelectedElement.offsetLeft - x) + 'px';
  
        /**
         * Get the selected item
         */
        let selectedElement = this.activeModule(VariablesUtils.ActiveModule).Data.filter((obj: NodeModel) => {
          return obj.ID === VariablesUtils.SelectedElement.id.slice(5);
        })

          selectedElement.PosX = (VariablesUtils.SelectedElement.offsetLeft - x);
          selectedElement.PosY = (VariablesUtils.SelectedElement.offsetTop - y);

        // this.activeModule(VariablesUtils.ActiveModule).Data[selectedElementIndex].PosX = (VariablesUtils.SelectedElement.offsetLeft - x);
        // this.activeModule(VariablesUtils.ActiveModule).Data[selectedElementIndex].PosY = (VariablesUtils.SelectedElement.offsetTop - y);
  
        this.updateConnectionNodes(VariablesUtils.SelectedElement.id)
      }
  
      if(VariablesUtils.DragPoint) {
  
        var x = (VariablesUtils.PosX - e_pos_x) * VariablesUtils.PreCanvas.clientWidth / (VariablesUtils.PreCanvas.clientWidth * VariablesUtils.Zoom);
        var y = (VariablesUtils.PosY - e_pos_y) * VariablesUtils.PreCanvas.clientHeight / (VariablesUtils.PreCanvas.clientHeight * VariablesUtils.Zoom);
        VariablesUtils.PosX = e_pos_x;
        VariablesUtils.PosY = e_pos_y;
  
        var pos_x = VariablesUtils.PosX * ( VariablesUtils.PreCanvas.clientWidth / (VariablesUtils.PreCanvas.clientWidth * VariablesUtils.Zoom)) - (VariablesUtils.PreCanvas.getBoundingClientRect().x * ( VariablesUtils.PreCanvas.clientWidth / (VariablesUtils.PreCanvas.clientWidth * VariablesUtils.Zoom)));
        var pos_y = VariablesUtils.PosY * ( VariablesUtils.PreCanvas.clientHeight / (VariablesUtils.PreCanvas.clientHeight * VariablesUtils.Zoom)) - (VariablesUtils.PreCanvas.getBoundingClientRect().y * ( VariablesUtils.PreCanvas.clientHeight / (VariablesUtils.PreCanvas.clientHeight * VariablesUtils.Zoom)));
  
        VariablesUtils.SelectedElement.setAttributeNS(null, 'cx', pos_x);
        VariablesUtils.SelectedElement.setAttributeNS(null, 'cy', pos_y);
  
        const nodeUpdate = VariablesUtils.SelectedElement.parentElement.classList[2].slice(9);
        const nodeUpdateIn = VariablesUtils.SelectedElement.parentElement.classList[1].slice(13);
        const output_class = VariablesUtils.SelectedElement.parentElement.classList[3];
        const input_class = VariablesUtils.SelectedElement.parentElement.classList[4];
  
        let numberPointPosition = Array.from(VariablesUtils.SelectedElement.parentElement.children).indexOf(VariablesUtils.SelectedElement)-1;
  
        if(VariablesUtils.RerouteFixCurvature) {
          const numberMainPath = VariablesUtils.SelectedElement.parentElement.querySelectorAll('.main-path').length-1;
          numberPointPosition -= numberMainPath;
          if(numberPointPosition < 0) {
            numberPointPosition = 0;
          }
        }
  
        const nodeId = nodeUpdate.slice(5);
        const searchConnection = this.activeModule(VariablesUtils.ActiveModule).Data[nodeId].outputs[output_class].Connections.findIndex(function(item: any,i: any) {
          return item.node ===  nodeUpdateIn && item.output === input_class;
        });
  
        this.activeModule(VariablesUtils.ActiveModule).Data[nodeId].outputs[output_class].Connections[searchConnection].points[numberPointPosition] = { pos_x: pos_x, pos_y: pos_y };
  
        const parentSelected = VariablesUtils.SelectedElement.parentElement.classList[2].slice(9);
  
        this.updateConnectionNodes(parentSelected);
      }
  
      if (event.type === 'touchmove') {
        VariablesUtils.MouseX = e_pos_x;
        VariablesUtils.MouseY = e_pos_y;
      }
      this.Dispatch('mouseMove', {x: e_pos_x,y: e_pos_y });
    }

    // protected getAllDescendants(selectedNode: HTMLElement): void {
    //   const descendants: Array<any> = [];
    //   let t: NodeListOf<ChildNode> = selectedNode.childNodes;

    //   for (let i = 0; i < t.length; i++) {
    //     if (t[i].nodeType === 1) {
    //       this.recurseAndAdd(t[i], descendants);
    //     }
    //   }
    // }

    // protected recurseAndAdd(el: any, desc?: Array<any>): void {
    //   if ( desc)
    //     desc.push(el.id);
      
    //   const children: any = el.childNodes;

    //   for (let i = 0; i < children; i++) {

    //     /**
    //      * nodeType 1 is element node
    //      */
    //     if (children[i].nodeType === 1) {
    //       this.recurseAndAdd(children);
    //     }
    //   }

    //   debugger;
    // }

    /**
     * Click node event
     * @param event MouseEvent
     * @returns ?
     */
    public Click(event: any): any {
 
      const target: Element = event.target;

      this.Dispatch('click', event);

      if(VariablesUtils.EditorMode === 'fixed') {
        //return false;
         if(target.classList[0] === 'parent-drawflow' || target.classList[0] === 'drawflow') {
            VariablesUtils.SelectedElement = target.closest('.parent-drawflow');

         } else {

           return false;
         }

      } else if(VariablesUtils.EditorMode === 'view') {
        
        if(target.closest('.drawflow') != null || target.matches('.parent-drawflow')) {
            VariablesUtils.SelectedElement = target.closest('.parent-drawflow');
          event.preventDefault();
        }
      } else {
        VariablesUtils.FirstClickedElement = <HTMLElement>event.target;
        VariablesUtils.SelectedElement = event.target;

        /**
         * Mouse left click
         */
        if(event.button === 0) {

          /**
           * Delete context menu
           */
          this.contextmenuDel();
        }
  
        if(target.closest('.drawflow_content_node') != null) {
            VariablesUtils.SelectedElement = target.closest('.drawflow_content_node').parentElement;
        }
      }

      /**
       * Let's see what was clicked on
       */
      switch (VariablesUtils.SelectedElement.classList[0]) {

        case VariablesUtils.NodeClass:
          if(VariablesUtils.SelectedNode != null) {
            VariablesUtils.SelectedNode.classList.remove('selected');
            if(VariablesUtils.SelectedNode != VariablesUtils.SelectedElement) {
              this.Dispatch('nodeUnselected', true);
            }
          }

          if(VariablesUtils.SelectedConnection != null) {
            VariablesUtils.SelectedConnection.classList.remove('selected');
            this.removeReouteConnectionSelected();
            VariablesUtils.SelectedConnection = null;
          }

          if(VariablesUtils.SelectedNode != VariablesUtils.SelectedElement) {
            this.Dispatch('nodeSelected', VariablesUtils.SelectedElement.id.slice(5));
          }

          VariablesUtils.SelectedNode = VariablesUtils.SelectedElement;
          VariablesUtils.SelectedNode.classList.add('selected');

          if(!VariablesUtils.DraggableInputs) {

            if(target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA' && target.tagName !== 'SELECT' && target.hasAttribute('contenteditable') !== true) {
                VariablesUtils.Dragging = true;
            }

          } else {

            if(target.tagName !== 'SELECT') {
                VariablesUtils.Dragging = true;
            }
          }
          break;
        case 'output':
            VariablesUtils.Connection = true;

          if(VariablesUtils.SelectedNode != null) {
            VariablesUtils.SelectedNode.classList.remove('selected');
            VariablesUtils.SelectedNode = null;
            this.Dispatch('nodeUnselected', true);
          }

          if(VariablesUtils.SelectedConnection != null) {
            VariablesUtils.SelectedConnection.classList.remove('selected');
            this.removeReouteConnectionSelected();
            VariablesUtils.SelectedConnection = null;
          }

          /**
           * Start drawing the connection line
           */
          DrawingUtils.DrawConnection(event.target, this.Dispatch);
          break;
        case 'parent-drawflow':

          if(VariablesUtils.SelectedNode != null) {
            VariablesUtils.SelectedNode.classList.remove('selected');
            VariablesUtils.SelectedNode = null;
            this.Dispatch('nodeUnselected', true);
          }

          if(VariablesUtils.SelectedConnection != null) {
            VariablesUtils.SelectedConnection.classList.remove('selected');
            this.removeReouteConnectionSelected();
            VariablesUtils.SelectedConnection = null;
          }

          VariablesUtils.EditorIsSelected = true;
          break;
        case 'drawflow':

          if(VariablesUtils.SelectedNode != null) {
            VariablesUtils.SelectedNode.classList.remove('selected');
            VariablesUtils.SelectedNode = null;
            this.Dispatch('nodeUnselected', true);
          }

          if(VariablesUtils.SelectedConnection != null) {
            VariablesUtils.SelectedConnection.classList.remove('selected');
            this.removeReouteConnectionSelected();
            VariablesUtils.SelectedConnection = null;
          }

          VariablesUtils.EditorIsSelected = true;
          break;
        case 'main-path':

          if(VariablesUtils.SelectedNode != null) {
            VariablesUtils.SelectedNode.classList.remove('selected');
            VariablesUtils.SelectedNode = null;
            this.Dispatch('nodeUnselected', true);
          }
          
          if(VariablesUtils.SelectedConnection != null) {
            VariablesUtils.SelectedConnection.classList.remove('selected');
            this.removeReouteConnectionSelected();
            VariablesUtils.SelectedConnection = null;
          }
          VariablesUtils.SelectedConnection = VariablesUtils.SelectedElement;
          VariablesUtils.SelectedConnection.classList.add('selected');
          const listclassConnection = VariablesUtils.SelectedConnection.parentElement.classList;
          this.Dispatch('connectionSelected', { output_id: listclassConnection[2].slice(14), input_id: listclassConnection[1].slice(13), output_class: listclassConnection[3], input_class: listclassConnection[4] });
          if(VariablesUtils.RerouteFixCurvature) {
            VariablesUtils.SelectedConnection.parentElement.querySelectorAll('.main-path').forEach((item: any, i: any) => {
              item.classList.add('selected');
            });
          }
        break;
        case 'point':
            VariablesUtils.DragPoint = true;
            VariablesUtils.SelectedElement.classList.add('selected');
        break;
        case 'drawflow-delete':
          if(VariablesUtils.SelectedNode ) {
            this.removeNodeId(VariablesUtils.SelectedNode.id);
          }
  
          if(VariablesUtils.SelectedConnection) {
            this.removeConnection();
          }
  
          if(VariablesUtils.SelectedNode != null) {
            VariablesUtils.SelectedNode.classList.remove('selected');
            VariablesUtils.SelectedNode = null;
            this.Dispatch('nodeUnselected', true);
          }
          if(VariablesUtils.SelectedConnection != null) {
            VariablesUtils.SelectedConnection.classList.remove('selected');
            this.removeReouteConnectionSelected();
            VariablesUtils.SelectedConnection = null;
          }
  
        break;
        default:
      }
      if (event.type === 'touchstart') {
        
        VariablesUtils.PosX = event.touches[0].clientX;
        VariablesUtils.PosXStart = event.touches[0].clientX;
        VariablesUtils.PosY = event.touches[0].clientY;
        VariablesUtils.PosYStart = event.touches[0].clientY;
      } else {
        VariablesUtils.PosX = event.clientX;
        VariablesUtils.PosXStart = event.clientX;
        VariablesUtils.PosY = event.clientY;
        VariablesUtils.PosYStart = event.clientY;
      }
      this.Dispatch('clickEnd', event);
    }

    public Contextmenu(event: any): any {
      this.Dispatch('contextmenu', event);
      event.preventDefault();
      if(VariablesUtils.EditorMode === 'fixed' || VariablesUtils.EditorMode === 'view') {
        return false;
      }
      if(VariablesUtils.PreCanvas.getElementsByClassName('drawflow-delete').length) {
      
        VariablesUtils.PreCanvas.getElementsByClassName('drawflow-delete')[0].remove()
      };
      if(VariablesUtils.SelectedNode || VariablesUtils.SelectedConnection) {
        var deletebox = document.createElement('div');
        deletebox.classList.add('drawflow-delete');
        deletebox.innerHTML = 'x';
        if(VariablesUtils.SelectedNode) {
          VariablesUtils.SelectedNode.appendChild(deletebox);
  
        }
        if(VariablesUtils.SelectedConnection) {
          deletebox.style.top = event.clientY * ( VariablesUtils.PreCanvas.clientHeight / (VariablesUtils.PreCanvas.clientHeight * VariablesUtils.Zoom)) - (VariablesUtils.PreCanvas.getBoundingClientRect().y *  ( VariablesUtils.PreCanvas.clientHeight / (VariablesUtils.PreCanvas.clientHeight * VariablesUtils.Zoom)) ) + 'px';
          deletebox.style.left = event.clientX * ( VariablesUtils.PreCanvas.clientWidth / (VariablesUtils.PreCanvas.clientWidth * VariablesUtils.Zoom)) - (VariablesUtils.PreCanvas.getBoundingClientRect().x *  ( VariablesUtils.PreCanvas.clientWidth / (VariablesUtils.PreCanvas.clientWidth * VariablesUtils.Zoom)) ) + 'px';
  
          VariablesUtils.PreCanvas.appendChild(deletebox);
  
        }
  
      }
  
    }

    /**
     * Keydown event
     * 
     * @param e event
     * @returns ?
     */
    public KeyDown(event: any): any {
      this.Dispatch('keydown', event);
      if(VariablesUtils.EditorMode === 'fixed' || VariablesUtils.EditorMode === 'view') {
        return false;
      }
      if (event.key === 'Delete' || (event.key === 'Backspace' && event.metaKey)) {
        if(VariablesUtils.SelectedNode != null) {
          if(VariablesUtils.FirstClickedElement.tagName !== 'INPUT' && VariablesUtils.FirstClickedElement.tagName !== 'TEXTAREA' && VariablesUtils.FirstClickedElement.hasAttribute('contenteditable') !== true) {
            this.removeNodeId(VariablesUtils.SelectedNode.id);
          }
        }
        if(VariablesUtils.SelectedConnection != null) {
          this.removeConnection();
        }
      }
    }

    /**
     * Event for zoom
     * 
     * @param event event
     * @param delta mouse wheel stuff
     */
    public Zoom_Enter(event: any, delta: any): void {
      if (event.ctrlKey) {
        event.preventDefault()
        if(event.deltaY > 0) {
          // Zoom Out
          this.Zoom_Out();
        } else {
          // Zoom In
          this.Zoom_In();
        }
      }
    }

    /**
     * Input changes
     * 
     * @param event event
     */
    public UpdateNodeValue(event: any): void {
      var attr = event.target.attributes
      for (var i = 0; i < attr.length; i++) {
              if (attr[i].nodeName.startsWith('df-')) {
                  var keys = attr[i].nodeName.slice(3).split('-');
                  var target = this.activeModule(VariablesUtils.ActiveModule).Data[event.target.closest('.drawflow_content_node').parentElement.id.slice(5)].data;
                  for (var index = 0; index < keys.length - 1; index += 1) {
                      if (target[keys[index]] == null) {
                          target[keys[index]] = {};
                      }
                      target = target[keys[index]];
                  }
                  target[keys[keys.length - 1]] = event.target.value;
                  this.Dispatch('nodeDataChanged', event.target.closest('.drawflow_content_node').parentElement.id.slice(5));
            }
      }
    }

    /**
     * Double click event
     * 
     * @param event event
     */
    public DblClick(event: any): void {
      if(VariablesUtils.SelectedConnection != null && VariablesUtils.Reroute) {
          this.createReroutePoint(VariablesUtils.SelectedConnection);
      }
  
      if(event.target.classList[0] === 'point') {
          this.removeReroutePoint(event.target);
      }
    }

    /* Mobile zoom */

    /**
     * Pointer down
     * @param event event
     */
    public PointerDown(event: any): void {
      VariablesUtils.EVCache.push(event);
   }

   /**
    * Pointer move
    * 
    * @param e event
    */
   public PointerMove(event: any): void {
    for (var i = 0; i < VariablesUtils.EVCache.length; i++) {
      if (event.pointerId == VariablesUtils.EVCache[i].pointerId) {
       VariablesUtils.EVCache[i] = event;
      break;
      }
    }
 
    if (VariablesUtils.EVCache.length == 2) {
      // Calculate the distance between the two pointers
      var curDiff = Math.abs(VariablesUtils.EVCache[0].clientX - VariablesUtils.EVCache[1].clientX);
 
      if (VariablesUtils.PrevDiff > 100) {
        if (curDiff > VariablesUtils.PrevDiff) {
          // The distance between the two pointers has increased
 
          this.Zoom_In();
        }
        if (curDiff < VariablesUtils.PrevDiff) {
          // The distance between the two pointers has decreased
          this.Zoom_Out();
        }
      }
      VariablesUtils.PrevDiff = curDiff;
    }
   }

   /**
    * Pointer up
    * 
    * @param event event
    */
   public PointerUp(event: any): void {
    this.Remove_Event(event);
    if (VariablesUtils.EVCache.length < 2) {
      VariablesUtils.PrevDiff = -1;
    }
  }
}
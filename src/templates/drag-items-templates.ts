export class DragItemsTemplates {

    public static FLOW_DRAG_ITEMS(callback?: () => {}): Array<any> {
       return [
           {
               ClassList: ['drag-item'],
               DataNode: 'request',
               Draggable: true,
               DragAction: callback,
               Id: 'request',
               Label: ' Request',
               IconClassList: ['fab', 'fa-facebook']
           },
           {
               ClassList: ['drag-item'],
               DataNode: 'project',
               Draggable: true,
               DragAction: callback,
               Id: 'project',
               Label: ' Project',
               IconClassList: ['fab', 'fa-facebook']
           },
           {
               ClassList: ['drag-item'],
               DataNode: 'filter',
               Draggable: true,
               DragAction: callback,
               Id: 'filter',
               Label: ' Route Filter',
               IconClassList: ['fab', 'fa-facebook']
           },
           {
               ClassList: ['drag-item'],
               DataNode: 'application',
               Draggable: true,
               DragAction: callback,
               Id: 'application',
               Label: ' Application',
               IconClassList: ['fab', 'fa-facebook']
           },
           {
               ClassList: ['drag-item'],
               DataNode: 'modifier',
               Draggable: true,
               DragAction: callback,
               Id: 'modifier',
               Label: ' DFS Modifier',
               IconClassList: ['fab', 'fa-facebook']
           },
           {
               ClassList: ['drag-item'],
               DataNode: 'join',
               Draggable: true,
               DragAction: callback,
               Id: 'join',
               Label: ' Join',
               IconClassList: ['fab', 'fa-facebook']
           },
           {
               ClassList: ['drag-item'],
               DataNode: 'split',
               Draggable: true,
               DragAction: callback,
               Id: 'split',
               Label: ' Split',
               IconClassList: ['fab', 'fa-facebook']
           },
           {
               ClassList: ['drag-item'],
               DataNode: 'decision',
               Draggable: true,
               DragAction: callback,
               Id: 'decision',
               Label: ' Decision',
               IconClassList: ['fab', 'fa-facebook']
           },
           {
               ClassList: ['drag-item'],
               DataNode: 'event',
               Draggable: true,
               DragAction: callback,
               Id: 'event',
               Label: ' Event',
               IconClassList: ['fab', 'fa-facebook']
           }
       ]
    }
}
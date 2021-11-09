import { MenuTemplateModel } from '../models/menu/menu-template.model.js';
import { VariablesUtils } from './variables.utils.js';

export class MenuTemplatesUtils {

    public static Render(el: HTMLElement, menuTemplates: Array<MenuTemplateModel>): void {
        
        for (let item of menuTemplates) {

            const container: HTMLElement = document.createElement('div'); 
            container.setAttribute('draggable', String(item.Draggable));
            container.setAttribute('data-node', item.DataNode);
            container.addEventListener('dragstart', item.DragAction);
            container.classList.add(...item.ClassList);

            const img: HTMLElement = document.createElement('i');
            img.classList.add(...item.IconClassList);

            const span: HTMLElement = document.createElement('span');
            span.innerHTML = item.Label;

            container.appendChild(img);
            // img.appendChild(span);
            container.appendChild(span);
    
            el.appendChild(container);
        }
    }
}

/**
 *   <div class="drag-item" draggable="true" ondragstart="drag(event)" data-node="facebook">
        <i class="fab fa-facebook"></i><span> Facebook</span>
    </div>
*/
import { RollUpTest } from './RollUpTest.js';

/**
 * All these styles get compiled into 
 * dist/assets/styles/global-scss.min.css
 */
import '../../assets/styles/global-scss.scss';
import '../../assets/styles/node-shapes.scss';
import '../../assets/styles/main-structure.scss';
import '../../assets/styles/node-path.scss';
import '../../assets/styles/node-structure.scss';


/**
 * Can add this to RollUpTest.ts, if we wanted - omit 'window'
 */
window.customElements.define('roll-up-test', RollUpTest);

/*****************************************************************************************************************
 *    VGridRowCellInput
 *    Custom element for use in the row/column container (v-grid-row-col.js)
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/

import {bindable, customElement} from 'aurelia-templating';
import {inject} from 'aurelia-dependency-injection';
import {VGrid} from './v-grid';


@customElement('v-grid-input')
@inject(Element, VGrid)
export class VGridRowCellInput {
  @bindable value;
  @bindable customStyle;


  /*****************************************************
   *  Constructor
   ******************************************************/
  constructor(element, vGrid) {
    this.element = element;
    this.vGrid = vGrid;
  }


  /*****************************************************
   *  bindable event
   ******************************************************/
  valueChanged(value, old) {
    if (value === undefined) {
      this.content.style.display = "none"
    } else {
      this.content.style.display = "block";
      this.content.value = value;
    }
  }


  /*****************************************************
   *  bindable event
   ******************************************************/
  customStyleChanged(value, old) {

  }


  /*****************************************************
   *  Element event
   ******************************************************/
  bind(parent) {
    this.parent = parent;
  }


  /*****************************************************
   *  Element event
   ******************************************************/
  attached() {
    this.content = this.element.children[0];//document.createElement("input");
    this.content.type = "text";
    this.content.classList.add(this.parent.vGrid.vGridConfig.css.cellContent);
    this.content.style.height = "100%";
    this.content.style.width = "100%";
    this.element.appendChild(this.content);


    //set column no
    this.content.columnNo = parseInt(this.parent.columnNo);


    this.content.onchange = ()=> {
      if (!this.parent.readOnly() && this.parent.editMode()) {
        this.parent.updateValue(this.content.value);
      } else {
        this.content.value = this.value;
      }
    };


    this.content.onblur = ()=> {
      this.parent.setValue(this.parent.getValue(this.value));
      this.parent.setCss();
    };


    //fix for cutting text out when not in edit mode
    this.content.oninput = ()=> {
      if (!this.parent.editMode() || this.readOnly) {
        this.content.value = this.value;
      }
    };


    this.content.onkeydown = function (e) {
      if (this.parent.readOnly() === true && e.keyCode !== 9) {
        return false;
      } else {
        if (!this.parent.editMode()) {
          return false;
        } else {
          return true;
        }
      }
    }.bind(this);


    //called when tabbing etc
    this.content.addEventListener("cellFocus", function (e) {
      this.content.focus();
    }.bind(this));

  }


}

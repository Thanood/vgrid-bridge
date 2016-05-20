/*****************************************************************************************************************
 *    VGridCellRowHeader
 *    Custom element controlling the cell logic of header
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
//import {inject, noView, customElement, processContent, Container, bindable, ViewSlot} from 'aurelia-framework';
import {noView, customElement, processContent, bindable, ViewSlot} from 'aurelia-templating';
import {inject, Container} from 'aurelia-dependency-injection';
import {VGrid} from './v-grid';


@noView
@customElement('v-grid-header-col')
@processContent(false)
@inject(Element, VGrid, Container)
export class VGridCellRowHeader {
  @bindable columnNo;


  /*****************************************************
   *  constructor
   ******************************************************/
  constructor(element, vGrid, container) {
    this.element = element;
    this.vGrid = vGrid;
    this.container = container;
    this.vGridConfig = vGrid.vGridConfig;
    this.queryString = null
  }


  /*****************************************************
   *  element event
   ******************************************************/
  bind(bindingContext) {
    this.bindingContext = bindingContext;
  }


  /*****************************************************
   *  element event
   ******************************************************/
  created() {
    ///nothing atm
  }


  /*****************************************************
   *  element event
   ******************************************************/
  attached() {
    this.setStandardClassesAndStyles();

    //get basic types '(todo, just create setters/getters?
    this.addFilter = this.vGridConfig.addFilter;
    this.header = this.vGridConfig.headerArray[this.columnNo];
    this.filter = this.vGridConfig.filterArray[this.columnNo];
    this.filterTop = this.vGridConfig.filterOnAtTop;
    this.justLabel = this.vGridConfig.doNotAddFilterTo.indexOf(this.attribute());
    this.filterName = this.vGridConfig.getFilterName(this.filter);
    this.colType = this.vGrid.vGridConfig.colTypeArray[this.columnNo];
    let value = this.vGrid.vGridFilter.queryStrings[this.attribute()];
    if (value) {
      this.queryString = value;
    }


    var sortIcon = this.getSortIconMarkup(this.attribute());


    var type = "single";
    if (this.addFilter) {
      type = "filterTop";
      if (!this.filterTop) {
        type = "filterBottom";
        if (this.justLabel !== -1) {
          type = "noFilterBottom";
        }
      } else {
        if (this.justLabel !== -1) {
          type = "noFilterTop";
        }
      }
    }


    if (this.colType === "selection") {
      type = "selection";
    }


    this.type = type;
    switch (type) {

      case "selection":
        var viewFactory = this.vGrid.viewCompiler.compile(`
          <template>
            <v-grid-filter-${this.colType}></v-grid-filter-${this.colType}>
          </template>
          `, this.vGrid.resources);
        break;


      case "single":
        var viewFactory = this.vGrid.viewCompiler.compile(`
          <template>

            <v-grid-label type="single">
              <div>${this.header}${sortIcon}</div>
            </v-grid-label>

          </template>
          `, this.vGrid.resources);
        break;


      case "filterTop":
        var viewFactory = this.vGrid.viewCompiler.compile(`
          <template>

            <v-grid-filter-${this.colType} filter-value.two-way="queryString" type="filterTop">
              <input placeholder="${this.filterName}">
            </v-grid-filter-${this.colType}>

            <v-grid-label type="labelBottom">
              <div>${this.header}${sortIcon}</div>
            </v-grid-label>

          </template>
          `, this.vGrid.resources);
        break;


      case "filterBottom":
        var viewFactory = this.vGrid.viewCompiler.compile(`
          <template>

            <v-grid-label type="labelTop">
              <div>${this.header}${sortIcon}</div>
            </v-grid-label>

             <v-grid-filter-${this.colType} filter-value.two-way="queryString" type="filterBottom">
              <input placeholder="${this.filterName}">
            </v-grid-filter-${this.colType}>

          </template>
          `, this.vGrid.resources);
        break;


      case "noFilterTop":
        var viewFactory = this.vGrid.viewCompiler.compile(`
          <template>

            <v-grid-label type="blankLabel">
              <div></div>
            </v-grid-label>

             <v-grid-label type="labelBottom">
              <div>${this.header}${sortIcon}</div>
            </v-grid-label>

          </template>
          `, this.vGrid.resources);
        break;


      case "noFilterBottom":
        var viewFactory = this.vGrid.viewCompiler.compile(`
          <template>

             <v-grid-label type="labelBottom">
              <div>${this.header}${sortIcon}</div>
            </v-grid-label>

            <v-grid-label type="blankLabel">
              <div></div>
            </v-grid-label>

          </template>
          `, this.vGrid.resources);
        break;


      default:
        break;
    }


    //create view and viewslot
    var view = viewFactory.create(this.container);
    this.viewSlot = new ViewSlot(this.element, true);
    this.viewSlot.add(view);
    this.viewSlot.bind(this);
    this.viewSlot.attached();


  }


  attribute() {
    return this.vGridConfig.attributeArray[this.columnNo];
  }


  getValue(value) {
    //just for testing not in use
    return this.valueFormater ? this.valueFormater().fromView(value) : value;
  }


  setValue(value) {
    //just for testing not in use
    return this.valueFormater ? this.valueFormater().toView(value) : value;
  }


  valueFormater() {
    //just for testing not in use
    return this.vGrid.vGridConfig.colFormaterArray[this.columnNo];
  }


  setStandardClassesAndStyles() {
    this.element.classList.add(this.vGridConfig.css.rowHeaderCell);
    this.element.classList.add(this.vGridConfig.css.rowHeaderColumn + this.columnNo);
    this.element.classList.add(this.vGridConfig.css.gridColumn + this.columnNo);
    this.element.style.height = '100%';
    this.element.style.width = this.vGridConfig.columnWidthArray[this.columnNo] + 'px';
  }


  getSortIconMarkup(attribute) {
    var markup = "";
    var rows = 1;

    //setting line height so it stays in the middle
    if (this.vGridConfig.addFilter) {
      rows = 2;
    }
    var lineHeigthStyleTag = `style=line-height:${this.vGridConfig.headerHeight / rows}px;"`;
    var isAscHtml = `<span ${lineHeigthStyleTag} class="${this.vGridConfig.css.sortIcon} ${this.vGridConfig.css.sortIconAsc}"></span>`;
    var isDescHtml = `<span ${lineHeigthStyleTag} class="${this.vGridConfig.css.sortIcon} ${this.vGridConfig.css.sortIconDesc}"></span>`;


    if (this.vGridConfig.sortNotOnHeader.indexOf(attribute) === -1) {
      markup = `<span ${lineHeigthStyleTag} class="${this.vGridConfig.css.sortIcon} ${this.vGridConfig.css.sortIconSort}"></span>`;
      if (this.vGridConfig.sortOnHeaderClick) {
        if (this.vGrid.vGridSort.getFilter().length !== 0) {
          this.vGrid.vGridSort.getFilter().forEach((x) => {
            if (x.attribute === attribute) {
              var block = x.asc === true ? isAscHtml : isDescHtml;
              var main = `<span ${lineHeigthStyleTag} class="${this.vGridConfig.css.sortIcon} ${this.vGridConfig.css.sortIconNo}${x.no}"></span>`;
              markup = main + block;
            }
          });
        }
      } else {
        markup = "";
      }
    }
    return markup
  };


  /*************************************************
   *  called when change event fires in filter input
   */
  onChangeEventOnFilter(e) {

    if (e.keyCode !== 9 && e.keyCode !== 39 && e.keyCode !== 37) {


      //get all inputs
      var queryInputs = this.vGrid.element.querySelectorAll("." + this.vGridConfig.css.filterHandle);


      //loop all of them
      var queryParams = [];


      for (var i = 0; i < queryInputs.length; i++) {


        //get the attribute, valiue etc
        var dataSourceAttribute = queryInputs[i].getAttribute(this.vGridConfig.atts.dataAttribute);
        var valueFormater = this.vGridConfig.colFormaterArray[this.vGridConfig.attributeArray.indexOf(dataSourceAttribute)];
        var operator = this.vGridConfig.filterArray[this.vGridConfig.attributeArray.indexOf(dataSourceAttribute)];
        var coltype = this.vGridConfig.colTypeArray[this.vGridConfig.attributeArray.indexOf(dataSourceAttribute)];
        var value = valueFormater ? valueFormater.fromView(queryInputs[i].value) : queryInputs[i].value;


        //FF issue, it have value of "on" sometimes...
        if (coltype === "checkbox" && value !== "true" && value !== "false") {
          value = "";
        }


        //do value exist and is not blank?
        if (value !== "" && value !== undefined) {


          //push into array that we send back after
          queryParams.push({
            attribute: dataSourceAttribute,
            value: value,
            operator: operator
          });


          //store the value, since I rebuild the grid when doing sorting...
          this.vGrid.vGridFilter.queryStrings[dataSourceAttribute] = queryInputs[i].value;

        } else {

          //reset to blank for later
          if (value === "") {
            this.vGrid.vGridFilter.queryStrings[dataSourceAttribute] = queryInputs[i].value;
          }

        }


      }//end for loop


      //run query/filter
      this.vGridConfig.onFilterRun(queryParams)
    }


  };


}//end class

/**
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";
define(['ojs/ojcore', 'jquery', 'ojs/ojcomponentcore', 'ojs/ojdvt-base', 'ojs/internal-deps/dvt/DvtPictoChart'], function(oj, $, comp, base, dvt)
{

/**This file is generated. Do not edit directly. Actual file located in 3rdparty/dvt/prebuild.**/
/**
 * Copyright (c) 2014, Oracle and/or its affiliates.
 * All rights reserved.
 */

/**
 * @ojcomponent oj.ojPictoChart
 * @augments oj.dvtBaseComponent
 * @since 1.2.0
 * @ojstatus preview
 *
 * @classdesc
 * <h3 id="pictoChartOverview-section">
 *   JET PictoChart
 *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#pictoChartOverview-section"></a>
 * </h3>
 *
 * <p>PictoChart uses icons to visualize an absolute number, or the relative sizes of the different parts of a population.</p>
 *
 *
 * <pre class="prettyprint">
 * <code>
 * &lt;oj-picto-chart
 *   items='[{"name": "Red", "shape": "human", "color": "#ed6647", "count": 3},
 *          {"name": "Blue", "shape": "circle", "color": "#267db3", "count": 17}]'>
 * &lt;/oj-picto-chart>
 * </code>
 * </pre>
 *
 * {@ojinclude "name":"a11yKeyboard"}
 *
 * <p>When using colors as a data dimension for PictoChart, the application
 * needs to ensure that they meet minimum contrast requirements. Not all colors
 * in the default value ramp provided by oj.ColorAttributeGroupHandler
 * will meet minimum contrast requirements.</p>
 *
 * <h3 id="touch-section">
 *   Touch End User Information
 *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#touch-section"></a>
 * </h3>
 *
 * {@ojinclude "name":"touchDoc"}
 *
 * <h3 id="keyboard-section">
 *   Keyboard End User Information
 *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#keyboard-section"></a>
 * </h3>
 *
 * {@ojinclude "name":"keyboardDoc"}
 *
 * <h3 id="perf-section">
 *   Performance
 *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#perf-section"></a>
 * </h3>
 *
 * <h4>Animation</h4>
 * <p>Animation should only be enabled for visualizations of small to medium data sets. Alternate visualizations should
 *    be considered if identifying data changes is important, since all data items will generally move and resize on any data
 *    change.
 * </p>
 *
 * {@ojinclude "name":"trackResize"}
 *
 * <h3 id="layout-section">
 *   Layout
 *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#layout-section"></a>
 * </h3>
 *
 * <h4>Fixed and Flowing Layout</h4>
 * <p>PictoChart supports both fixed and flowing layout. If the element has a fixed width and height
 * (set by the inline style, style class, etc.), then the pictoChart will use a <i>fixed layout</i>, which means that
 * the shapes will be resized to occupy the given space as much as possible. Otherwise, the pictoChart will use a
 * <i>flowing layout</i>, which means that the shapes are rendered at a constant size and the element will take up as
 * much space as necessary. It is possible to fix just one of the two dimensions, and the pictoChart would still
 * use the flowing layout.</p>
 * <p>If fixed layout is used, please avoid using the <code class="prettyprint">rowHeight</code> and <code class="prettyprint">columnWidth</code>
 * attributes as they may cause the shapes to be dropped if the given space is not large enough.</p>
 *
 * <h4>Layout Orientation and Origin</h4>
 * <p>PictoChart currently supports rectangular layouts with two different orientations (<i>horizontal</i> and <i>vertical</i>)
 * and four different origins (<i>topStart</i>, <i>topEnd</i>, <i>bottomStart</i>, and <i>bottomEnd</i>). Please refer to the
 * <a href="../jetCookbook.html?component=pictoChart&demo=default">cookbook demo</a> to see how these layout attributes work.</p>
 *
 * <h4>Mixed Sizes</h4>
 * <p>PictoChart supports items that are varying in sizes by specifying the <code class="prettyprint">columnSpan</code> and
 * <code class="prettyprint">rowSpan</code> attributes on the items. To ensure the best layout, it is recommended that the
 * bigger items are ordered first because the layout algorithm is greedy and will position items to the first available space.</p>
 *
 * {@ojinclude "name":"rtl"}
 */
oj.__registerWidget('oj.ojPictoChart', $['oj']['dvtBaseComponent'],
{
  widgetEventPrefix : "oj",
  options: {

    /**
     * Triggered during a drill gesture (double click if selection is enabled, single click otherwise).
     *
     * @property {string} id the id of the drilled object
     *
     * @expose
     * @event
     * @memberof oj.ojPictoChart
     * @instance
     */
    drill: null
  },

  //** @inheritdoc */
  _CreateDvtComponent : function(context, callback, callbackObj) {
    return dvt.PictoChart.newInstance(context, callback, callbackObj);
  },

  //** @inheritdoc */
  _ConvertLocatorToSubId : function(locator) {
    var subId = locator['subId'];

    // Convert the supported locators
    if(subId == 'oj-pictochart-item') {
      // item[index]
      subId = 'item[' + locator['index'] + ']';
    }
    else if(subId == 'oj-pictochart-tooltip') {
      subId = 'tooltip';
    }

    // Return the converted result or the original subId if a supported locator wasn't recognized. We will remove
    // support for the old subId syntax in 1.2.0.
    return subId;
  },

  //** @inheritdoc */
  _ConvertSubIdToLocator : function(subId) {
    var locator = {};

    if(subId.indexOf('item') == 0) {
      // item[index]
      locator['subId'] = 'oj-pictochart-item';
      locator['index'] = this._GetFirstIndex(subId);
    }
    else if(subId == 'tooltip') {
      locator['subId'] = 'oj-pictochart-tooltip';
    }

    return locator;
  },

  //** @inheritdoc */
  _GetComponentStyleClasses : function() {
    var styleClasses = this._super();
    styleClasses.push('oj-pictochart');
    return styleClasses;
  },

  //** @inheritdoc */
  _GetChildStyleClasses : function() {
    var styleClasses = this._super();
    styleClasses['oj-pictochart-item'] = {'path': '_defaultColor', 'property': 'background-color'};
    return styleClasses;
  },

  //** @inheritdoc */
  _GetEventTypes : function() {
    return ['optionChange'];
  },

  //** @inheritdoc */
  _HandleEvent : function(event) {
    var type = event['type'];
    if (type === 'drill') {
      this._trigger('drill', null, {'id': event['id']});
    }
    else {
      this._super(event);
    }
  },

  /**
   * Returns an object with the following properties for automation testing verification of the item at the
   * specified index.

   * @param {number} index The index.
   * @property {string} color
   * @property {number} count
   * @property {string} id
   * @property {string} name
   * @property {boolean} selected
   * @property {string} tooltip
   * @return {Object} An object containing data for the item at the given index, or null if none exists.
   * @expose
   * @memberof oj.ojPictoChart
   * @instance
   */
  getItem: function(index) {
    var auto = this._component.getAutomation();
    return auto.getItem(index);
  },

  /**
   * Returns the number of items in the pictoChart data.
   * @return {number} The number of data items
   * @expose
   * @memberof oj.ojPictoChart
   * @instance
   */
  getItemCount: function() {
    return this._component.getAutomation().getItemCount();
  },

  /**
   * {@ojinclude "name":"nodeContextDoc"}
   * @param {!Element} node - {@ojinclude "name":"nodeContextParam"}
   * @returns {Object|null} {@ojinclude "name":"nodeContextReturn"}
   *
   * @example {@ojinclude "name":"nodeContextExample"}
   *
   * @expose
   * @instance
   * @memberof oj.ojPictoChart
   */
  getContextByNode: function(node) {
    // context objects are documented with @ojnodecontext
    var context = this.getSubIdByNode(node);
    if (context && context['subId'] !== 'oj-pictochart-tooltip')
      return context;

    return null;
  },

  //** @inheritdoc */
  _GetComponentDeferredDataPaths : function() {
    return {'root': ['items']};
  },

  //** @inheritdoc */
  _IsFlowingLayoutSupported : function() {
    return true;
  }
});

/**
 * <table class="keyboard-table">
 *   <thead>
 *     <tr>
 *       <th>Target</th>
 *       <th>Gesture</th>
 *       <th>Action</th>
 *     </tr>
 *   </thead>
 *   <tbody>
 *     <tr>
 *       <td rowspan="5">Data Item</td>
 *       <td rowspan="2"><kbd>Tap</kbd></td>
 *       <td>Select when <code class="prettyprint">selectionMode</code> is enabled.</td>
 *     </tr>
 *     <tr>
 *       <td>Drill when <code class="prettyprint">drilling</code> is enabled and <code class="prettyprint">selectionMode</code> is <code class="prettyprint">none</code>.</td>
 *     </tr>
 *     <tr>
 *       <td><kbd>Double Tap</kbd></td>
 *       <td>Drill when <code class="prettyprint">drilling</code> is enabled and <code class="prettyprint">selectionMode</code> is enabled.</td>
 *     </tr>
 *     <tr>
 *       <td rowspan="2"><kbd>Press & Hold</kbd></td>
 *       <td>Display tooltip.</td>
 *     </tr>
 *     <tr>
 *       <td>Display context menu on release.</td>
 *     </tr>
 *   </tbody>
 * </table>
 * @ojfragment touchDoc - Used in touch gesture section of classdesc, and standalone gesture doc
 * @memberof oj.ojPictoChart
 */

/**
 * <table class="keyboard-table">
 *   <thead>
 *     <tr>
 *       <th>Key</th>
 *       <th>Action</th>
 *     </tr>
 *   </thead>
 *   <tbody>
 *     <tr>
 *       <td><kbd>Tab</kbd></td>
 *       <td>Move focus to next element.</td>
 *     </tr>
 *     <tr>
 *       <td><kbd>Shift + Tab</kbd></td>
 *       <td>Move focus to previous element.</td>
 *     </tr>
 *     <tr>
 *       <td><kbd>UpArrow</kbd></td>
 *       <td>Move focus and selection to previous item.</td>
 *     </tr>
 *     <tr>
 *       <td><kbd>DownArrow</kbd></td>
 *       <td>Move focus and selection to next item.</td>
 *     </tr>
 *     <tr>
 *       <td><kbd>LeftArrow</kbd></td>
 *       <td>Move focus and selection to previous item.</td>
 *     </tr>
 *     <tr>
 *       <td><kbd>RightArrow</kbd></td>
 *       <td>Move focus and selection to next item.</td>
 *     </tr>
 *     <tr>
 *       <td><kbd>Shift + UpArrow</kbd></td>
 *       <td>Move focus and multi-select previous item.</td>
 *     </tr>
 *     <tr>
 *       <td><kbd>Shift + DownArrow</kbd></td>
 *       <td>Move focus and multi-select next item.</td>
 *     </tr>
 *     <tr>
 *       <td><kbd>Shift + LeftArrow</kbd></td>
 *       <td>Move focus and multi-select previous item.</td>
 *     </tr>
 *     <tr>
 *       <td><kbd>Shift + RightArrow</kbd></td>
 *       <td>Move focus and multi-select next item.</td>
 *     </tr>
 *     <tr>
 *       <td><kbd>Ctrl + UpArrow</kbd></td>
 *       <td>Move focus to previous item, without changing the current selection.</td>
 *     </tr>
 *     <tr>
 *       <td><kbd>Ctrl + DownArrow</kbd></td>
 *       <td>Move focus to next item, without changing the current selection.</td>
 *     </tr>
 *     <tr>
 *       <td><kbd>Ctrl + LeftArrow</kbd></td>
 *       <td>Move focus to previous item, without changing the current selection.</td>
 *     </tr>
 *     <tr>
 *       <td><kbd>Ctrl + RightArrow</kbd></td>
 *       <td>Move focus to next item, without changing the current selection.</td>
 *     </tr>
 *     <tr>
 *       <td><kbd>Ctrl + Spacebar</kbd></td>
 *       <td>Multi-select item with focus.</td>
 *     </tr>
 *     <tr>
 *       <td><kbd>Enter</kbd></td>
 *       <td>Drill on item when <code class="prettyprint">drilling</code> is enabled.</td>
 *     </tr>
 *   </tbody>
 * </table>
 * @ojfragment keyboardDoc - Used in keyboard section of classdesc, and standalone gesture doc
 * @memberof oj.ojPictoChart
 */

/**
 *  The number of rows that the picto chart has. The number of rows will be automatically computed if not specified. 
 * @expose
 * @name rowCount
 * @memberof oj.ojPictoChart
 * @instance
 * @type {number}
 * @default <code class="prettyprint">null</code>
 */
/**
 *  The number of columns that the picto chart has. The number of columns will be automatically computed if not specified. 
 * @expose
 * @name columnCount
 * @memberof oj.ojPictoChart
 * @instance
 * @type {number}
 * @default <code class="prettyprint">null</code>
 */
/**
 *  The height of a row in pixels. Setting this property in a fixed layout (when the element width and height are defined) may cause items to be truncated. 
 * @expose
 * @name rowHeight
 * @memberof oj.ojPictoChart
 * @instance
 * @type {number}
 * @default <code class="prettyprint">null</code>
 */
/**
 *  The width of a column in pixels. Setting this property in a fixed layout (when the element width and height are defined) may cause items to be truncated. 
 * @expose
 * @name columnWidth
 * @memberof oj.ojPictoChart
 * @instance
 * @type {number}
 * @default <code class="prettyprint">null</code>
 */
/**
 *  The direction in which the items are laid out. 
 * @expose
 * @name layout
 * @memberof oj.ojPictoChart
 * @instance
 * @type {string}
 * @ojvalue {string} "vertical"
 * @ojvalue {string} "horizontal"
 * @default <code class="prettyprint">"horizontal"</code>
 */
/**
 *  Defines where the first item is rendered. The subsequent items follow the first item according to the layout. 
 * @expose
 * @name layoutOrigin
 * @memberof oj.ojPictoChart
 * @instance
 * @type {string}
 * @ojvalue {string} "topEnd"
 * @ojvalue {string} "bottomStart"
 * @ojvalue {string} "bottomEnd"
 * @ojvalue {string} "topStart"
 * @default <code class="prettyprint">"topStart"</code>
 */
/**
 *  The animation when the data changes. 
 * @expose
 * @name animationOnDataChange
 * @memberof oj.ojPictoChart
 * @instance
 * @type {string}
 * @ojvalue {string} "auto"
 * @ojvalue {string} "none"
 * @default <code class="prettyprint">"none"</code>
 */
/**
 *  The animation that is shown on initial display. 
 * @expose
 * @name animationOnDisplay
 * @memberof oj.ojPictoChart
 * @instance
 * @type {string}
 * @ojvalue {string} "auto"
 * @ojvalue {string} "popIn"
 * @ojvalue {string} "alphaFade"
 * @ojvalue {string} "zoom"
 * @ojvalue {string} "none"
 * @default <code class="prettyprint">"none"</code>
 */
/**
 *  The duration of the animations, in milliseconds. 
 * @expose
 * @name animationDuration
 * @memberof oj.ojPictoChart
 * @instance
 * @type {number}
 * @default <code class="prettyprint">null</code>
 */
/**
 *  An array of id strings, used to define the selected objects. 
 * @expose
 * @name selection
 * @memberof oj.ojPictoChart
 * @instance
 * @type {Array.<string>}
 * @default <code class="prettyprint">null</code>
 * @ojwriteback
 */
/**
 *  The type of selection behavior that is enabled on the picto chart. 
 * @expose
 * @name selectionMode
 * @memberof oj.ojPictoChart
 * @instance
 * @type {string}
 * @ojvalue {string} "single"
 * @ojvalue {string} "multiple"
 * @ojvalue {string} "none"
 * @default <code class="prettyprint">"none"</code>
 */
/**
 *  An array of category strings used for category filtering. Data items with a category in hiddenCategories will be filtered. 
 * @expose
 * @name hiddenCategories
 * @memberof oj.ojPictoChart
 * @instance
 * @type {Array.<string>}
 * @default <code class="prettyprint">null</code>
 * @ojwriteback
 */
/**
 *  An array of category strings used for category highlighting. Data items with a category in highlightedCategories will be highlighted. 
 * @expose
 * @name highlightedCategories
 * @memberof oj.ojPictoChart
 * @instance
 * @type {Array.<string>}
 * @default <code class="prettyprint">null</code>
 * @ojwriteback
 */
/**
 *  The matching condition for the highlightedCategories property. By default, highlightMatch is 'all' and only items whose categories match all of the values specified in the highlightedCategories array will be highlighted. If highlightMatch is 'any', then items that match at least one of the highlightedCategories values will be highlighted. 
 * @expose
 * @name highlightMatch
 * @memberof oj.ojPictoChart
 * @instance
 * @type {string}
 * @ojvalue {string} "any"
 * @ojvalue {string} "all"
 * @default <code class="prettyprint">"all"</code>
 */
/**
 *  The behavior applied when hovering over data items. 
 * @expose
 * @name hoverBehavior
 * @memberof oj.ojPictoChart
 * @instance
 * @type {string}
 * @ojvalue {string} "dim"
 * @ojvalue {string} "none"
 * @default <code class="prettyprint">"none"</code>
 */
/**
 *  Specifies initial hover delay in ms for highlighting data items.
 * @expose
 * @name hoverBehaviorDelay
 * @memberof oj.ojPictoChart
 * @instance
 * @type {number}
 * @default <code class="prettyprint">null</code>
 */
/**
 *  Whether drilling is enabled. Drillable items will show a pointer cursor on hover and fire an <code class="prettyprint">ojDrill</code> event on click (double click if selection is enabled). To enable or disable drilling on individual items, use the drilling attribute in each item. 
 * @expose
 * @name drilling
 * @memberof oj.ojPictoChart
 * @instance
 * @type {string}
 * @ojvalue {string} "on"
 * @ojvalue {string} "off"
 * @default <code class="prettyprint">"off"</code>
 */
/**
 *  An object containing an optional callback function for tooltip customization. 
 * @expose
 * @name tooltip
 * @memberof oj.ojPictoChart
 * @instance
 * @type {object}
 * @default <code class="prettyprint">null</code>
 */
/**
 *  A function that returns a custom tooltip. The function takes a dataContext argument,
 *  provided by the picto chart, with the following properties:
 *  <ul>
 *    <li>parentElement: The tooltip element. The function can directly modify or append content to this element.</li>
 *    <li>id: The id of the hovered item.</li>
 *    <li>name: The name of the hovered item.</li>
 *    <li>count: The count of the hovered item.</li>
 *    <li>color: The color of the hovered item.</li>
 *    <li>componentElement: The picto chart HTML element.</li>
 *  </ul>
 *  The function should return an Object that contains only one of the two properties:
 *  <ul>
 *    <li>insert: HTMLElement | string - An HTML element, which will be appended to the tooltip, or a tooltip string.</li> 
 *    <li>preventDefault: <code>true</code> - Indicates that the tooltip should not be displayed. It is not necessary to return {preventDefault:false} to display tooltip, since this is a default behavior.</li> 
 *  </ul>
 * @expose
 * @name tooltip.renderer
 * @memberof! oj.ojPictoChart
 * @instance
 * @type {function(object)}
 * @default <code class="prettyprint">null</code>
 */
/**
 *  An array of objects with the following properties that defines the pictoChart items. 
 * @expose
 * @name items
 * @memberof oj.ojPictoChart
 * @instance
 * @type {Array.<object>}
 * @default <code class="prettyprint">null</code>
 */
/**
 *  The id of the item. 
 * @expose
 * @name items[].id
 * @memberof! oj.ojPictoChart
 * @instance
 * @type {string}
 * @default <code class="prettyprint">null</code>
 */
/**
 *  The name of the item. Used for default tooltip and accessibility. 
 * @expose
 * @name items[].name
 * @memberof! oj.ojPictoChart
 * @instance
 * @type {string}
 * @default <code class="prettyprint">null</code>
 */
/**
 *  The shape of the item. Can take the name of a built-in shape or the svg path commands for a custom shape. "None" will make the item transparent and can be used to create gaps. Does not apply if custom image is specified. 
 * @expose
 * @name items[].shape
 * @memberof! oj.ojPictoChart
 * @instance
 * @type {string}
 * @ojvalue {string} "ellipse"
 * @ojvalue {string} "square"
 * @ojvalue {string} "circle"
 * @ojvalue {string} "diamond"
 * @ojvalue {string} "triangleUp"
 * @ojvalue {string} "triangleDown"
 * @ojvalue {string} "star"
 * @ojvalue {string} "plus"
 * @ojvalue {string} "human"
 * @ojvalue {string} "none"
 * @ojvalue {string} "rectangle"
 * @default <code class="prettyprint">"rectangle"</code>
 */
/**
 *  The color of the item. Does not apply if custom image is specified. 
 * @expose
 * @name items[].color
 * @memberof! oj.ojPictoChart
 * @instance
 * @type {string}
 * @default <code class="prettyprint">null</code>
 */
/**
 *  The border color of the item. Does not apply if custom image is specified. 
 * @expose
 * @name items[].borderColor
 * @memberof! oj.ojPictoChart
 * @instance
 * @type {string}
 * @default <code class="prettyprint">null</code>
 */
/**
 *  The border width of the item in pixels. Does not apply if custom image is specified. 
 * @expose
 * @name items[].borderWidth
 * @memberof! oj.ojPictoChart
 * @instance
 * @type {number}
 * @default <code class="prettyprint">null</code>
 */
/**
 *  The URI of the custom image. If specified, it takes precedence over shape. 
 * @expose
 * @name items[].source
 * @memberof! oj.ojPictoChart
 * @instance
 * @type {string}
 * @default <code class="prettyprint">null</code>
 */
/**
 * The CSS style class to apply to the item. The style class and inline style will override any other styling specified with other properties. For tooltip interactivity, it's recommended to also pass a representative color to the item color attribute. Does not apply if custom image is specified.
 * @ignore
 * @name items[].className
 * @memberof! oj.ojPictoChart
 * @instance
 * @type {string}
 * @default <code class="prettyprint">null</code>
 * @deprecated This attribute is deprecated, use the svgClassName attribute instead.
 */
/**
 * The inline style to apply to the item. The style class and inline style will override any other styling specified with other properties. For tooltip interactivity, it's recommended to also pass a representative color to the item color attribute. Does not apply if custom image is specified.
 * @ignore
 * @name items[].style
 * @memberof! oj.ojPictoChart
 * @instance
 * @type {object}
 * @default <code class="prettyprint">null</code>
 * @deprecated This attribute is deprecated, use the svgStyle attribute instead.
 */
/**
 * The CSS style class to apply to the item. The style class and inline style will override any other styling specified with other properties. For tooltip interactivity, it's recommended to also pass a representative color to the item color attribute. Does not apply if custom image is specified.
 * @expose
 * @name items[].svgClassName
 * @memberof! oj.ojPictoChart
 * @instance
 * @type {string}
 * @default <code class="prettyprint">null</code>
 */
/**
 * The inline style to apply to the item. The style class and inline style will override any other styling specified with other properties. For tooltip interactivity, it's recommended to also pass a representative color to the item color attribute. Does not apply if custom image is specified.
 * @expose
 * @name items[].svgStyle
 * @memberof! oj.ojPictoChart
 * @instance
 * @type {object}
 * @default <code class="prettyprint">null</code>
 */
/**
 *  The optional URI for the hover state. If not specified, the source image will be used. 
 * @expose
 * @name items[].sourceHover
 * @memberof! oj.ojPictoChart
 * @instance
 * @type {string}
 * @default <code class="prettyprint">null</code>
 */
/**
 *  The optional URI for the selected state. If not specified, the source image will be used. 
 * @expose
 * @name items[].sourceSelected
 * @memberof! oj.ojPictoChart
 * @instance
 * @type {string}
 * @default <code class="prettyprint">null</code>
 */
/**
 *  The optional URI for the hover selected state. If not specified, the source image will be used. 
 * @expose
 * @name items[].sourceHoverSelected
 * @memberof! oj.ojPictoChart
 * @instance
 * @type {string}
 * @default <code class="prettyprint">null</code>
 */
/**
 *  Specifies the number of times that the shape (or custom image) is drawn. Fractional counts (such as 4.5) are supported; however, fractions other than the multiples of 0.5 should be avoided because the fractional rendering ignores the gaps between shapes and the irregularity of the shapes. 
 * @expose
 * @name items[].count
 * @memberof! oj.ojPictoChart
 * @instance
 * @type {number}
 * @default <code class="prettyprint">1</code>
 */
/**
 *  The number of rows each shape (or custom image) spans. Used for creating a pictoChart with mixed item sizes. 
 * @expose
 * @name items[].rowSpan
 * @memberof! oj.ojPictoChart
 * @instance
 * @type {number}
 * @default <code class="prettyprint">1</code>
 */
/**
 *  The number of columns each shape (or custom image) spans. Used for creating a pictoChart with mixed item sizes. 
 * @expose
 * @name items[].columnSpan
 * @memberof! oj.ojPictoChart
 * @instance
 * @type {number}
 * @default <code class="prettyprint">1</code>
 */
/**
 *  Short description string for accessibility users. 
 * @expose
 * @name items[].shortDesc
 * @memberof! oj.ojPictoChart
 * @instance
 * @type {string}
 * @default <code class="prettyprint">null</code>
 */
/**
 *  An array of category strings corresponding to this item. If not specified, defaults to the item id or name. This enables highlighting and filtering of individual data items through interactions with other visualization elements. 
 * @expose
 * @name items[].categories
 * @memberof! oj.ojPictoChart
 * @instance
 * @type {Array.<string>}
 * @default <code class="prettyprint">null</code>
 */
/**
 *  Whether drilling is enabled for the item. Drillable items will show a pointer cursor on hover and fire an <code class="prettyprint">ojDrill</code> event on click (double click if selection is enabled). To enable drilling for all items at once, use the drilling attribute in the top level. 
 * @expose
 * @name items[].drilling
 * @memberof! oj.ojPictoChart
 * @instance
 * @type {string}
 * @ojvalue {string} "on"
 * @ojvalue {string} "off"
 * @ojvalue {string} "inherit"
 * @default <code class="prettyprint">"inherit"</code>
 */

// SubId Locators **************************************************************

/**
 * <p>Sub-ID for tag cloud items at a specified index.</p>
 *
 * @property {number} index
 *
 * @ojsubid oj-pictochart-item
 * @memberof oj.ojPictoChart
 *
 * @example <caption>Gets the first tag cloud item:</caption>
 * var nodes = myPictoChart.getNodeBySubId({'subId': 'oj-pictochart-item', 'index': 0});
 */

/**
 * <p>Sub-ID for the the tag cloud tooltip.</p>
 *
 * @ojsubid oj-pictochart-tooltip
 * @memberof oj.ojPictoChart
 *
 * @example <caption>Get the tooltip object of the tag cloud, if displayed:</caption>
 * var nodes = myPictoChart.getNodeBySubId({'subId': 'oj-pictochart-tooltip'});
 */

// Node Context Objects ********************************************************

/**
 * <p>Context for tag cloud items at a specified index.</p>
 *
 * @property {number} index
 *
 * @ojnodecontext oj-pictochart-item
 * @memberof oj.ojPictoChart
 */
/**
 * Ignore tag only needed for DVTs that have jsDoc in separate _doc.js files.
 * @ignore
 */
(function() {
var ojPictoChartMeta = {
  "properties": {
    "animationDuration": {
      "type": "number"
    },
    "animationOnDataChange": {
      "type": "string",
      "enumValues": ["auto", "none"]
    },
    "animationOnDisplay": {
      "type": "string",
      "enumValues": ["auto", "popIn", "alphaFade", "zoom", "none"]
    },
    "columnCount": {
      "type": "number"
    },
    "columnWidth": {
      "type": "number"
    },
    "drilling": {
      "type": "string",
      "enumValues": ["on", "off"]
    },
    "hiddenCategories": {
      "type": "Array<string>",
      "writeback": true
    },
    "highlightedCategories": {
      "type": "Array<string>",
      "writeback": true
    },
    "highlightMatch": {
      "type": "string",
      "enumValues": ["any", "all"]
    },
    "hoverBehavior": {
      "type": "string",
      "enumValues": ["dim", "none"]
    },
    "hoverBehaviorDelay": {
      "type": "number"
    },    
    "items": {
      "type": "Array<object>|Promise"
    },
    "layout": {
      "type": "string",
      "enumValues": ["horizontal", "vertical"]
    },
    "layoutOrigin": {
      "type": "string",
      "enumValues": ["topEnd", "bottomStart", "bottomEnd", "topStart"]
    },
    "rowCount": {
      "type": "number"
    },
    "rowHeight": {
      "type": "number"
    },
    "selection": {
      "type": "Array<string>",
      "writeback": true
    },
    "selectionMode": {
      "type": "string",
      "enumValues": ["single", "multiple", "none"]
    },
    "tooltip": {
      "type": "object",
      "properties": {
        "renderer": {}
      }
    },
    "translations": {
      "properties": {
        "componentName": {
          "type": "string"
        }
      }
    }
  },
  "events": {
    "drill": {}
  },
  "methods": {
    "getContextByNode": {},
    "getItem": {},
    "getItemCount": {}
  },
  "extension": {
    _WIDGET_NAME: "ojPictoChart"
  }
};
oj.CustomElementBridge.registerMetadata('oj-picto-chart', 'dvtBaseComponent', ojPictoChartMeta);
oj.CustomElementBridge.register('oj-picto-chart', {'metadata': oj.CustomElementBridge.getMetadata('oj-picto-chart')});
})();

});

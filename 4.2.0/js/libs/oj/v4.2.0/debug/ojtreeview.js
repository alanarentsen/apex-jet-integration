/**
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";
define(['ojs/ojcore', 'jquery', 'ojs/ojcomponentcore', 'ojs/ojanimation', 'ojs/ojkeyset', 'ojdnd'],
    function(oj, $)
{

/**
 * @ojcomponent oj.ojTreeView
 * @augments oj.baseComponent
 * @ojstatus preview
 * @since 4.0.0
 * @ojstatus preview
 *
 * @classdesc
 * <h3 id="treeViewOverview-section">
 *   JET TreeView
 *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#treeViewOverview-section"></a>
 * </h3>
 *
 * <p>The JET TreeView allows a user to display the hierarchical relationship between the items of a tree.</p>
 *
 * <h3 id="data-section">
 *   Data
 *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#data-section"></a>
 * </h3>
 * <p>The JET TreeView gets its data in two different ways. The first way is from a TreeDataSource. There are two types
 * of TreeDataSource that are available out of the box:</p>
 * <ul>
 * <li><b>oj.JsonTreeDataSource</b> - Use this when the underlying data is a JSON object.
 * See the documentation for <a href="oj.JsonTreeDataSource.html">oj.JsonTreeDataSource</a>
 * for more details on the available options.</li>
 * <li><b>oj.CollectionTreeDataSource</b> - Use this when oj.Collection is the model for each group of data.
 * See the documentation for <a href="oj.CollectionTreeDataSource.html">oj.CollectionTreeDataSource</a>
 * for more details on the available options.</li>
 * </ul>
 *
 * <p>The second way is using static HTML content as data.</p>
 *
 * <p>Example of static content</p>
 * <pre class="prettyprint">
 * <code>
 * &lt;oj-tree-view id="treeview1">
 *   &lt;ul>
 *     &lt;li>
 *       &lt;a id="group1" href="#">Group 1&lt;/a>
 *       &lt;ul>
 *         &lt;li>&lt;a id="item1-1" href="#">Item 1-1&lt;/a>&lt;/li>
 *         &lt;li>&lt;a id="item1-2" href="#">Item 1-2&lt;/a>&lt;/li>
 *       &lt;/ul>
 *     &lt;/li>
 *     &lt;li>
 *       &lt;a id="group2" href="#">Group 2&lt;/a>
 *       &lt;ul>
 *         &lt;li>&lt;a id="item2-1" href="#">Item 2-1&lt;/a>&lt;/li>
 *         &lt;li>&lt;a id="item2-2" href="#">Item 2-2&lt;/a>&lt;/li>
 *       &lt;/ul>
 *     &lt;/li>
 *   &lt;/ul>
 * &lt;/oj-tree-view>
 * </code></pre>
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
 * <h3 id="context-section">
 *   Item Context
 *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#context-section"></a>
 * </h3>
 *
 * <p>For item attributes, developers can specify a function as the return value.
 * The function takes a single argument, which is an object that contains contextual
 * information about the particular item. This gives developers the flexibility
 * to return different value depending on the context.</p>
 *
 * <p>The context parameter contains the following keys:</p>
 * <table class="keyboard-table">
 *   <thead>
 *     <tr>
 *       <th>Key</th>
 *       <th>Description</th>
 *     </tr>
 *   </thead>
 *   <tbody>
 *     <tr>
 *       <td><kbd>componentElement</kbd></td>
 *       <td>The TreeView element.</td>
 *     </tr>
 *     <tr>
 *       <td><kbd>data</kbd></td>
 *       <td>The data object for the item (not available for static content).</td>
 *     </tr>
 *     <tr>
 *       <td><kbd>datasource</kbd></td>
 *       <td>A reference to the data source object (not available for static content).</td>
 *     </tr>
 *     <tr>
 *       <td><kbd>depth</kbd></td>
 *       <td>The depth of the item. The depth of the first level children under the invisible root is 1.</td>
 *     </tr>
 *     <tr>
 *       <td><kbd>index</kbd></td>
 *       <td>The index of the item relative to its parent, where 0 is the index of the first item.</td>
 *     </tr>
 *     <tr>
 *       <td><kbd>key</kbd></td>
 *       <td>The key of the item.</td>
 *     </tr>
 *     <tr>
 *       <td><kbd>leaf</kbd></td>
 *       <td>Whether the item is a leaf item.</td>
 *     </tr>
 *     <tr>
 *       <td><kbd>parentElement</kbd></td>
 *       <td>The TreeView item element. The renderer can use this to directly append content.</td>
 *     </tr>
 *     <tr>
 *       <td><kbd>parentKey</kbd></td>
 *       <td>The key of the parent item. The parent key is null for root item.</td>
 *     </tr>
 *   </tbody>
 * </table>
 *
 * <h3 id="accessibility-section">
 *   Accessibility
 *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#accessibility-section"></a>
 * </h3>
 *
 * <p>Application must ensure that the context menu is available and setup with the
 * appropriate clipboard menu items so that keyboard-only users are able to reorder items
 * just by using the keyboard.
 *
 * <h3 id="perf-section">
 *   Performance
 *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#perf-section"></a>
 * </h3>
 *
 * <h4>Data Set Size</h4>
 * <p>As a rule of thumb, it is recommended that applications limit the amount of data to display. Displaying large
 * number of items in TreeView makes it hard for user to find what they are looking for, but affects the load time and
 * scrolling performance as well.</p>
 *
 * <h4>Item Content</h4>
 * <p>TreeView allows developers to specify arbitrary content inside its item. In order to minimize any negative effect on
 * performance, please avoid putting a large number of heavy-weight components inside because as it adds more complexity
 * to the structure, and the effect will be multiplied because there can be many items in the TreeView.</p>
 *
 * <h4>Expand All</h4>
 * <p>While TreeView provides a convenient way to initially expand all parent items in the TreeView, it might have an impact
 * on the initial rendering performance since expanding each parent item might cause a fetch from the server depending on
 * the TreeDataSource. Other factors that could impact performance includes the depth of the tree, and the number of children
 * in each level.</p>
 *
 * <h3 id="animation-section">
 *   Animation
 *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#animation-section"></a>
 * </h3>
 *
 * <p>Applications can customize animations triggered by actions in TreeView by either listening for <code class="prettyprint">animateStart/animateEnd</code>
 *    events or overriding action specific style classes on the animated item.  See the documentation of <a href="oj.AnimationUtils.html">oj.AnimationUtils</a> 
 *    class for details.</p>
 *
 * <p>The following are actions and their corresponding sass variables in which applications can use to customize animation effects.
 * <table class="keyboard-table">
 *   <thead>
 *     <tr>
 *       <th>Action</th>
 *       <th>Sass Variable</th>
 *       <th>Description</th>
 *     </tr>
 *   </thead>
 *   <tbody>
 *     <tr>
 *       <td><kbd>expand</kbd></td>
 *       <td>$treeViewExpandAnimation</td>
 *       <td>When user expands an item.</td>
 *     </tr>
 *     <tr>
 *       <td><kbd>collapse</kbd></td>
 *       <td>$treeViewCollapseAnimation</td>
 *       <td>When user collapses an item.</td>
 *     </tr>
 *   </tbody>
 * </table>
 */
(function()
{
  oj.__registerWidget('oj.ojTreeView', $['oj']['baseComponent'],
  {
    version: '1.0.0',
    defaultElement: '<div>',
    widgetEventPrefix: 'oj',
    options: {
      /**
       * The key of the item that has the browser focus.
       * This is a read-only attribute so page authors cannot set or change it directly.
       *
       * @expose
       * @public
       * @type {Object}
       * @instance
       * @memberof! oj.ojTreeView
       * @readonly
       *
       * @example <caption>Get the current item:</caption>
       * myTreeView.currentItem;
       */
      currentItem: null,

      /**
       * The data source for the TreeView. Accepts an instance of oj.TreeDataSource.
       * See the data source section in the introduction for out of the box data source types.
       * If the data attribute is not specified, the child elements are used as content. If there's no
       * content specified, then an empty list is rendered.
       *
       * @expose
       * @public
       * @type {oj.TreeDataSource}
       * @instance
       * @memberof! oj.ojTreeView
       * @default <code class="prettyprint">null</code>
       *
       * @example <caption>Initialize the TreeView with an oj.Collection:</caption>
       * myTreeView.data = new oj.CollectionTableDataSource(collection);
       */
      data: null,

      /**
       * Enable drag and drop functionality.<br><br>
       * JET provides support for HTML5 Drag and Drop events.  Please refer to {@link https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Drag_and_drop third party documentation} 
       * on HTML5 Drag and Drop to learn how to use it.
       *
       * @expose
       * @memberof! oj.ojTreeView
       * @instance
       */
      dnd: {
        /**
         * @expose
         * @alias dnd.drag
         * @memberof! oj.ojTreeView
         * @instance
         * @type {Object}
         * @default <code class="prettyprint">null</code>
         * @property {Object} items If this object is specified, TreeView will initiate drag operation when the user drags on an item.
         * @property {string|Array.<string>} items.dataTypes  (optional) The MIME types to use for the dragged data in the dataTransfer object. This can be a string if there is only one
         * type, or an array of strings if multiple types are needed.<br><br>
         * For example, if selected items of employee data are being dragged, dataTypes could be "application/employees+json". Drop targets can examine the data types and decide
         * whether to accept the data. A text input may only accept "text" data type, while a chart for displaying employee data may be configured to accept the "application/employees+json" type.<br><br>
         * For each type in the array, dataTransfer.setData will be called with the specified type and the JSON version of the selected item data as the value. The selected item data 
         * is an array of objects, with each object representing a model object from the underlying data source. For example, if the underlying data is an oj.Collection, then this
         * would be a oj.Model object. Note that when static HTML is used, then the value would be the HTML string of the selected item.<br><br>
         * This property is required unless the application calls setData itself in a dragStart callback function.
         * @property {function} items.dragStart (optional) A callback function that receives the "dragstart" event and context information as arguments:<br><br>
         * <code class="prettyprint">function(event, context)</code><br><br>
         * All of the event payloads listed below can be found under the <code class="prettyprint">context</code> argument.
         * <ul><li><code class="prettyprint">items</code>: An array of objects, with each object representing the data of one selected item.</li></ul><br>
         * This function can set its own data and drag image as needed. If dataTypes is specified, event.dataTransfer is already populated with the default data when this function is invoked.
         * If dataTypes is not specified, this function must call event.dataTransfer.setData to set the data or else the drag operation will be cancelled. In either case, the drag image is
         * set to an image of the dragged items on the TreeView.
         * @property {function} items.drag  (optional) A callback function that receives the "drag" event as argument:<br><br>
         * <code class="prettyprint">function(event)</code><br><br>
         * @property {function} items.dragEnd  (optional) A callback function that receives the "dragend" event as argument:<br><br>
         * <code class="prettyprint">function(event)</code><br><br>
         *
         * @example <caption>Initialize the TreeView such that only leaf items are focusable:</caption>
         * myTreeView.setProperty('dnd.drag.items', {
         *   'dataTypes': ['application/ojtreeviewitems+json'],
         *   'dragEnd': handleDragEnd
         * });
         */
        drag: null,

        /**
         * @expose
         * @alias dnd.drop
         * @memberof! oj.ojTreeView
         * @instance
         * @type {Object}
         * @default <code class="prettyprint">null</code>
         * @property {Object} items  An object that specifies callback functions to handle dropping items<br><br>
         * @property {string|Array.<string>} items.dataTypes  A data type or an array of data types this component can accept.<br><br>
         * This property is required unless dragEnter, dragOver, and drop callback functions are specified to handle the corresponding events.
         * @property {function} items.dragEnter (optional) A callback function that receives the "dragenter" event and context information as arguments:<br><br>
         * <code class="prettyprint">function(event, context)</code><br><br>
         * All of the event payloads listed below can be found under the <code class="prettyprint">context</code> argument.
         * <ul><li><code class="prettyprint">item</code>: The item being entered.</li></ul><br>
         * This function should call <code class="prettyprint">event.preventDefault()</code> to indicate the dragged data can be accepted.
         * Otherwise, dataTypes will be matched against the drag dataTypes to determine if the data is acceptable. If there is a match, <code class="prettyprint">event.preventDefault()</code>
         * will be called to indicate that the data can be accepted.
         * @property {function} items.dragOver (optional) A callback function that receives the "dragover" event and context information as arguments:<br><br>
         * <code class="prettyprint">function(event, context)</code><br><br>
         * All of the event payloads listed below can be found under the <code class="prettyprint">context</code> argument.
         * <ul><li><code class="prettyprint">item</code>: The item being dragged over.</li></ul><br>
         * This function should call <code class="prettyprint">event.preventDefault()</code> to indicate the dragged data can be accepted.
         * Otherwise, dataTypes will be matched against the drag dataTypes to determine if the data is acceptable. If there is a match, <code class="prettyprint">event.preventDefault()</code>
         * will be called to indicate that the data can be accepted.
         * @property {function} items.dragLeave (optional) A callback function that receives the "dragleave" event and context information as arguments:<br><br>
         * <code class="prettyprint">function(event, context)</code><br><br>
         * All of the event payloads listed below can be found under the <code class="prettyprint">context</code> argument.
         * <ul><li><code class="prettyprint">item</code>: The item that was last entered.</li></ul><br>
         * @property {function} items.drop (required) A callback function that receives the "drop" event and context information as arguments:<br><br>
         * <code class="prettyprint">function(event, context)</code><br><br>
         * All of the event payloads listed below can be found under the <code class="prettyprint">context</code> argument.
         * <ul><li><code class="prettyprint">item</code>: The item being dropped on.</li>
         * <li><code class="prettyprint">position</code>: The drop position relative to the item being dropped on.
         * Valid values are "inside", "before", "after", and "first" (the first child of the item being dropped on).</li></ul><br>
         * This function should call <code class="prettyprint">event.preventDefault()</code> to indicate the dragged data can be accepted.<br><br>
         * If the application needs to look at the data for the item being dropped on, it can use the <code class="prettyprint">getContextByNode</code> method.
         *
         * @example <caption>Initialize the TreeView such that only leaf items are focusable:</caption>
         * myTreeView.setProperty('dnd.drop.items', {
         *   'dataTypes': ['application/ojtreeviewitems+json'],
         *   'drop': handleDrop
         * });
         */
        drop: null
      },

      /**
       * Specifies the key set containing the keys of the TreeView items that should be expanded.
       *
       * @expose
       * @memberof! oj.ojTreeView
       * @instance
       * @type {KeySet}
       * @default <code class="prettyprint">new keySet.ExpandedKeySet()</code>
       *
       * @example <caption>Initialize the TreeView with some expanded items:</caption>
       * myTreeView.expanded = new keySet.ExpandedKeySet(['item1', 'item2']);
       */
      expanded: new oj.ExpandedKeySet(),

      /**
       * The item attribute contains a subset of attributes for items.
       *
       * @expose
       * @memberof! oj.ojTreeView
       * @instance
       */
      item: {
        /**
         * A function that returns whether the item is focusable.
         * A item that is not focusable cannot be clicked on or navigated to.
         * See <a href="#context-section">itemContext</a> in the introduction
         * to see the object passed into the focusable function.
         * If no function is specified, then all the items will be focusable.
         *
         * @expose
         * @alias item.focusable
         * @memberof! oj.ojTreeView
         * @instance
         * @type {function(Object)|null}
         * @default <code class="prettyprint">null</code>
         *
         * @example <caption>Initialize the TreeView such that only leaf items are focusable:</caption>
         * myTreeView.setProperty('item.focusable', function(itemContext)
         * {
         *   return itemContext['leaf'];
         * });
         */
        focusable: null,

        /**
         * The renderer function that renders the contents of the item. See <a href="#context-section">itemContext</a>
         * in the introduction to see the object passed into the renderer function.
         * The function should return one of the following: 
         * <ul>
         *   <li>An Object with the following property:
         *     <ul><li>insert: HTMLElement | string - A string or a DOM element of the content inside the item.</li></ul>
         *   </li>
         *   <li>undefined: If the developer chooses to manipulate the item element directly, the function should return undefined.</li>
         * </ul>
         *
         * @expose
         * @alias item.renderer
         * @memberof! oj.ojTreeView
         * @instance
         * @type {function(Object)|null}
         * @default <code class="prettyprint">null</code>
         *
         * @example <caption>Initialize the TreeView with a renderer:</caption>
         * myTreeView.setProperty('item.renderer', function(itemContext)
         * {
         *   return itemContext['data'].get('FIRST_NAME');
         * });
         */
        renderer: null,

        /**
         * A function that returns whether the item can be selected.
         * If selectionMode is set to "none" this attribute is ignored.
         * See <a href="#context-section">itemContext</a> in the introduction
         * to see the object passed into the selectable function. 
         * If no function is specified, then all the items will be selectable.
         *
         * @expose
         * @alias item.selectable
         * @memberof! oj.ojTreeView
         * @instance
         * @type {function(Object)|null}
         * @default <code class="prettyprint">null</code>
         *
         * @example <caption>Initialize the TreeView such that only leaf items are selectable:</caption>
         * myTreeView.setProperty('item.selectable', function(itemContext)
         * {
         *   return itemContext['leaf'];
         * });
         */
        selectable: null
      },

      /**
       * The current selections in the TreeView. An empty array indicates nothing is selected.
       *
       * @expose
       * @memberof! oj.ojTreeView
       * @instance
       * @type {Array.<Object>}
       * @default <code class="prettyprint">[]</code>
       *
       * @example <caption>Initialize the TreeView with specific selection:</caption>
       * myTreeView.selection = ['item1', 'item2'];
       */
      selection: [],

      /**
       * Specifies whether selection can be made and the cardinality of selection in the TreeView.
       *
       * @expose
       * @memberof! oj.ojTreeView
       * @instance
       * @type {string}
       * @default <code class="prettyprint">none</code>
       * @ojvalue {string} "none": Selection is disabled.
       * @ojvalue {string} "single" Only one item can be selected at a time.
       * @ojvalue {string} "multiple" Multiple items can be selected at the same time.
       *
       * @example <caption>Initialize the list view to enable multiple selection:</caption>
       * myTreeView.selectionMode = 'multiple';
       */
      selectionMode: 'none',

      // Events

      /**
       * Triggered when the default animation of a particular action has ended.
       * Note this event will not be triggered if application cancelled the default animation on animateStart.
       *
       * @expose
       * @event
       * @memberof oj.ojTreeView
       * @instance
       * @property {Object} action The action that started the animation. See <a href="#animation-section">animation</a> section for a list of actions.
       * @property {Object} element The target of animation.
       */
      animateEnd: null,

      /**
       * Triggered when the default animation of a particular action is about to start.
       * The default animation can be cancelled by calling <code class="prettyprint">event.preventDefault()</code>.
       *
       * @expose
       * @event
       * @memberof oj.ojTreeView
       * @instance
       * @property {Object} action The action that starts the animation. See <a href="#animation-section">animation</a> section for a list of actions.
       * @property {Object} element The target of animation.
       * @property {function} endCallback If the event listener calls <code class="prettyprint">event.preventDefault()</code> to cancel the default animation, it must call the endCallback function when it finishes its own animation handling and when any custom animation ends.
       */
      animateStart: null,

      /**
       * Triggered before an item is collapsed via the <code class="prettyprint">expanded</code> attribute or via the UI.
       * Call <code class="prettyprint">event.preventDefault()</code> to veto the event, which prevents collapsing the item.
       *
       * @expose
       * @event
       * @memberof oj.ojTreeView
       * @instance
       * @property {Object} key The key of the item to be collapsed.
       * @property {Element} item The item to be collapsed.
       */
      beforeCollapse: null,

      /**
       * Triggered before the current item is changed via the <code class="prettyprint">currentItem</code> attribute or via the UI.
       * Call <code class="prettyprint">event.preventDefault()</code> to veto the event, which prevents changing the current item.
       *
       * @expose
       * @event
       * @memberof oj.ojTreeView
       * @instance
       * @property {Object} previousKey The key of the previous item.
       * @property {Element} previousItem The previous item.
       * @property {Object} key The key of the new current item.
       * @property {Element} item The new current item.
       */
      beforeCurrentItem: null,

      /**
       * Triggered before an item is expanded via the <code class="prettyprint">expanded</code> attribute or via the UI.
       * Call <code class="prettyprint">event.preventDefault()</code> to veto the event, which prevents expanding the item.
       *
       * @expose
       * @event
       * @memberof oj.ojTreeView
       * @instance
       * @property {Object} key The key of the item to be expanded.
       * @property {Element} item The item to be expanded.
       */
      beforeExpand: null,

      /**
       * Triggered after an item has been collapsed.
       *
       * @expose
       * @event
       * @memberof oj.ojTreeView
       * @instance
       * @property {Object} key The key of the item that was just collapsed.
       * @property {Element} item The item that was just collapsed.
       */
      collapse: null,

      /**
       * Triggered after an item has been expanded.
       *
       * @expose
       * @event
       * @memberof oj.ojTreeView
       * @instance
       * @property {Object} key The key of the item that was just expanded.
       * @property {Element} item The item that was just expanded.
       */
      expand: null
    },

    // @inheritdoc
    _ComponentCreate: function()
    {
      this._super();
    },

    // @inheritdoc
    _AfterCreate: function()
    {
      this._super();
      this._initRender();
      this._render();
    },

    /**
     * Initializes the TreeView.
     * @private
     */
    _initRender: function()
    {
      var self = this;

      // Event listeners
      this._on(this.element, {
        'click': function(event)
        {
          self._handleClick(event);
        },
        'mouseover': function(event)
        {
          self._handleMouseOver(event);
        },
        'mouseout': function(event)
        {
          self._handleMouseOut(event);
        },
        'mousedown': function(event)
        {
          self._handleMouseDown(event);
        },
        'mouseup': function(event)
        {
          self._handleMouseUp(event);
        },
        'keydown': function(event)
        {
          self._handleKeyDown(event);
        },
        'dragstart': function(event)
        {
          self._handleDragStart(event);
        },
        'drag': function(event)
        {
          self._handleDragSourceEvent(event, 'drag');
        },
        'dragend': function(event)
        {
          self._handleDragSourceEvent(event, 'dragEnd');
        },
        'dragenter': function(event)
        {
          self._handleDropTargetEvent(event, 'dragEnter');
        },
        'dragover': function(event)
        {
          self._handleDropTargetEvent(event, 'dragOver');
        },
        'dragleave': function(event)
        {
          self._handleDropTargetEvent(event, 'dragLeave');
        },
        'drop': function(event)
        {
          self._handleDropTargetEvent(event, 'drop');
        }
      });

      // Drop marker
      var dropMarkerIcon = $(document.createElement('span'))
        .addClass('oj-treeview-drop-marker-icon oj-component-icon');

      this._dropMarker = $(document.createElement('div'))
        .addClass('oj-treeview-drop-marker')
        .append(dropMarkerIcon) // @HTMLUpdateOK
        .appendTo(this.element); // @HTMLUpdateOK

      this._dropMarkerRect = this._dropMarker[0].getBoundingClientRect();
      this._dropMarker.hide();

      this._dropLine = $(document.createElement('div'))
        .addClass('oj-treeview-drop-line')
        .appendTo(this.element); // @HTMLUpdateOK

      this._dropLineRect = this._dropLine[0].getBoundingClientRect();
      this._dropLine.hide();
    },

    /**
     * Renders the TreeView.
     * @private
     */
    _render: function()
    {
      var self = this;
      this.element.removeClass('oj-complete');

      if (this.options['data'])
      {
        this.element.find('ul').remove();
        this._fetchChildren(null, function(nodeSet)
        {
          self._renderItems(nodeSet, self.element);
          self._resetFocus();
          self.element.addClass('oj-complete');
        });
      }
      else
      {
        this.element.find('ul').addClass('oj-treeview-list').attr('role', 'group');
        this.element.find('li').each(function()
        {
          var item = $(this);
          self._decorateItem(item);
        });
        this._resetFocus();
        this.element.addClass('oj-complete');
      }

      this._decorateTree();
      this._lastSelectedItem = null;
    },

    /**
     * Fetch the children of a parent item from the data source.
     * @param {string} parentKey The key of the parent item.
     * @param {Function} successFunc The function to be called if the fetch is successful.
     * @private
     */
    _fetchChildren: function(parentKey, successFunc)
    {
      var self = this;
      var dataSource = self.options['data'];
      var range = {'start': 0, 'count': dataSource.getChildCount(parentKey)};
      var busyResolve = this._addBusyState('fetching data');

      dataSource.fetchChildren(parentKey, range, {
        'success': function(nodeSet)
        {
          successFunc(nodeSet);
          busyResolve();
        },
        'error': function(status)
        {
          oj.Logger.error(status);
          busyResolve();
        }
      });
    },

    /**
     * Render the TreeView items after the data is fetched.
     * @param {oj.JsonNodeSet|oj.CollectionNodeSet} nodeSet The array of item data returned by the data source.
     * @param {jQuery} parentElem The parent element to append the items to.
     * @private
     */
    _renderItems: function(nodeSet, parentElem)
    {
      var ulElem = $(document.createElement('ul'))
        .addClass('oj-treeview-list')
        .attr('role', 'group')
        .appendTo(parentElem); // @HTMLUpdateOK

      for (var i = 0; i < nodeSet.getCount(); i++)
      {
        this._renderItem(ulElem, nodeSet, i);
      }
    },

    /**
     * Render a TreeView item after the data is fetched.
     * @param {jQuery} ulElem The <ul> to attach the item to.
     * @param {oj.JsonNodeSet|oj.CollectionNodeSet} nodeSet The array of item data returned by the data source.
     * @param {number} index The index of the item.
     * @private
     */
    _renderItem: function(ulElem, nodeSet, index)
    {
      var self = this;

      index += nodeSet.getStart();
      var data = nodeSet.getData(index);
      var metadata = nodeSet.getMetadata(index);
      var key = metadata['key'];

      var renderer = self.options['item']['renderer'];
      renderer = self._WrapCustomElementRenderer(renderer);

      var liElem = $(document.createElement('li'))
        .attr('id', key)
        .appendTo(ulElem); // @HTMLUpdateOK

      if (renderer)
      {
        // TODO: store index somewhere to return in the context

        var context = {};
        context['parentElement'] = liElem;
        context['index'] = index;
        context['data'] = data;
        context['datasource'] = self.options['data'];
        context['parentKey'] = self._getKey(self._getParentItem(liElem));

        context['component'] = oj.Components.__GetWidgetConstructor(self.element);
        if (self._FixRendererContext)
          context = self._FixRendererContext(context);

        // Merge properties from metadata into item context
        for (var prop in metadata) 
        {
          if (metadata.hasOwnProperty(prop))
            context[prop] = metadata[prop];
        }

        var content = renderer.call(self, context);
        if (content != null)
        {
          // Allow return of document fragment from jQuery create or JS document.createDocumentFragment
          if (content.parentNode === null || content.parentNode instanceof DocumentFragment)
          {
            liElem.append(content); // @HTMLUpdateOK
          }
          else if (content.parentNode != null)
          {
            // Parent node exists, do nothing
          }
          else if (content.toString)
          {
            var textWrapper = document.createElement('span');
            textWrapper.appendChild(document.createTextNode(content.toString())); // @HTMLUpdateOK
            liElem.append(textWrapper); // @HTMLUpdateOK
          }
        }

        // Get the item from root again as template replaces the item element
        liElem = ulElem.children().eq(index);
        context['parentElement'] = liElem;

        // Set id on the liElem if not set by the renderer
        if (liElem.attr('id') == null)
          liElem.attr('id', key);
      }

      // Cache data and metadata for lookup
      liElem.data('data', data).data('metadata', metadata)

      self._decorateItem(liElem);
    },

    /**
     * Adds the necessary attributes to a TreeView root element.
     * @private
     */
    _decorateTree: function()
    {
      var self = this;

      // Keyboard focus and ARIA attributes
      var root = this._getRoot();
      this._focusable({
        'element': root,
        'applyHighlight': true,
        'setupHandlers': function(focusInHandler, focusOutHandler)
        {
          self._focusInHandler = focusInHandler;
          self._focusOutHandler = focusOutHandler;
        }
      });

      root.attr('tabIndex', 0)
        .on('focus', function(event)
        {
          self._focusInHandler(self._getItemContent(self._currentItem));
        })
        .on('blur',function(event)
        {
          self._focusOutHandler(self._getItemContent(self._currentItem));
        })
        .attr('role', 'tree')
        .attr('aria-labelledby', this.element.attr('id'));

      var selectionMode = this.options['selectionMode'];
      if (selectionMode != 'none')
        root.attr('aria-multiselectable', selectionMode == 'multiple' ? 'true' : 'false');
      else
        root.removeAttr('aria-multiselectable');
    },

    /**
     * Adds the necessary attributes to a TreeView item element.
     * @param {jQuery} item The item element to decorate.
     * @private
     */
    _decorateItem: function(item)
    {
      var self = this;
      item.addClass('oj-treeview-item').attr('role', 'treeitem');

      // Create wrapper for item icon and text
      var itemContent = this._getItemContent(item);
      if (itemContent.length == 0)
      {
        // Wrap everything except the subtree
        itemContent = $(document.createElement('div'))
          .addClass('oj-treeview-item-content')
          .append(item.children(':not(ul)')) // @HTMLUpdateOK
          .prependTo(item); // @HTMLUpdateOK

        itemContent.find('.oj-treeview-item-icon').addClass('oj-treeview-icon');
      }

      // Initial selection
      self._select(item);

      // DnD
      var dragOptions = this._getDragOptions();
      itemContent.attr('draggable', Object.keys(dragOptions).length > 0 ? 'true' : 'false');

      // Create disclosure icon or spacer
      var disclosureIcon = item.children('.oj-treeview-spacer');
      if (disclosureIcon.length == 0)
      {
        disclosureIcon = $(document.createElement('ins'))
          .addClass('oj-treeview-icon oj-treeview-spacer')
          .prependTo(item); // @HTMLUpdateOK
      }

      if (self._isLeaf(item))
      {
        item.addClass('oj-treeview-leaf');
      }
      else
      {
        // Expanded option
        if (self._isInitExpanded(item))
          self._expand(item, false);
        else 
          self._collapse(item, false);

        disclosureIcon.addClass('oj-treeview-disclosure-icon oj-component-icon oj-clickable-icon-nocontext oj-default');
      }
    },

    /**
     * Returns all the item elements that belongs to the TreeView.
     * @return {jQuery} All the item elements that belongs to the TreeView.
     * @private
     */
    _getItems: function()
    {
      return this.element.find('.oj-treeview-item');
    },

    /**
     * Returns the key of the provided item.
     * @param {jQuery} item The TreeView item element.
     * @return {jQuery|string|undefined} The key.
     * @private
     */
    _getKey: function(item)
    {
      // Rely on the key in the metadata first. The DOM id stringifies the key,
      // so it won't return the correct key if the key isn't string.
      var metadata = item.data('metadata');
      if (metadata)
        return metadata['key'];
      else
        return item.attr('id');
    },

    /**
     * Returns the item element that is identified by the provided key.
     * @param {string} key The key.
     * @return {jQuery} The item element.
     * @private
     */
    _getItemByKey: function(key)
    {
      return this.element.find('li#' + key);
    },

    /**
     * Returns the content element of the provided item element.
     * @param {jQuery} item The TreeView item element.
     * @return {jQuery} The item content element.
     * @private
     */
    _getItemContent: function(item)
    {
      return item.children('.oj-treeview-item-content');
    },

    /**
     * Returns the child items of the provided item element.
     * @param {jQuery} item The TreeView item element.
     * @return {jQuery} The child item elements.
     * @private
     */
    _getChildItems: function(item)
    {
      return item.children('.oj-treeview-list').children('.oj-treeview-item');
    },

    /**
     * Returns the parent item of the provided item element.
     * @param {jQuery} item The TreeView item element.
     * @return {jQuery} The parent item element.
     * @private
     */
    _getParentItem: function(item)
    {
      return item.parent('.oj-treeview-list').parent('.oj-treeview-item');
    },

    /**
     * Returns the subtree element (ul) of the provided item element.
     * @param {jQuery} item The TreeView item element.
     * @return {jQuery} The subtree element (ul).
     * @private
     */
    _getSubtree: function(item)
    {
      return item.children('.oj-treeview-list');
    },

    /**
     * Returns the root ul of the TreeView.
     * @return {jQuery}
     * @private
     */
    _getRoot: function()
    {
      return this.element.children('.oj-treeview-list');
    },

    /**
     * Returns whether the item is a leaf item.
     * @param {jQuery} item The TreeView item element.
     * @return {boolean}
     * @private
     */
    _isLeaf: function(item)
    {
      var metadata = item.data('metadata');
      var hasChildren = metadata ? !metadata['leaf'] : this._getSubtree(item).length > 0;
      return !hasChildren;
    },

    /**
     * Returns whether item element is initially expanded in the TreeView option.
     * Note that the expanded option is not kept in sync with the actual expanded state of the TreeView.
     * @param {jQuery} item The TreeView item element.
     * @return {boolean}
     * @private
     */
    _isInitExpanded: function(item)
    {
      var key = this._getKey(item);
      var expanded = this.options['expanded'];
      return (expanded && expanded.has) ? expanded.has(key) : false;
    },

    /**
     * Returns whether item element is currently expanded.
     * Note that the expanded option is not kept in sync with the actual expanded state of the TreeView.
     * @param {jQuery} item The TreeView item element.
     * @return {boolean}
     * @private
     */
    _isExpanded: function(item)
    {
      return item.hasClass('oj-expanded');
    },

    /**
     * Expands an item.
     * @param {jQuery} item The TreeView item element.
     * @param {boolean} animate Whether the expand should be animated.
     * @param {Event} event The event that triggers the expand.
     * @param {boolean} vetoable Whether the expand can be vetoed by beforeExpand.
     * @private
     */
    _expand: function(item, animate, event, vetoable)
    {
      var self = this;

      if (this._isExpanded(item) || this._isLeaf(item))
        return;

      if (animate)
      {
        var cancelled = !this._trigger('beforeExpand', event, this._getEventPayload(item));
        if (cancelled && vetoable !== false)
          return;
      }

      var subtree = this._getSubtree(item);
      if (subtree.length == 0)
      {
        return self._fetchChildren(self._getKey(item), function(nodeSet)
        {
          self._renderItems(nodeSet, item);
          self._expandAfterFetch(item, animate, event);
        });
      }
      else
      {
        self._expandAfterFetch(item, animate, event);
      }

      this._lastSelectedItem = null;
    },

    /**
     * Expands an item after its child items have been fetched.
     * @param {jQuery} item The TreeView item element.
     * @param {boolean} animate Whether the expand should be animated.
     * @param {Event} event The event that triggers the expand.
     * @private
     */
    _expandAfterFetch: function(item, animate, event)
    {
      var self = this;

      item.removeClass('oj-collapsed').addClass('oj-expanded').attr('aria-expanded', 'true');

      var subtree = this._getSubtree(item);
      subtree.css('max-height', 'none');

      if (animate)
      {
        var busyResolve = this._addBusyState('animating expand');
        item.addClass('oj-treeview-animated'); // animation flag

        this._startAnimation(subtree, 'expand').then(function()
        {
          item.removeClass('oj-treeview-animated');
          self._trigger('expand', event, self._getEventPayload(item));

          // Update option and fire optionChange
          var expanded = self.options['expanded'];
          var newExpanded = expanded.add([self._getKey(item)]);
          self._userOptionChange('expanded', newExpanded, event);

          busyResolve();
        });
      }
    },

    /**
     * Collapses an item.
     * @param {jQuery} item The TreeView item element.
     * @param {boolean} animate Whether the collapse should be animated.
     * @param {Event} event The event that triggers the collapse.
     * @param {boolean} vetoable Whether the collapse can be vetoed by beforeCollapse.
     * @private
     */
    _collapse: function(item, animate, event, vetoable)
    {
      var self = this;

      if (item.hasClass('oj-collapsed') || this._isLeaf(item))
        return;

      if (animate)
      {
        var cancelled = !this._trigger('beforeCollapse', event, this._getEventPayload(item));
        if (cancelled  && vetoable !== false)
          return;
      }

      item.removeClass('oj-expanded').addClass('oj-collapsed').attr('aria-expanded', 'false');

      var subtree = this._getSubtree(item);
      if (animate)
      {
        var busyResolve = this._addBusyState('animating collapse');
        item.addClass('oj-treeview-animated'); // animation flag

        this._startAnimation(subtree, 'collapse').then(function()
        {
          subtree.css('max-height', 0);
          item.removeClass('oj-treeview-animated');
          self._trigger('collapse', event, self._getEventPayload(item));

          // Update option and fire optionChange
          var expanded = self.options['expanded'];
          var newExpanded = expanded.delete([self._getKey(item)]);
          self._userOptionChange('expanded', newExpanded, event);

          busyResolve();
        });
      }
      else
      {
        subtree.css('max-height', 0);
      }

      this._lastSelectedItem = null;
    },

    /**
     * Starts the animation for the specific action.
     * @param {jQuery} elem The element to animate.
     * @param {string} action The name of the action to animate.
     * @return {Promise} A promise that will be resolved when the animation ends.
     * @private
     */
    _startAnimation: function(elem, action)
    {
      if (!this.defaultOptions)
        this.defaultOptions = oj.ThemeUtils.parseJSONFromFontFamily('oj-treeview-option-defaults');
  
      var effects = (this.defaultOptions['animation'] || {})[action];
      return oj.AnimationUtils.startAnimation(elem[0], action, effects, this);
    },

    /**
     * Returns the default event payload for the provided item element.
     * @param {jQuery} item The TreeView item element.
     * @return {Object}
     * @private
     */
    _getEventPayload: function(item)
    {
      return {'key': this._getKey(item), 'item': item[0]};
    },

    /**
     * Returns whether an action (select or focus) can be performed on the item.
     * @param {jQuery} item The TreeView item element.
     * @param {string} actionName The action name: 'select' or 'focus'.
     * @return {boolean}
     * @private
     */
    _isActionable: function(item, actionName)
    {
      var actionable = this.options['item'][actionName + 'able'];
      if (actionable === false)
        return false;
      else if (typeof actionable === 'function')
      {
        var itemContext = this.getContextByNode(item[0]);
        return actionable(itemContext);
      }
      else
        return true;
    },

    /**
     * Returns whether item element is selected.
     * @param {jQuery} item The TreeView item element.
     * @return {boolean}
     * @private
     */
    _isSelected: function(item)
    {
      var key = this._getKey(item);
      var selection = this.options['selection'];
      return selection.indexOf(key) != -1;
    },

    /**
     * Selects or unselects an item, depending on what triggers the selection.
     * @param {jQuery} item The TreeView item element.
     * @param {Event} event The event that triggers the select.
     * @private
     */
    _select: function(item, event)
    {
      var selectionMode = this.options['selectionMode'];
      if (selectionMode == 'none')
        return;

      // Check whether the item is selectable
      if (!this._isActionable(item, 'select'))
        return;

      var isSelected = this._isSelected(item);

      if (event)
      {
        var isTouch = oj.DomUtils.isTouchSupported();
        var isMetaKey = oj.DomUtils.isMetaKeyPressed(event);
        var isMultiple = selectionMode == 'multiple';
        var isNavigation = event.keyCode == 40 || event.keyCode == 38;
        var key = this._getKey(item);
        var selection = [];

        if (isMultiple && event.shiftKey && !isNavigation)
        {
          // Maintain selection of other items if meta key is pressed
          if (isMetaKey)
            selection = this.options['selection'].slice(0);
          else
            this._clearSelection();

          // Select a range from the last selected item to the current item
          var nextItem = this._lastSelectedItem;
          var getNextItem = (nextItem && nextItem.offset().top < item.offset().top) ?
            this._getNextActionableItem.bind(this) : this._getPreviousActionableItem.bind(this);

          while (nextItem && (nextItem[0] != item[0]))
          {
            var nextKey = this._getKey(nextItem);
            if (selection.indexOf(nextKey) == -1)
            {
              selection.push(nextKey);
              this._setSelected(nextItem);
            }
            nextItem = getNextItem(nextItem, 'select');
          }

          // Select the current item
          isSelected = true;
          selection.push(key);
        }
        else if (isMultiple && (isMetaKey || isTouch || isNavigation))
        {
          // Toggle selection of current item while maintaining the selection of the other items
          isSelected = !isSelected;
          selection = this.options['selection'].slice(0);
          if (isSelected)
            selection.push(key);
          else
            selection.splice(selection.indexOf(key), 1);
        }
        else
        {
          // Clear selection of all other items
          this._clearSelection();

          // On touch or spacebar, toggle the selection of the current item
          // Otherwise, select the current item even if it is already selected
          if ((isTouch || event.keyCode == 32) && isSelected)
          {
            isSelected = false;
            selection = [];
          }
          else
          {
            isSelected = true;
            selection = [key];
          }
        }

        // Update option and fire optionChange
        this._userOptionChange('selection', selection, event);
        this._lastSelectedItem = item;
      }

      if (isSelected)
        this._setSelected(item);
      else
        this._setUnselected(item);
    },

    /**
     * Style the provided item as selected.
     * @param {jQuery} item The TreeView item element.
     * @private
     */
    _setSelected: function(item)
    {
      this._getItemContent(item).addClass('oj-selected');
      item.attr('aria-selected', 'true');
    },

    /**
     * Style the provided item as unselected.
     * @param {jQuery} item The TreeView item element.
     * @private
     */
    _setUnselected: function(item)
    {
      this._getItemContent(item).removeClass('oj-selected');
      item.attr('aria-selected', 'false');
    },

    /**
     * Clears the selection of all items.
     * @private
     */
    _clearSelection: function()
    {
      this._setUnselected(this._getItems());
    },

    /**
     * Sets the focus (current item) on the provided item element.
     * @param {jQuery} item The TreeView item element.
     * @param {Event} event The event that triggers the focus.
     * @private
     */
    _focus: function(item, event)
    {
      // Check whether the item is focusable
      if (!this._isActionable(item, 'focus'))
        return;

      if (event)
      {
        var payload = this._getEventPayload(item);
        if (this._currentItem)
        {
          payload['previousKey'] = this._getKey(this._currentItem);
          payload['previousItem'] = this._currentItem[0];
        }

        var cancelled = !this._trigger('beforeCurrentItem', event, payload);
        if (cancelled)
          return;

        // Update option and fire optionChange
        this._userOptionChange('currentItem', this._getKey(item), event);
      }

      this._focusOutHandler(this._getItemContent(this._currentItem));
      this._focusInHandler(this._getItemContent(item));
      this._setCurrentItem(item);
    },

    /**
     * Resets the focus (current item) of the TreeView.
     * @private
     */
    _resetFocus: function()
    {
      if (this.options['currentItem'])
      {
        var currentItem = this._getItemByKey(this.options['currentItem']);
        if (currentItem.length > 0)
        {
          this._setCurrentItem(currentItem);
          return;
        }
      }

      // CurrentItem not specified, so default to the first item.
      // Update the option so the currentItem attribute is in sync.
      var firstItem = this._getItems().first();
      this._setCurrentItem(firstItem);
      this._userOptionChange('currentItem', this._getKey(this._currentItem), null);
    },

    /**
     * Set the provided item as the current item.
     * @param {jQuery} item The TreeView item element.
     * @private
     */
    _setCurrentItem: function(item)
    {
      this._currentItem = item;

      // Set the item content to be the activedescendant so that the screen reader
      // does not read the child items.
      this._getRoot().attr('aria-activedescendant', this._getKey(item));
    },

    /**
     * Adds a busy state.
     * @param {string} description The description of the busy state.
     * @return {Function} The resolve function of the busy state.
     * @private
     */
    _addBusyState: function(description)
    {
      var busyContext = oj.Context.getContext(this.element[0]).getBusyContext();
      var id = this.element.attr('id');
      return busyContext.addBusyState({
        'description': "The component identified by '" + id + "', " + description
      });
    },

    /**
     * Writes back a user-triggered change into the option.
     * @param {string} key The option name.
     * @param {Object} value The new value of the option.
     * @param {Event} event The event that triggers the change.
     * @private
     */
    _userOptionChange: function(key, value, event)
    {
      this.option(key, value, {'_context': {originalEvent: event, writeback:true, internalSet: true}});
    },

    /**
     * Returns the dnd.drag.items option.
     * @return {Object} The option object. Defaults to {}.
     * @private
     */
    _getDragOptions: function()
    {
      return ((this.options['dnd'] || {})['drag'] || {})['items'] || {};
    },

    /**
     * Returns the dnd.drop.items option.
     * @return {Object} The option object. Defaults to {}.
     * @private
     */
    _getDropOptions: function()
    {
      return ((this.options['dnd'] || {})['drop'] || {})['items'] || {};
    },

    /**
     * Returns the closest item content to the event target.
     * @param {Event} event The event.
     * @return {jQuery} The item content element.
     * @private
     */
    _getClosestItemContent: function(event)
    {
      return $(event.target).closest('.oj-treeview-item-content');
    },

    /**
     * Returns the closest disclosure icon to the event target.
     * @param {Event} event The event.
     * @return {jQuery} The disclosure icon element.
     * @private
     */
    _getClosestDisclosureIcon: function(event)
    {
      return $(event.target).closest('.oj-treeview-disclosure-icon');
    },

    /**
     * Handles click event.
     * @param {Event} event The event.
     * @private
     */
    _handleClick: function(event)
    {
      // Clicking on disclosure icon
      var disclosureIcon = this._getClosestDisclosureIcon(event);
      if (disclosureIcon.length > 0)
      {
        var item = disclosureIcon.closest('.oj-treeview-item');
        if (this._isExpanded(item))
          this._collapse(item, true, event);
        else
          this._expand(item, true, event);
        return;
      }

      // Clicking on item content
      var itemContent = this._getClosestItemContent(event);
      if (itemContent.length > 0)
      {
        var item = itemContent.parent();
        this._select(item, event);
        this._focus(item, event);
        return;
      }

      // Clear selection otherwise
      this._clearSelection();
      this._lastSelectedItem = null;
      this._userOptionChange('selection', [], event);
    },

    /**
     * Handles mouse over event.
     * @param {Event} event The event.
     * @private
     */
    _handleMouseOver: function(event)
    {
      // Don't add hover effect for touch
      if (oj.DomUtils.isTouchSupported())
        return;

      var target = this._getClosestDisclosureIcon(event);

      if (target.length == 0)
        target = this._getClosestItemContent(event);

      // Add hover effect
      target.removeClass('oj-default');
      target.addClass('oj-hover');
    },

    /**
     * Handles mouse out event.
     * @param {Event} event The event.
     * @private
     */
    _handleMouseOut: function(event)
    {
      // Don't add hover effect for touch
      if (oj.DomUtils.isTouchSupported())
        return;

      var target = this._getClosestDisclosureIcon(event);
      target.removeClass('oj-selected');

      if (target.length == 0)
        target = this._getClosestItemContent(event);

      // Remove hover effect
      target.addClass('oj-default');
      target.removeClass('oj-hover');
    },
    
    /**
     * Handles mouse down event.
     * @param {Event} event The event.
     * @private
     */
    _handleMouseDown: function(event)
    {
      var disclosureIcon = this._getClosestDisclosureIcon(event);
      disclosureIcon.addClass('oj-selected');
    },

    /**
     * Handles mouse up event.
     * @param {Event} event The event.
     * @private
     */
    _handleMouseUp: function(event)
    {
      var disclosureIcon = this._getClosestDisclosureIcon(event);
      disclosureIcon.removeClass('oj-selected');
    },

    /**
     * Handles key down event.
     * @param {Event} event The event.
     * @private
     */
    _handleKeyDown: function(event)
    {
      var keyCode = event.keyCode;
      var currentItem = this._currentItem;
      var nextItem;

      if (keyCode == 38 || keyCode == 40) // UP or DOWN
      {
        nextItem = (keyCode == 40) ? this._getNextActionableItem(currentItem, 'focus') :
                                     this._getPreviousActionableItem(currentItem, 'focus');
        if (nextItem)
        {
          event.preventDefault(); // prevent scrolling the page
          if (this._isSelected(currentItem) && event.shiftKey)
          {
            // Shift+Up/Down either extends the selection to the next item or cancels previous Shift+Down/Up
            this._select(this._isSelected(nextItem) ? currentItem : nextItem, event);
          }
          this._focus(nextItem, event);
        }
      }
      else if (keyCode == 37 || keyCode == 39) // LEFT or RIGHT
      {
        var isRTL = this._GetReadingDirection() == "rtl";
        var isEnd = (!isRTL && keyCode == 39) || (isRTL && keyCode == 37);

        if (isEnd && !this._isLeaf(currentItem) && !this._isExpanded(currentItem))
        {
          event.preventDefault(); // prevent scrolling the page
          this._expand(currentItem, true, event);
        }
        else if (!isEnd && !this._isLeaf(currentItem) && this._isExpanded(currentItem))
        {
          event.preventDefault(); // prevent scrolling the page
          this._collapse(currentItem, true, event);
        }
        else
        {
          nextItem = isEnd ? this._getNextActionableItem(currentItem, 'focus') :
                             this._getPreviousActionableItem(currentItem, 'focus');
          if (nextItem)
          {
            event.preventDefault(); // prevent scrolling the page
            this._focus(nextItem, event);
          }
        }
      }
      else if (keyCode == 13 || keyCode == 32) // ENTER or SPACE
      {
        event.preventDefault(); // prevent scrolling the page
        this._select(currentItem, event);
      }
    },

    /**
     * Returns the item below the provided item.
     * @param {jQuery} item The TreeView item element.
     * @return {jQuery} The next item element.
     * @private
     */
    _getNextItem: function(item)
    {
      // If the item is expanded, go to the first child
      if (!this._isLeaf(item) && this._isExpanded(item))
      {
        var firstChild = this._getChildItems(item).first();
        if (firstChild.length > 0)
          return firstChild;
      }

      // Otherwise, go to the next sibling of the item or its ancestors
      var parent = item;
      while (parent.length > 0)
      {
        var nextSibling = parent.next('.oj-treeview-item');
        if (nextSibling.length > 0)
          return nextSibling;

        parent = this._getParentItem(parent);
      }

      // Otherwise, don't go anywhere
      return null;
    },

    /**
     * Returns the closest item below the provided item that can accept the specified action.
     * @param {jQuery} item The TreeView item element.
     * @param {string} actionName The action name: 'select' or 'focus'.
     * @return {jQuery} The next item element.
     * @private
     */
    _getNextActionableItem: function(item, actionName)
    {
      while (item != null)
      {
        item = this._getNextItem(item);
        if (this._isActionable(item, actionName))
          return item;
      }
      return null;
    },

    /**
     * Returns the item above the provided item.
     * @param {jQuery} item The TreeView item element.
     * @return {jQuery} The previous item element.
     * @private
     */
    _getPreviousItem: function(item)
    {
      // Go to the last expanded child of the previous sibling
      var prevSibling = item.prev('.oj-treeview-item');
      while (prevSibling.length > 0)
      {
        if (!this._isLeaf(prevSibling) && this._isExpanded(prevSibling))
        {
          var lastChild = this._getChildItems(prevSibling).last();
          if (lastChild.length > 0)
            prevSibling = lastChild;
          else
            return prevSibling;
        }
        else
          return prevSibling;
      }

      // Otherwise, go to the parent
      var parent = this._getParentItem(item);
      if (parent.length > 0)
        return parent;

      // Otherwise, don't go anywhere
      return null;
    },

    /**
     * Returns the closest item above the provided item that can accept the specified action.
     * @param {jQuery} item The TreeView item element.
     * @param {string} actionName The action name: 'select' or 'focus'.
     * @return {jQuery} The previous item element.
     * @private
     */
    _getPreviousActionableItem: function(item, actionName)
    {
      while (item != null)
      {
        item = this._getPreviousItem(item);
        if (this._isActionable(item, actionName))
          return item;
      }
      return null;
    },

    /**
     * Handles DnD dragStart event.
     * @param {Event} event The event.
     * @private
     */
    _handleDragStart: function(event)
    {
      var self = this;
      var isRTL = this._GetReadingDirection() == "rtl";

      var targetItem = this._getClosestItemContent(event).parent();
      if (targetItem.length == 0)
        return;

      var items = $();
      if (!this._isSelected(targetItem))
      {
        this._select(targetItem, event);
        items = items.add(targetItem);
      }
      else
      {
        var selection = this.options['selection'];
        for (var i = 0; i < selection.length; i++)
        {
          items = items.add(this._getItemByKey(selection[i]));
        }
      }

      // TODO: static HTML needs to pass parent innerHTML for data
      var dragOptions = this._getDragOptions();
      var dataTransfer = event.originalEvent.dataTransfer;

      var dragData = [];
      var dragImage = $(document.createElement('ul')).addClass('oj-treeview-drag-image oj-treeview-list');
      var topmost = Infinity;
      var leftmost = Infinity;

      items.each(function(index)
      {
        var item = $(this);
        dragData.push(item.data('data'));

        // Clone the item for the drag image and match the offset of the original item.
        // For RTL, we have to use the left offset of the item content because the 
        // left offset of the li is always zero due to the li filling up the entire line.
        var offset = item.offset();
        if (isRTL)
          offset.left = self._getItemContent(item).offset().left;

        var clonedItem = item.clone().css({
          'top': offset.top,
          'left': offset.left
        });

        // Don't include children in the drag image
        self._getSubtree(clonedItem).remove();

        // Drag image offset is based on the top left corner of the resulting drag image
        if (offset.top < topmost)
          topmost = offset.top;
        if (offset.left < leftmost)
          leftmost = offset.left;

        dragImage.append(clonedItem); // @HTMLUpdateOK
      });

      // : There's inconsistency in how the drag image offset is computed
      // for the native DnD impl and the polyfill. In the native impl, the offset is
      // relative to the top-left corner of the rendered drag image element. In the
      // polyfill, the offset is relative to the {top: 0, left: 0} position. To
      // reconcile this, we must make sure that the top-left corner of the rendered
      // drag image element is at the {top: 0, left: 0} position.
      dragImage.children().each(function()
      {
        $(this).css({
          'top': parseFloat($(this).css('top')) - topmost,
          'left': parseFloat($(this).css('left')) - leftmost
        });
      });

      var dragDataTypes = dragOptions['dataTypes'] || [];
      for (var i = 0; i < dragDataTypes.length; i++)
      {
        dataTransfer.setData(dragDataTypes[i], JSON.stringify(dragData));
      }

      // Drag image has to be attached to the DOM when being assigned to the dataTransfer.
      // It has to be removed afterwards to prevent leaks.
      $('body').append(dragImage); // @HTMLUpdateOK
      dataTransfer.setDragImage(dragImage[0], event.pageX - leftmost, event.pageY - topmost);
      setTimeout(function()
      {
        dragImage.remove();
      }, 0);

      var callback = dragOptions['dragStart'];
      if (callback)
        callback(event.originalEvent, {'items': dragData});
    },

    /**
     * Handles DnD drag and dragEnd events.
     * @param {Event} event The event.
     * @param {string} eventType The event type (drag or dragEnd).
     * @private
     */
    _handleDragSourceEvent: function(event, eventType)
    {
      var callback = this._getDragOptions()[eventType];
      if (callback)
        callback(event.originalEvent);
    },

    /**
     * Handles DnD dragEnter, dragOver, dragLeave, and drop events.
     * @param {Event} event The event.
     * @param {string} eventType The event type (dragEnter, dragOver, dragLeave, or drop).
     * @private
     */
    _handleDropTargetEvent: function(event, eventType)
    {
      var dropOptions = this._getDropOptions();
      var dropDataTypes = dropOptions['dataTypes'] || [];
      var callback = dropOptions[eventType];
      var targetItem = $(event.target).closest('.oj-treeview-item');

      // Position drop effects based on the spacer (disclosure icon) because it takes up the entire item height
      var spacerRect = targetItem.children('.oj-treeview-spacer')[0].getBoundingClientRect();
      var middleY = (spacerRect.top + spacerRect.bottom) / 2;

      var position = 'inside';
      var relativeY = event.pageY - spacerRect.top;
      if (relativeY < 0.25 * spacerRect.height)
        position = 'before';
      else if (relativeY > 0.75 * spacerRect.height)
        position = this._isExpanded(targetItem) ? 'first' : 'after';

      if (callback)
        callback(event.originalEvent, {'item': targetItem[0], 'position': position});

      for (var i = 0; i < dropDataTypes.length; i++)
      {
        var dataTypes = event.originalEvent.dataTransfer.types;
        if (dataTypes && dataTypes.indexOf(dropDataTypes[i]) >= 0)
        {
          event.preventDefault();
          break;
        }
      }

      if ((eventType == 'dragEnter' || eventType == 'dragOver') && event.originalEvent.defaultPrevented)
      {
        var isRTL = this._GetReadingDirection() == "rtl";

        // Draw the drop target effect on dragEnter and dragOver
        var dropLineTop = middleY;
        var dropLineLeft = isRTL ? (spacerRect.left - this._dropLineRect.width) : spacerRect.right;

        // Align the drop marker with the disclosure icon (spacer)
        var dropMarkerTop = middleY - this._dropMarkerRect.height / 2;
        var dropMarkerLeft = spacerRect.left + spacerRect.width / 2 - this._dropMarkerRect.width / 2;

        if (position == 'before')
        {
          dropMarkerTop -= spacerRect.height / 2;
          dropLineTop -= spacerRect.height / 2;
        }
        else if (position == 'after' || position == 'first')
        {
          dropMarkerTop += spacerRect.height / 2;
          dropLineTop += spacerRect.height / 2;

          if (position == 'first')
          {
            // Align with the child items
            var spacerOffset = (isRTL ? -1 : 1) * spacerRect.width;
            dropMarkerLeft += spacerOffset;
            dropLineLeft += spacerOffset;
          }
        }

        this._dropMarker.css('top', dropMarkerTop + 'px').css('left', dropMarkerLeft + 'px').show();

        if (position != 'inside')
          this._dropLine.css('top', dropLineTop + 'px').css('left', dropLineLeft + 'px').show();
        else
          this._dropLine.hide();
      }
      else
      {
        // Remove the drop target effect on dragLeave and drop
        this._dropMarker.hide();
        this._dropLine.hide();
      }
    },

    
    // @override    
    _NotifyContextMenuGesture: function(menu, event, eventType)
    {
      if (eventType === 'keyboard')
      {
        // If launched by Shift+F10, the context menu should be rendered next
        // to the currentItem.
        var launcher = this._currentItem ? this._getItemContent(this._currentItem) : this.element;
        var openOptions = {
          'launcher': launcher,
          'initialFocus': 'menu',
          'position': {'my': 'start top', 'at': 'start bottom', 'of': launcher}
        };
        this._OpenContextMenu(event, eventType, openOptions);
      }
      else
        this._superApply(arguments);
    },

    // @inheritdoc
    refresh: function()
    {
      this._super();

      this._render();
    },

    // @inheritdoc
    getNodeBySubId: function(locator)
    {
      if (locator == null)
        return this.element ? this.element[0] : null;

      var key = locator['key'];
      var subId = locator['subId'];
      var item = this._getItemByKey(key);
      var ret;

      if (subId === 'oj-treeview-disclosure')
        ret = item.children('.oj-treeview-disclosure-icon')[0];
      else if (subId === 'oj-treeview-item')
        ret = item[0];

      // Non-null locators have to be handled by the component subclasses
      return ret || null;
    },

    // @inheritdoc
    getSubIdByNode: function(node)
    {
      if (!$.contains(this.element[0], node))
        return null;

      var subId;
      var item = $(node);

      if (item.hasClass('oj-treeview-disclosure-icon'))
      {
        item = item.parent();
        subId = 'oj-treeview-disclosure';
      }
      else if (item.hasClass('oj-treeview-item'))
        subId = 'oj-treeview-item';
      else
        return null;

      return {'subId': subId, 'key': this._getKey(item)};
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
     * @memberof oj.ojTreeView
     */
    getContextByNode: function(node)
    {
      if (!$.contains(this.element[0], node))
        return null;

      var item = $(node);
      if (!item.hasClass('oj-treeview-item'))
        return null;

      var context = {};
      context['subId'] = 'oj-treeview-item';
      context['index'] = item.parent().children('.oj-treeview-item').index(item);
      context['parentKey'] = this._getKey(this._getParentItem(item));

      context['component'] = oj.Components.__GetWidgetConstructor(this.element);
      if (this._FixRendererContext)
        context = this._FixRendererContext(context);

      var metadata = item.data('metadata');
      if (metadata)
      {
        context['data'] = item.data('data');
        context['datasource'] = this.options['data'];

        // Merge properties from metadata into item context
        // Contains key, leaf, and depth
        for (var prop in metadata) 
        {
          if (metadata.hasOwnProperty(prop))
            context[prop] = metadata[prop];
        }
      }
      else
      {
        // Static content
        context['key'] = this._getKey(item);
        context['leaf'] = this._isLeaf(item);
        context['depth'] = item.parents('.oj-treeview-list').length;
      }

      return context;
    },

    // @inheritdoc
    _setOption: function(key, value, flags)
    {
      var self = this;

      // Call the super to update the property values
      this._superApply(arguments);

      if (key == 'expanded')
      {
        this._getItems().each(function()
        {
          var item = $(this);
          if (self._isInitExpanded(item))
            self._expand(item, true);
          else 
            self._collapse(item, true);
        });
      }
      else if (key == 'selection')
      {
        this._getItems().each(function()
        {
          var item = $(this);
          self._select(item);
        });
      }
      else if (key == 'currentItem')
      {
        this._resetFocus();
      }
      else
      {
        this.refresh();
        return;
      }
    },

    // @inheritdoc
    _destroy: function()
    {
      // TODO
      // Call super at the end for destroy.
      this._super();
    }
  });
}());

// Fragments
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
 *       <td rowspan="2">Item</td>
 *       <td><kbd>Tap</kbd></td>
 *       <td>Focus on the item. If <code class="prettyprint">selectionMode</code> is enabled, selects the item as well.</td>
 *     </tr>
 *     <tr>
 *       <td><kbd>Press & Hold</kbd></td>
 *       <td>Display context menu</td>
 *     </tr>
 *     <tr>
 *       <td>Disclosure Icon</td>
 *       <td><kbd>Tap</kbd></td>
 *       <td>Expand or collapse the item.</td>
 *     </tr>
 *   </tbody>
 * </table>
 *
 * @ojfragment touchDoc - Used in touch gesture section of classdesc, and standalone gesture doc
 * @memberof oj.ojTreeView
 */

/**
 * <table class="keyboard-table">
 *   <thead>
 *     <tr>
 *       <th>Target</th>
 *       <th>Key</th>
 *       <th>Action</th>
 *     </tr>
 *   </thead>
 *   <tbody>
 *     <tr>
 *       <td><kbd>Tab</kbd></td>
 *       <td>Navigates to next focusable element on page.</td>
 *     </tr>
 *     <tr>
 *       <td><kbd>Shift+Tab</kbd></td>
 *       <td>Navigates to previous focusable element on page.</td>
 *     </tr>
 *     <tr>
 *       <td><kbd>DownArrow</kbd></td>
 *       <td>Moves focus to the item below.</td>
 *     </tr>
 *     <tr>
 *       <td><kbd>UpArrow</kbd></td>
 *       <td>Moves focus to the item above.</td>
 *     </tr>
 *     <tr>
 *       <td><kbd>LeftArrow</kbd></td>
 *       <td>On an expanded item, collapses the item. Otherwise, move focus to the item above. The action is swapped with <kbd>RightArrow</kbd> in RTL locales.</td>
 *     </tr>
 *     <tr>
 *       <td><kbd>RightArrow</kbd></td>
 *       <td>On a collapsed item, expands the item. Otherwise, move focus to the item above. The action is swapped with <kbd>LeftArrow</kbd> in RTL locales.</td>
 *     </tr>
 *     <tr>
 *       <td><kbd>Shift+DownArrow</kbd></td>
 *       <td>Extends the selection to the item below. Only applicable if the multiple selection is enabled.</td>
 *     </tr>
 *     <tr>
 *       <td><kbd>Shift+UpArrow</kbd></td>
 *       <td>Extends the selection to the item above. Only applicable if the multiple selection is enabled.</td>
 *     </tr>
 *     <tr>
 *       <td><kbd>Space</kbd></td>
 *       <td>Toggles the selection of the current item and deselects the other items.</td>
 *     </tr>
 *     <tr>
 *       <td><kbd>Enter</kbd></td>
 *       <td>Selects the current item and deselects the other items. No op if the current item is already selected.</td>
 *     </tr>
 *     <tr>
 *       <td><kbd>Ctrl+Space/Enter</kbd></td>
 *       <td>Toggles the selection of the current item while maintaining previously selected items. Only applicable if the multiple selection is enabled.</td>
 *     </tr>
 *     <tr>
 *       <td><kbd>Shift+Space/Enter</kbd></td>
 *       <td>Selects contiguous items from the last selected item to the current item. Only applicable if the multiple selection is enabled.</td>
 *     </tr>
 *   </tbody>
 * </table>
 *
 * @ojfragment keyboardDoc - Used in keyboard section of classdesc, and standalone gesture doc
 * @memberof oj.ojTreeView
 */

//////////////////     SUB-IDS     //////////////////

/**
 * <p>Sub-ID for TreeView items. See the <a href="#getNodeBySubId">getNodeBySubId</a>
 * method for details.</p>
 *
 * @ojsubid oj-treeview-item
 * @memberof oj.ojTreeView
 *
 * @example <caption>Get the item with key 'foo':</caption>
 * var item = myTreeView.getNodeBySubId({'subId': 'oj-treeview-item', 'key': 'foo'});
 */

/**
 * <p>Sub-ID for TreeView disclosure icons. See the <a href="#getNodeBySubId">getNodeBySubId</a>
 * method for details.</p>
 *
 * @ojsubid oj-treeview-disclosure
 * @memberof oj.ojTreeView
 *
 * @example <caption>Get the disclosure icon for the non-leaf item with key 'foo':</caption>
 * var item = myTreeView.getNodeBySubId({'subId': 'oj-treeview-disclosure', 'key': 'foo'});
 */

/**
 * <p>Context for TreeView items.</p>
 *
 * @property {Element} componentElement The TreeView element.
 * @property {Object} data The data object for the item (not available for static content).
 * @property {oj.TreeDataSource} datasource A reference to the data source object (not available for static content).
 * @property {number} depth The depth of the item. The depth of the first level children under the invisible root is 1.
 * @property {number} index The index of the item relative to its parent, where 0 is the index of the first item.
 * @property {Object} key the key of the item.
 * @property {boolean} leaf Whether the item is a leaf item.
 * @property {Object} parentKey The key of the parent item. The parent key is null for root item.
 *
 * @ojnodecontext oj-treeview-item
 * @memberof oj.ojTreeView
 */

(function() {
  var ojTreeViewMeta = {
    'properties': {
      'currentItem': {
        'type': 'any',
        'readOnly': true,
        'writeback': true
      },
      'data': {},
      'dnd': {
        'type': 'object',
        'properties': {
          'drag': {
            'type': 'object',
            'properties':{
              'items':{
                'type':'object',
                'properties': {
                  'dataTypes': {
                    'type': 'Array<string>'
                  },
                  'drag': {},
                  'dragEnd': {},
                  'dragStart': {}
                }
              }
            }
          },
          'drop': {
            'type': 'object',
            'properties':{
              'items' :{
                'type':'object',
                'properties': {
                  'dataTypes': {
                    'type': 'Array<string>'
                  },
                  'dragEnter': {},
                  'dragLeave': {},
                  'dragOver': {},
                  'drop': {}
                }
              }
            }
          }
        }
      },
      'expanded': {
        'writeback': true
      },
      'item': {
        'type': 'object',
        'properties': {
          'focusable': {},
          'renderer': {},
          'selectable': {}
        }
      },
      'selection': {
        'type': 'Array<object>',
        'writeback': true
      },
      'selectionMode': {
        'type': 'string',
        'enumValues': ['none', 'single', 'multiple']
      }
    },
    'events': {
      'animateEnd': {},
      'animateStart': {},
      'beforeCollapse': {},
      'beforeCurrentItem': {},
      'beforeExpand': {},
      'collapse': {},
      'expand': {}
    },
    'methods': {
      'getContextByNode': {}
    },
    'extension': {
      _WIDGET_NAME: 'ojTreeView'
    }
  };
  oj.CustomElementBridge.registerMetadata('oj-tree-view', 'baseComponent', ojTreeViewMeta);
  oj.CustomElementBridge.register('oj-tree-view', {'metadata': oj.CustomElementBridge.getMetadata('oj-tree-view')});
})();

});

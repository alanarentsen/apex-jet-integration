/**
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";
define(['ojs/ojcore', 'jquery', 'ojs/ojcomponentcore'], 
       function(oj, $)
{

/**
 * Copyright (c) 2017, Oracle and/or its affiliates.
 * All rights reserved.
 */

/**
 * @ojcomponent oj.ojOptgroup
 * @since 4.0.0
 * @ojstatus preview
 *
 * @classdesc
 * <h3 id="optgroupOverview-section">
 *   JET Optgroup
 *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#optgroupOverview-section"></a>
 * </h3>
 * <p>The oj-optgroup element is used to group [oj-option]{@link oj.ojOption} elements.</p>
 * <p>For example:
 * <pre class="prettyprint">
 * <code>
 * &lt;oj-select-one>
 *   &lt;oj-optgroup label="group1 label">
 *     &lt;oj-option value="option 1">option 1&lt;/oj-option>
 *     &lt;oj-option value="option 2">option 2&lt;/oj-option>
 *   &lt;/oj-optgroup>
 *   &lt;oj-optgroup label="group2 label">
 *     &lt;oj-option value="option 3">option 3&lt;/oj-option>
 *     &lt;oj-option value="option 4">option 4&lt;/oj-option>
 *   &lt;/oj-optgroup>
 * &lt;/oj-select-one> 
 * </code></pre>
 */
 
/**
 * <p>Disables the oj-optgroup if set to <code class="prettyprint">true</code>.
 *
 * @name disabled
 * @expose
 * @memberof oj.ojOptgroup
 * @instance
 * @type {boolean}
 * @default <code class="prettyprint">false</code>
 *
 * @example <caption>Initialize the oj-optgroup with the <code class="prettyprint">disabled</code> attribute specified:</caption>
 * &lt;oj-optgroup disabled="[[isDisabled]]">&lt;/oj-optgroup>
 *
 * @example <caption>Get or set the <code class="prettyprint">disabled</code> property after initialization:</caption>
 * // getter
 * var disabledValue = myOptgroup.disabled;
 *
 * // setter
 * myOptgroup.disabled = true;
 */
 
/**
 * <p>Specifies the oj-optgroup's label.
 *
 * @name label
 * @expose
 * @memberof oj.ojOptgroup
 * @instance
 * @type {string}
 *
 * @example <caption>Initialize the oj-optgroup with the <code class="prettyprint">label</code> attribute specified:</caption>
 * &lt;oj-optgroup label="group1 label">&lt;/oj-optgroup>
 *
 * @example <caption>Get or set the <code class="prettyprint">label</code> property after initialization:</caption>
 * // getter
 * var labelValue = myOptgroup.label;
 *
 * // setter
 * myOptgroup.label = 'Group 1';
 */
 
/**
 * <p>The oj-optgroup element accepts <code class="prettyprint">oj-option</code>s as children. See the [oj-option]{@link oj.ojOption} doc for details about
 * accepted children and slots.</p>
 *
 * @ojchild Default
 * @memberof oj.ojOptgroup
 *
 * @example <caption>Initialize the oj-optgroup with child content specified:</caption>
 * &lt;oj-optgroup>
 *   &lt;oj-option value="option1">Option label&lt;/oj-option>
 * &lt;/oj-optgroup>
 */    
 
/**
 * Sets a property or a single subproperty for complex properties and notifies the component
 * of the change, triggering a [property]Changed event.
 * 
 * @function setProperty
 * @param {string} property - The property name to set. Supports dot notation for subproperty access.
 * @param {*} value - The new value to set the property to.
 * 
 * @expose
 * @memberof oj.ojOptgroup
 * @instance
 * 
 * @example <caption>Set a single subproperty of a complex property:</caption>
 * myComponent.setProperty('complexProperty.subProperty1.subProperty2', "someValue");
 */ 
/**
 * Retrieves a value for a property or a single subproperty for complex properties.
 * @function getProperty
 * @param {string} property - The property name to get. Supports dot notation for subproperty access.
 * @return {*}
 * 
 * @expose
 * @memberof oj.ojOptgroup
 * @instance
 * 
 * @example <caption>Get a single subproperty of a complex property:</caption>
 * var subpropValue = myComponent.getProperty('complexProperty.subProperty1.subProperty2');
 */ 
/**
 * Refreshes the visual state of the component.
 * 
 * @function refresh
 * 
 * @expose
 * @memberof oj.ojOptgroup
 * @instance
 */ 
/**
 * Performs a batch set of properties.
 * @function setProperties
 * @param {Object} properties - An object containing the property and value pairs to set.
 * 
 * @expose
 * @memberof oj.ojOptgroup
 * @instance
 * 
 * @example <caption>Set a batch of properties:</caption>
 * myComponent.setProperties({"prop1": "value1", "prop2.subprop": "value2", "prop3": "value3"});
 */ 
/**
 * Copyright (c) 2017, Oracle and/or its affiliates.
 * All rights reserved.
 */
/**
 * Option Group Renderer.
 * @ignore
 */
var OptionGroupRenderer = {};

/**
 * Default option group renderer.
 * @ignore
 */
OptionGroupRenderer.render = function(elem)
{
  var customRenderer = elem["customOptgroupRenderer"];
    
    if (customRenderer && typeof customRenderer === "function")
      customRenderer(elem);    
};
 
/**
 * @protected
 * @ignore
 */
(function() {
  var ojOptgroupMeta = {
    "properties": {
      "disabled": {
        "type": "boolean",
        "value": false
      }, 
      "label": {
        "type": "string",
        "value": ""
      },
      // not documented
      "customOptgroupRenderer": {}
    },
    "extension": {
      _RENDER_FUNC: OptionGroupRenderer.render
    }
  };
  oj.CustomElementBridge.registerMetadata('oj-optgroup', null, ojOptgroupMeta);
  oj.CustomElementBridge.register('oj-optgroup', {'metadata': oj.CustomElementBridge.getMetadata('oj-optgroup')});
})();

});

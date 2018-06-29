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
 * Option Renderer.
 * @ignore
 */
var OptionRenderer = {};

/**
 * Append each node to the element.
 * @ignore
 */
OptionRenderer._appendNodes = function(elem, nodes) {
  $.each(nodes, function(i, node) {
    elem.appendChild(node);
  })
};

/**
 * Remove node from the element.
 * @ignore
 */
OptionRenderer._removeNodes = function(elem, nodes) {
  $.each(nodes, function(i, node) {
    elem.removeChild(node);
  })
};

/**
 * Rearrange slots in the right order and remove unwanted slots.
 * @ignore
 */
OptionRenderer._arrangeSlots = function(elem) {
  // get the slotMap
  var slots = oj.CustomElementBridge.getSlotMap(elem);
  var supportedSlots = ["startIcon", "", "endIcon"];
  
  // remove unwanted slots
  $.each(slots, function(slotName, nodes) {
    if (supportedSlots.indexOf(slotName) == -1) {
      OptionRenderer._removeNodes(elem, nodes);
    }
  })
  
  // rearrange slots
  $.each(supportedSlots, function(i, slotName) {
    if (slots[slotName])
      OptionRenderer._appendNodes(elem, slots[slotName]);
  })
};

/**
 * Default option renderer.
 * @ignore
 */
OptionRenderer.render = function(elem)
{
  var customRenderer = elem["customOptionRenderer"];
    
  // reorder the slots and remove unwanted slots
  OptionRenderer._arrangeSlots(elem);
  
  if (customRenderer && typeof customRenderer === "function")
    customRenderer(elem);   
};
 
/**
 * Copyright (c) 2017, Oracle and/or its affiliates.
 * All rights reserved.
 */

/**
 * @ojcomponent oj.ojOption
 * @since 4.0.0
 * @ojstatus preview
 *
 * @classdesc
 * <h3 id="optionOverview-section">
 *   JET Option
 *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#optionOverview-section"></a>
 * </h3>
 * <p>The oj-option element is used to declare values for JET elements that display list of values.
 * It's supported by the following elements:
 * <ul>
 * <li>oj-buttonset-one</li>
 * <li>oj-buttonset-many</li>
 * <li>oj-checkboxset</li>
 * <li>oj-combobox-one</li>
 * <li>oj-combobox-many</li>
 * <li>oj-menu</li>
 * <li>oj-radioset</li>
 * <li>oj-select-one</li>
 * <li>oj-select-many</li>
 * </ul>
 * </p>
 * <p>For example:
 * <pre class="prettyprint">
 * <code>
 * &lt;oj-select-one>
 *   &lt;oj-option value="option 1">option 1&lt;/oj-option>
 *   &lt;oj-option value="option 2">option 2&lt;/oj-option>
 *   &lt;oj-option value="option 3">option 3&lt;/oj-option>
 *   &lt;oj-option value="option 4">option 4&lt;/oj-option>
 * &lt;/oj-select-one> 
 * </code></pre>
 */
 
/**
 * <p>Disables the oj-option if set to <code class="prettyprint">true</code>.
 *
 * @name disabled
 * @expose
 * @memberof oj.ojOption
 * @instance
 * @type {boolean}
 * @default <code class="prettyprint">false</code>
 *
 * @example <caption>Initialize the oj-option with the <code class="prettyprint">disabled</code> attribute specified:</caption>
 * &lt;oj-option disabled="[[isDisabled]]" value="option1">Option1&lt;/oj-option>
 *
 * @example <caption>Get or set the <code class="prettyprint">disabled</code> property after initialization:</caption>
 * // getter
 * var disabledValue = myOption.disabled;
 *
 * // setter
 * myOption.disabled = true;
 */
 
/**
 * <p>Specifies the oj-option's value. The value is associated with the oj-option element whose display value may be different.
 *
 * @name value
 * @expose
 * @memberof oj.ojOption
 * @instance
 * @type {*}
 *
 * @example <caption>Initialize the oj-option with the <code class="prettyprint">value</code> attribute specified:</caption>
 * &lt;oj-option value="option1">Option1&lt;/oj-option>
 *
 * @example <caption>Get or set the <code class="prettyprint">value</code> property after initialization:</caption>
 * // getter
 * var optionValue = myOption.value;
 *
 * // setter
 * myOption.value = 'option1';
 */

/**
 * <p>Child content for oj-option. This is normally the text node that displays for oj-option.</p>
 *
 * @ojchild Default
 * @memberof oj.ojOption
 *
 * @example <caption>Initialize the oj-option with child content specified:</caption>
 * &lt;oj-option>
 *   Option label
 * &lt;/oj-option>
 */
 
/**
 * <p>Named slot for the oj-option's start icon.</p>
 *
 * @ojslot startIcon
 * @memberof oj.ojOption
 *
 * @example <caption>Initialize the oj-option with the <code class="prettyprint">startIcon</code> slot specified:</caption>
 * &lt;oj-option>
 *   &lt;span slot='startIcon'>&lt;img src='start.png' alt='Start'>&lt;/span>
 * &lt;/oj-option>
 */
 
/**
 * <p>Named slot for the oj-option's end icon.</p>
 *
 * @ojslot endIcon
 * @memberof oj.ojOption
 *
 * @example <caption>Initialize the oj-option with the <code class="prettyprint">endIcon</code> slot specified:</caption>
 * &lt;oj-option>
 *   &lt;span slot='endIcon'>&lt;img src='end.png' alt='End'>&lt;/span>
 * &lt;/oj-option>
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
 * @memberof oj.ojOption
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
 * @memberof oj.ojOption
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
 * @memberof oj.ojOption
 * @instance
 */ 
/**
 * Performs a batch set of properties.
 * @function setProperties
 * @param {Object} properties - An object containing the property and value pairs to set.
 * 
 * @expose
 * @memberof oj.ojOption
 * @instance
 * 
 * @example <caption>Set a batch of properties:</caption>
 * myComponent.setProperties({"prop1": "value1", "prop2.subprop": "value2", "prop3": "value3"});
 */ 
/**
 * @protected
 * @ignore
 */
(function() {  
  var ojOptionMeta = {
    "properties": {
      "disabled": {
        "type": "boolean",
        "value": false
      }, 
      "value": {
        "type": "any",
        "value": null
      },
      // not documented
      "customOptionRenderer": {}
    },
    "events": {
      "action" : {}
    },
    "extension": {
      _RENDER_FUNC: OptionRenderer.render
    }
  };
  oj.CustomElementBridge.registerMetadata('oj-option', null, ojOptionMeta);
  oj.CustomElementBridge.register('oj-option', {'metadata': oj.CustomElementBridge.getMetadata('oj-option')});
})();

});

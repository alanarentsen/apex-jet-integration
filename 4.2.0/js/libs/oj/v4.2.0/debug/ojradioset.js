/**
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";
define(['ojs/ojcore', 'jquery', 'ojs/ojeditablevalue', 'ojs/ojradiocheckbox', 'ojs/ojoption'],
       function(oj, $)
{

/**
 * Copyright (c) 2014, Oracle and/or its affiliates.
 * All rights reserved.
 */
(function() {

/*!
 * JET Radioset @VERSION
 */
/**
 * @ojcomponent oj.ojRadioset
 * @augments oj.editableValue
 * @since 0.6
 * @ojshortdesc Radio Set Element
 * @ojrole radio
 * @ojrole radiogroup
 * @ojrole option
 * @ojstatus preview
 * @classdesc
 * <h3 id="radiosetOverview-section">
 *   JET Radioset
 *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#radiosetOverview-section"></a>
 * </h3> 
 * <p>
 * The JET oj-radioset component manages a set of 
 * <code class="prettyprint">oj-option</code> child elements and creates the necessary dom elements for
 * the actual radio buttons. 
 * </p>
 * <p>To use an oj-radioset, add one or more oj-option child elements for each radio button desired.
 * Note, if you add or remove an oj-option after the oj-radioset is rendered, you should call
 * refresh() on the oj-radioset.
 * </p>
 * <p>
 *  You can enable and disable an oj-radioset, 
 *  which will enable and disable all contained radios. 
 * </p>
 * <p>
 *  oj-radioset does not have a readonly attribute since HTML does not support
 *  readonly on radios and checkboxes.
 * </p>
 * <p>
 * The oj-label element is not required. If you don't use an oj-label element,
 * then you need to set <code class="prettyprint">aria-label</code> on the input for accessibility.
 * </p>
 * 
 * {@ojinclude "name":"validationAndMessagingDoc"}
 * 
 * <h3 id="touch-section">
 *   Touch End User Information
 *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#touch-section"></a>
 * </h3>
 *
 * {@ojinclude "name":"touchDoc"}
 *
 *
 * <h3 id="keyboard-section">
 *   Keyboard End User Information
 *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#keyboard-section"></a>
 * </h3>
 *
 * {@ojinclude "name":"keyboardDoc"}
 * 
 * <h3 id="a11y-section">
 *   Accessibility
 *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#a11y-section"></a>
 * </h3>
 * 
 * <p>JET oj-radioset takes care of setting 
 * <code class="prettyprint">role="radiogroup"</code> on the oj-radioset element.  
 * 
 * <p>As shown in the online demos, the application is responsible for applying 
 * <code class="prettyprint">labelled-by</code>
 * to point to the radioset's <code class="prettyprint">oj-label</code> element for the oj-radioset.
 * <p>Disabled content: JET supports an accessible luminosity contrast ratio, 
 * as specified in <a href="http://www.w3.org/TR/WCAG20/#visual-audio-contrast-contrast">WCAG 2.0 - Section 1.4.3 "Contrast"</a>, 
 * in the themes that are accessible.  (See the "Theming" chapter of the JET Developer Guide for more information on which 
 * themes are accessible.)  Note that Section 1.4.3 says that text or images of text that are part of an inactive user 
 * interface component have no contrast requirement.  Because disabled content may not meet the minimum contrast ratio 
 * required of enabled content, it cannot be used to convey meaningful information.<p>
 *  
 * <h3 id="label-section">
 *   Label and Radioset
 *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#label-section"></a>
 * </h3>
 * <p>
 * For accessibility, you should associate an <code class="prettyprint">oj-label</code> element with the 
 * radioset by putting an <code class="prettyprint">id</code> on the oj-label, and then setting the 
 * <code class="prettyprint">labelled-by</code> attribute on the oj-radioset to be the oj-label's 
 * <code class="prettyprint">id</code>.
 * </p>
 * 
 * <h3 id="styling-section">
 *   Styling
 *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#styling-section"></a>
 * </h3>
 * {@ojinclude "name":"stylingDoc"}
 * 
 * @example <caption>Initialize the radioset with no options specified:</caption>
 * &lt;oj-radioset id="colorRadio" value="{{currentColor}}">
 *   &lt;oj-option value="blue">Blue&lt;/oj-option>
 *   &lt;oj-option value="green">Green&lt;/oj-option>
 * &lt;/oj-radioset>
 * 
 * @example <caption>Initialize component and an associated oj-label component</caption>
 * &lt;label id="grouplabel">Greetings&lt;/label>
 * &lt;oj-radioset id="radioset" aria-labelledby="grouplabel" value="{{currentGreeting}}">
 *   &lt;input id="helloid" value="hello" type="radio" name="greetings"/&gt;
 *   &lt;label for="helloid"/&gt;Hello&lt;/label>
 *   &lt;input id="bonjourid" value="bonjour" type="radio" name="greetings"/&gt;
 *   &lt;label for="bonjourid"/&gt;Bonjour&lt;/label>
 *   &lt;input id="ciaoid" value="ciao" type="radio" name="greetings"/&gt;
 *   &lt;label for="ciaoid"/&gt;Ciao&lt;/label>
 * &lt;oj-radioset>
 * <br/>
 * // set the value to "ciao". (The 'ciao' radio will be selected)
 * myComp.value = "ciao";
 * 
 * @example <caption>Initialize a radioset via the JET component binding:</caption>
 * &lt;oj-label id="grouplabel">Time&lt;/oj-label>
 * &lt;oj-radioset id="radioset" value="{{radiosetValue}}" 
 *                 labelled-by="grouplabel">
 *   &lt;oj-option id="morningid" value="morning">Morning&lt;/oj-option>
 *   &lt;oj-option id="nightid" value="night">Night&lt;/oj-option>
 * &lt;/oj-radioset>
 * <br/>
 */
oj.__registerWidget("oj.ojRadioset", $['oj']['editableValue'],
{
  version : "1.0.0",  
  defaultElement : "<div>", 
  widgetEventPrefix : "oj", 
  options : 
  {
    /** 
     * <p>
     * Disabled <code class="prettyprint">true</code> disables the component and disables all the 
     * inputs/labels. 
     * Disabled <code class="prettyprint">false</code> enables the component, and leaves the 
     * inputs' <code class="prettyprint">disabled</code> property as it is in the dom.
     * <p>
     *  
     * @example <caption>Initialize component with <code class="prettyprint">disabled</code> attribute:</caption>
     * &lt;oj-radioset disabled>
     *   &lt;oj-option value="blue">Blue&lt;/oj-option>
     * &lt;/oj-radioset>
     *
     * @example <caption>Get or set the <code class="prettyprint">disabled</code> property after initialization:</caption>
     * // getter
     * var disabled = myComp.disabled;
     *
     * // setter
     * myComp.disabled = false;
     * 
     * @expose 
     * @type {boolean|null}
     * @default false
     * @public
     * @instance
     * @memberof oj.ojRadioset
     */
    disabled: false,
     /**
     * It is used to establish a relationship between this component and another element.
     * A common use is to tie the oj-label and the oj-radioset together.
     * The oj-label custom element has an id, and you use the labelled-by attribute
     * to tie the two components together.
     *
     * @example <caption>Initialize component with <code class="prettyprint">labelled-by</code> attribute:</caption>
     * &lt;oj-label id="labelId">Name:&lt;/oj-label>
     * &lt;oj-radioset labelled-by="labelId">
     *   &lt;oj-option value="blue">Blue&lt;/oj-option>
     * &lt;/oj-radioset>
     *
     * @example <caption>Get or set the <code class="prettyprint">labelledBy</code> property after initialization:</caption>
     * // getter
     * var disabled = myComp.labelledBy;
     *
     * // setter
     * myComp.labelledBy = "labelId";
     *
     * @expose
     * @type {string|null}
     * @public
     * @instance
     * @memberof oj.ojRadioset
     */
    labelledBy: null,   
    /** 
     * Whether the component is required or optional. When required is set to true, an implicit 
     * required validator is created using the validator factory - 
     * <code class="prettyprint">oj.Validation.validatorFactory(oj.ValidatorFactory.VALIDATOR_TYPE_REQUIRED).createValidator()</code>.
     * 
     * Translations specified using the <code class="prettyprint">translations.required</code> option 
     * and the label associated with the component, are passed through to the options parameter of the 
     * createValidator method. 
     * 
     * <p>
     * When <code class="prettyprint">required</code> option changes due to programmatic intervention, 
     * the component may clears message and run validation, based on the current state it's in. </br>
     *  
     * <h4>Running Validation</h4>
     * <ul>
     * <li>if component is valid when required is set to true, then it runs deferred validation on 
     * the property value. This is to ensure errors are not flagged unnecessarily.
     * </li>
     * <li>if component is invalid and has deferred messages when required is set to false, then 
     * component messages are cleared but no deferred validation is run.
     * </li>
     * <li>if component is invalid and currently showing invalid messages when required is set, then 
     * component messages are cleared and normal validation is run using the current display value. 
     * <ul>
     *   <li>if there are validation errors, then <code class="prettyprint">value</code> 
     *   property is not updated and the error is shown. 
     *   </li>
     *   <li>if no errors result from the validation, the <code class="prettyprint">value</code> 
     *   property is updated; page author can listen to the <code class="prettyprint">optionChange</code> 
     *   event to clear custom errors.</li>
     * </ul>
     * </li>
     * </ul>
     * 
     * <h4>Clearing Messages</h4>
     * <ul>
     * <li>Only messages created by the component are cleared.</li>
     * <li><code class="prettyprint">messagesCustom</code> option is not cleared.</li>
     * </ul>
     * 
     * </p>
     * 
     * @ojvalue {boolean} false - implies a value is not required to be provided by the user. 
     * This is the default.
     * @ojvalue {boolean} true - implies a value is required to be provided by user and the 
     * input's label will render a required icon. Additionally a required validator - 
     * {@link oj.RequiredValidator} - is implicitly used if no explicit required validator is set. 
     * An explicit required validator can be set by page authors using the validators option. 
     * 
     * When the option is not set, the element's required property is used as its initial 
     * value if it exists.
     * 
     * @example <caption>Initialize the component with the <code class="prettyprint">required</code> attribute:</caption>
     * &lt;oj-radioset required>
     *   &lt;oj-option value="blue">Blue&lt;/oj-option>
     * &lt;/oj-radioset>
     * 
     * @example <caption>Customize messages and hints used by implicit required validator when 
     * <code class="prettyprint">required</code> option is set:</caption> 
     * &lt;oj-radioset required value="{{colors}}"
     *                    translations='{"required":
     *                                    {"hint": "custom: check at least one value",
     *                                     "messageSummary": "custom: \'{label}\' is Required",
     *                                     "messageDetail", "custom: please check at least one value for \'{label}\'"}}'>
     *   &lt;oj-option value="blue">Blue&lt;/oj-option>
     * &lt;/oj-radioset>
     *
     * @example <caption>Get or set the <code class="prettyprint">required</code> property after initialization:</caption>
     * // getter
     * var required = myComp.required;
     *
     * // setter
     * myComp.required = false;
     *
     * @expose 
     * @access public
     * @instance
     * @memberof oj.ojRadioset
     * @type {boolean}
     * @default false
     * @since 0.7
     * @see #translations
     */
    required: false,    
    /** 
     * The value of the component. 
     * 
     * <p>
     * When <code class="prettyprint">value</code> option changes due to programmatic 
     * intervention, the component always clears all messages and runs deferred validation, and 
     * always refreshes UI display value.</br>
     * 
     * <h4>Clearing Messages</h4>
     * <ul>
     * <li>All messages are cleared. This includes  
     * <code class="prettyprint">messagesCustom</code> property.</li>
     * </ul>
     * 
     *  
     * <h4>Running Validation</h4>
     * <ul>
     * <li>component always runs deferred validation</li>
     * </ul>
     * </p>
     * 
     * @example <caption>Initialize component with <code class="prettyprint">value</code> attribute:</caption>
     * &lt;oj-radioset value="coffee">
     *   &lt;oj-option value="coffee">Coffee&lt;/oj-option>
     *   &lt;oj-option value="tea">Tea&lt;/oj-option>
     * &lt;/oj-radioset>
     *
     * @example <caption>Get or set the <code class="prettyprint">value</code> property after initialization:</caption>
     * // getter
     * var val = myComp.value;
     *
     * // setter
     * myComp.value = "tea";
     *
     * 
     * @expose 
     * @access public
     * @instance
     * @ojwriteback
     * @default null
     * When the option is not set, the value of the checked radio is used, if a radio is checked.
     * @memberof oj.ojRadioset
     * @type {*}
     */
    value: undefined
  },
  /**** start Public APIs ****/
      
   /**
   * Refreshes the radioset
   * <p>A <code class="prettyprint">refresh()</code> is required 
   * when a radioset is programatically changed, like in the following circumstances:
   * <ul>
   *   <li>After radios are added or removed or modified (without using ojRadioset) in the DOM.</li>
   * </ul>    
   * 
   * @example <caption>Invoke the <code class="prettyprint">refresh</code> method:</caption>
   * myComp.refresh();
   * 
   * @expose 
   * @memberof oj.ojRadioset
   * @public
   * @instance
   */
  refresh: function() 
  {
    // Set _ResetComponentState. It is called first in EditableValue's refresh,
    // and we override it in ojradioset to reset the this.$radios in case some have 
    // been deleted or overridden.
    
    this._super();      
    this._setup();

  },
  /**
   * Returns a jQuery object containing the element visually representing the radioset. 
   * 
   * <p>This method does not accept any arguments.
   * 
   * @expose
   * @memberof oj.ojRadioset
   * @instance
   * @public
   * @return {jQuery} the radio
   * @ignore
  */
  widget : function ()
  {
    return this.uiRadioset;
  },
  /**
   * Validates the component's display value using all validators registered on 
   * the component and updates the <code class="prettyprint">value</code> option by performing the 
   * following steps. 
   * 
   * <p>
   * <ol> 
   * <li>All messages are cleared, including custom messages added by the app. </li>
   * <li>The implicit 
   * required validator is run if the component is marked required.</li>
   * <li>At the end of validation if there are errors, the messages are shown. 
   * If there were no errors, then the 
   * <code class="prettyprint">value</code> property is updated.</li>
   * </ol>
   * 
   * @example <caption>Validate component using its current value.</caption>
   * myComp.validate();
   * @example <caption>Validate component and use the Promise's resolved state.</caption>
   * myComp.validate().then(
   *  function(result) {
   *    if(result === "valid")
   *    {
   *      submitForm();
   *    }
   *  });
   * @return {Promise} Promise resolves to "valid" if 
   * the component passed all validations. 
   * The Promise resolves to "invalid" if there were validation errors.
   * 
   * @method
   * @access public
   * @expose
   * @instance
   * @memberof oj.ojRadioset
   * @since 4.0.0
   * @ojstatus preview
   */
  validate : oj.EditableValueUtils.validate,
          
   /**** end Public APIs ****/         
          
  /**** start internal widget functions ****/   
  /**
   * @protected
   * @override
   * @instance
   * @memberof oj.ojRadioset
   */
  _InitOptions : function (originalDefaults, constructorOptions)
  {
    var checkedRadio, domValue;
    var props = [{attribute: "disabled", validateOption: true},
                 {attribute: "required", coerceDomValue: true, validateOption: true},
                 {attribute: "title"}
                 // {attribute: "value"} // code below sets value
               ]; 
    
    this._super(originalDefaults, constructorOptions);
    
    if (!this._IsCustomElement())
    {
      oj.EditableValueUtils.initializeOptionsFromDom(props, constructorOptions, this);  

      // component, app, and constructor are merged into this.options.option by the time _InitOptions 
      // is called. Let's take this example:
      // component (widget) default - 'foo'<br/>
      // app default - 'bar'<br/>
      // dom  - 'lucy'<br/>
      // constructorOptions['value'] - undefined<br/>
      // this.options.option is set to 'bar' initially. We don't want to just take this value, because
      // we want DOM value to win over the app and components default if DOM is set.
      // Therefore, the component needs to check if the constructorOptions['value'] is 
      // undefined and if so, set value option to 'lucy' (the DOM value in this example). <br/>
      // 
      // use DOM value if constructorOptions is undefined. if DOM value is undefined, then
      // leave this.options["value"] alone since it's the merged app/widget default at this point.
      if (constructorOptions['value'] === undefined)
      {
        // return the checked values by simply looking at DOM node
        this.$radios = this._findRadiosWithMatchingName();
        checkedRadio = this.$radios.filter(":checked");
        domValue = (checkedRadio.length === 0) ? undefined : checkedRadio.val();
        // we only use the dom if SOMETHING is checked. If nothing is checked, we stay with whatever
        // is in this.options['value'].
        if (domValue !== undefined)
        {
          // when defaulting from DOM we want to trigger optionChange to writeback new value
          this.option("value", domValue, {'_context':{writeback: true, internalSet: true}});
        }
        // widget defaults to null
        if (this.options['value'] === undefined)
          this.options['value'] = null;
      }
    }
  },      
  /**
   * After _ComponentCreate and _AfterCreate, 
   * the widget should be 100% set up. this._super should be called first.
   * @override
   * @protected
   * @memberof oj.ojRadioset
   * @instance
   */
  _ComponentCreate : function ()
  {
    var element = this.element;
    this._super();
    
    // since the oj-option renderer uses the oj-radioset ID for the name
    // attribute of the rendered radio buttons, let's make sure the radioset
    // has an ID
    element.uniqueId();
    this._processOjOptions();
    // The processOjOptions renders input/label, so we need to go through and 
    // get the this.$radios after this is called.
    this.$radios = this._findRadiosWithMatchingName();
    
    // first check to see if this.element is NOT a fieldset. If fieldset, throw error.
    if (element.is("fieldset"))
    {
      throw new Error("ojRadioset cannot be bound to a fieldset. Use a div instead.");
    }
    // Turn each radio into ojRadioCheckbox. Since ojRadiooxSet delegates to the _ojRadioCheckbox
    // component, and we need to mark this as an internal node so that oj.Components.getComponentElementByNode
    // knows it is an internal component in this case, not a stand-alone component
    this.$radios._ojRadioCheckbox().attr('data-oj-internal', '');

    // keep the root dom element and slots as is, and add a wrapper dom underneath it. This way we can
    // have one div around all the inputs and labels, and for inline messaging we can have another
    // div around the inline messaging content. And we can style the borders of the two boxes differently.
    this.uiRadioset = element.addClass("oj-radioset oj-component").attr( "role", "radiogroup" );
    // need to grab all elements using childNodes first and then do filter because jquery children will automatically 
    // exclude all comment and text nodes
    $(element.get(0).childNodes).filter(function(){
        return (this.getAttribute && this.getAttribute("slot") === 'contextMenu') ? false : true;
    }).wrapAll("<div class='oj-radioset-wrapper'></div>"); //@HTMLUpdateOK
    
    this._on(this._events);
    this._setup();
  },
  /**
   * Resets this.$radios. This is called at the beginning of a refresh in EditableValue
   * @override
   * @memberof oj.ojRadioset
   * @instance
   * @protected   
   */
  _ResetComponentState : function ()
  { 
    // we could have added, removed, or modified radios, so we need to re-find all the 
    // inputs on refresh and turn the ones that aren't already ojRadioCheckboxes into them.
    this._processOjOptions();
    this.$radios = this._findRadiosWithMatchingName();
    
    // we have a rule for refresh: if we have a public API for it, then the app dev has to use the
    // option, and not expect changing the dom will update the state with refresh.
    // However, ojRadioset does not expose a public API for the individual radios' disabled state
    // to the app developer. Our private ojRadioCheckbox component has a disabled option that
    // our code has access to.
    // For each radio, we need to look at the disabled attribute dom and update the 
    // ojradiocheckbox's disabled option.

    // !! ensures it is a boolean
    // update the private ojradiocheckbox component's disabled option to keep it in sync with the dom
    this.$radios.filter( ".oj-radio" ).each(function() 
    {
        var disabledValue = $( this ).attr("disabled") !== undefined ? 
          !!$( this ).prop("disabled") : false;
        $( this )._ojRadioCheckbox("option", "disabled", disabledValue);
    });
      
    // no need to refresh the ojRadioCheckbox's that exist since we have options for everything.
    // of the type=radio inputs that are not yet ojRadioCheckboxs, make them ojRadioCheckboxes.

    // create ojRadioCheckboxes on any new ones.
    this.$radios.not(".oj-radio")._ojRadioCheckbox();
  },  
  /**
   * Sets focus on the element that naturally gets focus. For radioset, this is the first radio <br/>
   * 
   * @returns {*} a truthy value if focus was set to the intended element, a falsey value 
   * otherwise.
   * @override
   * @memberof oj.ojRadioset
   * @instance
   * @protected
   * @since 0.7
   */
  Focus : function ()
  {
    // We need :focusable here so that we don't try to focus on an element that isn't focusable.
    this._GetContentElement().filter(":focusable").first().focus();
    return true;
  },
  /**
   * Whether the component is required.
   * 
   * @return {boolean} true if required; false
   * 
   * @memberof! oj.ojRadioset
   * @instance
   * @protected
   * @override
   */
  _IsRequired : function () 
  {
    return this.options['required'];
  },
  /**
   * Sets the disabled option onto the dom. 
   * This is a no-op for radioset since its root dom element is a div, and disabled is
   * invalid on a div. If we did try to set disabled on the div, then restore attributes doesn't
   * work correctly since it wasn't saved correctly.
   * @param {Object} node - dom node
   * 
   * @memberof oj.ojRadioset
   * @instance
   * @protected
   * @since 1.0.0
   */
  _SetDisabledDom : function(node)
  {
    // no-op
  },
  /**
   * @memberof oj.ojRadioset
   * @instance
   * @private
   */
  _refreshRequired : oj.EditableValueUtils._refreshRequired,
  /**
   * the validate method from v3.x that returns a boolean
   * @memberof oj.ojRadioset
   * @instance
   * @protected
   * @ignore
   */
  _ValidateReturnBoolean: oj.EditableValueUtils._ValidateReturnBoolean,

  // This function processes the oj-option children, setting the custem renderer.
  _processOjOptions : function ()
  {
    if (this._IsCustomElement())
    {
      // set the custom renderer on oj-option
      var i, len;
      var renderer = this._customOptionRenderer.bind(this);
      var options = this.element.children("oj-option");
      for (i = 0, len = options.length; i < len; i++)
      {
        options[i]["customOptionRenderer"] = renderer;
      }

      // for oj-option that are inside the wrapper (after refresh)
      options = this.element.children(".oj-radioset-wrapper").find("oj-option");
      if (options.length > 0) 
      {
        for (i = 0, len = options.length; i < len; i++) {
          options[i]["customOptionRenderer"] = renderer;
        }
      }
    }        
  },
  // custom oj-option renderer
  _customOptionRenderer : function (elem)
  {
    var span;
    var label;
    var ojoption = elem;

    // let's make sure that each oj-option has an ID so the
    // label element can reference the input element via the 'for' attribute
    $(ojoption).uniqueId();
    
    var id = ojoption.getAttribute("id");
    var radioId = id+"|rb";
    var radio = document.getElementById(radioId);;
    var alreadyProcessed = (radio !== null); // Was the oj-option already rendered

    // check to see if we've already processed the oj-option dom or not
    // in the code below, we use setAttribute() for everything as we want to be
    // setting the initial value for these elements.
    if (!alreadyProcessed)
    {
      span = document.createElement("span");
      radio = document.createElement("input");
      label = document.createElement("label");
      span.setAttribute("class", "oj-choice-item");
      radio.setAttribute("type", "radio");
      radio.setAttribute("id", radioId);
      label.setAttribute("for", radioId);
      ojoption.parentElement.insertBefore(span, ojoption);//@HTMLUpdateOK
      label.appendChild(ojoption); // append the oj-option as a child of label
      span.appendChild(radio);
      span.appendChild(label);
    }

    var name = this.element[0].id; // Use the id of the ojradioset as the name for the oj-options.
    var ariaLabel = ojoption.getAttribute("aria-label");
    var ariaLabelledBy = ojoption.getAttribute("aria-labelledby")
    
    // The value attribute of the radio only supports text, so we need to be
    // able to access the oj-option's value property instead.  This attribute
    // is a link back to the oj-option so that we don't need to use dom traversal
    // to get to the oj-option to get its value.
    radio.setAttribute("data-oj-option-id", id);

    if (name && name != "")
      radio.setAttribute("name", name);
    else
      radio.removeAttribute("name");

    if (ariaLabel && ariaLabel != "")
      radio.setAttribute("aria-label", ariaLabel);
    else
      radio.removeAttribute("aria-label");

    if (ariaLabelledBy && ariaLabelledBy != "")
      radio.setAttribute("aria-labelledby", ariaLabelledBy);
    else
      radio.removeAttribute("aria-labelledby");

    if (ojoption.disabled)
      radio.setAttribute("disabled", true);
    else
      radio.removeAttribute("disabled");
    
    // When an oj-option child is disabled (by setting the disabled attribute to
    // true) and it re-renders, the component should refresh automatically rather than requiring the
    // user to call refresh. See .   
    if (alreadyProcessed)
    {
      $(radio)._ojRadioCheckbox("option", "disabled", ojoption.disabled);
    }
  },  
  /**
   * If custom element, get the labelledBy option, and set this 
   * onto the root dom element as aria-labelledby. We append "|label" so it matches the id that
   * is on the oj-label's label element.
   * @memberof oj.ojRadioset
   * @instance
   * @private
   */
  _updateLabelledBy : oj.EditableValueUtils._updateLabelledBy,  
  /**
   * Returns a jquery object that is a set of elements that are input type radio
   * and have the name of the first radio found.
   * 
   * @return {jQuery} jquery object of all the radios within the root dom element
   * that have the same 'name' attribute as the first radio found.
   * @private
   * @memberof oj.ojRadioset
   */
  _findRadiosWithMatchingName : function ()
  {
    var allradios;
    var element = this.element;
    var $first = element.find("input[type=radio]:first");
    var name;
    var selector;
      
    if ($first.length === 0)
    {
      oj.Logger.warn("Could not find any input type=radio within this element");
    }
    // get the name attribute of the first input radio
    name = $first.attr("name");
    // find all input radios with matching name
    if (name === undefined)
    {
      // search for all radios with no name
      allradios = element.find("input[type=radio]");
      // now loop and find the ones without 'name' attribute
      return allradios.not("[name]");
    }
    else
    {
      // search for all radios with the name
      selector = "input[type=radio][name=" + name + "]";
      return element.find(selector);
      
    }
  },
  // Override to set custom launcher
  _NotifyContextMenuGesture: function(menu, event, eventType)
  {
    // Setting the launcher to the checked radio if any (since that's what's tabbable in mainstream browsers), 
    // else the first enabled radio (when no selection, all enabled radios are tabbable).
    // Component owner should feel free to specify a different launcher if appropriate.
    // See the superclass JSDoc for _OpenContextMenu for tips on choosing a launcher.
    var radios = this.element.find("input[type=radio]");
    var checked = radios.filter(":checked");
    var launcher = checked.length ? checked : radios.filter(":enabled").first();
    this._OpenContextMenu(event, eventType, {"launcher": launcher});
  },
  // Override to set launcher to widget
  _GetMessagingLauncherElement : function ()
  {
    // focus events only get triggered on input, but they do bubble up and we will capture them
    // on the widget.
    // mouseenter events get called once once if the user hovers over for the entire widget. if
    // we put it on the inputs, it gets called every time you leave and enter a new input. Plus,
    // this doesn't work when we hide the input like we do in the native themes.
     return this.widget();                          
  },
  /**
   * _setup is called on create and refresh. Use the disabled option to 
   * update the component. If the component's option is disabled, then
   * leave it alone.
   * @memberof oj.ojRadioset
   * @instance
   * @private
   */
  _setup: function() 
  {
    // at this point we already have this.$radios set to a list of radios for this radioset.
    this._propagateDisabled(this.options.disabled );
    
    // add to the root dom the style class 'oj-choice-direction-column' 
    // if there isn't already a 'oj-choice-direction-row' or 'oj-choice-direction-column' there.
    if (!(this.element.hasClass("oj-choice-direction-column")) && 
        !(this.element.hasClass("oj-choice-direction-row")))
    {
      this.element.addClass("oj-choice-direction-column");
    }
    this._refreshRequired(this.options['required']);
    
    this._updateLabelledBy(null, this.options['labelledBy'], this.widget());
  },  
  _events : 
  {
    'change' : function (event)
    {      
      this._HandleChangeEvent(event);
    }
  },

  /**
   * @param {Event} event DOM event 
   * @override
   * @protected
   * @memberof oj.ojRadioset
   */
  _HandleChangeEvent: function(event)
  {
    // TODO make sure the target is an input radio?
    // TODO any more checks I need to do?
    //alert("XYZ In _changeSetValue target is " + event.target + " And the value of the input is " + event.target.value);

    // should I double check that the event.target is the same as the 'checked'?
    // if (event.target === this.$radios.filter(":checked"))???
    // 
    var submittedValue = this._GetDisplayValue();
    // run full validation. There is no need to check if values have changed
    //  since for checkboxset/radioset if we get into this function we know value has changed.
    // passing in doValueChangeCheck: false will skip the new-old value comparison
    this._SetValue(submittedValue, event, _sValueChangeCheckFalse);
  },
                  
  /**
   * Returns the display value that is ready to be passed to the converter.
   * 
   * @param {Object} value the stored value if available that needs to be formatted for display
   * @override
   * @protected
   * @memberof oj.ojRadioset
   */
  _GetDisplayValue : function (value) 
  {
    // return the value of the 'checked' radio
    return this._GetElementValue();
  },
  /**
   * Called when the display value on the element needs to be updated 
   * as a result of a value change. 
   * ojRadioset stores a String value, and this value matches the value
   * of the currently checked radio. So, if we need to set the display value,
   * what this means is we need to 'check' the radio whose value matches the
   * displayValue.
   * 
   * @param {String} displayValue the value of the radio button that needs to be selected
   * @override
   * @protected
   * @memberof oj.ojRadioset
  */  
  _SetDisplayValue : function (displayValue) 
  {
    var i;
    var length = this.$radios.length;
    var matchIndex = -1;
    var radios = this.$radios.get();
    var radioValues = [];
    var $radio;

    // Find the element matching displayValue
    // first, do an === compare
    for (i = 0; i < length; i++)
    {
      // save the values for the deep compare case
      radioValues[i]= this._GetOptionValue(radios[i]);
        
      if (radioValues[i] === displayValue)
      {
        matchIndex = i;
        break;
      }
    }
    
    // If not found, do a deep compare
    if (matchIndex === -1)
    {
      for (i = 0; i < length; i++)
      {
        if (oj.Object.compareValues(radioValues[i], displayValue))
        {
          matchIndex = i;
          break;
        }
      }
    }

    // go through each _ojRadioCheckbox and see if it needs to be checked or unchecked.
    for (i = 0; i < length; i++)
    {
      $radio = $(this.$radios[i]);
      // does the radio's value match the displayValue?
      var checked = $radio._ojRadioCheckbox("option", "checked"); 
      if (i === matchIndex)
      {
        // yes. this needs to be checked, if it isn't already
        if (!checked)
        {
          $radio._ojRadioCheckbox("option", "checked", true);
        }
      }
      else
      {
        /// no. this needs to be unchecked, if it isn't already
        if (checked)
        {
          $radio._ojRadioCheckbox("option", "checked", false);
        }
      }
    } 
  },
  /**
   * Returns the element's value. Normally, this is a call to this.element.val(),
   * but in the case of ojRadioset, the element's value is really the value
   * of the checked radio in the set.
   * @override
   * @protected
   * @memberof oj.ojRadioset
   * @return {*} The value of the selected radio, or null if no selection.
   */
  _GetElementValue : function () 
  {
    // "input:checked" selects radios that are currently checked as 
    // reflected in their boolean (true or false) checked property, 
    // which is affected when the user clicks the radio for example.
    // for radio, there will be one or none checked; 
    // if none are checked, return null (checkedRadio.val() is undefined if nothing is checked)
    var checkedRadio = this.$radios.filter(":checked");
    if (checkedRadio.length === 0)
      return null;
    else
      return this._GetOptionValue(checkedRadio[0]);
  },
  /**
   * For custom element, we get the value from the oj-option element, otherwise
   * we get the value from the radio element.
   * @override
   * @protected
   * @memberof oj.ojRadioset
   * @return {*} Returns the value property of the associated oj-option, or the value attribute of the radio element.
   */
  _GetOptionValue : function (radioElem)
  {
    var option;
    var val;
    
    if (this._IsCustomElement())
    {
      option = document.getElementById(radioElem.getAttribute("data-oj-option-id"));
    
      if (option)
      {
        val = option.value;
      }
    }
    else
    {
      val = radioElem.value;
    }
    
    return val;
  },
  /**
   * Returns the default styleclass for the component. Currently this is 
   * used to pass to the ojLabel component, which will append -label and 
   * add the style class onto the label. This way we can style the label
   * specific to the input component. For example, for inline labels, the
   * radioset/checkboxset components need to have margin-top:0, whereas all the
   * other inputs need it to be .5em. So we'll have a special margin-top style 
   * for .oj-label-inline.oj-radioset-label
   * All input components must override
   * 
   * @return {string}
   * @memberof oj.ojRadioset
   * @override
   * @protected
   */
  _GetDefaultStyleClass : function ()
  {
    return "oj-radioset";
  },
  /**
   * Returns a jquery object of the elements representing the 
   * content nodes (input type=radio). This is used in EditableValue to add
   * aria-describedby to the input when there is a help icon, to add
   * aria-required and aria-invalid
   * @protected
   * @override
   * @memberof oj.ojRadioset
   */
  _GetContentElement : function ()
  {
    if (this.$radios != null)
      return this.$radios;
    else 
    {
      this.$radios = this._findRadiosWithMatchingName();
      return this.$radios
    }
  }, 
  /**
   * Called to find out if aria-required is unsupported. This is needed for the label.
   * It is not legal to have aria-required on radio/checkboxes, nor on
   * radiogroup/group.
   * If aria-required is not supported, then we wrap the required icon as well as the
   * help icons so that JAWS can read required. We don't do this for form controls that use
   * aria-required because if we did JAWS would read required twice.
   * @memberof oj.ojRadioset
   * @instance
   * @protected
   * @return {boolean}
   */
  _AriaRequiredUnsupported : function()
  {
    return true;
  },
  /**
   * Performs post processing after required option is set by taking the following steps.
   * 
   * - if component is invalid and has messgesShown -> required: false/true -> clear component errors; 
   * run full validation with UI value (we don't know if the UI error is from a required validator 
   * or something else);<br/>
   * &nbsp;&nbsp;- if there are validation errors, then value not pushed to model; messagesShown is 
   * updated<br/>
   * &nbsp;&nbsp;- if no errors result from the validation, push value to model; author needs to 
   * listen to optionChange(value) to clear custom errors.<br/>
   * 
   * - if component is invalid and has messagesHidden -> required: false -> clear component 
   * errors; no deferred validation is run.<br/>
   * - if component has no error -> required: true -> run deferred validation (we don't want to flag 
   * errors unnecessarily)<br/>
   * - messagesCustom is never cleared<br/>
   * 
   * @param {string} option
   * 
   * @memberof oj.ojRadioset
   * @instance
   * @protected
   */
  _AfterSetOptionRequired : oj.EditableValueUtils._AfterSetOptionRequired,
  
  /**
   * @private
   * @memberof oj.ojRadioset
   */
  _propagateDisabled: function( disabled ) {
      disabled = !!disabled;
      this.$radios.each(function() 
      {
        // this is the technique to use to call package-private functions
        // Calling it like this.$radios.ojRadioCheckbox("__setAncestorComponentDisabled",value)
        // gives an error because jquery prevents you from calling functions with an "_"
        // 
        // This is how we handle 'disabled' for radioset. We don't change the radiocheckbox
        // component's disabled option ever since if we do that we've lost what the initial disabled
        // state is (we store the disabled dom value from the radio into its disabled option)
        // and we need that when we refresh. Instead what we do
        // is we mark if its ancestor (the radioset) is disabled or not. Then, when we render
        // out the radios 'disabled' state, like oj-disabled, we look to see if it is 'effectively
        // disabled' (see _IsEffectivelyDisabled call in ojRadioCheckbox), that is if its 
        // option is disabled OR its ancestor (the radioset) is disabled.
        $( this ).data("oj-_ojRadioCheckbox").__setAncestorComponentDisabled(disabled);
      });
 
      this.$radios._ojRadioCheckbox("refreshDisabled");
  },
  /**
   * Note that _setOption does not get called during create in the super class. 
   * It only gets called when the component has already been created.
   * @override
   * @private
   * @memberof oj.ojRadioset
   */
  _setOption : function (key, value, flags)
  {
    var originalValue = this.options["labelledBy"];
 
    this._super(key, value, flags);
    
    switch (key)
    {
      case "disabled":
        this._propagateDisabled(value);
        break;
      case "labelledBy":
        // remove the old one and add the new one
        this._updateLabelledBy(originalValue, value, this.widget());
        break;
      default:
        break;
    }
  },
  /**
   * Performs post processing after _SetOption() is called. Different options when changed perform
   * different tasks. See _AfterSetOption[OptionName] method for details.
   *
   * @param {string} option
   * @param {Object|string=} previous
   * @param {Object=} flags
   * @protected
   * @memberof oj.ojRadioset
   * @instance
   * @override
   */
  _AfterSetOption : function (option, previous, flags)
  {
    this._superApply(arguments);
    switch (option)
    {
      case "required":
        this._AfterSetOptionRequired(option);
        break;
      default:
        break;
    }
  },
  //** @inheritdoc */
   getNodeBySubId: function(locator)
  {
    var node = this._super(locator),
        radios,
        subId,
        value;

    if (!node)
    {
      radios = this.$radios.get();
      subId = locator['subId'];
      
      switch (subId)
      {
        case 'oj-radioset-inputs': // TODO: depricated for a while now, remove this in 4.0.0
          node = radios;
          break;

        case 'oj-radioset-radio':
          // We find these by the value attribute on the input element, which is
          // much more stable that using an index.
          value = locator['value'];

          if (typeof value != 'undefined')
          {
            var arrayLength = radios.length;
            var matchIndex = -1;
            var radioValues = [];
                  
            // Find the index of the match
            for (var i = 0; i < arrayLength; i++)
            {
              // save the values just in case we need to do deep compare
              radioValues[i] = this._GetOptionValue(radios[i]);
              
              if (radioValues[i] === value)
              {
                matchIndex = i;
                break;
              }
            }
            // If not found, do a deep compare
            if (matchIndex === -1)
              for (i = 0; i < arrayLength; i++)
                if (oj.Object.compareValues(radioValues[i], value))
                {
                  matchIndex = i;
                  break;
                }

            if (matchIndex !== -1)
              node = radios[matchIndex];
          }
          break;
      }
    }

    // Non-null locators have to be handled by the component subclasses
    return node || null;
  },

  //** @inheritdoc */
  getSubIdByNode: function(node) {
    var topElem = this._GetContentElement()[0].parentElement.parentElement.parentElement;
    var currentNode = node;
    
    while (currentNode  && currentNode != topElem) {
      if (currentNode.nodeName == "LABEL")
        currentNode = document.getElementById(currentNode.for);
      
      if (currentNode.nodeName == "INPUT")
      {
        return {"subId":"oj-radioset-radio", "value":this._GetOptionValue(currentNode)};
      }

      currentNode = currentNode.parentElement;
    }
    return this._super(node);
  },

  /**
   * @ignore
   * @protected
   * @memberof oj.ojRadioset
   * @override
   */
  _destroy : function ()
  {  
    var ret = this._super();
    var wrapperDom = this.element[0].firstElementChild;
    
    if (this.$radios)
    {
      this.$radios._ojRadioCheckbox( "destroy" );
    }

    // remove the dom we added to wrap the children of this.element, but don't remove the children.
    $(wrapperDom).contents().unwrap();

    return ret;
  }
  /**** end internal widget functions ****/ 
 
  /**
   * Removes the radioset functionality completely. 
   * This will return the element back to its pre-init state.
   * 
   * <p>This method does not accept any arguments.
   * 
   * @method
   * @name oj.ojRadioset#destroy
   * @memberof oj.ojRadioset
   * @instance
   * @ignore
   * 
   * @example <caption>Invoke the <code class="prettyprint">destroy</code> method:</caption>
   * $( ".selector" ).ojRadioset( "destroy" );
   */
});

//////////////////     SUB-IDS     //////////////////


/**
 * <p>Sub-ID for the radioset's radios.</p>
 *
 * @ojsubid oj-radioset-inputs
 * @deprecated 4.0.0 Since the application supplies the input elements, it can supply a unique ID by which the input elements can be accessed.
 * @memberof oj.ojRadioset
 *
 * @example <caption>Get the nodes for the radios:</caption>
 * var nodes = $( ".selector" ).ojRadioset( "getNodeBySubId", {'subId': 'oj-radioset-inputs'} );
 */

  // Fragments:

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
   *       <td>Input</td>
   *       <td><kbd>Tap</kbd></td>
   *       <td>Select the input. In some themes, the input is not visible, 
   *       so you will tap on the label.</td>
   *     </tr>
   *     <tr>
   *       <td>Input's label</td>
   *       <td><kbd>Tap</kbd></td>
   *       <td>Select the corresponding input.</td>
   *     </tr> 
   *     <tr>
   *       <td>Input or Label</td>
   *       <td><kbd>Press & Hold</kbd></td>
   *       <td>If hints, help.instruction or messages exist in a notewindow, 
   *        pop up the notewindow.</td>
   *    </tr> 
   *   </tbody>
   * </table>
   *
   * 
   * @ojfragment touchDoc - Used in touch gesture section of classdesc, and standalone gesture doc
   * @memberof oj.ojRadioset
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
   *       <td rowspan="2">Input</td>
   *       <td><kbd>UpArrow</kbd></td>
   *       <td>Select the previous input in the group.</td>
   *     </tr>
   *     <tr>
   *       <td><kbd>DownArrow</kbd></td>
   *       <td>Select the next input in the group.</td>
   *     </tr>
   *     <tr>
   *       <td>Radioset</td>
   *       <td><kbd>Tab In</kbd></td>
   *       <td>Set focus to the checked radio input. If hints, title or messages exist in a notewindow, 
   *        pop up the notewindow.</td>
   *     </tr> 
   *   </tbody>
   * </table>
   *
   * @ojfragment keyboardDoc - Used in keyboard section of classdesc, and standalone gesture doc
   * @memberof oj.ojRadioset
   */

  /**
     * {@ojinclude "name":"ojStylingDocIntro"}
     * 
   * <table class="generic-table styling-table">
   *   <thead>
   *     <tr>
     *       <th>{@ojinclude "name":"ojStylingDocClassHeader"}</th>
     *       <th>{@ojinclude "name":"ojStylingDocDescriptionHeader"}</th>
     *       <th>{@ojinclude "name":"ojStylingDocExampleHeader"}</th>
   *     </tr>
   *   </thead>
   *   <tbody>
   *     <tr>
   *       <td>oj-choice-direction-column</td>
     *       <td>This is the default. It lays out the radios in a column.
     *       </td>
     *       <td>
   * <pre class="prettyprint">
   * <code>&lt;oj-radioset id="radiosetId" 
   *  class="oj-choice-direction-column">
   * </code></pre>
   *       </td>
   *     </tr>
   *     <tr>
   *       <td>oj-choice-direction-row</td>
     *       <td>It lays out the radio buttons in a row.
     *       </td>
     *       <td>
   * <pre class="prettyprint">
   * <code>&lt;oj-radioset id="radiosetId" 
   *  class="oj-choice-direction-row">
   * </code></pre>
   *       </td>
   *     </tr>   
   *     <tr>
   *       <td>oj-radioset-no-chrome</td>
   *       <td>Use this styleclass if you don't want the chrome around the set.
   *       </td>
   *       <td>
   * <pre class="prettyprint">
   * <code>&lt;oj-radioset id="radiosetId"
   *  class="oj-radioset-no-chrome">
   * </code></pre>
   *       </td>
   *     </tr>
   *     <tr>
   *       <td>oj-radioset-input-start</td>
   *       <td>Use this styleclass to order the radio at the start and label text at the end 
   *       even if a theme has a different default order.
   *       </td>
   *       <td>
   * <pre class="prettyprint">
   * <code>&lt;oj-radioset id="radiosetId"
   *  class="oj-radioset-input-start">
   * </code></pre>
   *       </td>
   *     </tr>
   *     <tr>
   *       <td>oj-radioset-input-end</td>
   *       <td>Use this styleclass to order the radio at the end and the label text at the start 
   *       even if a theme has a different default order.
   *       </td>
   *       <td>
   * <pre class="prettyprint">
   * <code>&lt;oj-radioset id="radiosetId" 
   *  class="oj-radioset-input-end">
   * </code></pre>
   *       </td>
   *     </tr>
   *   </tbody>
   * </table>
   *
   * @ojfragment stylingDoc - Used in Styling section of classdesc, and standalone Styling doc
   * @memberof oj.ojRadioset
   */

// -----------------------------------------------------------------------------
// "private static members" shared by all radiosets
// -----------------------------------------------------------------------------
/**
 * do not do a value change check in _SetValue
 */
var _sValueChangeCheckFalse = {doValueChangeCheck: false};

}());
(function() {
var ojRadiosetMeta = {
  "properties": {
    "disabled": {
      "type": "boolean"
    },
    "labelledBy": {
      "type": "string"
    },    
    "required": {
      "type": "boolean"
    },  
    "value": {
      "type": "any",
      "writeback": true
    }
  },
  "methods": {
    "validate": {}
  },
  "extension": {
    _WIDGET_NAME: "ojRadioset"
  }
};
oj.CustomElementBridge.registerMetadata('oj-radioset', 'editableValue', ojRadiosetMeta);
oj.CustomElementBridge.register('oj-radioset', {'metadata': oj.CustomElementBridge.getMetadata('oj-radioset')});
})();
});

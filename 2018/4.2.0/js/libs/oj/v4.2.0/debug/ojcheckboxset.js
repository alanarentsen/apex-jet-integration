/**
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";
define(['ojs/ojcore', 'jquery', 'ojs/ojeditablevalue', 'ojs/ojradiocheckbox', 'ojs/ojoption'], 
       /*
        * @param {Object} oj 
        * @param {jQuery} $
        */
       function(oj, $)
{

/**
 * Copyright (c) 2014, Oracle and/or its affiliates.
 * All rights reserved.
 */
(function() {

/*!
 * JET Checkboxset @VERSION
 */
/**
 * @ojcomponent oj.ojCheckboxset
 * @augments oj.editableValue
 * @since 0.6
 * @ojshortdesc Checkbox Set Element
 * @ojrole checkbox
 * @ojrole checkboxgroup
 * @ojrole option
 * @ojdisplayname Checkbox Set
 * @ojstatus preview
 * @classdesc
 * <h3 id="checkboxsetOverview-section">
 *   JET Checkboxset
 *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#checkboxsetOverview-section"></a>
 * </h3> 
 * <p>
 * The JET oj-checkboxset component manages a set of
 * <code class="prettyprint">oj-option</code> child elements and creates the necessary dom elements for
 * the actual checkboxes.
 * </p>
 * <p>To use an oj-oheckboxset, add one or more oj-option child elements for each checkbox desired. 
 * Note, if you add or remove an oj-option after the oj-checkboxset is rendered, you should call
 * refresh() on the oj-checkboxset.
 * </p>
 * <p>
 *  You can enable and disable an oj-checkboxset,
 *  which will enable and disable all contained checkboxes.
 * </p>
 * <p>
 *  oj-checkboxset does not have a readonly attribute since HTML does not support
 *  readonly on radios and checkboxes.
 * </p>
 * <p>Use <code class="prettyprint">labelled-by</code> to associate an oj-label with
 * the checkboxset component. Doing this also makes the checkboxset accessible.
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
 * <p>JET Checkboxset takes care of setting <code class="prettyprint">role="group"</code>
 * on the oj-checkboxset element.
 *
 * <p>As shown in the online demos, the application is responsible for applying
 * <code class="prettyprint">labelled-by</code>
 * to point to an <code class="prettyprint">oj-label</code> element for the oj-checkboxset.
 * <p>Disabled content: JET supports an accessible luminosity contrast ratio,
 * as specified in <a href="http://www.w3.org/TR/WCAG20/#visual-audio-contrast-contrast">WCAG 2.0 - Section 1.4.3 "Contrast"</a>,
 * in the themes that are accessible.  (See the "Theming" chapter of the JET Developer Guide for more information on which
 * themes are accessible.)  Note that Section 1.4.3 says that text or images of text that are part of an inactive user
 * interface component have no contrast requirement.  Because disabled content may not meet the minimum contrast ratio
 * required of enabled content, it cannot be used to convey meaningful information.<p>
 * <h3 id="label-section">
 *   Label and Checkboxset
 *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#label-section"></a>
 * </h3>
 * <p>
 * For accessibility, you should associate an oj-label element with the checkboxset
 * by putting an <code class="prettyprint">id</code> on the oj-label, and then setting the
 * <code class="prettyprint">labelled-by</code> attribute on the oj-checkboxset to be the
 * oj-label's <code class="prettyprint">id</code>.
 * </p>
 * <h3 id="styling-section">
 *   Styling
 *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#styling-section"></a>
 * </h3>
 * {@ojinclude "name":"stylingDoc"}
 *
 * @example <caption>Initialize the checkboxset with no attributes specified:</caption>
 * &lt;oj-checkboxset id="colorCheckbox" value="{{currentColor}}">
 *   &lt;oj-option value="blue">Blue&lt;/oj-option>
 *   &lt;oj-option value="green">Green&lt;/oj-option>
 * &lt;/oj-checkboxset>
 *
 * @example <caption>Initialize component and an associated oj-label component</caption>
 * &lt;oj-label id="grouplabel">Greetings&lt;/oj-label>
 * &lt;oj-checkboxset id="checkboxset" labelled-by="grouplabel" value="{{currentGreeting}}">
 *   &lt;oj-option id="helloid" value="hello">Hello&lt;/oj-option>
 *   &lt;oj-option id="bonjourid" value="bonjour"/>Bonjour&lt;/oj-option>
 *   &lt;oj-option id="ciaoid" value="ciao"/>Ciao&lt;/oj-option>
 * &lt;/oj-checkboxset>
 * <br/>
 * // set the value to "ciao". (The 'ciao' checkbox will be checked)
 * myComp.value = ["ciao"];
 *
 * @example <caption>Initialize an oj-checkboxset via the JET component binding:</caption>
 * &lt;oj-label id="grouplabel">Time&lt;/oj-label>
 * &lt;oj-checkboxset id="checkboxset" value="{{checkboxsetValue}}" 
 *                    labelled-by="grouplabel">
 *   &lt;oj-option id="morningid" value="morning">Morning&lt;/oj-option>
 *   &lt;oj-option id="nightid" value="night">Night&lt;/oj-option>
 * &lt;/oj-checkboxset>
 */
oj.__registerWidget("oj.ojCheckboxset", $['oj']['editableValue'],
{
  version : "1.0.0",
  defaultElement : "<div>",
  widgetEventPrefix : "oj",
  options :
  {
     /**
     * <p>
     * Disabled <code class="prettyprint">true</code> disables the component and disables
     * all the inputs/labels.
     * Disabled <code class="prettyprint">false</code> enables the component, and leaves the inputs
     * disabled state as it is in the dom.
     * <p>
     *
     * @example <caption>Initialize component with <code class="prettyprint">disabled</code> attribute:</caption>
     * &lt;oj-checkboxset disabled>
     *   &lt;oj-option value="blue">Blue&lt;/oj-option>
     * &lt;/oj-checkboxset>
     *
     * @example <caption>Get or set the <code class="prettyprint">disabled</code> property after initialization:</caption>
     * // getter
     * var disabled = myComp.disabled;
     *
     * // setter
     * myComp.disabled = false;
     *
     * @expose
     * @type {boolean|undefined}
     * @default false
     * @public
     * @instance
     * @memberof oj.ojCheckboxset
     */
    disabled: false,
     /**
     * labelled-by is used to establish a relationship between this component and another element.
     * A common use is to tie the oj-label and the oj-checkboxset together.
     * The oj-label custom element has an id, and you use the labelled-by attribute
     * to tie the two components together.
     *
     * @example <caption>Initialize component with <code class="prettyprint">labelled-by</code> attribute:</caption>
     * &lt;oj-label id="labelId">Name:&lt;/oj-label>
     * &lt;oj-checkboxset labelled-by="labelId">
     *   &lt;oj-option value="blue">Blue&lt;/oj-option>
     * &lt;/oj-checkboxset>
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
     * @memberof oj.ojCheckboxset
     */
    labelledBy: null,  
    /** 
     * Whether the component is required or optional. When required is set to true, an implicit 
     * required validator is created using the validator factory - 
     * <code class="prettyprint">oj.Validation.validatorFactory(oj.ValidatorFactory.VALIDATOR_TYPE_REQUIRED).createValidator()</code>.
     * 
     * Translations specified using the <code class="prettyprint">translations.required</code> attribute 
     * and the label associated with the component, are passed through to the options parameter of the 
     * createValidator method. 
     * 
     * <p>
     * When <code class="prettyprint">required</code> property changes due to programmatic intervention, 
     * the component may clears message and run validation, based on the current state it's in. </br>
     *  
     * <h4>Running Validation</h4>
     * <ul>
     * <li>if component is valid when required is set to true, then it runs deferred validation on 
     * the value property. This is to ensure errors are not flagged unnecessarily.
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
     *   property is updated; page author can listen to the <code class="prettyprint">onValueChanged</code> 
     *   event to clear custom errors.</li>
     * </ul>
     * </li>
     * </ul>
     * 
     * <h4>Clearing Messages</h4>
     * <ul>
     * <li>Only messages created by the component are cleared.</li>
     * <li><code class="prettyprint">messagesCustom</code> property is not cleared.</li>
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
     * when the option is not set, the element's required property is used as its initial 
     * value if it exists.
     * 
     * @example <caption>Initialize the component with the <code class="prettyprint">required</code> attribute:</caption>
     * &lt;oj-checkboxset required>
     *   &lt;oj-option value="blue">Blue&lt;/oj-option>
     * &lt;/oj-checkboxset>
     * 
     * @example <caption>Customize messages and hints used by implicit required validator when 
     * <code class="prettyprint">required</code> option is set:</caption> 
     * &lt;oj-checkboxset required value="{{colors}}"
     *                    translations='{"required":
     *                                    {"hint": "custom: check at least one value",
     *                                     "messageSummary": "custom: \'{label}\' is Required",
     *                                     "messageDetail", "custom: please check at least one value for \'{label}\'"}}'>
     *   &lt;oj-option value="blue">Blue&lt;/oj-option>
     * &lt;/oj-checkboxset>
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
     * @memberof oj.ojCheckboxset
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
     * When <code class="prettyprint">value</code> property changes due to programmatic
     * intervention, the component always clears all messages and runs deferred validation, and
     * always refreshes UI display value.</br>
     * 
     * When the option is not set, value is set to an array built from the checked checkboxes, if
     * any are checked.
     *
     * <h4>Clearing Messages</h4>
     * <ul>
     * <li>All messages are cleared. This includes
     * the <code class="prettyprint">messagesCustom</code> property.</li>
     * </ul>
     *
     *
     * <h4>Running Validation</h4>
     * <ul>
     * <li>component always runs deferred validation</li>
     * </ul>
     * </p>
     *
     * @example <caption>Initialize the component with the <code class="prettyprint">value</code> attribute specified:</caption>
     * &lt;oj-checkboxset required value='["coffee"]'>
     *   &lt;oj-option value="coffee">Coffee&lt;/oj-option>
     *   &lt;oj-option value="tea">Tea&lt;/oj-option>
     * &lt;/oj-checkboxset>
     * @example <caption>Get or set <code class="prettyprint">value</code> option, after initialization:</caption>
     * // Getter: returns ["coffee"]
     * var val = myComp.value;
     * // Setter: sets ["coffee", "tea"]
     * myComp.value = ["coffee", "tea"];
     *
     * @expose
     * @access public
     * @instance
     * @memberof oj.ojCheckboxset
     * @type {Array.<*>|undefined}
     */
    value: undefined
  },
  /**** start Public APIs ****/

   /**
   * Refreshes the checkboxset
   * <p>A <code class="prettyprint">refresh()</code> or re-init is required
   * when a checkboxset is programatically changed, like in the following circumstances:
   * <ul>
   *   <li>After oj-options are added or removed.</li>
   * </ul>
   * 
   * @example <caption>Invoke the <code class="prettyprint">refresh</code> method:</caption>
   * myComp.refresh();
   * 
   * @expose
   * @public
   * @memberof oj.ojCheckboxset
   * @instance
   */
  refresh: function()
  {
    this._super();
    this._setup();
  },
  /**
   * Returns a jQuery object containing the element visually representing the checkboxset.
   *
   * <p>This method does not accept any arguments.
   *
   * @expose
   * @memberof oj.ojCheckboxset
   * @instance
   * @public
   * @return {jQuery} the checkbox
   * @ignore
  */
  widget : function ()
  {
    return this.uiCheckboxset;
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
   * @memberof oj.ojCheckboxset
   * @since 4.0.0
   * @ojstatus preview
   */
  validate : oj.EditableValueUtils.validate,

   /**** end Public APIs ****/

  /**** start internal widget functions ****/

  /**
   * Overridden to set the options.value. When constructorOptions value is undefined,
   * we read the CHECKED options on the checkboxes and build the value array from that.
   *
   * @memberof oj.ojCheckboxset
   * @instance
   * @protected
   */
  _InitOptions : function (originalDefaults, constructorOptions)
  {
    var checkedValues = new Array(), selectedCheckbox, domValue,
        props = [{attribute: "disabled", validateOption: true},
                 {attribute: "title"},
                 //{attribute: "value", "defaultValue": null},  // code below sets value
                 {attribute: "required", coerceDomValue: true, validateOption: true
                 }];

    this._super(originalDefaults, constructorOptions);
    
    
    if (!this._IsCustomElement())
    {
      oj.EditableValueUtils.initializeOptionsFromDom(props, constructorOptions, this);
    }

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
    if (!this._IsCustomElement())
    {
      if (constructorOptions['value'] === undefined)
      {
        // constructor option for value is undefined. Then we check the dom.
        this.$checkboxes = this._findCheckboxesWithMatchingName();
        selectedCheckbox = this.$checkboxes.filter(":checked");
        if (selectedCheckbox.length > 0)
        {
          selectedCheckbox.each(function(){
            checkedValues.push($(this).val());
          });
          domValue = checkedValues;

          // when defaulting from DOM we want to trigger optionChange to writeback new value

          this.option("value", domValue, {'_context':{writeback: true, internalSet: true}});
        }
        // if nothing is checked, we leave this.options["value"] as it is if not undefined, else
          // the widget's default is [].
          if (this.options["value"] === undefined)
            this.options["value"] = [];

      }
      else
      {
        this._checkValueType(this.options["value"]);
      }
    }
    else
      this._checkValueType(this.options["value"]);
  },
  /**
   * After _ComponentCreate and _AfterCreate,
   * the widget should be 100% set up. this._super should be called first.
   * @override
   * @protected
   * @memberof oj.ojCheckboxset
   * @instance
   */
  _ComponentCreate : function ()
  {
    var element = this.element;
    this._super();
    // first check to see if element is NOT a fieldset. If fieldset, throw error.
    if (element.is("fieldset"))
    {
      throw new Error("ojCheckboxset cannot be bound to a fieldset. Use a div instead.");
    }
    
    // since the oj-option renderer uses the oj-checkboxset ID for the name
    // attribute of the rendered chekcboxes, let's make sure the checkboxset
    // has an ID
    element.uniqueId();
    this._processOjOptions();
    // The processOjOptions renders input/label, so we need to go through and 
    // get the this.$checkboxes after this is called.
    this.$checkboxes = this._findCheckboxesWithMatchingName();
    // Turn each checkbox into ojCheckbox. Do this first, since we need it
    // in calls from 'create'. Also, since ojCheckboxSet delegates to the _ojRadioCheckbox
    // component, and we need to mark this as an internal node so that oj.Components.getComponentElementByNode
    // knows it is an internal component in this case, not a stand-alone component
    this.$checkboxes._ojRadioCheckbox().attr('data-oj-internal', '');
 
    // keep the root dom element and slots as is, and add a wrapper dom underneath it. This way we can
    // have one div around all the inputs and labels, and for inline messaging we can have another
    // div around the inline messaging content. And we can style the borders of the two boxes differently.
    this.uiCheckboxset = element.addClass("oj-checkboxset oj-component").attr( "role", "group" );
    // need to grab all elements using childNodes first and then do filter because jquery children will automatically 
    // exclude all comment and text nodes
    $(element.get(0).childNodes).filter(function(){
        return (this.getAttribute && this.getAttribute("slot") === 'contextMenu') ? false : true;
    }).wrapAll("<div class='oj-checkboxset-wrapper'></div>"); //@HTMLUpdateOK

    this._on(this._events);
    this._setup();
    
  },
    /**
   * Resets this.checkboxes. This is called at the beginning of a refresh in EditableValue
   * @override
   * @memberof oj.ojCheckboxset
   * @instance
   * @protected
   */
  _ResetComponentState : function ()
  {
    // we could have added, removed, or modified radios, so we need to re-find all the
    // oj-options, inputs on refresh and turn the ones that aren't already 
    // ojRadioCheckboxes into them.
    this._processOjOptions();
    this.$checkboxes = this._findCheckboxesWithMatchingName();

     // we have a rule for refresh: if we have a public API for it, then the app dev has to use the
    // option, and not expect changing the dom will update the state with refresh.
    // However, ojCheckboxset does not expose a public API for the individual checkbox's disabled state
    // to the app developer. Our private ojRadioCheckbox component has a disabled option that
    // our code has access to.
    // For each checkbox, we need to look at the disabled attribute dom and update the
    // ojradiocheckbox's disabled option.

    // !! ensures it is a boolean
    // update the private ojradiocheckbox component's disabled option to keep it in sync with the dom
    this.$checkboxes.filter( ".oj-checkbox" ).each(function()
    {
        var disabledValue = $( this ).attr("disabled") !== undefined ?
          !!$( this ).prop("disabled") : false;
        $( this )._ojRadioCheckbox("option", "disabled", disabledValue);
    });

    // no need to refresh the ojRadioCheckbox's that exist since we have options for everything.
    // of the type=radio inputs that are not yet ojRadioCheckboxs, make them ojRadioCheckboxes.

    // create ojRadioCheckboxes on any new ones.
    this.$checkboxes.not(".oj-checkbox")._ojRadioCheckbox();
    
  },

  /**
   * Sets focus on the element that naturally gets focus. For checkboxset, this is the first checkbox <br/>
   *
   * @returns {*} a truthy value if focus was set to the intended element, a falsey value
   * otherwise.
   * @override
   * @memberof oj.ojCheckboxset
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
   * Sets the disabled option onto the dom.
   * This is a no-op for checkboxset since its root dom element is a div, and disabled is
   * invalid on a div. If we did try to set disabled on the div, then restore attributes doesn't
   * work correctly since it wasn't saved correctly.
   * @param {Object} node - dom node
   *
   * @memberof oj.ojCheckboxset
   * @instance
   * @protected
   * @since 1.0.0
   */
  _SetDisabledDom : function(node)
  {
    // no-op
  },
  /**
   * Whether the component is required.
   * 
   * @return {boolean} true if required; false
   * 
   * @memberof oj.ojCheckboxset
   * @instance
   * @protected
   * @override
   */
  _IsRequired : function () 
  {
    return this.options['required'];
  },
  /**
   * @memberof oj.ojCheckboxset
   * @instance
   * @private
   */
  _refreshRequired : oj.EditableValueUtils._refreshRequired,
  
  /**
   * the validate method from v3.x that returns a boolean
   * @memberof oj.ojCheckboxset
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
      var renderer = this._customOptionRenderer.bind(this)
      var options = this.element.children("oj-option");
      if (options.length > 0) 
      {
        for (i = 0, len = options.length; i < len; i++) {
          options[i]["customOptionRenderer"] = renderer;
        }
      }

      // for oj-option that are inside the wrapper (after refresh)
      options = this.element.children(".oj-checkboxset-wrapper").find("oj-option");
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

    $(ojoption).uniqueId(); // let's make sure that each oj-option has an ID so the
                            // label element can reference the input element via the 'for' attribute
    var id = ojoption.getAttribute("id");
    var checkboxId = id+"|cb";
    var checkbox = document.getElementById(checkboxId);
    var alreadyProcessed = (checkbox !== null); // Was the oj-option already processed
    
    // if the oj-option is already processed, we don't need to add the additional dom
    // in the code below, we use setAttribute() for everything as we want to be
    // setting the initial value for these elements.
    if (!alreadyProcessed)
    {
      span = document.createElement("span");
      checkbox = document.createElement("input");
      label = document.createElement("label");
      span.setAttribute("class", "oj-choice-item");
      checkbox.setAttribute("type", "checkbox");
      checkbox.setAttribute("id", checkboxId);
      label.setAttribute("for", checkboxId);
      ojoption.parentElement.insertBefore(span, ojoption);//@HTMLUpdateOK
      label.appendChild(ojoption); // append the oj-option as a child of label
      span.appendChild(checkbox);
      span.appendChild(label);
    }

    var name = this.element[0].id; // Use the id of the ojcheckboxset as the name of the oj-options.
    var ariaLabel = ojoption.getAttribute("aria-label");
    var ariaLabelledBy = ojoption.getAttribute("aria-labelledby")

    // The value attribute of the checkbox only supports text, so we need to be
    // able to access the oj-option's value property instead.  This attribute
    // is a link back to the oj-option so that we don't need to use dom traversal
    // to get to the oj-option to get its value.
    checkbox.setAttribute("data-oj-option-id", id);

    if (name && name != "")
      checkbox.setAttribute("name", name);
    else
      checkbox.removeAttribute("name");

    if (ariaLabel && ariaLabel != "")
      checkbox.setAttribute("aria-label", ariaLabel);
    else
      checkbox.removeAttribute("aria-label");

    if (ariaLabelledBy && ariaLabelledBy != "")
      checkbox.setAttribute("aria-labelledby", ariaLabelledBy);
    else
      checkbox.removeAttribute("aria-labelledby");

    if (ojoption.disabled)
      checkbox.setAttribute("disabled", true);
    else
      checkbox.removeAttribute("disabled");
    
    // When an oj-option child is disabled (by setting the disabled attribute to
    // true) and it re-renders, the component should refresh automatically rather than requiring the
    // user to call refresh. See .   
    if (alreadyProcessed)
    {
      $(checkbox)._ojRadioCheckbox("option", "disabled", ojoption.disabled);
    }
  },
  /**
   * If custom element, get the labelledBy option, and set this 
   * onto the root dom element as aria-labelledby. We append "|label" so it matches the id that
   * is on the oj-label's label element.
   * @memberof oj.ojCheckboxset
   * @instance
   * @private
   */
  _updateLabelledBy : oj.EditableValueUtils._updateLabelledBy,
  /**
   * Returns a jquery object that is a set of elements that are input type checkbox
   * and have the name of the first checkbox found.
   *
   * @return {jQuery} jquery object of all the checkboxes within the root dom element
   * that have the same 'name' attribute as the first checkbox found.
   * @private
   * @memberof oj.ojCheckboxset
   */
  _findCheckboxesWithMatchingName : function ()

  {
    var allcheckboxes;
    var $first = this.element.find("input[type=checkbox]:first");
    var name;
    var selector;
    
    if ($first.length === 0)
    {
      oj.Logger.warn("Could not find any input type=checkbox within this element");
    }
    // get the name attribute of the first input checkbox
    name = $first.attr("name");
    // find all input checkboxes with matching name
    if (name === undefined)
    {
      // search for all checkboxes with no name
      allcheckboxes = this.element.find("input[type=checkbox]");
      // now loop and find the ones without 'name' attribute
      return allcheckboxes.not("[name]");
    }
    else
    {
      // search for all checkboxes with the name
      selector = "input[type=checkbox][name=" + name + "]";
      return this.element.find(selector);

    }
  },

  // Override to set custom launcher
  _NotifyContextMenuGesture: function(menu, event, eventType)
  {
    // Setting the launcher to the first tabbable checkbox in the set.
    // Component owner should feel free to specify a different launcher if appropriate,
    // e.g. could specify the "current" checkbox rather than the first if desired.
    // See the superclass JSDoc for _OpenContextMenu for tips on choosing a launcher.
    var launcher = this.element.find("input[type=checkbox]:tabbable").first();
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
   * @memberof oj.ojCheckboxset
   * @instance
   * @private
   */
  _setup: function()
  {
     // at this point we already have this.$checkboxes set to a list of checkboxes for this
     // checkboxset
    this._propagateDisabled(this.options.disabled );

    if (this.$checkboxes !== null)
    {
      if (this.$checkboxes.length === 1)
      {
        this.element.addClass("oj-checkboxset-single");
      }
      else
      {
        this.element.removeClass("oj-checkboxset-single");
      }
    }
    
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
   * If value is undefined, set it to the default value, which is [].
   * Else, confirm it is an Array and throw an error if it isn't.
   * @memberof oj.ojCheckboxset
   * @instance
   * @private
   * @param {Object|null|undefined} value the value to check
   * @throws new Error if value (undefined is converted to an []) isn't an Array 
   */
  _checkValueType: function(value)
  {
    // if value is undefined, set it to its default value [].
    if (value === undefined)
    {

      this.option("value", [], {'_context':{writeback: true, internalSet: true}});
    }
    else
    {
      this._confirmValueIsArray(value);
    }

  }, 
  /**
   * Confirm value is an Array.
   * @memberof oj.ojCheckboxset
   * @instance
   * @private
   * @param {Object|null|undefined} value the value to check
   * @throws new Error if value isn't an Array
   */
  _confirmValueIsArray: function(value)
  {
    if (!Array.isArray(value))
    {
      throw new Error("Invalid 'value' set on JET Checkboxset: " + value + ".It must be an Array. ");
    }
  },
  /**
   * @param {Event} event DOM event
   * @override
   * @protected
   * @memberof oj.ojCheckboxset
   */
  _HandleChangeEvent: function(event)
  {
    var submittedValue;
    var checkboxes;
    
    // keep oj-selected in sync with the input element's checked state
    checkboxes = this.$checkboxes;
    if (checkboxes.length > 0)
    {
      checkboxes.each(function(){
        if (this === event.target) {
          // the target is one of the checkboxes. Update the oj-selected class to keep it 
          // in sync with the input's HTML checked attribute
          $(this)._ojRadioCheckbox("setSelectedClass", event.target.checked);
        }
      });
    }
    // run full validation. There is no need to check if values have changed
    // since for checkboxset/radioset if we get into this function we know value has changed.
    // passing in doValueChangeCheck: false will skip the new-old value comparison
    submittedValue = this._GetDisplayValue();
    this._SetValue(submittedValue, event, _sValueChangeCheckFalse);
  },

  /**
   * Returns the display value that is ready to be passed to the converter.
   *
   * @param {Object} value the stored value if available that needs to be formatted for display
   * @override
   * @protected
   * @memberof oj.ojCheckboxset
   */
  _GetDisplayValue : function (value)
  {
    // return the value of the 'checked' checkboxes
    return this._GetElementValue();
  },
  /**
   * Called when the display value on the element needs to be updated
   * as a result of a value change.
   * ojCheckboxset stores an Array value, and this value matches the values
   * of the currently checked checkboxes. So, if we need to set the display value,
   * what this means is we need to 'check' the checkboxes whose values match the
   * displayValue and 'uncheck' those that don't.
   *
   * @param {Array} displayValueArray an Array of values that need to be checked, e.g., ["red","blue"].
   *  Any checkbox in the checkboxset that doesn't match one of the checkBoxes needs to be unchecked
   *  if it isn't already.
   * @override
   * @protected
   * @throws new Error if displayValueArray is not an Array
   * @memberof oj.ojCheckboxset
  */
 _SetDisplayValue : function (displayValueArray)
  {
    var i;
    var length = this.$checkboxes.length;
    var optionValue;
    var checkbox;
    var $checkbox;
    
    this._checkValueType(displayValueArray);
      
    // If it is empty or not an array, then set all the _ojRadioCheckboxes's checked option to false.
    // _GetDisplayValue gets the checked options and creates an Array from it.
    if (displayValueArray === null || displayValueArray === undefined || 
        displayValueArray.length === 0)
    {
      this.$checkboxes._ojRadioCheckbox("option", "checked", false);
    }
    else
    {
      // go through each _ojRadioCheckbox and see if it needs to be checked or unchecked.
      for (i = 0; i < length; i++)
      {
        checkbox = this.$checkboxes[i];
        $checkbox = $(checkbox);
        optionValue = this._GetOptionValue(checkbox);
        // does the checkbox's value exist in the checkedBoxes array?
        var index = this._GetOptionIndex(displayValueArray, optionValue);
        var checked = $checkbox._ojRadioCheckbox("option", "checked"); 
        
        if (index !== -1)
        {
          // yes. this needs to be checked, if it isn't already
          if (!checked)
          {
            $checkbox._ojRadioCheckbox("option", "checked", true);
          }
        }
        else
        {
          /// no. this needs to be unchecked, if it isn't already
          if (checked)
          {
            $checkbox._ojRadioCheckbox("option", "checked", false);
          }
        }
      }
    }
  },
  /**
   * Returns the element's value. Normally, this is a call to this.element.val(),
   * but in the case of ojCheckboxset, the element's value is really the value
   * of the checked checkboxes in the set.
   * @override
   * @protected
   * @memberof oj.ojCheckboxset
   * @return {Array} An Array<any> of selected values or the empty array [] if nothing selected.
   */
  _GetElementValue : function ()
  {
    // "input:checked" selects checkboxes that are currently checked as
    // reflected in their boolean (true or false) checked property,
    // which is affected when the user clicks the checkbox for example.
    // for checkboxset, there will be zero or more checked;
    var self = this;
    var checkedValues=new Array();
    var selectedCheckboxes = this.$checkboxes.filter(":checked");
    if (selectedCheckboxes.length === 0)
      return [];
    else
    {
      selectedCheckboxes.each(function(){checkedValues.push(self._GetOptionValue(this))});
      return checkedValues;
    }
  },

  /**
   * Returns the index of the array that matches the optionValue. First check
   * equality with ===, then if not found, check with deep compare,
   * oj.Object.compareValues(), because values can be objects or arrays.
   * @override
   * @protected
   * @memberof oj.ojCheckboxset
   */
  _GetOptionIndex : function (optionValueArray, optionValue)
  {
    // Find the matching value via === comparison that indexOf uses
    var matchIndex = optionValueArray.indexOf(optionValue);
    var length;

    // If not found via indexOf(), do a deep equals compare
    if (matchIndex == -1)
    {
      length = optionValueArray.length;
      for (var i = 0; i < length; i++)
      {
        if (oj.Object.compareValues(optionValueArray[i], optionValue))
        {
          matchIndex = i;
          break;
        }
      }
    }
    
    return matchIndex;
  },
  /**
   * For custom element, we get the value from the oj-option element, otherwise
   * we get the value from the checkbox element.
   * @override
   * @protected
   * @memberof oj.ojCheckboxset
   * @return {*} Returns the value property of the associated oj-option, or the value attribute of the checkbox element.
   */
  _GetOptionValue : function (checkboxElem)
  {
    var option;
    var val;
    
    if (this._IsCustomElement())
    {
      option = document.getElementById(checkboxElem.getAttribute("data-oj-option-id"));

      if (option)
      {
        val = option.value;
      }
    }
    else
    {
      val = checkboxElem.value;
    }
    
    return val;
  },

  /**
   * Returns the default styleclass for the component. Currently this is
   * used to pass to the ojLabel component, which will append -label and
   * add the style class onto the label. This way we can style the label
   * specific to the input component. For example, for inline labels, the
   * checkboxset/checkboxset components need to have margin-top:0, whereas all the
   * other inputs need it to be .5em. So we'll have a special margin-top style
   * for .oj-label-inline.oj-checkboxset-label
   * All input components must override
   *
   * @return {string}
   * @memberof oj.ojCheckboxset
   * @override
   * @protected
   */
  _GetDefaultStyleClass : function ()
  {
    return "oj-checkboxset";
  },
  /**
   * Returns a jquery object of the elements representing the content nodes (checkboxes/labels).
   * @protected
   * @override
   * @memberof oj.ojCheckboxset
   */
  _GetContentElement : function ()
  {
    if (this.$checkboxes != null)
      return this.$checkboxes;
    else
    {
      this.$checkboxes = this._findCheckboxesWithMatchingName();
      return this.$checkboxes;
    }
  },

  /**
   * Called to find out if aria-required is unsupported. This is needed for the label.
   * It is not legal to have aria-required on radio/checkboxes, nor on
   * radiogroup/group.
   * If aria-required is not supported, then we wrap the required icon as well as the
   * help icons so that JAWS can read required. We don't do this for form controls that use
   * aria-required because if we did JAWS would read required twice.
   * @memberof oj.ojCheckboxset
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
   * @memberof oj.ojCheckboxset
   * @instance
   * @protected
   */
  _AfterSetOptionRequired : oj.EditableValueUtils._AfterSetOptionRequired,

  /**
   * 
   * @param {boolean} disabled
   * @private
   * @memberof oj.ojCheckboxset
   */
  _propagateDisabled: function( disabled ) {
      disabled = !!disabled;
      this.$checkboxes.each(function()
      {
        // this is the technique to use to call package-private functions
        // Calling it like this.$radios.ojRadioCheckbox("__setAncestorComponentDisabled",value)
        // gives an error because jquery prevents you from calling functions with an "_"
        //
        // This is how we handle 'disabled' for the checkboxset. We don't change the radiocheckbox
        // component's disabled option ever since if we do that we've lost what the initial disabled
        // state is (we store the disabled dom value from the radio into its disabled option)
        // and we need that when we refresh. Instead what we do
        // is we mark if its ancestor (the checkboxset) is disabled or not. Then, when we render
        // out the checkboxes 'disabled' state, like oj-disabled, we look to see if it is 'effectively
        // disabled' (see _IsEffectivelyDisabled call in ojRadioCheckbox), that is if its
        // option is disabled OR its ancestor (the checkboxset) is disabled.
        $( this ).data("oj-_ojRadioCheckbox").__setAncestorComponentDisabled(disabled);
      });

      this.$checkboxes._ojRadioCheckbox("refreshDisabled"); // re-render disabled
  },
  /**
   * @override
   * @private
   * @memberof oj.ojCheckboxset
   */
  _setOption : function (key, value, flags)
  {
    var originalValue = this.options["labelledBy"];;
 
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
   * @memberof oj.ojCheckboxset
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
        checkboxes,
        subId,
        value;

    if (!node)
    {
      checkboxes = this.$checkboxes.get();
      subId = locator['subId'];
      
      switch (subId)
      {
        case 'oj-checkboxset-inputs': // TODO: depricated for a while now, remove this in 4.0.0
          node = checkboxes;
          break;

        case 'oj-checkboxset-checkbox':
          // We find these by the value attribute on the input element, which is
          // much more stable that using an index.
          value = locator['value'];

          if (typeof value != 'undefined')
          {
            var arrayLength = checkboxes.length;
            var i;
            var matchIndex = -1;
            var checkboxValues = [];

            // Build the values array
            for (i = 0; i < arrayLength; i++)
              checkboxValues[i] = this._GetOptionValue(checkboxes[i]);        
            
            // Find the index of the matching value.
            matchIndex = this._GetOptionIndex(checkboxValues, value);
            
            if (matchIndex !== -1)
              node = checkboxes[matchIndex];
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
        return {"subId":"oj-checkboxset-checkbox", "value":this._GetOptionValue(currentNode)};
      }

      currentNode = currentNode.parentElement;
    }
    
    return this._super(node);
  },

  /**
   * @ignore
   * @protected
   * @memberof oj.ojCheckboxset
   * @override
   */
  _destroy : function ()
  {
    var ret = this._super();
    var wrapperDom = this.element[0].firstElementChild;
    
    if (this.$checkboxes)
    {
      this.$checkboxes._ojRadioCheckbox( "destroy" );
    }
    
    // remove the dom we added to wrap the children of this.element, but don't remove the children.
    $(wrapperDom).contents().unwrap();
    
    return ret;
  }
  /**** end internal widget functions ****/
   /**
   * Removes the checkboxset functionality completely.
   * This will return the element back to its pre-init state.
   *
   * <p>This method does not accept any arguments.
   *
   * @method
   * @name oj.ojCheckboxset#destroy
   * @memberof oj.ojCheckboxset
   * @instance
   * @ignore
   *
   * @example <caption>Invoke the <code class="prettyprint">destroy</code> method:</caption>
   * $( ".selector" ).ojCheckboxset( "destroy" );
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
   *    <tr>
   *       <td>Checkbox</td>
   *       <td><kbd>Tap</kbd></td>
   *       <td> Select/unselect the input</td>
   *     </tr>
   *     <tr>
   *       <td>Input's Label</td>
   *       <td><kbd>Tap</kbd></td>
   *       <td> Select/unselect the corresponding input</td>
   *    </tr>
   *     <tr>
   *       <td>Input or Label</td>
   *       <td><kbd>Press & Hold</kbd></td>
   *       <td>If hints, help.instruction or messages exist in a notewindow, 
     *           pop up the notewindow.</td>
   *    </tr>
   *   </tbody>
   *  </table>
   *
   *
   * @ojfragment touchDoc - Used in touch gesture section of classdesc, and standalone gesture doc
   * @memberof oj.ojCheckboxset
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
   *       <td>Checkboxset</td>
   *       <td><kbd>Tab In</kbd></td>
   *       <td>Set focus to the first item in the checkboxset. 
   *       If hints, helpInstruction or messages exist in a notewindow, 
   *        pop up the notewindow.</td>
   *     </tr> 
   *   </tbody>
   * </table>
   *
   *
   * @ojfragment keyboardDoc - Used in keyboard section of classdesc, and standalone gesture doc
   * @memberof oj.ojCheckboxset
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
     *       <td>This is the default. It lays out the checkboxes in a column.
     *       </td>
     *       <td>
     * <pre class="prettyprint">
     * <code>&lt;oj-checkboxset id="checkboxsetId" 
     *  class="oj-checkboxset-direction-column">
     * </code></pre>
     *       </td>
     *     </tr>
     *     <tr>
     *       <td>oj-choice-direction-row</td>
     *       <td>It lays out the checkboxes in a row.
     *       </td>
     *       <td>
     * <pre class="prettyprint">
     * <code>&lt;oj-checkboxset id="checkboxsetId" 
     *   class="oj-choice-direction-row">
     * </code></pre>
     *       </td>
     *     </tr>
     *     <tr>
     *       <td>oj-checkboxset-no-chrome</td>
     *       <td>Use this styleclass if you don't want the chrome around the set.
     *       </td>
     *       <td>
     * <pre class="prettyprint">
     * <code>&lt;oj-checkboxset id="checkboxsetId"
     *  class="oj-checkboxset-no-chrome">
     * </code></pre>
     *       </td>
     *     </tr>
     *     <tr>
     *       <td>oj-checkboxset-input-start</td>
     *       <td>Use this styleclass to order the checkbox at the start and label text at the end 
     *       even if a theme has a different default order.
     *       </td>
     *       <td>
     * <pre class="prettyprint">
     * <code>&lt;oj-checkboxset id="checkboxsetId"
     *  class="oj-checkboxset-input-start">
     * </code></pre>
     *       </td>
     *     </tr>
     *     <tr>
     *       <td>oj-checkboxset-input-end</td>
     *       <td>Use this styleclass to order the checkbox at the end and the label text at the start 
     *       even if a theme has a different default order.
     *       </td>
     *       <td>
     * <pre class="prettyprint">
     * <code>&lt;oj-checkboxsetid="checkboxsetId" 
     *  class="oj-checkboxset-input-end" >
     * </code></pre>
     *       </td>
     *     </tr>
     *   </tbody>
     * </table>
     *
     * @ojfragment stylingDoc - Used in Styling section of classdesc, and standalone Styling doc
     * @memberof oj.ojCheckboxset
     */
});


//////////////////     SUB-IDS     //////////////////


/**
 * <p>Sub-ID for the checkboxset's checkboxes.
 *
 * @ojsubid oj-checkboxset-inputs
 * @memberof oj.ojCheckboxset
 * @example <caption>Get the nodes for the checkboxes:</caption>
 * var nodes = myComp.getNodeBySubId('oj-checkboxset-inputs');
 */

// -----------------------------------------------------------------------------
// "private static members" shared by all checkboxsets
// -----------------------------------------------------------------------------
/**
 * do not do a value change check in _SetValue
 */
var _sValueChangeCheckFalse = {doValueChangeCheck: false};

}());
(function() {
var ojCheckboxsetMeta = {
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
      "type": "Array"
    }
  },
  "methods": {
    "validate": {}
  },
  "extension": {
    _WIDGET_NAME: "ojCheckboxset"
  }
};
oj.CustomElementBridge.registerMetadata('oj-checkboxset', 'editableValue', ojCheckboxsetMeta);
oj.CustomElementBridge.register('oj-checkboxset', {'metadata': oj.CustomElementBridge.getMetadata('oj-checkboxset')});
})();
});

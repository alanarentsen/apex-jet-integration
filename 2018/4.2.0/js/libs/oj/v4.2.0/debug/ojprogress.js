/**
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";
define(['ojs/ojcore', 'jquery', 'ojs/ojcomponentcore'], 
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

/**
 * @preserve Copyright 2013 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */


/**
 * @ojcomponent oj.ojProgress
 * @ojstatus preview
 * @since 1.0.0
 * @augments oj.baseComponent
 * @ojshortdesc The JET Progress element allows a user to display progress of an operation in a rectangular horizontal or a circular meter.
 * @classdesc
 * <h3 id="progressOverview-section">
 *   JET Progress
 *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#progressOverview-section"></a>
 * </h3>
 * The JET Progress element allows a user to display progress of an operation in a rectangular horizontal or circular meter.
 * If a developer does not wish to display the exact value, a value of '-1' can be passed in to display an indeterminate value.
 *
 * <pre class="prettyprint"><code>&lt;oj-progress value='{{progressValue}}'>&lt;/oj-progress></code></pre>
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
 * <h3 id="styling-section">
 *   Styling
 *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#styling-section"></a>
 * </h3>
 *
 * {@ojinclude "name":"stylingDoc"}
 *
 * <h3 id="accessibility-section">
 *   Accessibility
 *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#accessibility-section"></a>
 * </h3>
 *
 * <p>If this element is being used to describe the loading process of a particular region of a page, then the <code class="prettyprint">aria-describedby</code>
 *    attribute must point to the id of the oj-progress and <code class="prettyprint">aria-busy = "true"</code> must be added to the region until the loading is complete.</p>
 *
 *
 */

(function() {
   /*
	* <h3 id="markup-section">
    *   HTML Markup and Style Classes
    *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#markup-section"></a>
    * </h3>
    *
    * <p>To create the start label for the progress bar wrap the start label text in a div with the  <code class="prettyprint"> oj-progress-bar-start-label </code> class. </p>
	  *
	  * <p>To create the end label for the progress bar wrap the end label text in a div with the  <code class="prettyprint"> oj-progress-bar-end-label </code> class. </p>
    *
	*/
oj.__registerWidget("oj.ojProgressbar",  $['oj']['baseComponent'], {
  version: "1.0.0",
  defaultElement : "<div>",
  widgetEventPrefix : "oj",
  options: {
    /**
     * The maximum allowed value. The element's max attribute is used if it
     * is provided, otherwise the default value of 100 is used.
     * @ojshortdesc The maximum allowed value.
     * @expose
     * @public
     * @type {number}
     * @instance
     * @memberof! oj.ojProgress
     * @default 100
     * @ojmin 0
     * @example <caption>Initialize the Progress with the <code class="prettyprint">max</code> attribute specified</caption>
     * &lt;oj-progress max='220'>&lt;/oj-progress>
     * @example <caption>Get or set the <code class="prettyprint">max</code> property after initialization</caption>
     * //Get progress max
     * var max = myProgress.max;
     *
     * //Set progress max
     * myProgress.max = 200;
     */
    max: 100,
    /**
     * The value of the Progress. The element's value attribute is used if it
     * is provided, otherwise the default value of 0 is used. For indeterminate Progress, set value to -1.
     * @ojshortdesc The value of the Progress.
     * @expose
     * @public
     * @type {number}
     * @instance
     * @memberof! oj.ojProgress
     * @default 0
     * @ojmin -1
     * @ojwriteback
     * @example <caption>Initialize the Progress with the <code class="prettyprint">value</code> attribute specified</caption>
     * &lt;oj-progress value='{{progressVal}}'>&lt;/oj-progress>
     * @example <caption>Get or set the <code class="prettyprint">value</code> property after initialization</caption>
     * //Get progress value
     * var value = myProgress.value;
     *
     * //Set progress value
     * myProgress.value = 10;
     */
    value: 0,
    /**
     * The shape of the Progress.
     * @ojshortdesc The shape of the Progress.
     * @expose
     * @instance
     * @type {string}
     * @memberof oj.ojProgress
     * @since 3.0
     * @ojvalue {string} "bar" displays progress in a rectangular horizontal meter.
     * @ojvalue {string} "circle" displays progress in a circular meter
     * @default "bar"
     * @example <caption>Initialize the Progress with the <code class="prettyprint">type</code> attribute specified</caption>
     * &lt;oj-progress type='circle'>&lt;/oj-progress>
     * @example <caption>Get or set the <code class="prettyprint">type</code> property after initialization</caption>
     * //Get progress type
     * var type = myProgress.type;
     *
     * //Set progress type
     * myProgress.type= 'bar';
     */
    type: "bar",
    /**
     * If disabled is set to true, then the Progress will not change if a new value is passed in.
     * By default this parameter is set to false.
     * @ojshortdesc If disabled is set to true, then the Progress will not change if a new value is passed in.
     * @expose
     * @public
     * @type {boolean}
     * @ignore
     * @instance
     * @memberof! oj.ojProgress
     * @default false
     * @example <caption>Initialize the Progress with the <code class="prettyprint">disabled</code> attribute specified</caption>
     * &lt;oj-progress disabled='true'>&lt;/oj-progress>
     * @example <caption>Get or set the <code class="prettyprint">disabled</code> property after initialization</caption>
     * //Get progress disabled
     * var disabled = myProgress.disabled;
     *
     * //Set progress disabled
     * myProgress.disabled= true;
     */
    disabled: false
  },
  // The min value is a constant and 0 is the value set for it.
  min: 0,

   /**
     * Variable used to indicate that the value is indeterminate
     *
     * @override
     * @private
     */
  _indeterminate: false,
  /**
   * Create the Progress
   * @override
   * @memberof! ojProgress
   * @protected
   */
  _ComponentCreate: function() {
    this._super();

    // Constrain initial value
    this.oldValue = this.options.value = this._constrainedValue();

    this.element.attr({
                    // Only set static values, aria-valuenow and aria-valuemax are
                    // set inside _refreshValue()
                    "role": "progress",
                    "aria-valuemin": this.min
            });
    if (this.options.type === "circle") {
      this.element.addClass("oj-progress-circle oj-component")
      this._setupCircleSVG();
    }
    else {
      this.element.addClass( "oj-progress-bar" )
      this.valueDiv = $( "<div class='oj-progress-bar-value'></div>" )
            .appendTo( this.element ); // @HTMLUpdateOK
    }

    this._refreshValue();
  },

  /**
   * <p>Initialize the options.</p>
   * @protected
   * @param {Object} originalDefaults
   * @param {Object} constructorOptions
   * @override
   * @memberof oj.ojProgress
   */
  _InitOptions : function (originalDefaults, constructorOptions)
  {
    var element = this.element;

    this._super(originalDefaults, constructorOptions);

    if (constructorOptions['max'] === undefined)
    {
      // get from dom. if still undefined, get from originalDefaults.
      var dom = element.attr("max") || undefined;
      if (dom != null)
        this.options['max'] = dom;
    }
  },

  /**
   * Check that value is valid and within the correct bounds. A value of -1 indicates an indeterminate value.
   * @param {number} newValue The new value of the progress being passed in.
   * @override
   * @private
   */
  _constrainedValue: function( newValue ) {
    if ( newValue === undefined ) {
      newValue = this.options.value;
    }

    // Indicates that the value is indeterminate.
    this._indeterminate = (newValue == -1 );

    // sanitize value
    if ( typeof newValue !== "number" ) {
      newValue = isNaN(newValue) ? 0 : Number(newValue);
    }

    return this._indeterminate ? -1 :
            Math.min( this.options.max, Math.max( this.min, newValue ) );
  },
  /**
   * Set the value
   * @param {Object} options The options being set
   * @override
   * @private
   */
  _setOptions: function( options, flags ) {
    // Ensure "value" option is set after other values (like max)
    var value = options.value;
    delete options.value;

    this._super( options, flags );
    if( !this.options.disabled) {
        this.options.value = this._constrainedValue( value );
        this._refreshValue();
    }
  },

  /**
   * Setup the svg for the determinate progress circle. The determinate progress circle is composed of
   * two circles, one for the value and one for the track. The strokes of the circles are used for the visual rendering.
   * @private
   */
  _setupCircleSVG : function ()
  {
    // Clear existing SVG
    if(this.svg)
      $(this.svg).remove();

    if(!this._indeterminate) {

      var namespace = "http://www.w3.org/2000/svg";
      var svg = document.createElementNS(namespace, "svg")
      var bgCircle = document.createElementNS(namespace, "circle");
      var circle = document.createElementNS(namespace, "circle");
      var radius = Math.min(this.element.outerWidth(), this.element.outerHeight()) * .5;

      svg.setAttribute("width", radius * 2);
      svg.setAttribute("height", radius * 2);
      svg.setAttribute("class", "oj-progress-circle-transform");

      // Track Circle
      bgCircle.setAttribute("r", radius * .9);
      bgCircle.setAttribute("cx", radius);
      bgCircle.setAttribute("cy", radius);
      bgCircle.setAttribute("class", "oj-progress-circle-base");

      // Value Circle
      circle.setAttribute("r", radius * .9);
      circle.setAttribute("cx", radius);
      circle.setAttribute("cy", radius);
      circle.setAttribute("class", "oj-progress-circle-base oj-progress-circle-value");
      var circumference = 2 * radius * .9 * Math.PI;
      var offset = circumference - ((this._percentage() / 100) * circumference);
      circle.setAttribute("style", "stroke-dasharray:" + circumference.toString()
  + ";stroke-dashoffset:" + offset);

      svg.appendChild(bgCircle);
      svg.appendChild(circle);

      this.svg = svg;

      this.element[0].appendChild(svg);
    }
  },

  /**
   * Check that the max value is not less than the min
   * @param {string} key The key for the option being set
   * @param {string|number} value The value being set
   * @override
   * @private
   */
  _setOption: function( key, value, flags ) {
    if ( key === "max" ) {
      // Don't allow a max less than min
      value = Math.max( this.min, value );
    }

    this._super( key, value, flags );
  },

  /**
   * Calculates the percentage of the progress that has been loaded based on min, max, and value.
   *
   * @override
   * @private
   */
    _percentage: function() {
      return Math.min(this._indeterminate ? 100 : 100 * ( this.options.value - this.min ) / ( this.options.max - this.min ), 100);
    },

   /**
    * This function is used to update the value when the value has changed.
    *
    * @override
    * @private
    */
    _refreshValue: function() {
      var value = this.options.value;
      var percentage = this._percentage();
      var isCircle = this.options.type === "circle";
      if (isCircle) {
        this._setupCircleSVG();
      }
      else if(!isCircle){
        this.valueDiv
                .toggle( this._indeterminate || value > this.min )
                .width( percentage.toFixed(0) + "%" );

        this.element.toggleClass( "oj-progress-bar-indeterminate", this._indeterminate );
      }

      if ( this._indeterminate) {
        this.element.attr({"aria-valuetext": this.getTranslatedString("ariaIndeterminateProgressText")});
        this.element.removeAttr( "aria-valuenow" );
        this.element.removeAttr( "aria-valuemin" );
        this.element.removeAttr( "aria-valuemax" );
        if ( !this.overlayDiv ) {
          if (isCircle) {
            this.overlayDiv = $( "<div class='oj-progress-circle-overlay'></div>" ).appendTo( this.element ); // @HTMLUpdateOK
            var diameter = Math.min(this.element.outerWidth(), this.element.outerHeight());
            this.overlayDiv.css("width", diameter);
            this.overlayDiv.css("height", diameter);
          }
          else {
            this.overlayDiv = $( "<div class='oj-progress-bar-overlay'></div>" ).appendTo( this.valueDiv ); // @HTMLUpdateOK
          }
          this.overlayDiv.addClass("oj-indeterminate");
        }
      }
      else {
        this.element.attr({"aria-valuemax": this.options.max, "aria-valuenow": value});
        if ( this.overlayDiv ) {
          this.overlayDiv.remove();
          this.overlayDiv = null;
        }
      }
    },

  /**
   * Overide the destory function to remove appropriate class and attributes.
   *
   * @override
   * @private
   */
   _destroy: function() {
     if (this.options.type === "circle") {
       this.element.removeClass("oj-progress-circle oj-component");
       if(this.svg)
         this.svg.remove();
     }
     else {
       this.element
             .removeClass( "oj-progress-bar" )
             .removeAttr( "role" )
             .removeAttr( "aria-valuemin" )
             .removeAttr( "aria-valuemax" )
             .removeAttr( "aria-valuenow" );

       this.valueDiv.remove();
       this._super();
     }

     if(this.overlayDiv)
       this.overlayDiv.remove();
   }

  // Fragments:

  /**
   * <p>This element has no touch interaction.  </p>
   *
   *
   * @ojfragment touchDoc - Used in touch gesture section of classdesc, and standalone gesture doc
   * @memberof oj.ojProgress
   */

  /**
   * <p>This element has no keyboard interaction.  </p>
   *
   * @ojfragment keyboardDoc - Used in keyboard section of classdesc, and standalone gesture doc
   * @memberof oj.ojProgress
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
 *       <td>oj-progress-bar-embedded</td>
 *       <td> Optional class that can be set on a oj-progress bar element to style an embedded progress bar within a web application or dialog.</td>
 *       <td>
 *       <pre class="prettyprint">
 *<code>&lt;div class='oj-web-applayout-page'>
 *  &lt;header class='oj-web-applayout-header'>&lt;/header>
 *  &lt;oj-progress class='oj-progress-bar-embedded' value='{{loadingValue}}'>
 *  &lt;/oj-progress>
 *&lt;/div>
 *</code></pre>
 *       </td>
 *     </tr>
 *     <tr>
 *       <td> oj-progress-bar-start-label</td>
 *       <td> Optional class that can be set on a div after the oj-progress element.  This div contains the start text to display underneath the oj-progress bar.</td>
 *       <td>
 *       <pre class="prettyprint">
 *<code>&lt;div id='progress-container'>
 *  &lt;oj-progress value='{{loadingValue}}'>&lt;/oj-progress>
 *  &lt;div class='oj-progress-bar-start-label'>0%&lt;/div>
 *  &lt;div class='oj-progress-bar-end-label'>100%&lt;/div>
 *&lt;/div>
 *</code></pre>
 *       </td>
 *     </tr>
 *    <tr>
 *       <td>oj-progress-bar-end-label</td>
 *       <td> Optional class that can be set on a div after the oj-progress element.  This div contains the end text to display underneath the oj-progress bar. </td>
 *       <td>
 *       <pre class="prettyprint">
 *<code>&lt;div id='progress-container'>
 *  &lt;oj-progress value='{{loadingValue}}'>&lt;/oj-progress>
 *  &lt;div class='oj-progress-bar-start-label'>0%&lt;/div>
 *  &lt;div class='oj-progress-bar-end-label'>100%&lt;/div>
 *&lt;/div>
 *</code></pre>
 *       </td>
 *     </tr>
 *   </tbody>
 * </table>
 *
 * @ojfragment stylingDoc - Used in Styling section of classdesc, and standalone Styling doc
 * @memberof oj.ojProgress
 */

});

}( ));

(function() {
var ojProgressMeta = {
  "properties": {
    "max": {
      "type": "number"
    },
    "type": {
      "type": "string",
      "enumValues": ["bar", "circle"]
    },
    "radius": {
      "type": "number"
    },
    "value": {
      "type": "number",
      "writeback": true
    }
  },
  "methods": {},
  "extension": {
    _WIDGET_NAME: "ojProgressbar"
  }
};
oj.CustomElementBridge.registerMetadata('oj-progress', 'baseComponent', ojProgressMeta);
oj.CustomElementBridge.register('oj-progress', {'metadata': oj.CustomElementBridge.getMetadata('oj-progress')});
})();

});

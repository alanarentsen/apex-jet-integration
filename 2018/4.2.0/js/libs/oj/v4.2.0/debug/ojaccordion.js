/**
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";
define(['ojs/ojcore', 'jquery', 'ojs/ojcomponentcore', 'ojs/ojcollapsible'], 
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
 * @ojcomponent oj.ojAccordion
 * @augments oj.baseComponent
 * @since 0.6
 * @ojstatus preview
 * @ojshortdesc Displays a set of Collapsible child elements.
 * @ojrole group
 * 
 * @classdesc
 * <h3 id="accordionOverview-section">
 *   JET Accordion
 *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#accordionOverview-section"></a>
 * </h3>
 * 
 * <p>Description: A JET Accordion contains one or more {@link oj.ojCollapsible} child elements.
 * 
 * <pre class="prettyprint">
 * <code>
 * &lt;oj-accordion>
 *   &lt;oj-collapsible>
 *     &lt;h3>
 *       &lt;img src="images/default.png"/>
 *       &lt;span>Header 1&lt;/span>
 *     &lt;/h3>
 *     &lt;p>Content 1.&lt;/p>
 *   &lt;/oj-collapsible>
 *   &lt;oj-collapsible expanded="true">
 *     &lt;h3>Header 3&lt;/h3>
 *     &lt;p>Content 3&lt;/p>
 *   &lt;/oj-collapsible>
 * &lt;/oj-accordion>
 * </code></pre>
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
 * 
 * <h3 id="rtl-section">
 *   Reading direction
 *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#rtl-section"></a>
 * </h3>
 * 
 * <p>In the unusual case that the directionality (LTR or RTL) changes post-init, the accordion must be <code class="prettyprint">refresh()</code>ed.
 * 
 */
(function ()
{
  oj.__registerWidget("oj.ojAccordion", $['oj']['baseComponent'], 
  {
    widgetEventPrefix : "oj", 
    options : 
    {
      /** 
       * Allow multiple collapsibles to be open at the same time. 
       * Note: if multiple is true, the beforeCollapse/beforeExpand/collapse/expand events will not be fired by the accordion. They are however fired by the collapsibles.
       *
       * @expose 
       * @memberof oj.ojAccordion
       * @instance
       * @ojshortdesc Specifies whether multiple collapsibles can be open at the same time.
       * @type {boolean}
       * @default false
       * @example <caption>Initialize the accordion with the <code class="prettyprint">multiple</code> attribute specified:</caption>
       * &lt;oj-accordion multiple='true'>&lt;/oj-accordion>
       * 
       * @example <caption>Get or set the <code class="prettyprint">multiple</code> property after initialization:</caption>
       * // getter
       * var multipleValue = myAccordion.multiple;
       * 
       * // setter
       * myAccordion.multiple=true;
       */
      multiple : false,

      /** 
       * Array contains either ids or zero-based indices of the collapsibles that should be expanded.<p>
       * Setter value: array of either ids or indices.<p>
       * Getter value: array of either ids or indices. If an expanded collapsible has a page author provided id, that id is returned, otherwise that collapsible's index will be returned.
       *
       * @expose 
       * @memberof oj.ojAccordion
       * @instance
       * @ojshortdesc A list of expanded child collapsibles.
       * @type {Array}
       * @ojwriteback
       * @default null
       *
       * Note: expanded is default to null<p>
       * which means that accordion doesn't modify the state on the collapsible children.<p>
       * If specified, it overrides the children expanded setting.
       *
       * @example <caption>Initialize the accordion with the 
       * <code class="prettyprint">expanded</code> attribute specified:</caption>
       * &lt;oj-accordion expanded="['collapsible2']">&lt;/oj-accordion>
       * 
       * @example <caption>Get or set the <code class="prettyprint">expanded</code> property 
       * after initialization:</caption>
       * // getter
       * var expanded = myAccordion.expanded;
       * 
       * // setter
       * myAccordion.expanded="['collapsible1']"
       */
      expanded : null, 

      // callbacks
      /**
       * Triggered immediately before any collapsible in the accordion is expanded.
       * Call <code class="prettyprint">event.preventDefault()</code> in the event listener to veto the event, which prevents the content from expanding.
       * If multiple is true, the beforeExpand event will not be fired by the accordion.
       *
       * @expose 
       * @event 
       * @memberof oj.ojAccordion
       * @instance
       * @ojshortdesc Triggered immediately before any collapsible in the accordion is expanded.
       * @ojcancelable
       * @ojbubbles
       * @property {Element} toCollapsible The collapsible being expanded.
       * @property {Element} fromCollapsible The collapsible being collapsed. 
       */
      beforeExpand : null,

      /**
       * Triggered after the accordion has been expanded (after animation completes).
       * The expand can be cancelled by calling <code class="prettyprint">event.preventDefault()</code>.
       * If multiple is true, the expand event will not be fired by the accordion.
       *
       * @expose 
       * @event 
       * @memberof oj.ojAccordion
       * @instance
       * @ojshortdesc Triggered after any collapsible in the accordion is expanded.
       * @ojbubbles
       * @property {Element} toCollapsible The collapsible being expanded.
       * @property {Element} fromCollapsible The collapsible being collapsed. 
       */
      expand : null, 

      /**
       * Triggered immediately before any collapsible in the accordion is collapsed.
       * Call <code class="prettyprint">event.preventDefault()</code> in the event listener to veto the event, which prevents the content from collapsing.
       * If multiple is true, the beforeCollapse event will not be fired by the accordion.
       *
       * @expose 
       * @event 
       * @memberof oj.ojAccordion
       * @instance
       * @ojshortdesc Triggered immediately before any collapsible in the accordion is collapsed.
       * @ojcancelable
       * @ojbubbles
       * @property {Element} toCollapsible The collapsible being expanded.
       * @property {Element} fromCollapsible The collapsible being collapsed. 
       */
      beforeCollapse : null,

      /**
       * Triggered after any collapsible in the accordion has been collapsed (after animation completes).
       * The collapse can be cancelled by calling <code class="prettyprint">event.preventDefault()</code>.
       * If multiple is true, the collapse event will not be fired by the accordion.
       *
       * @expose 
       * @event 
       * @memberof oj.ojAccordion
       * @instance
       * @ojshortdesc Triggered after any collapsible in the accordion has been collapsed.
       * @ojbubbles
       * @property {Element} toCollapsible The collapsible being expanded.
       * @property {Element} fromCollapsible The collapsible being collapsed. 
       */
      collapse : null

    },

    /**
     * @memberof oj.ojAccordion
     * @instance
     * @protected
     * @override
     */
    _ComponentCreate : function ()
    {
      this._super();
      // - Stop using ui-helper-reset in the layout widgets.
      this.element
        .addClass("oj-accordion oj-component")
        //aria
        .attr("role", "group");

      // - accordion expanded opt. val doesn't overrides its collaspsible expanded opt.
      this.options.expanded = this._expandedIndexToId(this.options.expanded);
      this._refresh();
    },

    /**
     * @memberof oj.ojAccordion
     * @param {Object} menu The JET Menu to open as a context menu
     * @param {Event} event What triggered the menu launch
     * @param {string} eventType "mouse", "touch", "keyboard"
     * @private
     */
    _NotifyContextMenuGesture: function(menu, event, eventType)
    {
      // Setting the launcher to the "twisty" icon of the first collapsible in the accordion, since those twisties seem to be 
      // the only tabbable things in the accordion, and they seem to remain tabbable even if the collapsible is disabled.
      // Component owner should feel free to specify a different launcher if appropriate, e.g. could specify the "current" 
      // twisty rather than the first if desired.  See the superclass JSDoc for _OpenContextMenu for tips on choosing a launcher.
      this._OpenContextMenu(event, eventType, {"launcher": this.element.find(".oj-collapsible-header-icon").first()});
    },
    
    /**
     * @memberof oj.ojAccordion
     * @override
     * @private
     */
    _destroy : function ()
    {
      // clean up main element
      this.element
        .removeClass("oj-accordion oj-component")
        .removeAttr("role");

      this.element.children()
        .removeClass("oj-accordion-collapsible");

      //remove collapsibles created by accordion
      this.element.children(".oj-accordion-created")
        .removeClass("oj-accordion-created")
        .ojCollapsible("destroy");
    },

    /**
     * @memberof oj.ojAccordion
     * @override
     * @private
     */
    _setOption : function (key, value, flags)
    {
      var self = this;

      if (key === "multiple")
      {
        // Transition multiple to single.
        // Keep the first expanded one expanded and collapse the rest.
        if (value == false && this.options.multiple == true)
        {
          // - when "multiple" option value is changed to false, exception is displayed
          this.element.children(".oj-expanded")
            .first().siblings(".oj-collapsible")
            .ojCollapsible("collapse", false);
        }
      }
      else if (key === "expanded")
      {
        this._setExpandedOption(value);
        return;
      }

      this._super(key, value, flags);

    },

    /**
     * Refreshes the visual state of the accordion. 
     * 
     * <p>This method does not accept any arguments.
     * 
     * @expose 
     * @memberof oj.ojAccordion
     * @instance
     * 
     * @example <caption>Invoke the <code class="prettyprint">refresh</code> method:</caption>
     * myAccordion.refresh();
     */
    refresh : function ()
    {
      this._super();
      this._refresh();
    },

    /**
     * @memberof oj.ojAccordion
     * @private
     */
    _refresh : function ()
    {
      this._makeCollapsible();
      
      //TODO: ignore disabled until disabled propagation is supported
      //need to propagate the option to the collapsible children
      // this.option("disabled", this.options.disabled);

      this._internalSetExpanded = true;
      this._setExpandedOption(this.options.expanded);
      this._internalSetExpanded = false;

      this._setupEvents();
    },

    /**
     * @memberof oj.ojAccordion
     * @private
     */
    _makeCollapsible : function ()
    {
      this.collapsibles = this.element.children();

      // Since oj-collapsible elements may not be upgraded until after oj-accordion elements,
      // just set the expand-area property for custom elements
      if (this._IsCustomElement())
      {
        this.element.children("oj-collapsible")
          .each(function (index, collapsible)
          {
            collapsible.setAttribute("expand-area", "header");
          });

        this.collapsibles.not("oj-collapsible")
          .ojCollapsible(
          {
            expandArea : "header"
          })
        .addClass("oj-accordion-created")
        .attr('data-oj-internal', ''); // mark internal component, used in oj.Components.getComponentElementByNode
      }
      else
      {
        this.element.children(":oj-collapsible")
          .each(function ()
          {
            $(this).ojCollapsible("option", "expandArea", "header");
          });

        this.collapsibles.not(":oj-ojCollapsible")
          .ojCollapsible(
          {
            expandArea : "header"
          })
        .addClass("oj-accordion-created")
        .attr('data-oj-internal', ''); // mark internal component, used in oj.Components.getComponentElementByNode
      }
      
      this.collapsibles.addClass("oj-accordion-collapsible");
    },

    /**
     * @memberof oj.ojAccordion
     * @private
     */
    _setupEvents : function ()
    {
      var events;
      if (this._IsCustomElement()) {
        events = {
          "keydown" : this._keydown, 
          "ojBeforeExpand" : this._beforeExpandHandler, 
          "ojExpand" : this._expandHandler,
          "ojBeforeCollapse" : this._beforeCollapseHandler, 
          "ojCollapse" : this._collapseHandler
        };
      }
      else {
        events = {
          "keydown" : this._keydown, 
          "ojbeforeexpand" : this._beforeExpandHandler, 
          "ojexpand" : this._expandHandler,
          "ojbeforecollapse" : this._beforeCollapseHandler, 
          "ojcollapse" : this._collapseHandler
        };
      }

      this._off(this.collapsibles);
      this._on(this.collapsibles, events);
    },

    /**
     * @memberof oj.ojAccordion
     * @private
     */
    _keydown : function (event)
    {
      if (event.altKey || event.ctrlKey)
        return;

      //ignore event if target is not a header
      if (! ($(event.target).hasClass("oj-collapsible-header")) &&
          ! ($(event.target).hasClass("oj-collapsible-header-icon")))
        return;

      var keyCode = $.ui.keyCode, 
          enabledCollapsibles = this.collapsibles.not(".oj-disabled"), 
          length = enabledCollapsibles.length, 
          target = $(event.target).closest(".oj-collapsible"), 
          currentIndex = enabledCollapsibles.index(target), 
          toFocus = false;

      if (currentIndex >= 0)
      {
        switch (event.keyCode)
        {
          case keyCode.RIGHT:
          case keyCode.DOWN:
            toFocus = enabledCollapsibles[(currentIndex + 1) % length];
            break;
          case keyCode.LEFT:
          case keyCode.UP:
            toFocus = enabledCollapsibles[(currentIndex - 1 + length) % length];
            break;
          case keyCode.HOME:
            toFocus = enabledCollapsibles[0];
            break;
          case keyCode.END:
            toFocus = enabledCollapsibles[length - 1];
            break;
        }
      }

      if (toFocus)
      {
        if (target)
        {
          $(target).trigger("ojfocusout");
        }
        $(toFocus).trigger("ojfocus");

        event.preventDefault();
      }
    },

    /**
     * For single expansion
     *   returns a list of expanded collapsible widgets that are sibling 
     *   of the current event target
     * For multiple expansion
     *   returns an empty set.
     * @memberof oj.ojAccordion
     * @private
     */
    _findTargetSiblings : function (event)
    {
      if (! this.options.multiple)
      {
        var closestCollapsible = $(event.target).closest(".oj-collapsible");
        if (closestCollapsible.parent().is(":oj-ojAccordion"))
          return closestCollapsible
            .siblings(".oj-collapsible.oj-expanded")
            .map(function()
            {
              return $(this).data("oj-ojCollapsible");
            });
        }
      return $();
    },

    /**
     * Trigger "beforeCollapse" on all expanded siblings in
     * the before expand handler
     * @memberof oj.ojAccordion
     * @private
     */
    _beforeExpandHandler : function (event, eventData)
    {
      if (! this._isTargetMyCollapsible(event))
        return true;

      this._expandTarget = $(event.target);
      var result, 
          collapsible = null;

      this._findTargetSiblings(event).each(function()
      {
        collapsible = this.element;

        var beforeCollapsedData = {
          /** @expose */
          header : collapsible.find(".oj-collapsible-header"),

          /** @expose */
          content : collapsible.find(".oj-collapsible-content")
        };

        result = this._trigger("beforeCollapse", event, beforeCollapsedData);

        if (! result)
          this._expandTarget = null;

        return result;
      });

      if (! this.options.multiple) {
        var newData = this._initEventData(collapsible, this._expandTarget);
        result = this._trigger("beforeExpand", event, newData);
      }

      //make sure collapse all expanded collapsibles before expand others
      var self = this;
      if (result) {
        this._findTargetSiblings(event).each(function () {
          this.collapse(false, event, eventData);
          self._collapsedCollapsible = this.widget();
        });
      }

      return result;
    },

    /**
     * Collapse all expanded siblings and don't allow cancel
     * @memberof oj.ojAccordion
     * @private
     */
    _expandHandler : function (event, eventData)
    {
      // clear the collapsedCollapsible
      var fromCollapsible = null;
      if (this._collapsedCollapsible) {
        fromCollapsible = this._collapsedCollapsible;
        this._collapsedCollapsible = null;
      }

      // - accordion expanded opt. val doesn't overrides its collaspsible expanded opt.
      //don't handle event during setExpandedOption
      if (! this._isTargetMyCollapsible(event) || this._duringSetExpandedOption)
        return;

      var newData;
      var self = this;

      this._findTargetSiblings(event).each(function ()
      {
        this.collapse(false, event, eventData);
        newData = self._initEventData(this.element, $(event.target));
      });

      if (! newData)
        newData = self._initEventData(fromCollapsible, $(event.target));

      if (! this.options.multiple)
        this._trigger("expand", event, newData);

      this._updateExpanded();

      this._expandTarget = null;
    },

    /** 
     * Trigger "beforecollapse" on all collapsed siblings in
     * the before collapse handler
     * @memberof oj.ojAccordion
     * @private
     */
    _beforeCollapseHandler : function (event, eventData)
    {
      if (this._isTargetMyCollapsible(event) &&
          ! this.options.multiple)
      {
        if (! eventData && event.originalEvent instanceof CustomEvent) {
          eventData = event.originalEvent.detail;
        }

        return this._trigger("beforeCollapse", event, 
                             this._initCollapseEventData(event, eventData));
      }
      return true;
    },

    /**
     * Collapse all collapsed siblings and don't allow cancel
     * @memberof oj.ojAccordion
     * @private
     */
    _collapseHandler : function (event, eventData)
    {
      // - accordion expanded opt. val doesn't overrides its collaspsible expanded opt.
      //don't handle event during setExpandedOption
      if (! this._duringSetExpandedOption && this._isTargetMyCollapsible(event))
      {
        if (! eventData && event.originalEvent instanceof CustomEvent) {
          eventData = event.originalEvent.detail;
        }

        var newData = this._initCollapseEventData(event, eventData);

        if (! this.options.multiple)
          this._trigger("collapse", event, newData);

        this._updateExpanded();
      }
    },

    /**
     * @memberof oj.ojAccordion
     * @private
     */
    _initEventData : function (fromC, toC)
    {
      var eventData =
      {
        /** @expose */
        fromCollapsible : fromC, //the collapsible being collapsed.
        /** @expose */
        toCollapsible : toC      //the collapsible being expanded.
      };

      return eventData;
    },

    /**
     * @memberof oj.ojAccordion
     * @private
     */
    _initCollapseEventData : function (event, eventData)
    {
      var newData;
      if (eventData.toCollapsible)
      {
        newData = eventData;
      }
      else if (event.originalEvent && event.originalEvent.target)
      {
        newData = this._initEventData($(event.target), this._expandTarget);
      }

      if (! newData && this._expandTarget)
        newData = this._initEventData($(event.target), this._expandTarget);

      return newData;
    },

    /**
     * To filter out events from the nested accordion
     * @memberof oj.ojAccordion
     * @private
     */
    _isTargetMyCollapsible : function (event)
    {
      return $(event.target).is(this.collapsibles);
    },

    /**
     * @memberof oj.ojAccordion
     * @private
     */
    _updateExpanded : function ()
    {
      var cid;
      var result = [];
      var exp, newexp;
      var iexp = 0;

      this.collapsibles.each(function (index)
      {
        var bExpanded = false;
        if (this.tagName.toLowerCase() === "oj-collapsible")
        {
          bExpanded = this.getAttribute("expanded") === "true";
        }
        else 
        {
          bExpanded = $(this).ojCollapsible("option", "expanded");
        }
        if (bExpanded)
        {
          newexp = {};
          cid = $(this).attr("id");
          //add id property if provided
          if (cid)
            newexp["id"] = cid;
          //always add index property
          newexp["index"] = index;

          result.push(newexp);
          iexp++;
        }
      });

      // - accordion expanded opt. val doesn't overrides its collaspsible expanded opt.
      if (! oj.Object._compareArrayIdIndexObject(result, this.options.expanded))
        this.option('expanded', result, {'_context': {internalSet: true, writeback: true}});
    },

    /**
     * Return a new sorted expanded array contains IDs if they are available
     * @memberof oj.ojAccordion
     * @private
     */
    _expandedIndexToId: function(expanded)
    {
      // - accordion expanded opt. val doesn't overrides its collaspsible expanded opt.
      if (Array.isArray(expanded))
      {
        var id, newExp = [],
        expArr = [];

        //convert expanded from Array{Object} to Array{string or number}
        for (var i = 0; i < expanded.length; i++)
        {
          var exp = expanded[i];
          if (typeof exp === "number" || typeof exp === "string") {
            expArr.push(exp);
          }
          else {
            if (typeof exp["index"] === "number")
              expArr.push(exp["index"]);
            else if (typeof exp["id"] === "string")
              expArr.push(exp["id"]);
          }
        }

        this.element.children().each (function (index)
        {
          id = $(this).attr("id");
          if (id)
          {
            if (expArr.indexOf(id) != -1 || expArr.indexOf(index) != -1)
              newExp.push({"id": id, "index": index});
          }
          // use index if ID not available
          else if (expArr.indexOf(index) != -1)
          {
            newExp.push({"index": index});
          }
        });

        //if more than one expanded, keep the last collapsible
        if (! this.options.multiple && newExp.length > 1)
          newExp = [newExp[newExp.length-1]];

        return newExp;
      }

      return null;
    },

    /**
     * @memberof oj.ojAccordion
     * @private
     */
    _setExpandedOption: function(expanded)
    {
      //sort expanded array if it's from external setOption
      if (! this._internalSetExpanded)
        expanded = this._expandedIndexToId(expanded);
    
      // parent override children expanded setting
      if (expanded)
      {
        //loop thru collapsibles to collapse/expand based on expandedList
        var self = this,
            child,
            childId,
            parentExp,
            exp, iexp = 0;

        this.collapsibles.each(function (index)
        {
          child = $(this);
          childId = child.attr("id");

          parentExp = false;
          exp = expanded[iexp];
          if (exp)
          {
            if (childId) {
              if (childId == exp["id"])
                parentExp = true;
            }
            else {
              if (index == exp["index"])
                parentExp = true;
            }
            if (parentExp)
              iexp++;
          }

          // - accordion expanded opt. val doesn't overrides its collaspsible expanded opt.
          //when the parent override the child setting:
          //1) log a warning
          //2) set child's expanded option with the writeback flag.
          var isCustomElement = this.tagName.toLowerCase() === "oj-collapsible";
          var childExp = isCustomElement ? 
            (this.getAttribute("expanded") == "true" || this.getAttribute("expanded") == "") :
            child.ojCollapsible("option", "expanded");

          if (childExp !== parentExp) {
            oj.Logger.warn("JET Accordion: override collapsible " + index + " expanded setting");

            //don't fire accordion "exanded" optionChange event here 
            self._duringSetExpandedOption = true;
            if (isCustomElement) {
              this.setAttribute("expanded", parentExp);
            }
            else {
              child.ojCollapsible("option", "expanded", parentExp);
            }
            self._duringSetExpandedOption = false;
          }
        });
      }

      this._updateExpanded();
    },

    //** @inheritdoc */
    getNodeBySubId: function(locator)
    {
      if (locator == null)
      {
        return this.element ? this.element[0] : null;
      }

      var subId = locator['subId'],
          index = locator['index'];

      if ((typeof index !== 'number') ||
          index < 0 || index >= this.collapsibles.length)
        return null;

      var collapsible = this.collapsibles[index];

      switch (subId)
      {
      case 'oj-accordion-content':
        subId = 'oj-collapsible-content';
        break;

      case 'oj-accordion-header':
        subId = 'oj-collapsible-header';
        break;

      case 'oj-accordion-disclosure':
      case 'oj-accordion-header-icon':
        subId = 'oj-collapsible-disclosure';
        break;

      case 'oj-accordion-collapsible':
        return collapsible;

      default:
        // Non-null locators have to be handled by the component subclasses
        return null;
      }
      return $(collapsible).ojCollapsible("getNodeBySubId", {"subId": subId});
    },

    //** @inheritdoc */
    getSubIdByNode: function(node) {
      // First, find which collapsible the node is a descendant of
      var collapsibleIndex = -1;
      var currentNode = node;
      while (currentNode) {
        collapsibleIndex = Array.prototype.indexOf.call(this.collapsibles, currentNode);
        if (collapsibleIndex != -1)
          break;
        currentNode = currentNode.parentElement;
      }
      var subId = null;
      // Then, find the subId from the collapsible
      if (collapsibleIndex != -1) {
        var collapsibleSubId = $(this.collapsibles[collapsibleIndex]).ojCollapsible("getSubIdByNode", node);
        collapsibleSubId = collapsibleSubId ? collapsibleSubId : {};
        switch (collapsibleSubId['subId']) {
          case 'oj-collapsible-content':
            subId = 'oj-accordion-content';
            break;
          case 'oj-collapsible-header':
            subId = 'oj-accordion-header';
            break;
          case 'oj-collapsible-disclosure':
          case 'oj-collapsible-header-icon':
            subId = 'oj-accordion-disclosure';
            break;
          default:
            subId = 'oj-accordion-collapsible';
        }
      }
      if (subId) {
        return {'subId':subId, 'index': collapsibleIndex};
      }
      return null;
    },

    //** @inheritdoc */
     _CompareOptionValues: function(option, value1, value2)
     {
      if (option == 'expanded')
        return oj.Object.compareValues(value1, value2);
      else
        return this._super(option, value1, value2);
    }

    // Fragments:

    /**
     * <p>The <code class="prettyprint">&lt;oj-accordion></code> element accepts one or more <code class="prettyprint">&lt;oj-collapsible></code> elements as children.
     *
     * @ojchild Default
     * @memberof oj.ojAccordion
     *
     * @example <caption>Initialize the Accordion with two Collapsible children specified:</caption>
     * &lt;oj-accordion>
     *   &lt;oj-collapsible>
     *     &lt;h3>Header 1&lt;/h3>
     *     &lt;p>Content 1&lt;/p>
     *   &lt;/oj-collapsible>
     *   &lt;oj-collapsible expanded="true">
     *     &lt;h3>Header 2&lt;/h3>
     *     &lt;p>Content 2&lt;/p>
     *   &lt;/oj-collapsible>
     * &lt;/oj-accordion>
     */

    /**
     * <p>Sub-ID for the specified disclosure icon within an Accordion.</p>
     *
     * @property {number} index The zero-based index of the disclosure icon.
     *
     * @ojsubid oj-accordion-disclosure
     * @memberof oj.ojAccordion
     *
     * @example <caption>Get the second disclosure icon:</caption>
     * var node = myAccordion.getNodeBySubId({"subId": "oj-accordion-disclosure", 'index': 1});
     */

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
     *       <td>Collapsible header</td>
     *       <td><kbd>Tap</kbd></td>
     *       <td>Toggle disclosure state.</tr>
     *     </tr>
     *   </tbody>
     * </table>
     *
     * @ojfragment touchDoc - Used in touch gesture section of classdesc, and standalone gesture doc
     * @memberof oj.ojAccordion
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
     *       <td>Collapsible header</td>
     *       <td><kbd>Space or Enter</kbd></td>
     *       <td>Toggle disclosure state.</tr>
     *     </tr>
     *     <tr>
     *       <td>Collapsible header</td>
     *       <td><kbd>Tab</kbd></td>
     *       <td>Navigate to next collapsible header and if none then the next element on page.</td>
     *     </tr>
     *     <tr>
     *       <td>Collapsible header</td>
     *       <td><kbd>Shift+Tab</kbd></td>
     *       <td>Navigate to previous collapsible header and if none then the previous element on page.</td>
     *     </tr>
     *     <tr>
     *       <td>Collapsible header</td>
     *       <td><kbd>UpArrow or LeftArrow</kbd> (<kbd>RightArrow</kbd> in RTL)</td>
     *       <td>Move focus to the previous collapsible header with wrap around.</tr>
     *     </tr>
     *     <tr>
     *       <td>Collapsible header</td>
     *       <td><kbd>DownArrow or RightArrow</kbd> (<kbd>LeftArrow</kbd> in RTL)</td>
     *       <td>Move focus to the next collapsible header with wrap around.</tr>
     *     </tr>
     *     <tr>
     *       <td>Collapsible header</td>
     *       <td><kbd>Home</kbd></td>
     *       <td>Move focus to the first collapsible header.</tr>
     *     </tr>
     *     <tr>
     *       <td>Collapsible header</td>
     *       <td><kbd>End</kbd></td>
     *       <td>Move focus to the last collapsible header.</tr>
     *     </tr>
     *   </tbody>
     * </table>
     *
     * <p>Disabled items can receive keyboard focus, but do not allow any other interaction.
     *
     * @ojfragment keyboardDoc - Used in keyboard section of classdesc, and standalone gesture doc
     * @memberof oj.ojAccordion
     */

  });
}
());
(function() {
var ojAccordionMeta = {
  "properties": {
    "expanded": {
      "type": "Array",
      "writeback": true
    },
    "multiple": {
      "type": "boolean"
    }
  },
  "events": {
    "beforeCollapse": {},
    "beforeExpand": {},
    "collapse": {},
    "expand": {}
  },
  "extension": {
    _WIDGET_NAME: "ojAccordion"
  }
};
oj.CustomElementBridge.registerMetadata('oj-accordion', 'baseComponent', ojAccordionMeta);
oj.CustomElementBridge.register('oj-accordion', {'metadata': oj.CustomElementBridge.getMetadata('oj-accordion')});
})();
});

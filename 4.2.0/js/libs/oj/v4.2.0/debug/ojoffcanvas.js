/**
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";
define(['ojs/ojcore', 'jquery', 'hammerjs', 'promise', 'ojs/ojjquery-hammer', 'ojs/ojcomponentcore'],
       /*
        * @param {Object} oj 
        * @param {jQuery} $
        * @param {Object} Hammer
        */
       function(oj, $, Hammer)
 
{

/**
 * Copyright (c) 2015, Oracle and/or its affiliates.
 * All rights reserved.
 */

/**
 * @class oj.OffcanvasUtils
 * @since 1.1.0
 * @export
 * @ojstatus preview
 *
 * @classdesc
 * This class provides functions used for controlling offcanvas regions.  Offcanvas regions can be used in either static (simply displaying and hiding in response to user interactions) or responsive (using media queries to dynamically move application content between the main viewport and offcanvas regions) contexts.  The open, close and toggle methods can be used to directly control the display of an offcanvas region in both the static and responsive cases.  The setupResponsive and tearDownResponsive methods are only needed for responsive usages and are used to add and remove listeners that use the specified media queries to configure the offcanvas in response to changes in browser size.
 * The setupPanToReveal and tearDownPanToReveal methods are used to add and remove listeners neccessary to reveal the offcanvas as user pans on the outer wrapper.
 *
 * <ul>
 * <li>open: show the offcanvas by sliding it into the viewport.</li>
 * <li>close: hide the offcanvas by sliding it out of the viewport.</li>
 * <li>toggle: toggle the offcanvas in or out of the viewport.</li>
 * <li>setupResponsive: setup offcanvas for the responsive layout.</li>
 * <li>tearDownResponsive: remove listeners that were added in setupResponsive.</li>
 * <li>setupPanToReveal: setup offcanvas for pan to reveal.</li>
 * <li>tearDownPantoReveal: remove listeners that were added in setupPanToReveal.</li><br>
 * </ul>
 *
 * <p>Note for performance reasons, if the Offcanvas content is expensive to render, you should wrap it in an <code class="prettyprint">oj-defer</code> element (API doc {@link oj.ojDefer}) to defer the rendering of that content.<br/>
 * See the <a href="../jetCookbook.html?component=offcanvas&demo=deferredRendering">Offcanvas - Deferred Rendering</a> demo for an example.</p>
 *
 * <h3 id="events-section">
 *   Events
 *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#events-section"></a>
 * </h3>
 *
 *
 * <table class="generic-table events-table">
 *   <thead>
 *     <tr>
 *       <th>Event</th>
 *       <th>Description</th>
 *       <th>Example</th>
 *     </tr>
 *   </thead>
 *   <tbody>
 *     <tr>
 *       <td>beforeClose</td>
 *       <td>Triggered immediately before the offcanvas is closed. It can be canceled to prevent the content from closing by returning a false in the event listener.</td>
*       <td>$(".selector").on("ojbeforeclose", function(event, offcanvas) {});</td>
 *     </tr>
 *     <tr>
 *       <td>beforeOpen<br>
 *       <td>Triggered immediately before the offcanvas is open. It can be canceled to prevent the content from opening by returning a false in the event listener.</td>
*       <td>$(".selector").on("ojbeforeopen", function(event, offcanvas) {});</td>
 *     </tr>
 *     <tr>
 *       <td>close<br>
 *       <td>Triggered after the offcanvas has been closed.</td>
*       <td>$(".selector").on("ojclose", function(event, offcanvas) {});</td>
 *     </tr>
 *     <tr>
 *       <td>open<br>
 *       <td>Triggered after the offcanvas has been open (after animation completes).</td>
*       <td>$(".selector").on("ojopen", function(event, offcanvas) {});</td>
 *     </tr>
 *   </tbody>
 * </table>
 *
 * <h3 id="styling-section">
 *   Styling
 *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#styling-section"></a>
 * </h3>
 *
 * {@ojinclude "name":"stylingDoc"}
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
 */
oj.OffcanvasUtils = {};

oj.OffcanvasUtils._DATA_EDGE_KEY = "oj-offcanvasEdge";
oj.OffcanvasUtils._DATA_OFFCANVAS_KEY = "oj-offcanvas";
oj.OffcanvasUtils._DATA_MEDIA_QUERY_KEY = "oj-mediaQueryListener";
oj.OffcanvasUtils._DATA_HAMMER_KEY = "oj-offcanvasHammer";
oj.OffcanvasUtils._DATA_STYLE_KEY = "oj-offcanvasStyle";

/**
 * @private
 */
oj.OffcanvasUtils.SELECTOR_KEY = "selector";
oj.OffcanvasUtils.CONTENT_KEY = "content";

oj.OffcanvasUtils.EDGE_START = "start";
oj.OffcanvasUtils.EDGE_END = "end";
oj.OffcanvasUtils.EDGE_TOP = "top";
oj.OffcanvasUtils.EDGE_BOTTOM = "bottom";


/**
 * @private
 */
oj.OffcanvasUtils.DISPLAY_MODE_KEY = "displayMode";
/**
 * @private
 */
oj.OffcanvasUtils.DISPLAY_MODE_PUSH = "push";
/**
 * @private
 */
oj.OffcanvasUtils.DISPLAY_MODE_OVERLAY = "overlay";
/**
 * @private
 */
oj.OffcanvasUtils.DISPLAY_MODE_PIN = "pin";

/**
 * @private
 */
oj.OffcanvasUtils.MODALITY_KEY = "modality";
/**
 * @private
 */
oj.OffcanvasUtils.MODALITY_NONE = "none";
/**
 * @private
 */
oj.OffcanvasUtils.MODALITY_MODAL = "modal";


/**
 * @private
 */
oj.OffcanvasUtils.DISMISS_HANDLER_KEY = "_dismissHandler";

/**
 * @private
 */
oj.OffcanvasUtils.OPEN_PROMISE_KEY = "_openPromise";

/**
 * @private
 */
oj.OffcanvasUtils.CLOSE_PROMISE_KEY = "_closePromise";

/**
 * @private
 */
oj.OffcanvasUtils.GLASS_PANE_KEY = "_glassPane";

/**
 * @private
 */
oj.OffcanvasUtils.SURROGATE_KEY = "_surrogate";

/**
 * @private
 */
oj.OffcanvasUtils.SURROGATE_ATTR = "data-oj-offcanvas-surrogate-id";

/**
 * @private
 */
oj.OffcanvasUtils.OUTER_WRAPPER_SELECTOR = "oj-offcanvas-outer-wrapper";

/**
 * @private
 */
oj.OffcanvasUtils.OPEN_SELECTOR = "oj-offcanvas-open";

/**
 * @private
 */
oj.OffcanvasUtils.TRANSITION_SELECTOR = "oj-offcanvas-transition";

/**
 * @private
 */
oj.OffcanvasUtils.PIN_WRAPPER_SELECTOR = "oj-offcanvas-pin";
/**
 * @private
 */
oj.OffcanvasUtils.PIN_TRANSITION_SELECTOR = "oj-offcanvas-pin-transition";

/**
 * @private
 */
oj.OffcanvasUtils.GLASSPANE_SELECTOR = "oj-offcanvas-glasspane";

/**
 * @private
 */
oj.OffcanvasUtils.GLASSPANE_DIM_SELECTOR = "oj-offcanvas-glasspane-dim";

/**
 * @private
 */
oj.OffcanvasUtils.VETO_BEFOREOPEN_MSG = "ojbeforeopen veto";
oj.OffcanvasUtils.VETO_BEFORECLOSE_MSG = "ojbeforeclose veto";

oj.OffcanvasUtils._shiftSelector =
{
  "start": "oj-offcanvas-shift-start",
  "end": "oj-offcanvas-shift-end",
  "top": "oj-offcanvas-shift-down",
  "bottom": "oj-offcanvas-shift-up"
};

oj.OffcanvasUtils._drawerSelector =
{
  "start": "oj-offcanvas-start",
  "end": "oj-offcanvas-end",
  "top": "oj-offcanvas-top",
  "bottom": "oj-offcanvas-bottom"
};

oj.OffcanvasUtils._getDisplayMode = function(offcanvas)
{
  var displayMode = offcanvas[oj.OffcanvasUtils.DISPLAY_MODE_KEY];
  if (displayMode !== oj.OffcanvasUtils.DISPLAY_MODE_OVERLAY &&
      displayMode !== oj.OffcanvasUtils.DISPLAY_MODE_PUSH &&
      displayMode !== oj.OffcanvasUtils.DISPLAY_MODE_PIN)
  {
    //default displayMode in iOS is push and in android and windows are overlay
    displayMode = (oj.ThemeUtils.parseJSONFromFontFamily('oj-offcanvas-option-defaults') || {})["displayMode"];
  }

  return displayMode;
};

oj.OffcanvasUtils._getDrawer = function(offcanvas)
{
  return $(offcanvas[oj.OffcanvasUtils.SELECTOR_KEY]);
};

oj.OffcanvasUtils._isModal = function(offcanvas)
{
  return offcanvas[oj.OffcanvasUtils.MODALITY_KEY] === oj.OffcanvasUtils.MODALITY_MODAL;
};


//Returns whether the drawer is currently open.
oj.OffcanvasUtils._isOpen = function(drawer)
{
  return drawer.hasClass(oj.OffcanvasUtils.OPEN_SELECTOR);
};

oj.OffcanvasUtils._getOuterWrapper = function(drawer)
{
  return drawer.closest("." + oj.OffcanvasUtils.OUTER_WRAPPER_SELECTOR);
};

//selector
//displayMode
oj.OffcanvasUtils._getAnimateWrapper = function(offcanvas)
{
  var drawer = oj.OffcanvasUtils._getDrawer(offcanvas);
  if (oj.OffcanvasUtils._noInnerWrapper(offcanvas) ||
      offcanvas[oj.OffcanvasUtils.DISPLAY_MODE_KEY] === oj.OffcanvasUtils.DISPLAY_MODE_OVERLAY) {
    return drawer;
  }
  else {
    return drawer.parent();
  }
};


oj.OffcanvasUtils._getShiftSelector = function(edge)
{
  var selector = oj.OffcanvasUtils._shiftSelector[edge];
  if (! selector)
    throw "Invalid edge: " + edge;

  return selector;
};

oj.OffcanvasUtils._isRTL = function()
{
  return oj.DomUtils.getReadingDirection() === "rtl";
};


oj.OffcanvasUtils._setTransform = function(wrapper, transform)
{
  wrapper.css({
    "-webkit-transform": transform,
    "transform": transform
    });
};

oj.OffcanvasUtils._getTranslationX = function(edge, width, negate)
{
  var minus = (edge === oj.OffcanvasUtils.EDGE_END);
  if (oj.OffcanvasUtils._isRTL() || negate)
    minus = ! minus;

  return "translate3d(" + (minus? "-" : "") + width + ", 0, 0)";
};

oj.OffcanvasUtils._setTranslationX = function(wrapper, edge, width)
{
  oj.OffcanvasUtils._setTransform(wrapper, oj.OffcanvasUtils._getTranslationX(edge, width, false));
};

oj.OffcanvasUtils._getTranslationY = function(edge, height)
{
  var minus = (edge === oj.OffcanvasUtils.EDGE_BOTTOM) ? "-" : "";
  return "translate3d(0, " + minus + height + ", 0)";
};

oj.OffcanvasUtils._setTranslationY = function(wrapper, edge, height)
{
  oj.OffcanvasUtils._setTransform(wrapper, oj.OffcanvasUtils._getTranslationY(edge, height));
};

oj.OffcanvasUtils._getTranslationY2 = function(height, negate)
{
  var minus = negate ? "-" : "";
  return "translate3d(0, " + minus + height + ", 0)";
};

oj.OffcanvasUtils._setAnimateClass = function(offcanvas, drawer, $main,
                                              dtranslation, mtranslation)
{
  drawer.addClass(oj.OffcanvasUtils.TRANSITION_SELECTOR);
  oj.OffcanvasUtils._setTransform(drawer, dtranslation);
  $main.addClass(oj.OffcanvasUtils.TRANSITION_SELECTOR);
  oj.OffcanvasUtils._setTransform($main, mtranslation);
};


oj.OffcanvasUtils._saveEdge = function(offcanvas)
{
  var edge = offcanvas["edge"];
  var drawer = oj.OffcanvasUtils._getDrawer(offcanvas);

  if (! edge || ! edge.length)
  {
    if (drawer.hasClass("oj-offcanvas-start"))
      edge = oj.OffcanvasUtils.EDGE_START;
    else if (drawer.hasClass("oj-offcanvas-end"))
      edge = oj.OffcanvasUtils.EDGE_END;
    else if (drawer.hasClass("oj-offcanvas-top"))
      edge = oj.OffcanvasUtils.EDGE_TOP;
    else if (drawer.hasClass("oj-offcanvas-bottom"))
      edge = oj.OffcanvasUtils.EDGE_BOTTOM;
    //default to start edge
    else
      edge = oj.OffcanvasUtils.EDGE_START;
  }
  $.data(drawer[0], oj.OffcanvasUtils._DATA_EDGE_KEY, edge);

  return edge;
};

oj.OffcanvasUtils._getEdge = function(drawer)
{
  return $.data(drawer[0], oj.OffcanvasUtils._DATA_EDGE_KEY);
};


//This method is called right before open and after close animation
//selector
//edge
//displayMode
oj.OffcanvasUtils._toggleClass = function(offcanvas, wrapper, isOpen)
{
  var displayMode = offcanvas[oj.OffcanvasUtils.DISPLAY_MODE_KEY],
      drawer = oj.OffcanvasUtils._getDrawer(offcanvas),

      drawerClass = oj.OffcanvasUtils.OPEN_SELECTOR,
      wrapperClass = (displayMode === oj.OffcanvasUtils.DISPLAY_MODE_OVERLAY) ?
                      oj.OffcanvasUtils.TRANSITION_SELECTOR + " oj-offcanvas-overlay" :
                      oj.OffcanvasUtils.TRANSITION_SELECTOR;

  //toggle offcanvas and inner wrapper classes
  if (isOpen)
  {
    drawer.addClass(drawerClass);
    wrapper.addClass(wrapperClass);
  }
  else
  {
    //remove oj-focus-highlight
    if (offcanvas["makeFocusable"]) {
      oj.DomUtils.makeFocusable({
        'element': drawer,
        'remove': true
      });
    }

    //restore the original tabindex
    var oTabIndex = offcanvas["tabindex"];
    if (oTabIndex === undefined)
      drawer.removeAttr("tabindex");
    else
      drawer.attr("tabindex", oTabIndex);

    drawer.removeClass(drawerClass);
    wrapper.removeClass(wrapperClass);
  }

};

// Focus is automatically moved to the first item that matches the following:
// The first element within the offcanvas with the autofocus attribute
// The first :tabbable element inside the offcanvas
// The offcanvas itself
oj.OffcanvasUtils._setFocus = function(offcanvas)
{
  var drawer = oj.OffcanvasUtils._getDrawer(offcanvas),
      focusables = drawer.find("[autofocus]"),
      focusNode;

  if (focusables.length == 0) {
    focusables = drawer.find(":tabbable");
  }
  if (focusables.length == 0) {
    var oTabIndex = drawer.attr("tabindex");
    if (oTabIndex !== undefined)
    {
      //save the original tabindex
      offcanvas["tabindex"] = oTabIndex;
    }
    // set tabIndex so the div is focusable
    drawer.attr("tabindex", "-1");
    focusNode = drawer;

    oj.DomUtils.makeFocusable({
      'element': drawer,
      'applyHighlight': true
    });

    offcanvas["makeFocusable"] = true;
  }
  else {
    focusNode = focusables[0];
  }

  oj.FocusUtils.focusElement(focusNode);

};

oj.OffcanvasUtils._isAutoDismiss = function(offcanvas)
{
  return offcanvas["autoDismiss"] != "none";
};

oj.OffcanvasUtils._calcTransitionTime = function ($elem)
{
  var propertyArray = $elem.css('transitionProperty').split(',');
  var delayArray = $elem.css('transitionDelay').split(',');
  var durationArray = $elem.css('transitionDuration').split(',');
  var maxTime = 0;
  
  for (var i = 0; i < propertyArray.length; i++)
  {
    var duration = durationArray[i % durationArray.length];
    var durationMs = (duration.indexOf('ms') > -1) ? parseFloat(duration) : parseFloat(duration) * 1000;
    if (durationMs > 0)
    {
      var delay = delayArray[i % delayArray.length];
      var delayMs = (delay.indexOf('ms') > -1) ? parseFloat(delay) : parseFloat(delay) * 1000;

      maxTime = Math.max(maxTime, delayMs + durationMs);
    }
  }

  return maxTime + 100;
};

oj.OffcanvasUtils._onTransitionEnd = function(target, handler)
{
  var endEvents = "transitionend.oc webkitTransitionEnd.oc";
  var transitionTimer;
  var listener =
    function ()
    {
      if (transitionTimer)
      {
        clearTimeout(transitionTimer);
        transitionTimer = undefined;
      }
      //remove handler
      target.off(endEvents, listener);

      handler(target);
    };

  //add transition end listener
  target.on(endEvents, listener);

  transitionTimer = 
    setTimeout(listener, oj.OffcanvasUtils._calcTransitionTime(target));
};


oj.OffcanvasUtils._closeWithCatch = function(offcanvas)
{
  // - offcanvas: error occurs when you veto the ojbeforeclose event
  oj.OffcanvasUtils.close(offcanvas)['catch'](function(reason) {
    oj.Logger.warn("Offcancas close failed: " + reason);
  });
};

//check offcanvas.autoDismiss
//update offcanvas.dismisHandler
oj.OffcanvasUtils._registerCloseHandler = function(offcanvas)
{
  //unregister the old handler if exists
  oj.OffcanvasUtils._unregisterCloseHandler(offcanvas);

  if (oj.OffcanvasUtils._isAutoDismiss(offcanvas))
  {
    var drawer = oj.OffcanvasUtils._getDrawer(offcanvas);

    //save dismisHandler
    var dismisHandler = offcanvas[oj.OffcanvasUtils.DISMISS_HANDLER_KEY] =
      function(event)
      {
        var target = event.target;

        // Ignore mouse events on the scrollbar. FF and Chrome, raises focus events on the
        // scroll container too.
        if (oj.DomUtils.isChromeEvent(event) ||
            ("focus" === event.type && !$(target).is(":focusable")))
          return;

        var key = $.data(drawer[0], oj.OffcanvasUtils._DATA_OFFCANVAS_KEY);
        if (key == null)
        {
          // offcanvas already destroyed, unregister the handler
          oj.OffcanvasUtils._unregisterCloseHandler(offcanvas);
          return;
        }

        // if event target is not the offcanvas dom subtrees, dismiss it
        if (! oj.DomUtils.isLogicalAncestorOrSelf(drawer[0], target))
        {
          oj.OffcanvasUtils._closeWithCatch(offcanvas);
        }
      };

    var documentElement = document.documentElement;
    if (oj.DomUtils.isTouchSupported())
      documentElement.addEventListener("touchstart", dismisHandler, true);

    documentElement.addEventListener("mousedown", dismisHandler, true);
    documentElement.addEventListener("focus", dismisHandler, true);
  }

  //register swipe handler
  oj.OffcanvasUtils._registerSwipeHandler(offcanvas);
};

//check offcanvas.autoDismiss
//update offcanvas.dismisHandler
oj.OffcanvasUtils._unregisterCloseHandler = function(offcanvas)
{
  var dismisHandler = offcanvas[oj.OffcanvasUtils.DISMISS_HANDLER_KEY];
  if (dismisHandler) {
    var documentElement = document.documentElement;

    if (oj.DomUtils.isTouchSupported())
      documentElement.removeEventListener("touchstart", dismisHandler, true);

    documentElement.removeEventListener("mousedown", dismisHandler, true);
    documentElement.removeEventListener("focus", dismisHandler, true);
    delete offcanvas[oj.OffcanvasUtils.DISMISS_HANDLER_KEY];

    offcanvas[oj.OffcanvasUtils.DISMISS_HANDLER_KEY] = null;
  }

  //unregister swipe handler
  oj.OffcanvasUtils._unregisterSwipeHandler(offcanvas);

};

oj.OffcanvasUtils._registerSwipeHandler = function(offcanvas)
{
  if (oj.DomUtils.isTouchSupported())
  {
    var selector = offcanvas[oj.OffcanvasUtils.SELECTOR_KEY],
        drawer = $(selector),
        edge = oj.OffcanvasUtils._getEdge(drawer),
        swipeEvent,
        options,
        drawerHammer;

    if ((edge === oj.OffcanvasUtils.EDGE_START && ! oj.OffcanvasUtils._isRTL()) ||
        (edge === oj.OffcanvasUtils.EDGE_END && oj.OffcanvasUtils._isRTL()))
    {
      options = {
        "recognizers": [
          [Hammer.Swipe, {"direction": Hammer["DIRECTION_LEFT"]}]
      ]};

      swipeEvent = "swipeleft";
    }
    else if ((edge === oj.OffcanvasUtils.EDGE_START && oj.OffcanvasUtils._isRTL()) ||
             (edge === oj.OffcanvasUtils.EDGE_END && ! oj.OffcanvasUtils._isRTL()))
    {
      options = {
        "recognizers": [
          [Hammer.Swipe, {"direction": Hammer["DIRECTION_RIGHT"]}]
      ]};

      swipeEvent = "swiperight";
    }
    else if (edge === oj.OffcanvasUtils.EDGE_TOP)
    {
      options = {
        "recognizers": [
          [Hammer.Swipe, {"direction": Hammer["DIRECTION_UP"]}]
      ]};

      swipeEvent = "swipeup";
    }
    else if (edge === oj.OffcanvasUtils.EDGE_BOTTOM)
    {
      options = {
        "recognizers": [
          [Hammer.Swipe, {"direction": Hammer["DIRECTION_DOWN"]}]
      ]};

      swipeEvent = "swipedown";
    }

    drawerHammer = drawer
      .ojHammer(options)
      .on(swipeEvent, function(event)
      {
        if (event.target === drawer[0]) {
          event.preventDefault();
          oj.OffcanvasUtils._closeWithCatch(offcanvas);
        }
      });

    //keep the hammer in the offcanvas jquery data
    $.data($(selector)[0], oj.OffcanvasUtils._DATA_HAMMER_KEY,
           {"event": swipeEvent,
            "hammer": drawerHammer
           });
  }
};

oj.OffcanvasUtils._unregisterSwipeHandler = function(offcanvas)
{
  var drawer = oj.OffcanvasUtils._getDrawer(offcanvas);
  if (drawer.length > 0)
  {
    var dHammer = $.data(drawer[0], oj.OffcanvasUtils._DATA_HAMMER_KEY);
    if (dHammer)
    {
      dHammer["hammer"].off(dHammer["event"]);
    }
  }

};

oj.OffcanvasUtils._isFixed = function(drawer)
{
  return oj.OffcanvasUtils._getOuterWrapper(drawer).hasClass("oj-offcanvas-page");
};

oj.OffcanvasUtils._isPin = function(offcanvas)
{
  return (offcanvas[oj.OffcanvasUtils.DISPLAY_MODE_KEY] === oj.OffcanvasUtils.DISPLAY_MODE_PIN);
};

oj.OffcanvasUtils._noInnerWrapper = function(offcanvas)
{
  return (offcanvas[oj.OffcanvasUtils.CONTENT_KEY] ||
          oj.OffcanvasUtils._isFixed(oj.OffcanvasUtils._getDrawer(offcanvas)) ||
          oj.OffcanvasUtils._isPin(offcanvas))
};

oj.OffcanvasUtils._saveStyles = function(drawer)
{
  var style = drawer.attr("style");
  if (style !== undefined)
    $.data(drawer[0], oj.OffcanvasUtils._DATA_STYLE_KEY, style);

};

oj.OffcanvasUtils._restoreStyles = function(drawer)
{
  var style = $.data(drawer[0], oj.OffcanvasUtils._DATA_STYLE_KEY);
  if (style)
    drawer.attr("style", style);
  else
    drawer.removeAttr("style");
};

oj.OffcanvasUtils._toggleOuterWrapper = function(offcanvas, drawer, test)
{
  var edge = oj.OffcanvasUtils._getEdge(drawer),
      shiftSelector = oj.OffcanvasUtils._getShiftSelector(edge),
      outerWrapper = oj.OffcanvasUtils._getOuterWrapper(drawer);
  oj.Assert.assertPrototype(outerWrapper, $);

  var isOpen = outerWrapper.hasClass(shiftSelector);
  if (! test) {
    outerWrapper.toggleClass(shiftSelector, ! isOpen);
  }

  return isOpen;
};

oj.OffcanvasUtils._afterCloseHandler = function(offcanvas)
{
  // - customsyntax memory leak: offcanvas needs to implement _disconnected
  //unregister dismiss handler
  oj.OffcanvasUtils._unregisterCloseHandler(offcanvas);

  var drawer = oj.OffcanvasUtils._getDrawer(offcanvas);
  var isPin = oj.OffcanvasUtils._isPin(offcanvas);

  //validate offcanvas
  var curOffcanvas = null;
  try {
    curOffcanvas = $.data(drawer[0], oj.OffcanvasUtils._DATA_OFFCANVAS_KEY);
  }
  catch (e) {
  }
  if (curOffcanvas !== offcanvas)
    return;

  // bail and do final cleanup if pan to reveal is in progress
  if (offcanvas["_panInProgress"])
  {
    $.removeData(drawer[0], oj.OffcanvasUtils._DATA_OFFCANVAS_KEY);
    return;
  }

  var edge = oj.OffcanvasUtils._getEdge(drawer),
      wrapper = oj.OffcanvasUtils._getAnimateWrapper(offcanvas);

  //After animation, set display:none and remove transition class
  if (isPin) {
    drawer.removeClass(oj.OffcanvasUtils.OPEN_SELECTOR + " " +
                      oj.OffcanvasUtils.PIN_TRANSITION_SELECTOR);
  }
  else {
    oj.OffcanvasUtils._toggleClass(offcanvas, wrapper, false);
  }

  //Remove the glassPane if offcanvas is modal
  oj.OffcanvasUtils._removeModality(offcanvas, drawer);

  if (isPin) {
    oj.OffcanvasUtils._getOuterWrapper(drawer).removeClass(oj.OffcanvasUtils.PIN_WRAPPER_SELECTOR);

    oj.OffcanvasUtils._restoreStyles(drawer);
  }

  //fire after close event
  drawer.trigger("ojclose", offcanvas);

  //remove data associate with the offcanvas
  $.removeData(drawer[0], oj.OffcanvasUtils._DATA_OFFCANVAS_KEY);

};

//Set whether the offcanvas is fixed inside the viewport
oj.OffcanvasUtils._setVisible = function(selector, visible, edge)
{
  var drawer = $(selector);
  visible = !! visible;

  //close the offcanvas without animation if it's open
  if (visible && oj.OffcanvasUtils._isOpen(drawer)) {
    //hide offcanvas without animation
    oj.OffcanvasUtils._close(selector, false);
  }

  //toggle "oj-offcanvas-" + edge class
  drawer.toggleClass(oj.OffcanvasUtils._drawerSelector[edge], ! visible);

};


/**
 * Setup offcanvas for the responsive layout.
 * This method adds a listener based on the media query specified in offcanvas.query.
 * When the media query matches the listener is called and offcanvas behavior is removed.
 * When the media query does not match the listener is called and off canvas behavior is added.
 *
 * @export
 * @param {Object} offcanvas An Object contains the properties in the following table.
 * @property {string} offcanvas.selector JQ selector identifying the offcanvas
 * @property {string} offcanvas.edge the edge of the offcanvas, valid values are start, end, top, bottom. This property is optional if the offcanvas element has a "oj-offcanvas-" + <edge> class specified.
 * @property {string} offcanvas.query the media query determine when the offcanvas is fixed inside the viewport.
 *
 * @see #tearDownResponsive
 *
 * @example <caption>Setup the offcanvas:</caption>
 *    var offcanvas = {
 *      "selector": "#startDrawer",
 *      "edge": "start",
 *      "query": oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.LG_UP)
 *    };
 *
 * oj.OffcanvasUtils.setupResponsive(offcanvas);
 *
 */
oj.OffcanvasUtils.setupResponsive = function(offcanvas)
{
  var mqs = offcanvas["query"];
  if (mqs !== null)
  {
    var selector = offcanvas[oj.OffcanvasUtils.SELECTOR_KEY],
        query = window.matchMedia(mqs);

    //save the edge
    var edge = oj.OffcanvasUtils._saveEdge(offcanvas);
    var mqListener = function(event)
    {
      //when event.matches=true fix the offcanvas inside the visible viewport.
      oj.OffcanvasUtils._setVisible(selector, event.matches, edge);
    }

    query.addListener(mqListener);
    oj.OffcanvasUtils._setVisible(selector, query.matches, edge);

    //keep the listener in the offcanvas jquery data
    $.data($(selector)[0], oj.OffcanvasUtils._DATA_MEDIA_QUERY_KEY,
           {"mqList": query,
            "mqListener": mqListener
           });
  }
};

/**
 * Removes the listener that was added in setupResponsive.  Page authors should call tearDownResponsive when the offcanvas is no longer needed.
 *
 * @export
 * @param {Object} offcanvas An Object contains the properties in the following table.
 * @property {string} offcanvas.selector JQ selector identifying the offcanvas
 * @see #setupResponsive
 *
 * @example <caption>TearDown the offcanvas:</caption>
 *    var offcanvas = {
 *      "selector": "#startDrawer"
 *    };
 *
 * oj.OffcanvasUtils.tearDownResponsive(offcanvas);
 *
 */
oj.OffcanvasUtils.tearDownResponsive = function(offcanvas)
{
  var drawer = oj.OffcanvasUtils._getDrawer(offcanvas);
  var mql = $.data(drawer[0], oj.OffcanvasUtils._DATA_MEDIA_QUERY_KEY);
  if (mql)
  {
    mql["mqList"].removeListener(mql["mqListener"]);
    $.removeData(drawer[0], oj.OffcanvasUtils._DATA_MEDIA_QUERY_KEY);
  }
};


oj.OffcanvasUtils._openPush = function(offcanvas, resolve, reject, edge)
{
  var drawer = oj.OffcanvasUtils._getDrawer(offcanvas);
  var $main = $(offcanvas[oj.OffcanvasUtils.CONTENT_KEY]);
  oj.Assert.assertPrototype($main, $);

  //since drawer and main are animated seperately,
  //only resolve true when both transitions are ended
  var pending = true;

  var size = offcanvas["size"];
  var translation;

  //transition end handler
  var endHandler = function ($elem)
  {
    //After animation, remove transition class
    $elem.removeClass(oj.OffcanvasUtils.TRANSITION_SELECTOR);

    if (pending) {
      pending = false;
    }
    else {
      // - opening offcanvas automatically scrolls to the top
      oj.OffcanvasUtils._setFocus(offcanvas);

      //fire after open event
      drawer.trigger("ojopen", offcanvas);

      // - push and overlay demos don't work in ie11
      //register dismiss handler as late as possible because IE raises focus event
      //on the launcher that will close the offcanvas if autoDismiss is true
      oj.OffcanvasUtils._registerCloseHandler(offcanvas);

      resolve(true);
    }
  };

  //set display block to get size of offcanvas
  drawer.addClass(oj.OffcanvasUtils.OPEN_SELECTOR);

  //set translationX or Y
  window.setTimeout(function () {
    //if size is not specified, outerWidth/outerHeight is used
    if (edge === oj.OffcanvasUtils.EDGE_START || edge === oj.OffcanvasUtils.EDGE_END) {
      if (size === undefined)
        size = drawer.outerWidth(true) + "px";

      // - offcanvas: drawer push animation is incorrect in rtl mode
//      oj.OffcanvasUtils._setTransform(drawer,
//                                      oj.OffcanvasUtils._getTranslationX(edge, size, true));
      translation = oj.OffcanvasUtils._getTranslationX(edge, size, false);
    }
    else {
      if (size === undefined)
        size = drawer.outerHeight(true) + "px";

      oj.OffcanvasUtils._setTransform(drawer,
        oj.OffcanvasUtils._getTranslationY2(size, edge === oj.OffcanvasUtils.EDGE_TOP));

      translation = oj.OffcanvasUtils._getTranslationY2(size, edge !== oj.OffcanvasUtils.EDGE_TOP);
    }

    //before animation
    window.setTimeout(function () {
      //add transition class
      oj.OffcanvasUtils._setAnimateClass(offcanvas, drawer, $main,
                                         "translate3d(0, 0, 0)", translation);

      oj.OffcanvasUtils._toggleOuterWrapper(offcanvas, drawer, false);

      //add transition end listener
      oj.OffcanvasUtils._onTransitionEnd($main, endHandler);
      oj.OffcanvasUtils._onTransitionEnd(drawer, endHandler);

    }, 0); //before animation

  }, 0);    //set translationX or Y


  //insert a glassPane if offcanvas is modal
  oj.OffcanvasUtils._applyModality(offcanvas, drawer);

};

oj.OffcanvasUtils._openOverlay = function(offcanvas, resolve, reject, edge)
{
  var drawer = oj.OffcanvasUtils._getDrawer(offcanvas);

  //Before animation, remove display:none and add transition class
  oj.OffcanvasUtils._toggleClass(offcanvas, drawer, true);

  var size = offcanvas["size"];
  if (size) {
    if (edge === oj.OffcanvasUtils.EDGE_START || edge === oj.OffcanvasUtils.EDGE_END) {
      oj.OffcanvasUtils._setTransform(drawer,
                                      oj.OffcanvasUtils._getTranslationX(edge, size, true));
    }
    else {
      oj.OffcanvasUtils._setTransform(drawer,
                                      oj.OffcanvasUtils._getTranslationY(edge, size));
    }
  }

  //show the drawer
  window.setTimeout(function ()
  {
    oj.OffcanvasUtils._toggleOuterWrapper(offcanvas, drawer, false);

  }, 20); //chrome is fine with 0ms but FF needs ~10ms or it wont animate

  //insert a glassPane if offcanvas is modal
  oj.OffcanvasUtils._applyModality(offcanvas, drawer);

  //add transition end listener
  oj.OffcanvasUtils._onTransitionEnd(drawer,
    function () {
      //After animation, remove transition class
      drawer.removeClass(oj.OffcanvasUtils.TRANSITION_SELECTOR);

      // - opening offcanvas automatically scrolls to the top
      oj.OffcanvasUtils._setFocus(offcanvas);

      //fire after open event
      drawer.trigger("ojopen", offcanvas);

      // - push and overlay demos don't work in ie11
      //register dismiss handler as late as possible because IE raises focus event
      //on the launcher that will close the offcanvas if autoDismiss is true
      oj.OffcanvasUtils._registerCloseHandler(offcanvas);

      resolve(true);
    });

};

/*
oj.OffcanvasUtils._openPin = function(offcanvas, resolve, reject, edge)
{
  var drawer = oj.OffcanvasUtils._getDrawer(offcanvas);
  var $main = $(offcanvas[oj.OffcanvasUtils.CONTENT_KEY]);
  oj.Assert.assertPrototype($main, $);

  var size = offcanvas["size"];

  //set display block to get size of offcanvas
  drawer.addClass(oj.OffcanvasUtils.OPEN_SELECTOR);

  //set translationX
  window.setTimeout(function () {
    //if size is not specified, outerWidth is used
    if (size === undefined)
      size = drawer.outerWidth(true) + "px";

    drawer.addClass(oj.OffcanvasUtils.PIN_TRANSITION_SELECTOR);

    //make the outer wrapper a flex layout
    oj.OffcanvasUtils._getOuterWrapper(drawer).addClass(oj.OffcanvasUtils.PIN_WRAPPER_SELECTOR);

    oj.OffcanvasUtils._saveStyles(drawer);

    //clear transform only work if set style
    oj.OffcanvasUtils._setTransform(drawer, "none");

    //animate on min-width
    window.setTimeout(function () {
      drawer.css("min-width", size);

      oj.OffcanvasUtils._toggleOuterWrapper(offcanvas, drawer, false);
    }, 10);

  }, 0);    //set translationX

  //insert a glassPane if offcanvas is modal
  oj.OffcanvasUtils._applyModality(offcanvas, drawer);

  //add transition end listener
  oj.OffcanvasUtils._onTransitionEnd(drawer,
    function () {
      //After animation, remove transition class
//      drawer.removeClass(oj.OffcanvasUtils.TRANSITION_SELECTOR);

      // - opening offcanvas automatically scrolls to the top
      oj.OffcanvasUtils._setFocus(offcanvas);

      //fire after open event
      drawer.trigger("ojopen", offcanvas);

      // - push and overlay demos don't work in ie11
      //register dismiss handler as late as possible because IE raises focus event
      //on the launcher that will close the offcanvas if autoDismiss is true
      oj.OffcanvasUtils._registerCloseHandler(offcanvas);

      resolve(true);
    });
};
*/

oj.OffcanvasUtils._closePush = function(offcanvas, resolve, reject, drawer, animation)
{
  var $main = $(offcanvas[oj.OffcanvasUtils.CONTENT_KEY]);
  //since drawer and main are animated seperately,
  //only resolve true when both transitions are ended
  var pending = true;

  // - issue in ojoffcanvas when used inside ojtabs
  var endHandler = function ()
  {
    if (! pending)
    {
      //clear transform translation on $main
      $main.removeClass(oj.OffcanvasUtils.TRANSITION_SELECTOR);
      oj.OffcanvasUtils._setTransform($main, "");
      oj.OffcanvasUtils._afterCloseHandler(offcanvas);
      resolve(true);
    }
    pending = false;
  };

  //clear transform
  oj.OffcanvasUtils._setTransform(drawer, "");
  oj.OffcanvasUtils._setTransform($main, "");
  oj.OffcanvasUtils._toggleOuterWrapper(offcanvas, drawer, false);

  //dim glassPane
  if (oj.OffcanvasUtils._isModal(offcanvas))
    offcanvas[oj.OffcanvasUtils.GLASS_PANE_KEY].removeClass(oj.OffcanvasUtils.GLASSPANE_DIM_SELECTOR);

  if (animation) {
    //Before animation, add transition class
    $main.addClass(oj.OffcanvasUtils.TRANSITION_SELECTOR);
    drawer.addClass(oj.OffcanvasUtils.TRANSITION_SELECTOR);

    //add transition end listener
    oj.OffcanvasUtils._onTransitionEnd(drawer, endHandler);
    oj.OffcanvasUtils._onTransitionEnd($main, endHandler);
  }
  else {
    pending = false;
    endHandler();
  }
};

oj.OffcanvasUtils._closeOverlay = function(offcanvas, resolve, reject, drawer, animation)
{
  var endHandler = function ()
  {
    oj.OffcanvasUtils._afterCloseHandler(offcanvas);
    resolve(true);
  };

  //clear transform
  oj.OffcanvasUtils._toggleOuterWrapper(offcanvas, drawer, false);

  //dim glassPane
  if (oj.OffcanvasUtils._isModal(offcanvas))
    offcanvas[oj.OffcanvasUtils.GLASS_PANE_KEY].removeClass(oj.OffcanvasUtils.GLASSPANE_DIM_SELECTOR);

  if (animation) {
    drawer.addClass(oj.OffcanvasUtils.TRANSITION_SELECTOR);

    //add transition end listener
    oj.OffcanvasUtils._onTransitionEnd(drawer, endHandler);
  }
  else {
    endHandler();
  }
};


oj.OffcanvasUtils._openOldDrawer = function(offcanvas, resolve, reject, edge, displayMode)
{
  var drawer = oj.OffcanvasUtils._getDrawer(offcanvas);
  var wrapper = oj.OffcanvasUtils._getAnimateWrapper(offcanvas);
  oj.Assert.assertPrototype(wrapper, $);

  //Before animation, remove display:none and add transition class
  oj.OffcanvasUtils._toggleClass(offcanvas, wrapper, true);

  var size;
  if (edge === oj.OffcanvasUtils.EDGE_START || edge === oj.OffcanvasUtils.EDGE_END)
  {
    //if size is missing, outerWidth is used
    size = (size === undefined) ? (drawer.outerWidth(true) + "px") : size;

    //don't set transform for oj.OffcanvasUtils.DISPLAY_MODE_OVERLAY
    if (displayMode === oj.OffcanvasUtils.DISPLAY_MODE_PUSH)
      oj.OffcanvasUtils._setTranslationX(wrapper, edge, size);
  }
  else
  {
    //if size is missing, outerHeight is used
    size = (size === undefined) ? (drawer.outerHeight(true) + "px") : size;

    //don't set transform for oj.OffcanvasUtils.DISPLAY_MODE_OVERLAY
    if (displayMode === oj.OffcanvasUtils.DISPLAY_MODE_PUSH)
      oj.OffcanvasUtils._setTranslationY(wrapper, edge, size);
  }

  //show the drawer
  window.setTimeout(function ()
  {
    oj.OffcanvasUtils._toggleOuterWrapper(offcanvas, drawer, false);

  }, 10); //chrome is fine with 0ms but FF needs ~10ms or it wont animate

  //insert a glassPane if offcanvas is modal
  oj.OffcanvasUtils._applyModality(offcanvas, drawer);

  //add transition end listener
  oj.OffcanvasUtils._onTransitionEnd(wrapper,
    function () {
      //After animation, remove transition class
      wrapper.removeClass(oj.OffcanvasUtils.TRANSITION_SELECTOR);

      // - opening offcanvas automatically scrolls to the top
      oj.OffcanvasUtils._setFocus(offcanvas);

      //fire after open event
      drawer.trigger("ojopen", offcanvas);

      // - push and overlay demos don't work in ie11
      //register dismiss handler as late as possible because IE raises focus event
      //on the launcher that will close the offcanvas if autoDismiss is true
      oj.OffcanvasUtils._registerCloseHandler(offcanvas);

      resolve(true);
    });

};

/*
oj.OffcanvasUtils._closePin = function(offcanvas, resolve, reject, drawer, animation)
{
  var endHandler = function ()
  {
    oj.OffcanvasUtils._afterCloseHandler(offcanvas);
    resolve(true);
  };

  //clear transform
  oj.OffcanvasUtils._toggleOuterWrapper(offcanvas, drawer, false);

  //dim glassPane
  if (oj.OffcanvasUtils._isModal(offcanvas))
    offcanvas[oj.OffcanvasUtils.GLASS_PANE_KEY].removeClass(oj.OffcanvasUtils.GLASSPANE_DIM_SELECTOR);

  if (animation) {
    //Before animation, add transition class
    drawer.css("min-width", "0");
 
    //add transition end listener
    oj.OffcanvasUtils._onTransitionEnd(drawer, endHandler);
  }
  else {
    endHandler();
  }
};
*/

oj.OffcanvasUtils._closeOldDrawer = function(offcanvas, resolve, reject, drawer, animation)
{
  var displayMode = offcanvas[oj.OffcanvasUtils.DISPLAY_MODE_KEY],
      wrapper = oj.OffcanvasUtils._getAnimateWrapper(offcanvas);

  var endHandler = function ()
  {
    oj.OffcanvasUtils._afterCloseHandler(offcanvas);
    resolve(true);
  };

  //clear transform
  if (displayMode === oj.OffcanvasUtils.DISPLAY_MODE_PUSH) {
    oj.OffcanvasUtils._setTransform(wrapper, "");
  }
  oj.OffcanvasUtils._toggleOuterWrapper(offcanvas, drawer, false);

  //dim glassPane
  if (oj.OffcanvasUtils._isModal(offcanvas))
    offcanvas[oj.OffcanvasUtils.GLASS_PANE_KEY].removeClass(oj.OffcanvasUtils.GLASSPANE_DIM_SELECTOR);

  if (animation) {
    //Before animation, add transition class
    wrapper.addClass(oj.OffcanvasUtils.TRANSITION_SELECTOR);

    //add transition end listener
    oj.OffcanvasUtils._onTransitionEnd(wrapper, endHandler);
  }
  else {
    endHandler();
  }

};


/**
 * Shows the offcanvas by sliding it into the viewport.  This method fire an ojbeforeopen event which can be vetoed by attaching a listener and returning false.  If the open is not vetoed, this method will fire an ojopen event once animation has completed.
 *
 *<p>Upon opening a offcanvas, focus is automatically moved to the first item that matches the following:</p>
 *<ol>
 *  <li>The first element within the offcanvas with the <code>autofocus</code> attribute</li>
 *  <li>The first <code>:tabbable</code> element inside the offcanvas</li>
 *  <li>The offcanvas itself</li>
 *</ol>
 *
 * @export
 * @param {Object} offcanvas An Object contains the properties in the following table.
 * @property {string} offcanvas.selector JQ selector identifying the offcanvas.
 * @property {string} offcanvas.content JQ selector identifying the main content.
 * @property {string} offcanvas.edge the edge of the offcanvas, valid values are start, end, top, bottom. This property is optional if the offcanvas element has a "oj-offcanvas-" + <edge> class specified.
 * @property {string} offcanvas.displayMode how to show the offcanvas, valid values are push or overlay. Default: defined by theme.
 * @property {string} offcanvas.autoDismiss close behavior, valid values are focusLoss and none. If autoDismiss is default(focusLoss) then any click outside the offcanvas will close it.
 * @property {string} offcanvas.size size width or height of the offcanvas: width if edge is start or end and height if edge is to and bottom. Default to the computed width or height of the offcanvas.
 * @property {string} offcanvas.modality The modality of the offcanvas. Valid values are modal and modeless. Default: modeless. If the offcanvas is modal, interaction with the main content area is disabled like in a modal dialog.
 * @returns {Promise} A promise that is resolved when all transitions have completed. The promise is rejected if the ojbeforeopen event is vetoed.
 * @see #close
 * @see #toggle
 *
 * @example <caption>Slide the offcanvas into the viewport:</caption>
 *    var offcanvas = {
 *      "selector": "#startDrawer",
 *      "content": "#mainContent",
 *      "edge": "start",
 *      "displayMode": "push",
 *      "size": "200px"
 *    };
 *
 * oj.OffcanvasUtils.open(offcanvas);
 *
 */
oj.OffcanvasUtils.open = function(offcanvas)
{
  var drawer = oj.OffcanvasUtils._getDrawer(offcanvas);
  var oldOffcanvas = $.data(drawer[0], oj.OffcanvasUtils._DATA_OFFCANVAS_KEY);
  if (oldOffcanvas) {
    //if we are in the middle of closing, then return the previous saved promise
    if (oldOffcanvas[oj.OffcanvasUtils.CLOSE_PROMISE_KEY])
      return oldOffcanvas[oj.OffcanvasUtils.CLOSE_PROMISE_KEY];

    //if we are in the middle of opening, then return the previous saved promise
    if (oldOffcanvas[oj.OffcanvasUtils.OPEN_PROMISE_KEY])
      return oldOffcanvas[oj.OffcanvasUtils.OPEN_PROMISE_KEY];
  }

  var resolveBusyState;
  var veto = false;
  var promise = new Promise(function(resolve, reject)
  {
    oj.Assert.assertPrototype(drawer, $);

    //save the edge
    var edge = oj.OffcanvasUtils._saveEdge(offcanvas);

    //fire before open event
    var event = $.Event("ojbeforeopen");
    drawer.trigger(event, offcanvas);
    if (event.result === false)
    {
      reject(oj.OffcanvasUtils.VETO_BEFOREOPEN_MSG);
      veto = true;
      return;
    }

    var displayMode = oj.OffcanvasUtils._getDisplayMode(offcanvas);
    var isPin = oj.OffcanvasUtils._isPin(offcanvas);

    //only support horizontal offcanvas for pin
    if (isPin && (edge === oj.OffcanvasUtils.EDGE_TOP || edge === oj.OffcanvasUtils.EDGE_BOTTOM))
      displayMode = oj.OffcanvasUtils.DISPLAY_MODE_PUSH;

    //save a copy of offcanvas object in offcanvas jquery data
    var myOffcanvas = $.extend({}, offcanvas);
    myOffcanvas[oj.OffcanvasUtils.DISPLAY_MODE_KEY] = displayMode;
    $.data(drawer[0], oj.OffcanvasUtils._DATA_OFFCANVAS_KEY, myOffcanvas);

    //throw an error if CONTENT_KEY is specified and the html markup contains an inner wrapper.
    if (offcanvas[oj.OffcanvasUtils.CONTENT_KEY]) {
      if (! oj.OffcanvasUtils._noInnerWrapper(offcanvas))
        throw "Error: Both main content selector and the inner wrapper <div class='oj-offcanvas-inner-wrapper'> are provided. Please remove the inner wrapper.";

      // Add a busy state for the animation.  The busy state resolver will be invoked
      // when the animation is completed
      var busyContext = oj.Context.getContext(drawer[0]).getBusyContext();
      resolveBusyState = busyContext.addBusyState(
        {"description" : "The offcanvas selector ='" + 
         offcanvas[oj.OffcanvasUtils.SELECTOR_KEY] + "' doing the open animation."});

      if (isPin) {
//        oj.OffcanvasUtils._openPin(myOffcanvas, resolve, reject, edge);
      }
      else if (displayMode === oj.OffcanvasUtils.DISPLAY_MODE_PUSH) {
        oj.OffcanvasUtils._openPush(myOffcanvas, resolve, reject, edge);
      }
      else {
        oj.OffcanvasUtils._openOverlay(myOffcanvas, resolve, reject, edge);
      }
    }
    else {
      oj.OffcanvasUtils._openOldDrawer(myOffcanvas, resolve, reject, edge, displayMode);
    }

  });

  promise = promise.then(function(value) {
    if (resolveBusyState) {
      resolveBusyState();
    }
    return value;
  }, function(error) {
    if (resolveBusyState) {
      resolveBusyState();
    }
    throw error;
  });

  //save away the current promise
  if (! veto) {
    var nOffcanvas = $.data(drawer[0], oj.OffcanvasUtils._DATA_OFFCANVAS_KEY);
    if (nOffcanvas) {
      nOffcanvas[oj.OffcanvasUtils.OPEN_PROMISE_KEY] = promise;

      //notify subtree
      oj.Components.subtreeShown(drawer[0]);
    }
  }

  return /** @type{Promise} */ (promise);
};

/**
 * Hides the offcanvas by sliding it out of the viewport.  This method fires an ojbeforeclose event which can be vetoed by attaching a listener and returning false.  If the close is not vetoed, this method will fire an ojclose event once animation has completed.
 *
 * @export
 * @param {Object} offcanvas An Object contains the properties in the following table.
 * @property {string} offcanvas.selector JQ selector identifying the offcanvas
 *
 * @returns {Promise} A promise that is resolved when all transitions have completed. The promise is rejected if the ojbeforeclose event is vetoed.
 * @see #open
 * @see #toggle
 *
 * @example <caption>Slide the offcanvas out of the viewport:</caption>
 *    var offcanvas = {
 *      "selector": "#startDrawer"
 *    };
 *
 * oj.OffcanvasUtils.close(offcanvas);
 *
 */
oj.OffcanvasUtils.close = function(offcanvas)
{
  return oj.OffcanvasUtils._close(offcanvas[oj.OffcanvasUtils.SELECTOR_KEY], true);
};

oj.OffcanvasUtils._close = function(selector, animation)
{
  var drawer = $(selector);

  oj.Assert.assertPrototype(drawer, $);

  var offcanvas = $.data(drawer[0], oj.OffcanvasUtils._DATA_OFFCANVAS_KEY);

  //if we are in the middle of closing, then return the previous saved promise
  if (offcanvas && offcanvas[oj.OffcanvasUtils.CLOSE_PROMISE_KEY]) {
    return offcanvas[oj.OffcanvasUtils.CLOSE_PROMISE_KEY];
  }

  var resolveBusyState;
  var veto = false;
  var promise = new Promise(function(resolve, reject)
  {
    if (oj.OffcanvasUtils._isOpen(drawer))
    {
      if (selector != offcanvas[oj.OffcanvasUtils.SELECTOR_KEY])
        resolve(true);

      //if the outer wrapper doesn't have the correct shift selector, we are done
      if (! oj.OffcanvasUtils._toggleOuterWrapper(offcanvas, drawer, true))
        resolve(true);

      //fire before close event
      var event = $.Event("ojbeforeclose");
      drawer.trigger(event, offcanvas);
      if (event.result === false)
      {
        reject(oj.OffcanvasUtils.VETO_BEFORECLOSE_MSG);
        veto = true;
        return;
      }

      // Add a busy state for the animation.  The busy state resolver will be invoked
      // when the animation is completed
      if (animation) {
        var busyContext = oj.Context.getContext(drawer[0]).getBusyContext();
        resolveBusyState = busyContext.addBusyState(
          {"description" : "The offcanvas selector ='" + 
           offcanvas[oj.OffcanvasUtils.SELECTOR_KEY] + "' doing the close animation."});
      }

      var isPin = oj.OffcanvasUtils._isPin(offcanvas);
      var displayMode = offcanvas[oj.OffcanvasUtils.DISPLAY_MODE_KEY];
      if (offcanvas[oj.OffcanvasUtils.CONTENT_KEY]) {
        if (displayMode === oj.OffcanvasUtils.DISPLAY_MODE_PUSH) {
          oj.OffcanvasUtils._closePush(offcanvas, resolve, reject, drawer, animation);
        }
/*
        else if (isPin) {
          oj.OffcanvasUtils._closePin(offcanvas, resolve, reject, drawer, animation);
        }
*/
        else {
          oj.OffcanvasUtils._closeOverlay(offcanvas, resolve, reject, drawer, animation);
        }
      }
      else {
        oj.OffcanvasUtils._closeOldDrawer(offcanvas, resolve, reject, drawer, animation);
      }
    }
    else {
      resolve(true);
    }
  });

  promise = promise.then(function(value) {
    if (resolveBusyState) {
      resolveBusyState();
    }
    return value;
  }, function(error) {
    if (resolveBusyState) {
      resolveBusyState();
    }
    throw error;
  });

  //save away the current promise
  if (! veto) {
    offcanvas = $.data(drawer[0], oj.OffcanvasUtils._DATA_OFFCANVAS_KEY);
    if (offcanvas) {
      offcanvas[oj.OffcanvasUtils.CLOSE_PROMISE_KEY] = promise;

      //notify subtree
      oj.Components.subtreeHidden(drawer[0]);
    }
  }

  return /** @type{Promise} */ (promise);
};

/**
 * Toggles the offcanvas in or out of the viewport.  This method simply delegates to the open or close methods as appropriate.
 *
 * @export
 * @param {Object} offcanvas An Object contains the properties in the following table.
 * @property {string} offcanvas.selector JQ selector identifying the offcanvas.
 * @property {string} offcanvas.content JQ selector identifying the main content.
 * @property {string} offcanvas.edge the edge of the offcanvas, valid values are start, end, top, bottom. This property is optional if the offcanvas element has a "oj-offcanvas-" + <edge> class specified.
 * @property {string} offcanvas.displayMode how to show the offcanvas, valid values are push or overlay. Default: defined by theme.
 * @property {string} offcanvas.autoDismiss close behavior, valid values are focusLoss and none. If autoDismiss is default(focusLoss) then any click outside the offcanvas will close it.
 * @property {string} offcanvas.size size width or height of the offcanvas: width if edge is start or end and height if edge is to and bottom. Default to the computed width or height of the offcanvas.
 * @property {string} offcanvas.modality The modality of the offcanvas. Valid values are modal and modeless. Default: modeless. If the offcanvas is modal, interaction with the main content area is disabled like in a modal dialog.
 * @returns {Promise} A promise that is resolved when all transitions have completed
 * @see #open
 * @see #close
 *
 * @example <caption>Toggle the offcanvas in or out of the viewport:</caption>
 *    var offcanvas = {
 *      "selector": "#startDrawer",
 *      "edge": "start",
 *      "displayMode": "overlay"
 *    };
 *
 * oj.OffcanvasUtils.toggle(offcanvas);
 *
 */
oj.OffcanvasUtils.toggle = function(offcanvas)
{
  var drawer = oj.OffcanvasUtils._getDrawer(offcanvas);
  oj.Assert.assertPrototype(drawer, $);

  if (oj.OffcanvasUtils._isOpen(drawer)) {
    return oj.OffcanvasUtils.close(offcanvas);
  }
  else {
    return oj.OffcanvasUtils.open(offcanvas);
  }

};


/**
 * Creates an overlay div with the oj-offcanvas-glasspane selector
 * append to the end of the drawer's container
 * @param {!jQuery} drawer the drawer
 * @return {jQuery} the overlay div
 * @private
 */
oj.OffcanvasUtils._addGlassPane = function (drawer)
{
  var overlay = $("<div>");
  overlay.addClass(oj.OffcanvasUtils.GLASSPANE_SELECTOR);
  overlay.attr("role", "presentation");
  overlay.attr("aria-hidden", "true");

  //append glassPane at the end
  overlay.appendTo(drawer.parent()); // @HTMLUpdateOK
  overlay.on("keydown keyup keypress mousedown mouseup mouseover mouseout click focusin focus",
    function(event)
      {
        event.stopPropagation();
        event.preventDefault();
      });

  return overlay;
};

/**
 * Creates a script element before the target layer bound to the simple jquery UI
 * surrogate component.
 *
 * @param {!jQuery} layer stacking context
 * @return {jQuery}
 * @private
 */
oj.OffcanvasUtils._createSurrogate = function (layer)
{
  // - offcanvas utils use of <script>
  var surrogate = $("<span style='display:none'>");
  surrogate.attr("aria-hidden", "true");

  var layerId = layer.attr("id");

  var surrogateId;
  if (layerId)
  {
    surrogateId = [layerId, "surrogate"].join("_");
    surrogate.attr("id", surrogateId);
  }
  else
  {
    surrogateId = surrogate.uniqueId();
  }
  surrogate.insertBefore(layer); // @HTMLUpdateOK

  // loosely associate the offcanvas to the surrogate element
  layer.attr(oj.OffcanvasUtils.SURROGATE_ATTR, surrogateId);

  return surrogate;
};


/**
 * bring the drawer to the front to keep this order:  mainContent, glassPane, drawer
 * so we don't need to use z-index
 * @private
 */
oj.OffcanvasUtils._swapOrder = function (offcanvas, drawer)
{
  //create a surrogate in front of the mainContent to be used in _restoreOrder
  offcanvas[oj.OffcanvasUtils.SURROGATE_KEY] = oj.OffcanvasUtils._createSurrogate(drawer);

  drawer.appendTo(drawer.parent()); // @HTMLUpdateOK
};


/**
 * restore the order before _swapOrder
 * @private
 */
oj.OffcanvasUtils._restoreOrder = function (offcanvas)
{
  var drawer = oj.OffcanvasUtils._getDrawer(offcanvas);
  var surrogate = offcanvas[oj.OffcanvasUtils.SURROGATE_KEY];

  if (drawer && surrogate &&
      drawer.attr(oj.OffcanvasUtils.SURROGATE_ATTR) === surrogate.attr("id"))
  {
    drawer.insertAfter(surrogate); // @HTMLUpdateOK
    // remove link to the surrogate element
    drawer.removeAttr(oj.OffcanvasUtils.SURROGATE_ATTR);
    surrogate.remove(); // @HTMLUpdateOK
  }

};

/**
 * Apply modality
 * If offcanvas is modal, add a glasspane and keep the dom structure in the following order:
 * mainContent, glassPane and drawer so we don't need to apply z-index
 * @private
 */
oj.OffcanvasUtils._applyModality = function (offcanvas, drawer)
{
  if (oj.OffcanvasUtils._isModal(offcanvas))
  {
    // insert glassPane in front of the mainContent
    offcanvas[oj.OffcanvasUtils.GLASS_PANE_KEY] = oj.OffcanvasUtils._addGlassPane(drawer);

    // bring the drawer <div> to the front
    // to keep this order:  mainContent, glassPane, drawer
    oj.OffcanvasUtils._swapOrder(offcanvas, drawer);

    window.setTimeout(function ()
    {
      offcanvas[oj.OffcanvasUtils.GLASS_PANE_KEY].addClass(oj.OffcanvasUtils.GLASSPANE_DIM_SELECTOR);
    }, 0);
  }
};

/**
 * Remove modality
 * If offcanvas is modal, remove glasspane and restore the dom element orders
 * @private
 */
oj.OffcanvasUtils._removeModality = function (offcanvas, drawer)
{
  if (oj.OffcanvasUtils._isModal(offcanvas))
  {
    offcanvas[oj.OffcanvasUtils.GLASS_PANE_KEY].remove();
    // restore the order
    oj.OffcanvasUtils._restoreOrder(offcanvas);
  }
};



/**
 * Setup offcanvas for pan to reveal.
 * This method adds a touch listener to handle revealing the offcanvas as user pans on the outer wrapper.  The following events are fired by this method:
 * ojpanstart - fired when pan to reveal gesture initiated by the user.  The event includes the direction and distance of the pan.  If it is vetoed
 *              then pan to reveal is terminated
 * ojpanmove  - fired as user continues the pan gesture.  The event includes the direction and distance of the pan.
 * ojpanend   - fired when pan to reveal gesture ends.  The event includes the direction and distance of the pan.  If it is vetoed then the offcanvas
 *              will be closed.
 *
 * @export
 * @param {Object} offcanvas An Object contains the properties in the following table.
 * @property {string} offcanvas.selector JQ selector identifying the offcanvas
 * @property {string=} offcanvas.edge the edge of the offcanvas, valid values are start, end. This property is optional if the offcanvas element has a "oj-offcanvas-" + <edge> class specified.
 * @property {string=} offcanvas.size size width of the offcanvas.  Default to the computed width of the offcanvas.
 *
 * @see #tearDownPanToReveal
 *
 * @example <caption>Setup the offcanvas:</caption>
 *    var offcanvas = {
 *      "selector": "#startDrawer"
 *    };
 *
 * oj.OffcanvasUtils.setupPanToReveal(offcanvas);
 *
 */
oj.OffcanvasUtils.setupPanToReveal = function(offcanvas)
{
    var drawer, size, outerWrapper, wrapper, mOptions, proceed, direction, ui, evt, delta, edge, endEvents, listener;

    if ($(offcanvas).attr("oj-data-pansetup") != null)
    {
        // already setup
        return;
    }

    // mark as setup
    $(offcanvas).attr("oj-data-pansetup", "true");

    // pan to reveal only works for push display mode, so enforce it
    offcanvas["displayMode"] = "push";

    drawer = oj.OffcanvasUtils._getDrawer(offcanvas);

    outerWrapper = oj.OffcanvasUtils._getOuterWrapper(drawer);

    //use hammer for swipe
    mOptions = {
       "recognizers": [
       [Hammer.Pan, { "direction": Hammer["DIRECTION_HORIZONTAL"] }]
    ]};

    // flag to signal whether pan to reveal should proceed
    proceed = false;

    $(outerWrapper)
    .ojHammer(mOptions)
    .on("panstart", function(event)
    {
        direction = null;

        switch (event['gesture']['direction'])
        {
            case Hammer["DIRECTION_LEFT"]:
                // diagonal case
                if (Math.abs(event['gesture']['deltaY']) < Math.abs(event['gesture']['deltaX']))
                {
                    direction = oj.OffcanvasUtils._isRTL() ? "end" : "start";
                }
                break;
            case Hammer["DIRECTION_RIGHT"]:
                // diagonal case
                if (Math.abs(event['gesture']['deltaY']) < Math.abs(event['gesture']['deltaX']))
                {
                    direction = oj.OffcanvasUtils._isRTL() ? "start" : "end";
                }
                break;
        }

        if (direction == null)
        {
            return;
        }

        ui = {"direction": direction, "distance": Math.abs(event['gesture']['deltaX'])};
        evt = $.Event("ojpanstart");
        drawer.trigger(evt, ui);

        if (!evt.isDefaultPrevented())
        {
            // need the size to display the canvas when release
            size = offcanvas["size"];
            if (size == null)
            {
                size = drawer.outerWidth();
            }

            // make sure it's in closed state
            offcanvas["_closePromise"] = null;

            // mark panning in progress so it won't be close, see _afterCloseHandler
            offcanvas["_panInProgress"] = true;

            // cancel any close animation transition handler
            wrapper = oj.OffcanvasUtils._getAnimateWrapper(offcanvas);
            wrapper.off(".oc");

            // sets the appropriate offcanvas class
            oj.OffcanvasUtils._toggleClass(offcanvas, wrapper, true);
            proceed = true;

            // stop touch event from bubbling to prevent for example pull to refresh from happening
            event['gesture']['srcEvent'].stopPropagation();

            // stop bubbling
            event.stopPropagation();
        }
    })
    .on("panmove", function(event)
    {
        // don't do anything if start is vetoed
        if (!proceed)
        {
            return;
        }

        delta = event['gesture']['deltaX'];
        if ((direction == "start" && delta > 0) || (direction == "end" && delta < 0))
        {
            oj.OffcanvasUtils._setTranslationX(wrapper, "start", "0px"); 
            return;
        }

        drawer.css("width", Math.abs(delta));

        // don't do css transition animation while panning
        wrapper.removeClass(oj.OffcanvasUtils.TRANSITION_SELECTOR);
        oj.OffcanvasUtils._setTranslationX(wrapper, "start", delta+"px"); 

        ui = {"direction": direction, "distance": Math.abs(delta)};
        evt = $.Event("ojpanmove");
        drawer.trigger(evt, ui);

        // stop touch event from bubbling to prevent for example pull to refresh from happening
        event['gesture']['srcEvent'].stopPropagation();

        // stop bubbling
        event.stopPropagation();
    })
    .on("panend", function(event)
    {
        // don't do anything if start is vetoed
        if (!proceed)
        {
            return;
        }

        // reset flag
        proceed = false;
        offcanvas["_panInProgress"] = null;

        delta = Math.abs(event['gesture']['deltaX']);
        ui = {"distance": delta};
        evt = $.Event("ojpanend");
        drawer.trigger(evt, ui);

        // stop bubbling
        event.stopPropagation();

        if (!evt.isDefaultPrevented())
        {
            edge = offcanvas["edge"];
            if (edge == null)
            {
                if (drawer.hasClass("oj-offcanvas-start"))
                {
                    edge = "start";
                }
                else
                {
                    edge = "end";
                }
            }

            oj.OffcanvasUtils._animateWrapperAndDrawer(wrapper, drawer, edge, size, offcanvas);

            $.data(drawer[0], oj.OffcanvasUtils._DATA_OFFCANVAS_KEY, offcanvas);
            $.data(drawer[0], oj.OffcanvasUtils._DATA_EDGE_KEY, edge);

            oj.OffcanvasUtils._registerCloseHandler(offcanvas);

            return;
        }

        // close the toolbar
        endEvents = "transitionend webkitTransitionEnd otransitionend oTransitionEnd";
        listener = function ()
        {
            // reset offcanvas class
            oj.OffcanvasUtils._toggleClass(offcanvas, wrapper, false);

            wrapper.removeClass(oj.OffcanvasUtils.TRANSITION_SELECTOR);

            //remove handler
            wrapper.off(endEvents, listener);

            //fire close event after completely closed
            drawer.trigger("ojclose", offcanvas);
        };

        // add transition end listener
        wrapper.on(endEvents, listener);

        // restore item position
        wrapper.addClass(oj.OffcanvasUtils.TRANSITION_SELECTOR);
        oj.OffcanvasUtils._setTranslationX(wrapper, "start", "0px");
    });
};

// animate both the wrapper and drawer at the same time
oj.OffcanvasUtils._animateWrapperAndDrawer = function(wrapper, drawer, edge, size, offcanvas)
{
    var tt = 400, fps = 60, ifps, matrix, values, current, final, reqId, inc, lastFrame, func, currentFrame, adjInc;

    // since we can't synchronize two css transitions, we'll have to do the animation ourselves using
    // requestAnimationFrame
    // make sure wrapper animation is off
    wrapper.removeClass(oj.OffcanvasUtils.TRANSITION_SELECTOR);

    // ideal ms per frame
    ifps = Math.round(1000/fps);  
    matrix = wrapper.css("transform");
    values = matrix.split('(')[1].split(')')[0].split(',');
    // this is the translateX
    current = parseInt(values[4], 10);
    // the final size/destination
    final = edge == "end" ? 0-size : size;
    // calculate the increment needed to complete transition in 400ms with 60fps
    inc = Math.max(1, Math.abs(final - current) / (tt / ifps));
    lastFrame = (new Date()).getTime();
    func = function() 
    {
        currentFrame = (new Date()).getTime();
        // see how much we'll need to compensate if fps drops below ideal
        adjInc = Math.max(inc, inc * Math.max((currentFrame - lastFrame) / ifps));
        lastFrame = currentFrame;
        if (current < final)
        {
            current = Math.min(final, current+adjInc);
        }
        else if (current > final)
        {
            current = Math.max(final, current-adjInc);
        }

        oj.OffcanvasUtils._setTranslationX(wrapper, edge, Math.abs(current)+"px"); 
        drawer.css("width", Math.abs(current)+"px");

        // make sure to cancel the animation frame if we are done    
        if (current == final) 
        {
            window.cancelAnimationFrame(reqId);
            wrapper.addClass(oj.OffcanvasUtils.TRANSITION_SELECTOR);

            //fire after completely open
            drawer.trigger("ojopen", offcanvas);
        }
        else
        {
            reqId = window.requestAnimationFrame(func);                            
        }
    };
              
    reqId = window.requestAnimationFrame(func);
};

/**
 * Removes the listener that was added in setupPanToReveal.  Page authors should call tearDownPanToReveal when the offcanvas is no longer needed.
 *
 * @export
 * @param {Object} offcanvas An Object contains the properties in the following table.
 * @property {string} offcanvas.selector JQ selector identifying the offcanvas
 * @see #setupPanToReveal
 *
 * @example <caption>TearDown the offcanvas:</caption>
 *    var offcanvas = {
 *      "selector": "#startDrawer"
 *    };
 *
 * oj.OffcanvasUtils.tearDownPanToReveal(offcanvas);
 *
 */
oj.OffcanvasUtils.tearDownPanToReveal = function(offcanvas)
{
    var drawer, outerWrapper;

    drawer = oj.OffcanvasUtils._getDrawer(offcanvas);
    outerWrapper = oj.OffcanvasUtils._getOuterWrapper(drawer);

    // remove all listeners
    $(outerWrapper).off("panstart panmove panend");
};

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
 *       <td>Offcanvas</td>
 *       <td><kbd>Swipe</kbd></td>
 *       <td>Close the offcanvas by swiping in the close direction.</td>
 *     </tr>
 *   </tbody>
 * </table>
 *
 * @ojfragment touchDoc - Used in touch gesture section of classdesc, and standalone gesture doc
 * @memberof oj.OffcanvasUtils
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
 *       <td>Close button</td>
 *       <td><kbd>Enter</kbd></td>
 *       <td>If offcanvas has a close button, navigate to the button and press Enter to close the offcanvas.</td>
 *     </tr>
 *     <tr>
 *       <td>Outer wrapper</td>
 *       <td><kbd>Tab or Shift+Tab</kbd></td>
 *       <td>When focus is on the outer wrapper, Tab or shift+Tab moves the focus to the next or previous tab stop on the page. If autoDismiss is true, it also closes the offcanvas.</td>
 *     </tr>
 *   </tbody>
 * </table>
 *
 * @ojfragment keyboardDoc - Used in keyboard section of classdesc, and standalone gesture doc
 * @memberof oj.OffcanvasUtils
 */

/**
 * <p>The following CSS classes can be applied by the page author as needed.</p>
 * <table class="generic-table styling-table">
 *   <thead>
 *     <tr>
 *       <th>Class</th>
 *       <th>Description</th>
 *     </tr>
 *   </thead>
 *   <tbody>
 *     <tr>
 *       <td>oj-offcanvas-outer-wrapper</td>
 *       <td>Applied to the outer most element of the offcanvas.</td>
 *     </tr>
 *     <tr>
 *       <td>oj-offcanvas-page</td>
 *       <td>Applied to the outer wrapper of the page level offcanvas.</td>
 *     </tr>
 *     <tr>
 *       <td>oj-offcanvas-inner-wrapper<br>
 *       <td>Applied to the inner wrapper of the offcanvas. Deprecated, please remove the inner wrapper.</td>
 *     </tr>
 *     <tr>
 *       <td>oj-offcanvas-start<br>
 *       <td>Applied to the offcanvas on the start edge.</td>
 *     </tr>
 *     <tr>
 *       <td>oj-offcanvas-end<br>
 *       <td>Applied to the offcanvas on the end edge.</td>
 *     </tr>
 *     <tr>
 *       <td>oj-offcanvas-top<br>
 *       <td>Applied to the offcanvas on the top edge.</td>
 *     </tr>
 *     <tr>
 *       <td>oj-offcanvas-bottom<br>
 *       <td>Applied to the offcanvas on the bottom edge.</td>
 *     </tr>
 *     <tr>
 *       <td>oj-offcanvas-overlay-shadow</td>
 *       <td>Add this marker class to an overlay offcanvas to show a drop shadow when it is open.</td>
 *     </tr>
 *   </tbody>
 * </table>
 *
 * @ojfragment stylingDoc - Used in Styling section of classdesc, and standalone Styling doc
 * @memberof oj.OffcanvasUtils
 */

});

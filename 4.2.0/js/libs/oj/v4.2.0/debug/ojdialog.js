/**
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";
define(['ojs/ojcore', 'jquery', 'promise', 'ojs/ojcomponentcore', 
        'ojs/ojpopupcore', 'ojs/ojanimation', 'ojs/ojbutton', 'jqueryui-amd/widgets/draggable', 
        'jqueryui-amd/widgets/mouse'],
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

// retrieved from https://raw.github.com/jquery/jquery-ui/1-10-stable/ui/jquery.ui.resizable.js on 04/09/2014, and then modified


/*
 *
 *   - This widget is NOT EXPOSED.
 *     ojResizable is made available only to dialog and other components that need to call resize functionality.
 *   Changes:
 *    - Options minWidth, minHeight, maxWidth, and maxHeight have been deleted
 *    - Removed zIndex option
 *    - Removed css write of zIndex (this is supported in style sheets)
 *
 */

(function() {
$.widget("oj.ojResizable", {
    version: "1.0.0",
    widgetEventPrefix: "oj",
    options: {
      /////////////////////////////////////////////////////////////////////////////////////
      //
      // Mouse Options (copied)
      //
      /////////////////////////////////////////////////////////////////////////////////////

      /**
       *
       * @private
       * @expose
       * @memberof! oj.ojResizable
       * @instance
       *
       */
      cancel: "input,textarea,button,select,option",
      /**
       *
       * @private
       * @expose
       * @memberof! oj.ojResizable
       * @instance
       *
       */
      distance: 1,
      /**
       *
       * @private
       * @expose
       * @memberof! oj.ojResizable
       * @instance
       *
       */
      delay: 0,
      /////////////////////////////////////////////////////////////////////////////////////
      //
      // Resize Options
      //
      /////////////////////////////////////////////////////////////////////////////////////


      /**
       *
       * @private
       * @expose
       * @memberof! oj.ojResizable
       * @instance
       *
       */
      maxHeight: null,
      /**
       *
       * @private
       * @expose
       * @memberof! oj.ojResizable
       * @instance
       *
       */
      maxWidth: null,
      /**
       *
       * @private
       * @expose
       * @memberof! oj.ojResizable
       * @instance
       *
       */
      minHeight: 10,
      /**
       *
       * @private
       * @expose
       * @memberof! oj.ojResizable
       * @instance
       *
       */
      minWidth: 10,
      /**
       *
       * @private
       * @expose
       * @memberof! oj.ojResizable
       * @instance
       *
       */
      alsoResize: false,
      /**
       *
       * @private
       * @expose
       * @memberof! oj.ojResizable
       * @instance
       *
       */
      animate: false,
      /**
       *
       * @private
       * @expose
       * @memberof! oj.ojResizable
       * @instance
       *
       */
      animateDuration: "slow",
      /**
       *
       * @private
       * @expose
       * @memberof! oj.ojResizable
       * @instance
       *
       */
      animateEasing: "swing",
      /**
       *
       * @private
       * @expose
       * @memberof! oj.ojResizable
       * @instance
       *
       */
      containment: false,
      /**
       *
       * @private
       * @expose
       * @memberof! oj.ojResizable
       * @instance
       *
       */
      ghost: false,
      /**
       *
       * @private
       * @expose
       * @memberof! oj.ojResizable
       * @instance
       *
       */
      grid: false,
      /**
       *
       * @private
       * @expose
       * @memberof! oj.ojResizable
       * @instance
       *
       */
      handles: "e,s,se",
      /**
       *
       * @private
       * @expose
       * @memberof! oj.ojResizable
       * @instance
       *
       */
      helper: false,
      // See #7960
      // zIndex: 90,

      /////////////////
      // callbacks
      /////////////////


      /**
       * Triggered when the ojResizable is resized.
       *
       * @private
       * @expose
       * @event
       * @name resize
       * @memberof! oj.ojResizable
       * @instance
       * @property {Event} event <code class="prettyprint">jQuery</code> event object
       * @property {Object} ui Empty object included for consistency with other events
       *
       * @example <caption>Initialize the resizable with the <code class="prettyprint">resize</code> callback specified:</caption>
       * $( ".selector" ).ojResizable({
       *     "resize": function( event, ui ) {}
       * });
       *
       * @example <caption>Bind an event listener to the <code class="prettyprint">ojresize</code> event:</caption>
       * $( ".selector" ).on( "ojresize", function( event, ui ) {} );
       */
      resize: null,
      /**
       * Triggered on the start of a resize operation.
       *
       * @private
       * @expose
       * @event
       * @name start
       * @memberof! oj.ojResizable
       * @instance
       * @property {Event} event <code class="prettyprint">jQuery</code> event object
       * @property {Object} ui Empty object included for consistency with other events
       *
       * @example <caption>Initialize the resizable with the <code class="prettyprint">start</code> callback specified:</caption>
       * $( ".selector" ).ojResizable({
       *     "start": function( event, ui ) {}
       * });
       *
       * @example <caption>Bind an event listener to the <code class="prettyprint">ojstart</code> event:</caption>
       * $( ".selector" ).on( "ojstart", function( event, ui ) {} );
       */
      // note - jqui doc has .on("resizestart"
      start: null,
      /**
       * Triggered on the end of a resize operation.
       *
       * @private
       * @expose
       * @event
       * @name stop
       * @memberof! oj.ojResizable
       * @instance
       * @property {Event} event <code class="prettyprint">jQuery</code> event object
       * @property {Object} ui Empty object included for consistency with other events
       *
       * @example <caption>Initialize the resizable with the <code class="prettyprint">stop</code> callback specified:</caption>
       * $( ".selector" ).ojResizable({
       *     "stop": function( event, ui ) {}
       * });
       *
       * @example <caption>Bind an event listener to the <code class="prettyprint">ojstop</code> event:</caption>
       * $( ".selector" ).on( "ojstop", function( event, ui ) {} );
       */
      // note - jqui doc has .on("resizestop"
      stop: null
    },
    /////////////////////////////////////////////////////////////////////////////////////
    //
    // Original Resize Functions
    //
    /////////////////////////////////////////////////////////////////////////////////////

    _num: function(value) {
      return parseInt(value, 10) || 0;
    },
    _isNumber: function(value) {
      return !isNaN(parseInt(value, 10));
    },
    _hasScroll: function(el, a) {

      if ($(el).css("overflow") === "hidden") {
        return false;
      }

      var scroll = (a && a === "left") ? "scrollLeft" : "scrollTop",
        has = false;

      if (el[ scroll ] > 0) {
        return true;
      }

      // TODO: determine which cases actually cause this to happen
      // if the element doesn't have the scroll set, see if it's possible to
      // set the scroll
      el[ scroll ] = 1;
      has = (el[ scroll ] > 0);
      el[ scroll ] = 0;
      return has;
    },
    /**
     * Triggered when the ojResizable is created.
     *
     * @private
     * @expose
     * @event
     * @name create
     * @memberof! oj.ojResizable
     * @instance
     * @property {Event} event <code class="prettyprint">jQuery</code> event object
     * @property {Object} ui Empty object included for consistency with other events
     *
     * @example <caption>Initialize the resizable with the <code class="prettyprint">create</code> callback specified:</caption>
     * $( ".selector" ).ojResizable({
     *     "create": function( event, ui ) {}
     * });
     *
     * @example <caption>Bind an event listener to the <code class="prettyprint">ojcreate</code> event:</caption>
     * $( ".selector" ).on( "ojcreate", function( event, ui ) {} );
     */
    // note - jqui has on("resizecreate", ... need to verify if we need some form of "ojcreate".
    _create: function()
    {
      this._super();

      var n, i, handle, axis, hname,
        that = this, o = this.options;

      //
      // Create an instance of the 3rd party jqueryui mouse widget.
      //

      var mouseConstructor = this.element['mouse'].bind(this.element);
      mouseConstructor();
      this.mouse = mouseConstructor('instance');

      //
      // Because we aggregating the mouse widget (and not extending it),
      // we override the protected methods of this mouse instance.
      //

      this.mouse['_mouseCapture'] = function(event) {
        return that._mouseCapture(event);
      };

      this.mouse['_mouseStart'] = function(event) {
        return that._mouseStart(event);
      };

      this.mouse['_mouseDrag'] = function(event) {
        return that._mouseDrag(event);
      };

      this.mouse['_mouseStop'] = function(event) {
        if (this.element) {
          this.element.focus();
        }
        return that._mouseStop(event);
      };

      this.element.addClass("oj-resizable");

      $.extend(this, {
        originalElement: this.element,
        _proportionallyResizeElements: [],
        // _helper: o.helper || o.ghost || o.animate ? o.helper || "oj-resizable-helper" : null
        _helper: null
      });

      this._initialResize = true;

      this.handles = o.handles || (!$(".oj-resizable-handle", this.element).length ? "e,s,se" : {n: ".oj-resizable-n", e: ".oj-resizable-e", s: ".oj-resizable-s", w: ".oj-resizable-w", se: ".oj-resizable-se", sw: ".oj-resizable-sw", ne: ".oj-resizable-ne", nw: ".oj-resizable-nw"});
      if (this.handles.constructor === String) {

        if (this.handles === "all") {
          this.handles = "n,e,s,w,se,sw,ne,nw";
        }

        n = this.handles.split(",");
        this.handles = {};

        for (i = 0; i < n.length; i++) {

          handle = $.trim(n[i]);
          hname = "oj-resizable-" + handle;
          axis = $("<div class='oj-resizable-handle " + hname + "'></div>");

          // axis.css({ zIndex: o.zIndex });

          // Todo: refine for alta styles
          //
          // if ("se" === handle) {
          // axis.addClass("ui-icon ui-icon-gripsmall-diagonal-se");
          //}

          this.handles[handle] = ".oj-resizable-" + handle;
          this.element.append(axis);   // @HTMLUpdateOK
        }
      }

      this._renderAxis = function(target) {

        var i, axis, padPos, padWrapper;

        target = target || this.element;

        for (i in this.handles) {

          if (this.handles[i].constructor === String) {
            this.handles[i] = this.element.children(this.handles[ i ]).first().show();
          }

        }
      };

      // TODO: make renderAxis a prototype function
      this._renderAxis(this.element);

      this._handles = $(".oj-resizable-handle", this.element);

      this._handles.mouseover(function() {
        if (!that.resizing) {
          if (this.className) {
            axis = this.className.match(/oj-resizable-(se|sw|ne|nw|n|e|s|w)/i);
          }
          that.axis = axis && axis[1] ? axis[1] : "se";
        }
      });

      this.mouse['_mouseInit']();
    },
    /**
     * Remove the ojResizable functionality completely.
     * This will return the element back to its pre-init state.
     *
     * <p>This method does not accept any arguments.
     *
     * @private
     * @expose
     * @method
     * @name oj.ojResizable#destroy
     * @memberof! oj.ojResizable
     * @instance
     *
     * @example <caption>Invoke the <code class="prettyprint">destroy</code> method:</caption>
     * var destroy = $( ".selector" ).ojResizable( "destroy" );
     */

    _destroy: function() {

      if (this.mouse) {
        this.mouse['_mouseDestroy']();
      }

      try {
        this.mouse['destroy']();
        this.mouse = null;
      } catch (e) {
      }

      var wrapper,
        _destroy = function(exp) {
          $(exp).removeClass("oj-resizable oj-resizable-disabled oj-resizable-resizing")
            .removeData("resizable").removeData("oj-resizable").unbind(".resizable").find(".oj-resizable-handle").remove();
        };

      _destroy(this.originalElement);

      return this;
    },
    _mouseCapture: function(event) {
      var i, handle,
        capture = false;

      for (i in this.handles) {
        handle = $(this.handles[i])[0];
        if (handle === event.target || $.contains(handle, event.target)) {
          capture = true;
        }
      }

      return !this.options.disabled && capture;
    },
    _mouseStart: function(event) {

      var curleft, curtop, cursor,
        o = this.options,
        iniPos = this.element.position(),
        el = this.element;

      this.resizing = true;

      // Bugfix for http://bugs.jqueryui.com/ticket/1749
      if ((/absolute/).test(el.css("position"))) {
        el.css({position: "absolute", top: el.css("top"), left: el.css("left")});
      } else if (el.is(".oj-draggable")) {
        el.css({position: "absolute", top: iniPos.top, left: iniPos.left});
      }

      this._renderProxy();

      curleft = this._num(this.helper.css("left"));
      curtop = this._num(this.helper.css("top"));

      if (o.containment) {
        curleft += $(o.containment).scrollLeft() || 0;
        curtop += $(o.containment).scrollTop() || 0;
      }

      this.offset = this.helper.offset();
      this.position = {left: curleft, top: curtop};
      this.size = {width: el.width(), height: el.height()};
      this.originalSize = {width: el.width(), height: el.height()};
      this.originalPosition = {left: curleft, top: curtop};
      this.sizeDiff = {width: el.outerWidth() - el.width(), height: el.outerHeight() - el.height()};
      this.originalMousePosition = {left: event.pageX, top: event.pageY};

      this.aspectRatio = (this.originalSize.width / this.originalSize.height) || 1;

      // cursor = $(".oj-resizable-" + this.axis).css("cursor");
      cursor = /** @type string */ ($(".oj-resizable-" + this.axis).css("cursor"));
      $("body").css("cursor", cursor === "auto" ? this.axis + "-resize" : cursor);

      el.addClass("oj-resizable-resizing");

      this._propagate("start", event);

      this._alsoresize_start(event);
      this._containment_start(event);

      return true;
    },
    _mouseDrag: function(event) {

      var data,
        el = this.helper, props = {},
        smp = this.originalMousePosition,
        a = this.axis,
        dx = (event.pageX - smp.left) || 0,
        dy = (event.pageY - smp.top) || 0,
        trigger = this._change[a];

      this.prevPosition = {
        top: this.position.top,
        left: this.position.left
      };
      this.prevSize = {
        width: this.size.width,
        height: this.size.height
      };

      if (!trigger) {
        return false;
      }

      data = trigger.apply(this, [event, dx, dy]);

      this._updateVirtualBoundaries(event.shiftKey);
      if (event.shiftKey) {
        data = this._updateRatio(data, event);
      }

      data = this._respectSize(data, event);

      this._updateCache(data);

      this._propagate("resize", event);

      this._alsoresize_resize(event, this.ui());
      this._containment_resize(event, this.ui());

      if (this.position.top !== this.prevPosition.top) {
        props.top = this.position.top + "px";
      }
      if (this.position.left !== this.prevPosition.left) {
        props.left = this.position.left + "px";
      }
      if (this.size.width !== this.prevSize.width) {
        props.width = this.size.width + "px";
      }
      if (this.size.height !== this.prevSize.height) {
        props.height = this.size.height + "px";
      }
      el.css(props);

      if (!this._helper && this._proportionallyResizeElements.length) {
        this._proportionallyResize();
      }

      if (!$.isEmptyObject(props)) {
        this._trigger("resize", event, this.ui());
      }

      return false;
    },
    _mouseStop: function(event) {

      this.resizing = false;
      $("body").css("cursor", "auto");

      this.element.removeClass("oj-resizable-resizing");

      this._propagate("stop", event);

      this._alsoresize_stop(event);
      this._containment_stop(event);

      return false;

    },
    _updateVirtualBoundaries: function(forceAspectRatio) {
      var pMinWidth, pMaxWidth, pMinHeight, pMaxHeight, b,
        o = this.options;

      b = {
        minWidth: this._isNumber(o.minWidth) ? o.minWidth : 0,
        maxWidth: this._isNumber(o.maxWidth) ? o.maxWidth : Infinity,
        minHeight: this._isNumber(o.minHeight) ? o.minHeight : 0,
        maxHeight: this._isNumber(o.maxHeight) ? o.maxHeight : Infinity

          /*
           minWidth: 0,
           maxWidth: Infinity,
           minHeight: 0,
           maxHeight: Infinity
           */

      };

      if (forceAspectRatio) {
        pMinWidth = b.minHeight * this.aspectRatio;
        pMinHeight = b.minWidth / this.aspectRatio;
        pMaxWidth = b.maxHeight * this.aspectRatio;
        pMaxHeight = b.maxWidth / this.aspectRatio;

        if (pMinWidth > b.minWidth) {
          b.minWidth = pMinWidth;
        }
        if (pMinHeight > b.minHeight) {
          b.minHeight = pMinHeight;
        }
        if (pMaxWidth < b.maxWidth) {
          b.maxWidth = pMaxWidth;
        }
        if (pMaxHeight < b.maxHeight) {
          b.maxHeight = pMaxHeight;
        }
      }
      this._vBoundaries = b;
    },
    _updateCache: function(data) {
      this.offset = this.helper.offset();
      if (this._isNumber(data.left)) {
        this.position.left = data.left;
      }
      if (this._isNumber(data.top)) {
        this.position.top = data.top;
      }
      if (this._isNumber(data.height)) {
        this.size.height = data.height;
      }
      if (this._isNumber(data.width)) {
        this.size.width = data.width;
      }
    },
    _updateRatio: function(data) {

      var cpos = this.position,
        csize = this.size,
        a = this.axis;

      if (this._isNumber(data.height)) {
        data.width = (data.height * this.aspectRatio);
      } else if (this._isNumber(data.width)) {
        data.height = (data.width / this.aspectRatio);
      }

      if (a === "sw") {
        data.left = cpos.left + (csize.width - data.width);
        data.top = null;
      }
      if (a === "nw") {
        data.top = cpos.top + (csize.height - data.height);
        data.left = cpos.left + (csize.width - data.width);
      }

      return data;
    },
    _respectSize: function(data) {

      var o = this._vBoundaries,
        a = this.axis,
        ismaxw = this._isNumber(data.width) && o.maxWidth && (o.maxWidth < data.width), ismaxh = this._isNumber(data.height) && o.maxHeight && (o.maxHeight < data.height),
        isminw = this._isNumber(data.width) && o.minWidth && (o.minWidth > data.width), isminh = this._isNumber(data.height) && o.minHeight && (o.minHeight > data.height),
        dw = this.originalPosition.left + this.originalSize.width,
        dh = this.position.top + this.size.height,
        cw = /sw|nw|w/.test(a), ch = /nw|ne|n/.test(a);
      if (isminw) {
        data.width = o.minWidth;
      }
      if (isminh) {
        data.height = o.minHeight;
      }
      if (ismaxw) {
        data.width = o.maxWidth;
      }
      if (ismaxh) {
        data.height = o.maxHeight;
      }

      if (isminw && cw) {
        data.left = dw - o.minWidth;
      }
      if (ismaxw && cw) {
        data.left = dw - o.maxWidth;
      }
      if (isminh && ch) {
        data.top = dh - o.minHeight;
      }
      if (ismaxh && ch) {
        data.top = dh - o.maxHeight;
      }

      // Fixing jump error on top/left 
      if (!data.width && !data.height && !data.left && data.top) {
        data.top = null;
      } else if (!data.width && !data.height && !data.top && data.left) {
        data.left = null;
      }

      return data;
    },
    _proportionallyResize: function() {

      if (!this._proportionallyResizeElements.length) {
        return;
      }

      var i, j, borders, paddings, prel,
        element = this.helper || this.element;

      for (i = 0; i < this._proportionallyResizeElements.length; i++) {

        prel = this._proportionallyResizeElements[i];

        if (!this.borderDif) {
          this.borderDif = [];
          borders = [prel.css("borderTopWidth"), prel.css("borderRightWidth"), prel.css("borderBottomWidth"), prel.css("borderLeftWidth")];
          paddings = [prel.css("paddingTop"), prel.css("paddingRight"), prel.css("paddingBottom"), prel.css("paddingLeft")];

          for (j = 0; j < borders.length; j++) {
            this.borderDif[ j ] = (parseInt(borders[ j ], 10) || 0) + (parseInt(paddings[ j ], 10) || 0);
          }
        }

        prel.css({
          height: (element.height() - this.borderDif[0] - this.borderDif[2]) || 0,
          width: (element.width() - this.borderDif[1] - this.borderDif[3]) || 0
        });

      }

    },
    _renderProxy: function() {

      var el = this.element, o = this.options;
      this.elementOffset = el.offset();

      this.helper = this.element;

    },
    _change: {
      "e": function(event, dx) {
        return {width: this.originalSize.width + dx};
      },
      "w": function(event, dx) {
        var cs = this.originalSize, sp = this.originalPosition;
        return {left: sp.left + dx, width: cs.width - dx};
      },
      "n": function(event, dx, dy) {
        var cs = this.originalSize, sp = this.originalPosition;
        return {top: sp.top + dy, height: cs.height - dy};
      },
      "s": function(event, dx, dy) {
        return {height: this.originalSize.height + dy};
      },
      "se": function(event, dx, dy) {
        return $.extend(this._change["s"].apply(this, arguments), this._change["e"].apply(this, [event, dx, dy]));
      },
      "sw": function(event, dx, dy) {
        return $.extend(this._change["s"].apply(this, arguments), this._change["w"].apply(this, [event, dx, dy]));
      },
      "ne": function(event, dx, dy) {
        return $.extend(this._change["n"].apply(this, arguments), this._change["e"].apply(this, [event, dx, dy]));
      },
      "nw": function(event, dx, dy) {
        return $.extend(this._change["n"].apply(this, arguments), this._change["w"].apply(this, [event, dx, dy]));
      }
    },
    _propagate: function(n, event) {

      //
      // Propage resizeStart and resizeStop events.
      // (resize is propagated internally by drag)
      //

      // $.ui.plugin.call(this, n, [event, this.ui()]);
      (n !== "resize" && this._trigger(n, event, this.ui()));
    },
    //////////////////////////////////////////////////////////////////////////////////
    //
    // Code block that implements functionality formerly in defined as a plugin.
    // (note: plugin code is deprecated)
    //
    // The alsoResize functionality "also resizes" the dialog body.
    // This approach allows the footer area to remain at a fixed height
    // the dialog is resized.
    //
    // $.ui.plugin.add("resizable", "alsoResize", {
    //
    /////////////////////////////////////////////////////////////////////////////////

    _alsoresize_start: function() {

      //var that = $(this).resizable( "instance" ),
      // var that = $(this).data("oj-resizable"), // w
      var that = this;
      var o = that.options;
      // var initialR = that._initialResize;

      var _store = function(exp) {
        $(exp).each(function() {
          var el = $(this);

          el.data("oj-resizable-alsoresize", {
            width: parseInt(el.width(), 10), height: parseInt(el.height(), 10),
            left: parseInt(el.css("left"), 10), top: parseInt(el.css("top"), 10)
          });
        });
      };

      if (typeof (o.alsoResize) === "object" && !o.alsoResize.parentNode) {
        if (o.alsoResize.length) {
          o.alsoResize = o.alsoResize[0];
          _store(o.alsoResize);
        }
        else {
          $.each(o.alsoResize, function(exp) {
            _store(exp);
          });
        }
      } else {
        _store(o.alsoResize);
      }
    },
    _alsoresize_resize: function(event, ui) {

      // var that = $(this).resizable( "instance" ),
      // var that = $(this).data("oj-resizable"), // v
      var that = this;

      var o = that.options;
      var os = that.originalSize;
      var op = that.originalPosition;

      var delta = {
        height: (that.size.height - os.height) || 0, width: (that.size.width - os.width) || 0,
        top: (that.position.top - op.top) || 0, left: (that.position.left - op.left) || 0
      },
      _alsoResize = function(exp, c) {
        $(exp).each(function() {
          var el = $(this), start = $(this).data("oj-resizable-alsoresize"), style = {},
            css = c && c.length ? c : el.parents(ui.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];

          $.each(css, function(i, prop) {
            var sum = (start[prop] || 0) + (delta[prop] || 0);
            if (sum && sum >= 0) {
              style[prop] = sum || null;
            }
          });

          el.css(style);
        });
      };

      if (typeof (o.alsoResize) === "object" && !o.alsoResize.nodeType) {
        $.each(o.alsoResize, function(exp, c) {
          _alsoResize(exp, c);
        });
      } else {
        _alsoResize(o.alsoResize, null);
      }
    },
    _alsoresize_stop: function() {
      // $(this).removeData("resizable-alsoresize");
      $(this).removeData("oj-resizable-alsoresize");
    },
    /////////////////////////////////////////////////////////////////////////////////
    //
    // Code block for containment functionality (formerly defined as a plugin)
    //
    // $.ui.plugin.add( "resizable", "containment", {
    //
    /////////////////////////////////////////////////////////////////////////////////

    _containment_start: function() {

      var element, p, co, ch, cw, width, height;

      // var that = $(this).data("oj-resizable");
      var that = this;

      var o = that.options,
        el = that.element,
        oc = o.containment,
        ce = (oc instanceof $) ? oc.get(0) : (/parent/.test(oc)) ? el.parent().get(0) : oc;

      if (!ce) {
        return;
      }

      that.containerElement = $(ce);

      if (/document/.test(oc) || oc === document) {
        that.containerOffset = {
          left: 0,
          top: 0
        };
        that.containerPosition = {
          left: 0,
          top: 0
        };

        that.parentData = {
          element: $(document),
          left: 0,
          top: 0,
          width: $(document).width(),
          height: $(document).height() || document.body.parentNode.scrollHeight
        };
      } else {
        element = $(ce);
        p = [];
        $(["Top", "Right", "Left", "Bottom"]).each(function(i, name) {
          p[ i ] = that._num(element.css("padding" + name));
        });

        that.containerOffset = element.offset();
        that.containerPosition = element.position();
        that.containerSize = {
          height: (element.innerHeight() - p[ 3 ]),
          width: (element.innerWidth() - p[ 1 ])
        };

        co = that.containerOffset;
        ch = that.containerSize.height;
        cw = that.containerSize.width;
        width = (that._hasScroll(ce, "left") ? ce.scrollWidth : cw);
        height = (that._hasScroll(ce) ? ce.scrollHeight : ch);

        that.parentData = {
          element: ce,
          left: co.left,
          top: co.top,
          width: width,
          height: height
        };
      }
    },
    _containment_resize: function(event, ui) {
      var woset, hoset, isParent, isOffsetRelative;

      // var that = $(this).data("oj-resizable");
      var that = this;

      var o = that.options,
        co = that.containerOffset,
        cp = that.position,
        pRatio = event.shiftKey,
        cop = {
          top: 0,
          left: 0
        },
      ce = that.containerElement,
        continueResize = true;

      if (ce[ 0 ] !== document && (/static/).test(ce.css("position"))) {
        cop = co;
      }

      if (cp.left < (that._helper ? co.left : 0)) {
        that.size.width = that.size.width + (that._helper ? (that.position.left - co.left) : (that.position.left - cop.left));
        if (pRatio) {
          that.size.height = that.size.width / that.aspectRatio;
          continueResize = false;
        }
        that.position.left = o.helper ? co.left : 0;
      }

      if (cp.top < (that._helper ? co.top : 0)) {
        that.size.height = that.size.height + (that._helper ? (that.position.top - co.top) : that.position.top);
        if (pRatio) {
          that.size.width = that.size.height * that.aspectRatio;
          continueResize = false;
        }
        that.position.top = that._helper ? co.top : 0;
      }

      that.offset.left = that.parentData.left + that.position.left;
      that.offset.top = that.parentData.top + that.position.top;

      woset = Math.abs((that._helper ? that.offset.left - cop.left : (that.offset.left - co.left)) + that.sizeDiff.width);
      hoset = Math.abs((that._helper ? that.offset.top - cop.top : (that.offset.top - co.top)) + that.sizeDiff.height);

      isParent = that.containerElement.get(0) === that.element.parent().get(0);
      isOffsetRelative = /relative|absolute/.test(that.containerElement.css("position"));

      if (isParent && isOffsetRelative) {
        woset -= Math.abs(that.parentData.left);
      }

      if (woset + that.size.width >= that.parentData.width) {
        that.size.width = that.parentData.width - woset;
        if (pRatio) {
          that.size.height = that.size.width / that.aspectRatio;
          continueResize = false;
        }
      }

      if (hoset + that.size.height >= that.parentData.height) {
        that.size.height = that.parentData.height - hoset;
        if (pRatio) {
          that.size.width = that.size.height * that.aspectRatio;
          continueResize = false;
        }
      }

      if (!continueResize) {
        that.position.left = ui.prevPosition.left;
        that.position.top = ui.prevPosition.top;
        that.size.width = ui.prevSize.width;
        that.size.height = ui.prevSize.height;
      }
    },
    _containment_stop: function() {

      // var that = $(this).data("oj-resizable"),
      var that = this,
        o = that.options,
        co = that.containerOffset,
        cop = that.containerPosition,
        ce = that.containerElement,
        helper = $(that.helper),
        ho = helper.offset(),
        w = helper.outerWidth() - that.sizeDiff.width,
        h = helper.outerHeight() - that.sizeDiff.height;

      if (that._helper && !o.animate && (/relative/).test(ce.css("position"))) {
        $(this).css({
          left: ho.left - cop.left - co.left,
          width: w,
          height: h
        });
      }

      if (that._helper && !o.animate && (/static/).test(ce.css("position"))) {
        $(this).css({
          left: ho.left - cop.left - co.left,
          width: w,
          height: h
        });
      }
    },
    ui: function() {
      return {
        originalElement: this.originalElement,
        element: this.element,
        helper: this.helper,
        position: this.position,
        size: this.size,
        originalSize: this.originalSize,
        originalPosition: this.originalPosition,
        prevSize: this.prevSize,
        prevPosition: this.prevPosition
      };
    }

  });

}());

/**
 * Copyright (c) 2014, Oracle and/or its affiliates.
 * All rights reserved.
 */

/**
 * @preserve Copyright 2013 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

// retrieved from https://raw.github.com/jquery/jquery-ui/1-10-stable/ui/jquery.ui.dialog.js on 09/03/2013, and then modified

//
// Note that one of the main differences between JET Dialog and the jQueryUI dialog
// is the reparenting approach:
//
//   - JET Dialog reparents to the body on OPEN
//   - jQueryUI dialog reparents to the appendTo() container on CREATE
//

// Notes:
//  - $.uiBackCompat has been deprecated
//

/*!
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *	jquery.ui.draggable.js
 *	jquery.ui.mouse.js
 *	jquery.ui.position.js
 */


(function() {

  /**
   * @ojcomponent oj.ojDialog
   * @augments oj.baseComponent
   * @since 0.6
   * @ojrole dialog
   * @ojdisplayname Dialog
   * @ojstatus preview
   *
   * @classdesc
   * <h3 id="dialogOverview-section">
   *   JET Dialog Component
   *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#dialogOverview-section"></a>
   * </h3>
   * <p>Description: Themeable, WAI-ARIA-compliant dialog component.
   * A dialog is a floating window that typically contains a title bar and a content area.
   * The dialog window can be moved by dragging on the title area, and closed with the 'x' icon (by default). Dialogs can also be resized by dragging on edges or corners of the dialog component. </p>
   *
   *<p>If the content length exceeds the maximum height, a scrollbar will automatically appear.</p>
   *
   *<p>A bottom button bar and semi-transparent modal overlay layer are common options that can be added.</p>
   *
   * <h3 id="styling-section">
   *   Styling
   *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#styling-section"></a>
   * </h3>
   *
   * {@ojinclude "name":"stylingDoc"}
   *
   * <h3 id="focus-section">
   *   Focus
   *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#focus-section"></a>
   * </h3>
   *
   *<p>Upon opening a dialog, focus is automatically moved to the first item that matches the following:</p>
   *<ol>
   *  <li>The first element within the dialog with the <code>autofocus</code> attribute</li>
   *  <li>The first <code>:tabbable</code> element within the dialog body</li>
   *  <li>The first <code>:tabbable</code> element within the dialog footer</li>
   *  <li>The dialog's close button</li>
   *  <li>The dialog itself</li>
   *</ol>
   *<p>While open, the dialog widget ensures that tabbing cycles focus between elements within the dialog itself, not elements outside of it. Modal dialogs additionally prevent mouse users from clicking on elements outside of the dialog.</p>
   *
   *<p>Upon closing a dialog, focus is automatically returned to the element that had focus when the dialog was opened.</p>
   * <p>See also the <a href="#styling-section">oj-focus-highlight</a> discussion.</p>
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
   *<p>
   *<h3>Sizing</h3>
   *
   * <p> Dialog dimensions, including <code class="prettyprint"> height, width, min-width, max-width, min-height</code> and <code class="prettyprint">max-height</code> are defined with css variables. The default dialog dimensions are the following:
   *
   *<ul>
   *  <li> <code class="prettyprint">height: auto</code> </li>
   *  <li> <code class="prettyprint">width: 300px</code> </li>
   *  <li> <code class="prettyprint">min-width: 200px</code> </li>
   *</ul>
   *
   * In most cases, you will want to use the default <code class="prettyprint">height:auto</code>, since this will automatically adjust the height based on the content.
   * Users can change the dialog dimensions using style attributes:
   *
   * <pre class="prettyprint">
   * <code>
   * &lt;oj-dialog id="wideDialog" title="Wide Dialog" style="width: 400px; min-width: 100px; max-width 500px;"&gt;
   *    &lt;div slot="body"&gt;
   *       &lt;p&gt; Dialog Text
   *    &lt;/div&gt;
   * &lt;/oj-dialog&gt;
   * </code></pre>
   *
   * <h3 id="accessibility-section">
   *   Accessibility
   *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#accessibility-section"></a>
   * </h3>
   * <h4> role </h4>
   * By default, the role will be set to dialog.
   * This can be observed by inspecting the DOM:
   *
   * <pre class="prettyprint">
   * <code>
   *  &lt;div class="ojdialog ..." role="dialog"&gt;
   * </code></pre>
   *
   * This can be changed using the role attribute. WAI-ARIA recommends that role="dialog" be used if the dialog expects input (such as text input),
   * otherwise, use the role attribute to assign role="alertdialog".
   *
   * <h4> aria-labelledby </h4>
   *
   * For both default and user-defined headers, the dialog component takes care of aria-labelledby for you.
   * The <code class="prettyprint">aria-labelledby</code> attribute is generated automatically (and set to the id of the header's title).
   * For user-defined headers, the title div is identified by the div that has the <code class="prettyprint">oj-dialog-title</code> class.
   * Note that user-defined headers must have a title div (in order to meet accesibility requirements).
   *
   * <p>See also the <a href="#styling-section">oj-focus-highlight</a> discussion.</p>
   *
   * <h3 id="reparenting-section">
   *   Reparenting
   *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#reparenting-section"></a>
   * </h3>
   *
   *  <p id="reparenting-strategy">
   *     When dialogs are open, they will be reparented into a common container in the
   *     document body and reparented back when closed.  Within this container in the body,
   *     dialogs will always be top rooted but other types of popups used within an open
   *     dialog will be reparented within the dialog's layer. The dialog's layer defines its
   *     z-index weight "stacking context" and marked by the "oj-dialog-layer" style.
   *     The goal of this design is to maintain as much of the page author's document structure
   *     while avoiding most of the clipping and positioning issues of a completely inline design.
   *     Dialogs are assigned the same z-index values  The layering between dialog peers reflect the
   *     opening order.  In addition, the dialog that has active focus will be assigned a greater z-index
   *     by way of the "oj-focus-within" pseudo selector applied with "oj-dialog-layer" selector.
   *     The page author has control over z-index weights by way of the "oj-dialog-layer" selector.
   *  </p>
   *  <p>
   *     There are known caveats with this design. However, these scenarios are considered "bad use"
   *     based on our JET popup strategy.
   *  </p>
   *  <ol>
   *    <li>Events raised within the dialog will not bubble up to the dialog's original ancestors.  Instead, listeners for menu events should
   *        be applied to either the dialog's root element, or the document.</li>
   *    <li>Likewise, developers should not use CSS descendant selectors, or similar logic, that assumes that the dialog will remain a child
   *        of its original parent.</li>
   *    <li>Dialogs containing iframes are problematic.  The iframe elements "may" fire a HTTP GET request for its src attribute
   *        each time the iframe is reparented in the document.</li>
   *    <li>In some browsers, reparenting a dialog that contains elements having overflow, will cause these overflow elements to
   *        reset their scrollTop.</li>
   *  </ol>
   *
   * <h3 id="rtl-section">
   *   Reading direction
   *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#rtl-section"></a>
   * </h3>
   *
   * <p> Setting the reading direction (LTR or RTL) is supported by setting the <code class="prettyprint">"dir"</code> attribute on the
   * <code class="prettyprint">&lt;html></code> element of the page.  As with any JET component, in the unusual case that the reading direction
   * is changed post-init, the dialog must be <code class="prettyprint">refresh()</code>ed, or the page must be reloaded.
   *
   * <h3 id="pseudos-section">
   *   Pseudo-selectors
   *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#pseudos-section"></a>
   * </h3>
   *
   * <p>The <code class="prettyprint">:oj-dialog</code> pseudo-selector can be used in jQuery expressions to select JET Dialogs.  For example:
   *
   * <pre class="prettyprint">
   * <code>$( ":oj-dialog" ) // selects all JET Dialogs on the page
   * $myEventTarget.closest( ":oj-dialog" ) // selects the closest ancestor that is a JET Dialog
   * </code></pre>
   *
   *<h3>Additional Examples</h3>
   *
   * <p> The following defines a basic dialog, with an ok button in the footer:
   *
   * <pre class="prettyprint">
   * <code>
   * &lt;oj-dialog id="dialogWithFooter" title="Dialog with Footer" style="width: 400px; min-width: 100px; max-width 500px;"&gt;
   *    &lt;div slot="body"&gt;
   *       &lt;p&gt; Dialog Text
   *    &lt;/div&gt;
   *    &lt;div slot="footer"&gt;
   *       &lt;oj-button id="okButton"&gt; OK &lt;/oj-button&gt;
   *    &lt;/div&gt;
   * &lt;/oj-dialog&gt;
   *
   * </code></pre>
   *
   * Note that you will need to define your own event handlers for the ok and close buttons (see the demos for examples of this).
   *
   * <p> A dialog with user-defined header is shown next. Arbitrary header content can be defined using a user-defined header.
   *
   * <pre class="prettyprint">
   * <code>
   * &lt;oj-dialog id="dialog" title="Dialog Title"&gt;
   *    &lt;div slot="header"&gt;
   *       &lt;span id="dialog-title-id" class="oj-dialog-title"&gt; User Defined Header&lt;/span&gt;
   *    &lt;/div&gt;
   *    &lt;div slot="body"&gt;
   *       &lt;p&gt; Dialog Text
   *    &lt;/div&gt;
   * &lt;/oj-dialog&gt;
   * </code></pre>
   */

  oj.__registerWidget("oj.ojDialog", $['oj']['baseComponent'], {
    version: "1.0.0",
    widgetEventPrefix: "oj",
    options:
      {
        /**
         * Specifies the cancel behavior of the dialog. The following are valid values:
         *
         * <ul>
         * <li>
         * <code class="prettyprint">"icon"</code> - (the default) (a) a close icon will automatically be created, and (b) the dialog will close when it has focus and user presses the escape (ESC) key.
         * </li>
         * <li>
         * <code class="prettyprint">"none"</code> - no actions will be associated with the escape key.
         * </li>
         * <li>
         * <code class="prettyprint">"escape"</code> -  the dialog will close when it has focus and user presses the escape (ESC) key. A close icon will not automatically be created.
         * </li>
         * </ul>
         *
         * Note that the cancelBehavior applies to both automatic and user-defined headers. So by default, a user-defined header will have a system generated close icon.
         * @expose
         * @memberof oj.ojDialog
         * @instance
         * @type {string}
         * @default "icon"
         *
         * @example <caption>Initialize the dialog to disable the default <code class="prettyprint">cancelBehavior</code></caption>
         * &lt;oj-dialog cancel-behavior="none" &gt;&lt;/oj-dialog&gt;
         *
         * @example <caption>Get or set the <code class="prettyprint">cancelBehavior</code> property, after initialization:</caption>
         * // getter
         * var cancelBehavior = myDialog.cancelBehavior;
         *
         * // setter
         * myDialog.cancelBehavior = "none";
         *
         * @example <caption>Set the default in the theme (SCSS) :</caption>
         * $dialogCancelBehaviorOptionDefault: none !default;
         *
         */
        cancelBehavior: "icon",
        /**
         * Specifies the drag affordance.
         * If set to <code class="prettyprint">"title-bar"</code> (the default) the dialog will be draggable by the title bar.
         * If <code class="prettyprint">"none"</code>, the dialog will not be draggable.
         *
         * @expose
         * @memberof oj.ojDialog
         * @instance
         * @type {string}
         * @default "title-bar"
         *
         * @example <caption>Initialize the dialog to disable dragging <code class="prettyprint">dragAffordance</code></caption>
         * &lt;oj-dialog drag-affordance="none" &gt;&lt;/oj-dialog&gt;
         *
         * @example <caption>Get or set the <code class="prettyprint">dragAffordance</code> property, after initialization:</caption>
         * // getter
         * var dragAffordance = myDialog.dragAffordance;
         *
         * // setter
         * myDialog.dragAffordance = "none";
         */
        dragAffordance: "title-bar",
        /**
         * <p> Set the initial visibility of the dialog.
         * If set to <code class="prettyprint">"show"</code>, the dialog will automatically open upon initialization.
         * If <code class="prettyprint">"hide"</code>, the dialog will stay hidden until
         * the <a href="#method-open"><code class="prettyprint">open()</code></a> method is called.
         *
         * @expose
         * @memberof oj.ojDialog
         * @instance
         * @type {string}
         * @default "hide"
         *
         * @example <caption>Initialize the dialog with the <code class="prettyprint">initialVisibility</code> property:</caption>
         * &lt;oj-dialog initial-visibility="show" &gt;&lt;/oj-dialog&gt;
         *
         * @example <caption>Get or set the <code class="prettyprint">initialVisibility</code> property, after initialization:</caption>
         * // getter
         * var initialVisibility = myDialog.initialVisibility;
         *
         * // setter
         * myDialog.initialVisibility = "show";
         */
        initialVisibility: "hide",
        /**
         *
         * The modality of the dialog. Valid values are:
         * <ul>
         * <li>
         * <code class="prettyprint">"modal"</code> - (the default) The dialog is modal. Interactions with other page elements are disabled. Modal dialogs overlay other page elements.
         * </li>
         * <li>
         * <code class="prettyprint">"modeless"</code> - defines a modeless dialog.
         * </li>
         * </ul>
         *
         * @expose
         * @memberof oj.ojDialog
         * @instance
         * @default "modal"
         * @type {string}
         *
         * @example <caption>Initialize the dialog to a specific modality <code class="prettyprint">modality</code></caption>
         * &lt;oj-dialog modality="modeless" &gt;&lt;/oj-dialog&gt;
         *
         * @example <caption>Get or set the <code class="prettyprint">modality</code> property, after initialization:</caption>
         * // getter
         * var modality = myDialog.modality;
         *
         * // setter
         * myDialog.modality = "modeless";
         */
        modality: "modal",
        /**
           * <p>Position object is used to establish the location the dialog will appear relative to
           * another element. Positioning defines "my" alignment "at" the alignment "of" some other
           * thing which can be "offset" by so many pixels.</p>
           *
           * <p>The "my" and "at" properties defines aligment points relative to the dialog and other
           * element.  The "my" property represents the dialog's alignment where the "at" property
           * represents the other element that can be identified by "of". The values of these properties
           * describe horizontal and vertical alignments.</p>
           *
           * @deprecated 3.0.0 <a href="http://api.jqueryui.com/position/">jQuery UI
           * position</a> syntax is deprectated; Use of a percent unit with
           * "my" or "at" is not supported.
           * @expose
           * @memberof oj.ojDialog
           * @instance
           * @type {Object}
           * @example <caption>Initialize the dialog with <code class="prettyprint">position</code>
           *           property specified:</caption>
           * &lt;oj-dialog position.my.horizontal="left"
           *           position.my.vertical="top"
           *           position.at.horizontal="right"
           *           position.at.vertical="top" &gt;&lt;/oj-dialog&gt;
           *
           * @example <caption>Get or set the <code class="prettyprint">position</code> property,
           *          after initialization:</caption>
           * // getter
           * var position = myDialog.position;
           *
           * // setter
           * myDialog.position =
           *    {"my": {"horizontal": "start", "vertical": "bottom"},
           *     "at": {"horizontal": "end", "vertical": "top" },
           *     "offset": {"x": 0, "y":5}};
           */
        position :
            {
              /**
               * Defines which edge on the dialog to align with the target ("of") element.
               *
               * @expose
               * @memberof! oj.ojDialog
               * @instance
               * @alias position.my
               * @type {{horizontal:string, vertical:string}}
               * @default {"horizontal":"center","vertical":"center"}
               */
              my : {
                /**
                 * @expose
                 * @memberof! oj.ojDialog
                 * @instance
                 * @alias position.my.horizontal
                 * @type {string}
                 * @default center
                 * @ojvalue {string} "start" evaluates to "left" in LTR mode and "right" in RTL mode.
                 * @ojvalue {string} "end" evaluates to "right" in LTR mode and "left" in RTL mode.
                 * @ojvalue {string} "left"
                 * @ojvalue {string} "center"
                 * @ojvalue {string} "right"
                 */
                horizontal: 'center',
                /**
                 * @expose
                 * @memberof! oj.ojDialog
                 * @instance
                 * @alias position.my.vertical
                 * @type {string}
                 * @default center
                 * @ojvalue {string} "top"
                 * @ojvalue {string} "center"
                 * @ojvalue {string} "bottom"
                 */
                vertical: 'center'
              },
              /**
               * Defines a point offset in pixels from the ("my") alignment.
               * @expose
               * @memberof! oj.ojDialog
               * @instance
               * @alias position.offset
               * @type {{x:number, y:number}}
               */
              offset: {
                /**
                 * @expose
                 * @memberof! oj.ojDialog
                 * @instance
                 * @alias position.offset.x
                 * @type {number}
                 * @default 0
                 */
                x: 0,
                /**
                 * @expose
                 * @memberof! oj.ojDialog
                 * @instance
                 * @alias position.offset.y
                 * @type {number}
                 * @default 0
                 */
                y: 0
              },
              /**
               * Defines which position on the target element ("of") to align the positioned element
               * against.
               *
               * @expose
               * @memberof! oj.ojDialog
               * @instance
               * @alias position.at
               * @type {{horizontal:string, vertical:string}}
               * @default {"horizontal":"center","vertical":"center"}
               */
              at : {
                /**
                 * @expose
                 * @memberof! oj.ojDialog
                 * @instance
                 * @alias position.at.horizontal
                 * @type {string}
                 * @default center
                 * @ojvalue {string} "start" evaluates to "left" in LTR mode and "right" in RTL mode.
                 * @ojvalue {string} "end" evaluates to "right" in LTR mode and "left" in RTL mode.
                 * @ojvalue {string} "left"
                 * @ojvalue {string} "center"
                 * @ojvalue {string} "right"
                 */
                horizontal: 'center',
                /**
                 * @expose
                 * @memberof! oj.ojDialog
                 * @instance
                 * @alias position.at.vertical
                 * @type {string}
                 * @default center
                 * @ojvalue {string} "top"
                 * @ojvalue {string} "center"
                 * @ojvalue {string} "bottom"
                 */
                vertical: 'center'
              },
              /**
               * Which element to position the dialog against. If the value is a string,
               * it should be a selector or the literal string valueof <code class="prettyprint">window</code>.
               * Otherwise, a point of x,y.
               * @expose
               * @memberof! oj.ojDialog
               * @instance
               * @alias position.of
               * @type {string|{x, number, y: number}}
               */
              of : 'window',
              /**
              *
              * @expose
              * @alias position.collision
              * @memberof! oj.ojDialog
              * @instance
              * @type {string}
              * @default "fit"
              *
              */
              collision : 'fit',
              // Ensure the titlebar is always visible
              using: function(pos) {
                  var topOffset = $(this).css(pos).offset().top;
                  if (topOffset < 0) {
                    $(this).css("top", pos.top - topOffset);
                  }
               }
            },
        /**
         *
         * The resizeBehavior of the dialog. "resizable" (default) makes the dialog resizable.
         * "none" disables dialog resizability.
         *
         * @expose
         * @memberof oj.ojDialog
         * @instance
         * @type {string}
         * @default "resizable"
         *
         * @example <caption>Initialize the dialog to a specific resizeBehavior <code class="prettyprint">resizeBehavior</code></caption>
         * &lt;oj-dialog resize-behavior="none" &gt;&lt;/oj-dialog&gt;
         *
         * @example <caption>Get or set the <code class="prettyprint">resizeBehavior</code> property, after initialization:</caption>
         *
         * // getter
         * var resizeBehavior = myDialog.resizeBehavior;
         *
         * // setter
         * myDialog.resizeBehavior = "none";
         * @example <caption>Set the default in the theme (SCSS) :</caption>
         * $dialogResizeBehaviorOptionDefault: none !default;
         */
        resizeBehavior: "resizable",
        /**
         *
         * The WAI-ARIA role of the dialog. By default, role="dialog" is added to the generated HTML markup that surrounds the dialog.
         * When used as an alert dialog, the user should set role to "alertdialog".
         *
         * @expose
         * @memberof oj.ojDialog
         * @instance
         * @type {string}
         * @default "dialog"
         *
         * @example <caption>Initialize the dialog with the <code class="prettyprint">role</code></caption> property specified:</caption>
         * &lt;oj-dialog role="alertdialog" &gt;&lt;/oj-dialog&gt;
         *
         * @example <caption>Get or set the <code class="prettyprint">role</code> property, after initialization:</caption>
         * // getter
         * var role = myDialog.role;
         *
         * // setter
         * myDialog.role = "alertdialog";
         */
        role: "dialog",
        /**
         *
         * Specify the title of the dialog. null is the default.
         *
         * @expose
         * @ignore
         * @memberof oj.ojDialog
         * @instance
         * @type {string|null}
         *
         * @example <caption>Initialize the dialog to a specific title <code class="prettyprint">title</code></caption>
         * &lt;oj-dialog title="Title of Dialog" &gt;&lt;/oj-dialog&gt;
         *
         * @example <caption>Get or set the <code class="prettyprint">title</code> property, after initialization:</caption>
         * // getter
         * var title = myDialog.title;
         *
         * // setter
         * myDialog.title = "Title of Dialog";
         */
        title: null,
        ///////////////////////////////////////////////////////
        // events
        ///////////////////////////////////////////////////////

          /**
           * Triggered before the dialog is dismissed via the
           * <code class="prettyprint">close()</code> method. The close can be cancelled by calling
           * <code class="prettyprint">event.preventDefault()</code>.
           *
           * @expose
           * @event
           * @memberof oj.ojDialog
           * @instance
           * @ojcancelable
           * @ojbubbles
           * @property {Event} event a custom event
           */
        beforeClose: null,
          /**
           * Triggered before the dialog is launched via the <code class="prettyprint">open()</code>
           * method. The open can be cancelled by calling
           * <code class="prettyprint">event.preventDefault()</code>.
           *
           * @expose
           * @event
           * @memberof oj.ojDialog
           * @instance
           * @ojcancelable
           * @ojbubbles
           * @property {Event} event a custom event
           */
        beforeOpen: null,
          /**
           * Triggered after the dialog is dismissed via the
           * <code class="prettyprint">close()</code> method.
           *
           * @expose
           * @event
           * @memberof oj.ojDialog
           * @instance
           * @ojbubbles
           * @property {Event} event a custom event
           */
        close: null,
          /**
           * Triggered after focus has been transfered to the dialog.
           *
           * @expose
           * @event
           * @memberof oj.ojDialog
           * @instance
           * @ojbubbles
           * @property {Event} event a custom event
           */
        focus: null,
          /**
           * Triggered after the dialog is launched via the <code class="prettyprint">open()</code>
           * method.
           *
           * @expose
           * @event
           * @memberof oj.ojDialog
           * @instance
           * @ojcancelable
           * @ojbubbles
           * @property {Event} event a custom event
           */
        open: null,
        /**
         * Triggered when the dialog is being resized.
         *
         * @expose
         * @event
         * @memberof oj.ojDialog
         * @instance
         * @ojbubbles
         * @property {Event} event a custom event

         */
        resize: null,
        /**
         * Triggered when the user starts resizing the dialog.
         *
         * @expose
         * @event
         * @memberof oj.ojDialog
         * @instance
         * @ojcancelable
         * @ojbubbles
         * @property {Event} event a custom event
         *
         * <ul>
         * <li>
         * <div><strong>event</strong></div>
         * <div>Type: <a href="http://api.jquery.com/Types/#Event">Event</a>
         * </div>
         * <div></div>
         * </li>
         * <li>
         * <div><strong>ui</strong></div>
         * <div>Type: <a href="http://api.jquery.com/Types/#Object">Object</a>
         * </div>
         * <div></div>
         * <ul>
         * <li>
         * <div><strong>originalPosition</strong></div>
         * <div>Type: <a href="http://api.jquery.com/Types/#Object">Object</a>
         * </div>
         * <div>The CSS position of the dialog prior to being resized.</div>
         * </li>
         * <li>
         * <div><strong>position</strong></div>
         * <div>Type: <a href="http://api.jquery.com/Types/#Object">Object</a>
         * </div>
         * <div>The current CSS position of the dialog.</div>
         * </li>
         * <li>
         * <div><strong>originalSize</strong></div>
         * <div>Type: <a href="http://api.jquery.com/Types/#Object">Object</a>
         * </div>
         * <div>The size of the dialog prior to being resized.</div>
         * </li>
         * <li>
         * <div><strong>size</strong></div>
         * <div>Type: <a href="http://api.jquery.com/Types/#Object">Object</a>
         * </div>
         * <div>The current size of the dialog.</div>
         * </li>
         * </ul>
         * </li>
         * </ul>
         */
        resizeStart: null,
        /**
         * Triggered when the user stops resizing the dialog.
         *
         * @expose
         * @event
         * @memberof oj.ojDialog
         * @instance
         * @ojcancelable
         * @ojbubbles
         * @property {Event} event a custom event
         *
         * <ul>
         * <li>
         * <div><strong>event</strong></div>
         * <div>Type: <a href="http://api.jquery.com/Types/#Event">Event</a>
         * </div>
         * <div></div>
         * </li>
         * <li>
         * <div><strong>ui</strong></div>
         * <div>Type: <a href="http://api.jquery.com/Types/#Object">Object</a>
         * </div>
         * <div></div>
         * <ul>
         * <li>
         * <div><strong>originalPosition</strong></div>
         * <div>Type: <a href="http://api.jquery.com/Types/#Object">Object</a>
         * </div>
         * <div>The CSS position of the dialog prior to being resized.</div>
         * </li>
         * <li>
         * <div><strong>position</strong></div>
         * <div>Type: <a href="http://api.jquery.com/Types/#Object">Object</a>
         * </div>
         * <div>The current CSS position of the dialog.</div>
         * </li>
         * <li>
         * <div><strong>originalSize</strong></div>
         * <div>Type: <a href="http://api.jquery.com/Types/#Object">Object</a>
         * </div>
         * <div>The size of the dialog prior to being resized.</div>
         * </li>
         * <li>
         * <div><strong>size</strong></div>
         * <div>Type: <a href="http://api.jquery.com/Types/#Object">Object</a>
         * </div>
         * <div>The current size of the dialog.</div>
         * </li>
         * </ul>
         * </li>
         * </ul>
         *
         */
        resizeStop: null,
          /**
           * Triggered when a default animation is about to start, such as when the component is
           * being opened/closed or a child item is being added/removed. The default animation can
           * be cancelled by calling <code class="prettyprint">event.preventDefault</code>.
           *
           * @expose
           * @event
           * @memberof oj.ojDialog
           * @instance
           * @ojcancelable
           * @ojbubbles
           * @property {CustomEvent} event a custom event
           * @property {Object} event.detail an object containing component specific event info
           * @property {string} event.detail.action The action that is starting the animation.
           *            The number of actions can vary from component to component.
           *            Suggested values are:
           *                    <ul>
           *                      <li>"open" - when a dialog component is opened</li>
           *                      <li>"close" - when a dialog component is closed</li>
           *                    </ul>
           * @property {Element} event.detail.element target of animation
           * @property {function} event.detail.endCallback If the event listener calls
           *            event.preventDefault to cancel the default animation, It must call the
           *            endCallback function when it finishes its own animation handling and any
           *            custom animation has ended.
           *
           * @example <caption>Bind an event listener to the
           *          <code class="prettyprint">onOjAnimateStart</code> property to override the default
           *          "close" animation:</caption>
           * myDialog.onOjAnimateStart = function( event )
           *   {
           *     // verify that the component firing the event is a component of interest and action
           *      is close
           *     if (event.detail.action == "close") {
           *       event.preventDefault();
           *       oj.AnimationUtils.slideOut(event.detail.element).then(event.detail.endCallback);
           *   };
           *
           * @example <caption>The default open and close animations are controlled via the theme
           *          (SCSS) :</caption>
           * $dialogOpenAnimation: ((effect: "zoomIn"), "fadeIn")  !default;
           * $dialogCloseAnimation: ((effect: "zoomOut", persist: "all"), "fadeOut")  !default;
           */

        animateStart: null,
          /**
           * Triggered when a default animation has ended, such as when the component is being
           * opened/closed or a child item is being added/removed. This event is not triggered if
           * the application has called preventDefault on the animateStart
           * event.
           *
           * @expose
           * @event
           * @memberof oj.ojDialog
           * @instance
           * @ojcancelable
           * @ojbubbles
           * @property {Event} event a custom event
           * @property {Object} event.detail an object containing component specific event info
           * @property {Element} event.detail.element target of animation
           * @property {string} event.detail.action The action that is starting the animation.
           *                   The number of actions can vary from component to component.
           *                   Suggested values are:
           *                    <ul>
           *                      <li>"open" - when a dialog component is opened</li>
           *                      <li>"close" - when a dialog component is closed</li>
           *                    </ul>
           *
           * @example <caption>Bind an event listener to the
           *          <code class="prettyprint">onOjAnimateEnd</code> property to listen for the "close"
           *          ending animation:</caption>
           * myDialog.onOjAnimateEnd = function( event )
           *   {
           *     // verify that the component firing the event is a component of interest and action
           *      is close
           *     if (event.detail.action == "close") {}
           *   };
           *
           * @example <caption>The default open and close animations are controlled via the theme
           *          (SCSS) :</caption>
           * $dialogOpenAnimation: (effect: "zoomIn", fade: true)  !default;
           * $dialogCloseAnimation: (effect: "zoomOut", fade: true)  !default;
           */
        animateEnd: null
      },
      /**
       * @memberof! oj.ojDialog
       * @instance
       * @protected
       * @override
       * @return {void}
       */
    _ComponentCreate: function() {
      this._super();

      this.originalCss = {
        display: this.element[0].style.display,
        width: this.element[0].style.width,
        height: this.element[0].style.height
      };
      this.originalPosition = {
        parent: this.element.parent(),
        index: this.element.parent().children().index(this.element)
      };

      // pull the title attribute from the root element moving to an option
      this.originalTitle = this.element.attr("title");
      this.options.title = this.options.title || this.originalTitle;
      this.element.removeAttr("title");

      this.element.hide();
      this.element.uniqueId();
      this.element.addClass("oj-dialog oj-component");
      this.element.attr({
          // Setting tabIndex makes the div focusable
          'tabIndex': -1
        });

      if (!this._IsCustomElement() || !this.element[0].hasAttribute["role"])
        this.element.attr("role", this.options.role)

     this._on(this.element, {"keydown": this._keydownHandler.bind(this)});

     // fixup references to header, body and footer.  assumption is they will be immediate children
     // of the root node.
     this.userDefinedDialogHeader = false;

     if (!this._IsCustomElement()) {

        var children = this.element.children();
        for (var i = 0; i < children.length; i++) {
          var child = $(children[i]);
          if (child.is(".oj-dialog-header")) {
            this.userDefinedDialogHeader = true;
            this._userDefinedHeader = child;
            this._userDefinedHeaderDiv = children[i];
          }
          else if (child.is(".oj-dialog-body")) {

            this._createContentDiv();
            this._uiDialogContent = $(this._contentDiv);
            //
            // insert content after the body, e.g.
            // <div class='oj-dialog-body'>
            // <div class='oj-dialog-content'>
            //
            this.element[0].insertBefore(this._contentDiv, children[i]); // @HTMLUpdateOK
            oj.Components.subtreeAttached(this._contentDiv);
            //
            // Then make content the parent of body, e.g.
            // <div class='oj-dialog-content'>
            //   <div class='oj-dialog-body'>
            //
            this._contentDiv.appendChild(children[i]); // @HTMLUpdateOK
            oj.Components.subtreeAttached(children[i]);

            this._uiDialogBody = child;
            this._uiDialogBodyDiv = children[i];
          }
          else if (child.is(".oj-dialog-footer")) {
            this._uiDialogFooter = child;
            this._uiDialogFooterDiv = children[i];
          }
        }
     }

     if (this._IsCustomElement()) {
       this._processSlottedChildren();
     }

     // fixup dialog header
     if (this.userDefinedDialogHeader) {
       this._userDefinedTitleDiv = this._userDefinedHeaderDiv.querySelector('.oj-dialog-title');
       this._userDefinedTitle = $(this._userDefinedTitleDiv);

       if (this.options.cancelBehavior === "icon") {
         this._createCloseButton(this._userDefinedHeaderDiv);
         //
         // Insert oj-dialog-title between oj-dialog-header and oj-dialog-header-close-wrapper
         //
         if (this._userDefinedTitleDiv != null) {
           this.closeButtonDiv.parentElement.appendChild(this._userDefinedTitleDiv); // @HTMLUpdateOK
           oj.Components.subtreeAttached(this.closeButtonDiv);
         }
       }

       if (this._userDefinedTitleDiv != null) {
         // create an id for the user-defined title
         this._userDefinedTitle.uniqueId();
         // to meet accessibility requirements for user-defined headers,
          // associate the title id with the .oj-dialog aria-labelledby.
          this.element.attr({"aria-labelledby": this._userDefinedTitle.attr("id")});
        }
     } else {
       this._createTitlebar();
     }

      if (this.options.dragAffordance === "title-bar" && $.fn.draggable) {
        this._makeDraggable();
      }

      // body was not provided. insert the content between the header and footer
      if (!this._uiDialogContent) {

        this._createContentDiv();
        this._uiDialogContent = $(this._contentDiv);
        var content =  $(this._contentDiv);

        if (this._userDefinedHeader) {
          this.element[0].insertBefore(this._contentDiv, this._userDefinedHeaderDiv); // @HTMLUpdateOK
        } else if (this._uiDialogTitlebar) {
          this.element[0].insertBefore(this._contentDiv, this._uiDialogTitlebarDiv); // @HTMLUpdateOK
        } else if (this._uiDialogFooter) {
          this.element[0].insertBefore(this._uiDialogFooterDiv, this._contentDiv); // @HTMLUpdateOK
        } else {
          this.element[0].appendChild(this._contentDiv); // @HTMLUpdateOK
        }
        oj.Components.subtreeAttached(this._contentDiv);
      }

      this._setupFocus(this.element);

      // fixup the position option set via the widget constructor
      var options = this.options;
      options["position"] = oj.PositionUtils.coerceToJet(options["position"]);
    },


    // Create the header slot element
    _createHeaderSlot: function() {

      if (this._userDefinedHeader) return;

      this._headerSlot = document.createElement("div");
      this._headerSlot.classList.add("oj-dialog-header");

      this.element[0].appendChild(this._headerSlot); // @HTMLUpdateOK
      oj.Components.subtreeAttached(this._headerSlot);

      this.userDefinedDialogHeader = true;
      this._userDefinedHeaderDiv = this._headerSlot;
      this._userDefinedHeader = $(this._headerSlot);

    },

    // Create the footer slot element.
    _createFooterSlot: function() {

      if (this._uiDialogFooter) return;

      this._footerSlot = document.createElement("div");

      this.element[0].appendChild(this._footerSlot); // @HTMLUpdateOK
      oj.Components.subtreeAttached(this._footerSlot);
      this._uiDialogFooterDiv = this._footerSlot;
      this._uiDialogFooter = $(this._footerSlot);

    },

    _createContentDiv: function() {
      this._contentDiv = document.createElement("div");
      this._contentDiv.classList.add("oj-dialog-content", "oj-dialog-default-content");
    },

    // Create the body slot element
    _createBodySlot: function() {

      // only create the wrapper once.
      if (this._uiDialogBody) return;

      this._createContentDiv();

      this.element[0].appendChild(this._contentDiv);  // @HTMLUpdateOK
      oj.Components.subtreeAttached(this._contentDiv);

      this._bodySlot = document.createElement("div");

      this._contentDiv.appendChild(this._bodySlot); // @HTMLUpdateOK
      this._uiDialogContent = $(this._contentDiv);

      this._uiDialogBodyDiv = this._bodySlot;
      this._uiDialogBody = $(this._bodySlot);
    },


    // Process any slotted children and move them into the correct location
    _processSlottedChildren: function() {

      if (this._footerSlot != null) {
        this.element[0].removeChild(this._footerSlot);
      }
      if (this._headerSlot != null) {
        this.element[0].removeChild(this._headerSlot);
      }
      if (this._bodySlot != null) {
        this.element[0].removeChild(this._bodySlot);
      }

      var slotMap = oj.CustomElementBridge.getSlotMap(this.element[0]);
      for (var slot in slotMap) {
        if (slotMap.hasOwnProperty(slot)) {
          if (slot != "header" && slot != "footer" && slot != "body" && slot != "") {
            // silently remove as per custom component slot behavior
            slotMap[slot].parentNode.removeChild(slotMap[slot]);
          }
        }
      }

      if (slotMap.hasOwnProperty("header")) {
        this._createHeaderSlot();
      }

      // Note that the default slot is the body slot.
      if (slotMap.hasOwnProperty("body") || slotMap.hasOwnProperty("")) {
        this._createBodySlot();
      }

      if (slotMap.hasOwnProperty("footer")) {
        this._createFooterSlot();
      }

      var slotParent = this._bodySlot;
      for (var slot in slotMap) {
        if (slotMap.hasOwnProperty(slot)) {
          switch (slot) {
          case "header":
            // Note - the header is wrapped with the title for accessibility,
            // so we add the oj-dialog-header class during wrap process.
            slotParent = this._headerSlot;
            break;
          case "footer":
            slotParent = this._footerSlot;
            // slotMap[slot][0].classList.add("oj-dialog-footer");
            // slotMap[slot][0].classList.add("oj-helper-clearfix");
            break;
          case "body":
          case "":
            slotParent = this._bodySlot;
            // slotMap[slot][0].classList.add("oj-dialog-body");
            break;
          }

          var slotElements = slotMap[slot];
          if (slotElements != null) {
            for (var i = 0; i < slotElements.length; i++) {
              slotParent.appendChild(slotElements[i]); // @HTMLUpdateOK
              switch (slot) {
              case "header":
                break;
              case "footer":
                slotParent = this._footerSlot;
                slotMap[slot][i].classList.add("oj-dialog-footer");
                slotMap[slot][i].classList.add("oj-helper-clearfix");
                break;
              case "body":
              case "":
                slotParent = this._bodySlot;
                slotMap[slot][i].classList.add("oj-dialog-body");
                break;
              }
            }
          }
        }
      }
    },

    /**
     * @memberof oj.ojDialog
     * @instance
     * @protected
     * @override
     */
    _AfterCreateEvent: function() {

      if (this.options.initialVisibility === "show") {
        this.open();
      }

    },
    /**
     * @memberof oj.ojDialog
     * @instance
     * @protected
     * @override
     */
    _destroy: function() {

      this._off(this.element, "keydown");

      if (oj.ZOrderUtils.getStatus(this.element) === oj.ZOrderUtils.STATUS.OPEN)
        this._closeImplicitly();

      this._setWhenReady("none");

      var isDraggable = this.element.hasClass("oj-draggable");

      if (this._resizableComponent) {
        if (this._resizableComponent("instance"))
          this._resizableComponent("destroy");
        this._resizableComponent = null;
      }

      this._destroyCloseButton();

      if (this.userDefinedDialogHeader) {
        // remove any unique id from the user-defined header's title
        this._userDefinedTitle.removeUniqueId();
      }

      if (this.uiDialogTitle) {
        this.uiDialogTitle.remove();
        this.uiDialogTitle = null;
      }

      if (this._uiDialogContent) {
        if (this._uiDialogBody) {
          // unwrap the dialog body from the content element.
          this._uiDialogBody.insertAfter(this._uiDialogContent);  // @HTMLUpdateOK safe manipulation
        }
        this._uiDialogContent.remove();
        this._uiDialogBody = this._uiDialogContent = null;
      }

      this.element
        .removeUniqueId()
        .removeClass("oj-dialog oj-component")
        .css(this.originalCss);

      this.element.stop(true, true);

      if (this.originalTitle) {
        this.element.attr("title", this.originalTitle);
      }

      // causes testing problems.

      if (this._uiDialogTitlebar) {
        this._uiDialogTitlebar.remove();
        this._uiDialogTitlebar = null;
      }

      delete this._popupServiceEvents;
      this._super();
    },
    disable: $.noop,
    enable: $.noop,
    /**
     * Closes the dialog.
     *
     * @name oj.ojDialog#close
     * @method
     * @memberof oj.ojDialog
     * @instance
     * @return {void}
     * @fires oj.ojDialog#beforeClose
     * @fires oj.ojDialog#close
     * @fires oj.ojDialog#ojAnimationStart
     * @fires oj.ojDialog#ojAnimationEnd
     *
     * @example <caption>Invoke the <code class="prettyprint">close</code> method:</caption>
     * myDialog.close();
     */
    close: function(event) {
      if (this._isOperationPending("close", [event]))
        return;

      if (oj.ZOrderUtils.getStatus(this.element) !== oj.ZOrderUtils.STATUS.OPEN)
        return;

      if (this._trigger("beforeClose", event) === false && !this._ignoreBeforeCloseResultant) {
        return;
      }

      this._setWhenReady("close");
      this._focusedElement = null;

      if (!this.opener.filter(":focusable").focus().length) {
        // Hiding a focused element doesn't trigger blur in WebKit
        // so in case we have nothing to focus on, explicitly blur the active element
        // https://bugs.webkit.org/show_bug.cgi?id=47182
        $(this.document[0].activeElement).blur();
      }

      // if dialog modality is modal, check if we need
      // to restore the disabled accesskey attributes
      if (this.options.modality === 'modal'){
         var forEach = Array.prototype.forEach;
         // Find elements within dialog that have accesskey and remove marker added during open
         var elementsInDialogWithAccesskey = this.element[0].getElementsByClassName('oj-helper-element-in-dialog-with-accesskey');
         forEach.call(elementsInDialogWithAccesskey, function(element){
            element.classList.remove('oj-helper-element-in-dialog-with-accesskey');
         });
         //Find elements with oj-helper-element-with-accesskey class, get accesskey value from data attr, set accesskey attr, remove class
         var elementsInDOMWithAccesskey = document.getElementsByClassName('oj-helper-element-with-accesskey');
         forEach.call(elementsInDOMWithAccesskey, function(element){
            element.setAttribute('accesskey', element.getAttribute('data-ojAccessKey'));
            element.removeAttribute('data-ojAccessKey');
            element.classList.remove('oj-helper-element-with-accesskey');
         });
      }

      /** @type {!Object.<oj.PopupService.OPTION, ?>} */
      var psOptions = {};
      psOptions[oj.PopupService.OPTION.POPUP] = this.element;
      psOptions[oj.PopupService.OPTION.CONTEXT] = {"closeEvent" : event};
      oj.PopupService.getInstance().close(psOptions);
    },
    /**
     * Before callback is invoked while the dialog is still visible and still parented in the zorder container.
     * Close animation is performed here.
     * @memberof! oj.ojDialog
     * @instance
     * @private
     * @param {!Object.<oj.PopupService.OPTION, ?>} psOptions property bag for closing the popup
     * @return {Promise|void}
     */
    _beforeCloseHandler : function (psOptions)
    {
      var rootElement = psOptions[oj.PopupService.OPTION.POPUP];

      var animationOptions = (oj.ThemeUtils.parseJSONFromFontFamily('oj-dialog-option-defaults')
        || {})["animation"];
      if (!this._ignoreBeforeCloseResultant && animationOptions && animationOptions["close"])
      {
        var style = rootElement.attr("style");
        /** @type {?} */
        var promise = oj.AnimationUtils.startAnimation(rootElement[0], "close",
          animationOptions["close"], this).then(function ()
        {
          rootElement.attr("style", style);
          rootElement.hide();
        });
        return promise;
      }
      else
      {
        rootElement.hide();
        return void(0);
      }
    },
    /**
     * Close finalization callback.
     *
     * @memberof! oj.ojDialog
     * @instance
     * @private
     * @param {!Object.<oj.PopupService.OPTION, ?>} psOptions property bag for closing the popup
     * @return {void}
     */
    _afterCloseHandler : function (psOptions)
    {
      var context = psOptions[oj.PopupService.OPTION.CONTEXT];
      var event;
      if (context)
        event = context["closeEvent"];

      this._trigger("close", event);
    },
    /**
     * <p>Returns true if the dialog is currently open. This method does not accept any arguments.
     * </p>
     *
     * The "open" state reflects the period of time the dialog is visible, including open and
     * close animations.
     *
     * @method
     * @name oj.ojDialog#isOpen
     * @memberof oj.ojDialog
     * @instance
     * @return {boolean} <code>true</code> if the dialog is open.
     *
     * @example <caption>Invoke the <code class="prettyprint">isOpen</code> method:</caption>
     * var isOpen = myDialog.isOpen();
     */
    isOpen: function() {
      var status = oj.ZOrderUtils.getStatus(this.element);
      return (status === oj.ZOrderUtils.STATUS.OPENING ||
              status === oj.ZOrderUtils.STATUS.OPEN ||
              status === oj.ZOrderUtils.STATUS.CLOSING);
    },
    /**
     * Opens the dialog.
     *
     * @method
     * @name oj.ojDialog#open
     * @memberof oj.ojDialog
     * @instance
     * @return {void}
     * @fires oj.ojDialog#beforeOpen
     * @fires oj.ojDialog#open
     * @fires oj.ojDialog#ojAnimationStart
     * @fires oj.ojDialog#ojAnimationEnd
     *
     * @example <caption>Invoke the <code class="prettyprint">open</code> method:</caption>
     * var open = myDialog.open();
     */
    open: function(event) {
      if (this._isOperationPending("open", [event]))
        return;

      // this.$element.on('click.ojDialog', $.proxy(this.uiDialog.hide, this));

      if (this._trigger("beforeOpen", event) === false) {
        return;
      }

      if (oj.ZOrderUtils.getStatus(this.element) === oj.ZOrderUtils.STATUS.OPEN) {
        this._focusTabbable();
        return;
      }

      this._setWhenReady("open");

      this.opener = $(this.document[0].activeElement);

      if (this.options.resizeBehavior === "resizable") {
        this._makeResizable();
      }

      // normalize alignments, so that start and end keywords work as expected.
      var isRtl = this._GetReadingDirection() === "rtl";
      var position = oj.PositionUtils.coerceToJqUi(this.options["position"]);
      position = oj.PositionUtils.normalizeHorizontalAlignment(position, isRtl);

      // if modality is set to modal, prevent accesskey events
      // from being triggered while dialog is open
      if (this.options.modality === 'modal'){
         var forEach = Array.prototype.forEach
         // Mark elements within the dialog that have an accesskey attr. Those shouldn't have accesskey attr removed
         var elementsInDialogWithAccesskey = this.element[0].querySelectorAll('[accesskey]');
         forEach.call(elementsInDialogWithAccesskey, function(element){
            element.classList.add('oj-helper-element-in-dialog-with-accesskey');
         });
         // Mark elements with accesskey attr, move accesskey value to data attr, remove accesskey attr from elements
         var elementsInDOMWithAccesskey = document.querySelectorAll('[accesskey]');
         forEach.call(elementsInDOMWithAccesskey, function(element){
            if (!element.classList.contains("oj-helper-element-in-dialog-with-accesskey")){
               element.classList.add('oj-helper-element-with-accesskey');
               element.setAttribute('data-ojAccessKey', element.getAttribute('accesskey'));
               element.removeAttribute('accesskey');
            }
         });
      }

      /** @type {!Object.<oj.PopupService.OPTION, ?>} */
      var psOptions = {};
      psOptions[oj.PopupService.OPTION.POPUP] = this.element;
      psOptions[oj.PopupService.OPTION.LAUNCHER] = this.opener;
      psOptions[oj.PopupService.OPTION.POSITION] = position;
      psOptions[oj.PopupService.OPTION.MODALITY] = this.options.modality;
      psOptions[oj.PopupService.OPTION.EVENTS] = this._getPopupServiceEvents();
      psOptions[oj.PopupService.OPTION.LAYER_SELECTORS] = "oj-dialog-layer";
      psOptions[oj.PopupService.OPTION.LAYER_LEVEL] = oj.PopupService.LAYER_LEVEL.TOP_LEVEL;
      psOptions[oj.PopupService.OPTION.CUSTOM_ELEMENT] = this._IsCustomElement();
      oj.PopupService.getInstance().open(psOptions);
    },
    /**
     * Before open callback is called after the dialog has been reparented into the
     * zorder container. Open animation is performed here.
     * @memberof! oj.ojDialog
     * @instance
     * @private
     * @param {!Object.<oj.PopupService.OPTION, ?>} psOptions property bag for opening the popup
     * @return {Promise|void}
     */
    _beforeOpenHandler : function (psOptions)
    {
      var rootElement = psOptions[oj.PopupService.OPTION.POPUP];
      var position = psOptions[oj.PopupService.OPTION.POSITION];

      rootElement.show();
      rootElement["position"](position);

      // We add .oj-animate-open when the dialog is animating on open.
      // This supports maintaing the visibility of a nested dialog during animation open.
      rootElement.parent().addClass('oj-animate-open');

      var animationOptions = (oj.ThemeUtils.parseJSONFromFontFamily('oj-dialog-option-defaults') ||
        {})["animation"];
      if (animationOptions && animationOptions["open"])
      {
        return oj.AnimationUtils.startAnimation(rootElement[0], "open",
          animationOptions["open"], this);
      }
      else
      {
        return void(0);
      }
    },
    /**
     * Called after the dialog is shown. Perform open finalization.
     * @memberof! oj.ojDialog
     * @instance
     * @private
     * @param {!Object.<oj.PopupService.OPTION, ?>} psOptions property bag for opening the popup
     * @return {void}
     */
    _afterOpenHandler : function (psOptions)
    {
      var rootElement = psOptions[oj.PopupService.OPTION.POPUP];
      rootElement.parent().removeClass('oj-animate-open');
      this._trigger("open");
      this._focusTabbable();
    },
    /**
     * Refresh the dialog.
     * Typically used after dynamic content is added to a dialog.
     *
     * @method
     * @name oj.ojDialog#refresh
     * @memberof oj.ojDialog
     * @instance
     * @override
     * @return {void}
     *
     * @example <caption>Invoke the <code class="prettyprint">refresh</code> method:</caption>
     * myDialog.refresh();
     */
    refresh: function()
    {
      this._super();
    },
    _focusTabbable: function() {

      var hasFocus = this._focusedElement;
      if (hasFocus && hasFocus.length > 0)
      {
        // if dialog already has focus then return
          if (oj.DomUtils.isAncestorOrSelf(this.element[0], hasFocus[0])) {
              return;
          }
      }

      // Set focus to the first match:
      // 1. First element inside the dialog matching [autofocus]
      // 2. Tabbable element inside the content element
      // 3. Tabbable element inside the footer
      // 4. The close button
      // 5. The dialog itself

      if (!hasFocus) {
        hasFocus = this.element.find("[autofocus]");
      }
      if (!hasFocus.length) {
        hasFocus = this._uiDialogContent.find(":tabbable");
      }
      if (!hasFocus.length) {
        if (this._uiDialogFooter && this._uiDialogFooter.length) {
          hasFocus = this._uiDialogFooter.find(":tabbable");
        }
      }
      if (!hasFocus.length) {
        if (this.closeButton)
          hasFocus = this.closeButton.filter(":focusable");
      }
      if (!hasFocus.length) {
        hasFocus = this.element;
      }

      if (hasFocus.length > 0) {
        hasFocus.eq(0).focus();
        this._trigger("focus");
      }
    },

    '_keepFocus': function(event) {
      function checkFocus() {
        var activeElement = this.document[0].activeElement,
            // isActive = this._uiDialogContent[0] === activeElement || $.contains(this._uiDialogContent[0], activeElement);
          isActive = this.element === activeElement || $.contains(this.element, activeElement);
        if (!isActive) {
          this._focusTabbable();
        }
      }
      event.preventDefault();
      checkFocus.call(this);
    },

    _isNumber: function(value) {
      return !isNaN(parseInt(value, 10));
    },

    _keydownHandler: function (event)
    {

      if (this.options.cancelBehavior !== "none" && !event.isDefaultPrevented() && event.keyCode &&
          event.keyCode === $.ui.keyCode.ESCAPE) {
        event.preventDefault();
        event.stopImmediatePropagation();
        this.close(event);
        return;
      }

      if (event.keyCode !== $.ui.keyCode.TAB) {
        return;
      }

      // prevent tabbing out of dialogs
      // var tabbables = this._uiDialogContent.find(":tabbable"),
      var tabbables = this.element.find(":tabbable"),
          first = tabbables.filter(":first"),
          last = tabbables.filter(":last");

      var index;

      if (!event.shiftKey)
      {

        // if (event.target === last[0] || event.target === this._uiDialogContent[0]) {

        // Check document.activeElement instead of event.target since descendant
        // elements such as ojTable may change focus when handling Tab key.
        // This aligns with browser behavior because it determines next tabstop
        // based on activeElement.
        if (document.activeElement === last[0] || document.activeElement === this.element[0]) {
          first.focus();
          event.preventDefault();
        } else {

          //
          // Make sure the first dialog tabbable (the header icon)
          // does not tab out of the dialog.
          //
          index = tabbables.index(document.activeElement);

          if (index === 0) {
            if (tabbables[1]) {
              tabbables[1].focus();
              event.preventDefault();
            }
          }
        }
      }
      else if (event.shiftKey) {
        //
        // For SHIFT-TAB, we reverse the tab order.
        //

        // Check document.activeElement instead of event.target since descendant
        // elements such as ojTable may change focus when handling Tab key.
        // This aligns with browser behavior because it determines next tabstop
        // based on activeElement.
        if (document.activeElement === first[0] || document.activeElement === this.element[0]) {
          last.focus();
          event.preventDefault();
        } else {
          //
          // Make sure the second dialog tabbable tabs back to the header
          //
          index = tabbables.index(document.activeElement);

          if (index === 1) {
            if (tabbables[0]) {
              tabbables[0].focus();
              event.preventDefault();
            }
          }
        }
      }
    },

    //
    // Invoke focusable on the passed element.
    // Called on two distinct elements - the outer dialog,
    // and the closeWrapper (assuming that there is an x-icon in the dialog)
    //
    _setupFocus: function(elem) {

        var self = this;
        this._focusable({
            'applyHighlight': true,
            'setupHandlers': function( focusInHandler, focusOutHandler) {
                self._on( elem, {
                    focus: function( event ) {
                        focusInHandler($( event.currentTarget ));
                    },
                    blur: function( event ) {
                        focusOutHandler($( event.currentTarget ));
                    }
                });
            }
        });
    },

    _destroyCloseButton: function() {

      if (this.closeButtonDiv != null) {
        if (this.closeButtonDiv.parentElement) {
          oj.Components.subtreeDetached(this.closeButtonDiv);
          this.closeButtonDiv.parentElement.removeChild(this.closeButtonDiv); // @HTMLUpdateOK
        }

        this.closeButton = null;
      }

    },

    //
    // Create a close button.
    // Needed for user-defined headers.
    //
    _createCloseButton: function(divParentElement) {

      // use oj-button for custom element implementations
      if (this._IsCustomElement()) {

        this.closeButtonDiv = document.createElement('oj-button');
        this.closeButtonDiv.classList.add('oj-dialog-header-close-wrapper');
        this.closeButtonDiv.setAttribute('data-oj-binding-provider', 'none')
        this.closeButtonDiv.setAttribute('display', 'icons')
        this.closeButtonDiv.setAttribute('chroming', 'half')

        var closeButtonLabel = document.createElement('span');
        closeButtonLabel.textContent = this.getTranslatedString('labelCloseIcon');

        var closeButtonStartIcon = document.createElement('span');
        closeButtonStartIcon.className = 'oj-fwk-icon oj-fwk-icon-cross';
        closeButtonStartIcon.setAttribute('slot', 'startIcon');

        this.closeButtonDiv.appendChild(closeButtonStartIcon);
        this.closeButtonDiv.appendChild(closeButtonLabel);

        divParentElement.appendChild(this.closeButtonDiv); // @HTMLUpdateOK
        oj.Components.subtreeAttached(this.closeButtonDiv);

        this.closeButton = $(this.closeButtonDiv);

      }

      if (!this._IsCustomElement()) {

        this.closeButton = $("<button><\button>")
          .addClass('oj-dialog-header-close-wrapper');

        this.closeButton.ojButton(
          {display: 'icons',
           chroming: 'half',
           label: this.getTranslatedString('labelCloseIcon'),
           icons: {start: 'oj-component-icon oj-fwk-icon-cross'}})
          .attr("tabindex", "1")
          .appendTo(divParentElement); // @HTMLUpdateOK

        this.closeButtonDiv = this.closeButton[0];

      }

      this._on(this.closeButton, {
        click: function(event) {
          event.preventDefault();
          event.stopImmediatePropagation();
          this.close(event);
        },
      });

      // no need to do this - buttons handle focus on their own.
      // var hasFocus = this.closeButton;
      // this._setupFocus(hasFocus);

    },

    _createTitlebar: function() {

      this._uiDialogTitlebarDiv = document.createElement("div");
      this._uiDialogTitlebarDiv.classList.add("oj-dialog-header");
      this._uiDialogTitlebarDiv.classList.add("oj-helper-clearfix");
      this.element[0].insertBefore(this._uiDialogTitlebarDiv, this.element[0].firstChild);  // @HTMLUpdateOK
      oj.Components.subtreeAttached(this._uiDialogTitlebarDiv);

      this._uiDialogTitlebar = $(this._uiDialogTitlebarDiv);

      this._on(this._uiDialogTitlebar, {
        mousedown: function(event) {
          // Don't prevent click on close button (#8838)
          // Focusing a dialog that is partially scrolled out of view
          // causes the browser to scroll it into view, preventing the click event
          var closest = $(event.target).closest(".oj-dialog-header-close-wrapper");

          var grandParent = $(event.target).parent().parent();
          var isCloseButton = false;
          if (grandParent) {
            isCloseButton = grandParent.hasClass('oj-dialog-header-close-wrapper');
          }
          if (!isCloseButton) {
            // Set focus to the dialog if we are dragging by the header
            this.element.focus();
          }
        }
      });

      if (this.options.cancelBehavior === "icon") {
        this._createCloseButton(this._uiDialogTitlebarDiv);
      }

      var uiDialogTitleDiv = document.createElement("div");
      uiDialogTitleDiv.classList.add("oj-dialog-title");
      $(uiDialogTitleDiv).uniqueId();
      this._uiDialogTitlebarDiv.appendChild(uiDialogTitleDiv) // @HTMLUpdateOK
      oj.Components.subtreeAttached(uiDialogTitleDiv);

      this._title(uiDialogTitleDiv);

      this.element.attr({
        "aria-labelledby": uiDialogTitleDiv.id
      });
    },

    _title: function(title) {
      if (!this.options.title) {
        title.innerHTML = "&#160;";  // @HTMLUpdateOK
      }
      title.textContent = this.options.title;
    },

    _makeDraggable: function() {
      var that = this,
        options = this.options;

      function filteredUi(ui) {
        return {
          position: ui.position,
          offset: ui.offset
        };
      }

      this.element.draggable({
        addClasses: false,
        handle: ".oj-dialog-header",
        containment: "document",
        start: function(event, ui) {
          $(this).addClass("oj-dialog-dragging");
          that._positionDescendents();
          that._trigger("dragStart", event, filteredUi(ui));
        },
        drag: function(event, ui) {
          //
          // call positionDescendents so that any descendents,
          // such as a pulldown menu, will be repositioned as the dialog is dragged.
          //
          that._positionDescendents();
          that._trigger("drag", event, filteredUi(ui));
        },
        stop: function(event, ui) {
          var left = ui.offset.left - that.document.scrollLeft();
          var top = ui.offset.top - that.document.scrollTop();

          options.position = {
            "my": {"horizontal": "left", "vertical": "top"},
            "at": {"horizontal": "left", "vertical": "top"},
            "offset": {"x": left >= 0 ? left : 0, "y": top >= 0 ? top : 0},
            "of": window
          };

          $(this).removeClass("oj-dialog-dragging");
          that._positionDescendents();
          that._trigger("dragStop", event, filteredUi(ui));
        }
      });

      this.element.addClass("oj-draggable");

    },
    _makeResizable: function() {

      var that = this,
        options = this.options,
        // handles = options.resizable,
        position = this.element.css("position"),
        // resizeHandles = typeof handles === "string" ? handles : "n,e,s,w,se,sw,ne,nw";

        resizeHandles = "n,e,s,w,se,sw,ne,nw";

      function filteredUi(ui) {
        return {
          'originalPosition': ui.originalPosition,
          'originalSize': ui.originalSize,
          position: ui.position,
          size: ui.size
        };
      }

      this._resizableComponent = this.element['ojResizable'].bind(this.element);

      this._resizableComponent({
        cancel: ".oj-dialog-content",
        containment: "document",
        handles: resizeHandles,
        start: function(event, ui) {

          that._isResizing = true;

          $(this).addClass("oj-dialog-resizing");
          // fire resizestart
          that._trigger("resizeStart", event, filteredUi(ui));

        },
        resize: function(event, ui) {
          that._trigger("resize", event, filteredUi(ui));
        },
        stop: function(event, ui) {

          that._isResizing = false;

          $(this).removeClass("oj-dialog-resizing");
          that._trigger("resizeStop", event, filteredUi(ui));
        }
      });

    },
    _position: function() {

      //
      // Extended position objects with better names to support RTL.
      //
      var isRtl = this._GetReadingDirection() === "rtl";
      var position = oj.PositionUtils.coerceToJqUi(this.options["position"]);
      position = oj.PositionUtils.normalizeHorizontalAlignment(position, isRtl);
      this.element.position(position);

      this._positionDescendents();
    },
    _positionDescendents: function() {

      // trigger refresh of descendents
      oj.PopupService.getInstance().triggerOnDescendents(this.element, oj.PopupService.EVENT.POPUP_REFRESH);
    },
    _setOption: function(key, value, flags) {
      /*jshint maxcomplexity:15*/
      var isDraggable, isResizable;

      // don't allow a dialog to be disabled.
      if (key === "disabled") {
        return;
      }

      this._super(key, value, flags);

      switch (key) {
      case "dragAffordance":

        // isDraggable = uiDialog.is(":data(oj-draggable)");
        isDraggable = this.element.hasClass("oj-draggable");

        if (isDraggable && value === "none") {
          this.element.draggable("destroy");
          this.element.removeClass("oj-draggable");
        }

        if (!isDraggable && value === "title-bar") {
          this._makeDraggable();
        }

        break;

      case "position":
        // convert to the internal position format and reevaluate the position.
        var options = this.options;
        options["position"] = oj.PositionUtils.coerceToJet(value, options["position"]);
        this._position();

        // setting the option is handled here.  don't call on super.
        return;

      case "resizeBehavior":

        isResizable = false;
        if (this._resizableComponent)
          isResizable = true;

        // currently resizable, becoming non-resizable
        if (isResizable && value !== "resizable") {
          // uiDialog._resizableComponent("destroy");
          if (this._resizableComponent("instance"))
            this._resizableComponent("destroy");
          this._resizableComponent = null;
        }

        // currently non-resizable, becoming resizable
        if (!isResizable && value === "resizable") {
          this._makeResizable();
        }

        break;

      case "title":

        if (this.userDefinedDialogHeader) {
          this._title(this._userDefinedHeaderDiv.querySelector('.oj-dialog-title'));
        } else {
          this._title(this._uiDialogTitlebarDiv.querySelector(".oj-dialog-title"));
        }
        break;

      case "role":
        this.element.attr("role", value);
        break;

      case "modality":
        if (oj.ZOrderUtils.getStatus(this.element) === oj.ZOrderUtils.STATUS.OPEN)
        {
          /** @type {!Object.<oj.PopupService.OPTION, ?>} */
          var psOptions = {};
          psOptions[oj.PopupService.OPTION.POPUP] = this.element;
          psOptions[oj.PopupService.OPTION.MODALITY] = value;
          oj.PopupService.getInstance().changeOptions(psOptions);
        }
        break;

      case "cancelBehavior":

        if (value === "none" || value === "escape") {

          // we may need additional code here
          // if (this.userDefinedDialogHeader) {   }

          this._destroyCloseButton();

        }
        else if (value === "icon") {

          if (this.userDefinedDialogHeader) {

            this._destroyCloseButton();
            this._createCloseButton(this._userDefinedHeaderDiv);

            //
            // Insert oj-dialog-title between oj-dialog-header and oj-dialog-header-close-wrapper
            //
            this._userDefinedTitleDiv = this._userDefinedHeaderDiv.querySelector('.oj-dialog-title');
            this._userDefinedTitle = $(this._userDefinedTitleDiv);

            if (this._userDefinedTitleDiv != null) {
              this.closeButtonDiv.parentElement.appendChild(this._userDefinedTitleDiv); // @HTMLUpdateOK
              oj.Components.subtreeAttached(this._userDefinedTitleDiv);
            }

          } else {

            this._destroyCloseButton();
            this._createCloseButton(this._uiDialogTitlebarDiv);

            this.standardTitleDiv = this._uiDialogTitlebarDiv.querySelector(".oj-dialog-title");
            this.standardTitle = $(this.standardTitleDiv);

            if (this.standardTitleDiv != null) {
              this.closeButtonDiv.parentElement.insertBefore(this.closeButtonDiv, this.standardTitleDiv);  // @HTMLUpdateOK
              oj.Components.subtreeAttached(this.standardTitleDiv);
            }
          }
        }
        break;
      }
    },

    getNodeBySubId: function(locator) {
      if (locator === null) {
        return this.element ? this.element[0] : null;
      }

      function _escapeId(id) {
        var targetId = [];
        var regex = /\w|_|-/;

        for (var i = 0; i < id.length; i++) {
          var c = id.substring(i, i + 1);
          if (regex.test(c))
            targetId.push(c);
          else
            targetId.push("\\" + c);
        }
        return targetId.join("");
      }

      var subId = locator['subId'];

      //
      // Use slot structure to return body and footer subids.
      //
      if (this._IsCustomElement() && (subId === "oj-dialog-footer" || subId === "oj-dialog-body")) {
        if (subId === "oj-dialog-body") {
          return this._uiDialogBodyDiv.querySelector('.oj-dialog-body');
        }
        else if (subId === "oj-dialog-footer") {
          return this._uiDialogFooterDiv.querySelector('.oj-dialog-footer');
        }
      } else {

        // General case
        switch (subId) {

        case "oj-dialog-header":
        case "oj-dialog-footer":
        case "oj-dialog-content":
        case "oj-resizable-n":
        case "oj-resizable-e":
        case "oj-resizable-s":
        case "oj-resizable-w":
        case "oj-resizable-se":
        case "oj-resizable-sw":
        case "oj-resizable-ne":
        case "oj-resizable-nw":

          var selector = this.element[0].nodeName + '[id="' + _escapeId(this.element.attr("id")) + '"] > ';
          selector +=  "." + subId;
          var node = this.element.parent().find(selector);
          if (!node || node.length === 0)
            return null;

          return (node[0]);
          break;

          // "oj-dialog-close-icon" is deprecated as of 1.2
          // use "oj-dialog-close" instead.
          // "oj-dialog-close" is deprecated as of 2.1.*
        case "oj-dialog-close-icon":
        case "oj-dialog-close":
          return null;
          break;

          // "oj-dialog-body" is deprecated as of 1.2
        case "oj-dialog-body":
          var selector = this.element[0].nodeName + '[id="' + _escapeId(this.element.attr("id")) + '"] > ';
          selector += ".oj-dialog-content > ";
          selector +=  "." + subId;
          var node = this.element.parent().find(selector);
          if (!node || node.length === 0)
            return null;

          return (node[0]);
          break;

        case "oj-dialog-header-close-wrapper":
          var selector = this.element[0].nodeName + '[id="' + _escapeId(this.element.attr("id")) + '"] > ';
          selector += ".oj-dialog-header > ";
          selector +=  "." + subId;
          var node = this.element.parent().find(selector);
          if (!node || node.length === 0)
            return null;

          return (node[0]);
          break;

        }
      }

      // Non-null locators have to be handled by the component subclasses
      return null;
    },
    //** @inheritdoc */
    getSubIdByNode: function(node)
    {

      if (node != null) {

        var nodeCached = $(node);

        if (nodeCached.hasClass('oj-dialog-header'))
          return {'subId': 'oj-dialog-header'};
        else if (nodeCached.hasClass('oj-dialog-footer'))
          return {'subId': 'oj-dialog-footer'};
        else if (nodeCached.hasClass('oj-dialog-content'))
          return {'subId': 'oj-dialog-content'};
        else if (nodeCached.hasClass('oj-dialog-header-close-wrapper'))
          return {'subId': 'oj-dialog-header-close-wrapper'};
        else if (nodeCached.hasClass('oj-resizable-n'))
          return {'subId': 'oj-resizable-n'};
        else if (nodeCached.hasClass('oj-resizable-e'))
          return {'subId': 'oj-resizable-e'};
        else if (nodeCached.hasClass('oj-resizable-s'))
          return {'subId': 'oj-resizable-s'};
        else if (nodeCached.hasClass('oj-resizable-w'))
          return {'subId': 'oj-resizable-w'};
        else if (nodeCached.hasClass('oj-resizable-se'))
          return {'subId': 'oj-resizable-se'};
        else if (nodeCached.hasClass('oj-resizable-sw'))
          return {'subId': 'oj-resizable-sw'};
        else if (nodeCached.hasClass('oj-resizable-ne'))
          return {'subId': 'oj-resizable-ne'};
        else if (nodeCached.hasClass('oj-resizable-nw'))
          return {'subId': 'oj-resizable-nw'};

      }

      return null;
    },
    /**
     * @memberof! oj.ojDialog
     * @instance
     * @private
     * @return {void}
     */
    _surrogateRemoveHandler: function() {
      var element = this.element;
      element.remove();
    },
    /**
     * @memberof! oj.ojDialog
     * @instance
     * @private
     * @return {!Object.<oj.PopupService.EVENT, function(...)>}
     */
    _getPopupServiceEvents: function() {
      if (!this._popupServiceEvents) {
        /** @type {!Object.<oj.PopupService.EVENT, function(...)>} **/
        var events = this._popupServiceEvents = {};
        events[oj.PopupService.EVENT.POPUP_CLOSE] = this._closeImplicitly.bind(this);
        events[oj.PopupService.EVENT.POPUP_REMOVE] = this._surrogateRemoveHandler.bind(this);
        events[oj.PopupService.EVENT.POPUP_REFRESH] = this._positionDescendents.bind(this);
        events[oj.PopupService.EVENT.POPUP_BEFORE_OPEN] = this._beforeOpenHandler.bind(this);
        events[oj.PopupService.EVENT.POPUP_AFTER_OPEN] = this._afterOpenHandler.bind(this);
        events[oj.PopupService.EVENT.POPUP_BEFORE_CLOSE] = this._beforeCloseHandler.bind(this);
        events[oj.PopupService.EVENT.POPUP_AFTER_CLOSE] = this._afterCloseHandler.bind(this);
      }
      return this._popupServiceEvents;
    },
    /**
     * @memberof oj.ojDialog
     * @instance
     * @private
     */
    _closeImplicitly: function() {
      this._ignoreBeforeCloseResultant = true;
      this.close();
      delete this._ignoreBeforeCloseResultant;
    },

    /**
     * Creates a Promise exposed by the {@link oj.ojDialog#whenReady} method.
     *
     * @param {string} operation valid values are "open", "close" or "none"
     * @memberof oj.ojDialog
     * @instance
     * @private
     */
    _setWhenReady : function (operation) {

      /** @type {oj.PopupWhenReadyMediator} */
      var mediator = this._whenReadyMediator;
      if (mediator)
      {
        mediator.destroy();
        delete this._whenReadyMediator;
      }

      // operation === none
      if (["open", "close"].indexOf(operation) < 0)
        return;

      this._whenReadyMediator = new oj.PopupWhenReadyMediator(this.element, operation, "ojDialog",
        this._IsCustomElement());
    },

    /**
     * Checks to see if there is a pending "open" or "close" operation.  If pending and it
     * is the same as the requested operation, the request silently fails.  If the current
     * operation is the inverse operation, we queue the current operation after the pending
     * operation is resolved.
     *
     * @memberof oj.ojDialog
     * @instance
     * @private
     * @param {string} operation currently requested
     * @param {Array} args passed to a queue operation
     * @returns {boolean} <code>true</code> if a "close" or "open" operation is pending completion.
     */
    _isOperationPending: function (operation, args) {
      /** @type {oj.PopupWhenReadyMediator} **/
      var mediator = this._whenReadyMediator;
      if (mediator)
        return mediator.isOperationPending(this, operation, operation, args);
      else
        return false;
    },
    /**
     * Notifies the component that its subtree has been removed from the document
     * programmatically after the component has been created.
     *
     * @memberof oj.ojDialog
     * @instance
     * @protected
     * @override
     */
     _NotifyDetached: function()
     {
       // detaching an open popup results in implicit dismissal
       if (oj.ZOrderUtils.getStatus(this.element) === oj.ZOrderUtils.STATUS.OPEN)
         this._closeImplicitly();

       this._super();
     }

    /**
     * <p>The default slot is the dialog's body. The <code class="prettyprint">&lt;oj-dialog></code>
     * element accepts DOM nodes as children for the default slot.
     * The default slot can also be named with "body".
     * For styling, the default body slot will be rendered with the <code class="prettyprint">oj-dialog-body</code> class.
     *
     * @ojchild Default
     * @memberof oj.ojDialog
     * @since 4.0.0
     *
     * @example <caption>Initialize the Dialog with body content:</caption>
     * &lt;oj-dialog>
     *   &lt;div>Dialog Content&lt;/div>
     * &lt;/oj-dialog>
     *
     * @example <caption>Initialize the Dialog with body content, explicitly naming the body slot:</caption>
     * &lt;oj-dialog>
     *   &lt;div slot="body">Dialog Content&lt;/div>
     * &lt;/oj-dialog>
     */

    /**
     * <p>The <code class="prettyprint">footer</code> slot is for the dialog's footer area.
     * The <code class="prettyprint">&lt;oj-dialog></code> element accepts DOM nodes as children
     * with the footer slot.
     * For styling, the footer body slot will be rendered with the <code class="prettyprint">oj-dialog-footer</code> class.
     *
     * @ojslot footer
     * @memberof oj.ojDialog
     * @since 4.0.0
     *
     * @example <caption>Initialize the Dialog with body and footer content:</caption>
     * &lt;oj-dialog>
     *   &lt;div>Dialog Content&lt;/div>
     *   &lt;div slot='footer'>Footer Content&lt;/div>
     * &lt;/oj-dialog>
     */

    /**
     * <p>The <code class="prettyprint">header</code> slot is for the dialog's header area.
     * The  <code class="prettyprint">&lt;oj-dialog></code> element accepts DOM nodes as children
     * with the header slot.
     * For styling, the header slot will be rendered with the <code class="prettyprint">oj-dialog-header</code> class.
     * </p>
     * If a header slot is not specified by the user, a header will automatically be created.
     * The automatically generated header will contain a close button, and the header title will be set
     * to the dialog title.
     * @ojslot header
     * @memberof oj.ojDialog
     * @since 4.0.0
     *
     * @example <caption>Initialize the Dialog with header and body content:</caption>
     * &lt;oj-dialog>
     *   &lt;div slot='header'>Header Content&lt;/div>
     *   &lt;div>Dialog Content&lt;/div>
     * &lt;/oj-dialog>
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
     *       <td>Dialog Close Icon</td>
     *       <td><kbd>Tap</kbd></td>
     *       <td>Close the dialog.</td>
     *     </tr>
     *   </tbody>
     * </table>
     *
     * @ojfragment touchDoc - Used in touch gesture section of classdesc, and standalone gesture doc
     * @memberof oj.ojDialog
     */

    /**
     * The JET Dialog can be closed with keyboard actions:
     *
     * <p>
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
     *       <td>Dialog</td>
     *       <td><kbd>Esc</kbd></td>
     *       <td>Close the dialog.</td>
     *     </tr>
     *     <tr>
     *       <td>Dialog Close Icon</td>
     *       <td><kbd>Enter</kbd> or <kbd>Space</kbd></td>
     *       <td>Close the dialog.</td>
     *     </tr>
     *   </tbody>
     * </table>
     *
     * @ojfragment keyboardDoc - Used in keyboard section of classdesc, and standalone gesture doc
     * @memberof oj.ojDialog
     */

    /**
     * <table class="generic-table styling-table">
     *   <thead>
     *     <tr>
     *       <th>Class(es)</th>
     *       <th>Description</th>
     *     </tr>
     *   </thead>
     *   <tbody>
     *     <tr>
     *       <td>oj-dialog-header</td>
     *       <td><p> Class automatically generated on the header slot.</td>
     *       </td>
     *     </tr>
     *     <tr>
     *       <td>oj-dialog-title</td>
     *       <td><p> Class used to format the title. Automatically created headers use <code class="prettyprint"> oj-dialog-title </code> to format the title. For user-defined headers, you may want to use the <code class="prettyprint"> oj-dialog-title </code> so that the title in your user-defined header is stylistically similar to a default title. </td>
     *     </tr>
     *     <tr>
     *       <td>oj-dialog-body</td>
     *       <td><p> Class automatically generated on the default (body) slot.</td>
     *     </tr>
     *     <tr>
     *       <td>oj-dialog-footer</td>
     *       <td><p> Class automatically generated on the footer slot.</td>
     *     </tr>
     *     <tr>
     *       <td>oj-dialog-footer-separator</td>
     *       <td><p>A separator between the dialog body and the dialog footer can be added by using a second style class ( <code class="prettyprint"> oj-dialog-footer-separator </code>) in the footer. So use:
     *           <ul>
     *             <li>oj-dialog-footer oj-dialog-footer-separator</li>
     *           </ul>
     *      to add a footer separator to the dialog.
     *        Note that for themes that have a built-in footer separator (specifically the iOS theme),
     *        this class has no effect.
     *     <p>See the demo section for a live example of the footer separator. </td>
     *     </tr>
     *     <tr>
     *       <td>oj-progress-bar-embedded</td>
     *       <td><p> Optional markup. Used to format a progress bar embedded in the dialog header.</td>
     *     </tr>
     *     <tr>
     *       <td>oj-focus-highlight</td>
     *       <td>{@ojinclude "name":"ojFocusHighlightDoc"}</td>
     *     </tr>
     *
     *   </tbody>
     * </table>
     *
     * <p> Note that the dialog component wraps additional divs around the user's content and also performs other DOM manipulations.
     * Thus, the user should be careful if they wish to engage in advanced coding approaches.
     * In general, it is best to target DOM elements by id or class name
     * (e.g., developers should not rely on relative positioning of dialog DOM elements).
     *
     * @ojfragment stylingDoc - Used in Styling section of classdesc, and standalone Styling doc
     * @memberof oj.ojDialog
     */

    //////////////////     SUB-IDS     //////////////////
    /**
     * <p>Sub-ID for the dialog header.</p>
     *
     * @ojsubid oj-dialog-header
     * @memberof oj.ojDialog
     *
     * @example <caption>Get the node for the dialog header:</caption>
     * var node = myComponent.getNodeBySubId({'subId': 'oj-dialog-header'});
     */

    /**
     * <p>Sub-ID for the dialog footer.</p>
     *
     * @ojsubid oj-dialog-footer
     * @memberof oj.ojDialog
     *
     * @example <caption>Get the node for the dialog footer:</caption>
     * var node = myComponent.getNodeBySubId({'subId': 'oj-dialog-footer'});
     */

    /**
     * <p>Sub-ID for the dialog body.</p>
     *
     * @ojsubid oj-dialog-body
     * @memberof oj.ojDialog
     * @deprecated 1.2
     *
     * @example <caption>Get the node for the dialog body:</caption>
     * var node = myComponent.getNodeBySubId({'subId': 'oj-dialog-body'});
     */

    /**
     * <p>Sub-ID for the dialog content.</p>
     *
     * @ojsubid oj-dialog-content
     * @memberof oj.ojDialog
     *
     * @example <caption>Get the node for the dialog content:</caption>
     * var node = myComponent.getNodeBySubId({'subId': 'oj-dialog-content'});
     */

    /**
     * <p>Sub-ID for the dialog header-close-wrapper.</p>
     *
     * @ojsubid oj-dialog-header-close-wrapper
     * @memberof oj.ojDialog
     *
     * @example <caption>Get the node for the dialog header-close-wrapper:</caption>
     * var node = myComponent.getNodeBySubId({'subId': 'oj-dialog-header-close-wrapper'});
     */

    /**
     * <p>Sub-ID for the dialog close-icon.</p>
     *
     * @ojsubid oj-dialog-close-icon
     * @memberof oj.ojDialog
     * @deprecated 1.2
     *
     * @example <caption>Get the node for the dialog close-icon:</caption>
     * var node = myComponent.getNodeBySubId({'subId': 'oj-dialog-close-icon'});
     */

    /**
     * <p>Sub-ID for the dialog close affordance.</p>
     *
     * @ojsubid oj-dialog-close
     * @memberof oj.ojDialog
     * @deprecated 2.1.0
     *
     * @example <caption>Get the node for the dialog close affordance:</caption>
     * var node = myComponent.getNodeBySubId({'subId': 'oj-dialog-close'});
     */

    /**
     * <p>Sub-ID for the dialog resizable handle at the north location.</p>
     *
     * @ojsubid oj-resizable-n
     * @memberof oj.ojDialog
     *
     * @example <caption>Get the node for the dialog header:</caption>
     * var node = myComponent.getNodeBySubId({'subId': 'oj-resizable-n'});
     */

    /**
     * <p>Sub-ID for the dialog resizable handle at the south location.</p>
     *
     * @ojsubid oj-resizable-s
     * @memberof oj.ojDialog
     *
     * @example <caption>Get the node for the dialog header:</caption>
     * var node = myComponent.getNodeBySubId({'subId': 'oj-resizable-s'});
     */

    /**
     * <p>Sub-ID for the dialog resizable handle at the east location.</p>
     *
     * @ojsubid oj-resizable-e
     * @memberof oj.ojDialog
     *
     * @example <caption>Get the node for the dialog header:</caption>
     * var node = myComponent.getNodeBySubId({'subId': 'oj-resizable-e'});
     */

    /**
     * <p>Sub-ID for the dialog resizable handle at the west location.</p>
     *
     * @ojsubid oj-resizable-w
     * @memberof oj.ojDialog
     *
     * @example <caption>Get the node for the dialog header:</caption>
     * var node = myComponent.getNodeBySubId({'subId': 'oj-resizable-w'});
     */

    /**
     * <p>Sub-ID for the dialog resizable handle at the northeast location.</p>
     *
     * @ojsubid oj-resizable-ne
     * @memberof oj.ojDialog
     *
     * @example <caption>Get the node for the dialog header:</caption>
     * var node = myComponent.getNodeBySubId({'subId': 'oj-resizable-ne'});
     */

    /**
     * <p>Sub-ID for the dialog resizable handle at the northwest location.</p>
     *
     * @ojsubid oj-resizable-nw
     * @memberof oj.ojDialog
     *
     * @example <caption>Get the node for the dialog header:</caption>
     * var node = myComponent.getNodeBySubId({'subId': 'oj-resizable-nw'});
     */

    /**
     * <p>Sub-ID for the dialog resizable handle at the southwest location.</p>
     *
     * @ojsubid oj-resizable-sw
     * @memberof oj.ojDialog
     *
     * @example <caption>Get the node for the dialog header:</caption>
     * var node = myComponent.getNodeBySubId({'subId': 'oj-resizable-sw'});
     */

    /**
     * <p>Sub-ID for the dialog resizable handle at the southeast location.</p>
     *
     * @ojsubid oj-resizable-se
     * @memberof oj.ojDialog
     *
     * @example <caption>Get the node for the dialog header:</caption>
     * var node = myComponent.getNodeBySubId({'subId': 'oj-resizable-se'});
     */
  });

  oj.Components.setDefaultOptions(
    {
      'ojDialog':
        {
          'resizeBehavior': oj.Components.createDynamicPropertyGetter(
            function()
            {
                return (oj.ThemeUtils.parseJSONFromFontFamily('oj-dialog-option-defaults') || {})["resizeBehavior"];
            }),
          'cancelBehavior': oj.Components.createDynamicPropertyGetter(
            function()
            {
                return (oj.ThemeUtils.parseJSONFromFontFamily('oj-dialog-option-defaults') || {})["cancelBehavior"];
            }),
          'dragAffordance': oj.Components.createDynamicPropertyGetter(
            function()
            {
                return (oj.ThemeUtils.parseJSONFromFontFamily('oj-dialog-option-defaults') || {})["dragAffordance"];
            })
        }
    });

}());

(function () {
  var ojDialogMeta = {
    "properties" : {
      "cancelBehavior" : {
        "type" : "string",
        "enumValues" : ["icon", "escape", "none"]
      },
      "dragAffordance" : {
        "type" : "string",
        "enumValues" : ["title-bar", "none"]
      },
      "initialVisibility" : {
        "type" : "string",
        "enumValues" : ["hide", "show"]
      },
      "modality" : {
        "type" : "string",
        "enumValues" : ["modal", "modeless"]
      },
      "position" : {
        "type" : "object",
        "properties" : {
          "my" : {
            "type" : "object|string",
            "properties" : {
              "horizontal" : {
                "type" : "string",
                "enumValues" : ["start", "end", "left", "center", "right"]
              },
              "vertical" : {
                "type" : "string",
                "enumValues" : ["top", "center", "bottom"]
              }
            }
          },
          "at" : {
            "type" : "object|string",
            "properties" : {
              "horizontal" : {
                "type" : "string",
                "enumValues" : ["start", "end", "left", "center", "right"]
              },
              "vertical" : {
                "type" : "string",
                "enumValues" : ["top", "center", "bottom"]
              }
            }
          },
          "offset" : {
            "type" : "object",
            "properties" : {
              "x" : {
                "type" : "number"
              },
              "y" : {
                "type" : "number"
              }
            }
          },
          "of" : {
            "type" : "string|{x:number, y:number}"
          },
          "collision" : {
            "type" : "string",
            "enumValues" : ["flip", "fit", "flipfit", "none"]
          }
        }
      },
      "resizeBehavior" : {
        "type" : "string",
        "enumValues" : ["resizable", "none"]
      }
    },
    "events" : {
      "animateEnd" : {},
      "animateStart" : {},
      "beforeClose" : {},
      "beforeOpen" : {},
      "close" : {},
      "open" : {},
      "focus" : {},
      "resize" : {},
      "resizeStart" : {},
      "resizeStop" : {},
      "drag" : {},
      "dragStart" : {},
      "dragStop" : {}
    },
    "methods" : {
      "close" : {},
      "isOpen" : {},
      "open" : {},
      "refresh" : {}
    },
    "extension" : {
      _WIDGET_NAME : "ojDialog"
    }
  };
  oj.CustomElementBridge.registerMetadata('oj-dialog', 'baseComponent', ojDialogMeta);
  oj.CustomElementBridge.register('oj-dialog', {'metadata' : oj.CustomElementBridge.getMetadata('oj-dialog')});
})();

});

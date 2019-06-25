/**
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";
define(['ojs/ojcore', 'jquery', "hammerjs", "ojs/ojjquery-hammer", 'promise', 'ojs/ojcomponentcore', 'ojs/ojpopupcore', 'ojs/ojanimation', 'ojs/ojoption'], 
       function(oj, $, Hammer)
{

/**
 * All rights reserved.
 */

/**
 * @preserve Copyright 2013 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

(function() {

/**
 * @ojcomponent oj.ojMenu
 * @ojdisplayname Menu
 * @augments oj.baseComponent
 * @ojrole menu
 * @since 0.6
 * @ojstatus preview
 *
 * @classdesc
 * <h3 id="menuOverview-section">
 *   JET Menu
 *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#menuOverview-section"></a>
 * </h3>
 *
 * <p>Description: Themeable, WAI-ARIA-compliant popup menu with touch, mouse and keyboard interactions for navigation.
 *
 * <p>A JET Menu is created using an ( <code class="prettyprint">&lt;oj-menu></code> ) tag with an ( <code class="prettyprint">&lt;oj-option></code> ) tag representing each menu item:
 *
 * <pre class="prettyprint">
 * <code>&lt;oj-menu id="menu" style="display:none" aria-label="Order Edit">
 *   &lt;oj-option>Item 1&lt;/oj-option>
 *   &lt;oj-option>Item 2&lt;/oj-option>
 *   &lt;oj-option>Item 3&lt;/oj-option>
 *   &lt;oj-option>Item 4&lt;/oj-option>
 *   &lt;oj-option>Item 5&lt;/oj-option>
 * &lt;/oj-menu>
 * </code></pre>
 *
 * <p>JET Menus are not intended to be scrollable, as large, unwieldy menus are not good UX.  Ideally menus should have a manageable number of items.
 *
 *
 * <h3 id="popup-section">
 *   Popup Menus
 *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#popup-section"></a>
 * </h3>
 *
 * <p>JET Menu is a popup component, for use with [context menu]{@link oj.baseComponent#contextMenu}, [menu button]{@link oj.ojButton#menu},
 * or similar functionality.  It is not intended to sit inline on the page.  See also the [JET NavigationList]{@link oj.ojNavigationList} component.
 *
 * <p>For this reason, the component is automatically hidden until it is opened.  However, this styling is not applied until the component is initialized.
 * To avoid a FOUC (flash of unstyled content), applications are encouraged to apply <code class="prettyprint">style="display:none"</code> to the menu markup,
 * as shown in the above code sample.
 *
 *
 * <h3 id="dividers-section">
 *   Dividers
 *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#dividers-section"></a>
 * </h3>
 *
 * <p>Divider elements can be created by including menu items that contain only spaces and/or dashes, or nothing at all:
 *
 * <pre class="prettyprint">
 * <code>&lt;oj-menu id="menu" style="display:none" aria-label="Order Edit">
 *   &lt;oj-option>Item 1&lt;/oj-option>
 *   &lt;oj-option>---&lt;/oj-option>
 *   &lt;oj-option>Item 2&lt;/oj-option>
 * &lt;/oj-menu>
 * </code></pre>
 *
 * <p>For WAI-ARIA compliance, JET automatically adds <code class="prettyprint">role="separator"</code> to the divider element.
 *
 *
 * <h3 id="itemIcons-section">
 *   Menu Item Icons
 *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#itemIcons-section"></a>
 * </h3>
 *
 * <p>Menu items currently support the rendering of start and end icons. To render start or end icons for a menu item, the
 * <code class="prettyprint">startIcon</code> or <code class="prettyprint">endIcon</code> slot of the <code class="prettyprint">oj-option</code>
 * should be specified. See the <code class="prettyprint">oj-option</code> doc for details about accepted children and slots.</p>
 * 
 * 
 * <h3 id="dismissal-section">
 *   Dismissal
 *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#dismissal-section"></a>
 * </h3>
 *
 * <p>JET Menus auto-dismiss in the expected cases, such as focus loss and menu item selection.  In addition, Sheet Menus
 * offer the following optional dismissal affordances:
 *
 * <ul>
 * <li>A "Cancel" menu item is displayed for Sheet Menus if the
 *     <code class="prettyprint">$menuSheetCancelAffordance</code> SASS variable is set to
 *     <code class="prettyprint">"menuItem"</code>.  See its
 *     <a href="#translations.labelCancel">translation</a> and <a href="#oj-menu-cancel-command">subId</a>.</li>
 * <li>The user can dismiss Sheet Menus via a downward swipe on the menu if the
 *     <code class="prettyprint">$menuSheetSwipeDownBehavior</code> SASS variable is set to
 *     <code class="prettyprint">"dismiss"</code>.</li>
 * </ul>
 *
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
 * <h3 id="a11y-section">
 *   Accessibility
 *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#a11y-section"></a>
 * </h3>
 *
 * <p>The app should supply either an <code class="prettyprint">aria-label</code> or <code class="prettyprint">aria-labelledby</code>
 * attribute on the menu's root element, except possibly for menu buttons as discussed below.
 *
 * <p>If a menu is shared by different launchers, and should have a different label for each launcher, then a
 * <a href="#event:ojBeforeOpen">ojBeforeOpen</a> listener can be used to set a different label per launch.
 *
 * <p>For a menu launched exclusively by one or more [menu buttons]{@link oj.ojButton#menu}, these attributes are optional.  When the
 * menu is opened via the menu button UI, if neither attribute is present after all <a href="#event:ojBeforeOpen">ojBeforeOpen</a>
 * listeners have been called, then <code class="prettyprint">aria-labelledby</code> will be set on the menu, referencing the menu
 * button, and will be removed when the menu is closed.  This approach provides a useful default label, while allowing the app to
 * supply a different label if desired, and while allowing the menu to be shared by several menu buttons and/or other launchers.
 *
 * <p>Disabled content: JET supports an accessible luminosity contrast ratio,
 * as specified in <a href="http://www.w3.org/TR/WCAG20/#visual-audio-contrast-contrast">WCAG 2.0 - Section 1.4.3 "Contrast"</a>,
 * in the themes that are accessible.  (See the "Theming" chapter of the JET Developer Guide for more information on which
 * themes are accessible.)  Note that Section 1.4.3 says that text or images of text that are part of an inactive user
 * interface component have no contrast requirement.  Because disabled content may not meet the minimum contrast ratio
 * required of enabled content, it cannot be used to convey meaningful information.<p>
 *
 *
 * <h3 id="reparenting-section">
 *   Reparenting
 *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#reparenting-section"></a>
 * </h3>
 *
 *  <p id="reparenting-strategy">
 *     When a menu is opened, it will be reparented in the document and reparented back when closed.
 *     The goal of this design is to maintain as much of the page author's document structure as possible, while
 *     avoiding most of the clipping and positioning issues of a completely inline design.
 *  </p>
 *  <p>
 *     If opened from another popup, the menu will be reparented to the nearest parent popup.
 *     Otherwise, the menu will be reparented to a container in the document body.
 *  </p>
 *  <p>
 *     The context of opening is defined by the resolved <code class="prettyprint">openOptions.launcher</code> value,
 *     which can be set via the <a href="#openOptions.launcher">attribute</a>, via the argument to the <a href="#open">open()</a>
 *     method, or via a <a href="#event:ojBeforeOpen">ojBeforeOpen</a> listener.
 *  <p>
 *     All menus are assigned the same z-index values. The layering between peer popups reflects the opening order.
 *     In addition, the page author has control over z-index weights by way of the menu's layer.
 *     The menu's layer defines the "stacking context" and assignd the "oj-menu-layer" style.
 *  </p>
 *  <p>
 *     Some notable consequences of this design:
 *  </p>
 *  <ul>
 *    <li>Events raised within the menu will not bubble up to the menu's original ancestors.  Instead, listeners for menu events should
 *        be applied to either the menu's root element, or the document.</li>
 *    <li>Likewise, developers should not use CSS descendant selectors, or similar logic, that assumes that the menu will remain a child
 *        of its original parent.</li>
 *  </ul>
 *
 *
 * <h3 id="perf-section">
 *   Performance
 *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#perf-section"></a>
 * </h3>
 *
 * <p>If a menu launcher (such as a [menu button]{@link oj.ojButton#menu} or item with a [context menu]{@link oj.baseComponent#contextMenu})
 * is stamped inside a table, dataGrid, or other container, the resulting set of launchers should share a single menu defined outside the container.
 *
 *
 * <h3 id="rtl-section">
 *   Reading direction
 *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#rtl-section"></a>
 * </h3>
 *
 * <p>The only supported way to set the reading direction (LTR or RTL) is to set the <code class="prettyprint">"dir"</code> attribute on the
 * <code class="prettyprint">&lt;html></code> element of the page.  As with any JET component, in the unusual case that the reading direction
 * is changed post-init, the menu must be <code class="prettyprint">refresh()</code>ed, or the page must be reloaded.
 *
 *
 * <h3 id="binding-section">
 *   Declarative Binding
 *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#binding-section"></a>
 * </h3>
 *
 * <p>For components like Menu and Buttonset that contain a number of like items, applications may wish to use a <code class="prettyprint">foreach</code> Knockout binding
 * to stamp out the contents.  This binding cannot live on the same node as the JET <code class="prettyprint">ojComponent</code> binding, and must instead live on a nested
 * virtual element as follows:
 *
 * <pre class="prettyprint">
 * <code>&lt;oj-menu id="menu" style="display:none" aria-label="Order Edit">
 *     &lt;!-- ko foreach: menuItems -->
 *         &lt;oj-option data-bind="attr: {id: id, disabled: disabled}">
 *             &lt;span data-bind="text: label">&lt;/span>
 *         &lt;/oj-option>
 *     &lt;!-- /ko -->
 * &lt;/oj-menu>
 * </code></pre>
 *
 *
 * <!-- - - - - Above this point, the tags are for the class.
 *              Below this point, the tags are for the constructor (initializer). - - - - - - -->
 *
 */
oj.__registerWidget("oj.ojMenu", $['oj']['baseComponent'], {
    defaultElement: "<ul>", // added to externs.js, since this is an override of a superclass member.  (That's the rule for public methods, what about protected fields?)  TODO: Would @override do the job and be better than externing?
    delay: 300, // Doesn't get renamed even when unquoted and not in (our) externs.js file, so I'm leaving it unquoted for now.  TBD: This is private, but do NOT rename to _delay since there's an inherited instance method by that name, so rename so something else prefixed with _.
    role: "menu", // private.  I moved from options to here since no longer public option.  Leave unquoted so gets renamed by GCC as desired.
    widgetEventPrefix : "oj",
    options: { // options is in externs.js, so no need for quotes
        /**
         * Disables the menu if set to <code class="prettyprint">true</code>.
         *
         * @member
         * @name disabled
         * @memberof oj.ojMenu
         * @instance
         * @type {boolean}
         * @default false
         *
         * @example <caption>Initialize the menu with the <code class="prettyprint">disabled</code> attribute specified:</caption>
         * &lt;oj-menu disabled='true'>&lt;/oj-menu>
         *
         * @example <caption>Get or set the <code class="prettyprint">disabled</code> property after initialization:</caption>
         * // getter
         * var disabledValue = myMenu.disabled;
         *
         * // setter
         * myMenu.disabled = true;
         */
        // disabled option declared in superclass, but we still want the above API doc

        // Deprecated in release 2.1.0.  Should be removed when that release End-of-Lifes.
        // At that time, update the "if not ul" check in _ComponentCreate per comment there, and update non-ul unit tests to ensure we throw in that case.
        /**
         * Selector for the elements that serve as the menu container, including submenus.
         *
         * <p>Note: The <code class="prettyprint">menuSelector</code> attribute should not be changed after initialization. Existing submenus will not be updated.
         *
         * @expose
         * @memberof oj.ojMenu
         * @instance
         * @ignore
         * @type {string}
         * @default "ul"
         * @deprecated 2.1.0 Menus should always be created from an unordered list ( <code class="prettyprint">&lt;ul></code> ).
         *   This API will be removed in a future release.
         */
        menuSelector: "ul",

        /**
         * <p>A collection of settings impacting the launch of a menu.  These <code class="prettyprint">openOptions</code>
         * may be accessed and overridden individually or collectively, as seen in the examples.
         *
         * <p>The values set here can be overridden on a per-launch basis by passing the corresponding params into the
         * <a href="#open">open</a> method.  Those per-launch values can be further customized by a
         * <a href="#event:ojBeforeOpen">ojBeforeOpen</a> listener.
         *
         * <p>The built-in [menu button]{@link oj.ojMenuButton} and [context menu]{@link oj.baseComponent#contextMenu} functionality
         * overrides some of the Menu's <code class="prettyprint">openOptions</code>, for WAI-ARIA compliance and other reasons.
         * Thus, if the app really wants to customize
         * those values, it must do so in a <code class="prettyprint">ojBeforeOpen</code> listener.  If the built-in menu button
         * or context menu functionality is modified in this way, it is the app's responsibility to ensure that the result is
         * both correct and accessible.
         *
         * @expose
         * @memberof oj.ojMenu
         * @instance
         * @type {Object}
         *
         * @example <caption>Initialize the menu, setting some <code class="prettyprint">openOptions</code> values.</caption>
         * &lt;oj-menu open-options.initial-focus='true' open-options.launcher='myLauncher'>&lt;/oj-menu>
         *
         * @example <caption>Get or set the <code class="prettyprint">openOptions</code> attribute, after initialization:</caption>
         * // Get one
         * var value = myMenu.openOptions.launcher;
         *
         * // Get all
         * var values = myMenu.openOptions;
         *
         * // Set one, leaving the others intact
         * myMenu.openOptions.initialFocus = 'none';
         *
         * // Set many.  Any existing openOptions not listed are lost
         * myMenu.openOptions = { 'launcher': 'myLauncher',
         *                        'initialFocus': 'firstItem',
         *                        'position': myPositionObj };
         */
        openOptions: {
            /**
             * <p>Determines whether the menu is displayed as a dropDown menu or a sheet menu.
             *
             * <p>The default value is <code class="prettyprint">"auto"</code>, in which case the behavior is a function of the
             * screen width and the <code class="prettyprint">$menuDropDownThresholdWidth</code> SASS variable.  For example,
             * if that variable is set to 768px, then for screen widths of 768px and larger, the menu will display as a dropDown,
             * and for screen widths less than 768px, the menu will display as a sheet.
             *
             * <p>To avoid disorienting the user, if the screen width changes while the menu is already open (e.g. due to a device
             * rotation), the display may not change until the next launch.
             *
             * <p>If the SASS variable is set to 0 or a huge value such as 99999px, then all menus with
             * <code class="prettyprint">display</code> set to <code class="prettyprint">"auto"</code> will always display as a
             * dropDown or sheet, respectively.
             *
             * @expose
             * @alias openOptions.display
             * @memberof! oj.ojMenu
             * @instance
             * @since 2.1.0
             *
             * @type {string}
             * @default "auto"
             * @ojvalue {string} "auto" Displays the menu as a sheet or dropDown, depending on the screen width.
             * @ojvalue {string} "dropDown" Displays the menu as a dropDown.
             * @ojvalue {string} "sheet" Displays the menu as a sheet.
             *
             * @example <caption>Initialize the menu with the <code class="prettyprint">openOptions.display</code> sub-option specified:</caption>
             * &lt;oj-menu open-options.display='dropDown'>&lt;/oj-menu>
             *
             * @example <caption>Get or set the <code class="prettyprint">openOptions.display</code> sub-option, after initialization:</caption>
             * // getter
             * var display = myMenu.openOptions.display;
             *
             * // setter:
             * myMenu.openOptions.display = 'sheet';
             */
            display : "auto",

            /**
             * Determines focus behavior when the menu is initially opened.
             *
             * @expose
             * @alias openOptions.initialFocus
             * @memberof! oj.ojMenu
             * @instance
             * @type {string}
             * @default "menu"
             * @ojvalue {string} "none" Leaves focus where it is, e.g. on the launching component.  The application must verify that the result is accessible.
             * @ojvalue {string} "menu" Focuses the menu itself, with no menu item focused (e.g. typical Context Menu behavior).
             * @ojvalue {string} "firstItem" Focuses the first menu item (e.g. MenuButton <kbd>DownArrow</kbd> behavior).
             *
             * @example <caption>Initialize the menu with the <code class="prettyprint">openOptions.initialFocus</code> sub-option specified:</caption>
             * &lt;oj-menu open-options.initial-focus='firstItem'>&lt;/oj-menu>
             *
             * @example <caption>Get or set the <code class="prettyprint">openOptions.initialFocus</code> sub-option, after initialization:</caption>
             * // getter
             * var initialFocus = myMenu.openOptions.initialFocus;
             *
             * // setter:
             * myMenu.openOptions.initialFocus = 'none';
             */
            initialFocus : "menu",

            /**
             * <p>The DOM node (which may or may not be a JET component) that launches this menu.
             * This node must be focusable, as focus is returned to it upon menu dismissal.
             *
             * <p>The launcher must either be specified in this component option, or on each menu launch -- see <a href="#open">open()</a>
             * and <a href="#event:ojBeforeOpen">ojBeforeOpen</a>.
             *
             * @expose
             * @alias openOptions.launcher
             * @memberof! oj.ojMenu
             * @instance
             * @type {string|Object}
             * @default null
             *
             * @example <caption>Initialize the menu with the <code class="prettyprint">openOptions.launcher</code> sub-option specified:</caption>
             * &lt;oj-menu open-options.launcher='myLauncher'>&lt;/oj-menu>
             *
             * @example <caption>Get or set the <code class="prettyprint">openOptions.launcher</code> sub-option, after initialization:</caption>
             * // getter
             * var launcher = myMenu.openOptions.launcher;
             *
             * // setter:
             * myMenu.openOptions.launcher = 'myLauncher';
             */
            launcher: null,

            /**
             * <p>Determines the position of a dropDown menu when launched via the <code class="prettyprint">open()</code> method or via menu button or
             * context menu functionality.  Ignored for sheet menus.
             *
             * <p>Please refer to the jQuery UI [Position]{@link http://api.jqueryui.com/position/} utility for details about the various choices.
             * In addition to that syntax, note that JET supports the following reading direction-aware extended syntax in the
             * <code class="prettyprint">my</code> and <code class="prettyprint">at</code> fields:
             *
             * <ul>
             * <li>JET supports <code class="prettyprint">start</code> and <code class="prettyprint">end</code> values wherever <code class="prettyprint">left</code>
             * and <code class="prettyprint">right</code> are supported.  The <code class="prettyprint">start</code> value means "left in LTR; right in RTL",
             * while the <code class="prettyprint">end</code> value means "right in LTR; left in RTL."</li>
             *
             * <li>Similarly, JET supports <code class="prettyprint">></code> and <code class="prettyprint">&lt;</code> operators wherever <code class="prettyprint">+</code>
             * and <code class="prettyprint">-</code> are supported.  The <code class="prettyprint">></code> value means "+ in LTR; - in RTL",
             * while the <code class="prettyprint">&lt;</code> value means "- in LTR; + in RTL."  E.g. a <code class="prettyprint">my</code> value
             * of <code class="prettyprint">"start>40"</code> shifts the menu 40px "endward," while a <code class="prettyprint">my</code> value
             * of <code class="prettyprint">"start&lt;40"</code> shifts the menu 40px "startward."</li>
             * </ul>
             *
             * <p>Menu also supports the following extended syntax for the <code class="prettyprint">of</code> field:
             *
             * <ul>
             * <li>The <code class="prettyprint">"event"</code> keyword means "position the menu relative to the UI event that opened the menu."</li>
             * <li>The <code class="prettyprint">"launcher"</code> keyword means "position the menu relative to the launcher element."</li>
             * </ul>
             *
             * <p>By default, when the <code class="prettyprint">of</code> field is not set, the menu is positioned relative to the launcher.
             *
             * @expose
             * @alias openOptions.position
             * @memberof! oj.ojMenu
             * @instance
             * @type {Object}
             * @default { "my": "start top", "at": "start bottom", "collision": "flipfit" }
             *
             * @example <caption>Initialize the menu with the <code class="prettyprint">openOptions.position</code> option specified:</caption>
             * &lt;oj-menu open-options.position.my='start'>&lt;/oj-menu>
             *
             * @example <caption>Get or set the <code class="prettyprint">openOptions.position</code> sub-option, after initialization:</caption>
             * // Get one field of position object
             * var position = myMenu.openOptions.position.my;
             *
             * // Get entire position object
             * var position = myMenu.openOptions.position;
             *
             * // Set one field of position object, leaving the others intact
             * myMenu.openOptions.position.at = 'end bottom';
             *
             * // Set entire position object. Any fields not listed are lost.
             * myMenu.openOptions.position = { 'my': 'start top', 'at': 'end<5 top+5', 'collision': 'flipfit' };
             */
            position: {
                /** @expose */
                my: "start top",
                /** @expose */
                at: "start bottom",

                // : Ensure menu stays onscreen (hence no autoscrolling/jumping the page to move it back onscreen), even when when
                // the screen is very small (phones, small desktop browser windows).  If the menu height is less than the viewport height, but
                // greater than the viewport height y-above and y-below the launcher, then with the default "flip" policy, the menu will appear
                // y-above or y-below the launcher, and the window will autoscroll vertically to display the menu, while with the "flipfit" policy, the
                // menu will appear z-above the launcher as needed to stay onscreen, so the window does not need to autoscroll vertically. Likewise horizontally.
                "collision": "flipfit"
            }
        },

        // Omitting the usual verbiage about whether the "other" sub-options are clobbered by a given setter syntax,
        // since only one sub-option currently.
        // TBD: restore that verbiage (copy from openOptions) if gain 2nd sub-option.
        /**
         * <p>A collection of settings impacting the launch of submenus.
         *
         * <p>This option affects submenus, while the similar <code class="prettyprint">openOptions</code> affects the top-level menu.
         *
         * @expose
         * @memberof oj.ojMenu
         * @instance
         * @ignore
         * @type {Object}
         */
        submenuOpenOptions: {
            /**
             * <p>Determines the position of submenus.
             *
             * <p>Please refer to the jQuery UI [Position]{@link http://api.jqueryui.com/position/} utility for details about the various choices.
             * In addition to that syntax, note that JET supports the following reading direction-aware extended syntax in the
             * <code class="prettyprint">my</code> and <code class="prettyprint">at</code> fields:
             *
             * <ul>
             * <li>JET supports <code class="prettyprint">start</code> and <code class="prettyprint">end</code> values wherever <code class="prettyprint">left</code>
             * and <code class="prettyprint">right</code> are supported.  The <code class="prettyprint">start</code> value means "left in LTR; right in RTL",
             * values in the <code class="prettyprint">my</code> and <code class="prettyprint">at</code> fields wherever <code class="prettyprint">left</code>
             * and <code class="prettyprint">right</code> are supported.  The <code class="prettyprint">start</code> value means "left in LTR; right in RTL",
             * while the <code class="prettyprint">end</code> value means "right in LTR; left in RTL."</li>
             *
             * <li>Similarly, JET supports <code class="prettyprint">></code> and <code class="prettyprint">&lt;</code> operators wherever <code class="prettyprint">+</code>
             * and <code class="prettyprint">-</code> are supported.  The <code class="prettyprint">></code> value means "+ in LTR; - in RTL",
             * while the <code class="prettyprint">&lt;</code> value means "- in LTR; + in RTL."  E.g. a <code class="prettyprint">my</code> value
             * of <code class="prettyprint">"start>40"</code> shifts the submenu 40px "endward," while a <code class="prettyprint">my</code> value
             * of <code class="prettyprint">"start&lt;40"</code> shifts the submenu 40px "startward."</li>
             * </ul>
             *
             * <p>By default, the submenu is positioned relative to the parent menu item, but if a value is set on
             * the <code class="prettyprint">of</code> field, then the submenu is positioned relative to that element or position instead.
             *
             * @expose
             * @alias submenuOpenOptions.position
             * @memberof! oj.ojMenu
             * @instance
             * @ignore
             * @type {Object}
             * @default { "my": "start top", "at": "end top", "collision": "flipfit" }
             */
            position: {
                /** @expose */
                my: "start top",
                /** @expose */
                at: "end top",
                "collision": "flipfit" // see comments on openOptions.position.collision
            }
        },

        // Events

        /**
         * Triggered when a default animation is about to start, such as when the component is
         * being opened/closed or a child item is being added/removed. The default animation can
         * be cancelled by calling <code class="prettyprint">event.preventDefault</code>.
         *
         * <caption>The default animations are controlled via the theme (SCSS) :</caption>
         * <pre class="prettyprint"><code>
         * // dropdown menu
         * $menuDropDownOpenAnimation: (effect: "zoomIn", transformOrigin: "#myPosition", duration: $animationDurationShort) !default;
         * $menuDropDownCloseAnimation: (effect: "none") !default;
         *
         * // sheet menu
         * $menuSheetOpenAnimation: (effect: "slideIn", direction: "top", duration: $animationDurationShort) !default;
         * $menuSheetCloseAnimation: (effect: "slideOut", direction: "bottom", duration: $animationDurationShort) !default;
         *
         * </code></pre>
         * @ojshortdesc Triggered when a default animation is about to start, such as when the component is
         * being opened/closed or a child item is being added/removed. The default animation can
         * be cancelled by calling event.preventDefault.
         *
         * @expose
         * @event
         * @memberof oj.ojMenu
         * @instance
         * @property {CustomEvent} event a custom event
         * @property {Object} event.detail an object containing component specific event info
         * @property {string} event.detail.action The action that is starting the animation.
         *            The number of actions can vary from component to component.
         *            Suggested values are:
         *                    <ul>
         *                      <li>"open" - when a menu is opened</li>
         *                      <li>"close" - when a menu is closed</li>
         *                    </ul>
         * @property {Element} event.detail.element target of animation
         * @property {function} event.detail.endCallback If the event listener calls
         *            event.preventDefault to cancel the default animation, it must call the
         *            endCallback function when it finishes its own animation handling and any
         *            custom animation has ended.
         *            
         * @example <caption>Bind an event listener to the
         *          <code class="prettyprint">onOjAnimateStart</code> property to override the default
         *          "open" animation:</caption>
         * myMenu.onOjAnimateStart = function( event )
         *   {
         *     // verify that the component firing the event is a component of interest and action
         *      is open
         *     if (event.detail.action == "open") {
         *       event.preventDefault();
         *       oj.AnimationUtils.fadeIn(event.detail.element).then(event.detail.endCallback);
         *   };
         *   
         * @example <caption>Bind an event listener to the
         *          <code class="prettyprint">onOjAnimateStart</code> property to override the default
         *          "close" animation:</caption>
         * myMenu.onOjAnimateStart = function( event )
         *   {
         *     // verify that the component firing the event is a component of interest and action
         *      is close
         *     if (event.detail.action == "close") {
         *       event.preventDefault();
         *       oj.AnimationUtils.fadeOut(event.detail.element).then(event.detail.endCallback);
         *   };
         */
        animateStart : null,

        /**
         * Triggered when a default animation has ended, such as when the component is being
         * opened/closed or a child item is being added/removed. This event is not triggered if
         * the application has called preventDefault on the animateStart
         * event.
         *
         * @expose
         * @event
         * @memberof oj.ojMenu
         * @instance
         * @property {Event} event a custom event
         * @property {Object} event.detail an object containing component specific event info
         * @property {Element} event.detail.element target of animation
         * @property {string} event.detail.action The action that is starting the animation.
         *                   The number of actions can vary from component to component.
         *                   Suggested values are:
         *                    <ul>
         *                      <li>"open" - when a menu component is opened</li>
         *                      <li>"close" - when a menu component is closed</li>
         *                    </ul>
         * 
         * @example <caption>Bind an event listener to the
         *          <code class="prettyprint">onOjAnimateEnd</code> property to listen for the "open"
         *          ending animation:</caption>
         * myMenu.onOjAnimateEnd = function( event )
         *   {
         *     // verify that the component firing the event is a component of interest and action
         *      is open
         *     if (event.detail.action == "open") {}
         *   };
         * 
         * @example <caption>Bind an event listener to the
         *          <code class="prettyprint">onOjAnimateEnd</code> property to listen for the "close"
         *          ending animation:</caption>
         * myMenu.onOjAnimateEnd = function( event )
         *   {
         *     // verify that the component firing the event is a component of interest and action
         *      is close
         *     if (event.detail.action == "close") {}
         *   };
         */
        animateEnd : null,

        // Benefit of making openOptions live is this:
        //
        // - For MenuButton and ContextMenu, the app doesn't control the call to Menu.open().
        // - Our internal call to this method may pass in overrides to things like "initialFocus", in cases where the Right Thing for (say) MenuButtons differs
        //   from Menu's default option value (which may be tailored to, say, contextMenus).
        //     - This way, we don't have to rely on the app to set these things correctly, and we don't have to permanently set the Menu's options, which may be
        //       shared between (say) a MenuButton, a ContextMenu, and some custom app usage of the menu.
        // - The remaining piece of the puzzle is to give the app a way to override the values set in our internal call to open().  A live payload field handles this.
        //
        // If ever needed, we can add a "submenuOpenOptions" payload field alongside the "openOptions" field.
        /**
         * <p>Triggered before this menu is launched via the <a href="#open">open</a> method or via menu button or context menu functionality.
         * The launch can be cancelled by calling <code class="prettyprint">event.preventDefault()</code>.
         *
         * <p>The <code class="prettyprint">ui.openOptions</code> payload field contains the settings being used for this menu launch,
         * resulting from merging the <code class="prettyprint">openOptions</code> passed to <code class="prettyprint">open()</code>, if any,
         * with the <code class="prettyprint">openOptions</code> component option.
         *
         * <p>This field is "live", meaning that the listener can alter fields such as <code class="prettyprint">position</code> to affect this launch without
         * affecting the component option.  Since these changes are applied to the merged object, they supersede both the <code class="prettyprint">openOptions</code>
         * passed to <code class="prettyprint">open()</code> and the <code class="prettyprint">openOptions</code> component option.
         *
         * <p>If any of the above techniques are used to alter the built-in [menu button]{@link oj.ojButton#menu} or [context menu]{@link oj.baseComponent#contextMenu}
         * functionality, it is the app's responsibility to ensure that the result is both correct and accessible.
         *
         * @expose
         * @event
         * @memberof oj.ojMenu
         * @instance
         * @property {Event} event a custom event
         * @property {Object} event.detail an object containing component specific event info
         * @property {Object} event.detail.openOptions Settings in use for this menu launch.
         */
        beforeOpen: null,

        /**
         * <p>Triggered after this menu is closed.
         *
         * @expose
         * @event
         * @memberof oj.ojMenu
         * @instance
         * @since 2.0.0
         * @property {Event} event a custom event
         */
        close: null,

        /**
         * Triggered when the menu is created.
         *
         * @event
         * @name create
         * @memberof oj.ojMenu
         * @instance
         * @ignore
         * @property {Event} event <code class="prettyprint">jQuery</code> event object
         * @property {Object} ui Currently empty
         */
        // create event declared in superclass, but we still want the above API doc

        /**
         * <p>Triggered when the active menu item changes.  Private; do not use.
         *
         * <p>Internal notes:
         *
         * <p>We've replaced JQUI's focus/blur events with this internal event, and made their focus/blur methods internal.
         * It's been agreed with the architects that if we ever need any of this API
         * to be public, we'll have a focusedItem option, read-only or R/W, with an optionChange event, instead
         * of the removed API.  (Exact name TBD, but they favored focusedRow, with "ed",  for Table if it had an option rather than
         * a method.)  If for some reason we keep a separate event instead of an optionChange event, do NOT call this event
         * "focusedItem", since that will prevent ever having an "focusedItem" option since same namespace.  Instead, call this
         * "focusedItemChange" in that case.
         *
         * <p>In the meantime, we'll keep firing this private event, since it's used so extensively and usefully in the unit tests to make sure
         * other stuff works, and since keeping this working and tested means that we can just change the name to optionChange if
         * we ever need the public event.
         *
         * <p>The difference between this method and JQUI's focus event is that it fires for blurs too, it doesn't fire if the old
         * and new active item are the same, and we fire a single event, not both a blur and focus, when the active state moves from item A to
         * item B.
         *
         * @event
         * @name _activeItem
         * @memberof oj.ojMenu
         * @instance
         * @private
         * @property {Event} event <code class="prettyprint">jQuery</code> event object
         * @property {Object} ui Parameters
         * @property {jQuery} ui.previousItem the previously focused menu item
         * @property {jQuery} ui.item the currently focused menu item
         *
         * @example <caption>Initialize the menu with the <code class="prettyprint">_activeItem</code> callback specified:</caption>
         * $( ".selector" ).ojMenu({
         *     "_activeItem": function( event, ui ) {}
         * });
         *
         * @example <caption>Bind an event listener to the <code class="prettyprint">oj_activeitem</code> event:</caption>
         * // $( ".selector" ) must select either the menu root, or the document, due to reparenting
         * $( ".selector" ).on( "oj_activeitem", function( event, ui ) {} );
         */

        /**
         * <p>Triggered after this menu is launched via the <a href="#open">open</a> method or via menu button or context menu functionality.
         *
         * @expose
         * @event
         * @memberof oj.ojMenu
         * @instance
         * @since 2.0.0
         * @property {Event} event a custom event
         */
        open: null,

        /**
         * <p>Triggered when a menu item (other than the built-in <a href="#dismissal-section">"Cancel"</a> item) is selected.
         *
         * <p>To ensure keyboard accessibility, the only correct, supported way to react to the selection of a menu item is to listen
         * for this event.  Click listeners and <code class="prettyprint">href</code> navigation should not be used.
         *
         * @expose
         * @event
         * @memberof oj.ojMenu
         * @instance
         * @property {Event} event a custom event
         * @property {Object} event.detail an object containing component specific event info
         */
        action: null
    },

    _ComponentCreate: function() { // Override of protected base class method.  Method name needn't be quoted since is in externs.js.
        this._super();
        var self = this;

        // Create aliases, that won't be renamed, for the private methods that are called by unit tests.  These unit tests come
        // from JQUI, in which these methods were actually public.  With these aliases, we don't have to @expose private method names
        // (which prevents renaming and bloats minified code), and our internal calls to these methods can be this._focus rather than this["_focus"].
        // TBD: perhaps the unit tests could simulate keyboard events rather than calling these methods.
        this["_focusForTesting"] = this._focus;
        this["_nextForTesting"] = this._next;
        this["_selectForTesting"] = this._select;

        this.activeMenu = this.element;

        // flag used to prevent firing of the click handler as the event bubbles up through nested menus
        this.mouseHandled = false;

        // Cancel menu item is supported for custom elements, so we only need the following check for the old syntax
        if (!this._IsCustomElement())
        {
            // Cancel menu item supported only for <ul>-based menus, since it's a new feature introduced after the
            // deprecation of non-<ul> menus.  Per arch. discussion, throw in this case rather than just turning off cancel item.
            if (_SHEETS_HAVE_CANCEL_ITEM && this.element[0].tagName.toLowerCase() !== "ul")
                throw new Error("Cancel item supported for <ul> menus only.");
            
            // TODO: When support for non-<ul> menus is pulled after the deprecation period, replace the above check with this one:
//          if (this.element[0].tagName.toLowerCase() !== "ul")
//              throw new Error("Menu must be based on a <ul> element.");
        }

        this._setupSwipeBehavior();

        this.element
            .uniqueId()
            .addClass( "oj-menu oj-component" )
            .hide()
            .attr({
                "role": this.role,
                "tabIndex": "0"
            });

        // pass true to catch these events on all menus, not just enabled menus
        this._on(true, {
            //Required to stick the focus on disabled menu.
            "mousedown .oj-menu-item": function(event) {
                if (this.options.disabled) {
                    event.preventDefault();
                }
            },
            "click": function(event) {
                if (this.options.disabled) {
                    event.preventDefault();
                }
            },
            //On Esc key focus should be shifted to launcher and dismiss menu.
            //the TAB key should also implicitly dismiss the menu
            "keydown": function(event) {
                if (this.options.disabled) {
                    if (event.keyCode === $.ui.keyCode.ESCAPE || event.keyCode === $.ui.keyCode.TAB) {

                        if (event.keyCode === $.ui.keyCode.TAB) {
                          event.preventDefault();
                        }

                        if (this._launcher) { // if menu is currently open
                            this._focusLauncherAndDismiss(event);
                        }
                    }
                }
            }
        });

        // needed since _setOption() is not automatically called at create time.
        // TBD: Would be a little better to toggle these 2 things rather than only setting them if true, as in superclass _setOption().
        if ( this.options.disabled ) {
            this.element
                .addClass( "oj-disabled" )
                .attr( "aria-disabled", "true" );
        }

        var handleMouseEnterMenuItem = function( event ) {
            // the focusHandled var ensures that this handler only runs for the target
            // menu item, not for the parent menu items to which the event bubbles. Without it, submenu item becomes
            // non-selectable if mouse outside menu on way from parent item to sub (), and flakiness
            // where sometimes a tap on a menu item inside the submenu doesn't "take" in touch scenarios.
            if ( this.focusHandled )
                return;
            this.focusHandled = true;

            var target = $( event.currentTarget );

            try {
                this._focusIsFromPointer = true;
                this._focus( event, target );
            } finally {
                this._focusIsFromPointer = false;
            }
        }.bind(this);

        var handleMouseLeave = function( event ) {
            // Only handle mouseleave if the mouse is leaving the menu, not if
            // the menu is disappearing out from under the mouse.  The latter
            // happens when the mouse is over a submenu, and the submenu is closed
            // via the keyboard (e.g. leftArrow, Esc).  If the callee is called at
            // that time, then a timer clears this.active, which breaks KB nav.
            if (event && event.target && !$(event.target).is(":visible"))
                return;
            this._collapse( event, "eventSubtree" );
        }.bind(this);

        this._on({
            // Prevent focus from sticking to links inside menu after clicking
            // them (focus should always stay on UL during navigation).
            "mousedown .oj-menu-item > a": function( event ) {
                event.preventDefault();
            },
            "click .oj-disabled > a": function( event ) {
                event.preventDefault();
            },
            "click": function(event) {
                // when the click event bubbles out of the root menu element, we're done with it, so
                // reset this flag to its initial value of false in preparation for the next click
                this.mouseHandled = false;
            },
            "touchstart": function(event) {
                // when the touchstart event bubbles out of the root menu element, we're done with it, so
                // reset this flag to its initial value of false in preparation for the next touch
                this.focusHandled = false;
            },
            "mouseover": function(event) {
                // when the mouseover event bubbles out of the root menu element, we're done with it, so
                // reset this flag to its initial value of false in preparation for the next mouse hover.
                // Note that this flag is reset in mouseover event and not in a mouseenter event; mouseover
                // bubbles to the root element, but mouseenter does not.
                this.focusHandled = false;
            },
            "click .oj-menu-item:has(a)": function( event ) {
                var target = $( event.target ).closest( ".oj-menu-item" );
                // the mouseHandled var ensures that the click is handled only for the originally clicked
                // menu item, not for the parent menu items to which it bubbles.
                if ( !this.mouseHandled && target.not( ".oj-disabled" ).length ) {
                    this.mouseHandled = true;

                    // prevent page scrolling and appending # to page URL, which can interfere with routing, etc.
                    // Do this before the bailout so these things are prevented when user clicks a 2nd time on parent menu item.
                    // No need to additionally do this for Enter/Space handler, because menu root, not the anchor, has browser focus
                    // in that case, so anchor click behavior doesn't happen, so doesn't need to be prevented.
                    event.preventDefault();

                    if (this.active && this.active.closest(target).length && this.active.get(0) != target.get(0)) {
                        //If current active menu item  is decendent of (and not equal to) target menu item then
                        //sub menu of the curent target is already open and hence no need to
                        //1. expand the sub menu
                        //2. as current target is a menu item having sub menu no need to invoke this._select(event).
                        return;
                    }
                    // Open submenu on click
                    if ( target.has( ".oj-menu" ).length ) {
                        this._expand( event );
                    }
                    else {
                        //Invoke _select() only for leaf menu items
                        this._select(event);
                        if (!this.element.is(":focus")) {
                            // Redirect focus to the menu
                            this.element.trigger("focus", [true]);

                            // If the active item is on the top level, let it stay active.
                            // Otherwise, blur the active item since it is no longer visible.
                            if (this.active && this.active.parents(".oj-menu").length === 1) {
                                this._clearTimer && this._clearTimer();
                            }
                        }
                    }
                }
            },
            "mouseenter .oj-menu-item": handleMouseEnterMenuItem,

            // : Bad touch device behavior because the JQUI code relies on the above mouseenter handler to call _focus(),
            // but for parent menu items on touch devices, mouseenter is called only if the previous tap was somewhere outside the
            // parent menu item, not if it was in the submenu.  So call that mouseenter handler on touchstart:
            "touchstart .oj-menu-item": handleMouseEnterMenuItem,

            "mouseleave": handleMouseLeave,
            "mouseleave .oj-menu": handleMouseLeave,
            "focus": function( event, keepActiveItem ) {
                if ( !keepActiveItem ) {
                    // If there's already an active item, keep it active
                    // If not, make the first item active
                    // TBD: is there a reason that JQUI needed to redundantly call _focus() on this.active when this.active was already set?
                    //      Or should we only call it when it's not set and we're calling it on the first menu item?
                    var item = this.active || this.element.children( ".oj-menu-item" ).eq( 0 );
                    this._focus( event, item );
                }
            },
            "keydown": this._keydown,
            "keyup": function( event ) {
                if (event.keyCode == $.ui.keyCode.ENTER || event.keyCode == $.ui.keyCode.SPACE)
                    this.__spaceEnterDownInMenu = false;
            }
        });

        this._focusable({
            // suppress focus ring for Mac Safari due to platform repainting bug in which previous item's outline is not fully erased
            'applyHighlight': !_IS_MAC_SAFARI,
            'recentPointer' : function() {
                return self._focusIsFromPointer;
            },
            'setupHandlers': function( focusInHandler, focusOutHandler) {
                self._focusInHandler = focusInHandler;
                self._focusOutHandler = focusOutHandler;
            }
        });

        // callback that overrides the positon['using'] for auto dismissal when aligning element is cropped.
        this._usingCallback = $.proxy(this._usingHandler, this);
        this._setup();
    },

    // Resolves a Mobile Safari issue that occurs because mousedown fires after the touchend.
    // To be called only by baseComponent's contextMenu logic, which explains the issue more fully.
    // Gets/sets a static var, since the listener that needs to know whether to bail out is static
    // (shared by all menu instances).
    __contextMenuPressHoldJustEnded: function(val) {
        if (arguments.length)
            _contextMenuPressHoldJustEnded = val;
        else
            return _contextMenuPressHoldJustEnded;
    },
    
    _processOjOptions: function() {
        var self = this;
        
        self._maxEndIconCount = 0;
        self._maxStartIconCount = 0;
        self._startIconWidth = 0;
        self._endIconWidth = 0;
        
        var ojOptions = this.element.find("oj-option");
        $.each(ojOptions, function(i, option) {
            option["customOptionRenderer"] = self._customOptionRenderer.bind(self);
        });
    },
    
    _customOptionRenderer: function(option) {
        // Implement custom rendering here...
        var ojOption = $(option);
        var self = this;
        
        // check for disabled state in case all we need to do is update disabled attribute
        if (option['disabled'] == true)
            ojOption.addClass('oj-disabled')
        else if (option['disabled'] == false)
            ojOption.removeClass('oj-disabled')
        
        // test to see if this is a divider
        if (ojOption.is(":not(.oj-menu-item)") && !/[^\-\u2014\u2013\s]/.test( ojOption.text() )) // hyphen, em dash, en dash
            return;
        
        var a = ojOption.children("a");
        if (a.length > 0)
            return;
        
        a = document.createElement('a');
        a.setAttribute('href', '#');
        ojOption.prepend(a); // @HTMLUpdateOK append trusted new DOM to menu item
        
        var supportedSlots = ["startIcon", "", "endIcon"];
        var slots = oj.CustomElementBridge.getSlotMap(option);

        // reparent the slots, and make sure any necessary styling is applied
        $.each(supportedSlots, function(i, slotName) {
            if (slots[slotName]) {
                if (slotName === "")
                {
                    $.each(slots[slotName], function(j, node) {
                        $(a).append(node); // @HTMLUpdateOK reparent trusted child DOM in menu item
                    })
                }
                else if (slotName === "startIcon")
                {
                    var startIconCount = slots[slotName].length;
                    self._maxStartIconCount = Math.max(self._maxStartIconCount, startIconCount);
                    
                    $.each(slots[slotName], function(j, node) {
                        $(node).addClass('oj-menu-item-icon');
                        $(a).append(node); // @HTMLUpdateOK reparent trusted child DOM in menu item
                        
                        // positioning logic doesn't need to run if there is only 1 start icon
                        if (startIconCount > 1)
                            self._positionStartIcon(node, j, startIconCount);
                    })
                }
                else if (slotName === "endIcon")
                {
                    var endIconCount = slots[slotName].length;
                    self._maxEndIconCount = Math.max(self._maxEndIconCount, endIconCount);
                    
                    $.each(slots[slotName], function(j, node) {
                        $(node).addClass('oj-menu-item-end-icon');
                        $(a).append(node); // @HTMLUpdateOK reparent trusted child DOM in menu item
                        
                        // positioning logic doesn't need to run if there is only 1 end icon
                        if (endIconCount > 1)
                            self._positionEndIcon(node, j, endIconCount);
                    })
                }
            }
        });
    },
    
    // Helper method to position start icons
    _positionStartIcon: function(node, index, count) {
        if (this.isRtl)
            var marginProperty = 'margin-right';
        else
            marginProperty = 'margin-left';
        
        var margin = parseInt($(node).css( marginProperty ), 10);
        // margins are negative for start icons
        this._startIconWidth = -1 * margin;
        $(node).css( marginProperty, margin * (count - index) + 'px' );
    },
    
    // Helper method to position end icons
    _positionEndIcon: function(node, index, count) {
        if (this.isRtl)
        {
            var marginProperty = 'margin-left';
            var widthProperty = 'margin-right';
        }
        else
        {
            marginProperty = 'margin-right';
            widthProperty = 'margin-left';
        }
        
        var margin = parseInt($(node).css( marginProperty ), 10);
        // margins are negative for end icons
        this._endIconWidth = -1 * parseInt($(node).css( widthProperty ), 10);
        $(node).css( marginProperty, (margin + this._endIconWidth * (count - index - 1)) + 'px' );
    },
    
    // Helper method to apply icon padding to menu item anchors
    _applyAnchorIconPadding: function(anchors, iconWidth, count, isStart) {
        if ((this.isRtl && isStart) || (!this.isRtl && !isStart))
            var paddingProperty = 'padding-right';
        else
            paddingProperty = 'padding-left';
        
        anchors.each(function() {
            var padding = parseInt($(this).css( paddingProperty ), 10);
            $(this).css( paddingProperty, (padding + iconWidth * (count - 1)) + 'px' );
        })
    },
    
   /**
    * @instance
    * @private
    * @param {!jQuery.Event|Event} event
    */
    _clickAwayHandler: function(event) {
                //Focus event needs to be captured because, in case of menu button (where focus is still on menu button instead of open menu), if user does
                //a taboff to another element then menu should be closed. With this we also no need to have additional "blur" handler on menu to close the menu/submenus.

                //Despite of focus/mousedown, still keydown listener is required for contextmenu events especially for menubutton with browser default context menu
                //and user pressed contextmenu keyboard key(not right mouse click).

                //Checking event.KeyCode along with event.which as currently event created by jquery-simulate.js is setting only event.keyCode for chrome/IE.
                //This avoids test failures. This can be removed after jquery simulates event properly.

                if (event.type === "focus" || event.type === "mousedown" || event.type === "touchstart" || event.which == 93 || (event.which == 121 && event.shiftKey) || event.keyCode == 93) { // Windows contextMenu key (93) or Shift-F10 (121)
                    // Resolves a Mobile Safari issue that occurs because mousedown fires after the touchend.
                    // baseComponent's contextMenu logic explains the issue more fully.
                    if (event.type === "mousedown" && _contextMenuPressHoldJustEnded) {
                        return;
                    }

                    var self = this;
                    
                    //Clone _openPopupMenus as __dismiss() will remove the open menu from _openPopupMenus list
                    var openPopupMenus = _openPopupMenus.slice(0, _openPopupMenus.length);
                    $.each(openPopupMenus , function(index, menu) {
                        // This logic dismisses/collapses the menu if event is outside the menu and any of the following are true:
                        // - Event is a touchstart (which may or may not become a pressHold) or left/middle mousedown, unless (event is in launcher and this is not a context menu).  "Unless" clause needed for menuButton.
                        // - Event is focusing something outside of both the menu and launcher.
                        // - Event is a context-menu-launching event other than pressHold.  (i.e. right-click or CM keys)
                        if (!$(event.target).closest(menu.element).length &&  // if event target is outside of menu element AND one of the following is true then close the menu.
                            (event.type === "keydown" || (event.type === "mousedown" && event.which === 3) ||  // 1. if it's a context-menu-launching event other than pressHold (see event.which on outer if)
                             !$(event.target).closest(menu._launcher).length ||  // 2. When focus is moved on to other than launcher or left/middle mousedown or touchstart on element other than launcher
                             (menu._launcherClickShouldDismiss && ((event.type === "mousedown" && event.which !== 3) || event.type === "touchstart" ))))  // 3. If event is a (left/middle-mousedown or touchstart) on launcher and current menu is contextmenu (see )
                        {
                          // Don't do it again if the menu is already being dismissed
                          if (!menu._dismissEvent)
                          {
                            menu._dismissEvent = event;

                            var promise = menu._collapse(event, "eventSubtree"); // "eventSubtree" is effectively "all" since we check that event is outside menu.  "all" would be clearer, but just in case, leaving it as is.

                            // Wait for subtree to be collapsed before dismissing self.
                            // There is no default close animation, but this allows app to define
                            // cascading close animation if it wants to.
                            self._runOnPromise(promise, function() {
                              // The menu could have been opened by a different launcher by
                              // the time its submenus finish collapsing, so double-check if we 
                              // still need to dismiss it.
                              if (menu._dismissEvent)
                              {
                                if (menu._launcher)
                                  menu.__dismiss(event);
                                
                                menu._dismissEvent = null;
                              }
                            });
                          }
                        }
                    });
                };
    },


    _setOption: function( key, value ) { // Override of protected base class method.  Method name needn't be quoted since is in externs.js.
        this._superApply( arguments ); // TBD: consider calling super at end, so that optionChange (fired at end of super) is fired at very end

        switch (key) {
            case "translations.labelCancel":
            case "translations":
                // no refresh() needed to just change text of existing inited menu item
                this._cancelAnchor && this._cancelAnchor.text(this.options['translations']['labelCancel']);
                break;
        }
    },

    _destroy: function() { // Override of protected base class method.  Method name needn't be quoted since is in externs.js.
        if (this.element.is(":visible"))
            this.__dismiss();

        this._setWhenReady("none");

        this._clearTimer && this._clearTimer();
        delete this._clearTimer;

        // Destroy (sub)menus
        this.element
            .removeAttr( "aria-activedescendant" )
            .removeClass( "oj-component" )
            .find( ".oj-menu" ).addBack()
                .removeClass( "oj-menu oj-menu-submenu oj-menu-icons oj-menu-end-icons oj-menu-text-only" )
                .removeAttr( "role" )
                .removeAttr( "tabIndex" )
                .removeAttr( "aria-labelledby" )
                .removeAttr( "aria-hidden" )
                .removeAttr( "aria-disabled" )
                .removeUniqueId()
                .show();

        // Destroy menu items
        this.element.find( ".oj-menu-item" )
            .removeClass( "oj-menu-item" )
            .removeAttr( "role" )
            .children( "a" )
                .removeAttr( "aria-disabled" )
                .removeUniqueId()
                .removeClass( "oj-hover" )
                .removeAttr( "tabIndex" )
                .removeAttr( "role" )
                .removeAttr( "aria-haspopup" )
                .children().each( function() {
                    var elem = $( this );
                    if ( elem.data( "oj-ojMenu-submenu-icon" ) ) {
                        elem.remove();
                    }
                });

        // Destroy anchors
        this.element.find( "a" ).removeAttr( "aria-expanded" );

        // Destroy menu dividers
        this.element.find( ".oj-menu-divider" )
            .removeClass( "oj-menu-divider" )
            .removeAttr( "role" );

        // Remove the menu from openPopupMenus list if it is still added.
        if(_openPopupMenus.indexOf(this) >= 0)
            _openPopupMenus.splice(_openPopupMenus.indexOf(this),1);

        delete this._popupServiceEvents;
        delete this._usingCallback;

        var clearCloseDelayTimer = this._clearCloseDelayTimer;
        delete this._clearCloseDelayTimer;
        clearCloseDelayTimer && clearCloseDelayTimer();

        this._cancelDom && this._cancelDom.remove();
        this.element.ojHammer("destroy");

        this._super();
    },

    _keydown: function( event ) { // Private, not an override (not in base class).  Method name unquoted so will be safely optimized (renamed) by GCC as desired.
        /*jshint maxcomplexity:20*/
        var match, prev, character, skip, regex,
            preventDefault = true;

        function escape( value ) {
            return value.replace( /[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&" );
        }

        switch ( event.keyCode ) {
        case $.ui.keyCode.HOME:
            this._move( "first", "first", event );
            break;
        case $.ui.keyCode.END:
            this._move( "last", "last", event );
            break;
        case $.ui.keyCode.UP:
            this._previous( event );
            break;
        case $.ui.keyCode.DOWN:
            this._next( event );
            break;
        case $.ui.keyCode.LEFT:
        case $.ui.keyCode.RIGHT:
            var isExpand = (event.keyCode === $.ui.keyCode.RIGHT) ^ this.isRtl;
            if (isExpand) {
                if ( this.active && !this.active.is( ".oj-disabled" ) ) {
                    this._expand( event );
                }
            } else {
                this._collapse( event, "active" );
            }
            break;
        case $.ui.keyCode.ENTER:
        case $.ui.keyCode.SPACE:
            this._handleEnterSpace( event );

            this.__spaceEnterDownInMenu = true;
            var self = this;

            // The spaceEnterDelay and __spaceEnterDownInMenu code addresses an issue where closing a menu, from within the menu via
            // Space or Enter, can immediately reopen the menu, because the keyUp can happen after focus has jumped to the button,
            // which clicks the button, which reopens the menu.  Repros most readily (only??) in Firefox.
            // TODO: try calling preventDefault() on the event in Menu (which is good practice anyway since it's handling the event), and
            // checking isDefaultPrevented() in Button.  If works, should be cleaner / more reliable than this existing fix.
            var spaceEnterDelay = 100; // 1 not enough in FF; 100 seems to do it.  If continued problems, try increasing this value.

            setTimeout(function () {
                self.__spaceEnterDownInMenu = false;
            }, spaceEnterDelay);

            break;
        // tab within a menu will implicitly dismiss
        case $.ui.keyCode.TAB:
          event.preventDefault();
          if (this._launcher) {
            this._focusLauncherAndDismiss( event );
          }
          break;
        // this handles enabled menus.  For disabled menus, see this handler: this._on(true, {...});
        case $.ui.keyCode.ESCAPE:
            if (this._launcher) { // if menu is currently open
                var activeItemId = this.element.attr("aria-activedescendant"); // <a> or nothing.  Always the same as this.active now that we change them in lockstep.
                var topLevelAnchorSelector = "#" + this.element.attr("id") + ">*>a"; // * is typically <li>
                var submenuOpen = activeItemId && !$("#" + activeItemId).is( topLevelAnchorSelector );

                if (submenuOpen)
                    this._collapse( event, "active" );
                else
                    this._focusLauncherAndDismiss( event );
            } else {
                this._collapse( event, "active" );
            }
            break;
        default:
            preventDefault = false;
            prev = this.previousFilter || "";
            character = String.fromCharCode( event.keyCode );
            skip = false;

            clearTimeout( this.filterTimer );

            if ( character === prev ) {
                skip = true;
            } else {
                character = prev + character;
            }

            regex = new RegExp( "^" + escape( character ), "i" );
            match = this.activeMenu.children( ".oj-menu-item" ).filter(function() {
                return regex.test( $( this ).children( "a" ).text() );
            });
            match = skip && match.index( this.active.next() ) !== -1 ?
                this.active.nextAll( ".oj-menu-item" ) :
                match;

            // If no matches on the current filter, reset to the last character pressed
            // to move down the menu to the first item that starts with that character
            if ( !match.length ) {
                character = String.fromCharCode( event.keyCode );
                regex = new RegExp( "^" + escape( character ), "i" );
                match = this.activeMenu.children( ".oj-menu-item" ).filter(function() {
                    return regex.test( $( this ).children( "a" ).text() );
                });
            }

            if ( match.length ) {
                this._focus( event, match );
                if ( match.length > 1 ) {
                    this.previousFilter = character;
                    this.filterTimer = setTimeout(function() {
                        delete this.previousFilter;
                    }.bind(this), 1000 );
                } else {
                    delete this.previousFilter;
                }
            } else {
                delete this.previousFilter;
            }
        }

        if ( preventDefault ) {
            event.preventDefault();
        }
    },

    /*
     * Called for Space and Enter
     */
    _handleEnterSpace: function( event ) { // Private, not an override (not in base class).  Method name unquoted so will be safely optimized (renamed) by GCC as desired.
        if ( this.active && !this.active.is( ".oj-disabled" ) ) {
            if ( this.active.children( "a[aria-haspopup='true']" ).length ) {
                this._expand( event );
            } else {
                this._select( event );
            }
        }
    },

    /**
     * Refreshes the visual state of the menu. JET components require a <code class="prettyprint">refresh()</code> after the DOM is
     * programmatically changed underneath the component.  For Menu, this includes:
     *
     * <ul>
     *   <li>After menu items are added or removed.</li>
     *   <li>After a change to a menu item's disabled status.
     *   <li>After the reading direction (LTR vs. RTL) changes.</li>
     * </ul>
     *
     * @expose
     * @memberof oj.ojMenu
     * @instance
     *
     * @example <caption>Invoke the <code class="prettyprint">refresh</code> method:</caption>
     * myMenu.refresh();
     */
    refresh: function() { // Override of public base class method (unlike JQUI).  Method name needn't be quoted since is in externs.js.
        this._super();
        this._setup();


        var element = this.element;
        if (!element.is(":visible"))
          return;

        // reevaluate open menu positions
        var position = element.data(_POSITION_DATA);

        // Avoid repositioning it if the position.of element has gone missing, e.g. due to
        // a responsive layout change.  (Per architects, we don't want to do anything fancier
        // for this case.)  Per JQUI doc, position.of accepts Selector, Element, jQuery, or Event.
        // If it's window or event, we're happy.  Else, is Selector, Element, or jQuery, all of
        // which are accepted by $().
        if (!(position && (position.of instanceof $.Event || position.of instanceof Window || $(position.of).is(":visible"))))
          return;

        element.position(position);

        // Do the same for open submenus.  Don't bother with the position.of check this time, since
        // their position.of is essentially always the parent menu, not some other thing on the page.
        var subMenus = element.find(".oj-menu");
        subMenus.each(function()
        {
            var menu = $(this);
            if (menu.is(":visible"))
            {
              position = menu.data(_POSITION_DATA);
              if (position)
                menu['position'](position);
            }
        });
    },

    _setup: function() { // Private, not an override (not in base class).  Method name unquoted so will be safely optimized (renamed) by GCC as desired.
        this.isRtl = this._GetReadingDirection() === "rtl";

        var self=this;
        
        if (!this._IsCustomElement())
            var submenus = this.element.find( this.options.menuSelector ); // <ul>'s except root <ul>
        else
        {
            self._processOjOptions();
            // comment this out for now as we are not including submenus for 4.0
            submenus = $([]); //this.element.find( 'oj-menu' ); // <oj-menu> tags
        }
        
        var menus = submenus.add( this.element ),                      // <ul>'s including root <ul>
            children = menus.children();                               // <li>'s in root menu and submenus

        this._hasSubmenus = !!submenus.length;

        // Anything that used to be a divider, but now has an "a", should become a menu element.
        children.filter( ".oj-menu-divider" ).has("a")
            .removeClass("oj-menu-divider oj-menu-item") // remove oj-menu-item if somehow present to ensure that it enters following block
            .removeAttr("role");

        // Don't refresh list items that are already adapted
        // TBD: .has prob has better perf than :has
        var uninitedItems = children.filter( ":not(.oj-menu-item):has(a)" );
        var uninitedAnchors = uninitedItems.children( "a" );

        this._initMenuItems(uninitedItems);
        this._initAnchors(uninitedAnchors);

        var dividers = children.filter(function(index, item) {
            // menu items without anchors containing spaces and/or dashes only
            // this test relies on the fact that _initMenuItems() has already been called
            var $item = $(item);
            return $item.is(":not(.oj-menu-item)")
                && !/[^\-\u2014\u2013\s]/.test( $item.text() ); // hyphen, em dash, en dash
        });
        this._initDividers(dividers);

        // ensure "before/after-divider" classes are applied iff appropriate
        this._initDividerNeighbors(children, dividers);

        // Add aria-disabled to any disabled menu item, and remove it from any recently enabled menu item
        children.filter( ".oj-disabled" ).children( "a" ).attr( "aria-disabled", "true" );
        children.filter( ":not(.oj-disabled)" ).children( "a" ).removeAttr( "aria-disabled" );

        // Initialize nested menus
        submenus.filter( ":not(.oj-menu)" )
            .addClass( "oj-menu oj-menu-submenu oj-menu-dropdown" ) // submenus are always dropdown
            .hide()
            .attr({
                "role": this.role,
                "aria-hidden": "true"
            })
            .each(function() {
                var menu = $( this ), // <ul>
                    item = self._getSubmenuAnchor( menu ), // <a>
                    submenuIcon = $( "<span>" );

                submenuIcon   // separate stmt rather than chaining, since GCC can't tell that this is the setter overload of .data().
                    .addClass( "oj-menu-submenu-icon oj-component-icon" )
                    .data( "oj-ojMenu-submenu-icon", true ); // TODO: can't we just look for the class at destroy time rather than adding this data?

                item
                    .attr( "aria-haspopup", "true" )
                    .attr( "aria-expanded", "false" ) // per a11y team, live on <a>, not <ul> like JQUI
                    .append( submenuIcon ); // @HTMLUpdateOK append trusted new DOM to menu item

                // id always exists due to uniqueId() call above
                var itemId = /** @type {string|undefined}  tell GCC is getter, not setter, overload of attr() */
                             (item.attr( "id" ));
                menu.attr( "aria-labelledby", itemId );
            });

        menus.each(function() {
            // For each menu incl. submenus, apply either "oj-menu-icons" or "oj-menu-text-only" to that menu, depending on whether that menu
            // (excluding its submenus) contains at least one menu item having an icon.
            // This facilitates leaving space for a "column" of icons iff at least one icon is present, and doing so for each menu/submenu independently.
            // We exclude the cancel item's icon from the count, as that icon is always present if the cancel item is, but it's themed to show up iff
            // oj-menu-icons is present, i.e. iff at least one other icon is present.
            var menu = $( this ); // <ul>
            var anchors = menu.children()  // <li>s
                              .children(); // <a>s
            var iconCount = anchors.children(".oj-menu-item-icon:not(.oj-menu-cancel-icon)").length; // icons other than cancel item's icon
            menu.toggleClass( "oj-menu-icons", !!iconCount )
                .toggleClass( "oj-menu-text-only", !iconCount );
        
            if (self._maxStartIconCount && self._maxStartIconCount > 1)
                self._applyAnchorIconPadding(anchors, self._startIconWidth, self._maxStartIconCount, true);
            
            var endIconCount = anchors.children(".oj-menu-item-end-icon").length;
            menu.toggleClass( "oj-menu-end-icons", !!endIconCount );
            
            if (self._maxEndIconCount && self._maxEndIconCount > 1)
                self._applyAnchorIconPadding(anchors, self._endIconWidth, self._maxEndIconCount, false);
        });

        // If the active item has been removed, blur the menu
        if ( this.active && !$.contains( this.element[ 0 ], this.active[ 0 ] ) ) {
            this._blur();
        }
    },

    /**
     * @private
     * @param {jQuery} items - non-divider <li>'s that haven't already been inited.
     */
    _initMenuItems: function(items) { // Private, not an override (not in base class).  Method name unquoted so will be safely optimized (renamed) by GCC as desired.
        items.addClass( "oj-menu-item" )
             .attr( "role", "presentation" );

    },

    /**
     * @private
     * @param {jQuery} anchors - <a>'s that haven't already been inited.
     */
    _initAnchors: function(anchors) { // Private, not an override (not in base class).  Method name unquoted so will be safely optimized (renamed) by GCC as desired.
        anchors.uniqueId()
               .attr({
                   "tabIndex": "-1",
                   "role": this._itemRole()
               });
    },

    /**
     * @private
     * @param {jQuery} dividers - divider <li>'s.
     */
    _initDividers: function(dividers) { // Private, not an override (not in base class).  Method name unquoted so will be safely optimized (renamed) by GCC as desired.
        dividers.addClass( "oj-menu-divider" )
                .attr( "role", "separator" );
    },

    /**
     * @private
     * @param {jQuery} dividers - divider <li>'s.
     */
    _initDividerNeighbors: function(items, dividers) { // Private, not an override (not in base class).  Method name unquoted so will be safely optimized (renamed) by GCC as desired.
        items.removeClass( "oj-menu-item-before-divider oj-menu-item-after-divider" );
        dividers.prev().addClass( "oj-menu-item-before-divider" );
        dividers.next().addClass( "oj-menu-item-after-divider" );
    },

    /*
     * Given a list of one or more submenus (typically <ul>'s), finds the <a>'s that are their labels.
     */
    _getSubmenuAnchor: function(submenu) { // Private, not an override (not in base class).  Method name unquoted so will be safely optimized (renamed) by GCC as desired.
        return submenu.prev( "a" );
    },

    _itemRole: function() { // Private, not an override (not in base class).  Method name unquoted so will be safely optimized (renamed) by GCC as desired.
        return "menuitem";
//        {
//            "menu": "menuitem",
//            "listbox": "option"
//        }[ this.role ];
    },

    // given a menu item, returns JQ object with any adjacent group dividers and optionally, that item
    _getAdjacentDividers: function( menuItem, includeItem ) { // Private, not an override (not in base class).  Method name unquoted so will be safely optimized (renamed) by GCC as desired.
        var result = menuItem.prev(".oj-menu-divider")
                         .add(menuItem.next(".oj-menu-divider"));

        if (includeItem)
            result = result.add(menuItem);

        return result;
    },

    /**
     * Focuses the specified menu item and triggers the menu's <code class="prettyprint">_activeItem</code> event.
     *
     * @memberof oj.ojMenu
     * @instance
     * @private
     * @param {Event} event - What triggered the menu item to gain focus.  May be <code class="prettyprint">null</code>, but may not be omitted.
     * @param {!jQuery} item - The menu item to focus.  Its containing submenu, if any, must already be expanded. Must not be null or length 0.
     */
    _focus: function( event, item ) { // Private, not an override (not in base class).  Method name unquoted so will be safely optimized (renamed) by GCC as desired.
        // JQUI called blur() here.  This "if blah clear timer" is the only thing from that call that we (presumably) still want to do here.
        if ( !(event && event.type === "focus") )
            this._clearTimer && this._clearTimer();

        item = item.first(); // li.  Length 1.
        this._makeActive(item, event);

        var containingMenu = item.parent(); // ul.  Length-1.  Might be top or submenu.
        var parentMenuItem = containingMenu.closest( ".oj-menu-item" ); // li. Length 0 iff item is in top menu.

        // Remove oj-focus-ancestor class from all menu items and group dividers in the newly focused menu item's menu and submenus of that menu
        containingMenu.find( ".oj-focus-ancestor" ).removeClass( "oj-focus-ancestor" );

        // Highlight active parent menu item, if any, and adjacent group dividers, if any
        this._getAdjacentDividers(parentMenuItem, true).addClass( "oj-focus-ancestor" );

        if ( event && event.type === "keydown" ) {
            this._close();
        } else {
            this._clearTimer = this._setTimer(function() {
                delete this._clearTimer;
                this._close();
            }, this._getSubmenuBusyStateDescription("closing"), this.delay );
        }

        var nested = item.children( ".oj-menu" ); // immediately nested submenu.  length 0 or 1.
        if ( nested.length && event && ( /^mouse/.test( event.type ) && !this.active.hasClass( "oj-disabled" ) ) ) {
            this._startOpening(nested);
        }
        this.activeMenu = item.parent();
    },

    /*
     * Sets this.active (<li>), aria-activedescendant (<a>), and oj-focus (<li> and adjacent group dividers) in lockstep.
     * Never set those things outside of _makeActive() and _removeActive(), so they stay in synch!
     *
     * param item length-1 JQ object containing the <li> to focus
     */
    _makeActive: function( item, event ) { // Private, not an override (not in base class).  Method name unquoted so will be safely optimized (renamed) by GCC as desired.
        // don't need to check for "both items null/empty", and don't need to null-check item, since item required to be length-1 JQ object
        var same = item.is(this.active);
        if (same) {
            return;
        }

        var previousItem = this.active ? this.active : $();
        var anchor = item.children( "a" );

        this.active = item;
        this.element.attr( "aria-activedescendant", anchor.attr( "id" ) );

        this._focusOutHandler(previousItem);
        this._focusInHandler(item);
        this._getAdjacentDividers(previousItem).removeClass( "oj-focus" );
        this._getAdjacentDividers(item).addClass( "oj-focus" );

        // see private API doc on the private _activeItem event declaration in this file
        this._trigger( "_activeItem", event, { "previousItem": previousItem , "item": item, "privateNotice": "The _activeItem event is private.  Do not use." } );
    },

    /*
     * Unsets this.active (<li>), aria-activedescendant (<a>), and oj-focus (<li> and adjacent group dividers) in lockstep.
     * Never set those things outside of _makeActive() and _removeActive(), so they stay in synch!
     *
     * Don't call this if you are immediately going to call _makeActive, to avoid firing the event twice (and redundant work).
     */
    _removeActive: function(event) { // Private, not an override (not in base class).  Method name unquoted so will be safely optimized (renamed) by GCC as desired.
        if ( this.active ) { // then there is definitely a change, from "something focused" to "nothing focused", so proceed.
            var previousItem = this.active; // non-null, so don't need null-check

            this.active = null;
            this.element.removeAttr( "aria-activedescendant");

            this._focusOutHandler(previousItem);
            this._getAdjacentDividers(previousItem).removeClass( "oj-focus" );

            // see private API doc on the private _activeItem event declaration in this file
            this._trigger( "_activeItem", event, { "previousItem": previousItem, "item": $(), "privateNotice": "The _activeItem event is private.  Do not use." } );
        }
    },

    /**
     * @memberof oj.ojMenu
     * @instance
     * @private
     * @param {Event=} event - What triggered the menu item to blur.  May be <code class="prettyprint">null</code> or omitted.
     */
    _blur: function( event ) { // Private, not an override (not in base class).  Method name unquoted so will be safely optimized (renamed) by GCC as desired.
        this._clearTimer && this._clearTimer();
        this._removeActive(event);
    },

    /*
     * param {Event} event - What triggered the menu to close. Payload for select (if applicable) and close events.
     * param {Object} selectUi - Payload for select event.  Non-null iff close caused by a menu item selection.
     */
    _focusLauncherAndDismiss: function( event, selectUi ) { // Private, not an override (not in base class).  Method name unquoted so will be safely optimized (renamed) by GCC as desired.
        // if the focus fails because the launcher has disappeared, e.g. due to a responsive layout change,
        // no warnings are logged, and the document body winds up focused during the subsequent reparenting,
        // which per the architects is the right thing (i.e. don't introduce any fancy handling for this case).
        this._launcher.focus();

        this.__dismiss( event, selectUi );
    },

    /*
     * Internal method, e.g. called by Button for MenuButton functionality.
     * Could make it public if ever needed.
     * param {Event} event - What triggered the menu to close. Payload for select (if applicable) and close events.
     * param {Object} selectUi - Payload for select event.  Non-null iff close caused by a menu item selection.
     */
    __dismiss: function(event, selectUi) { // Internal visibility; called by Button's MenuButton functionality.  Not an override (not in base class).  Method name unquoted so will be safely optimized (renamed) by GCC as desired.
        if (this._isOperationPending("close", "__dismiss", [event, selectUi]))
          return;

        var isOpen = this.element.is(":visible");
        this._setWhenReady("close");

        /** @type {!Object.<oj.PopupService.OPTION, ?>} */
        var psOptions = {};
        psOptions[oj.PopupService.OPTION.POPUP] = this.element;

        // capture local state in a context used by the after close callback
        psOptions[oj.PopupService.OPTION.CONTEXT] = {"event": event,
                                                     "selectUi": selectUi,
                                                     "isOpen": isOpen};

        oj.PopupService.getInstance().close(psOptions);
    },

    /**
     * Get the default animation for a menu
     *
     * @memberof oj.ojMenu
     * @instance
     * @private
     * @param {string} menuType - The menu type (dropdown or sheet)
     * @param {string} action - The action to animate (open, close)
     * @return {Object} The default animation for the menu type
     */
    _getDefaultAnimation: function(menuType, action)
    {
      var defaults;
      var animation;
      
      defaults = (oj.ThemeUtils.parseJSONFromFontFamily('oj-menu-option-defaults') || {})["animation"];
      if (defaults && defaults[menuType])
      {
        animation = defaults[menuType][action];
      }
      
      return animation;
    },

    /**
     * Return a boolean to indicate if animation is disabled
     *
     * @memberof oj.ojMenu
     * @instance
     * @private
     * @return {boolean} true if animation is disabled; false otherwise.
     */
    _isAnimationDisabled: function()
    {
      // Disable animation if this is not custom element, or the menu is being
      // dismissed and immediately reopened.
      return !this._IsCustomElement() || this._disableAnimation;
    },

    /**
     * Replace animation options with runtime property values
     *
     * @memberof oj.ojMenu
     * @instance
     * @private
     * @param {*} effects - The animation options
     * @param {Object} propertyMap - The runtime property values
     * @return {*} The resolved animation effects
     */
    _replaceAnimationOptions: function(effects, propertyMap)
    {
      if (propertyMap && effects && typeof effects != 'string')
      {    
        var effectsAsString = JSON.stringify(effects);

        for (var key in propertyMap)
        {
          effectsAsString = effectsAsString.replace(new RegExp(key, 'g'), propertyMap[key]);
        }

        effects = JSON.parse(effectsAsString);
      }
      
      return effects;
    },

    /**
     * Utility method to run a task when a promise is resolved, or run it 
     * immediately if there is no promise.
     *
     * @memberof oj.ojMenu
     * @instance
     * @private
     * @param {Promise|null} promise - The promise to wait on
     * @param {function()} task - The task to run
     * @return {IThenable|null} A new promise or null
     */
    _runOnPromise: function(promise, task)
    {
      if (promise)
      {
        return promise.then(task);
      }
      else
      {
        return task();
      }
    },

    /**
     * Before callback is invoked while the menu is still visible and still parented in the zorder
     * container. Close animation is performed here.
     * @memberof! oj.ojMenu
     * @instance
     * @private
     * @param {!Object.<oj.PopupService.OPTION, ?>} psOptions property bag for closing the menu
     * @return {Promise|void}
     */
    _beforeCloseHandler : function (psOptions)
    {
      var rootElement = psOptions[oj.PopupService.OPTION.POPUP];
      
      // For custom element:
      // Fire action event before menu closed, so that app action handlers can do their thing
      // without waiting for the animation to finish.
      if (this._IsCustomElement())
      {
        var context = psOptions[oj.PopupService.OPTION.CONTEXT];
        var selectUi = context["selectUi"];

        //trigger action event on the oj-option element
        if (selectUi && selectUi["item"].length)
        {
            var detail = {};
            var eventName = "ojAction";
            var itemElement = selectUi["item"][0];
            var event = context["event"];
            if (event)
              detail['originalEvent'] = event instanceof $.Event ? event.originalEvent : event;

            var params = {'detail': detail};
            params['cancelable'] = true;
            params['bubbles'] = true;
            var customEvent = new CustomEvent(eventName, params);
            itemElement.dispatchEvent(customEvent);
            context["event"] = customEvent; // Use the action event as the close event's originalEvent
        }
      }

      if (this._isAnimationDisabled())
      {
        rootElement.hide();
        return void(0);
      }
      else
      {
        var animationOptions = this._getDefaultAnimation(this._sheetMenuIsOpen ? 'sheet' : 'dropdown', 'close');
        var promise = oj.AnimationUtils.startAnimation(rootElement[0], "close", 
          oj.PositionUtils.addTransformOriginAnimationEffectsOption(rootElement, animationOptions), this);

        promise.then(function() {
          rootElement.hide();
        });

        return promise;
      }
    },

    /**
     * Close finalization callback.
     *
     * @memberof! oj.ojMenu
     * @instance
     * @private
     * @param {!Object.<oj.PopupService.OPTION, ?>} psOptions property bag for closing the menu
     * @return {void}
     */
    _afterCloseHandler : function (psOptions)
    {
        //restore local variable state from #__dismiss
        var context = psOptions[oj.PopupService.OPTION.CONTEXT];
        var event = context["event"];
        var selectUi = context["selectUi"];
        var isOpen = context["isOpen"];

        this.element.removeData(_POSITION_DATA);

        this._launcher = undefined;
        this._sheetMenuIsOpen = false;

        // Preserve original logic for old-style component:
        // Fire select event after menu closed, so that app select handlers can do their thing
        // without worrying about the fact that the menu is still sitting there.
        // Fire select event before close event, because logical, and so that it can be the close event's
        // originalEvent.
        if (!this._IsCustomElement() && selectUi) {
            var selectResults = this._trigger2( "select", event, selectUi );
            event = selectResults['event']; // Use the select event as the close event's originalEvent
        }

        // just in case it's possible for __dismiss() to get called when menu is already closed, avoid firing spurious event:
        if (isOpen)
            this._trigger( "close", event, {} );

        this._currentOpenOptions = null;

        //Remove menu from openPopupMenus list
        if(_openPopupMenus.indexOf(this) >= 0)
            _openPopupMenus.splice(_openPopupMenus.indexOf(this),1);
    },

    /**
     * <p>Returns a copy of the <code class="prettyprint">openOptions</code> object applicable to the current launch, or the <a href="#openOptions">option</a>
     * value otherwise.
     *
     * <p>If the menu is shared among several launchers, this API can be used to find out what element launched the menu, as seen in the example below.
     *
     * <p>Detailed semantics:
     *
     * <table class="keyboard-table">
     *   <thead>
     *     <tr>
     *       <th>Menu state</th>
     *       <th>Value</th>
     *     </tr>
     *   </thead>
     *   <tbody>
     *     <tr>
     *       <td>Menu is open, or transitioning between open and closed, including when this method is called from an <a href="#event:open">open</a>,
     *           <a href="#event:action">action</a>, or <a href="#event:close">close</a>  listener. (For <a href="#event:ojBeforeOpen">ojBeforeOpen</a>, see next row.)</td>
     *       <td>A copy of the object used for the most recent launch is returned.  See the <a href="#openOptions">openOptions</a>
     *           option, the <a href="#open">open()</a> method, and the <a href="#event:ojBeforeOpen">ojBeforeOpen</a> event for details on how that
     *           object is constructed.</td>
     *     </tr>
     *     <tr>
     *       <td>This method is called from a <a href="#event:ojBeforeOpen">ojBeforeOpen</a> listener.</td>
     *       <td>A copy of the merged object "so far" is returned. The object ultimately used for the launch may differ if it is changed by
     *           a <code class="prettyprint">ojBeforeOpen</code> listener after this method is called.  Unlike the original copy passed to the
     *           <code class="prettyprint">ojBeforeOpen</code> listener, the copy returned by this method is not "live" and cannot be used to affect the launch.</td>
     *     </tr>
     *     <tr>
     *       <td>Menu is closed.  (All states not listed above.)</td>
     *       <td>A copy of the <a href="#openOptions">option</a> value is returned.</td>
     *     </tr>
     *   </tbody>
     * </table>
     *
     * @expose
     * @memberof oj.ojMenu
     * @instance
     * @ignore
     * @since 2.0.0
     *
     * @return {!Object} the <code class="prettyprint">openOptions</code> object
     */
    getCurrentOpenOptions: function() { // Public, not an override (not in base class), so use @expose with unquoted method name.
        return $.extend(true, {}, this._currentOpenOptions || this.options.openOptions); // return a deep copy
    },

    /**
     * <p>Launches this menu after firing the <a href="#event:ojBeforeOpen">ojBeforeOpen</a> event.  Listeners to that event can cancel the launch
     * via <code class="prettyprint">event.preventDefault()</code>.  If the launch is not canceled, then the the <a href="#event:open">open</a> event
     * is fired after the launch.
     *
     * <p>This method's optional <code class="prettyprint">openOptions</code>param can be used to specify per-launch values for the settings in the
     * corresponding component options, without altering those options.  Those per-launch values can be further customized by a
     * <code class="prettyprint">ojBeforeOpen</code> listener.
     *
     * <p>Menus launched manually (as opposed to those launched by built-in functionality such as the [menu button]{@link oj.ojButton#menu} and
     * [context menu]{@link oj.baseComponent#contextMenu} functionality) must be launched via this API, not by simply unhiding the Menu DOM (such as
     * via jQuery's <code class="prettyprint">show()</code> API.
     *
     * @expose
     * @memberof oj.ojMenu
     * @instance
     *
     * @param {Object=} event What triggered the menu launch.  May be <code class="prettyprint">null</code>.  May be omitted if subsequent params are omitted.
     * @param {Object=} openOptions Options to merge with the <code class="prettyprint">openOptions</code> option.  May be <code class="prettyprint">null</code>.  May be omitted if subsequent params are omitted.
     * 
     * @example <caption>Invoke the <code class="prettyprint">open</code> method:</caption>
     * // override the launcher for this launch only, without affecting the other
     * // openOptions, and without affecting the component's openOptions option
     * myMenu.open(myEvent, {'launcher': 'myLauncher'});
     */
    open: function( event, openOptions ) { // Public, not an override (not in base class), so use @expose with unquoted method name.
      var submenuOpenOptions = arguments[2];
      if (this._isOperationPending("open", "open", [event, openOptions, submenuOpenOptions]))
        return;

        // If _clickAwayHandler has determined that we need to dismiss the menu,
        // do it first so that ojclose event is triggered for the old launcher
        // before ojbeforeopen event is triggered for the new launcher        
        if (this._dismissEvent)
        {
           // Disable animation since we'll be reopening the menu
          this._disableAnimation = true;
          
          // Use the event from _clickAwayHandler as the close event's originalEvent
          this.__dismiss(this._dismissEvent);
          
          // In case the menu is being opened by a different launcher, we don't
          // want the _clickAwayHandler for the old launcher to dismiss it.
          this._dismissEvent = null;
        }

        //
        // Important:  Merge [submenu]openOptions *before* calling _trigger(), and don't use the merged values until *after* the call.
        // Reason:  Per doc on open() and beforeOpen event, we pass the merged openOptions to beforeOpen listeners as a "live" object,
        // so the listener can both read and write the values used for this launch.  We may eventually pass submenuOpenOptions too, either to
        // beforeOpen or to beforeSubmenuOpen, if we ever have that.
        //
        // Merge needs 2 steps:
        // 1) Shallow merge (i.e. don't pass true as first arg to extend) of the 2 openOptions objects, into a new object.  Shallow so that the per-launch position object completely overrides the
        // component option's position object rather than merging with it.
        // 2) Then a deep copy of all object-valued fields in the merged object.  Position is the only such field, and it doesn't contain any objects of its own,
        // so this is actually just a shallow copy of position.  This is so that if beforeOpen listener mutates the position object, the position object in the component option remains unchanged.
        // Step 2 isn't needed for submenuOptions, since it isn't passed to beforeOpen.
        // $.fn.position copies the object passed to it before modifying it, so Step 2 isn't needed for that reason.
        openOptions = $.extend({}, this.options.openOptions, openOptions);
        openOptions.position = $.extend({}, openOptions.position);
        submenuOpenOptions = $.extend({}, this.options.submenuOpenOptions, submenuOpenOptions);

        // getCurrentOpenOptions() returns a deep copy of this._currentOpenOptions if set.  Put the live copy in the ivar, and have that method make the copy, so that the method picks up
        // beforeOpen listeners' changes to the live copy.  The old value of the ivar is non-null iff the menu is already open from a previous launch.  Grab the old value so we can restore it
        // if this (new) launch is cancelled, in which case the old launch stays up and subsequent calls to the method should return the old value.
        var oldOpenOptions = this._currentOpenOptions;
        this._currentOpenOptions = openOptions;

        oj.PositionUtils._normalizeEventForPosition(event); // see callee doc

        // Hack:  __openingContextMenu is set and unset by baseComponent._OpenContextMenu(), since Menu needs to know whether the
        // menu is open as a context menu vs. some other kind of menu including menu button,
        // as this affects whether subsequent mousedown/touchstart on launcher should dismiss menu.  IIRC, the upcoming Popup Fmwk
        // will address this need, but if not, fix it separately, perhaps by adding a new openOptions sub-option so it can be passed to menu.open().
        this._launcherClickShouldDismiss = this.element[0].__openingContextMenu;

        // TBD: if we ever pass submenuOpenOptions to a listener, must copy its position object first like we do for openOptions, above.
        var beforeOpenResults = this._trigger2( "beforeOpen", event, {openOptions: openOptions});

        if (!beforeOpenResults['proceed']) {
            this._currentOpenOptions = oldOpenOptions; // see comment above
            this._disableAnimation = false;
            return;
        }

        // Close menu if already open
        if (this.element.is(":visible")) {
            // Disable animation since we'll be reopening the menu
            this._disableAnimation = true;
            
            // if getCurrentOpenOptions() is called during the close event marking the end of the previous launch,
            // then it should return the details for the old launch
            this._currentOpenOptions = oldOpenOptions;

            // Use the beforeOpen event as the close event's originalEvent
            this.__dismiss(beforeOpenResults['event']); // sets this._currentOpenOptions to null
            
            // In case the menu is being opened by a different launcher, we don't
            // want the _clickAwayHandler for the old launcher to dismiss it.
            this._dismissEvent = null;

            this._currentOpenOptions = openOptions; // restore this launch's value
        }

        var launcher = openOptions.launcher;
        if (!this._IsCustomElement())
        {
            launcher = $.type(launcher) === "string"
                       ? $(launcher)
                       : launcher;
        }
        else
        {
            launcher = $.type(launcher) === "string"
                       ? $(document.getElementById(launcher))
                       : $(launcher);
        }

        if (!launcher || !launcher.length) {
            // need launcher so can return focus to it.
            oj.Logger.warn("When calling Menu.open(), must specify openOptions.launcher via the component option, method param, or beforeOpen listener.  Ignoring the call.");
            this._currentOpenOptions = null;
            this._disableAnimation = false;
            return;
        }

        var isDropDown = this._isDropDown(openOptions.display);
        this._toggleCancelDom(isDropDown);
        var position, modality;

        if (isDropDown) { // always true if there are submenus
            // .oj-menu-dropdown already added to any submenus in _setup, since dropdown/sheet status can't
            // vary by launch when there are submenus.
            this.element.addClass("oj-menu-dropdown").removeClass("oj-menu-sheet");
            modality = _DROPDOWN_MODALITY;
            position = oj.PositionUtils.normalizeHorizontalAlignment(openOptions.position, this.isRtl);
            position.of = oj.PositionUtils.normalizePositionOf(position.of, launcher, event);

            // since already checked for null launcher above, this is only possible if "of" was "event" but the event was null.  Caller error.
            if (position.of == null) {
                oj.Logger.warn("position.of passed to Menu.open() is 'event', but the event is null.  Ignoring the call.");
                this._currentOpenOptions = null;
                this._disableAnimation = false;
                return;
            }
        } else { // sheet menu, implying no submenus
            this.element.addClass("oj-menu-sheet").removeClass("oj-menu-dropdown");
            modality = _SHEET_MODALITY;

            position = {
                "my": "bottom",
                "at": _SHEET_POSITION_AT,
                "of": window,
                "collision": "flipfit"
            };
        }

        //Close all other open menus
        var currentMenu = this.element[0];
        //Clone _openPopupMenus as __dismiss() will remove the open menu from _openPopupMenus list
        var openPopupMenus = _openPopupMenus.slice(0, _openPopupMenus.length);
        $.each(openPopupMenus , function(index, menu) {
            if (menu.element[0] !== currentMenu) {
                menu._collapse( event, "eventSubtree"); // TBD: should this be "all"?
                if (menu._launcher)
                    menu.__dismiss(event);
            }
        });

        // cache the merged value for use while the (outer) menu is still open
        this._submenuPosition = oj.PositionUtils.normalizeHorizontalAlignment(submenuOpenOptions.position, this.isRtl);

        var usingCallback = this._usingCallback;

        // if they provided a using function that is not our callback, stash it
        // away so that we can delegate to it in our proxy.
        if ($.isFunction(position["using"]) && position["using"] !== usingCallback)
          position["origUsing"] = position["using"];

        // override with our proxy to handle positioning of the tail
        position["using"] = usingCallback;

        this.element.data(_POSITION_DATA, position);

        this._setWhenReady("open");

        /** @type {!Object.<oj.PopupService.OPTION, ?>} */
        var psOptions = {};
        psOptions[oj.PopupService.OPTION.POPUP] = this.element;
        psOptions[oj.PopupService.OPTION.LAUNCHER] = launcher;
        psOptions[oj.PopupService.OPTION.POSITION] = position;
        psOptions[oj.PopupService.OPTION.EVENTS] = this._getPopupServiceEvents();
        psOptions[oj.PopupService.OPTION.LAYER_SELECTORS] = "oj-menu-layer";
        psOptions[oj.PopupService.OPTION.MODALITY] = modality;

        // local variables passed to the before and after open callbacks.
        psOptions[oj.PopupService.OPTION.CONTEXT] = {"event" : event,
                                                     "initialFocus": openOptions.initialFocus,
                                                     "launcher": launcher,
                                                     "isDropDown": isDropDown
                                                    };
        psOptions[oj.PopupService.OPTION.CUSTOM_ELEMENT] = this._IsCustomElement();

        oj.PopupService.getInstance().open(psOptions);
        
        this._disableAnimation = false;
    },

    /**
     * Before open callback is called after the menu has been reparented into the
     * zorder container. Open animation is performed here.
     * @memberof! oj.ojMenu
     * @instance
     * @private
     * @param {!Object.<oj.PopupService.OPTION, ?>} psOptions property bag for opening the menu
     * @return {Promise|void}
     */
    _beforeOpenHandler : function (psOptions)
    {
      var promise;
      var rootElement = psOptions[oj.PopupService.OPTION.POPUP];
      var position = psOptions[oj.PopupService.OPTION.POSITION];
      var isDropDown = psOptions[oj.PopupService.OPTION.CONTEXT]['isDropDown'];

      rootElement.show();
      rootElement["position"](position);

      if (!this._isAnimationDisabled())
      {
        var animationOptions = this._getDefaultAnimation(isDropDown ? 'dropdown' : 'sheet', 'open');
        promise = oj.AnimationUtils.startAnimation(rootElement[0], "open", 
          oj.PositionUtils.addTransformOriginAnimationEffectsOption(rootElement, animationOptions), this);

        if (isDropDown)
        {
          // For dropdown, no need to return a promise from the open animation 
          // since the menu is ready for interaction as soon as it's visible,
          // and we want mouseenter events to be handled while animating.
          //
          // For sheet, we need to return the promise because it's coming in
          // from the bottom and afterOpenHandler set focus to it, which can
          // cause the layout to move around if the menu is not yet in view.
          promise = undefined;
        }
      }

      return promise;
    },

    /**
     * Called after the menu is shown. Perform open finalization.
     * @memberof! oj.ojMenu
     * @instance
     * @private
     * @param {!Object.<oj.PopupService.OPTION, ?>} psOptions property bag for opening the menu
     * @return {Promise|void}
     */
    _afterOpenHandler : function (psOptions)
    {
      // From the context passed from the open restore local variable state.
      var context = psOptions[oj.PopupService.OPTION.CONTEXT];
      var event = context["event"];
      var initialFocus = context["initialFocus"];
      var launcher = context["launcher"];
      var isDropDown = context["isDropDown"];

      var focusFirstItem = initialFocus === "firstItem";
      var focusMenu = focusFirstItem || initialFocus === "menu" ;

      if (focusMenu)
          this.element.focus();

      if (focusFirstItem) {
          this._focus(event, this.element.children().first());
      } else {
          this._blur(event);
      }

      // store launcher so we can return focus to it, e.g. if Esc pressed.  Ivar is non-null iff
      // menu is currently open.
      this._launcher = launcher;
      this._sheetMenuIsOpen = !isDropDown;

      //Add current menu to openPopupMenus so that it will be closed on focus lost/click away.
      _openPopupMenus.push(this);

      this._trigger( "open", event, {});
    },

    _startOpening: function( submenu ) { // Private, not an override (not in base class).  Method name unquoted so will be safely optimized (renamed) by GCC as desired.
        this._clearTimer && this._clearTimer();

        // Don't open if already open fixes a Firefox bug that caused a .5 pixel
        // shift in the submenu position when mousing over the submenu icon
        if ( submenu.attr( "aria-hidden" ) !== "true" ) {
            return;
        }

        this._clearTimer = this._setTimer(function() {
            delete this._clearTimer;
            this._close();
            this._open( submenu );
        }, this._getSubmenuBusyStateDescription("closing and opening"), this.delay );
    },

    // opens a *sub*menu
    _open: function( submenu ) { // Private, not an override (not in base class).  Method name unquoted so will be safely optimized (renamed) by GCC as desired.

        // Don't open if already open.
        // Calling position() again when the submenu is animating will mess up
        // the calculation and make the submenu appear in different positions.
        if ( submenu.attr( "aria-hidden" ) !== "true" ) {
            return;
        }

        var position = $.extend( {"of": this.active}, this._submenuPosition); // normalizeHorizontalAlignment() was already called on the ivar

        this._clearTimer && this._clearTimer();
        this.element.find( ".oj-menu" ).not( submenu.parents( ".oj-menu" ) )
            .hide()
            .attr( "aria-hidden", "true" )
            .removeData(_POSITION_DATA);

        submenu
            .show()
            .removeAttr( "aria-hidden" )
            .position( position )
            .data(_POSITION_DATA, position);

        this._getSubmenuAnchor(submenu).attr( "aria-expanded", "true" );

        if (!this._launcher && _openPopupMenus.indexOf(this) < 0) {
            _openPopupMenus.push(this);
        }
        
        if (!this._isAnimationDisabled())
        {
          var animation = this._getDefaultAnimation('submenu', 'open');
          animation = this._replaceAnimationOptions(animation, {'#myPosition': position.my});
          oj.AnimationUtils.startAnimation(submenu[0], 'open', animation, this);
        }
    },

    /*
     * Same as calling _collapse(event, "eventSubtree") or _collapse(event, "all"), except that, if delay param is not passed, it collapses the menu immediately.
     */
    __collapseAll: function(event, all, delay) {
        var promise;

        this._clearTimer && this._clearTimer();
        var self = this;
        var collapseMenu = function() {
            delete self._clearTimer;
            // If we were passed an event, look for the submenu that contains the event
            var currentMenu = all ? self.element :
                $(event && event.target).closest(self.element.find(".oj-menu"));

            // If we found no valid submenu ancestor, use the main menu to close all sub menus anyway
            if (!currentMenu.length) {
                currentMenu = self.element;
            }

            var closePromise = self._close(currentMenu);

            closePromise = self._runOnPromise(closePromise, function() {
              self._blur(event);
              self.activeMenu = currentMenu;
            });

            return closePromise;
        };
        if (delay) {
          if (this._isAnimationDisabled())
          {
            self._clearTimer = self._setTimer(collapseMenu, self._getSubmenuBusyStateDescription("closing"), delay);
          }
          else
          {
            promise = new Promise(function(resolve, reject) {
              self._clearTimer = self._setTimer(collapseMenu, self._getSubmenuBusyStateDescription("closing"), delay, function() {
                resolve(true);
              });
            });
          }
        } else {
            promise = collapseMenu();
        }

        if (promise)
        {
          // Need to add busy state since submenu animation doesn't go through PopupService events
          var resolveBusyState = oj.Context.getContext(this.element[0]).getBusyContext().addBusyState({"description": "closing submenus"});

          // IMPORTANT: Do not change promise to the one returned by then().  Doing 
          // so will introduce an additional delay and disrupt the continuity of
          // busy state with any subsequent operation.
          promise.then(resolveBusyState);
        }
        
        return promise;
    },

    // With no arguments, closes the currently active menu - if nothing is active
    // it closes all menus.  If passed an argument, it will search for menus BELOW
    _close: function( startMenu ) { // Private, not an override (not in base class).  Method name unquoted so will be safely optimized (renamed) by GCC as desired.

        var closePromise;

        //TODO: Consider refatoring _close moving into the __dismiss logic.  The _close logic
        //      will hide levels of nested menus.  The __dismiss knocks down the root
        //      menu.  Both _close and _dismiss are called from _closeAll which closes
        //      all submenus and the main menu.

        if ( !startMenu ) {
            startMenu = this.active ? this.active.parent() : this.element;
        }

        var self = this;
        var defaultAnimation = self._getDefaultAnimation('submenu', 'close');
        var menus = startMenu.find( ".oj-menu" );
        var hideSubmenus = function(submenus) {
          submenus.hide()
                  .attr( "aria-hidden", "true" )
                  .removeData(_POSITION_DATA);
          self._getSubmenuAnchor( submenus ).attr( "aria-expanded", "false" );
        };

        if (this._isAnimationDisabled())
        {
          // If animation is hard-disabled, just hide all submenus at once
          hideSubmenus(menus);
          startMenu.find( ".oj-focus-ancestor" ).removeClass( "oj-focus-ancestor" );
        }
        else
        {
          // If there is animation, recursively hide submenus level by level,
          // starting from the innermost level.
          // There is no default close animation, but this allows app to define
          // cascading close animation if it wants to.
          
          // Define a recurive function that close all submenus of a menu
          var closeSubmenus = function(currentMenu)
          {
            var masterPromise = null;
            
            // Get <li> child elements of the current menu.  Submenus are rendered as
            // <ul> children of <li> elements.
            var items = currentMenu.children();
            
            // Find all the immediate child menus and iterate through them
            var childMenus = items.children( ".oj-menu" );
            childMenus.each(function(index, submenu) {
              var jSubmenu = $(submenu);
              
              // Define a function that animate the closing and hiding of the iterated menu
              var animateMenuClose = function() {
                var position = jSubmenu.data(_POSITION_DATA);
                var animation = self._replaceAnimationOptions(defaultAnimation, {'#myPosition': position ? position.my : null});
                return oj.AnimationUtils.startAnimation(submenu, 'close', animation, self).then(function() {
                  hideSubmenus(jSubmenu);
                });
              };

              if (jSubmenu.is(':visible'))
              {
                // If the iterated menu is visible, try to close its child menus first
                var promise = closeSubmenus(jSubmenu);

                // Wait for child menus to close before closing the iterated menu.
                //
                // Keep track of the closing promise for each menu that is visible
                // There should be at most one visible submenu at each level
                masterPromise = self._runOnPromise(promise, animateMenuClose);
              }
              else
              {
                // If the iterated menu is not visible, just hide it and set other attributes
                hideSubmenus(jSubmenu);
              }
            });

            // After iterating through all child menus, return a master promise
            return masterPromise;
          };

          // Start calling the recursive function from the outermost menu
          closePromise = closeSubmenus(startMenu);

          closePromise = this._runOnPromise(closePromise, function() {
            startMenu.find( ".oj-focus-ancestor" ).removeClass( "oj-focus-ancestor" );
          });
        }

        if (!this._launcher) {
            // If the current menu is not a popup menu and it's submenu is already open then remove the menu from _openPopupMenus
            // while closing the submenus of top level menu.
            if (_openPopupMenus.indexOf(this) >= 0) {
                if (startMenu === this.element) {
                    _openPopupMenus.splice(_openPopupMenus.indexOf(this), 1);
                }
            }
        }
        
        return closePromise;
    },

    /**
     * Closes one or more open submenus.
     *
     * @memberof oj.ojMenu
     * @instance
     * @private
     * @param {Event=} event - What triggered the menu to collapse.  May be <code class="prettyprint">null</code>.
     *                         May be omitted if the <code class="prettyprint">which</code> parameter is omitted.
     * @param {string=} which - Optional; defaults to <code class="prettyprint">"active"</code>.  Values are the following <code class="prettyprint">string</code>s:
     *     <ul>
     *       <li><code class="prettyprint">"active"</code>: Closes the currently active submenu.</li>
     *       <li><code class="prettyprint">"all"</code>: Closes all submenus.</li>
     *       <li><code class="prettyprint">"eventSubtree"</code>: Closes submenus below but not including the menu that is or contains the target of the triggering event.</li>
     *     </ul>
     */
    _collapse: function( event, which ) { // Private, not an override (not in base class).  Method name unquoted so will be safely optimized (renamed) by GCC as desired.
        var promise;
        
        if (which == null || which === "active") {
            var newItem = this.activeMenu &&
                this.activeMenu.closest( ".oj-menu-item", this.element );
            if ( newItem && newItem.length ) {
                var self = this;
                promise = this._close();
                promise = this._runOnPromise(promise, function() {
                  self._focus( event, newItem );
                });
            }
        } else if ( which === "all" || which === "eventSubtree") {
            promise = this.__collapseAll(event, which === "all", this.delay);
        } else {
            oj.Logger.warn("Invalid param " + which + " passed to Menu._collapse().  Ignoring the call.");
        }

        return promise;
    },

    /**
     * Opens the submenu below the currently focused item, if one exists.
     *
     * @memberof oj.ojMenu
     * @instance
     * @private
     * @param {Event=} event - What triggered the menu to expand.  May be <code class="prettyprint">null</code> or omitted.
     */
    _expand: function( event ) { // Private, not an override (not in base class).  Method name unquoted so will be safely optimized (renamed) by GCC as desired.
        var newItem = this.active &&
            this.active
                .children( ".oj-menu " )
                .children( ".oj-menu-item" )
                .first();

        if ( newItem && newItem.length ) {
            this._open( newItem.parent() );

            this._clearTimer && this._clearTimer();

            // Delay so Firefox will not hide activedescendant change in expanding submenu from AT
            this._clearTimer = this._setTimer(function() {
                delete this._clearTimer;
                this._focus( event, newItem );
            }, this._getBusyStateDescription("focusing an item"));
        }
    },

    /**
     * Focuses the next menu item, wrapping at the bottom, as if <kbd>DownArrow</kbd> had been pressed.
     *
     * @memberof oj.ojMenu
     * @instance
     * @private
     * @param {Event=} event - What triggered the focus to move.  May be <code class="prettyprint">null</code> or omitted.
     */
    _next: function( event ) { // Private, not an override (not in base class).  Method name unquoted so will be safely optimized (renamed) by GCC as desired.
        this._move( "next", "first", event );
    },

    /**
     * Focuses the previous menu item, wrapping at the top, as if <kbd>UpArrow</kbd> had been pressed.
     *
     * @memberof oj.ojMenu
     * @instance
     * @private
     * @param {Event=} event - What triggered the focus to move.  May be <code class="prettyprint">null</code> or omitted.
     */
    _previous: function( event ) { // Private, not an override (not in base class).  Method name unquoted so will be safely optimized (renamed) by GCC as desired.
        this._move( "prev", "last", event );
    },

    _isFirstItem: function() { // Private, not an override (not in base class).  Method name unquoted so will be safely optimized (renamed) by GCC as desired.
        return this.active && !this.active.prevAll( ".oj-menu-item" ).length;
    },

    _isLastItem: function() { // Private, not an override (not in base class).  Method name unquoted so will be safely optimized (renamed) by GCC as desired.
        return this.active && !this.active.nextAll( ".oj-menu-item" ).length;
    },

    _move: function( direction, filter, event ) { // Private, not an override (not in base class).  Method name unquoted so will be safely optimized (renamed) by GCC as desired.
        var next;
        if ( this.active ) {
            if ( direction === "first" || direction === "last" ) {
                next = this.active
                    [ direction === "first" ? "prevAll" : "nextAll" ]( ".oj-menu-item" )
                    .eq( -1 );
            } else {
                next = this.active
                    [ direction + "All" ]( ".oj-menu-item" )
                    .eq( 0 );
            }
        }
        if ( !next || !next.length || !this.active ) {
            next = this.activeMenu.children( ".oj-menu-item" )[ filter ]();
        }

        this._focus( event, next );
    },

    /* TODO: update JSdoc to be something like this revised version, once todo's in code are resolved.
     * Let selectItem be the currently focused menu item if any, else the menu item containing the target of the supplied event if any, else null.
     *
     * If selectItem is non-null, this method selects that item, collapses all submenus, and triggers the menu's
     * <code class="prettyprint">select</code> event.
     *
     * Internally, this method should not be invoked for parent menu items or disabled menu items. But still there is a chance of
     * invoking _select() externally. (Not anymore now that it's private.) In that case, if focused menu item is a disabled or parent menu item then a warning message will be logged.
     */
    /**
     * Selects the currently focused menu item, collapses all submenus and triggers the menu's <code class="prettyprint">select</code> event.
     *
     * @memberof oj.ojMenu
     * @instance
     * @private
     * @param {Event=} event - What triggered the selection.  May be <code class="prettyprint">null</code> or omitted.
     */
    _select: function( event ) { // Private, not an override (not in base class).  Method name unquoted so will be safely optimized (renamed) by GCC as desired.
        // If no menu item is focused, then infer one from the event if possible.  TBD: still need this now that not public?  Or is this.active always set?
        if (!this.active && event && event.target ) {
            var menuItem = $( event.target ).closest( ".oj-menu-item" );
            if (menuItem.closest( this.element ).length)
                this._makeActive(menuItem, event);
        }

        if (!this.active) {
            // If we reach here, this must be an external call to the method.
            oj.Logger.warn("Menu._select() called when no menu item is focused and no menu item can be inferred from event param.");
            return;
        }

        // now we know this.active is non-null
        if (this.active.has( ".oj-menu" ).length || this.active.is( ".oj-disabled" )) {
            // If we reach here, this must be an external call to the method.
            oj.Logger.warn("Selecting a disabled menu item or parent menu item is not allowed.");
            return;
        }

        // payload for select event
        var ui = this.active.is(this._cancelItem)
            ? undefined // don't fire select for Cancel item
            : { "item": this.active }; // must grab this.active before calling __collapseAll, which clears this.active

        // The menu item has been selected, so we can collapse all menus immediately with no timeout via __collapseAll.
        // If we call the version with a timeout, _collapse(event, "all"), then mouseleave event handler will invoke _collapse(event, "eventSubtree") on event.target
        // which will clear our scheduled _collapse(event, "all") on this.element, so that submenu will not be collapsed,
        // which means that when the menu is later re-launched, the submenu is already open.
        var promise = this.__collapseAll( event, true );

        // if menu is currently open
        if (this._launcher) {
            var self = this;
            this._runOnPromise(promise, function() {
              self._focusLauncherAndDismiss(event, ui);
            });
        }
    },

   /**
    * @instance
    * @private
    */
    _surrogateRemoveHandler: function()
    {
      var element = this.element;
      element.remove();
    },

   /**
    * @instance
    * @private
    * @return {!Object.<oj.PopupService.EVENT, function(...)>}
    */
    _getPopupServiceEvents: function()
    {
      if (!this._popupServiceEvents)
      {
        /** @type {!Object.<oj.PopupService.EVENT, function(...)>} **/
        var events = this._popupServiceEvents = {};
        events[oj.PopupService.EVENT.POPUP_CLOSE] = this._closeAll.bind(this);
        events[oj.PopupService.EVENT.POPUP_REMOVE] = this._surrogateRemoveHandler.bind(this);
        events[oj.PopupService.EVENT.POPUP_REFRESH] = this.refresh.bind(this);
        events[oj.PopupService.EVENT.POPUP_AUTODISMISS] = this._clickAwayHandler.bind(this);
        events[oj.PopupService.EVENT.POPUP_BEFORE_OPEN] = this._beforeOpenHandler.bind(this);
        events[oj.PopupService.EVENT.POPUP_AFTER_OPEN] = this._afterOpenHandler.bind(this);
        events[oj.PopupService.EVENT.POPUP_BEFORE_CLOSE] = this._beforeCloseHandler.bind(this);
        events[oj.PopupService.EVENT.POPUP_AFTER_CLOSE] = this._afterCloseHandler.bind(this);

      }
      return this._popupServiceEvents;
    },

   /**
    * @instance
    * @private
    */
    _closeAll: function()
    {
      // TODO: Don't want to animate when force close a menu. This flag is not
      // hooked in the beforeCloseHandler.  There is only a custom element check. Doesn't
      // currently matter because the menu doesn't support custom element syntax yet.
      this._disableAnimation = true;

      this._close(this.element);
      this.__dismiss(null);
      // Forced menu dismissal doesn't queue the close event for some reason. The busy
      // state is resolved on the close event from the mediator.  Force the busy state to release.
      this._setWhenReady("none");
    },

   /**
    * @private
    * @param {Object} pos "my" element associated with the position object
    * @param {Object} props directions as to where the element should be moved
    */
    _usingHandler: function(pos, props)
    {
      var rootMenu = props["element"]["element"];
      rootMenu.css(pos);

      // Capture the position data so that we can set transform-origin later on
      oj.PositionUtils.captureTransformOriginAnimationEffectsOption(rootMenu, props);

      // call on the original using
      var position = rootMenu.data(_POSITION_DATA);
      if (position)
      {
        var origUsing = position["origUsing"];
        if (origUsing)
          origUsing(pos, props);
      }

      // implicitly dismiss the menu when the position.of is clipped in an overflow container.
      if (oj.PositionUtils.isAligningPositionClipped(props))
        this._clearCloseDelayTimer = this._setTimer(this._closeAll, this._getSubmenuBusyStateDescription("closing"), 1);
    },

    // @inheritdoc
    getNodeBySubId: function(locator) {
        switch (locator && locator['subId']) {
            case _SUBID_CANCEL:
                // only return it if it's currently in the DOM, never when it's detached
                return this._cancelDomAttached ? this._cancelItem[0] : null;
            default:
                return this._super(locator);
        }
    },

    /**
     * {@ojinclude "name":"getSubIdByNodeDesc"}
     *
     * @expose
     * @ignore
     * @memberof oj.ojMenu
     * @instance
     * @since 2.1.0
     *
     * @param {!Element} node {@ojinclude "name":"getSubIdByNodeNodeParam"}
     * @returns {Object|null} {@ojinclude "name":"getSubIdByNodeReturn"}
     *
     * @example <caption>{@ojinclude "name":"getSubIdByNodeCaption"}</caption>
     * {@ojinclude "name":"getSubIdByNodeExample"}
     */
    getSubIdByNode: function(node) {
        return this._cancelItem && this._cancelItem.is($(node).parents().addBack(node))
            ? {'subId':_SUBID_CANCEL}
            : this._super(node);
    },

    /**
     * Called on menu open.
     * @private
     * @param {string} display - the display value for the current launch, before resolving "auto"
     */
    _isDropDown: function(display) {
        if (this._hasSubmenus)
            return true;

        switch (display) {
            case "dropDown":
                return true;
            case "sheet":
                return false;
            case "auto":
                return _DISPLAY_QUERY.matches;
            default:
                throw new Error("Invalid value for Menu openOptions.display: " + display);
        }
    },

    /**
     * Called on menu open. Adds or removes the Cancel menu item and its divider, as needed.
     * @private
     * @param {boolean} isDropDown
     */
    _toggleCancelDom: function(isDropDown) {
        if (!_SHEETS_HAVE_CANCEL_ITEM)
            return; // shouldn't add cancel DOM, and no need to remove it since it could never have been added

        if (isDropDown) {
            if (this._cancelDomAttached) {
                this._getCancelDom().detach()
                    .eq(0).prev().removeClass( "oj-menu-item-before-divider" );
                this._cancelDomAttached = false;
            }
        } else {
            // if detached, adds it.  If attached, ensures it's at the end of the menu where it belongs,
            // even if app or component has appended menu items.
            this._getCancelDom().appendTo(this.element) // @HTMLUpdateOK trusted string per annotations in callee
                .eq(0).prev().addClass( "oj-menu-item-before-divider" );
            this._cancelDomAttached = true;
        }
    },

    /**
     * Called on menu open when menu needs to add a cancel item for this launch.
     * @private
     * @return {jQuery} JQ object with Cancel divider and Cancel menu item in correct order
     */
    _getCancelDom: function() {
        if (!this._cancelDom) {
            var divider = $("<li></li>", this.document[0]); // @HTMLUpdateOK trusted string
            var a = $("<a href='#'></a>", this.document[0]) // @HTMLUpdateOK trusted string
                .text(this.options['translations']['labelCancel']);
            $("<span class='oj-menu-item-icon oj-component-icon oj-menu-cancel-icon'></span>", this.document[0])
                .prependTo(a); // @HTMLUpdateOK trusted string
            var li = $("<li></li>", this.document[0])
                .addClass( "oj-menu-item-cancel oj-menu-item-after-divider" )
                .append(a); // @HTMLUpdateOK trusted string

            this._initDividers(divider);
            this._initAnchors(a);
            this._initMenuItems(li);

            this._cancelAnchor = a;
            this._cancelItem = li;
            this._cancelDom = $([divider[0], li[0]]); // need array-of-elem syntax to guarantee order
        }
        return this._cancelDom;
    },

    /**
     * Called at create. Sets up Hammer swipe-down-to-dismiss-menu listener if enabled via SASS var.
     * @private
     */
    _setupSwipeBehavior: function() {
        if (!_SHEETS_HAVE_SWIPE_DOWN_TO_DISMISS)
            return;

        this.element.ojHammer(_HAMMER_OPTIONS);
        this._on({
            "swipedown": function(event) {
                // important to check "sheet menu currently open", not "last launch was sheet menu",
                // since a single swipe can fire 2 swipe events, and the 2nd one finds the menu already
                // closed and NPE's if it enters the "if" block
                if (this._sheetMenuIsOpen && event["gesture"]["pointerType"] === "touch") { // Hammer events fire for mouse too
                    this.__collapseAll( event, true );
                    this._focusLauncherAndDismiss(event);
                }
            }
        });
    },

    /**
     * Creates a Promise exposed by the {@link oj.ojMenu#whenReady} method.
     *
     * @param {string} operation valid values are "open", "close" or "none"
     * @memberof oj.ojMenu
     * @instance
     * @private
     */
    _setWhenReady : function (operation)
    {
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

      this._whenReadyMediator = new oj.PopupWhenReadyMediator(this.element, operation, "ojMenu",
        this._IsCustomElement());
    },

    /**
     * Checks to see if there is a pending "open" or "close" operation.  If pending and it
     * is the same as the requested operation, the request silently fails.  If the current
     * operation is the inverse operation, we queue the current operation after the pending
     * operation is resolved.
     *
     * @memberof oj.ojMenu
     * @instance
     * @private
     * @param {string} operation currently requested
     * @param {string} methodName to invoke to trigger the target operation
     * @param {Array} methodArgs passed to a queue operation
     * @returns {boolean} <code>true</code> if a close or open operation is pending completion.
     */
    _isOperationPending: function (operation, methodName, methodArgs)
    {
      /** @type {oj.PopupWhenReadyMediator} **/
      var mediator = this._whenReadyMediator;
      if (mediator)
        return mediator.isOperationPending(this, operation, methodName, methodArgs);
      else
        return false;
    },

    /**
     * Adds a busy state with the specified description.
     *
     * Asynchronously, after the specified delay in ms, calls callback with "this" bound to this menu instance, 
     * and then resolves the busy state.
     *
     * Returns a "cancel" function that if called:
     * - Cancels the timer, so that the callback is never called (unless it has already been called).  
     * - Resolves the busy state.
     * 
     * @memberof oj.ojMenu
     * @instance
     * @private
     * @param {function()} callback
     * @param {string} description
     * @param {number=} delay in ms. Defaults to 0.
     * @param {function()=} notifier - A function to notify the caller of several conditions so that it can clean up:
     *                                 1. The timer is cancelled before "callback" is called
     *                                 2. "callback" is called and doesn't return a promise
     *                                 3. "callback" is called, returns a promise, and the promise is resolved
     * @returns {function()} a "cancel" function as described above
     */
    _setTimer: function (callback, description, delay, notifier) {
        // Call this line each time rather than caching busyContext
        var resolve = oj.Context.getContext(this.element[0]).getBusyContext().addBusyState({"description": description});

        // resolve() bombs if called a 2nd time, so prevent that possibility by wrapping it in a function that can't call 
        // it twice, and never calling resolve() directly. If that "bombs 2nd time" behavior is removed from the BusyContext 
        // framework, can remove this "resolveOnce" wrapper var, and just call resolve() below.
        var resolveOnce = function() {
            if (resolve) {
                resolve();
                resolve = null;
                notifier && notifier();
            }
        };

        var self = this;

        var id = setTimeout(function() {
            var result = callback.bind(self)();
            if (result && result instanceof Promise)
            {
              // If the callback returns a promise, resolve busy state when the promise resolves.
              result.then(resolveOnce);
            }
            else
            {
              // If the callback doesn't return a promise, just resolve the busy state
              resolveOnce();
            }
        }, delay || 0);

        return function() {
            clearTimeout(id);
            resolveOnce();
        };
    },

    // action is "focusing an item", ...
    _getBusyStateDescription: function (action) {
        return "Menu with id '" + this.element.attr("id") + "' is busy " + action + ".";
    },

    // action is "opening", "closing", "closing and opening", ...
    _getSubmenuBusyStateDescription: function (action) {
        return this._getBusyStateDescription(action + " a submenu");
    },
   /**
    * Notifies the component that its subtree has been removed from the document
    * programmatically after the component has been created.
    *
    * @memberof oj.ojMenu
    * @instance
    * @protected
    * @override
    */
    _NotifyDetached: function()
    {
      // detaching an open menu results in implicit dismissal
      if (oj.ZOrderUtils.getStatus(this.element) === oj.ZOrderUtils.STATUS.OPEN)
        this._closeAll();

      this._super();
    }

    // API doc for inherited methods with no JS in this file:

    /**
     * Returns a <code class="prettyprint">jQuery</code> object containing the root element of the Menu component.
     *
     * @method
     * @name oj.ojMenu#widget
     * @memberof oj.ojMenu
     * @instance
     * @ignore
     * @return {jQuery} the root element of the component
     */

    /**
     * Removes the menu functionality completely. This will return the element back to its pre-init state.
     *
     * @method
     * @name oj.ojMenu#destroy
     * @memberof oj.ojMenu
     * @instance
     * @ignore
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
     *       <td>Menu Item</td>
     *       <td><kbd>Tap</kbd></td>
     *       <td>Invoke the menu item's action.</td>
     *     </tr>
     *     <tr>
     *       <td>Menu</td>
     *       <td><kbd>Swipe Down</kbd></td>
     *       <td>Dismiss the menu, if "swipe to dismiss" is enabled by the application.</td>
     *     </tr>
     *     <tr>
     *       <td>JET Component or HTML Element having a JET Context Menu</td>
     *       <td><kbd>Press & Hold</kbd></td>
     *       <td>Open the context menu.</td>
     *     </tr>
     *     <tr>
     *       <td>Outside of Menu</td>
     *       <td><kbd>Touch</kbd></td>
     *       <td>Close the menu.</td>
     *     </tr>
     *   </tbody>
     * </table>
     *
     * <p>Disabled items do not allow any touch interaction.
     *
     * @ojfragment touchDoc - Used in touch gesture section of classdesc, and standalone gesture doc
     * @memberof oj.ojMenu
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
     *       <td rowspan = "6">Menu Item</td>
     *       <td><kbd>Enter</kbd> or <kbd>Space</kbd></td>
     *       <td>Invoke the focused menu item's action.</td>
     *     </tr>
     *     <tr>
     *       <td><kbd>UpArrow</kbd></td>
     *       <td>Move focus to the previous menu item, wrapping around at the top.</td>
     *     </tr>
     *     <tr>
     *       <td><kbd>DownArrow</kbd></td>
     *       <td>Move focus to the next menu item, wrapping around at the bottom.</td>
     *     </tr>
     *     <tr>
     *       <td><kbd>Home</kbd></td>
     *       <td>Move focus to the first menu item.</td>
     *     </tr>
     *     <tr>
     *       <td><kbd>End</kbd></td>
     *       <td>Move focus to the last menu item.</td>
     *     </tr>
     *     <tr>
     *       <td>Menu Item in Top-level Menu</td>
     *       <td><kbd>Esc</kbd></td>
     *       <td>Close the menu and move focus to the launcher.</td>
     *     </tr>
     *     <tr>
     *       <td>JET Component or HTML Element having a JET Context Menu</td>
     *       <td><kbd>Shift + F10</kbd></td>
     *       <td>Open the context menu.</td>
     *     </tr>
     *   </tbody>
     * </table>
     *
     * <p>* RTL refers to pages written in a right-to-left language such as Arabic.
     *
     * <p>Typing a letter moves focus to the first item whose title starts with that character. Repeating the same character cycles through matching items.
     * Typing more characters within the one second timer matches those characters.
     *
     * <p>Note that the "Search for text when I start typing" feature in Firefox can interfere with web content that accepts keystrokes, such as this "type a letter" feature of JET Menu.
     *
     * <p>Disabled items can receive keyboard focus, but do not allow any other interaction.
     *
     * @ojfragment keyboardDoc - Used in keyboard section of classdesc, and standalone gesture doc
     * @memberof oj.ojMenu
     */
});

//////////////////     SUB-IDS     //////////////////

/**
 * <p>Sub-ID for the <a href="#dismissal-section">"Cancel"</a> menu item.</p>
 *
 * @ojsubid oj-menu-cancel-command
 * @memberof oj.ojMenu
 * @since 2.1.0
 *
 * @example <caption>Get the node for the "Cancel" menu item:</caption>
 * var node = myMenu.getNodeBySubId( {'subId': 'oj-menu-cancel-command'} );
 */

// -----------------------------------------------------------------------------
// "private static members" shared by all menus
// -----------------------------------------------------------------------------

// Array to track all opened menu popups. All the menus opened by Menu Buttons/ Context Menu/using menu.open() and standalone menus having open submenus, will be added to list
// and later will be removed on __dismiss()/_close() on menu popup/standalone menu.
var _openPopupMenus = new Array();

// See usage for explanation.  Can be boolean (doesn't need to be re-entrant int), since
// baseComponent.touchendMousedownThreshold is much less than baseComponent.pressHoldThreshold.
var _contextMenuPressHoldJustEnded = false

/**
 * Key used to store the menu's position object as a jQuery data property.
 * @const
 * @private
 * @type {string}
 */
var _POSITION_DATA = "oj-menu-position";

// Used to suppress focus ring for Mac Safari due to platform repainting bug.
// This returns true for Mac Safari, but not for desktop Chrome, FF, IE11, Edge;
// Mac Chrome, FF; iOS Safari; or Android Chrome.
// Using "Mac" instead of "Macintosh" in this check would return true for Mac
// Safari and iOS Safari, but none of the others.
var _IS_MAC_SAFARI = navigator.userAgent.indexOf("Macintosh") > -1
    && navigator.userAgent.indexOf("Safari") > -1
    && navigator.userAgent.indexOf("Chrome") === -1;

var _config = oj.ThemeUtils.parseJSONFromFontFamily('oj-menu-config') || {};
var _SHEETS_HAVE_CANCEL_ITEM = _config['sheetCancelAffordance'] === "menuItem";
var _SHEETS_HAVE_SWIPE_DOWN_TO_DISMISS = _config['sheetSwipeDownBehavior'] === "dismiss";
var _DROPDOWN_MODALITY = _config['dropDownModality'] || "modeless"; // backward-compatible value
var _SHEET_MODALITY = _config['sheetModality'] || "modal";

// "bottom-0", "bottom-12", or "bottom-10%", per standard JQUI position utility syntax. Put the
// minus on position's "at", not "my", so that %'s (which we're not using, but themers might) are relative to window,
// not menu, thus closer to behavior of using % margin in CSS.  SCSS code comment on our $var says we use "at".
var _SHEET_POSITION_AT = "bottom-" + (_config['sheetMarginBottom'] || 0);

var _HAMMER_OPTIONS = _SHEETS_HAVE_SWIPE_DOWN_TO_DISMISS && {
    "recognizers": [
        [Hammer.Swipe,{ "direction": Hammer["DIRECTION_DOWN"] }]
    ]
};

// media query for when display=="auto"
var _DISPLAY_QUERY = function() {
    // If "display" option is "auto" (the default), then at or above this screen width
    // the option resolves to "dropDown", and below this screen width it resolves to "sheet".
    var dropDownThresholdWidth = _config['dropDownThresholdWidth'];
    if (dropDownThresholdWidth == null)
        dropDownThresholdWidth = "768px"; // min width of "medium" screen size
    var queryString = "(min-width: " + dropDownThresholdWidth + ")";
    return window.matchMedia(queryString);
}();

var _SUBID_CANCEL = 'oj-menu-cancel-command';

}());

(function() {
var ojMenuMeta = {
  "properties": {
    "disabled": {
      "type": "boolean"
    },
    "openOptions": {
      "type": "object",
      "properties": {
        "display": {
          "type": "string",
          "enumValues": ["auto", "dropDown", "sheet"]
        },
        "initialFocus": {
          "type": "string",
          "enumValues": ["firstItem", "menu", "none"]
        },
        "launcher": {
          "type": "string"
        },
        "position": {
          "type": "object",
          "properties": {
            "my": {
              "type": "string|object",
              "properties": {
                "horizontal": {
                  "type": "string",
                  "enumValues": ["start", "end", "left", "center", "right"]
                },
                "vertical": {
                  "type": "string",
                  "enumValues": ["top", "center", "bottom"]
                }
              }
            },
            "at": {
              "type": "string|object",
              "properties": {
                "horizontal": {
                  "type": "string",
                  "enumValues": ["start", "end", "left", "center", "right"]
                },
                "vertical": {
                  "type": "string",
                  "enumValues": ["top", "center", "bottom"]
                }
              }
            },
            "offset": {
              "type": "object",
              "properties": {
                "x": {
                  "type": "number"
                },
                "y": {
                  "type": "number"
                }
              }
            },
            "of": {
              "type": "string|object"
            },
            "collision": {
              "type": "string",
              "enumValues": ["flip", "fit", "flipfit", "flipcenter", "none"]
            }
          }
        },
        "submenuPosition": {
          "type": "object",
          "properties": {
            "my": {
              "type": "object",
              "properties": {
                "horizontal": {
                  "type": "string",
                  "enumValues": ["start", "end", "left", "center", "right"]
                },
                "vertical": {
                  "type": "string",
                  "enumValues": ["top", "center", "bottom"]
                }
              }
            },
            "at": {
              "type": "object",
              "properties": {
                "horizontal": {
                  "type": "string",
                  "enumValues": ["start", "end", "left", "center", "right"]
                },
                "vertical": {
                  "type": "string",
                  "enumValues": ["top", "center", "bottom"]
                }
              }
            },
            "offset": {
              "type": "object",
              "properties": {
                "x": {
                  "type": "number"
                },
                "y": {
                  "type": "number"
                }
              }
            },
            "collision": {
              "type": "string",
              "enumValues": ["flip", "fit", "flipfit", "flipcenter", "none"]
            }
          }
        }
      }
    },
    "translations": {
      "type": "object",
      "properties": {
        "labelCancel": {
          "type": "string"
        }
      }
    }
  },
  "methods": {
    "getSubIdByNode": {},
    "open": {},
    "refresh": {}
  },
  "events": {
    "animateStart" : {},
    "animateEnd" : {},
    "beforeOpen": {},
    "close": {},
    "open": {}
  },
  "extension": {
    _WIDGET_NAME: "ojMenu"
  }
};
oj.CustomElementBridge.registerMetadata('oj-menu', 'baseComponent', ojMenuMeta);
oj.CustomElementBridge.register('oj-menu', {'metadata' : oj.CustomElementBridge.getMetadata('oj-menu')});
})();
});

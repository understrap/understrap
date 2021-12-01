/*!
  * Understrap v1.1.0 (https://understrap.com)
  * Copyright 2013-2021 The UnderStrap Authors (https://github.com/understrap/understrap/graphs/contributors)
  * Licensed under GPL (http://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery')) :
  typeof define === 'function' && define.amd ? define(['exports', 'jquery'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.understrap = {}, global.jQuery));
})(this, (function (exports, $) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var $__default = /*#__PURE__*/_interopDefaultLegacy($);

  /**!
   * @fileOverview Kickass library to create and place poppers near their reference elements.
   * @version 1.16.1
   * @license
   * Copyright (c) 2016 Federico Zivolo and contributors
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */
  var isBrowser$1 = typeof window !== 'undefined' && typeof document !== 'undefined' && typeof navigator !== 'undefined';

  const timeoutDuration$1 = function () {
    const longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
    for (let i = 0; i < longerTimeoutBrowsers.length; i += 1) {
      if (isBrowser$1 && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
        return 1;
      }
    }
    return 0;
  }();

  function microtaskDebounce$1(fn) {
    let called = false;
    return () => {
      if (called) {
        return;
      }
      called = true;
      window.Promise.resolve().then(() => {
        called = false;
        fn();
      });
    };
  }

  function taskDebounce$1(fn) {
    let scheduled = false;
    return () => {
      if (!scheduled) {
        scheduled = true;
        setTimeout(() => {
          scheduled = false;
          fn();
        }, timeoutDuration$1);
      }
    };
  }

  const supportsMicroTasks$1 = isBrowser$1 && window.Promise;

  /**
  * Create a debounced version of a method, that's asynchronously deferred
  * but called in the minimum time possible.
  *
  * @method
  * @memberof Popper.Utils
  * @argument {Function} fn
  * @returns {Function}
  */
  var debounce$1 = supportsMicroTasks$1 ? microtaskDebounce$1 : taskDebounce$1;

  /**
   * Check if the given variable is a function
   * @method
   * @memberof Popper.Utils
   * @argument {Any} functionToCheck - variable to check
   * @returns {Boolean} answer to: is a function?
   */
  function isFunction$1(functionToCheck) {
    const getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
  }

  /**
   * Get CSS computed property of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Eement} element
   * @argument {String} property
   */
  function getStyleComputedProperty$1(element, property) {
    if (element.nodeType !== 1) {
      return [];
    }
    // NOTE: 1 DOM access here
    const window = element.ownerDocument.defaultView;
    const css = window.getComputedStyle(element, null);
    return property ? css[property] : css;
  }

  /**
   * Returns the parentNode or the host of the element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} parent
   */
  function getParentNode$1(element) {
    if (element.nodeName === 'HTML') {
      return element;
    }
    return element.parentNode || element.host;
  }

  /**
   * Returns the scrolling parent of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} scroll parent
   */
  function getScrollParent$1(element) {
    // Return body, `getScroll` will take care to get the correct `scrollTop` from it
    if (!element) {
      return document.body;
    }

    switch (element.nodeName) {
      case 'HTML':
      case 'BODY':
        return element.ownerDocument.body;
      case '#document':
        return element.body;
    }

    // Firefox want us to check `-x` and `-y` variations as well
    const { overflow, overflowX, overflowY } = getStyleComputedProperty$1(element);
    if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
      return element;
    }

    return getScrollParent$1(getParentNode$1(element));
  }

  /**
   * Returns the reference node of the reference object, or the reference object itself.
   * @method
   * @memberof Popper.Utils
   * @param {Element|Object} reference - the reference element (the popper will be relative to this)
   * @returns {Element} parent
   */
  function getReferenceNode$1(reference) {
    return reference && reference.referenceNode ? reference.referenceNode : reference;
  }

  const isIE11$1 = isBrowser$1 && !!(window.MSInputMethodContext && document.documentMode);
  const isIE10$1 = isBrowser$1 && /MSIE 10/.test(navigator.userAgent);

  /**
   * Determines if the browser is Internet Explorer
   * @method
   * @memberof Popper.Utils
   * @param {Number} version to check
   * @returns {Boolean} isIE
   */
  function isIE$1(version) {
    if (version === 11) {
      return isIE11$1;
    }
    if (version === 10) {
      return isIE10$1;
    }
    return isIE11$1 || isIE10$1;
  }

  /**
   * Returns the offset parent of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} offset parent
   */
  function getOffsetParent$1(element) {
    if (!element) {
      return document.documentElement;
    }

    const noOffsetParent = isIE$1(10) ? document.body : null;

    // NOTE: 1 DOM access here
    let offsetParent = element.offsetParent || null;
    // Skip hidden elements which don't have an offsetParent
    while (offsetParent === noOffsetParent && element.nextElementSibling) {
      offsetParent = (element = element.nextElementSibling).offsetParent;
    }

    const nodeName = offsetParent && offsetParent.nodeName;

    if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
      return element ? element.ownerDocument.documentElement : document.documentElement;
    }

    // .offsetParent will return the closest TH, TD or TABLE in case
    // no offsetParent is present, I hate this job...
    if (['TH', 'TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty$1(offsetParent, 'position') === 'static') {
      return getOffsetParent$1(offsetParent);
    }

    return offsetParent;
  }

  function isOffsetContainer$1(element) {
    const { nodeName } = element;
    if (nodeName === 'BODY') {
      return false;
    }
    return nodeName === 'HTML' || getOffsetParent$1(element.firstElementChild) === element;
  }

  /**
   * Finds the root node (document, shadowDOM root) of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} node
   * @returns {Element} root node
   */
  function getRoot$1(node) {
    if (node.parentNode !== null) {
      return getRoot$1(node.parentNode);
    }

    return node;
  }

  /**
   * Finds the offset parent common to the two provided nodes
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element1
   * @argument {Element} element2
   * @returns {Element} common offset parent
   */
  function findCommonOffsetParent$1(element1, element2) {
    // This check is needed to avoid errors in case one of the elements isn't defined for any reason
    if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
      return document.documentElement;
    }

    // Here we make sure to give as "start" the element that comes first in the DOM
    const order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
    const start = order ? element1 : element2;
    const end = order ? element2 : element1;

    // Get common ancestor container
    const range = document.createRange();
    range.setStart(start, 0);
    range.setEnd(end, 0);
    const { commonAncestorContainer } = range;

    // Both nodes are inside #document
    if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
      if (isOffsetContainer$1(commonAncestorContainer)) {
        return commonAncestorContainer;
      }

      return getOffsetParent$1(commonAncestorContainer);
    }

    // one of the nodes is inside shadowDOM, find which one
    const element1root = getRoot$1(element1);
    if (element1root.host) {
      return findCommonOffsetParent$1(element1root.host, element2);
    } else {
      return findCommonOffsetParent$1(element1, getRoot$1(element2).host);
    }
  }

  /**
   * Gets the scroll value of the given element in the given side (top and left)
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @argument {String} side `top` or `left`
   * @returns {number} amount of scrolled pixels
   */
  function getScroll$1(element, side = 'top') {
    const upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
    const nodeName = element.nodeName;

    if (nodeName === 'BODY' || nodeName === 'HTML') {
      const html = element.ownerDocument.documentElement;
      const scrollingElement = element.ownerDocument.scrollingElement || html;
      return scrollingElement[upperSide];
    }

    return element[upperSide];
  }

  /*
   * Sum or subtract the element scroll values (left and top) from a given rect object
   * @method
   * @memberof Popper.Utils
   * @param {Object} rect - Rect object you want to change
   * @param {HTMLElement} element - The element from the function reads the scroll values
   * @param {Boolean} subtract - set to true if you want to subtract the scroll values
   * @return {Object} rect - The modifier rect object
   */
  function includeScroll$1(rect, element, subtract = false) {
    const scrollTop = getScroll$1(element, 'top');
    const scrollLeft = getScroll$1(element, 'left');
    const modifier = subtract ? -1 : 1;
    rect.top += scrollTop * modifier;
    rect.bottom += scrollTop * modifier;
    rect.left += scrollLeft * modifier;
    rect.right += scrollLeft * modifier;
    return rect;
  }

  /*
   * Helper to detect borders of a given element
   * @method
   * @memberof Popper.Utils
   * @param {CSSStyleDeclaration} styles
   * Result of `getStyleComputedProperty` on the given element
   * @param {String} axis - `x` or `y`
   * @return {number} borders - The borders size of the given axis
   */

  function getBordersSize$1(styles, axis) {
    const sideA = axis === 'x' ? 'Left' : 'Top';
    const sideB = sideA === 'Left' ? 'Right' : 'Bottom';

    return parseFloat(styles[`border${sideA}Width`]) + parseFloat(styles[`border${sideB}Width`]);
  }

  function getSize$1(axis, body, html, computedStyle) {
    return Math.max(body[`offset${axis}`], body[`scroll${axis}`], html[`client${axis}`], html[`offset${axis}`], html[`scroll${axis}`], isIE$1(10) ? parseInt(html[`offset${axis}`]) + parseInt(computedStyle[`margin${axis === 'Height' ? 'Top' : 'Left'}`]) + parseInt(computedStyle[`margin${axis === 'Height' ? 'Bottom' : 'Right'}`]) : 0);
  }

  function getWindowSizes$1(document) {
    const body = document.body;
    const html = document.documentElement;
    const computedStyle = isIE$1(10) && getComputedStyle(html);

    return {
      height: getSize$1('Height', body, html, computedStyle),
      width: getSize$1('Width', body, html, computedStyle)
    };
  }

  var _extends$1 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  /**
   * Given element offsets, generate an output similar to getBoundingClientRect
   * @method
   * @memberof Popper.Utils
   * @argument {Object} offsets
   * @returns {Object} ClientRect like output
   */
  function getClientRect$1(offsets) {
    return _extends$1({}, offsets, {
      right: offsets.left + offsets.width,
      bottom: offsets.top + offsets.height
    });
  }

  /**
   * Get bounding client rect of given element
   * @method
   * @memberof Popper.Utils
   * @param {HTMLElement} element
   * @return {Object} client rect
   */
  function getBoundingClientRect$1(element) {
    let rect = {};

    // IE10 10 FIX: Please, don't ask, the element isn't
    // considered in DOM in some circumstances...
    // This isn't reproducible in IE10 compatibility mode of IE11
    try {
      if (isIE$1(10)) {
        rect = element.getBoundingClientRect();
        const scrollTop = getScroll$1(element, 'top');
        const scrollLeft = getScroll$1(element, 'left');
        rect.top += scrollTop;
        rect.left += scrollLeft;
        rect.bottom += scrollTop;
        rect.right += scrollLeft;
      } else {
        rect = element.getBoundingClientRect();
      }
    } catch (e) {}

    const result = {
      left: rect.left,
      top: rect.top,
      width: rect.right - rect.left,
      height: rect.bottom - rect.top
    };

    // subtract scrollbar size from sizes
    const sizes = element.nodeName === 'HTML' ? getWindowSizes$1(element.ownerDocument) : {};
    const width = sizes.width || element.clientWidth || result.width;
    const height = sizes.height || element.clientHeight || result.height;

    let horizScrollbar = element.offsetWidth - width;
    let vertScrollbar = element.offsetHeight - height;

    // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
    // we make this check conditional for performance reasons
    if (horizScrollbar || vertScrollbar) {
      const styles = getStyleComputedProperty$1(element);
      horizScrollbar -= getBordersSize$1(styles, 'x');
      vertScrollbar -= getBordersSize$1(styles, 'y');

      result.width -= horizScrollbar;
      result.height -= vertScrollbar;
    }

    return getClientRect$1(result);
  }

  function getOffsetRectRelativeToArbitraryNode$1(children, parent, fixedPosition = false) {
    const isIE10 = isIE$1(10);
    const isHTML = parent.nodeName === 'HTML';
    const childrenRect = getBoundingClientRect$1(children);
    const parentRect = getBoundingClientRect$1(parent);
    const scrollParent = getScrollParent$1(children);

    const styles = getStyleComputedProperty$1(parent);
    const borderTopWidth = parseFloat(styles.borderTopWidth);
    const borderLeftWidth = parseFloat(styles.borderLeftWidth);

    // In cases where the parent is fixed, we must ignore negative scroll in offset calc
    if (fixedPosition && isHTML) {
      parentRect.top = Math.max(parentRect.top, 0);
      parentRect.left = Math.max(parentRect.left, 0);
    }
    let offsets = getClientRect$1({
      top: childrenRect.top - parentRect.top - borderTopWidth,
      left: childrenRect.left - parentRect.left - borderLeftWidth,
      width: childrenRect.width,
      height: childrenRect.height
    });
    offsets.marginTop = 0;
    offsets.marginLeft = 0;

    // Subtract margins of documentElement in case it's being used as parent
    // we do this only on HTML because it's the only element that behaves
    // differently when margins are applied to it. The margins are included in
    // the box of the documentElement, in the other cases not.
    if (!isIE10 && isHTML) {
      const marginTop = parseFloat(styles.marginTop);
      const marginLeft = parseFloat(styles.marginLeft);

      offsets.top -= borderTopWidth - marginTop;
      offsets.bottom -= borderTopWidth - marginTop;
      offsets.left -= borderLeftWidth - marginLeft;
      offsets.right -= borderLeftWidth - marginLeft;

      // Attach marginTop and marginLeft because in some circumstances we may need them
      offsets.marginTop = marginTop;
      offsets.marginLeft = marginLeft;
    }

    if (isIE10 && !fixedPosition ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
      offsets = includeScroll$1(offsets, parent);
    }

    return offsets;
  }

  function getViewportOffsetRectRelativeToArtbitraryNode$1(element, excludeScroll = false) {
    const html = element.ownerDocument.documentElement;
    const relativeOffset = getOffsetRectRelativeToArbitraryNode$1(element, html);
    const width = Math.max(html.clientWidth, window.innerWidth || 0);
    const height = Math.max(html.clientHeight, window.innerHeight || 0);

    const scrollTop = !excludeScroll ? getScroll$1(html) : 0;
    const scrollLeft = !excludeScroll ? getScroll$1(html, 'left') : 0;

    const offset = {
      top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
      left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
      width,
      height
    };

    return getClientRect$1(offset);
  }

  /**
   * Check if the given element is fixed or is inside a fixed parent
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @argument {Element} customContainer
   * @returns {Boolean} answer to "isFixed?"
   */
  function isFixed$1(element) {
    const nodeName = element.nodeName;
    if (nodeName === 'BODY' || nodeName === 'HTML') {
      return false;
    }
    if (getStyleComputedProperty$1(element, 'position') === 'fixed') {
      return true;
    }
    const parentNode = getParentNode$1(element);
    if (!parentNode) {
      return false;
    }
    return isFixed$1(parentNode);
  }

  /**
   * Finds the first parent of an element that has a transformed property defined
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} first transformed parent or documentElement
   */

  function getFixedPositionOffsetParent$1(element) {
    // This check is needed to avoid errors in case one of the elements isn't defined for any reason
    if (!element || !element.parentElement || isIE$1()) {
      return document.documentElement;
    }
    let el = element.parentElement;
    while (el && getStyleComputedProperty$1(el, 'transform') === 'none') {
      el = el.parentElement;
    }
    return el || document.documentElement;
  }

  /**
   * Computed the boundaries limits and return them
   * @method
   * @memberof Popper.Utils
   * @param {HTMLElement} popper
   * @param {HTMLElement} reference
   * @param {number} padding
   * @param {HTMLElement} boundariesElement - Element used to define the boundaries
   * @param {Boolean} fixedPosition - Is in fixed position mode
   * @returns {Object} Coordinates of the boundaries
   */
  function getBoundaries$1(popper, reference, padding, boundariesElement, fixedPosition = false) {
    // NOTE: 1 DOM access here

    let boundaries = { top: 0, left: 0 };
    const offsetParent = fixedPosition ? getFixedPositionOffsetParent$1(popper) : findCommonOffsetParent$1(popper, getReferenceNode$1(reference));

    // Handle viewport case
    if (boundariesElement === 'viewport') {
      boundaries = getViewportOffsetRectRelativeToArtbitraryNode$1(offsetParent, fixedPosition);
    } else {
      // Handle other cases based on DOM element used as boundaries
      let boundariesNode;
      if (boundariesElement === 'scrollParent') {
        boundariesNode = getScrollParent$1(getParentNode$1(reference));
        if (boundariesNode.nodeName === 'BODY') {
          boundariesNode = popper.ownerDocument.documentElement;
        }
      } else if (boundariesElement === 'window') {
        boundariesNode = popper.ownerDocument.documentElement;
      } else {
        boundariesNode = boundariesElement;
      }

      const offsets = getOffsetRectRelativeToArbitraryNode$1(boundariesNode, offsetParent, fixedPosition);

      // In case of HTML, we need a different computation
      if (boundariesNode.nodeName === 'HTML' && !isFixed$1(offsetParent)) {
        const { height, width } = getWindowSizes$1(popper.ownerDocument);
        boundaries.top += offsets.top - offsets.marginTop;
        boundaries.bottom = height + offsets.top;
        boundaries.left += offsets.left - offsets.marginLeft;
        boundaries.right = width + offsets.left;
      } else {
        // for all the other DOM elements, this one is good
        boundaries = offsets;
      }
    }

    // Add paddings
    padding = padding || 0;
    const isPaddingNumber = typeof padding === 'number';
    boundaries.left += isPaddingNumber ? padding : padding.left || 0;
    boundaries.top += isPaddingNumber ? padding : padding.top || 0;
    boundaries.right -= isPaddingNumber ? padding : padding.right || 0;
    boundaries.bottom -= isPaddingNumber ? padding : padding.bottom || 0;

    return boundaries;
  }

  function getArea$1({ width, height }) {
    return width * height;
  }

  /**
   * Utility used to transform the `auto` placement to the placement with more
   * available space.
   * @method
   * @memberof Popper.Utils
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function computeAutoPlacement$1(placement, refRect, popper, reference, boundariesElement, padding = 0) {
    if (placement.indexOf('auto') === -1) {
      return placement;
    }

    const boundaries = getBoundaries$1(popper, reference, padding, boundariesElement);

    const rects = {
      top: {
        width: boundaries.width,
        height: refRect.top - boundaries.top
      },
      right: {
        width: boundaries.right - refRect.right,
        height: boundaries.height
      },
      bottom: {
        width: boundaries.width,
        height: boundaries.bottom - refRect.bottom
      },
      left: {
        width: refRect.left - boundaries.left,
        height: boundaries.height
      }
    };

    const sortedAreas = Object.keys(rects).map(key => _extends$1({
      key
    }, rects[key], {
      area: getArea$1(rects[key])
    })).sort((a, b) => b.area - a.area);

    const filteredAreas = sortedAreas.filter(({ width, height }) => width >= popper.clientWidth && height >= popper.clientHeight);

    const computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;

    const variation = placement.split('-')[1];

    return computedPlacement + (variation ? `-${variation}` : '');
  }

  /**
   * Get offsets to the reference element
   * @method
   * @memberof Popper.Utils
   * @param {Object} state
   * @param {Element} popper - the popper element
   * @param {Element} reference - the reference element (the popper will be relative to this)
   * @param {Element} fixedPosition - is in fixed position mode
   * @returns {Object} An object containing the offsets which will be applied to the popper
   */
  function getReferenceOffsets$1(state, popper, reference, fixedPosition = null) {
    const commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent$1(popper) : findCommonOffsetParent$1(popper, getReferenceNode$1(reference));
    return getOffsetRectRelativeToArbitraryNode$1(reference, commonOffsetParent, fixedPosition);
  }

  /**
   * Get the outer sizes of the given element (offset size + margins)
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Object} object containing width and height properties
   */
  function getOuterSizes$1(element) {
    const window = element.ownerDocument.defaultView;
    const styles = window.getComputedStyle(element);
    const x = parseFloat(styles.marginTop || 0) + parseFloat(styles.marginBottom || 0);
    const y = parseFloat(styles.marginLeft || 0) + parseFloat(styles.marginRight || 0);
    const result = {
      width: element.offsetWidth + y,
      height: element.offsetHeight + x
    };
    return result;
  }

  /**
   * Get the opposite placement of the given one
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement
   * @returns {String} flipped placement
   */
  function getOppositePlacement$1(placement) {
    const hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
    return placement.replace(/left|right|bottom|top/g, matched => hash[matched]);
  }

  /**
   * Get offsets to the popper
   * @method
   * @memberof Popper.Utils
   * @param {Object} position - CSS position the Popper will get applied
   * @param {HTMLElement} popper - the popper element
   * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
   * @param {String} placement - one of the valid placement options
   * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
   */
  function getPopperOffsets$1(popper, referenceOffsets, placement) {
    placement = placement.split('-')[0];

    // Get popper node sizes
    const popperRect = getOuterSizes$1(popper);

    // Add position, width and height to our offsets object
    const popperOffsets = {
      width: popperRect.width,
      height: popperRect.height
    };

    // depending by the popper placement we have to compute its offsets slightly differently
    const isHoriz = ['right', 'left'].indexOf(placement) !== -1;
    const mainSide = isHoriz ? 'top' : 'left';
    const secondarySide = isHoriz ? 'left' : 'top';
    const measurement = isHoriz ? 'height' : 'width';
    const secondaryMeasurement = !isHoriz ? 'height' : 'width';

    popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
    if (placement === secondarySide) {
      popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
    } else {
      popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement$1(secondarySide)];
    }

    return popperOffsets;
  }

  /**
   * Mimics the `find` method of Array
   * @method
   * @memberof Popper.Utils
   * @argument {Array} arr
   * @argument prop
   * @argument value
   * @returns index or -1
   */
  function find$1(arr, check) {
    // use native find if supported
    if (Array.prototype.find) {
      return arr.find(check);
    }

    // use `filter` to obtain the same behavior of `find`
    return arr.filter(check)[0];
  }

  /**
   * Return the index of the matching object
   * @method
   * @memberof Popper.Utils
   * @argument {Array} arr
   * @argument prop
   * @argument value
   * @returns index or -1
   */
  function findIndex$1(arr, prop, value) {
    // use native findIndex if supported
    if (Array.prototype.findIndex) {
      return arr.findIndex(cur => cur[prop] === value);
    }

    // use `find` + `indexOf` if `findIndex` isn't supported
    const match = find$1(arr, obj => obj[prop] === value);
    return arr.indexOf(match);
  }

  /**
   * Loop trough the list of modifiers and run them in order,
   * each of them will then edit the data object.
   * @method
   * @memberof Popper.Utils
   * @param {dataObject} data
   * @param {Array} modifiers
   * @param {String} ends - Optional modifier name used as stopper
   * @returns {dataObject}
   */
  function runModifiers$1(modifiers, data, ends) {
    const modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex$1(modifiers, 'name', ends));

    modifiersToRun.forEach(modifier => {
      if (modifier['function']) {
        // eslint-disable-line dot-notation
        console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
      }
      const fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation
      if (modifier.enabled && isFunction$1(fn)) {
        // Add properties to offsets to make them a complete clientRect object
        // we do this before each modifier to make sure the previous one doesn't
        // mess with these values
        data.offsets.popper = getClientRect$1(data.offsets.popper);
        data.offsets.reference = getClientRect$1(data.offsets.reference);

        data = fn(data, modifier);
      }
    });

    return data;
  }

  /**
   * Updates the position of the popper, computing the new offsets and applying
   * the new style.<br />
   * Prefer `scheduleUpdate` over `update` because of performance reasons.
   * @method
   * @memberof Popper
   */
  function update$1() {
    // if popper is destroyed, don't perform any further update
    if (this.state.isDestroyed) {
      return;
    }

    let data = {
      instance: this,
      styles: {},
      arrowStyles: {},
      attributes: {},
      flipped: false,
      offsets: {}
    };

    // compute reference element offsets
    data.offsets.reference = getReferenceOffsets$1(this.state, this.popper, this.reference, this.options.positionFixed);

    // compute auto placement, store placement inside the data object,
    // modifiers will be able to edit `placement` if needed
    // and refer to originalPlacement to know the original value
    data.placement = computeAutoPlacement$1(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);

    // store the computed placement inside `originalPlacement`
    data.originalPlacement = data.placement;

    data.positionFixed = this.options.positionFixed;

    // compute the popper offsets
    data.offsets.popper = getPopperOffsets$1(this.popper, data.offsets.reference, data.placement);

    data.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute';

    // run the modifiers
    data = runModifiers$1(this.modifiers, data);

    // the first `update` will call `onCreate` callback
    // the other ones will call `onUpdate` callback
    if (!this.state.isCreated) {
      this.state.isCreated = true;
      this.options.onCreate(data);
    } else {
      this.options.onUpdate(data);
    }
  }

  /**
   * Helper used to know if the given modifier is enabled.
   * @method
   * @memberof Popper.Utils
   * @returns {Boolean}
   */
  function isModifierEnabled$1(modifiers, modifierName) {
    return modifiers.some(({ name, enabled }) => enabled && name === modifierName);
  }

  /**
   * Get the prefixed supported property name
   * @method
   * @memberof Popper.Utils
   * @argument {String} property (camelCase)
   * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
   */
  function getSupportedPropertyName$1(property) {
    const prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
    const upperProp = property.charAt(0).toUpperCase() + property.slice(1);

    for (let i = 0; i < prefixes.length; i++) {
      const prefix = prefixes[i];
      const toCheck = prefix ? `${prefix}${upperProp}` : property;
      if (typeof document.body.style[toCheck] !== 'undefined') {
        return toCheck;
      }
    }
    return null;
  }

  /**
   * Destroys the popper.
   * @method
   * @memberof Popper
   */
  function destroy$1() {
    this.state.isDestroyed = true;

    // touch DOM only if `applyStyle` modifier is enabled
    if (isModifierEnabled$1(this.modifiers, 'applyStyle')) {
      this.popper.removeAttribute('x-placement');
      this.popper.style.position = '';
      this.popper.style.top = '';
      this.popper.style.left = '';
      this.popper.style.right = '';
      this.popper.style.bottom = '';
      this.popper.style.willChange = '';
      this.popper.style[getSupportedPropertyName$1('transform')] = '';
    }

    this.disableEventListeners();

    // remove the popper if user explicitly asked for the deletion on destroy
    // do not use `remove` because IE11 doesn't support it
    if (this.options.removeOnDestroy) {
      this.popper.parentNode.removeChild(this.popper);
    }
    return this;
  }

  /**
   * Get the window associated with the element
   * @argument {Element} element
   * @returns {Window}
   */
  function getWindow$1(element) {
    const ownerDocument = element.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView : window;
  }

  function attachToScrollParents$1(scrollParent, event, callback, scrollParents) {
    const isBody = scrollParent.nodeName === 'BODY';
    const target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
    target.addEventListener(event, callback, { passive: true });

    if (!isBody) {
      attachToScrollParents$1(getScrollParent$1(target.parentNode), event, callback, scrollParents);
    }
    scrollParents.push(target);
  }

  /**
   * Setup needed event listeners used to update the popper position
   * @method
   * @memberof Popper.Utils
   * @private
   */
  function setupEventListeners$1(reference, options, state, updateBound) {
    // Resize event listener on window
    state.updateBound = updateBound;
    getWindow$1(reference).addEventListener('resize', state.updateBound, { passive: true });

    // Scroll event listener on scroll parents
    const scrollElement = getScrollParent$1(reference);
    attachToScrollParents$1(scrollElement, 'scroll', state.updateBound, state.scrollParents);
    state.scrollElement = scrollElement;
    state.eventsEnabled = true;

    return state;
  }

  /**
   * It will add resize/scroll events and start recalculating
   * position of the popper element when they are triggered.
   * @method
   * @memberof Popper
   */
  function enableEventListeners$1() {
    if (!this.state.eventsEnabled) {
      this.state = setupEventListeners$1(this.reference, this.options, this.state, this.scheduleUpdate);
    }
  }

  /**
   * Remove event listeners used to update the popper position
   * @method
   * @memberof Popper.Utils
   * @private
   */
  function removeEventListeners$1(reference, state) {
    // Remove resize event listener on window
    getWindow$1(reference).removeEventListener('resize', state.updateBound);

    // Remove scroll event listener on scroll parents
    state.scrollParents.forEach(target => {
      target.removeEventListener('scroll', state.updateBound);
    });

    // Reset state
    state.updateBound = null;
    state.scrollParents = [];
    state.scrollElement = null;
    state.eventsEnabled = false;
    return state;
  }

  /**
   * It will remove resize/scroll events and won't recalculate popper position
   * when they are triggered. It also won't trigger `onUpdate` callback anymore,
   * unless you call `update` method manually.
   * @method
   * @memberof Popper
   */
  function disableEventListeners$1() {
    if (this.state.eventsEnabled) {
      cancelAnimationFrame(this.scheduleUpdate);
      this.state = removeEventListeners$1(this.reference, this.state);
    }
  }

  /**
   * Tells if a given input is a number
   * @method
   * @memberof Popper.Utils
   * @param {*} input to check
   * @return {Boolean}
   */
  function isNumeric$1(n) {
    return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
  }

  /**
   * Set the style to the given popper
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element - Element to apply the style to
   * @argument {Object} styles
   * Object with a list of properties and values which will be applied to the element
   */
  function setStyles$1(element, styles) {
    Object.keys(styles).forEach(prop => {
      let unit = '';
      // add unit if the value is numeric and is one of the following
      if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric$1(styles[prop])) {
        unit = 'px';
      }
      element.style[prop] = styles[prop] + unit;
    });
  }

  /**
   * Set the attributes to the given popper
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element - Element to apply the attributes to
   * @argument {Object} styles
   * Object with a list of properties and values which will be applied to the element
   */
  function setAttributes$1(element, attributes) {
    Object.keys(attributes).forEach(function (prop) {
      const value = attributes[prop];
      if (value !== false) {
        element.setAttribute(prop, attributes[prop]);
      } else {
        element.removeAttribute(prop);
      }
    });
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} data.styles - List of style properties - values to apply to popper element
   * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The same data object
   */
  function applyStyle$1(data) {
    // any property present in `data.styles` will be applied to the popper,
    // in this way we can make the 3rd party modifiers add custom styles to it
    // Be aware, modifiers could override the properties defined in the previous
    // lines of this modifier!
    setStyles$1(data.instance.popper, data.styles);

    // any property present in `data.attributes` will be applied to the popper,
    // they will be set as HTML attributes of the element
    setAttributes$1(data.instance.popper, data.attributes);

    // if arrowElement is defined and arrowStyles has some properties
    if (data.arrowElement && Object.keys(data.arrowStyles).length) {
      setStyles$1(data.arrowElement, data.arrowStyles);
    }

    return data;
  }

  /**
   * Set the x-placement attribute before everything else because it could be used
   * to add margins to the popper margins needs to be calculated to get the
   * correct popper offsets.
   * @method
   * @memberof Popper.modifiers
   * @param {HTMLElement} reference - The reference element used to position the popper
   * @param {HTMLElement} popper - The HTML element used as popper
   * @param {Object} options - Popper.js options
   */
  function applyStyleOnLoad$1(reference, popper, options, modifierOptions, state) {
    // compute reference element offsets
    const referenceOffsets = getReferenceOffsets$1(state, popper, reference, options.positionFixed);

    // compute auto placement, store placement inside the data object,
    // modifiers will be able to edit `placement` if needed
    // and refer to originalPlacement to know the original value
    const placement = computeAutoPlacement$1(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);

    popper.setAttribute('x-placement', placement);

    // Apply `position` to popper before anything else because
    // without the position applied we can't guarantee correct computations
    setStyles$1(popper, { position: options.positionFixed ? 'fixed' : 'absolute' });

    return options;
  }

  /**
   * @function
   * @memberof Popper.Utils
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Boolean} shouldRound - If the offsets should be rounded at all
   * @returns {Object} The popper's position offsets rounded
   *
   * The tale of pixel-perfect positioning. It's still not 100% perfect, but as
   * good as it can be within reason.
   * Discussion here: https://github.com/FezVrasta/popper.js/pull/715
   *
   * Low DPI screens cause a popper to be blurry if not using full pixels (Safari
   * as well on High DPI screens).
   *
   * Firefox prefers no rounding for positioning and does not have blurriness on
   * high DPI screens.
   *
   * Only horizontal placement and left/right values need to be considered.
   */
  function getRoundedOffsets$1(data, shouldRound) {
    const { popper, reference } = data.offsets;
    const { round, floor } = Math;
    const noRound = v => v;

    const referenceWidth = round(reference.width);
    const popperWidth = round(popper.width);

    const isVertical = ['left', 'right'].indexOf(data.placement) !== -1;
    const isVariation = data.placement.indexOf('-') !== -1;
    const sameWidthParity = referenceWidth % 2 === popperWidth % 2;
    const bothOddWidth = referenceWidth % 2 === 1 && popperWidth % 2 === 1;

    const horizontalToInteger = !shouldRound ? noRound : isVertical || isVariation || sameWidthParity ? round : floor;
    const verticalToInteger = !shouldRound ? noRound : round;

    return {
      left: horizontalToInteger(bothOddWidth && !isVariation && shouldRound ? popper.left - 1 : popper.left),
      top: verticalToInteger(popper.top),
      bottom: verticalToInteger(popper.bottom),
      right: horizontalToInteger(popper.right)
    };
  }

  const isFirefox$1 = isBrowser$1 && /Firefox/i.test(navigator.userAgent);

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function computeStyle$1(data, options) {
    const { x, y } = options;
    const { popper } = data.offsets;

    // Remove this legacy support in Popper.js v2
    const legacyGpuAccelerationOption = find$1(data.instance.modifiers, modifier => modifier.name === 'applyStyle').gpuAcceleration;
    if (legacyGpuAccelerationOption !== undefined) {
      console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
    }
    const gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;

    const offsetParent = getOffsetParent$1(data.instance.popper);
    const offsetParentRect = getBoundingClientRect$1(offsetParent);

    // Styles
    const styles = {
      position: popper.position
    };

    const offsets = getRoundedOffsets$1(data, window.devicePixelRatio < 2 || !isFirefox$1);

    const sideA = x === 'bottom' ? 'top' : 'bottom';
    const sideB = y === 'right' ? 'left' : 'right';

    // if gpuAcceleration is set to `true` and transform is supported,
    //  we use `translate3d` to apply the position to the popper we
    // automatically use the supported prefixed version if needed
    const prefixedProperty = getSupportedPropertyName$1('transform');

    // now, let's make a step back and look at this code closely (wtf?)
    // If the content of the popper grows once it's been positioned, it
    // may happen that the popper gets misplaced because of the new content
    // overflowing its reference element
    // To avoid this problem, we provide two options (x and y), which allow
    // the consumer to define the offset origin.
    // If we position a popper on top of a reference element, we can set
    // `x` to `top` to make the popper grow towards its top instead of
    // its bottom.
    let left, top;
    if (sideA === 'bottom') {
      // when offsetParent is <html> the positioning is relative to the bottom of the screen (excluding the scrollbar)
      // and not the bottom of the html element
      if (offsetParent.nodeName === 'HTML') {
        top = -offsetParent.clientHeight + offsets.bottom;
      } else {
        top = -offsetParentRect.height + offsets.bottom;
      }
    } else {
      top = offsets.top;
    }
    if (sideB === 'right') {
      if (offsetParent.nodeName === 'HTML') {
        left = -offsetParent.clientWidth + offsets.right;
      } else {
        left = -offsetParentRect.width + offsets.right;
      }
    } else {
      left = offsets.left;
    }
    if (gpuAcceleration && prefixedProperty) {
      styles[prefixedProperty] = `translate3d(${left}px, ${top}px, 0)`;
      styles[sideA] = 0;
      styles[sideB] = 0;
      styles.willChange = 'transform';
    } else {
      // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
      const invertTop = sideA === 'bottom' ? -1 : 1;
      const invertLeft = sideB === 'right' ? -1 : 1;
      styles[sideA] = top * invertTop;
      styles[sideB] = left * invertLeft;
      styles.willChange = `${sideA}, ${sideB}`;
    }

    // Attributes
    const attributes = {
      'x-placement': data.placement
    };

    // Update `data` attributes, styles and arrowStyles
    data.attributes = _extends$1({}, attributes, data.attributes);
    data.styles = _extends$1({}, styles, data.styles);
    data.arrowStyles = _extends$1({}, data.offsets.arrow, data.arrowStyles);

    return data;
  }

  /**
   * Helper used to know if the given modifier depends from another one.<br />
   * It checks if the needed modifier is listed and enabled.
   * @method
   * @memberof Popper.Utils
   * @param {Array} modifiers - list of modifiers
   * @param {String} requestingName - name of requesting modifier
   * @param {String} requestedName - name of requested modifier
   * @returns {Boolean}
   */
  function isModifierRequired$1(modifiers, requestingName, requestedName) {
    const requesting = find$1(modifiers, ({ name }) => name === requestingName);

    const isRequired = !!requesting && modifiers.some(modifier => {
      return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
    });

    if (!isRequired) {
      const requesting = `\`${requestingName}\``;
      const requested = `\`${requestedName}\``;
      console.warn(`${requested} modifier is required by ${requesting} modifier in order to work, be sure to include it before ${requesting}!`);
    }
    return isRequired;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function arrow$1(data, options) {
    // arrow depends on keepTogether in order to work
    if (!isModifierRequired$1(data.instance.modifiers, 'arrow', 'keepTogether')) {
      return data;
    }

    let arrowElement = options.element;

    // if arrowElement is a string, suppose it's a CSS selector
    if (typeof arrowElement === 'string') {
      arrowElement = data.instance.popper.querySelector(arrowElement);

      // if arrowElement is not found, don't run the modifier
      if (!arrowElement) {
        return data;
      }
    } else {
      // if the arrowElement isn't a query selector we must check that the
      // provided DOM node is child of its popper node
      if (!data.instance.popper.contains(arrowElement)) {
        console.warn('WARNING: `arrow.element` must be child of its popper element!');
        return data;
      }
    }

    const placement = data.placement.split('-')[0];
    const { popper, reference } = data.offsets;
    const isVertical = ['left', 'right'].indexOf(placement) !== -1;

    const len = isVertical ? 'height' : 'width';
    const sideCapitalized = isVertical ? 'Top' : 'Left';
    const side = sideCapitalized.toLowerCase();
    const altSide = isVertical ? 'left' : 'top';
    const opSide = isVertical ? 'bottom' : 'right';
    const arrowElementSize = getOuterSizes$1(arrowElement)[len];

    //
    // extends keepTogether behavior making sure the popper and its
    // reference have enough pixels in conjunction
    //

    // top/left side
    if (reference[opSide] - arrowElementSize < popper[side]) {
      data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
    }
    // bottom/right side
    if (reference[side] + arrowElementSize > popper[opSide]) {
      data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
    }
    data.offsets.popper = getClientRect$1(data.offsets.popper);

    // compute center of the popper
    const center = reference[side] + reference[len] / 2 - arrowElementSize / 2;

    // Compute the sideValue using the updated popper offsets
    // take popper margin in account because we don't have this info available
    const css = getStyleComputedProperty$1(data.instance.popper);
    const popperMarginSide = parseFloat(css[`margin${sideCapitalized}`]);
    const popperBorderSide = parseFloat(css[`border${sideCapitalized}Width`]);
    let sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide;

    // prevent arrowElement from being placed not contiguously to its popper
    sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);

    data.arrowElement = arrowElement;
    data.offsets.arrow = {
      [side]: Math.round(sideValue),
      [altSide]: '' // make sure to unset any eventual altSide value from the DOM node
    };

    return data;
  }

  /**
   * Get the opposite placement variation of the given one
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement variation
   * @returns {String} flipped placement variation
   */
  function getOppositeVariation$1(variation) {
    if (variation === 'end') {
      return 'start';
    } else if (variation === 'start') {
      return 'end';
    }
    return variation;
  }

  /**
   * List of accepted placements to use as values of the `placement` option.<br />
   * Valid placements are:
   * - `auto`
   * - `top`
   * - `right`
   * - `bottom`
   * - `left`
   *
   * Each placement can have a variation from this list:
   * - `-start`
   * - `-end`
   *
   * Variations are interpreted easily if you think of them as the left to right
   * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
   * is right.<br />
   * Vertically (`left` and `right`), `start` is top and `end` is bottom.
   *
   * Some valid examples are:
   * - `top-end` (on top of reference, right aligned)
   * - `right-start` (on right of reference, top aligned)
   * - `bottom` (on bottom, centered)
   * - `auto-end` (on the side with more space available, alignment depends by placement)
   *
   * @static
   * @type {Array}
   * @enum {String}
   * @readonly
   * @method placements
   * @memberof Popper
   */
  var placements$1 = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];

  // Get rid of `auto` `auto-start` and `auto-end`
  const validPlacements$1 = placements$1.slice(3);

  /**
   * Given an initial placement, returns all the subsequent placements
   * clockwise (or counter-clockwise).
   *
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement - A valid placement (it accepts variations)
   * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
   * @returns {Array} placements including their variations
   */
  function clockwise$1(placement, counter = false) {
    const index = validPlacements$1.indexOf(placement);
    const arr = validPlacements$1.slice(index + 1).concat(validPlacements$1.slice(0, index));
    return counter ? arr.reverse() : arr;
  }

  const BEHAVIORS$1 = {
    FLIP: 'flip',
    CLOCKWISE: 'clockwise',
    COUNTERCLOCKWISE: 'counterclockwise'
  };

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function flip$1(data, options) {
    // if `inner` modifier is enabled, we can't use the `flip` modifier
    if (isModifierEnabled$1(data.instance.modifiers, 'inner')) {
      return data;
    }

    if (data.flipped && data.placement === data.originalPlacement) {
      // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
      return data;
    }

    const boundaries = getBoundaries$1(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement, data.positionFixed);

    let placement = data.placement.split('-')[0];
    let placementOpposite = getOppositePlacement$1(placement);
    let variation = data.placement.split('-')[1] || '';

    let flipOrder = [];

    switch (options.behavior) {
      case BEHAVIORS$1.FLIP:
        flipOrder = [placement, placementOpposite];
        break;
      case BEHAVIORS$1.CLOCKWISE:
        flipOrder = clockwise$1(placement);
        break;
      case BEHAVIORS$1.COUNTERCLOCKWISE:
        flipOrder = clockwise$1(placement, true);
        break;
      default:
        flipOrder = options.behavior;
    }

    flipOrder.forEach((step, index) => {
      if (placement !== step || flipOrder.length === index + 1) {
        return data;
      }

      placement = data.placement.split('-')[0];
      placementOpposite = getOppositePlacement$1(placement);

      const popperOffsets = data.offsets.popper;
      const refOffsets = data.offsets.reference;

      // using floor because the reference offsets may contain decimals we are not going to consider here
      const floor = Math.floor;
      const overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);

      const overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
      const overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
      const overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
      const overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);

      const overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;

      // flip the variation if required
      const isVertical = ['top', 'bottom'].indexOf(placement) !== -1;

      // flips variation if reference element overflows boundaries
      const flippedVariationByRef = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

      // flips variation if popper content overflows boundaries
      const flippedVariationByContent = !!options.flipVariationsByContent && (isVertical && variation === 'start' && overflowsRight || isVertical && variation === 'end' && overflowsLeft || !isVertical && variation === 'start' && overflowsBottom || !isVertical && variation === 'end' && overflowsTop);

      const flippedVariation = flippedVariationByRef || flippedVariationByContent;

      if (overlapsRef || overflowsBoundaries || flippedVariation) {
        // this boolean to detect any flip loop
        data.flipped = true;

        if (overlapsRef || overflowsBoundaries) {
          placement = flipOrder[index + 1];
        }

        if (flippedVariation) {
          variation = getOppositeVariation$1(variation);
        }

        data.placement = placement + (variation ? '-' + variation : '');

        // this object contains `position`, we want to preserve it along with
        // any additional property we may add in the future
        data.offsets.popper = _extends$1({}, data.offsets.popper, getPopperOffsets$1(data.instance.popper, data.offsets.reference, data.placement));

        data = runModifiers$1(data.instance.modifiers, data, 'flip');
      }
    });
    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function keepTogether$1(data) {
    const { popper, reference } = data.offsets;
    const placement = data.placement.split('-')[0];
    const floor = Math.floor;
    const isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
    const side = isVertical ? 'right' : 'bottom';
    const opSide = isVertical ? 'left' : 'top';
    const measurement = isVertical ? 'width' : 'height';

    if (popper[side] < floor(reference[opSide])) {
      data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
    }
    if (popper[opSide] > floor(reference[side])) {
      data.offsets.popper[opSide] = floor(reference[side]);
    }

    return data;
  }

  /**
   * Converts a string containing value + unit into a px value number
   * @function
   * @memberof {modifiers~offset}
   * @private
   * @argument {String} str - Value + unit string
   * @argument {String} measurement - `height` or `width`
   * @argument {Object} popperOffsets
   * @argument {Object} referenceOffsets
   * @returns {Number|String}
   * Value in pixels, or original string if no values were extracted
   */
  function toValue$1(str, measurement, popperOffsets, referenceOffsets) {
    // separate value from unit
    const split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
    const value = +split[1];
    const unit = split[2];

    // If it's not a number it's an operator, I guess
    if (!value) {
      return str;
    }

    if (unit.indexOf('%') === 0) {
      let element;
      switch (unit) {
        case '%p':
          element = popperOffsets;
          break;
        case '%':
        case '%r':
        default:
          element = referenceOffsets;
      }

      const rect = getClientRect$1(element);
      return rect[measurement] / 100 * value;
    } else if (unit === 'vh' || unit === 'vw') {
      // if is a vh or vw, we calculate the size based on the viewport
      let size;
      if (unit === 'vh') {
        size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      } else {
        size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      }
      return size / 100 * value;
    } else {
      // if is an explicit pixel unit, we get rid of the unit and keep the value
      // if is an implicit unit, it's px, and we return just the value
      return value;
    }
  }

  /**
   * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
   * @function
   * @memberof {modifiers~offset}
   * @private
   * @argument {String} offset
   * @argument {Object} popperOffsets
   * @argument {Object} referenceOffsets
   * @argument {String} basePlacement
   * @returns {Array} a two cells array with x and y offsets in numbers
   */
  function parseOffset$1(offset, popperOffsets, referenceOffsets, basePlacement) {
    const offsets = [0, 0];

    // Use height if placement is left or right and index is 0 otherwise use width
    // in this way the first offset will use an axis and the second one
    // will use the other one
    const useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;

    // Split the offset string to obtain a list of values and operands
    // The regex addresses values with the plus or minus sign in front (+10, -20, etc)
    const fragments = offset.split(/(\+|\-)/).map(frag => frag.trim());

    // Detect if the offset string contains a pair of values or a single one
    // they could be separated by comma or space
    const divider = fragments.indexOf(find$1(fragments, frag => frag.search(/,|\s/) !== -1));

    if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
      console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
    }

    // If divider is found, we divide the list of values and operands to divide
    // them by ofset X and Y.
    const splitRegex = /\s*,\s*|\s+/;
    let ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];

    // Convert the values with units to absolute pixels to allow our computations
    ops = ops.map((op, index) => {
      // Most of the units rely on the orientation of the popper
      const measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
      let mergeWithPrevious = false;
      return op
      // This aggregates any `+` or `-` sign that aren't considered operators
      // e.g.: 10 + +5 => [10, +, +5]
      .reduce((a, b) => {
        if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
          a[a.length - 1] = b;
          mergeWithPrevious = true;
          return a;
        } else if (mergeWithPrevious) {
          a[a.length - 1] += b;
          mergeWithPrevious = false;
          return a;
        } else {
          return a.concat(b);
        }
      }, [])
      // Here we convert the string values into number values (in px)
      .map(str => toValue$1(str, measurement, popperOffsets, referenceOffsets));
    });

    // Loop trough the offsets arrays and execute the operations
    ops.forEach((op, index) => {
      op.forEach((frag, index2) => {
        if (isNumeric$1(frag)) {
          offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
        }
      });
    });
    return offsets;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @argument {Number|String} options.offset=0
   * The offset value as described in the modifier description
   * @returns {Object} The data object, properly modified
   */
  function offset$1(data, { offset }) {
    const { placement, offsets: { popper, reference } } = data;
    const basePlacement = placement.split('-')[0];

    let offsets;
    if (isNumeric$1(+offset)) {
      offsets = [+offset, 0];
    } else {
      offsets = parseOffset$1(offset, popper, reference, basePlacement);
    }

    if (basePlacement === 'left') {
      popper.top += offsets[0];
      popper.left -= offsets[1];
    } else if (basePlacement === 'right') {
      popper.top += offsets[0];
      popper.left += offsets[1];
    } else if (basePlacement === 'top') {
      popper.left += offsets[0];
      popper.top -= offsets[1];
    } else if (basePlacement === 'bottom') {
      popper.left += offsets[0];
      popper.top += offsets[1];
    }

    data.popper = popper;
    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function preventOverflow$1(data, options) {
    let boundariesElement = options.boundariesElement || getOffsetParent$1(data.instance.popper);

    // If offsetParent is the reference element, we really want to
    // go one step up and use the next offsetParent as reference to
    // avoid to make this modifier completely useless and look like broken
    if (data.instance.reference === boundariesElement) {
      boundariesElement = getOffsetParent$1(boundariesElement);
    }

    // NOTE: DOM access here
    // resets the popper's position so that the document size can be calculated excluding
    // the size of the popper element itself
    const transformProp = getSupportedPropertyName$1('transform');
    const popperStyles = data.instance.popper.style; // assignment to help minification
    const { top, left, [transformProp]: transform } = popperStyles;
    popperStyles.top = '';
    popperStyles.left = '';
    popperStyles[transformProp] = '';

    const boundaries = getBoundaries$1(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed);

    // NOTE: DOM access here
    // restores the original style properties after the offsets have been computed
    popperStyles.top = top;
    popperStyles.left = left;
    popperStyles[transformProp] = transform;

    options.boundaries = boundaries;

    const order = options.priority;
    let popper = data.offsets.popper;

    const check = {
      primary(placement) {
        let value = popper[placement];
        if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
          value = Math.max(popper[placement], boundaries[placement]);
        }
        return { [placement]: value };
      },
      secondary(placement) {
        const mainSide = placement === 'right' ? 'left' : 'top';
        let value = popper[mainSide];
        if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
          value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
        }
        return { [mainSide]: value };
      }
    };

    order.forEach(placement => {
      const side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
      popper = _extends$1({}, popper, check[side](placement));
    });

    data.offsets.popper = popper;

    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function shift$1(data) {
    const placement = data.placement;
    const basePlacement = placement.split('-')[0];
    const shiftvariation = placement.split('-')[1];

    // if shift shiftvariation is specified, run the modifier
    if (shiftvariation) {
      const { reference, popper } = data.offsets;
      const isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
      const side = isVertical ? 'left' : 'top';
      const measurement = isVertical ? 'width' : 'height';

      const shiftOffsets = {
        start: { [side]: reference[side] },
        end: {
          [side]: reference[side] + reference[measurement] - popper[measurement]
        }
      };

      data.offsets.popper = _extends$1({}, popper, shiftOffsets[shiftvariation]);
    }

    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function hide$1(data) {
    if (!isModifierRequired$1(data.instance.modifiers, 'hide', 'preventOverflow')) {
      return data;
    }

    const refRect = data.offsets.reference;
    const bound = find$1(data.instance.modifiers, modifier => modifier.name === 'preventOverflow').boundaries;

    if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
      // Avoid unnecessary DOM access if visibility hasn't changed
      if (data.hide === true) {
        return data;
      }

      data.hide = true;
      data.attributes['x-out-of-boundaries'] = '';
    } else {
      // Avoid unnecessary DOM access if visibility hasn't changed
      if (data.hide === false) {
        return data;
      }

      data.hide = false;
      data.attributes['x-out-of-boundaries'] = false;
    }

    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function inner$1(data) {
    const placement = data.placement;
    const basePlacement = placement.split('-')[0];
    const { popper, reference } = data.offsets;
    const isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;

    const subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;

    popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);

    data.placement = getOppositePlacement$1(placement);
    data.offsets.popper = getClientRect$1(popper);

    return data;
  }

  /**
   * Modifier function, each modifier can have a function of this type assigned
   * to its `fn` property.<br />
   * These functions will be called on each update, this means that you must
   * make sure they are performant enough to avoid performance bottlenecks.
   *
   * @function ModifierFn
   * @argument {dataObject} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {dataObject} The data object, properly modified
   */

  /**
   * Modifiers are plugins used to alter the behavior of your poppers.<br />
   * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
   * needed by the library.
   *
   * Usually you don't want to override the `order`, `fn` and `onLoad` props.
   * All the other properties are configurations that could be tweaked.
   * @namespace modifiers
   */
  var modifiers$1 = {
    /**
     * Modifier used to shift the popper on the start or end of its reference
     * element.<br />
     * It will read the variation of the `placement` property.<br />
     * It can be one either `-end` or `-start`.
     * @memberof modifiers
     * @inner
     */
    shift: {
      /** @prop {number} order=100 - Index used to define the order of execution */
      order: 100,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: shift$1
    },

    /**
     * The `offset` modifier can shift your popper on both its axis.
     *
     * It accepts the following units:
     * - `px` or unit-less, interpreted as pixels
     * - `%` or `%r`, percentage relative to the length of the reference element
     * - `%p`, percentage relative to the length of the popper element
     * - `vw`, CSS viewport width unit
     * - `vh`, CSS viewport height unit
     *
     * For length is intended the main axis relative to the placement of the popper.<br />
     * This means that if the placement is `top` or `bottom`, the length will be the
     * `width`. In case of `left` or `right`, it will be the `height`.
     *
     * You can provide a single value (as `Number` or `String`), or a pair of values
     * as `String` divided by a comma or one (or more) white spaces.<br />
     * The latter is a deprecated method because it leads to confusion and will be
     * removed in v2.<br />
     * Additionally, it accepts additions and subtractions between different units.
     * Note that multiplications and divisions aren't supported.
     *
     * Valid examples are:
     * ```
     * 10
     * '10%'
     * '10, 10'
     * '10%, 10'
     * '10 + 10%'
     * '10 - 5vh + 3%'
     * '-10px + 5vh, 5px - 6%'
     * ```
     * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
     * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
     * > You can read more on this at this [issue](https://github.com/FezVrasta/popper.js/issues/373).
     *
     * @memberof modifiers
     * @inner
     */
    offset: {
      /** @prop {number} order=200 - Index used to define the order of execution */
      order: 200,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: offset$1,
      /** @prop {Number|String} offset=0
       * The offset value as described in the modifier description
       */
      offset: 0
    },

    /**
     * Modifier used to prevent the popper from being positioned outside the boundary.
     *
     * A scenario exists where the reference itself is not within the boundaries.<br />
     * We can say it has "escaped the boundaries" — or just "escaped".<br />
     * In this case we need to decide whether the popper should either:
     *
     * - detach from the reference and remain "trapped" in the boundaries, or
     * - if it should ignore the boundary and "escape with its reference"
     *
     * When `escapeWithReference` is set to`true` and reference is completely
     * outside its boundaries, the popper will overflow (or completely leave)
     * the boundaries in order to remain attached to the edge of the reference.
     *
     * @memberof modifiers
     * @inner
     */
    preventOverflow: {
      /** @prop {number} order=300 - Index used to define the order of execution */
      order: 300,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: preventOverflow$1,
      /**
       * @prop {Array} [priority=['left','right','top','bottom']]
       * Popper will try to prevent overflow following these priorities by default,
       * then, it could overflow on the left and on top of the `boundariesElement`
       */
      priority: ['left', 'right', 'top', 'bottom'],
      /**
       * @prop {number} padding=5
       * Amount of pixel used to define a minimum distance between the boundaries
       * and the popper. This makes sure the popper always has a little padding
       * between the edges of its container
       */
      padding: 5,
      /**
       * @prop {String|HTMLElement} boundariesElement='scrollParent'
       * Boundaries used by the modifier. Can be `scrollParent`, `window`,
       * `viewport` or any DOM element.
       */
      boundariesElement: 'scrollParent'
    },

    /**
     * Modifier used to make sure the reference and its popper stay near each other
     * without leaving any gap between the two. Especially useful when the arrow is
     * enabled and you want to ensure that it points to its reference element.
     * It cares only about the first axis. You can still have poppers with margin
     * between the popper and its reference element.
     * @memberof modifiers
     * @inner
     */
    keepTogether: {
      /** @prop {number} order=400 - Index used to define the order of execution */
      order: 400,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: keepTogether$1
    },

    /**
     * This modifier is used to move the `arrowElement` of the popper to make
     * sure it is positioned between the reference element and its popper element.
     * It will read the outer size of the `arrowElement` node to detect how many
     * pixels of conjunction are needed.
     *
     * It has no effect if no `arrowElement` is provided.
     * @memberof modifiers
     * @inner
     */
    arrow: {
      /** @prop {number} order=500 - Index used to define the order of execution */
      order: 500,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: arrow$1,
      /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
      element: '[x-arrow]'
    },

    /**
     * Modifier used to flip the popper's placement when it starts to overlap its
     * reference element.
     *
     * Requires the `preventOverflow` modifier before it in order to work.
     *
     * **NOTE:** this modifier will interrupt the current update cycle and will
     * restart it if it detects the need to flip the placement.
     * @memberof modifiers
     * @inner
     */
    flip: {
      /** @prop {number} order=600 - Index used to define the order of execution */
      order: 600,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: flip$1,
      /**
       * @prop {String|Array} behavior='flip'
       * The behavior used to change the popper's placement. It can be one of
       * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
       * placements (with optional variations)
       */
      behavior: 'flip',
      /**
       * @prop {number} padding=5
       * The popper will flip if it hits the edges of the `boundariesElement`
       */
      padding: 5,
      /**
       * @prop {String|HTMLElement} boundariesElement='viewport'
       * The element which will define the boundaries of the popper position.
       * The popper will never be placed outside of the defined boundaries
       * (except if `keepTogether` is enabled)
       */
      boundariesElement: 'viewport',
      /**
       * @prop {Boolean} flipVariations=false
       * The popper will switch placement variation between `-start` and `-end` when
       * the reference element overlaps its boundaries.
       *
       * The original placement should have a set variation.
       */
      flipVariations: false,
      /**
       * @prop {Boolean} flipVariationsByContent=false
       * The popper will switch placement variation between `-start` and `-end` when
       * the popper element overlaps its reference boundaries.
       *
       * The original placement should have a set variation.
       */
      flipVariationsByContent: false
    },

    /**
     * Modifier used to make the popper flow toward the inner of the reference element.
     * By default, when this modifier is disabled, the popper will be placed outside
     * the reference element.
     * @memberof modifiers
     * @inner
     */
    inner: {
      /** @prop {number} order=700 - Index used to define the order of execution */
      order: 700,
      /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
      enabled: false,
      /** @prop {ModifierFn} */
      fn: inner$1
    },

    /**
     * Modifier used to hide the popper when its reference element is outside of the
     * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
     * be used to hide with a CSS selector the popper when its reference is
     * out of boundaries.
     *
     * Requires the `preventOverflow` modifier before it in order to work.
     * @memberof modifiers
     * @inner
     */
    hide: {
      /** @prop {number} order=800 - Index used to define the order of execution */
      order: 800,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: hide$1
    },

    /**
     * Computes the style that will be applied to the popper element to gets
     * properly positioned.
     *
     * Note that this modifier will not touch the DOM, it just prepares the styles
     * so that `applyStyle` modifier can apply it. This separation is useful
     * in case you need to replace `applyStyle` with a custom implementation.
     *
     * This modifier has `850` as `order` value to maintain backward compatibility
     * with previous versions of Popper.js. Expect the modifiers ordering method
     * to change in future major versions of the library.
     *
     * @memberof modifiers
     * @inner
     */
    computeStyle: {
      /** @prop {number} order=850 - Index used to define the order of execution */
      order: 850,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: computeStyle$1,
      /**
       * @prop {Boolean} gpuAcceleration=true
       * If true, it uses the CSS 3D transformation to position the popper.
       * Otherwise, it will use the `top` and `left` properties
       */
      gpuAcceleration: true,
      /**
       * @prop {string} [x='bottom']
       * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
       * Change this if your popper should grow in a direction different from `bottom`
       */
      x: 'bottom',
      /**
       * @prop {string} [x='left']
       * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
       * Change this if your popper should grow in a direction different from `right`
       */
      y: 'right'
    },

    /**
     * Applies the computed styles to the popper element.
     *
     * All the DOM manipulations are limited to this modifier. This is useful in case
     * you want to integrate Popper.js inside a framework or view library and you
     * want to delegate all the DOM manipulations to it.
     *
     * Note that if you disable this modifier, you must make sure the popper element
     * has its position set to `absolute` before Popper.js can do its work!
     *
     * Just disable this modifier and define your own to achieve the desired effect.
     *
     * @memberof modifiers
     * @inner
     */
    applyStyle: {
      /** @prop {number} order=900 - Index used to define the order of execution */
      order: 900,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: applyStyle$1,
      /** @prop {Function} */
      onLoad: applyStyleOnLoad$1,
      /**
       * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
       * @prop {Boolean} gpuAcceleration=true
       * If true, it uses the CSS 3D transformation to position the popper.
       * Otherwise, it will use the `top` and `left` properties
       */
      gpuAcceleration: undefined
    }
  };

  /**
   * The `dataObject` is an object containing all the information used by Popper.js.
   * This object is passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
   * @name dataObject
   * @property {Object} data.instance The Popper.js instance
   * @property {String} data.placement Placement applied to popper
   * @property {String} data.originalPlacement Placement originally defined on init
   * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
   * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper
   * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
   * @property {Object} data.styles Any CSS property defined here will be applied to the popper. It expects the JavaScript nomenclature (eg. `marginBottom`)
   * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow. It expects the JavaScript nomenclature (eg. `marginBottom`)
   * @property {Object} data.boundaries Offsets of the popper boundaries
   * @property {Object} data.offsets The measurements of popper, reference and arrow elements
   * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
   * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
   * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
   */

  /**
   * Default options provided to Popper.js constructor.<br />
   * These can be overridden using the `options` argument of Popper.js.<br />
   * To override an option, simply pass an object with the same
   * structure of the `options` object, as the 3rd argument. For example:
   * ```
   * new Popper(ref, pop, {
   *   modifiers: {
   *     preventOverflow: { enabled: false }
   *   }
   * })
   * ```
   * @type {Object}
   * @static
   * @memberof Popper
   */
  var Defaults$1 = {
    /**
     * Popper's placement.
     * @prop {Popper.placements} placement='bottom'
     */
    placement: 'bottom',

    /**
     * Set this to true if you want popper to position it self in 'fixed' mode
     * @prop {Boolean} positionFixed=false
     */
    positionFixed: false,

    /**
     * Whether events (resize, scroll) are initially enabled.
     * @prop {Boolean} eventsEnabled=true
     */
    eventsEnabled: true,

    /**
     * Set to true if you want to automatically remove the popper when
     * you call the `destroy` method.
     * @prop {Boolean} removeOnDestroy=false
     */
    removeOnDestroy: false,

    /**
     * Callback called when the popper is created.<br />
     * By default, it is set to no-op.<br />
     * Access Popper.js instance with `data.instance`.
     * @prop {onCreate}
     */
    onCreate: () => {},

    /**
     * Callback called when the popper is updated. This callback is not called
     * on the initialization/creation of the popper, but only on subsequent
     * updates.<br />
     * By default, it is set to no-op.<br />
     * Access Popper.js instance with `data.instance`.
     * @prop {onUpdate}
     */
    onUpdate: () => {},

    /**
     * List of modifiers used to modify the offsets before they are applied to the popper.
     * They provide most of the functionalities of Popper.js.
     * @prop {modifiers}
     */
    modifiers: modifiers$1
  };

  /**
   * @callback onCreate
   * @param {dataObject} data
   */

  /**
   * @callback onUpdate
   * @param {dataObject} data
   */

  // Utils
  // Methods
  class Popper$2 {
    /**
     * Creates a new Popper.js instance.
     * @class Popper
     * @param {Element|referenceObject} reference - The reference element used to position the popper
     * @param {Element} popper - The HTML / XML element used as the popper
     * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
     * @return {Object} instance - The generated Popper.js instance
     */
    constructor(reference, popper, options = {}) {
      this.scheduleUpdate = () => requestAnimationFrame(this.update);

      // make update() debounced, so that it only runs at most once-per-tick
      this.update = debounce$1(this.update.bind(this));

      // with {} we create a new object with the options inside it
      this.options = _extends$1({}, Popper$2.Defaults, options);

      // init state
      this.state = {
        isDestroyed: false,
        isCreated: false,
        scrollParents: []
      };

      // get reference and popper elements (allow jQuery wrappers)
      this.reference = reference && reference.jquery ? reference[0] : reference;
      this.popper = popper && popper.jquery ? popper[0] : popper;

      // Deep merge modifiers options
      this.options.modifiers = {};
      Object.keys(_extends$1({}, Popper$2.Defaults.modifiers, options.modifiers)).forEach(name => {
        this.options.modifiers[name] = _extends$1({}, Popper$2.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
      });

      // Refactoring modifiers' list (Object => Array)
      this.modifiers = Object.keys(this.options.modifiers).map(name => _extends$1({
        name
      }, this.options.modifiers[name]))
      // sort the modifiers by order
      .sort((a, b) => a.order - b.order);

      // modifiers have the ability to execute arbitrary code when Popper.js get inited
      // such code is executed in the same order of its modifier
      // they could add new properties to their options configuration
      // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
      this.modifiers.forEach(modifierOptions => {
        if (modifierOptions.enabled && isFunction$1(modifierOptions.onLoad)) {
          modifierOptions.onLoad(this.reference, this.popper, this.options, modifierOptions, this.state);
        }
      });

      // fire the first update to position the popper in the right place
      this.update();

      const eventsEnabled = this.options.eventsEnabled;
      if (eventsEnabled) {
        // setup event listeners, they will take care of update the position in specific situations
        this.enableEventListeners();
      }

      this.state.eventsEnabled = eventsEnabled;
    }

    // We can't use class properties because they don't get listed in the
    // class prototype and break stuff like Sinon stubs
    update() {
      return update$1.call(this);
    }
    destroy() {
      return destroy$1.call(this);
    }
    enableEventListeners() {
      return enableEventListeners$1.call(this);
    }
    disableEventListeners() {
      return disableEventListeners$1.call(this);
    }

    /**
     * Schedules an update. It will run on the next UI update available.
     * @method scheduleUpdate
     * @memberof Popper
     */


    /**
     * Collection of utilities useful when writing custom modifiers.
     * Starting from version 1.7, this method is available only if you
     * include `popper-utils.js` before `popper.js`.
     *
     * **DEPRECATION**: This way to access PopperUtils is deprecated
     * and will be removed in v2! Use the PopperUtils module directly instead.
     * Due to the high instability of the methods contained in Utils, we can't
     * guarantee them to follow semver. Use them at your own risk!
     * @static
     * @private
     * @type {Object}
     * @deprecated since version 1.8
     * @member Utils
     * @memberof Popper
     */
  }

  /**
   * The `referenceObject` is an object that provides an interface compatible with Popper.js
   * and lets you use it as replacement of a real DOM node.<br />
   * You can use this method to position a popper relatively to a set of coordinates
   * in case you don't have a DOM node to use as reference.
   *
   * ```
   * new Popper(referenceObject, popperNode);
   * ```
   *
   * NB: This feature isn't supported in Internet Explorer 10.
   * @name referenceObject
   * @property {Function} data.getBoundingClientRect
   * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
   * @property {number} data.clientWidth
   * An ES6 getter that will return the width of the virtual reference element.
   * @property {number} data.clientHeight
   * An ES6 getter that will return the height of the virtual reference element.
   */

  Popper$2.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
  Popper$2.placements = placements$1;
  Popper$2.Defaults = Defaults$1;

  var Popper$3 = Popper$2;

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.6.1): util.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * Private TransitionEnd Helpers
   */

  const TRANSITION_END = 'transitionend';
  const MAX_UID = 1000000;
  const MILLISECONDS_MULTIPLIER = 1000;

  // Shoutout AngusCroll (https://goo.gl/pxwQGp)
  function toType(obj) {
    if (obj === null || typeof obj === 'undefined') {
      return `${obj}`
    }

    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase()
  }

  function getSpecialTransitionEndEvent() {
    return {
      bindType: TRANSITION_END,
      delegateType: TRANSITION_END,
      handle(event) {
        if ($__default["default"](event.target).is(this)) {
          return event.handleObj.handler.apply(this, arguments) // eslint-disable-line prefer-rest-params
        }

        return undefined
      }
    }
  }

  function transitionEndEmulator(duration) {
    let called = false;

    $__default["default"](this).one(Util.TRANSITION_END, () => {
      called = true;
    });

    setTimeout(() => {
      if (!called) {
        Util.triggerTransitionEnd(this);
      }
    }, duration);

    return this
  }

  function setTransitionEndSupport() {
    $__default["default"].fn.emulateTransitionEnd = transitionEndEmulator;
    $__default["default"].event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
  }

  /**
   * Public Util API
   */

  const Util = {
    TRANSITION_END: 'bsTransitionEnd',

    getUID(prefix) {
      do {
        // eslint-disable-next-line no-bitwise
        prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
      } while (document.getElementById(prefix))

      return prefix
    },

    getSelectorFromElement(element) {
      let selector = element.getAttribute('data-target');

      if (!selector || selector === '#') {
        const hrefAttr = element.getAttribute('href');
        selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : '';
      }

      try {
        return document.querySelector(selector) ? selector : null
      } catch (_) {
        return null
      }
    },

    getTransitionDurationFromElement(element) {
      if (!element) {
        return 0
      }

      // Get transition-duration of the element
      let transitionDuration = $__default["default"](element).css('transition-duration');
      let transitionDelay = $__default["default"](element).css('transition-delay');

      const floatTransitionDuration = parseFloat(transitionDuration);
      const floatTransitionDelay = parseFloat(transitionDelay);

      // Return 0 if element or transition duration is not found
      if (!floatTransitionDuration && !floatTransitionDelay) {
        return 0
      }

      // If multiple durations are defined, take the first
      transitionDuration = transitionDuration.split(',')[0];
      transitionDelay = transitionDelay.split(',')[0];

      return (parseFloat(transitionDuration) + parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER
    },

    reflow(element) {
      return element.offsetHeight
    },

    triggerTransitionEnd(element) {
      $__default["default"](element).trigger(TRANSITION_END);
    },

    supportsTransitionEnd() {
      return Boolean(TRANSITION_END)
    },

    isElement(obj) {
      return (obj[0] || obj).nodeType
    },

    typeCheckConfig(componentName, config, configTypes) {
      for (const property in configTypes) {
        if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
          const expectedTypes = configTypes[property];
          const value = config[property];
          const valueType = value && Util.isElement(value) ?
            'element' : toType(value);

          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new Error(
              `${componentName.toUpperCase()}: ` +
              `Option "${property}" provided type "${valueType}" ` +
              `but expected type "${expectedTypes}".`)
          }
        }
      }
    },

    findShadowRoot(element) {
      if (!document.documentElement.attachShadow) {
        return null
      }

      // Can find the shadow root otherwise it'll return the document
      if (typeof element.getRootNode === 'function') {
        const root = element.getRootNode();
        return root instanceof ShadowRoot ? root : null
      }

      if (element instanceof ShadowRoot) {
        return element
      }

      // when we don't find a shadow root
      if (!element.parentNode) {
        return null
      }

      return Util.findShadowRoot(element.parentNode)
    },

    jQueryDetection() {
      if (typeof $__default["default"] === 'undefined') {
        throw new TypeError('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.')
      }

      const version = $__default["default"].fn.jquery.split(' ')[0].split('.');
      const minMajor = 1;
      const ltMajor = 2;
      const minMinor = 9;
      const minPatch = 1;
      const maxMajor = 4;

      if (version[0] < ltMajor && version[1] < minMinor || version[0] === minMajor && version[1] === minMinor && version[2] < minPatch || version[0] >= maxMajor) {
        throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0')
      }
    }
  };

  Util.jQueryDetection();
  setTransitionEndSupport();

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.6.1): alert.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * Constants
   */

  const NAME$a = 'alert';
  const VERSION$a = '4.6.1';
  const DATA_KEY$a = 'bs.alert';
  const EVENT_KEY$a = `.${DATA_KEY$a}`;
  const DATA_API_KEY$7 = '.data-api';
  const JQUERY_NO_CONFLICT$a = $__default["default"].fn[NAME$a];

  const CLASS_NAME_ALERT = 'alert';
  const CLASS_NAME_FADE$5 = 'fade';
  const CLASS_NAME_SHOW$7 = 'show';

  const EVENT_CLOSE = `close${EVENT_KEY$a}`;
  const EVENT_CLOSED = `closed${EVENT_KEY$a}`;
  const EVENT_CLICK_DATA_API$6 = `click${EVENT_KEY$a}${DATA_API_KEY$7}`;

  const SELECTOR_DISMISS = '[data-dismiss="alert"]';

  /**
   * Class definition
   */

  class Alert {
    constructor(element) {
      this._element = element;
    }

    // Getters
    static get VERSION() {
      return VERSION$a
    }

    // Public
    close(element) {
      let rootElement = this._element;
      if (element) {
        rootElement = this._getRootElement(element);
      }

      const customEvent = this._triggerCloseEvent(rootElement);

      if (customEvent.isDefaultPrevented()) {
        return
      }

      this._removeElement(rootElement);
    }

    dispose() {
      $__default["default"].removeData(this._element, DATA_KEY$a);
      this._element = null;
    }

    // Private
    _getRootElement(element) {
      const selector = Util.getSelectorFromElement(element);
      let parent = false;

      if (selector) {
        parent = document.querySelector(selector);
      }

      if (!parent) {
        parent = $__default["default"](element).closest(`.${CLASS_NAME_ALERT}`)[0];
      }

      return parent
    }

    _triggerCloseEvent(element) {
      const closeEvent = $__default["default"].Event(EVENT_CLOSE);

      $__default["default"](element).trigger(closeEvent);
      return closeEvent
    }

    _removeElement(element) {
      $__default["default"](element).removeClass(CLASS_NAME_SHOW$7);

      if (!$__default["default"](element).hasClass(CLASS_NAME_FADE$5)) {
        this._destroyElement(element);
        return
      }

      const transitionDuration = Util.getTransitionDurationFromElement(element);

      $__default["default"](element)
        .one(Util.TRANSITION_END, event => this._destroyElement(element, event))
        .emulateTransitionEnd(transitionDuration);
    }

    _destroyElement(element) {
      $__default["default"](element)
        .detach()
        .trigger(EVENT_CLOSED)
        .remove();
    }

    // Static
    static _jQueryInterface(config) {
      return this.each(function () {
        const $element = $__default["default"](this);
        let data = $element.data(DATA_KEY$a);

        if (!data) {
          data = new Alert(this);
          $element.data(DATA_KEY$a, data);
        }

        if (config === 'close') {
          data[config](this);
        }
      })
    }

    static _handleDismiss(alertInstance) {
      return function (event) {
        if (event) {
          event.preventDefault();
        }

        alertInstance.close(this);
      }
    }
  }

  /**
   * Data API implementation
   */

  $__default["default"](document).on(
    EVENT_CLICK_DATA_API$6,
    SELECTOR_DISMISS,
    Alert._handleDismiss(new Alert())
  );

  /**
   * jQuery
   */

  $__default["default"].fn[NAME$a] = Alert._jQueryInterface;
  $__default["default"].fn[NAME$a].Constructor = Alert;
  $__default["default"].fn[NAME$a].noConflict = () => {
    $__default["default"].fn[NAME$a] = JQUERY_NO_CONFLICT$a;
    return Alert._jQueryInterface
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.6.1): button.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * Constants
   */

  const NAME$9 = 'button';
  const VERSION$9 = '4.6.1';
  const DATA_KEY$9 = 'bs.button';
  const EVENT_KEY$9 = `.${DATA_KEY$9}`;
  const DATA_API_KEY$6 = '.data-api';
  const JQUERY_NO_CONFLICT$9 = $__default["default"].fn[NAME$9];

  const CLASS_NAME_ACTIVE$3 = 'active';
  const CLASS_NAME_BUTTON = 'btn';
  const CLASS_NAME_FOCUS = 'focus';

  const EVENT_CLICK_DATA_API$5 = `click${EVENT_KEY$9}${DATA_API_KEY$6}`;
  const EVENT_FOCUS_BLUR_DATA_API = `focus${EVENT_KEY$9}${DATA_API_KEY$6} ` +
                            `blur${EVENT_KEY$9}${DATA_API_KEY$6}`;
  const EVENT_LOAD_DATA_API$2 = `load${EVENT_KEY$9}${DATA_API_KEY$6}`;

  const SELECTOR_DATA_TOGGLE_CARROT = '[data-toggle^="button"]';
  const SELECTOR_DATA_TOGGLES = '[data-toggle="buttons"]';
  const SELECTOR_DATA_TOGGLE$4 = '[data-toggle="button"]';
  const SELECTOR_DATA_TOGGLES_BUTTONS = '[data-toggle="buttons"] .btn';
  const SELECTOR_INPUT = 'input:not([type="hidden"])';
  const SELECTOR_ACTIVE$2 = '.active';
  const SELECTOR_BUTTON = '.btn';

  /**
   * Class definition
   */

  class Button {
    constructor(element) {
      this._element = element;
      this.shouldAvoidTriggerChange = false;
    }

    // Getters
    static get VERSION() {
      return VERSION$9
    }

    // Public
    toggle() {
      let triggerChangeEvent = true;
      let addAriaPressed = true;
      const rootElement = $__default["default"](this._element).closest(SELECTOR_DATA_TOGGLES)[0];

      if (rootElement) {
        const input = this._element.querySelector(SELECTOR_INPUT);

        if (input) {
          if (input.type === 'radio') {
            if (input.checked && this._element.classList.contains(CLASS_NAME_ACTIVE$3)) {
              triggerChangeEvent = false;
            } else {
              const activeElement = rootElement.querySelector(SELECTOR_ACTIVE$2);

              if (activeElement) {
                $__default["default"](activeElement).removeClass(CLASS_NAME_ACTIVE$3);
              }
            }
          }

          if (triggerChangeEvent) {
            // if it's not a radio button or checkbox don't add a pointless/invalid checked property to the input
            if (input.type === 'checkbox' || input.type === 'radio') {
              input.checked = !this._element.classList.contains(CLASS_NAME_ACTIVE$3);
            }

            if (!this.shouldAvoidTriggerChange) {
              $__default["default"](input).trigger('change');
            }
          }

          input.focus();
          addAriaPressed = false;
        }
      }

      if (!(this._element.hasAttribute('disabled') || this._element.classList.contains('disabled'))) {
        if (addAriaPressed) {
          this._element.setAttribute('aria-pressed', !this._element.classList.contains(CLASS_NAME_ACTIVE$3));
        }

        if (triggerChangeEvent) {
          $__default["default"](this._element).toggleClass(CLASS_NAME_ACTIVE$3);
        }
      }
    }

    dispose() {
      $__default["default"].removeData(this._element, DATA_KEY$9);
      this._element = null;
    }

    // Static
    static _jQueryInterface(config, avoidTriggerChange) {
      return this.each(function () {
        const $element = $__default["default"](this);
        let data = $element.data(DATA_KEY$9);

        if (!data) {
          data = new Button(this);
          $element.data(DATA_KEY$9, data);
        }

        data.shouldAvoidTriggerChange = avoidTriggerChange;

        if (config === 'toggle') {
          data[config]();
        }
      })
    }
  }

  /**
   * Data API implementation
   */

  $__default["default"](document)
    .on(EVENT_CLICK_DATA_API$5, SELECTOR_DATA_TOGGLE_CARROT, event => {
      let button = event.target;
      const initialButton = button;

      if (!$__default["default"](button).hasClass(CLASS_NAME_BUTTON)) {
        button = $__default["default"](button).closest(SELECTOR_BUTTON)[0];
      }

      if (!button || button.hasAttribute('disabled') || button.classList.contains('disabled')) {
        event.preventDefault(); // work around Firefox bug #1540995
      } else {
        const inputBtn = button.querySelector(SELECTOR_INPUT);

        if (inputBtn && (inputBtn.hasAttribute('disabled') || inputBtn.classList.contains('disabled'))) {
          event.preventDefault(); // work around Firefox bug #1540995
          return
        }

        if (initialButton.tagName === 'INPUT' || button.tagName !== 'LABEL') {
          Button._jQueryInterface.call($__default["default"](button), 'toggle', initialButton.tagName === 'INPUT');
        }
      }
    })
    .on(EVENT_FOCUS_BLUR_DATA_API, SELECTOR_DATA_TOGGLE_CARROT, event => {
      const button = $__default["default"](event.target).closest(SELECTOR_BUTTON)[0];
      $__default["default"](button).toggleClass(CLASS_NAME_FOCUS, /^focus(in)?$/.test(event.type));
    });

  $__default["default"](window).on(EVENT_LOAD_DATA_API$2, () => {
    // ensure correct active class is set to match the controls' actual values/states

    // find all checkboxes/readio buttons inside data-toggle groups
    let buttons = [].slice.call(document.querySelectorAll(SELECTOR_DATA_TOGGLES_BUTTONS));
    for (let i = 0, len = buttons.length; i < len; i++) {
      const button = buttons[i];
      const input = button.querySelector(SELECTOR_INPUT);
      if (input.checked || input.hasAttribute('checked')) {
        button.classList.add(CLASS_NAME_ACTIVE$3);
      } else {
        button.classList.remove(CLASS_NAME_ACTIVE$3);
      }
    }

    // find all button toggles
    buttons = [].slice.call(document.querySelectorAll(SELECTOR_DATA_TOGGLE$4));
    for (let i = 0, len = buttons.length; i < len; i++) {
      const button = buttons[i];
      if (button.getAttribute('aria-pressed') === 'true') {
        button.classList.add(CLASS_NAME_ACTIVE$3);
      } else {
        button.classList.remove(CLASS_NAME_ACTIVE$3);
      }
    }
  });

  /**
   * jQuery
   */

  $__default["default"].fn[NAME$9] = Button._jQueryInterface;
  $__default["default"].fn[NAME$9].Constructor = Button;
  $__default["default"].fn[NAME$9].noConflict = () => {
    $__default["default"].fn[NAME$9] = JQUERY_NO_CONFLICT$9;
    return Button._jQueryInterface
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.6.1): carousel.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * Constants
   */

  const NAME$8 = 'carousel';
  const VERSION$8 = '4.6.1';
  const DATA_KEY$8 = 'bs.carousel';
  const EVENT_KEY$8 = `.${DATA_KEY$8}`;
  const DATA_API_KEY$5 = '.data-api';
  const JQUERY_NO_CONFLICT$8 = $__default["default"].fn[NAME$8];
  const ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key
  const ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key
  const TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch
  const SWIPE_THRESHOLD = 40;

  const CLASS_NAME_CAROUSEL = 'carousel';
  const CLASS_NAME_ACTIVE$2 = 'active';
  const CLASS_NAME_SLIDE = 'slide';
  const CLASS_NAME_RIGHT = 'carousel-item-right';
  const CLASS_NAME_LEFT = 'carousel-item-left';
  const CLASS_NAME_NEXT = 'carousel-item-next';
  const CLASS_NAME_PREV = 'carousel-item-prev';
  const CLASS_NAME_POINTER_EVENT = 'pointer-event';

  const DIRECTION_NEXT = 'next';
  const DIRECTION_PREV = 'prev';
  const DIRECTION_LEFT = 'left';
  const DIRECTION_RIGHT = 'right';

  const EVENT_SLIDE = `slide${EVENT_KEY$8}`;
  const EVENT_SLID = `slid${EVENT_KEY$8}`;
  const EVENT_KEYDOWN = `keydown${EVENT_KEY$8}`;
  const EVENT_MOUSEENTER = `mouseenter${EVENT_KEY$8}`;
  const EVENT_MOUSELEAVE = `mouseleave${EVENT_KEY$8}`;
  const EVENT_TOUCHSTART = `touchstart${EVENT_KEY$8}`;
  const EVENT_TOUCHMOVE = `touchmove${EVENT_KEY$8}`;
  const EVENT_TOUCHEND = `touchend${EVENT_KEY$8}`;
  const EVENT_POINTERDOWN = `pointerdown${EVENT_KEY$8}`;
  const EVENT_POINTERUP = `pointerup${EVENT_KEY$8}`;
  const EVENT_DRAG_START = `dragstart${EVENT_KEY$8}`;
  const EVENT_LOAD_DATA_API$1 = `load${EVENT_KEY$8}${DATA_API_KEY$5}`;
  const EVENT_CLICK_DATA_API$4 = `click${EVENT_KEY$8}${DATA_API_KEY$5}`;

  const SELECTOR_ACTIVE$1 = '.active';
  const SELECTOR_ACTIVE_ITEM = '.active.carousel-item';
  const SELECTOR_ITEM = '.carousel-item';
  const SELECTOR_ITEM_IMG = '.carousel-item img';
  const SELECTOR_NEXT_PREV = '.carousel-item-next, .carousel-item-prev';
  const SELECTOR_INDICATORS = '.carousel-indicators';
  const SELECTOR_DATA_SLIDE = '[data-slide], [data-slide-to]';
  const SELECTOR_DATA_RIDE = '[data-ride="carousel"]';

  const Default$7 = {
    interval: 5000,
    keyboard: true,
    slide: false,
    pause: 'hover',
    wrap: true,
    touch: true
  };

  const DefaultType$7 = {
    interval: '(number|boolean)',
    keyboard: 'boolean',
    slide: '(boolean|string)',
    pause: '(string|boolean)',
    wrap: 'boolean',
    touch: 'boolean'
  };

  const PointerType = {
    TOUCH: 'touch',
    PEN: 'pen'
  };

  /**
   * Class definition
   */

  class Carousel {
    constructor(element, config) {
      this._items = null;
      this._interval = null;
      this._activeElement = null;
      this._isPaused = false;
      this._isSliding = false;
      this.touchTimeout = null;
      this.touchStartX = 0;
      this.touchDeltaX = 0;

      this._config = this._getConfig(config);
      this._element = element;
      this._indicatorsElement = this._element.querySelector(SELECTOR_INDICATORS);
      this._touchSupported = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
      this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent);

      this._addEventListeners();
    }

    // Getters
    static get VERSION() {
      return VERSION$8
    }

    static get Default() {
      return Default$7
    }

    // Public
    next() {
      if (!this._isSliding) {
        this._slide(DIRECTION_NEXT);
      }
    }

    nextWhenVisible() {
      const $element = $__default["default"](this._element);
      // Don't call next when the page isn't visible
      // or the carousel or its parent isn't visible
      if (!document.hidden &&
        ($element.is(':visible') && $element.css('visibility') !== 'hidden')) {
        this.next();
      }
    }

    prev() {
      if (!this._isSliding) {
        this._slide(DIRECTION_PREV);
      }
    }

    pause(event) {
      if (!event) {
        this._isPaused = true;
      }

      if (this._element.querySelector(SELECTOR_NEXT_PREV)) {
        Util.triggerTransitionEnd(this._element);
        this.cycle(true);
      }

      clearInterval(this._interval);
      this._interval = null;
    }

    cycle(event) {
      if (!event) {
        this._isPaused = false;
      }

      if (this._interval) {
        clearInterval(this._interval);
        this._interval = null;
      }

      if (this._config.interval && !this._isPaused) {
        this._updateInterval();

        this._interval = setInterval(
          (document.visibilityState ? this.nextWhenVisible : this.next).bind(this),
          this._config.interval
        );
      }
    }

    to(index) {
      this._activeElement = this._element.querySelector(SELECTOR_ACTIVE_ITEM);

      const activeIndex = this._getItemIndex(this._activeElement);

      if (index > this._items.length - 1 || index < 0) {
        return
      }

      if (this._isSliding) {
        $__default["default"](this._element).one(EVENT_SLID, () => this.to(index));
        return
      }

      if (activeIndex === index) {
        this.pause();
        this.cycle();
        return
      }

      const direction = index > activeIndex ?
        DIRECTION_NEXT :
        DIRECTION_PREV;

      this._slide(direction, this._items[index]);
    }

    dispose() {
      $__default["default"](this._element).off(EVENT_KEY$8);
      $__default["default"].removeData(this._element, DATA_KEY$8);

      this._items = null;
      this._config = null;
      this._element = null;
      this._interval = null;
      this._isPaused = null;
      this._isSliding = null;
      this._activeElement = null;
      this._indicatorsElement = null;
    }

    // Private
    _getConfig(config) {
      config = {
        ...Default$7,
        ...config
      };
      Util.typeCheckConfig(NAME$8, config, DefaultType$7);
      return config
    }

    _handleSwipe() {
      const absDeltax = Math.abs(this.touchDeltaX);

      if (absDeltax <= SWIPE_THRESHOLD) {
        return
      }

      const direction = absDeltax / this.touchDeltaX;

      this.touchDeltaX = 0;

      // swipe left
      if (direction > 0) {
        this.prev();
      }

      // swipe right
      if (direction < 0) {
        this.next();
      }
    }

    _addEventListeners() {
      if (this._config.keyboard) {
        $__default["default"](this._element).on(EVENT_KEYDOWN, event => this._keydown(event));
      }

      if (this._config.pause === 'hover') {
        $__default["default"](this._element)
          .on(EVENT_MOUSEENTER, event => this.pause(event))
          .on(EVENT_MOUSELEAVE, event => this.cycle(event));
      }

      if (this._config.touch) {
        this._addTouchEventListeners();
      }
    }

    _addTouchEventListeners() {
      if (!this._touchSupported) {
        return
      }

      const start = event => {
        if (this._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()]) {
          this.touchStartX = event.originalEvent.clientX;
        } else if (!this._pointerEvent) {
          this.touchStartX = event.originalEvent.touches[0].clientX;
        }
      };

      const move = event => {
        // ensure swiping with one touch and not pinching
        this.touchDeltaX = event.originalEvent.touches && event.originalEvent.touches.length > 1 ?
          0 :
          event.originalEvent.touches[0].clientX - this.touchStartX;
      };

      const end = event => {
        if (this._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()]) {
          this.touchDeltaX = event.originalEvent.clientX - this.touchStartX;
        }

        this._handleSwipe();
        if (this._config.pause === 'hover') {
          // If it's a touch-enabled device, mouseenter/leave are fired as
          // part of the mouse compatibility events on first tap - the carousel
          // would stop cycling until user tapped out of it;
          // here, we listen for touchend, explicitly pause the carousel
          // (as if it's the second time we tap on it, mouseenter compat event
          // is NOT fired) and after a timeout (to allow for mouse compatibility
          // events to fire) we explicitly restart cycling

          this.pause();
          if (this.touchTimeout) {
            clearTimeout(this.touchTimeout);
          }

          this.touchTimeout = setTimeout(event => this.cycle(event), TOUCHEVENT_COMPAT_WAIT + this._config.interval);
        }
      };

      $__default["default"](this._element.querySelectorAll(SELECTOR_ITEM_IMG))
        .on(EVENT_DRAG_START, e => e.preventDefault());

      if (this._pointerEvent) {
        $__default["default"](this._element).on(EVENT_POINTERDOWN, event => start(event));
        $__default["default"](this._element).on(EVENT_POINTERUP, event => end(event));

        this._element.classList.add(CLASS_NAME_POINTER_EVENT);
      } else {
        $__default["default"](this._element).on(EVENT_TOUCHSTART, event => start(event));
        $__default["default"](this._element).on(EVENT_TOUCHMOVE, event => move(event));
        $__default["default"](this._element).on(EVENT_TOUCHEND, event => end(event));
      }
    }

    _keydown(event) {
      if (/input|textarea/i.test(event.target.tagName)) {
        return
      }

      switch (event.which) {
        case ARROW_LEFT_KEYCODE:
          event.preventDefault();
          this.prev();
          break
        case ARROW_RIGHT_KEYCODE:
          event.preventDefault();
          this.next();
          break
      }
    }

    _getItemIndex(element) {
      this._items = element && element.parentNode ?
        [].slice.call(element.parentNode.querySelectorAll(SELECTOR_ITEM)) :
        [];
      return this._items.indexOf(element)
    }

    _getItemByDirection(direction, activeElement) {
      const isNextDirection = direction === DIRECTION_NEXT;
      const isPrevDirection = direction === DIRECTION_PREV;
      const activeIndex = this._getItemIndex(activeElement);
      const lastItemIndex = this._items.length - 1;
      const isGoingToWrap = isPrevDirection && activeIndex === 0 ||
                              isNextDirection && activeIndex === lastItemIndex;

      if (isGoingToWrap && !this._config.wrap) {
        return activeElement
      }

      const delta = direction === DIRECTION_PREV ? -1 : 1;
      const itemIndex = (activeIndex + delta) % this._items.length;

      return itemIndex === -1 ?
        this._items[this._items.length - 1] : this._items[itemIndex]
    }

    _triggerSlideEvent(relatedTarget, eventDirectionName) {
      const targetIndex = this._getItemIndex(relatedTarget);
      const fromIndex = this._getItemIndex(this._element.querySelector(SELECTOR_ACTIVE_ITEM));
      const slideEvent = $__default["default"].Event(EVENT_SLIDE, {
        relatedTarget,
        direction: eventDirectionName,
        from: fromIndex,
        to: targetIndex
      });

      $__default["default"](this._element).trigger(slideEvent);

      return slideEvent
    }

    _setActiveIndicatorElement(element) {
      if (this._indicatorsElement) {
        const indicators = [].slice.call(this._indicatorsElement.querySelectorAll(SELECTOR_ACTIVE$1));
        $__default["default"](indicators).removeClass(CLASS_NAME_ACTIVE$2);

        const nextIndicator = this._indicatorsElement.children[
          this._getItemIndex(element)
        ];

        if (nextIndicator) {
          $__default["default"](nextIndicator).addClass(CLASS_NAME_ACTIVE$2);
        }
      }
    }

    _updateInterval() {
      const element = this._activeElement || this._element.querySelector(SELECTOR_ACTIVE_ITEM);

      if (!element) {
        return
      }

      const elementInterval = parseInt(element.getAttribute('data-interval'), 10);

      if (elementInterval) {
        this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
        this._config.interval = elementInterval;
      } else {
        this._config.interval = this._config.defaultInterval || this._config.interval;
      }
    }

    _slide(direction, element) {
      const activeElement = this._element.querySelector(SELECTOR_ACTIVE_ITEM);
      const activeElementIndex = this._getItemIndex(activeElement);
      const nextElement = element || activeElement &&
        this._getItemByDirection(direction, activeElement);
      const nextElementIndex = this._getItemIndex(nextElement);
      const isCycling = Boolean(this._interval);

      let directionalClassName;
      let orderClassName;
      let eventDirectionName;

      if (direction === DIRECTION_NEXT) {
        directionalClassName = CLASS_NAME_LEFT;
        orderClassName = CLASS_NAME_NEXT;
        eventDirectionName = DIRECTION_LEFT;
      } else {
        directionalClassName = CLASS_NAME_RIGHT;
        orderClassName = CLASS_NAME_PREV;
        eventDirectionName = DIRECTION_RIGHT;
      }

      if (nextElement && $__default["default"](nextElement).hasClass(CLASS_NAME_ACTIVE$2)) {
        this._isSliding = false;
        return
      }

      const slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);
      if (slideEvent.isDefaultPrevented()) {
        return
      }

      if (!activeElement || !nextElement) {
        // Some weirdness is happening, so we bail
        return
      }

      this._isSliding = true;

      if (isCycling) {
        this.pause();
      }

      this._setActiveIndicatorElement(nextElement);
      this._activeElement = nextElement;

      const slidEvent = $__default["default"].Event(EVENT_SLID, {
        relatedTarget: nextElement,
        direction: eventDirectionName,
        from: activeElementIndex,
        to: nextElementIndex
      });

      if ($__default["default"](this._element).hasClass(CLASS_NAME_SLIDE)) {
        $__default["default"](nextElement).addClass(orderClassName);

        Util.reflow(nextElement);

        $__default["default"](activeElement).addClass(directionalClassName);
        $__default["default"](nextElement).addClass(directionalClassName);

        const transitionDuration = Util.getTransitionDurationFromElement(activeElement);

        $__default["default"](activeElement)
          .one(Util.TRANSITION_END, () => {
            $__default["default"](nextElement)
              .removeClass(`${directionalClassName} ${orderClassName}`)
              .addClass(CLASS_NAME_ACTIVE$2);

            $__default["default"](activeElement).removeClass(`${CLASS_NAME_ACTIVE$2} ${orderClassName} ${directionalClassName}`);

            this._isSliding = false;

            setTimeout(() => $__default["default"](this._element).trigger(slidEvent), 0);
          })
          .emulateTransitionEnd(transitionDuration);
      } else {
        $__default["default"](activeElement).removeClass(CLASS_NAME_ACTIVE$2);
        $__default["default"](nextElement).addClass(CLASS_NAME_ACTIVE$2);

        this._isSliding = false;
        $__default["default"](this._element).trigger(slidEvent);
      }

      if (isCycling) {
        this.cycle();
      }
    }

    // Static
    static _jQueryInterface(config) {
      return this.each(function () {
        let data = $__default["default"](this).data(DATA_KEY$8);
        let _config = {
          ...Default$7,
          ...$__default["default"](this).data()
        };

        if (typeof config === 'object') {
          _config = {
            ..._config,
            ...config
          };
        }

        const action = typeof config === 'string' ? config : _config.slide;

        if (!data) {
          data = new Carousel(this, _config);
          $__default["default"](this).data(DATA_KEY$8, data);
        }

        if (typeof config === 'number') {
          data.to(config);
        } else if (typeof action === 'string') {
          if (typeof data[action] === 'undefined') {
            throw new TypeError(`No method named "${action}"`)
          }

          data[action]();
        } else if (_config.interval && _config.ride) {
          data.pause();
          data.cycle();
        }
      })
    }

    static _dataApiClickHandler(event) {
      const selector = Util.getSelectorFromElement(this);

      if (!selector) {
        return
      }

      const target = $__default["default"](selector)[0];

      if (!target || !$__default["default"](target).hasClass(CLASS_NAME_CAROUSEL)) {
        return
      }

      const config = {
        ...$__default["default"](target).data(),
        ...$__default["default"](this).data()
      };
      const slideIndex = this.getAttribute('data-slide-to');

      if (slideIndex) {
        config.interval = false;
      }

      Carousel._jQueryInterface.call($__default["default"](target), config);

      if (slideIndex) {
        $__default["default"](target).data(DATA_KEY$8).to(slideIndex);
      }

      event.preventDefault();
    }
  }

  /**
   * Data API implementation
   */

  $__default["default"](document).on(EVENT_CLICK_DATA_API$4, SELECTOR_DATA_SLIDE, Carousel._dataApiClickHandler);

  $__default["default"](window).on(EVENT_LOAD_DATA_API$1, () => {
    const carousels = [].slice.call(document.querySelectorAll(SELECTOR_DATA_RIDE));
    for (let i = 0, len = carousels.length; i < len; i++) {
      const $carousel = $__default["default"](carousels[i]);
      Carousel._jQueryInterface.call($carousel, $carousel.data());
    }
  });

  /**
   * jQuery
   */

  $__default["default"].fn[NAME$8] = Carousel._jQueryInterface;
  $__default["default"].fn[NAME$8].Constructor = Carousel;
  $__default["default"].fn[NAME$8].noConflict = () => {
    $__default["default"].fn[NAME$8] = JQUERY_NO_CONFLICT$8;
    return Carousel._jQueryInterface
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.6.1): collapse.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * Constants
   */

  const NAME$7 = 'collapse';
  const VERSION$7 = '4.6.1';
  const DATA_KEY$7 = 'bs.collapse';
  const EVENT_KEY$7 = `.${DATA_KEY$7}`;
  const DATA_API_KEY$4 = '.data-api';
  const JQUERY_NO_CONFLICT$7 = $__default["default"].fn[NAME$7];

  const CLASS_NAME_SHOW$6 = 'show';
  const CLASS_NAME_COLLAPSE = 'collapse';
  const CLASS_NAME_COLLAPSING = 'collapsing';
  const CLASS_NAME_COLLAPSED = 'collapsed';

  const DIMENSION_WIDTH = 'width';
  const DIMENSION_HEIGHT = 'height';

  const EVENT_SHOW$4 = `show${EVENT_KEY$7}`;
  const EVENT_SHOWN$4 = `shown${EVENT_KEY$7}`;
  const EVENT_HIDE$4 = `hide${EVENT_KEY$7}`;
  const EVENT_HIDDEN$4 = `hidden${EVENT_KEY$7}`;
  const EVENT_CLICK_DATA_API$3 = `click${EVENT_KEY$7}${DATA_API_KEY$4}`;

  const SELECTOR_ACTIVES = '.show, .collapsing';
  const SELECTOR_DATA_TOGGLE$3 = '[data-toggle="collapse"]';

  const Default$6 = {
    toggle: true,
    parent: ''
  };

  const DefaultType$6 = {
    toggle: 'boolean',
    parent: '(string|element)'
  };

  /**
   * Class definition
   */

  class Collapse {
    constructor(element, config) {
      this._isTransitioning = false;
      this._element = element;
      this._config = this._getConfig(config);
      this._triggerArray = [].slice.call(document.querySelectorAll(
        `[data-toggle="collapse"][href="#${element.id}"],` +
        `[data-toggle="collapse"][data-target="#${element.id}"]`
      ));

      const toggleList = [].slice.call(document.querySelectorAll(SELECTOR_DATA_TOGGLE$3));
      for (let i = 0, len = toggleList.length; i < len; i++) {
        const elem = toggleList[i];
        const selector = Util.getSelectorFromElement(elem);
        const filterElement = [].slice.call(document.querySelectorAll(selector))
          .filter(foundElem => foundElem === element);

        if (selector !== null && filterElement.length > 0) {
          this._selector = selector;
          this._triggerArray.push(elem);
        }
      }

      this._parent = this._config.parent ? this._getParent() : null;

      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._element, this._triggerArray);
      }

      if (this._config.toggle) {
        this.toggle();
      }
    }

    // Getters
    static get VERSION() {
      return VERSION$7
    }

    static get Default() {
      return Default$6
    }

    // Public
    toggle() {
      if ($__default["default"](this._element).hasClass(CLASS_NAME_SHOW$6)) {
        this.hide();
      } else {
        this.show();
      }
    }

    show() {
      if (this._isTransitioning ||
        $__default["default"](this._element).hasClass(CLASS_NAME_SHOW$6)) {
        return
      }

      let actives;
      let activesData;

      if (this._parent) {
        actives = [].slice.call(this._parent.querySelectorAll(SELECTOR_ACTIVES))
          .filter(elem => {
            if (typeof this._config.parent === 'string') {
              return elem.getAttribute('data-parent') === this._config.parent
            }

            return elem.classList.contains(CLASS_NAME_COLLAPSE)
          });

        if (actives.length === 0) {
          actives = null;
        }
      }

      if (actives) {
        activesData = $__default["default"](actives).not(this._selector).data(DATA_KEY$7);
        if (activesData && activesData._isTransitioning) {
          return
        }
      }

      const startEvent = $__default["default"].Event(EVENT_SHOW$4);
      $__default["default"](this._element).trigger(startEvent);
      if (startEvent.isDefaultPrevented()) {
        return
      }

      if (actives) {
        Collapse._jQueryInterface.call($__default["default"](actives).not(this._selector), 'hide');
        if (!activesData) {
          $__default["default"](actives).data(DATA_KEY$7, null);
        }
      }

      const dimension = this._getDimension();

      $__default["default"](this._element)
        .removeClass(CLASS_NAME_COLLAPSE)
        .addClass(CLASS_NAME_COLLAPSING);

      this._element.style[dimension] = 0;

      if (this._triggerArray.length) {
        $__default["default"](this._triggerArray)
          .removeClass(CLASS_NAME_COLLAPSED)
          .attr('aria-expanded', true);
      }

      this.setTransitioning(true);

      const complete = () => {
        $__default["default"](this._element)
          .removeClass(CLASS_NAME_COLLAPSING)
          .addClass(`${CLASS_NAME_COLLAPSE} ${CLASS_NAME_SHOW$6}`);

        this._element.style[dimension] = '';

        this.setTransitioning(false);

        $__default["default"](this._element).trigger(EVENT_SHOWN$4);
      };

      const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      const scrollSize = `scroll${capitalizedDimension}`;
      const transitionDuration = Util.getTransitionDurationFromElement(this._element);

      $__default["default"](this._element)
        .one(Util.TRANSITION_END, complete)
        .emulateTransitionEnd(transitionDuration);

      this._element.style[dimension] = `${this._element[scrollSize]}px`;
    }

    hide() {
      if (this._isTransitioning ||
        !$__default["default"](this._element).hasClass(CLASS_NAME_SHOW$6)) {
        return
      }

      const startEvent = $__default["default"].Event(EVENT_HIDE$4);
      $__default["default"](this._element).trigger(startEvent);
      if (startEvent.isDefaultPrevented()) {
        return
      }

      const dimension = this._getDimension();

      this._element.style[dimension] = `${this._element.getBoundingClientRect()[dimension]}px`;

      Util.reflow(this._element);

      $__default["default"](this._element)
        .addClass(CLASS_NAME_COLLAPSING)
        .removeClass(`${CLASS_NAME_COLLAPSE} ${CLASS_NAME_SHOW$6}`);

      const triggerArrayLength = this._triggerArray.length;
      if (triggerArrayLength > 0) {
        for (let i = 0; i < triggerArrayLength; i++) {
          const trigger = this._triggerArray[i];
          const selector = Util.getSelectorFromElement(trigger);

          if (selector !== null) {
            const $elem = $__default["default"]([].slice.call(document.querySelectorAll(selector)));
            if (!$elem.hasClass(CLASS_NAME_SHOW$6)) {
              $__default["default"](trigger).addClass(CLASS_NAME_COLLAPSED)
                .attr('aria-expanded', false);
            }
          }
        }
      }

      this.setTransitioning(true);

      const complete = () => {
        this.setTransitioning(false);
        $__default["default"](this._element)
          .removeClass(CLASS_NAME_COLLAPSING)
          .addClass(CLASS_NAME_COLLAPSE)
          .trigger(EVENT_HIDDEN$4);
      };

      this._element.style[dimension] = '';
      const transitionDuration = Util.getTransitionDurationFromElement(this._element);

      $__default["default"](this._element)
        .one(Util.TRANSITION_END, complete)
        .emulateTransitionEnd(transitionDuration);
    }

    setTransitioning(isTransitioning) {
      this._isTransitioning = isTransitioning;
    }

    dispose() {
      $__default["default"].removeData(this._element, DATA_KEY$7);

      this._config = null;
      this._parent = null;
      this._element = null;
      this._triggerArray = null;
      this._isTransitioning = null;
    }

    // Private
    _getConfig(config) {
      config = {
        ...Default$6,
        ...config
      };
      config.toggle = Boolean(config.toggle); // Coerce string values
      Util.typeCheckConfig(NAME$7, config, DefaultType$6);
      return config
    }

    _getDimension() {
      const hasWidth = $__default["default"](this._element).hasClass(DIMENSION_WIDTH);
      return hasWidth ? DIMENSION_WIDTH : DIMENSION_HEIGHT
    }

    _getParent() {
      let parent;

      if (Util.isElement(this._config.parent)) {
        parent = this._config.parent;

        // It's a jQuery object
        if (typeof this._config.parent.jquery !== 'undefined') {
          parent = this._config.parent[0];
        }
      } else {
        parent = document.querySelector(this._config.parent);
      }

      const selector = `[data-toggle="collapse"][data-parent="${this._config.parent}"]`;
      const children = [].slice.call(parent.querySelectorAll(selector));

      $__default["default"](children).each((i, element) => {
        this._addAriaAndCollapsedClass(
          Collapse._getTargetFromElement(element),
          [element]
        );
      });

      return parent
    }

    _addAriaAndCollapsedClass(element, triggerArray) {
      const isOpen = $__default["default"](element).hasClass(CLASS_NAME_SHOW$6);

      if (triggerArray.length) {
        $__default["default"](triggerArray)
          .toggleClass(CLASS_NAME_COLLAPSED, !isOpen)
          .attr('aria-expanded', isOpen);
      }
    }

    // Static
    static _getTargetFromElement(element) {
      const selector = Util.getSelectorFromElement(element);
      return selector ? document.querySelector(selector) : null
    }

    static _jQueryInterface(config) {
      return this.each(function () {
        const $element = $__default["default"](this);
        let data = $element.data(DATA_KEY$7);
        const _config = {
          ...Default$6,
          ...$element.data(),
          ...(typeof config === 'object' && config ? config : {})
        };

        if (!data && _config.toggle && typeof config === 'string' && /show|hide/.test(config)) {
          _config.toggle = false;
        }

        if (!data) {
          data = new Collapse(this, _config);
          $element.data(DATA_KEY$7, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError(`No method named "${config}"`)
          }

          data[config]();
        }
      })
    }
  }

  /**
   * Data API implementation
   */

  $__default["default"](document).on(EVENT_CLICK_DATA_API$3, SELECTOR_DATA_TOGGLE$3, function (event) {
    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
    if (event.currentTarget.tagName === 'A') {
      event.preventDefault();
    }

    const $trigger = $__default["default"](this);
    const selector = Util.getSelectorFromElement(this);
    const selectors = [].slice.call(document.querySelectorAll(selector));

    $__default["default"](selectors).each(function () {
      const $target = $__default["default"](this);
      const data = $target.data(DATA_KEY$7);
      const config = data ? 'toggle' : $trigger.data();
      Collapse._jQueryInterface.call($target, config);
    });
  });

  /**
   * jQuery
   */

  $__default["default"].fn[NAME$7] = Collapse._jQueryInterface;
  $__default["default"].fn[NAME$7].Constructor = Collapse;
  $__default["default"].fn[NAME$7].noConflict = () => {
    $__default["default"].fn[NAME$7] = JQUERY_NO_CONFLICT$7;
    return Collapse._jQueryInterface
  };

  /**!
   * @fileOverview Kickass library to create and place poppers near their reference elements.
   * @version 1.16.1
   * @license
   * Copyright (c) 2016 Federico Zivolo and contributors
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */
  var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && typeof navigator !== 'undefined';

  var timeoutDuration = function () {
    var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
    for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
      if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
        return 1;
      }
    }
    return 0;
  }();

  function microtaskDebounce(fn) {
    var called = false;
    return function () {
      if (called) {
        return;
      }
      called = true;
      window.Promise.resolve().then(function () {
        called = false;
        fn();
      });
    };
  }

  function taskDebounce(fn) {
    var scheduled = false;
    return function () {
      if (!scheduled) {
        scheduled = true;
        setTimeout(function () {
          scheduled = false;
          fn();
        }, timeoutDuration);
      }
    };
  }

  var supportsMicroTasks = isBrowser && window.Promise;

  /**
  * Create a debounced version of a method, that's asynchronously deferred
  * but called in the minimum time possible.
  *
  * @method
  * @memberof Popper.Utils
  * @argument {Function} fn
  * @returns {Function}
  */
  var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;

  /**
   * Check if the given variable is a function
   * @method
   * @memberof Popper.Utils
   * @argument {Any} functionToCheck - variable to check
   * @returns {Boolean} answer to: is a function?
   */
  function isFunction(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
  }

  /**
   * Get CSS computed property of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Eement} element
   * @argument {String} property
   */
  function getStyleComputedProperty(element, property) {
    if (element.nodeType !== 1) {
      return [];
    }
    // NOTE: 1 DOM access here
    var window = element.ownerDocument.defaultView;
    var css = window.getComputedStyle(element, null);
    return property ? css[property] : css;
  }

  /**
   * Returns the parentNode or the host of the element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} parent
   */
  function getParentNode(element) {
    if (element.nodeName === 'HTML') {
      return element;
    }
    return element.parentNode || element.host;
  }

  /**
   * Returns the scrolling parent of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} scroll parent
   */
  function getScrollParent(element) {
    // Return body, `getScroll` will take care to get the correct `scrollTop` from it
    if (!element) {
      return document.body;
    }

    switch (element.nodeName) {
      case 'HTML':
      case 'BODY':
        return element.ownerDocument.body;
      case '#document':
        return element.body;
    }

    // Firefox want us to check `-x` and `-y` variations as well

    var _getStyleComputedProp = getStyleComputedProperty(element),
        overflow = _getStyleComputedProp.overflow,
        overflowX = _getStyleComputedProp.overflowX,
        overflowY = _getStyleComputedProp.overflowY;

    if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
      return element;
    }

    return getScrollParent(getParentNode(element));
  }

  /**
   * Returns the reference node of the reference object, or the reference object itself.
   * @method
   * @memberof Popper.Utils
   * @param {Element|Object} reference - the reference element (the popper will be relative to this)
   * @returns {Element} parent
   */
  function getReferenceNode(reference) {
    return reference && reference.referenceNode ? reference.referenceNode : reference;
  }

  var isIE11 = isBrowser && !!(window.MSInputMethodContext && document.documentMode);
  var isIE10 = isBrowser && /MSIE 10/.test(navigator.userAgent);

  /**
   * Determines if the browser is Internet Explorer
   * @method
   * @memberof Popper.Utils
   * @param {Number} version to check
   * @returns {Boolean} isIE
   */
  function isIE(version) {
    if (version === 11) {
      return isIE11;
    }
    if (version === 10) {
      return isIE10;
    }
    return isIE11 || isIE10;
  }

  /**
   * Returns the offset parent of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} offset parent
   */
  function getOffsetParent(element) {
    if (!element) {
      return document.documentElement;
    }

    var noOffsetParent = isIE(10) ? document.body : null;

    // NOTE: 1 DOM access here
    var offsetParent = element.offsetParent || null;
    // Skip hidden elements which don't have an offsetParent
    while (offsetParent === noOffsetParent && element.nextElementSibling) {
      offsetParent = (element = element.nextElementSibling).offsetParent;
    }

    var nodeName = offsetParent && offsetParent.nodeName;

    if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
      return element ? element.ownerDocument.documentElement : document.documentElement;
    }

    // .offsetParent will return the closest TH, TD or TABLE in case
    // no offsetParent is present, I hate this job...
    if (['TH', 'TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
      return getOffsetParent(offsetParent);
    }

    return offsetParent;
  }

  function isOffsetContainer(element) {
    var nodeName = element.nodeName;

    if (nodeName === 'BODY') {
      return false;
    }
    return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
  }

  /**
   * Finds the root node (document, shadowDOM root) of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} node
   * @returns {Element} root node
   */
  function getRoot(node) {
    if (node.parentNode !== null) {
      return getRoot(node.parentNode);
    }

    return node;
  }

  /**
   * Finds the offset parent common to the two provided nodes
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element1
   * @argument {Element} element2
   * @returns {Element} common offset parent
   */
  function findCommonOffsetParent(element1, element2) {
    // This check is needed to avoid errors in case one of the elements isn't defined for any reason
    if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
      return document.documentElement;
    }

    // Here we make sure to give as "start" the element that comes first in the DOM
    var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
    var start = order ? element1 : element2;
    var end = order ? element2 : element1;

    // Get common ancestor container
    var range = document.createRange();
    range.setStart(start, 0);
    range.setEnd(end, 0);
    var commonAncestorContainer = range.commonAncestorContainer;

    // Both nodes are inside #document

    if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
      if (isOffsetContainer(commonAncestorContainer)) {
        return commonAncestorContainer;
      }

      return getOffsetParent(commonAncestorContainer);
    }

    // one of the nodes is inside shadowDOM, find which one
    var element1root = getRoot(element1);
    if (element1root.host) {
      return findCommonOffsetParent(element1root.host, element2);
    } else {
      return findCommonOffsetParent(element1, getRoot(element2).host);
    }
  }

  /**
   * Gets the scroll value of the given element in the given side (top and left)
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @argument {String} side `top` or `left`
   * @returns {number} amount of scrolled pixels
   */
  function getScroll(element) {
    var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';

    var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
    var nodeName = element.nodeName;

    if (nodeName === 'BODY' || nodeName === 'HTML') {
      var html = element.ownerDocument.documentElement;
      var scrollingElement = element.ownerDocument.scrollingElement || html;
      return scrollingElement[upperSide];
    }

    return element[upperSide];
  }

  /*
   * Sum or subtract the element scroll values (left and top) from a given rect object
   * @method
   * @memberof Popper.Utils
   * @param {Object} rect - Rect object you want to change
   * @param {HTMLElement} element - The element from the function reads the scroll values
   * @param {Boolean} subtract - set to true if you want to subtract the scroll values
   * @return {Object} rect - The modifier rect object
   */
  function includeScroll(rect, element) {
    var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var scrollTop = getScroll(element, 'top');
    var scrollLeft = getScroll(element, 'left');
    var modifier = subtract ? -1 : 1;
    rect.top += scrollTop * modifier;
    rect.bottom += scrollTop * modifier;
    rect.left += scrollLeft * modifier;
    rect.right += scrollLeft * modifier;
    return rect;
  }

  /*
   * Helper to detect borders of a given element
   * @method
   * @memberof Popper.Utils
   * @param {CSSStyleDeclaration} styles
   * Result of `getStyleComputedProperty` on the given element
   * @param {String} axis - `x` or `y`
   * @return {number} borders - The borders size of the given axis
   */

  function getBordersSize(styles, axis) {
    var sideA = axis === 'x' ? 'Left' : 'Top';
    var sideB = sideA === 'Left' ? 'Right' : 'Bottom';

    return parseFloat(styles['border' + sideA + 'Width']) + parseFloat(styles['border' + sideB + 'Width']);
  }

  function getSize(axis, body, html, computedStyle) {
    return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE(10) ? parseInt(html['offset' + axis]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')]) : 0);
  }

  function getWindowSizes(document) {
    var body = document.body;
    var html = document.documentElement;
    var computedStyle = isIE(10) && getComputedStyle(html);

    return {
      height: getSize('Height', body, html, computedStyle),
      width: getSize('Width', body, html, computedStyle)
    };
  }

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();





  var defineProperty = function (obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  };

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  /**
   * Given element offsets, generate an output similar to getBoundingClientRect
   * @method
   * @memberof Popper.Utils
   * @argument {Object} offsets
   * @returns {Object} ClientRect like output
   */
  function getClientRect(offsets) {
    return _extends({}, offsets, {
      right: offsets.left + offsets.width,
      bottom: offsets.top + offsets.height
    });
  }

  /**
   * Get bounding client rect of given element
   * @method
   * @memberof Popper.Utils
   * @param {HTMLElement} element
   * @return {Object} client rect
   */
  function getBoundingClientRect(element) {
    var rect = {};

    // IE10 10 FIX: Please, don't ask, the element isn't
    // considered in DOM in some circumstances...
    // This isn't reproducible in IE10 compatibility mode of IE11
    try {
      if (isIE(10)) {
        rect = element.getBoundingClientRect();
        var scrollTop = getScroll(element, 'top');
        var scrollLeft = getScroll(element, 'left');
        rect.top += scrollTop;
        rect.left += scrollLeft;
        rect.bottom += scrollTop;
        rect.right += scrollLeft;
      } else {
        rect = element.getBoundingClientRect();
      }
    } catch (e) {}

    var result = {
      left: rect.left,
      top: rect.top,
      width: rect.right - rect.left,
      height: rect.bottom - rect.top
    };

    // subtract scrollbar size from sizes
    var sizes = element.nodeName === 'HTML' ? getWindowSizes(element.ownerDocument) : {};
    var width = sizes.width || element.clientWidth || result.width;
    var height = sizes.height || element.clientHeight || result.height;

    var horizScrollbar = element.offsetWidth - width;
    var vertScrollbar = element.offsetHeight - height;

    // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
    // we make this check conditional for performance reasons
    if (horizScrollbar || vertScrollbar) {
      var styles = getStyleComputedProperty(element);
      horizScrollbar -= getBordersSize(styles, 'x');
      vertScrollbar -= getBordersSize(styles, 'y');

      result.width -= horizScrollbar;
      result.height -= vertScrollbar;
    }

    return getClientRect(result);
  }

  function getOffsetRectRelativeToArbitraryNode(children, parent) {
    var fixedPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var isIE10 = isIE(10);
    var isHTML = parent.nodeName === 'HTML';
    var childrenRect = getBoundingClientRect(children);
    var parentRect = getBoundingClientRect(parent);
    var scrollParent = getScrollParent(children);

    var styles = getStyleComputedProperty(parent);
    var borderTopWidth = parseFloat(styles.borderTopWidth);
    var borderLeftWidth = parseFloat(styles.borderLeftWidth);

    // In cases where the parent is fixed, we must ignore negative scroll in offset calc
    if (fixedPosition && isHTML) {
      parentRect.top = Math.max(parentRect.top, 0);
      parentRect.left = Math.max(parentRect.left, 0);
    }
    var offsets = getClientRect({
      top: childrenRect.top - parentRect.top - borderTopWidth,
      left: childrenRect.left - parentRect.left - borderLeftWidth,
      width: childrenRect.width,
      height: childrenRect.height
    });
    offsets.marginTop = 0;
    offsets.marginLeft = 0;

    // Subtract margins of documentElement in case it's being used as parent
    // we do this only on HTML because it's the only element that behaves
    // differently when margins are applied to it. The margins are included in
    // the box of the documentElement, in the other cases not.
    if (!isIE10 && isHTML) {
      var marginTop = parseFloat(styles.marginTop);
      var marginLeft = parseFloat(styles.marginLeft);

      offsets.top -= borderTopWidth - marginTop;
      offsets.bottom -= borderTopWidth - marginTop;
      offsets.left -= borderLeftWidth - marginLeft;
      offsets.right -= borderLeftWidth - marginLeft;

      // Attach marginTop and marginLeft because in some circumstances we may need them
      offsets.marginTop = marginTop;
      offsets.marginLeft = marginLeft;
    }

    if (isIE10 && !fixedPosition ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
      offsets = includeScroll(offsets, parent);
    }

    return offsets;
  }

  function getViewportOffsetRectRelativeToArtbitraryNode(element) {
    var excludeScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var html = element.ownerDocument.documentElement;
    var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
    var width = Math.max(html.clientWidth, window.innerWidth || 0);
    var height = Math.max(html.clientHeight, window.innerHeight || 0);

    var scrollTop = !excludeScroll ? getScroll(html) : 0;
    var scrollLeft = !excludeScroll ? getScroll(html, 'left') : 0;

    var offset = {
      top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
      left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
      width: width,
      height: height
    };

    return getClientRect(offset);
  }

  /**
   * Check if the given element is fixed or is inside a fixed parent
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @argument {Element} customContainer
   * @returns {Boolean} answer to "isFixed?"
   */
  function isFixed(element) {
    var nodeName = element.nodeName;
    if (nodeName === 'BODY' || nodeName === 'HTML') {
      return false;
    }
    if (getStyleComputedProperty(element, 'position') === 'fixed') {
      return true;
    }
    var parentNode = getParentNode(element);
    if (!parentNode) {
      return false;
    }
    return isFixed(parentNode);
  }

  /**
   * Finds the first parent of an element that has a transformed property defined
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} first transformed parent or documentElement
   */

  function getFixedPositionOffsetParent(element) {
    // This check is needed to avoid errors in case one of the elements isn't defined for any reason
    if (!element || !element.parentElement || isIE()) {
      return document.documentElement;
    }
    var el = element.parentElement;
    while (el && getStyleComputedProperty(el, 'transform') === 'none') {
      el = el.parentElement;
    }
    return el || document.documentElement;
  }

  /**
   * Computed the boundaries limits and return them
   * @method
   * @memberof Popper.Utils
   * @param {HTMLElement} popper
   * @param {HTMLElement} reference
   * @param {number} padding
   * @param {HTMLElement} boundariesElement - Element used to define the boundaries
   * @param {Boolean} fixedPosition - Is in fixed position mode
   * @returns {Object} Coordinates of the boundaries
   */
  function getBoundaries(popper, reference, padding, boundariesElement) {
    var fixedPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

    // NOTE: 1 DOM access here

    var boundaries = { top: 0, left: 0 };
    var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));

    // Handle viewport case
    if (boundariesElement === 'viewport') {
      boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
    } else {
      // Handle other cases based on DOM element used as boundaries
      var boundariesNode = void 0;
      if (boundariesElement === 'scrollParent') {
        boundariesNode = getScrollParent(getParentNode(reference));
        if (boundariesNode.nodeName === 'BODY') {
          boundariesNode = popper.ownerDocument.documentElement;
        }
      } else if (boundariesElement === 'window') {
        boundariesNode = popper.ownerDocument.documentElement;
      } else {
        boundariesNode = boundariesElement;
      }

      var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition);

      // In case of HTML, we need a different computation
      if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
        var _getWindowSizes = getWindowSizes(popper.ownerDocument),
            height = _getWindowSizes.height,
            width = _getWindowSizes.width;

        boundaries.top += offsets.top - offsets.marginTop;
        boundaries.bottom = height + offsets.top;
        boundaries.left += offsets.left - offsets.marginLeft;
        boundaries.right = width + offsets.left;
      } else {
        // for all the other DOM elements, this one is good
        boundaries = offsets;
      }
    }

    // Add paddings
    padding = padding || 0;
    var isPaddingNumber = typeof padding === 'number';
    boundaries.left += isPaddingNumber ? padding : padding.left || 0;
    boundaries.top += isPaddingNumber ? padding : padding.top || 0;
    boundaries.right -= isPaddingNumber ? padding : padding.right || 0;
    boundaries.bottom -= isPaddingNumber ? padding : padding.bottom || 0;

    return boundaries;
  }

  function getArea(_ref) {
    var width = _ref.width,
        height = _ref.height;

    return width * height;
  }

  /**
   * Utility used to transform the `auto` placement to the placement with more
   * available space.
   * @method
   * @memberof Popper.Utils
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
    var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

    if (placement.indexOf('auto') === -1) {
      return placement;
    }

    var boundaries = getBoundaries(popper, reference, padding, boundariesElement);

    var rects = {
      top: {
        width: boundaries.width,
        height: refRect.top - boundaries.top
      },
      right: {
        width: boundaries.right - refRect.right,
        height: boundaries.height
      },
      bottom: {
        width: boundaries.width,
        height: boundaries.bottom - refRect.bottom
      },
      left: {
        width: refRect.left - boundaries.left,
        height: boundaries.height
      }
    };

    var sortedAreas = Object.keys(rects).map(function (key) {
      return _extends({
        key: key
      }, rects[key], {
        area: getArea(rects[key])
      });
    }).sort(function (a, b) {
      return b.area - a.area;
    });

    var filteredAreas = sortedAreas.filter(function (_ref2) {
      var width = _ref2.width,
          height = _ref2.height;
      return width >= popper.clientWidth && height >= popper.clientHeight;
    });

    var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;

    var variation = placement.split('-')[1];

    return computedPlacement + (variation ? '-' + variation : '');
  }

  /**
   * Get offsets to the reference element
   * @method
   * @memberof Popper.Utils
   * @param {Object} state
   * @param {Element} popper - the popper element
   * @param {Element} reference - the reference element (the popper will be relative to this)
   * @param {Element} fixedPosition - is in fixed position mode
   * @returns {Object} An object containing the offsets which will be applied to the popper
   */
  function getReferenceOffsets(state, popper, reference) {
    var fixedPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));
    return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
  }

  /**
   * Get the outer sizes of the given element (offset size + margins)
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Object} object containing width and height properties
   */
  function getOuterSizes(element) {
    var window = element.ownerDocument.defaultView;
    var styles = window.getComputedStyle(element);
    var x = parseFloat(styles.marginTop || 0) + parseFloat(styles.marginBottom || 0);
    var y = parseFloat(styles.marginLeft || 0) + parseFloat(styles.marginRight || 0);
    var result = {
      width: element.offsetWidth + y,
      height: element.offsetHeight + x
    };
    return result;
  }

  /**
   * Get the opposite placement of the given one
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement
   * @returns {String} flipped placement
   */
  function getOppositePlacement(placement) {
    var hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
    return placement.replace(/left|right|bottom|top/g, function (matched) {
      return hash[matched];
    });
  }

  /**
   * Get offsets to the popper
   * @method
   * @memberof Popper.Utils
   * @param {Object} position - CSS position the Popper will get applied
   * @param {HTMLElement} popper - the popper element
   * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
   * @param {String} placement - one of the valid placement options
   * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
   */
  function getPopperOffsets(popper, referenceOffsets, placement) {
    placement = placement.split('-')[0];

    // Get popper node sizes
    var popperRect = getOuterSizes(popper);

    // Add position, width and height to our offsets object
    var popperOffsets = {
      width: popperRect.width,
      height: popperRect.height
    };

    // depending by the popper placement we have to compute its offsets slightly differently
    var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
    var mainSide = isHoriz ? 'top' : 'left';
    var secondarySide = isHoriz ? 'left' : 'top';
    var measurement = isHoriz ? 'height' : 'width';
    var secondaryMeasurement = !isHoriz ? 'height' : 'width';

    popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
    if (placement === secondarySide) {
      popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
    } else {
      popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
    }

    return popperOffsets;
  }

  /**
   * Mimics the `find` method of Array
   * @method
   * @memberof Popper.Utils
   * @argument {Array} arr
   * @argument prop
   * @argument value
   * @returns index or -1
   */
  function find(arr, check) {
    // use native find if supported
    if (Array.prototype.find) {
      return arr.find(check);
    }

    // use `filter` to obtain the same behavior of `find`
    return arr.filter(check)[0];
  }

  /**
   * Return the index of the matching object
   * @method
   * @memberof Popper.Utils
   * @argument {Array} arr
   * @argument prop
   * @argument value
   * @returns index or -1
   */
  function findIndex(arr, prop, value) {
    // use native findIndex if supported
    if (Array.prototype.findIndex) {
      return arr.findIndex(function (cur) {
        return cur[prop] === value;
      });
    }

    // use `find` + `indexOf` if `findIndex` isn't supported
    var match = find(arr, function (obj) {
      return obj[prop] === value;
    });
    return arr.indexOf(match);
  }

  /**
   * Loop trough the list of modifiers and run them in order,
   * each of them will then edit the data object.
   * @method
   * @memberof Popper.Utils
   * @param {dataObject} data
   * @param {Array} modifiers
   * @param {String} ends - Optional modifier name used as stopper
   * @returns {dataObject}
   */
  function runModifiers(modifiers, data, ends) {
    var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));

    modifiersToRun.forEach(function (modifier) {
      if (modifier['function']) {
        // eslint-disable-line dot-notation
        console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
      }
      var fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation
      if (modifier.enabled && isFunction(fn)) {
        // Add properties to offsets to make them a complete clientRect object
        // we do this before each modifier to make sure the previous one doesn't
        // mess with these values
        data.offsets.popper = getClientRect(data.offsets.popper);
        data.offsets.reference = getClientRect(data.offsets.reference);

        data = fn(data, modifier);
      }
    });

    return data;
  }

  /**
   * Updates the position of the popper, computing the new offsets and applying
   * the new style.<br />
   * Prefer `scheduleUpdate` over `update` because of performance reasons.
   * @method
   * @memberof Popper
   */
  function update() {
    // if popper is destroyed, don't perform any further update
    if (this.state.isDestroyed) {
      return;
    }

    var data = {
      instance: this,
      styles: {},
      arrowStyles: {},
      attributes: {},
      flipped: false,
      offsets: {}
    };

    // compute reference element offsets
    data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed);

    // compute auto placement, store placement inside the data object,
    // modifiers will be able to edit `placement` if needed
    // and refer to originalPlacement to know the original value
    data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);

    // store the computed placement inside `originalPlacement`
    data.originalPlacement = data.placement;

    data.positionFixed = this.options.positionFixed;

    // compute the popper offsets
    data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);

    data.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute';

    // run the modifiers
    data = runModifiers(this.modifiers, data);

    // the first `update` will call `onCreate` callback
    // the other ones will call `onUpdate` callback
    if (!this.state.isCreated) {
      this.state.isCreated = true;
      this.options.onCreate(data);
    } else {
      this.options.onUpdate(data);
    }
  }

  /**
   * Helper used to know if the given modifier is enabled.
   * @method
   * @memberof Popper.Utils
   * @returns {Boolean}
   */
  function isModifierEnabled(modifiers, modifierName) {
    return modifiers.some(function (_ref) {
      var name = _ref.name,
          enabled = _ref.enabled;
      return enabled && name === modifierName;
    });
  }

  /**
   * Get the prefixed supported property name
   * @method
   * @memberof Popper.Utils
   * @argument {String} property (camelCase)
   * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
   */
  function getSupportedPropertyName(property) {
    var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
    var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

    for (var i = 0; i < prefixes.length; i++) {
      var prefix = prefixes[i];
      var toCheck = prefix ? '' + prefix + upperProp : property;
      if (typeof document.body.style[toCheck] !== 'undefined') {
        return toCheck;
      }
    }
    return null;
  }

  /**
   * Destroys the popper.
   * @method
   * @memberof Popper
   */
  function destroy() {
    this.state.isDestroyed = true;

    // touch DOM only if `applyStyle` modifier is enabled
    if (isModifierEnabled(this.modifiers, 'applyStyle')) {
      this.popper.removeAttribute('x-placement');
      this.popper.style.position = '';
      this.popper.style.top = '';
      this.popper.style.left = '';
      this.popper.style.right = '';
      this.popper.style.bottom = '';
      this.popper.style.willChange = '';
      this.popper.style[getSupportedPropertyName('transform')] = '';
    }

    this.disableEventListeners();

    // remove the popper if user explicitly asked for the deletion on destroy
    // do not use `remove` because IE11 doesn't support it
    if (this.options.removeOnDestroy) {
      this.popper.parentNode.removeChild(this.popper);
    }
    return this;
  }

  /**
   * Get the window associated with the element
   * @argument {Element} element
   * @returns {Window}
   */
  function getWindow(element) {
    var ownerDocument = element.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView : window;
  }

  function attachToScrollParents(scrollParent, event, callback, scrollParents) {
    var isBody = scrollParent.nodeName === 'BODY';
    var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
    target.addEventListener(event, callback, { passive: true });

    if (!isBody) {
      attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
    }
    scrollParents.push(target);
  }

  /**
   * Setup needed event listeners used to update the popper position
   * @method
   * @memberof Popper.Utils
   * @private
   */
  function setupEventListeners(reference, options, state, updateBound) {
    // Resize event listener on window
    state.updateBound = updateBound;
    getWindow(reference).addEventListener('resize', state.updateBound, { passive: true });

    // Scroll event listener on scroll parents
    var scrollElement = getScrollParent(reference);
    attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
    state.scrollElement = scrollElement;
    state.eventsEnabled = true;

    return state;
  }

  /**
   * It will add resize/scroll events and start recalculating
   * position of the popper element when they are triggered.
   * @method
   * @memberof Popper
   */
  function enableEventListeners() {
    if (!this.state.eventsEnabled) {
      this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
    }
  }

  /**
   * Remove event listeners used to update the popper position
   * @method
   * @memberof Popper.Utils
   * @private
   */
  function removeEventListeners(reference, state) {
    // Remove resize event listener on window
    getWindow(reference).removeEventListener('resize', state.updateBound);

    // Remove scroll event listener on scroll parents
    state.scrollParents.forEach(function (target) {
      target.removeEventListener('scroll', state.updateBound);
    });

    // Reset state
    state.updateBound = null;
    state.scrollParents = [];
    state.scrollElement = null;
    state.eventsEnabled = false;
    return state;
  }

  /**
   * It will remove resize/scroll events and won't recalculate popper position
   * when they are triggered. It also won't trigger `onUpdate` callback anymore,
   * unless you call `update` method manually.
   * @method
   * @memberof Popper
   */
  function disableEventListeners() {
    if (this.state.eventsEnabled) {
      cancelAnimationFrame(this.scheduleUpdate);
      this.state = removeEventListeners(this.reference, this.state);
    }
  }

  /**
   * Tells if a given input is a number
   * @method
   * @memberof Popper.Utils
   * @param {*} input to check
   * @return {Boolean}
   */
  function isNumeric(n) {
    return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
  }

  /**
   * Set the style to the given popper
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element - Element to apply the style to
   * @argument {Object} styles
   * Object with a list of properties and values which will be applied to the element
   */
  function setStyles(element, styles) {
    Object.keys(styles).forEach(function (prop) {
      var unit = '';
      // add unit if the value is numeric and is one of the following
      if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
        unit = 'px';
      }
      element.style[prop] = styles[prop] + unit;
    });
  }

  /**
   * Set the attributes to the given popper
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element - Element to apply the attributes to
   * @argument {Object} styles
   * Object with a list of properties and values which will be applied to the element
   */
  function setAttributes(element, attributes) {
    Object.keys(attributes).forEach(function (prop) {
      var value = attributes[prop];
      if (value !== false) {
        element.setAttribute(prop, attributes[prop]);
      } else {
        element.removeAttribute(prop);
      }
    });
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} data.styles - List of style properties - values to apply to popper element
   * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The same data object
   */
  function applyStyle(data) {
    // any property present in `data.styles` will be applied to the popper,
    // in this way we can make the 3rd party modifiers add custom styles to it
    // Be aware, modifiers could override the properties defined in the previous
    // lines of this modifier!
    setStyles(data.instance.popper, data.styles);

    // any property present in `data.attributes` will be applied to the popper,
    // they will be set as HTML attributes of the element
    setAttributes(data.instance.popper, data.attributes);

    // if arrowElement is defined and arrowStyles has some properties
    if (data.arrowElement && Object.keys(data.arrowStyles).length) {
      setStyles(data.arrowElement, data.arrowStyles);
    }

    return data;
  }

  /**
   * Set the x-placement attribute before everything else because it could be used
   * to add margins to the popper margins needs to be calculated to get the
   * correct popper offsets.
   * @method
   * @memberof Popper.modifiers
   * @param {HTMLElement} reference - The reference element used to position the popper
   * @param {HTMLElement} popper - The HTML element used as popper
   * @param {Object} options - Popper.js options
   */
  function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
    // compute reference element offsets
    var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed);

    // compute auto placement, store placement inside the data object,
    // modifiers will be able to edit `placement` if needed
    // and refer to originalPlacement to know the original value
    var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);

    popper.setAttribute('x-placement', placement);

    // Apply `position` to popper before anything else because
    // without the position applied we can't guarantee correct computations
    setStyles(popper, { position: options.positionFixed ? 'fixed' : 'absolute' });

    return options;
  }

  /**
   * @function
   * @memberof Popper.Utils
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Boolean} shouldRound - If the offsets should be rounded at all
   * @returns {Object} The popper's position offsets rounded
   *
   * The tale of pixel-perfect positioning. It's still not 100% perfect, but as
   * good as it can be within reason.
   * Discussion here: https://github.com/FezVrasta/popper.js/pull/715
   *
   * Low DPI screens cause a popper to be blurry if not using full pixels (Safari
   * as well on High DPI screens).
   *
   * Firefox prefers no rounding for positioning and does not have blurriness on
   * high DPI screens.
   *
   * Only horizontal placement and left/right values need to be considered.
   */
  function getRoundedOffsets(data, shouldRound) {
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;
    var round = Math.round,
        floor = Math.floor;

    var noRound = function noRound(v) {
      return v;
    };

    var referenceWidth = round(reference.width);
    var popperWidth = round(popper.width);

    var isVertical = ['left', 'right'].indexOf(data.placement) !== -1;
    var isVariation = data.placement.indexOf('-') !== -1;
    var sameWidthParity = referenceWidth % 2 === popperWidth % 2;
    var bothOddWidth = referenceWidth % 2 === 1 && popperWidth % 2 === 1;

    var horizontalToInteger = !shouldRound ? noRound : isVertical || isVariation || sameWidthParity ? round : floor;
    var verticalToInteger = !shouldRound ? noRound : round;

    return {
      left: horizontalToInteger(bothOddWidth && !isVariation && shouldRound ? popper.left - 1 : popper.left),
      top: verticalToInteger(popper.top),
      bottom: verticalToInteger(popper.bottom),
      right: horizontalToInteger(popper.right)
    };
  }

  var isFirefox = isBrowser && /Firefox/i.test(navigator.userAgent);

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function computeStyle(data, options) {
    var x = options.x,
        y = options.y;
    var popper = data.offsets.popper;

    // Remove this legacy support in Popper.js v2

    var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {
      return modifier.name === 'applyStyle';
    }).gpuAcceleration;
    if (legacyGpuAccelerationOption !== undefined) {
      console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
    }
    var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;

    var offsetParent = getOffsetParent(data.instance.popper);
    var offsetParentRect = getBoundingClientRect(offsetParent);

    // Styles
    var styles = {
      position: popper.position
    };

    var offsets = getRoundedOffsets(data, window.devicePixelRatio < 2 || !isFirefox);

    var sideA = x === 'bottom' ? 'top' : 'bottom';
    var sideB = y === 'right' ? 'left' : 'right';

    // if gpuAcceleration is set to `true` and transform is supported,
    //  we use `translate3d` to apply the position to the popper we
    // automatically use the supported prefixed version if needed
    var prefixedProperty = getSupportedPropertyName('transform');

    // now, let's make a step back and look at this code closely (wtf?)
    // If the content of the popper grows once it's been positioned, it
    // may happen that the popper gets misplaced because of the new content
    // overflowing its reference element
    // To avoid this problem, we provide two options (x and y), which allow
    // the consumer to define the offset origin.
    // If we position a popper on top of a reference element, we can set
    // `x` to `top` to make the popper grow towards its top instead of
    // its bottom.
    var left = void 0,
        top = void 0;
    if (sideA === 'bottom') {
      // when offsetParent is <html> the positioning is relative to the bottom of the screen (excluding the scrollbar)
      // and not the bottom of the html element
      if (offsetParent.nodeName === 'HTML') {
        top = -offsetParent.clientHeight + offsets.bottom;
      } else {
        top = -offsetParentRect.height + offsets.bottom;
      }
    } else {
      top = offsets.top;
    }
    if (sideB === 'right') {
      if (offsetParent.nodeName === 'HTML') {
        left = -offsetParent.clientWidth + offsets.right;
      } else {
        left = -offsetParentRect.width + offsets.right;
      }
    } else {
      left = offsets.left;
    }
    if (gpuAcceleration && prefixedProperty) {
      styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
      styles[sideA] = 0;
      styles[sideB] = 0;
      styles.willChange = 'transform';
    } else {
      // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
      var invertTop = sideA === 'bottom' ? -1 : 1;
      var invertLeft = sideB === 'right' ? -1 : 1;
      styles[sideA] = top * invertTop;
      styles[sideB] = left * invertLeft;
      styles.willChange = sideA + ', ' + sideB;
    }

    // Attributes
    var attributes = {
      'x-placement': data.placement
    };

    // Update `data` attributes, styles and arrowStyles
    data.attributes = _extends({}, attributes, data.attributes);
    data.styles = _extends({}, styles, data.styles);
    data.arrowStyles = _extends({}, data.offsets.arrow, data.arrowStyles);

    return data;
  }

  /**
   * Helper used to know if the given modifier depends from another one.<br />
   * It checks if the needed modifier is listed and enabled.
   * @method
   * @memberof Popper.Utils
   * @param {Array} modifiers - list of modifiers
   * @param {String} requestingName - name of requesting modifier
   * @param {String} requestedName - name of requested modifier
   * @returns {Boolean}
   */
  function isModifierRequired(modifiers, requestingName, requestedName) {
    var requesting = find(modifiers, function (_ref) {
      var name = _ref.name;
      return name === requestingName;
    });

    var isRequired = !!requesting && modifiers.some(function (modifier) {
      return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
    });

    if (!isRequired) {
      var _requesting = '`' + requestingName + '`';
      var requested = '`' + requestedName + '`';
      console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
    }
    return isRequired;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function arrow(data, options) {
    var _data$offsets$arrow;

    // arrow depends on keepTogether in order to work
    if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
      return data;
    }

    var arrowElement = options.element;

    // if arrowElement is a string, suppose it's a CSS selector
    if (typeof arrowElement === 'string') {
      arrowElement = data.instance.popper.querySelector(arrowElement);

      // if arrowElement is not found, don't run the modifier
      if (!arrowElement) {
        return data;
      }
    } else {
      // if the arrowElement isn't a query selector we must check that the
      // provided DOM node is child of its popper node
      if (!data.instance.popper.contains(arrowElement)) {
        console.warn('WARNING: `arrow.element` must be child of its popper element!');
        return data;
      }
    }

    var placement = data.placement.split('-')[0];
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;

    var isVertical = ['left', 'right'].indexOf(placement) !== -1;

    var len = isVertical ? 'height' : 'width';
    var sideCapitalized = isVertical ? 'Top' : 'Left';
    var side = sideCapitalized.toLowerCase();
    var altSide = isVertical ? 'left' : 'top';
    var opSide = isVertical ? 'bottom' : 'right';
    var arrowElementSize = getOuterSizes(arrowElement)[len];

    //
    // extends keepTogether behavior making sure the popper and its
    // reference have enough pixels in conjunction
    //

    // top/left side
    if (reference[opSide] - arrowElementSize < popper[side]) {
      data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
    }
    // bottom/right side
    if (reference[side] + arrowElementSize > popper[opSide]) {
      data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
    }
    data.offsets.popper = getClientRect(data.offsets.popper);

    // compute center of the popper
    var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;

    // Compute the sideValue using the updated popper offsets
    // take popper margin in account because we don't have this info available
    var css = getStyleComputedProperty(data.instance.popper);
    var popperMarginSide = parseFloat(css['margin' + sideCapitalized]);
    var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width']);
    var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide;

    // prevent arrowElement from being placed not contiguously to its popper
    sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);

    data.arrowElement = arrowElement;
    data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);

    return data;
  }

  /**
   * Get the opposite placement variation of the given one
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement variation
   * @returns {String} flipped placement variation
   */
  function getOppositeVariation(variation) {
    if (variation === 'end') {
      return 'start';
    } else if (variation === 'start') {
      return 'end';
    }
    return variation;
  }

  /**
   * List of accepted placements to use as values of the `placement` option.<br />
   * Valid placements are:
   * - `auto`
   * - `top`
   * - `right`
   * - `bottom`
   * - `left`
   *
   * Each placement can have a variation from this list:
   * - `-start`
   * - `-end`
   *
   * Variations are interpreted easily if you think of them as the left to right
   * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
   * is right.<br />
   * Vertically (`left` and `right`), `start` is top and `end` is bottom.
   *
   * Some valid examples are:
   * - `top-end` (on top of reference, right aligned)
   * - `right-start` (on right of reference, top aligned)
   * - `bottom` (on bottom, centered)
   * - `auto-end` (on the side with more space available, alignment depends by placement)
   *
   * @static
   * @type {Array}
   * @enum {String}
   * @readonly
   * @method placements
   * @memberof Popper
   */
  var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];

  // Get rid of `auto` `auto-start` and `auto-end`
  var validPlacements = placements.slice(3);

  /**
   * Given an initial placement, returns all the subsequent placements
   * clockwise (or counter-clockwise).
   *
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement - A valid placement (it accepts variations)
   * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
   * @returns {Array} placements including their variations
   */
  function clockwise(placement) {
    var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var index = validPlacements.indexOf(placement);
    var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
    return counter ? arr.reverse() : arr;
  }

  var BEHAVIORS = {
    FLIP: 'flip',
    CLOCKWISE: 'clockwise',
    COUNTERCLOCKWISE: 'counterclockwise'
  };

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function flip(data, options) {
    // if `inner` modifier is enabled, we can't use the `flip` modifier
    if (isModifierEnabled(data.instance.modifiers, 'inner')) {
      return data;
    }

    if (data.flipped && data.placement === data.originalPlacement) {
      // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
      return data;
    }

    var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement, data.positionFixed);

    var placement = data.placement.split('-')[0];
    var placementOpposite = getOppositePlacement(placement);
    var variation = data.placement.split('-')[1] || '';

    var flipOrder = [];

    switch (options.behavior) {
      case BEHAVIORS.FLIP:
        flipOrder = [placement, placementOpposite];
        break;
      case BEHAVIORS.CLOCKWISE:
        flipOrder = clockwise(placement);
        break;
      case BEHAVIORS.COUNTERCLOCKWISE:
        flipOrder = clockwise(placement, true);
        break;
      default:
        flipOrder = options.behavior;
    }

    flipOrder.forEach(function (step, index) {
      if (placement !== step || flipOrder.length === index + 1) {
        return data;
      }

      placement = data.placement.split('-')[0];
      placementOpposite = getOppositePlacement(placement);

      var popperOffsets = data.offsets.popper;
      var refOffsets = data.offsets.reference;

      // using floor because the reference offsets may contain decimals we are not going to consider here
      var floor = Math.floor;
      var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);

      var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
      var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
      var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
      var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);

      var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;

      // flip the variation if required
      var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;

      // flips variation if reference element overflows boundaries
      var flippedVariationByRef = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

      // flips variation if popper content overflows boundaries
      var flippedVariationByContent = !!options.flipVariationsByContent && (isVertical && variation === 'start' && overflowsRight || isVertical && variation === 'end' && overflowsLeft || !isVertical && variation === 'start' && overflowsBottom || !isVertical && variation === 'end' && overflowsTop);

      var flippedVariation = flippedVariationByRef || flippedVariationByContent;

      if (overlapsRef || overflowsBoundaries || flippedVariation) {
        // this boolean to detect any flip loop
        data.flipped = true;

        if (overlapsRef || overflowsBoundaries) {
          placement = flipOrder[index + 1];
        }

        if (flippedVariation) {
          variation = getOppositeVariation(variation);
        }

        data.placement = placement + (variation ? '-' + variation : '');

        // this object contains `position`, we want to preserve it along with
        // any additional property we may add in the future
        data.offsets.popper = _extends({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));

        data = runModifiers(data.instance.modifiers, data, 'flip');
      }
    });
    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function keepTogether(data) {
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;

    var placement = data.placement.split('-')[0];
    var floor = Math.floor;
    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
    var side = isVertical ? 'right' : 'bottom';
    var opSide = isVertical ? 'left' : 'top';
    var measurement = isVertical ? 'width' : 'height';

    if (popper[side] < floor(reference[opSide])) {
      data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
    }
    if (popper[opSide] > floor(reference[side])) {
      data.offsets.popper[opSide] = floor(reference[side]);
    }

    return data;
  }

  /**
   * Converts a string containing value + unit into a px value number
   * @function
   * @memberof {modifiers~offset}
   * @private
   * @argument {String} str - Value + unit string
   * @argument {String} measurement - `height` or `width`
   * @argument {Object} popperOffsets
   * @argument {Object} referenceOffsets
   * @returns {Number|String}
   * Value in pixels, or original string if no values were extracted
   */
  function toValue(str, measurement, popperOffsets, referenceOffsets) {
    // separate value from unit
    var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
    var value = +split[1];
    var unit = split[2];

    // If it's not a number it's an operator, I guess
    if (!value) {
      return str;
    }

    if (unit.indexOf('%') === 0) {
      var element = void 0;
      switch (unit) {
        case '%p':
          element = popperOffsets;
          break;
        case '%':
        case '%r':
        default:
          element = referenceOffsets;
      }

      var rect = getClientRect(element);
      return rect[measurement] / 100 * value;
    } else if (unit === 'vh' || unit === 'vw') {
      // if is a vh or vw, we calculate the size based on the viewport
      var size = void 0;
      if (unit === 'vh') {
        size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      } else {
        size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      }
      return size / 100 * value;
    } else {
      // if is an explicit pixel unit, we get rid of the unit and keep the value
      // if is an implicit unit, it's px, and we return just the value
      return value;
    }
  }

  /**
   * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
   * @function
   * @memberof {modifiers~offset}
   * @private
   * @argument {String} offset
   * @argument {Object} popperOffsets
   * @argument {Object} referenceOffsets
   * @argument {String} basePlacement
   * @returns {Array} a two cells array with x and y offsets in numbers
   */
  function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
    var offsets = [0, 0];

    // Use height if placement is left or right and index is 0 otherwise use width
    // in this way the first offset will use an axis and the second one
    // will use the other one
    var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;

    // Split the offset string to obtain a list of values and operands
    // The regex addresses values with the plus or minus sign in front (+10, -20, etc)
    var fragments = offset.split(/(\+|\-)/).map(function (frag) {
      return frag.trim();
    });

    // Detect if the offset string contains a pair of values or a single one
    // they could be separated by comma or space
    var divider = fragments.indexOf(find(fragments, function (frag) {
      return frag.search(/,|\s/) !== -1;
    }));

    if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
      console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
    }

    // If divider is found, we divide the list of values and operands to divide
    // them by ofset X and Y.
    var splitRegex = /\s*,\s*|\s+/;
    var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];

    // Convert the values with units to absolute pixels to allow our computations
    ops = ops.map(function (op, index) {
      // Most of the units rely on the orientation of the popper
      var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
      var mergeWithPrevious = false;
      return op
      // This aggregates any `+` or `-` sign that aren't considered operators
      // e.g.: 10 + +5 => [10, +, +5]
      .reduce(function (a, b) {
        if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
          a[a.length - 1] = b;
          mergeWithPrevious = true;
          return a;
        } else if (mergeWithPrevious) {
          a[a.length - 1] += b;
          mergeWithPrevious = false;
          return a;
        } else {
          return a.concat(b);
        }
      }, [])
      // Here we convert the string values into number values (in px)
      .map(function (str) {
        return toValue(str, measurement, popperOffsets, referenceOffsets);
      });
    });

    // Loop trough the offsets arrays and execute the operations
    ops.forEach(function (op, index) {
      op.forEach(function (frag, index2) {
        if (isNumeric(frag)) {
          offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
        }
      });
    });
    return offsets;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @argument {Number|String} options.offset=0
   * The offset value as described in the modifier description
   * @returns {Object} The data object, properly modified
   */
  function offset(data, _ref) {
    var offset = _ref.offset;
    var placement = data.placement,
        _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;

    var basePlacement = placement.split('-')[0];

    var offsets = void 0;
    if (isNumeric(+offset)) {
      offsets = [+offset, 0];
    } else {
      offsets = parseOffset(offset, popper, reference, basePlacement);
    }

    if (basePlacement === 'left') {
      popper.top += offsets[0];
      popper.left -= offsets[1];
    } else if (basePlacement === 'right') {
      popper.top += offsets[0];
      popper.left += offsets[1];
    } else if (basePlacement === 'top') {
      popper.left += offsets[0];
      popper.top -= offsets[1];
    } else if (basePlacement === 'bottom') {
      popper.left += offsets[0];
      popper.top += offsets[1];
    }

    data.popper = popper;
    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function preventOverflow(data, options) {
    var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);

    // If offsetParent is the reference element, we really want to
    // go one step up and use the next offsetParent as reference to
    // avoid to make this modifier completely useless and look like broken
    if (data.instance.reference === boundariesElement) {
      boundariesElement = getOffsetParent(boundariesElement);
    }

    // NOTE: DOM access here
    // resets the popper's position so that the document size can be calculated excluding
    // the size of the popper element itself
    var transformProp = getSupportedPropertyName('transform');
    var popperStyles = data.instance.popper.style; // assignment to help minification
    var top = popperStyles.top,
        left = popperStyles.left,
        transform = popperStyles[transformProp];

    popperStyles.top = '';
    popperStyles.left = '';
    popperStyles[transformProp] = '';

    var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed);

    // NOTE: DOM access here
    // restores the original style properties after the offsets have been computed
    popperStyles.top = top;
    popperStyles.left = left;
    popperStyles[transformProp] = transform;

    options.boundaries = boundaries;

    var order = options.priority;
    var popper = data.offsets.popper;

    var check = {
      primary: function primary(placement) {
        var value = popper[placement];
        if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
          value = Math.max(popper[placement], boundaries[placement]);
        }
        return defineProperty({}, placement, value);
      },
      secondary: function secondary(placement) {
        var mainSide = placement === 'right' ? 'left' : 'top';
        var value = popper[mainSide];
        if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
          value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
        }
        return defineProperty({}, mainSide, value);
      }
    };

    order.forEach(function (placement) {
      var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
      popper = _extends({}, popper, check[side](placement));
    });

    data.offsets.popper = popper;

    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function shift(data) {
    var placement = data.placement;
    var basePlacement = placement.split('-')[0];
    var shiftvariation = placement.split('-')[1];

    // if shift shiftvariation is specified, run the modifier
    if (shiftvariation) {
      var _data$offsets = data.offsets,
          reference = _data$offsets.reference,
          popper = _data$offsets.popper;

      var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
      var side = isVertical ? 'left' : 'top';
      var measurement = isVertical ? 'width' : 'height';

      var shiftOffsets = {
        start: defineProperty({}, side, reference[side]),
        end: defineProperty({}, side, reference[side] + reference[measurement] - popper[measurement])
      };

      data.offsets.popper = _extends({}, popper, shiftOffsets[shiftvariation]);
    }

    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function hide(data) {
    if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
      return data;
    }

    var refRect = data.offsets.reference;
    var bound = find(data.instance.modifiers, function (modifier) {
      return modifier.name === 'preventOverflow';
    }).boundaries;

    if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
      // Avoid unnecessary DOM access if visibility hasn't changed
      if (data.hide === true) {
        return data;
      }

      data.hide = true;
      data.attributes['x-out-of-boundaries'] = '';
    } else {
      // Avoid unnecessary DOM access if visibility hasn't changed
      if (data.hide === false) {
        return data;
      }

      data.hide = false;
      data.attributes['x-out-of-boundaries'] = false;
    }

    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function inner(data) {
    var placement = data.placement;
    var basePlacement = placement.split('-')[0];
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;

    var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;

    var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;

    popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);

    data.placement = getOppositePlacement(placement);
    data.offsets.popper = getClientRect(popper);

    return data;
  }

  /**
   * Modifier function, each modifier can have a function of this type assigned
   * to its `fn` property.<br />
   * These functions will be called on each update, this means that you must
   * make sure they are performant enough to avoid performance bottlenecks.
   *
   * @function ModifierFn
   * @argument {dataObject} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {dataObject} The data object, properly modified
   */

  /**
   * Modifiers are plugins used to alter the behavior of your poppers.<br />
   * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
   * needed by the library.
   *
   * Usually you don't want to override the `order`, `fn` and `onLoad` props.
   * All the other properties are configurations that could be tweaked.
   * @namespace modifiers
   */
  var modifiers = {
    /**
     * Modifier used to shift the popper on the start or end of its reference
     * element.<br />
     * It will read the variation of the `placement` property.<br />
     * It can be one either `-end` or `-start`.
     * @memberof modifiers
     * @inner
     */
    shift: {
      /** @prop {number} order=100 - Index used to define the order of execution */
      order: 100,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: shift
    },

    /**
     * The `offset` modifier can shift your popper on both its axis.
     *
     * It accepts the following units:
     * - `px` or unit-less, interpreted as pixels
     * - `%` or `%r`, percentage relative to the length of the reference element
     * - `%p`, percentage relative to the length of the popper element
     * - `vw`, CSS viewport width unit
     * - `vh`, CSS viewport height unit
     *
     * For length is intended the main axis relative to the placement of the popper.<br />
     * This means that if the placement is `top` or `bottom`, the length will be the
     * `width`. In case of `left` or `right`, it will be the `height`.
     *
     * You can provide a single value (as `Number` or `String`), or a pair of values
     * as `String` divided by a comma or one (or more) white spaces.<br />
     * The latter is a deprecated method because it leads to confusion and will be
     * removed in v2.<br />
     * Additionally, it accepts additions and subtractions between different units.
     * Note that multiplications and divisions aren't supported.
     *
     * Valid examples are:
     * ```
     * 10
     * '10%'
     * '10, 10'
     * '10%, 10'
     * '10 + 10%'
     * '10 - 5vh + 3%'
     * '-10px + 5vh, 5px - 6%'
     * ```
     * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
     * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
     * > You can read more on this at this [issue](https://github.com/FezVrasta/popper.js/issues/373).
     *
     * @memberof modifiers
     * @inner
     */
    offset: {
      /** @prop {number} order=200 - Index used to define the order of execution */
      order: 200,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: offset,
      /** @prop {Number|String} offset=0
       * The offset value as described in the modifier description
       */
      offset: 0
    },

    /**
     * Modifier used to prevent the popper from being positioned outside the boundary.
     *
     * A scenario exists where the reference itself is not within the boundaries.<br />
     * We can say it has "escaped the boundaries" — or just "escaped".<br />
     * In this case we need to decide whether the popper should either:
     *
     * - detach from the reference and remain "trapped" in the boundaries, or
     * - if it should ignore the boundary and "escape with its reference"
     *
     * When `escapeWithReference` is set to`true` and reference is completely
     * outside its boundaries, the popper will overflow (or completely leave)
     * the boundaries in order to remain attached to the edge of the reference.
     *
     * @memberof modifiers
     * @inner
     */
    preventOverflow: {
      /** @prop {number} order=300 - Index used to define the order of execution */
      order: 300,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: preventOverflow,
      /**
       * @prop {Array} [priority=['left','right','top','bottom']]
       * Popper will try to prevent overflow following these priorities by default,
       * then, it could overflow on the left and on top of the `boundariesElement`
       */
      priority: ['left', 'right', 'top', 'bottom'],
      /**
       * @prop {number} padding=5
       * Amount of pixel used to define a minimum distance between the boundaries
       * and the popper. This makes sure the popper always has a little padding
       * between the edges of its container
       */
      padding: 5,
      /**
       * @prop {String|HTMLElement} boundariesElement='scrollParent'
       * Boundaries used by the modifier. Can be `scrollParent`, `window`,
       * `viewport` or any DOM element.
       */
      boundariesElement: 'scrollParent'
    },

    /**
     * Modifier used to make sure the reference and its popper stay near each other
     * without leaving any gap between the two. Especially useful when the arrow is
     * enabled and you want to ensure that it points to its reference element.
     * It cares only about the first axis. You can still have poppers with margin
     * between the popper and its reference element.
     * @memberof modifiers
     * @inner
     */
    keepTogether: {
      /** @prop {number} order=400 - Index used to define the order of execution */
      order: 400,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: keepTogether
    },

    /**
     * This modifier is used to move the `arrowElement` of the popper to make
     * sure it is positioned between the reference element and its popper element.
     * It will read the outer size of the `arrowElement` node to detect how many
     * pixels of conjunction are needed.
     *
     * It has no effect if no `arrowElement` is provided.
     * @memberof modifiers
     * @inner
     */
    arrow: {
      /** @prop {number} order=500 - Index used to define the order of execution */
      order: 500,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: arrow,
      /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
      element: '[x-arrow]'
    },

    /**
     * Modifier used to flip the popper's placement when it starts to overlap its
     * reference element.
     *
     * Requires the `preventOverflow` modifier before it in order to work.
     *
     * **NOTE:** this modifier will interrupt the current update cycle and will
     * restart it if it detects the need to flip the placement.
     * @memberof modifiers
     * @inner
     */
    flip: {
      /** @prop {number} order=600 - Index used to define the order of execution */
      order: 600,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: flip,
      /**
       * @prop {String|Array} behavior='flip'
       * The behavior used to change the popper's placement. It can be one of
       * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
       * placements (with optional variations)
       */
      behavior: 'flip',
      /**
       * @prop {number} padding=5
       * The popper will flip if it hits the edges of the `boundariesElement`
       */
      padding: 5,
      /**
       * @prop {String|HTMLElement} boundariesElement='viewport'
       * The element which will define the boundaries of the popper position.
       * The popper will never be placed outside of the defined boundaries
       * (except if `keepTogether` is enabled)
       */
      boundariesElement: 'viewport',
      /**
       * @prop {Boolean} flipVariations=false
       * The popper will switch placement variation between `-start` and `-end` when
       * the reference element overlaps its boundaries.
       *
       * The original placement should have a set variation.
       */
      flipVariations: false,
      /**
       * @prop {Boolean} flipVariationsByContent=false
       * The popper will switch placement variation between `-start` and `-end` when
       * the popper element overlaps its reference boundaries.
       *
       * The original placement should have a set variation.
       */
      flipVariationsByContent: false
    },

    /**
     * Modifier used to make the popper flow toward the inner of the reference element.
     * By default, when this modifier is disabled, the popper will be placed outside
     * the reference element.
     * @memberof modifiers
     * @inner
     */
    inner: {
      /** @prop {number} order=700 - Index used to define the order of execution */
      order: 700,
      /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
      enabled: false,
      /** @prop {ModifierFn} */
      fn: inner
    },

    /**
     * Modifier used to hide the popper when its reference element is outside of the
     * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
     * be used to hide with a CSS selector the popper when its reference is
     * out of boundaries.
     *
     * Requires the `preventOverflow` modifier before it in order to work.
     * @memberof modifiers
     * @inner
     */
    hide: {
      /** @prop {number} order=800 - Index used to define the order of execution */
      order: 800,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: hide
    },

    /**
     * Computes the style that will be applied to the popper element to gets
     * properly positioned.
     *
     * Note that this modifier will not touch the DOM, it just prepares the styles
     * so that `applyStyle` modifier can apply it. This separation is useful
     * in case you need to replace `applyStyle` with a custom implementation.
     *
     * This modifier has `850` as `order` value to maintain backward compatibility
     * with previous versions of Popper.js. Expect the modifiers ordering method
     * to change in future major versions of the library.
     *
     * @memberof modifiers
     * @inner
     */
    computeStyle: {
      /** @prop {number} order=850 - Index used to define the order of execution */
      order: 850,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: computeStyle,
      /**
       * @prop {Boolean} gpuAcceleration=true
       * If true, it uses the CSS 3D transformation to position the popper.
       * Otherwise, it will use the `top` and `left` properties
       */
      gpuAcceleration: true,
      /**
       * @prop {string} [x='bottom']
       * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
       * Change this if your popper should grow in a direction different from `bottom`
       */
      x: 'bottom',
      /**
       * @prop {string} [x='left']
       * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
       * Change this if your popper should grow in a direction different from `right`
       */
      y: 'right'
    },

    /**
     * Applies the computed styles to the popper element.
     *
     * All the DOM manipulations are limited to this modifier. This is useful in case
     * you want to integrate Popper.js inside a framework or view library and you
     * want to delegate all the DOM manipulations to it.
     *
     * Note that if you disable this modifier, you must make sure the popper element
     * has its position set to `absolute` before Popper.js can do its work!
     *
     * Just disable this modifier and define your own to achieve the desired effect.
     *
     * @memberof modifiers
     * @inner
     */
    applyStyle: {
      /** @prop {number} order=900 - Index used to define the order of execution */
      order: 900,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: applyStyle,
      /** @prop {Function} */
      onLoad: applyStyleOnLoad,
      /**
       * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
       * @prop {Boolean} gpuAcceleration=true
       * If true, it uses the CSS 3D transformation to position the popper.
       * Otherwise, it will use the `top` and `left` properties
       */
      gpuAcceleration: undefined
    }
  };

  /**
   * The `dataObject` is an object containing all the information used by Popper.js.
   * This object is passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
   * @name dataObject
   * @property {Object} data.instance The Popper.js instance
   * @property {String} data.placement Placement applied to popper
   * @property {String} data.originalPlacement Placement originally defined on init
   * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
   * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper
   * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
   * @property {Object} data.styles Any CSS property defined here will be applied to the popper. It expects the JavaScript nomenclature (eg. `marginBottom`)
   * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow. It expects the JavaScript nomenclature (eg. `marginBottom`)
   * @property {Object} data.boundaries Offsets of the popper boundaries
   * @property {Object} data.offsets The measurements of popper, reference and arrow elements
   * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
   * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
   * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
   */

  /**
   * Default options provided to Popper.js constructor.<br />
   * These can be overridden using the `options` argument of Popper.js.<br />
   * To override an option, simply pass an object with the same
   * structure of the `options` object, as the 3rd argument. For example:
   * ```
   * new Popper(ref, pop, {
   *   modifiers: {
   *     preventOverflow: { enabled: false }
   *   }
   * })
   * ```
   * @type {Object}
   * @static
   * @memberof Popper
   */
  var Defaults = {
    /**
     * Popper's placement.
     * @prop {Popper.placements} placement='bottom'
     */
    placement: 'bottom',

    /**
     * Set this to true if you want popper to position it self in 'fixed' mode
     * @prop {Boolean} positionFixed=false
     */
    positionFixed: false,

    /**
     * Whether events (resize, scroll) are initially enabled.
     * @prop {Boolean} eventsEnabled=true
     */
    eventsEnabled: true,

    /**
     * Set to true if you want to automatically remove the popper when
     * you call the `destroy` method.
     * @prop {Boolean} removeOnDestroy=false
     */
    removeOnDestroy: false,

    /**
     * Callback called when the popper is created.<br />
     * By default, it is set to no-op.<br />
     * Access Popper.js instance with `data.instance`.
     * @prop {onCreate}
     */
    onCreate: function onCreate() {},

    /**
     * Callback called when the popper is updated. This callback is not called
     * on the initialization/creation of the popper, but only on subsequent
     * updates.<br />
     * By default, it is set to no-op.<br />
     * Access Popper.js instance with `data.instance`.
     * @prop {onUpdate}
     */
    onUpdate: function onUpdate() {},

    /**
     * List of modifiers used to modify the offsets before they are applied to the popper.
     * They provide most of the functionalities of Popper.js.
     * @prop {modifiers}
     */
    modifiers: modifiers
  };

  /**
   * @callback onCreate
   * @param {dataObject} data
   */

  /**
   * @callback onUpdate
   * @param {dataObject} data
   */

  // Utils
  // Methods
  var Popper = function () {
    /**
     * Creates a new Popper.js instance.
     * @class Popper
     * @param {Element|referenceObject} reference - The reference element used to position the popper
     * @param {Element} popper - The HTML / XML element used as the popper
     * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
     * @return {Object} instance - The generated Popper.js instance
     */
    function Popper(reference, popper) {
      var _this = this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      classCallCheck(this, Popper);

      this.scheduleUpdate = function () {
        return requestAnimationFrame(_this.update);
      };

      // make update() debounced, so that it only runs at most once-per-tick
      this.update = debounce(this.update.bind(this));

      // with {} we create a new object with the options inside it
      this.options = _extends({}, Popper.Defaults, options);

      // init state
      this.state = {
        isDestroyed: false,
        isCreated: false,
        scrollParents: []
      };

      // get reference and popper elements (allow jQuery wrappers)
      this.reference = reference && reference.jquery ? reference[0] : reference;
      this.popper = popper && popper.jquery ? popper[0] : popper;

      // Deep merge modifiers options
      this.options.modifiers = {};
      Object.keys(_extends({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
        _this.options.modifiers[name] = _extends({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
      });

      // Refactoring modifiers' list (Object => Array)
      this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
        return _extends({
          name: name
        }, _this.options.modifiers[name]);
      })
      // sort the modifiers by order
      .sort(function (a, b) {
        return a.order - b.order;
      });

      // modifiers have the ability to execute arbitrary code when Popper.js get inited
      // such code is executed in the same order of its modifier
      // they could add new properties to their options configuration
      // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
      this.modifiers.forEach(function (modifierOptions) {
        if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
          modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
        }
      });

      // fire the first update to position the popper in the right place
      this.update();

      var eventsEnabled = this.options.eventsEnabled;
      if (eventsEnabled) {
        // setup event listeners, they will take care of update the position in specific situations
        this.enableEventListeners();
      }

      this.state.eventsEnabled = eventsEnabled;
    }

    // We can't use class properties because they don't get listed in the
    // class prototype and break stuff like Sinon stubs


    createClass(Popper, [{
      key: 'update',
      value: function update$$1() {
        return update.call(this);
      }
    }, {
      key: 'destroy',
      value: function destroy$$1() {
        return destroy.call(this);
      }
    }, {
      key: 'enableEventListeners',
      value: function enableEventListeners$$1() {
        return enableEventListeners.call(this);
      }
    }, {
      key: 'disableEventListeners',
      value: function disableEventListeners$$1() {
        return disableEventListeners.call(this);
      }

      /**
       * Schedules an update. It will run on the next UI update available.
       * @method scheduleUpdate
       * @memberof Popper
       */


      /**
       * Collection of utilities useful when writing custom modifiers.
       * Starting from version 1.7, this method is available only if you
       * include `popper-utils.js` before `popper.js`.
       *
       * **DEPRECATION**: This way to access PopperUtils is deprecated
       * and will be removed in v2! Use the PopperUtils module directly instead.
       * Due to the high instability of the methods contained in Utils, we can't
       * guarantee them to follow semver. Use them at your own risk!
       * @static
       * @private
       * @type {Object}
       * @deprecated since version 1.8
       * @member Utils
       * @memberof Popper
       */

    }]);
    return Popper;
  }();

  /**
   * The `referenceObject` is an object that provides an interface compatible with Popper.js
   * and lets you use it as replacement of a real DOM node.<br />
   * You can use this method to position a popper relatively to a set of coordinates
   * in case you don't have a DOM node to use as reference.
   *
   * ```
   * new Popper(referenceObject, popperNode);
   * ```
   *
   * NB: This feature isn't supported in Internet Explorer 10.
   * @name referenceObject
   * @property {Function} data.getBoundingClientRect
   * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
   * @property {number} data.clientWidth
   * An ES6 getter that will return the width of the virtual reference element.
   * @property {number} data.clientHeight
   * An ES6 getter that will return the height of the virtual reference element.
   */


  Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
  Popper.placements = placements;
  Popper.Defaults = Defaults;

  var Popper$1 = Popper;

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.6.1): dropdown.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * Constants
   */

  const NAME$6 = 'dropdown';
  const VERSION$6 = '4.6.1';
  const DATA_KEY$6 = 'bs.dropdown';
  const EVENT_KEY$6 = `.${DATA_KEY$6}`;
  const DATA_API_KEY$3 = '.data-api';
  const JQUERY_NO_CONFLICT$6 = $__default["default"].fn[NAME$6];
  const ESCAPE_KEYCODE$1 = 27; // KeyboardEvent.which value for Escape (Esc) key
  const SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key
  const TAB_KEYCODE = 9; // KeyboardEvent.which value for tab key
  const ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key
  const ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key
  const RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)
  const REGEXP_KEYDOWN = new RegExp(`${ARROW_UP_KEYCODE}|${ARROW_DOWN_KEYCODE}|${ESCAPE_KEYCODE$1}`);

  const CLASS_NAME_DISABLED$1 = 'disabled';
  const CLASS_NAME_SHOW$5 = 'show';
  const CLASS_NAME_DROPUP = 'dropup';
  const CLASS_NAME_DROPRIGHT = 'dropright';
  const CLASS_NAME_DROPLEFT = 'dropleft';
  const CLASS_NAME_MENURIGHT = 'dropdown-menu-right';
  const CLASS_NAME_POSITION_STATIC = 'position-static';

  const EVENT_HIDE$3 = `hide${EVENT_KEY$6}`;
  const EVENT_HIDDEN$3 = `hidden${EVENT_KEY$6}`;
  const EVENT_SHOW$3 = `show${EVENT_KEY$6}`;
  const EVENT_SHOWN$3 = `shown${EVENT_KEY$6}`;
  const EVENT_CLICK = `click${EVENT_KEY$6}`;
  const EVENT_CLICK_DATA_API$2 = `click${EVENT_KEY$6}${DATA_API_KEY$3}`;
  const EVENT_KEYDOWN_DATA_API = `keydown${EVENT_KEY$6}${DATA_API_KEY$3}`;
  const EVENT_KEYUP_DATA_API = `keyup${EVENT_KEY$6}${DATA_API_KEY$3}`;

  const SELECTOR_DATA_TOGGLE$2 = '[data-toggle="dropdown"]';
  const SELECTOR_FORM_CHILD = '.dropdown form';
  const SELECTOR_MENU = '.dropdown-menu';
  const SELECTOR_NAVBAR_NAV = '.navbar-nav';
  const SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)';

  const PLACEMENT_TOP = 'top-start';
  const PLACEMENT_TOPEND = 'top-end';
  const PLACEMENT_BOTTOM = 'bottom-start';
  const PLACEMENT_BOTTOMEND = 'bottom-end';
  const PLACEMENT_RIGHT = 'right-start';
  const PLACEMENT_LEFT = 'left-start';

  const Default$5 = {
    offset: 0,
    flip: true,
    boundary: 'scrollParent',
    reference: 'toggle',
    display: 'dynamic',
    popperConfig: null
  };

  const DefaultType$5 = {
    offset: '(number|string|function)',
    flip: 'boolean',
    boundary: '(string|element)',
    reference: '(string|element)',
    display: 'string',
    popperConfig: '(null|object)'
  };

  /**
   * Class definition
   */

  class Dropdown {
    constructor(element, config) {
      this._element = element;
      this._popper = null;
      this._config = this._getConfig(config);
      this._menu = this._getMenuElement();
      this._inNavbar = this._detectNavbar();

      this._addEventListeners();
    }

    // Getters
    static get VERSION() {
      return VERSION$6
    }

    static get Default() {
      return Default$5
    }

    static get DefaultType() {
      return DefaultType$5
    }

    // Public
    toggle() {
      if (this._element.disabled || $__default["default"](this._element).hasClass(CLASS_NAME_DISABLED$1)) {
        return
      }

      const isActive = $__default["default"](this._menu).hasClass(CLASS_NAME_SHOW$5);

      Dropdown._clearMenus();

      if (isActive) {
        return
      }

      this.show(true);
    }

    show(usePopper = false) {
      if (this._element.disabled || $__default["default"](this._element).hasClass(CLASS_NAME_DISABLED$1) || $__default["default"](this._menu).hasClass(CLASS_NAME_SHOW$5)) {
        return
      }

      const relatedTarget = {
        relatedTarget: this._element
      };
      const showEvent = $__default["default"].Event(EVENT_SHOW$3, relatedTarget);
      const parent = Dropdown._getParentFromElement(this._element);

      $__default["default"](parent).trigger(showEvent);

      if (showEvent.isDefaultPrevented()) {
        return
      }

      // Totally disable Popper for Dropdowns in Navbar
      if (!this._inNavbar && usePopper) {
        // Check for Popper dependency
        if (typeof Popper$1 === 'undefined') {
          throw new TypeError('Bootstrap\'s dropdowns require Popper (https://popper.js.org)')
        }

        let referenceElement = this._element;

        if (this._config.reference === 'parent') {
          referenceElement = parent;
        } else if (Util.isElement(this._config.reference)) {
          referenceElement = this._config.reference;

          // Check if it's jQuery element
          if (typeof this._config.reference.jquery !== 'undefined') {
            referenceElement = this._config.reference[0];
          }
        }

        // If boundary is not `scrollParent`, then set position to `static`
        // to allow the menu to "escape" the scroll parent's boundaries
        // https://github.com/twbs/bootstrap/issues/24251
        if (this._config.boundary !== 'scrollParent') {
          $__default["default"](parent).addClass(CLASS_NAME_POSITION_STATIC);
        }

        this._popper = new Popper$1(referenceElement, this._menu, this._getPopperConfig());
      }

      // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
      if ('ontouchstart' in document.documentElement &&
          $__default["default"](parent).closest(SELECTOR_NAVBAR_NAV).length === 0) {
        $__default["default"](document.body).children().on('mouseover', null, $__default["default"].noop);
      }

      this._element.focus();
      this._element.setAttribute('aria-expanded', true);

      $__default["default"](this._menu).toggleClass(CLASS_NAME_SHOW$5);
      $__default["default"](parent)
        .toggleClass(CLASS_NAME_SHOW$5)
        .trigger($__default["default"].Event(EVENT_SHOWN$3, relatedTarget));
    }

    hide() {
      if (this._element.disabled || $__default["default"](this._element).hasClass(CLASS_NAME_DISABLED$1) || !$__default["default"](this._menu).hasClass(CLASS_NAME_SHOW$5)) {
        return
      }

      const relatedTarget = {
        relatedTarget: this._element
      };
      const hideEvent = $__default["default"].Event(EVENT_HIDE$3, relatedTarget);
      const parent = Dropdown._getParentFromElement(this._element);

      $__default["default"](parent).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return
      }

      if (this._popper) {
        this._popper.destroy();
      }

      $__default["default"](this._menu).toggleClass(CLASS_NAME_SHOW$5);
      $__default["default"](parent)
        .toggleClass(CLASS_NAME_SHOW$5)
        .trigger($__default["default"].Event(EVENT_HIDDEN$3, relatedTarget));
    }

    dispose() {
      $__default["default"].removeData(this._element, DATA_KEY$6);
      $__default["default"](this._element).off(EVENT_KEY$6);
      this._element = null;
      this._menu = null;
      if (this._popper !== null) {
        this._popper.destroy();
        this._popper = null;
      }
    }

    update() {
      this._inNavbar = this._detectNavbar();
      if (this._popper !== null) {
        this._popper.scheduleUpdate();
      }
    }

    // Private
    _addEventListeners() {
      $__default["default"](this._element).on(EVENT_CLICK, event => {
        event.preventDefault();
        event.stopPropagation();
        this.toggle();
      });
    }

    _getConfig(config) {
      config = {
        ...this.constructor.Default,
        ...$__default["default"](this._element).data(),
        ...config
      };

      Util.typeCheckConfig(
        NAME$6,
        config,
        this.constructor.DefaultType
      );

      return config
    }

    _getMenuElement() {
      if (!this._menu) {
        const parent = Dropdown._getParentFromElement(this._element);

        if (parent) {
          this._menu = parent.querySelector(SELECTOR_MENU);
        }
      }

      return this._menu
    }

    _getPlacement() {
      const $parentDropdown = $__default["default"](this._element.parentNode);
      let placement = PLACEMENT_BOTTOM;

      // Handle dropup
      if ($parentDropdown.hasClass(CLASS_NAME_DROPUP)) {
        placement = $__default["default"](this._menu).hasClass(CLASS_NAME_MENURIGHT) ?
          PLACEMENT_TOPEND :
          PLACEMENT_TOP;
      } else if ($parentDropdown.hasClass(CLASS_NAME_DROPRIGHT)) {
        placement = PLACEMENT_RIGHT;
      } else if ($parentDropdown.hasClass(CLASS_NAME_DROPLEFT)) {
        placement = PLACEMENT_LEFT;
      } else if ($__default["default"](this._menu).hasClass(CLASS_NAME_MENURIGHT)) {
        placement = PLACEMENT_BOTTOMEND;
      }

      return placement
    }

    _detectNavbar() {
      return $__default["default"](this._element).closest('.navbar').length > 0
    }

    _getOffset() {
      const offset = {};

      if (typeof this._config.offset === 'function') {
        offset.fn = data => {
          data.offsets = {
            ...data.offsets,
            ...this._config.offset(data.offsets, this._element)
          };

          return data
        };
      } else {
        offset.offset = this._config.offset;
      }

      return offset
    }

    _getPopperConfig() {
      const popperConfig = {
        placement: this._getPlacement(),
        modifiers: {
          offset: this._getOffset(),
          flip: {
            enabled: this._config.flip
          },
          preventOverflow: {
            boundariesElement: this._config.boundary
          }
        }
      };

      // Disable Popper if we have a static display
      if (this._config.display === 'static') {
        popperConfig.modifiers.applyStyle = {
          enabled: false
        };
      }

      return {
        ...popperConfig,
        ...this._config.popperConfig
      }
    }

    // Static
    static _jQueryInterface(config) {
      return this.each(function () {
        let data = $__default["default"](this).data(DATA_KEY$6);
        const _config = typeof config === 'object' ? config : null;

        if (!data) {
          data = new Dropdown(this, _config);
          $__default["default"](this).data(DATA_KEY$6, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError(`No method named "${config}"`)
          }

          data[config]();
        }
      })
    }

    static _clearMenus(event) {
      if (event && (event.which === RIGHT_MOUSE_BUTTON_WHICH ||
        event.type === 'keyup' && event.which !== TAB_KEYCODE)) {
        return
      }

      const toggles = [].slice.call(document.querySelectorAll(SELECTOR_DATA_TOGGLE$2));

      for (let i = 0, len = toggles.length; i < len; i++) {
        const parent = Dropdown._getParentFromElement(toggles[i]);
        const context = $__default["default"](toggles[i]).data(DATA_KEY$6);
        const relatedTarget = {
          relatedTarget: toggles[i]
        };

        if (event && event.type === 'click') {
          relatedTarget.clickEvent = event;
        }

        if (!context) {
          continue
        }

        const dropdownMenu = context._menu;
        if (!$__default["default"](parent).hasClass(CLASS_NAME_SHOW$5)) {
          continue
        }

        if (event && (event.type === 'click' &&
            /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) &&
            $__default["default"].contains(parent, event.target)) {
          continue
        }

        const hideEvent = $__default["default"].Event(EVENT_HIDE$3, relatedTarget);
        $__default["default"](parent).trigger(hideEvent);
        if (hideEvent.isDefaultPrevented()) {
          continue
        }

        // If this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for iOS support
        if ('ontouchstart' in document.documentElement) {
          $__default["default"](document.body).children().off('mouseover', null, $__default["default"].noop);
        }

        toggles[i].setAttribute('aria-expanded', 'false');

        if (context._popper) {
          context._popper.destroy();
        }

        $__default["default"](dropdownMenu).removeClass(CLASS_NAME_SHOW$5);
        $__default["default"](parent)
          .removeClass(CLASS_NAME_SHOW$5)
          .trigger($__default["default"].Event(EVENT_HIDDEN$3, relatedTarget));
      }
    }

    static _getParentFromElement(element) {
      let parent;
      const selector = Util.getSelectorFromElement(element);

      if (selector) {
        parent = document.querySelector(selector);
      }

      return parent || element.parentNode
    }

    // eslint-disable-next-line complexity
    static _dataApiKeydownHandler(event) {
      // If not input/textarea:
      //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
      // If input/textarea:
      //  - If space key => not a dropdown command
      //  - If key is other than escape
      //    - If key is not up or down => not a dropdown command
      //    - If trigger inside the menu => not a dropdown command
      if (/input|textarea/i.test(event.target.tagName) ?
        event.which === SPACE_KEYCODE || event.which !== ESCAPE_KEYCODE$1 &&
        (event.which !== ARROW_DOWN_KEYCODE && event.which !== ARROW_UP_KEYCODE ||
          $__default["default"](event.target).closest(SELECTOR_MENU).length) : !REGEXP_KEYDOWN.test(event.which)) {
        return
      }

      if (this.disabled || $__default["default"](this).hasClass(CLASS_NAME_DISABLED$1)) {
        return
      }

      const parent = Dropdown._getParentFromElement(this);
      const isActive = $__default["default"](parent).hasClass(CLASS_NAME_SHOW$5);

      if (!isActive && event.which === ESCAPE_KEYCODE$1) {
        return
      }

      event.preventDefault();
      event.stopPropagation();

      if (!isActive || (event.which === ESCAPE_KEYCODE$1 || event.which === SPACE_KEYCODE)) {
        if (event.which === ESCAPE_KEYCODE$1) {
          $__default["default"](parent.querySelector(SELECTOR_DATA_TOGGLE$2)).trigger('focus');
        }

        $__default["default"](this).trigger('click');
        return
      }

      const items = [].slice.call(parent.querySelectorAll(SELECTOR_VISIBLE_ITEMS))
        .filter(item => $__default["default"](item).is(':visible'));

      if (items.length === 0) {
        return
      }

      let index = items.indexOf(event.target);

      if (event.which === ARROW_UP_KEYCODE && index > 0) { // Up
        index--;
      }

      if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) { // Down
        index++;
      }

      if (index < 0) {
        index = 0;
      }

      items[index].focus();
    }
  }

  /**
   * Data API implementation
   */

  $__default["default"](document)
    .on(EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE$2, Dropdown._dataApiKeydownHandler)
    .on(EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown._dataApiKeydownHandler)
    .on(`${EVENT_CLICK_DATA_API$2} ${EVENT_KEYUP_DATA_API}`, Dropdown._clearMenus)
    .on(EVENT_CLICK_DATA_API$2, SELECTOR_DATA_TOGGLE$2, function (event) {
      event.preventDefault();
      event.stopPropagation();
      Dropdown._jQueryInterface.call($__default["default"](this), 'toggle');
    })
    .on(EVENT_CLICK_DATA_API$2, SELECTOR_FORM_CHILD, e => {
      e.stopPropagation();
    });

  /**
   * jQuery
   */

  $__default["default"].fn[NAME$6] = Dropdown._jQueryInterface;
  $__default["default"].fn[NAME$6].Constructor = Dropdown;
  $__default["default"].fn[NAME$6].noConflict = () => {
    $__default["default"].fn[NAME$6] = JQUERY_NO_CONFLICT$6;
    return Dropdown._jQueryInterface
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.6.1): modal.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * Constants
   */

  const NAME$5 = 'modal';
  const VERSION$5 = '4.6.1';
  const DATA_KEY$5 = 'bs.modal';
  const EVENT_KEY$5 = `.${DATA_KEY$5}`;
  const DATA_API_KEY$2 = '.data-api';
  const JQUERY_NO_CONFLICT$5 = $__default["default"].fn[NAME$5];
  const ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

  const CLASS_NAME_SCROLLABLE = 'modal-dialog-scrollable';
  const CLASS_NAME_SCROLLBAR_MEASURER = 'modal-scrollbar-measure';
  const CLASS_NAME_BACKDROP = 'modal-backdrop';
  const CLASS_NAME_OPEN = 'modal-open';
  const CLASS_NAME_FADE$4 = 'fade';
  const CLASS_NAME_SHOW$4 = 'show';
  const CLASS_NAME_STATIC = 'modal-static';

  const EVENT_HIDE$2 = `hide${EVENT_KEY$5}`;
  const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY$5}`;
  const EVENT_HIDDEN$2 = `hidden${EVENT_KEY$5}`;
  const EVENT_SHOW$2 = `show${EVENT_KEY$5}`;
  const EVENT_SHOWN$2 = `shown${EVENT_KEY$5}`;
  const EVENT_FOCUSIN = `focusin${EVENT_KEY$5}`;
  const EVENT_RESIZE = `resize${EVENT_KEY$5}`;
  const EVENT_CLICK_DISMISS$1 = `click.dismiss${EVENT_KEY$5}`;
  const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY$5}`;
  const EVENT_MOUSEUP_DISMISS = `mouseup.dismiss${EVENT_KEY$5}`;
  const EVENT_MOUSEDOWN_DISMISS = `mousedown.dismiss${EVENT_KEY$5}`;
  const EVENT_CLICK_DATA_API$1 = `click${EVENT_KEY$5}${DATA_API_KEY$2}`;

  const SELECTOR_DIALOG = '.modal-dialog';
  const SELECTOR_MODAL_BODY = '.modal-body';
  const SELECTOR_DATA_TOGGLE$1 = '[data-toggle="modal"]';
  const SELECTOR_DATA_DISMISS$1 = '[data-dismiss="modal"]';
  const SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
  const SELECTOR_STICKY_CONTENT = '.sticky-top';

  const Default$4 = {
    backdrop: true,
    keyboard: true,
    focus: true,
    show: true
  };

  const DefaultType$4 = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    focus: 'boolean',
    show: 'boolean'
  };

  /**
   * Class definition
   */

  class Modal {
    constructor(element, config) {
      this._config = this._getConfig(config);
      this._element = element;
      this._dialog = element.querySelector(SELECTOR_DIALOG);
      this._backdrop = null;
      this._isShown = false;
      this._isBodyOverflowing = false;
      this._ignoreBackdropClick = false;
      this._isTransitioning = false;
      this._scrollbarWidth = 0;
    }

    // Getters
    static get VERSION() {
      return VERSION$5
    }

    static get Default() {
      return Default$4
    }

    // Public
    toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget)
    }

    show(relatedTarget) {
      if (this._isShown || this._isTransitioning) {
        return
      }

      const showEvent = $__default["default"].Event(EVENT_SHOW$2, {
        relatedTarget
      });

      $__default["default"](this._element).trigger(showEvent);

      if (showEvent.isDefaultPrevented()) {
        return
      }

      this._isShown = true;

      if ($__default["default"](this._element).hasClass(CLASS_NAME_FADE$4)) {
        this._isTransitioning = true;
      }

      this._checkScrollbar();
      this._setScrollbar();

      this._adjustDialog();

      this._setEscapeEvent();
      this._setResizeEvent();

      $__default["default"](this._element).on(
        EVENT_CLICK_DISMISS$1,
        SELECTOR_DATA_DISMISS$1,
        event => this.hide(event)
      );

      $__default["default"](this._dialog).on(EVENT_MOUSEDOWN_DISMISS, () => {
        $__default["default"](this._element).one(EVENT_MOUSEUP_DISMISS, event => {
          if ($__default["default"](event.target).is(this._element)) {
            this._ignoreBackdropClick = true;
          }
        });
      });

      this._showBackdrop(() => this._showElement(relatedTarget));
    }

    hide(event) {
      if (event) {
        event.preventDefault();
      }

      if (!this._isShown || this._isTransitioning) {
        return
      }

      const hideEvent = $__default["default"].Event(EVENT_HIDE$2);

      $__default["default"](this._element).trigger(hideEvent);

      if (!this._isShown || hideEvent.isDefaultPrevented()) {
        return
      }

      this._isShown = false;
      const transition = $__default["default"](this._element).hasClass(CLASS_NAME_FADE$4);

      if (transition) {
        this._isTransitioning = true;
      }

      this._setEscapeEvent();
      this._setResizeEvent();

      $__default["default"](document).off(EVENT_FOCUSIN);

      $__default["default"](this._element).removeClass(CLASS_NAME_SHOW$4);

      $__default["default"](this._element).off(EVENT_CLICK_DISMISS$1);
      $__default["default"](this._dialog).off(EVENT_MOUSEDOWN_DISMISS);

      if (transition) {
        const transitionDuration = Util.getTransitionDurationFromElement(this._element);

        $__default["default"](this._element)
          .one(Util.TRANSITION_END, event => this._hideModal(event))
          .emulateTransitionEnd(transitionDuration);
      } else {
        this._hideModal();
      }
    }

    dispose() {
      [window, this._element, this._dialog]
        .forEach(htmlElement => $__default["default"](htmlElement).off(EVENT_KEY$5));

      /**
       * `document` has 2 events `EVENT_FOCUSIN` and `EVENT_CLICK_DATA_API`
       * Do not move `document` in `htmlElements` array
       * It will remove `EVENT_CLICK_DATA_API` event that should remain
       */
      $__default["default"](document).off(EVENT_FOCUSIN);

      $__default["default"].removeData(this._element, DATA_KEY$5);

      this._config = null;
      this._element = null;
      this._dialog = null;
      this._backdrop = null;
      this._isShown = null;
      this._isBodyOverflowing = null;
      this._ignoreBackdropClick = null;
      this._isTransitioning = null;
      this._scrollbarWidth = null;
    }

    handleUpdate() {
      this._adjustDialog();
    }

    // Private
    _getConfig(config) {
      config = {
        ...Default$4,
        ...config
      };
      Util.typeCheckConfig(NAME$5, config, DefaultType$4);
      return config
    }

    _triggerBackdropTransition() {
      const hideEventPrevented = $__default["default"].Event(EVENT_HIDE_PREVENTED);

      $__default["default"](this._element).trigger(hideEventPrevented);
      if (hideEventPrevented.isDefaultPrevented()) {
        return
      }

      const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

      if (!isModalOverflowing) {
        this._element.style.overflowY = 'hidden';
      }

      this._element.classList.add(CLASS_NAME_STATIC);

      const modalTransitionDuration = Util.getTransitionDurationFromElement(this._dialog);
      $__default["default"](this._element).off(Util.TRANSITION_END);

      $__default["default"](this._element).one(Util.TRANSITION_END, () => {
        this._element.classList.remove(CLASS_NAME_STATIC);
        if (!isModalOverflowing) {
          $__default["default"](this._element).one(Util.TRANSITION_END, () => {
            this._element.style.overflowY = '';
          })
            .emulateTransitionEnd(this._element, modalTransitionDuration);
        }
      })
        .emulateTransitionEnd(modalTransitionDuration);
      this._element.focus();
    }

    _showElement(relatedTarget) {
      const transition = $__default["default"](this._element).hasClass(CLASS_NAME_FADE$4);
      const modalBody = this._dialog ? this._dialog.querySelector(SELECTOR_MODAL_BODY) : null;

      if (!this._element.parentNode ||
          this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
        // Don't move modal's DOM position
        document.body.appendChild(this._element);
      }

      this._element.style.display = 'block';
      this._element.removeAttribute('aria-hidden');
      this._element.setAttribute('aria-modal', true);
      this._element.setAttribute('role', 'dialog');

      if ($__default["default"](this._dialog).hasClass(CLASS_NAME_SCROLLABLE) && modalBody) {
        modalBody.scrollTop = 0;
      } else {
        this._element.scrollTop = 0;
      }

      if (transition) {
        Util.reflow(this._element);
      }

      $__default["default"](this._element).addClass(CLASS_NAME_SHOW$4);

      if (this._config.focus) {
        this._enforceFocus();
      }

      const shownEvent = $__default["default"].Event(EVENT_SHOWN$2, {
        relatedTarget
      });

      const transitionComplete = () => {
        if (this._config.focus) {
          this._element.focus();
        }

        this._isTransitioning = false;
        $__default["default"](this._element).trigger(shownEvent);
      };

      if (transition) {
        const transitionDuration = Util.getTransitionDurationFromElement(this._dialog);

        $__default["default"](this._dialog)
          .one(Util.TRANSITION_END, transitionComplete)
          .emulateTransitionEnd(transitionDuration);
      } else {
        transitionComplete();
      }
    }

    _enforceFocus() {
      $__default["default"](document)
        .off(EVENT_FOCUSIN) // Guard against infinite focus loop
        .on(EVENT_FOCUSIN, event => {
          if (document !== event.target &&
              this._element !== event.target &&
              $__default["default"](this._element).has(event.target).length === 0) {
            this._element.focus();
          }
        });
    }

    _setEscapeEvent() {
      if (this._isShown) {
        $__default["default"](this._element).on(EVENT_KEYDOWN_DISMISS, event => {
          if (this._config.keyboard && event.which === ESCAPE_KEYCODE) {
            event.preventDefault();
            this.hide();
          } else if (!this._config.keyboard && event.which === ESCAPE_KEYCODE) {
            this._triggerBackdropTransition();
          }
        });
      } else if (!this._isShown) {
        $__default["default"](this._element).off(EVENT_KEYDOWN_DISMISS);
      }
    }

    _setResizeEvent() {
      if (this._isShown) {
        $__default["default"](window).on(EVENT_RESIZE, event => this.handleUpdate(event));
      } else {
        $__default["default"](window).off(EVENT_RESIZE);
      }
    }

    _hideModal() {
      this._element.style.display = 'none';
      this._element.setAttribute('aria-hidden', true);
      this._element.removeAttribute('aria-modal');
      this._element.removeAttribute('role');
      this._isTransitioning = false;
      this._showBackdrop(() => {
        $__default["default"](document.body).removeClass(CLASS_NAME_OPEN);
        this._resetAdjustments();
        this._resetScrollbar();
        $__default["default"](this._element).trigger(EVENT_HIDDEN$2);
      });
    }

    _removeBackdrop() {
      if (this._backdrop) {
        $__default["default"](this._backdrop).remove();
        this._backdrop = null;
      }
    }

    _showBackdrop(callback) {
      const animate = $__default["default"](this._element).hasClass(CLASS_NAME_FADE$4) ?
        CLASS_NAME_FADE$4 : '';

      if (this._isShown && this._config.backdrop) {
        this._backdrop = document.createElement('div');
        this._backdrop.className = CLASS_NAME_BACKDROP;

        if (animate) {
          this._backdrop.classList.add(animate);
        }

        $__default["default"](this._backdrop).appendTo(document.body);

        $__default["default"](this._element).on(EVENT_CLICK_DISMISS$1, event => {
          if (this._ignoreBackdropClick) {
            this._ignoreBackdropClick = false;
            return
          }

          if (event.target !== event.currentTarget) {
            return
          }

          if (this._config.backdrop === 'static') {
            this._triggerBackdropTransition();
          } else {
            this.hide();
          }
        });

        if (animate) {
          Util.reflow(this._backdrop);
        }

        $__default["default"](this._backdrop).addClass(CLASS_NAME_SHOW$4);

        if (!callback) {
          return
        }

        if (!animate) {
          callback();
          return
        }

        const backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);

        $__default["default"](this._backdrop)
          .one(Util.TRANSITION_END, callback)
          .emulateTransitionEnd(backdropTransitionDuration);
      } else if (!this._isShown && this._backdrop) {
        $__default["default"](this._backdrop).removeClass(CLASS_NAME_SHOW$4);

        const callbackRemove = () => {
          this._removeBackdrop();
          if (callback) {
            callback();
          }
        };

        if ($__default["default"](this._element).hasClass(CLASS_NAME_FADE$4)) {
          const backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);

          $__default["default"](this._backdrop)
            .one(Util.TRANSITION_END, callbackRemove)
            .emulateTransitionEnd(backdropTransitionDuration);
        } else {
          callbackRemove();
        }
      } else if (callback) {
        callback();
      }
    }

    // ----------------------------------------------------------------------
    // the following methods are used to handle overflowing modals
    // todo (fat): these should probably be refactored out of modal.js
    // ----------------------------------------------------------------------

    _adjustDialog() {
      const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

      if (!this._isBodyOverflowing && isModalOverflowing) {
        this._element.style.paddingLeft = `${this._scrollbarWidth}px`;
      }

      if (this._isBodyOverflowing && !isModalOverflowing) {
        this._element.style.paddingRight = `${this._scrollbarWidth}px`;
      }
    }

    _resetAdjustments() {
      this._element.style.paddingLeft = '';
      this._element.style.paddingRight = '';
    }

    _checkScrollbar() {
      const rect = document.body.getBoundingClientRect();
      this._isBodyOverflowing = Math.round(rect.left + rect.right) < window.innerWidth;
      this._scrollbarWidth = this._getScrollbarWidth();
    }

    _setScrollbar() {
      if (this._isBodyOverflowing) {
        // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
        //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set
        const fixedContent = [].slice.call(document.querySelectorAll(SELECTOR_FIXED_CONTENT));
        const stickyContent = [].slice.call(document.querySelectorAll(SELECTOR_STICKY_CONTENT));

        // Adjust fixed content padding
        $__default["default"](fixedContent).each((index, element) => {
          const actualPadding = element.style.paddingRight;
          const calculatedPadding = $__default["default"](element).css('padding-right');
          $__default["default"](element)
            .data('padding-right', actualPadding)
            .css('padding-right', `${parseFloat(calculatedPadding) + this._scrollbarWidth}px`);
        });

        // Adjust sticky content margin
        $__default["default"](stickyContent).each((index, element) => {
          const actualMargin = element.style.marginRight;
          const calculatedMargin = $__default["default"](element).css('margin-right');
          $__default["default"](element)
            .data('margin-right', actualMargin)
            .css('margin-right', `${parseFloat(calculatedMargin) - this._scrollbarWidth}px`);
        });

        // Adjust body padding
        const actualPadding = document.body.style.paddingRight;
        const calculatedPadding = $__default["default"](document.body).css('padding-right');
        $__default["default"](document.body)
          .data('padding-right', actualPadding)
          .css('padding-right', `${parseFloat(calculatedPadding) + this._scrollbarWidth}px`);
      }

      $__default["default"](document.body).addClass(CLASS_NAME_OPEN);
    }

    _resetScrollbar() {
      // Restore fixed content padding
      const fixedContent = [].slice.call(document.querySelectorAll(SELECTOR_FIXED_CONTENT));
      $__default["default"](fixedContent).each((index, element) => {
        const padding = $__default["default"](element).data('padding-right');
        $__default["default"](element).removeData('padding-right');
        element.style.paddingRight = padding ? padding : '';
      });

      // Restore sticky content
      const elements = [].slice.call(document.querySelectorAll(`${SELECTOR_STICKY_CONTENT}`));
      $__default["default"](elements).each((index, element) => {
        const margin = $__default["default"](element).data('margin-right');
        if (typeof margin !== 'undefined') {
          $__default["default"](element).css('margin-right', margin).removeData('margin-right');
        }
      });

      // Restore body padding
      const padding = $__default["default"](document.body).data('padding-right');
      $__default["default"](document.body).removeData('padding-right');
      document.body.style.paddingRight = padding ? padding : '';
    }

    _getScrollbarWidth() { // thx d.walsh
      const scrollDiv = document.createElement('div');
      scrollDiv.className = CLASS_NAME_SCROLLBAR_MEASURER;
      document.body.appendChild(scrollDiv);
      const scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
      return scrollbarWidth
    }

    // Static
    static _jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        let data = $__default["default"](this).data(DATA_KEY$5);
        const _config = {
          ...Default$4,
          ...$__default["default"](this).data(),
          ...(typeof config === 'object' && config ? config : {})
        };

        if (!data) {
          data = new Modal(this, _config);
          $__default["default"](this).data(DATA_KEY$5, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError(`No method named "${config}"`)
          }

          data[config](relatedTarget);
        } else if (_config.show) {
          data.show(relatedTarget);
        }
      })
    }
  }

  /**
   * Data API implementation
   */

  $__default["default"](document).on(EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE$1, function (event) {
    let target;
    const selector = Util.getSelectorFromElement(this);

    if (selector) {
      target = document.querySelector(selector);
    }

    const config = $__default["default"](target).data(DATA_KEY$5) ?
      'toggle' : {
        ...$__default["default"](target).data(),
        ...$__default["default"](this).data()
      };

    if (this.tagName === 'A' || this.tagName === 'AREA') {
      event.preventDefault();
    }

    const $target = $__default["default"](target).one(EVENT_SHOW$2, showEvent => {
      if (showEvent.isDefaultPrevented()) {
        // Only register focus restorer if modal will actually get shown
        return
      }

      $target.one(EVENT_HIDDEN$2, () => {
        if ($__default["default"](this).is(':visible')) {
          this.focus();
        }
      });
    });

    Modal._jQueryInterface.call($__default["default"](target), config, this);
  });

  /**
   * jQuery
   */

  $__default["default"].fn[NAME$5] = Modal._jQueryInterface;
  $__default["default"].fn[NAME$5].Constructor = Modal;
  $__default["default"].fn[NAME$5].noConflict = () => {
    $__default["default"].fn[NAME$5] = JQUERY_NO_CONFLICT$5;
    return Modal._jQueryInterface
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.6.1): tools/sanitizer.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  const uriAttrs = [
    'background',
    'cite',
    'href',
    'itemtype',
    'longdesc',
    'poster',
    'src',
    'xlink:href'
  ];

  const ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;

  const DefaultWhitelist = {
    // Global attributes allowed on any supplied element below.
    '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
    a: ['target', 'href', 'title', 'rel'],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    div: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: []
  };

  /**
   * A pattern that recognizes a commonly useful subset of URLs that are safe.
   *
   * Shoutout to Angular https://github.com/angular/angular/blob/12.2.x/packages/core/src/sanitization/url_sanitizer.ts
   */
  const SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i;

  /**
   * A pattern that matches safe data URLs. Only matches image, video and audio types.
   *
   * Shoutout to Angular https://github.com/angular/angular/blob/12.2.x/packages/core/src/sanitization/url_sanitizer.ts
   */
  const DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;

  function allowedAttribute(attr, allowedAttributeList) {
    const attrName = attr.nodeName.toLowerCase();

    if (allowedAttributeList.indexOf(attrName) !== -1) {
      if (uriAttrs.indexOf(attrName) !== -1) {
        return Boolean(SAFE_URL_PATTERN.test(attr.nodeValue) || DATA_URL_PATTERN.test(attr.nodeValue))
      }

      return true
    }

    const regExp = allowedAttributeList.filter(attrRegex => attrRegex instanceof RegExp);

    // Check if a regular expression validates the attribute.
    for (let i = 0, len = regExp.length; i < len; i++) {
      if (regExp[i].test(attrName)) {
        return true
      }
    }

    return false
  }

  function sanitizeHtml(unsafeHtml, whiteList, sanitizeFn) {
    if (unsafeHtml.length === 0) {
      return unsafeHtml
    }

    if (sanitizeFn && typeof sanitizeFn === 'function') {
      return sanitizeFn(unsafeHtml)
    }

    const domParser = new window.DOMParser();
    const createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
    const whitelistKeys = Object.keys(whiteList);
    const elements = [].slice.call(createdDocument.body.querySelectorAll('*'));

    for (let i = 0, len = elements.length; i < len; i++) {
      const el = elements[i];
      const elName = el.nodeName.toLowerCase();

      if (whitelistKeys.indexOf(el.nodeName.toLowerCase()) === -1) {
        el.parentNode.removeChild(el);

        continue
      }

      const attributeList = [].slice.call(el.attributes);
      // eslint-disable-next-line unicorn/prefer-spread
      const whitelistedAttributes = [].concat(whiteList['*'] || [], whiteList[elName] || []);

      attributeList.forEach(attr => {
        if (!allowedAttribute(attr, whitelistedAttributes)) {
          el.removeAttribute(attr.nodeName);
        }
      });
    }

    return createdDocument.body.innerHTML
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.6.1): tooltip.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * Constants
   */

  const NAME$4 = 'tooltip';
  const VERSION$4 = '4.6.1';
  const DATA_KEY$4 = 'bs.tooltip';
  const EVENT_KEY$4 = `.${DATA_KEY$4}`;
  const JQUERY_NO_CONFLICT$4 = $__default["default"].fn[NAME$4];
  const CLASS_PREFIX$1 = 'bs-tooltip';
  const BSCLS_PREFIX_REGEX$1 = new RegExp(`(^|\\s)${CLASS_PREFIX$1}\\S+`, 'g');
  const DISALLOWED_ATTRIBUTES = ['sanitize', 'whiteList', 'sanitizeFn'];

  const CLASS_NAME_FADE$3 = 'fade';
  const CLASS_NAME_SHOW$3 = 'show';

  const HOVER_STATE_SHOW = 'show';
  const HOVER_STATE_OUT = 'out';

  const SELECTOR_TOOLTIP_INNER = '.tooltip-inner';
  const SELECTOR_ARROW = '.arrow';

  const TRIGGER_HOVER = 'hover';
  const TRIGGER_FOCUS = 'focus';
  const TRIGGER_CLICK = 'click';
  const TRIGGER_MANUAL = 'manual';

  const AttachmentMap = {
    AUTO: 'auto',
    TOP: 'top',
    RIGHT: 'right',
    BOTTOM: 'bottom',
    LEFT: 'left'
  };

  const Default$3 = {
    animation: true,
    template: '<div class="tooltip" role="tooltip">' +
                      '<div class="arrow"></div>' +
                      '<div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    selector: false,
    placement: 'top',
    offset: 0,
    container: false,
    fallbackPlacement: 'flip',
    boundary: 'scrollParent',
    customClass: '',
    sanitize: true,
    sanitizeFn: null,
    whiteList: DefaultWhitelist,
    popperConfig: null
  };

  const DefaultType$3 = {
    animation: 'boolean',
    template: 'string',
    title: '(string|element|function)',
    trigger: 'string',
    delay: '(number|object)',
    html: 'boolean',
    selector: '(string|boolean)',
    placement: '(string|function)',
    offset: '(number|string|function)',
    container: '(string|element|boolean)',
    fallbackPlacement: '(string|array)',
    boundary: '(string|element)',
    customClass: '(string|function)',
    sanitize: 'boolean',
    sanitizeFn: '(null|function)',
    whiteList: 'object',
    popperConfig: '(null|object)'
  };

  const Event$1 = {
    HIDE: `hide${EVENT_KEY$4}`,
    HIDDEN: `hidden${EVENT_KEY$4}`,
    SHOW: `show${EVENT_KEY$4}`,
    SHOWN: `shown${EVENT_KEY$4}`,
    INSERTED: `inserted${EVENT_KEY$4}`,
    CLICK: `click${EVENT_KEY$4}`,
    FOCUSIN: `focusin${EVENT_KEY$4}`,
    FOCUSOUT: `focusout${EVENT_KEY$4}`,
    MOUSEENTER: `mouseenter${EVENT_KEY$4}`,
    MOUSELEAVE: `mouseleave${EVENT_KEY$4}`
  };

  /**
   * Class definition
   */

  class Tooltip {
    constructor(element, config) {
      if (typeof Popper$1 === 'undefined') {
        throw new TypeError('Bootstrap\'s tooltips require Popper (https://popper.js.org)')
      }

      // Private
      this._isEnabled = true;
      this._timeout = 0;
      this._hoverState = '';
      this._activeTrigger = {};
      this._popper = null;

      // Protected
      this.element = element;
      this.config = this._getConfig(config);
      this.tip = null;

      this._setListeners();
    }

    // Getters
    static get VERSION() {
      return VERSION$4
    }

    static get Default() {
      return Default$3
    }

    static get NAME() {
      return NAME$4
    }

    static get DATA_KEY() {
      return DATA_KEY$4
    }

    static get Event() {
      return Event$1
    }

    static get EVENT_KEY() {
      return EVENT_KEY$4
    }

    static get DefaultType() {
      return DefaultType$3
    }

    // Public
    enable() {
      this._isEnabled = true;
    }

    disable() {
      this._isEnabled = false;
    }

    toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    }

    toggle(event) {
      if (!this._isEnabled) {
        return
      }

      if (event) {
        const dataKey = this.constructor.DATA_KEY;
        let context = $__default["default"](event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(
            event.currentTarget,
            this._getDelegateConfig()
          );
          $__default["default"](event.currentTarget).data(dataKey, context);
        }

        context._activeTrigger.click = !context._activeTrigger.click;

        if (context._isWithActiveTrigger()) {
          context._enter(null, context);
        } else {
          context._leave(null, context);
        }
      } else {
        if ($__default["default"](this.getTipElement()).hasClass(CLASS_NAME_SHOW$3)) {
          this._leave(null, this);
          return
        }

        this._enter(null, this);
      }
    }

    dispose() {
      clearTimeout(this._timeout);

      $__default["default"].removeData(this.element, this.constructor.DATA_KEY);

      $__default["default"](this.element).off(this.constructor.EVENT_KEY);
      $__default["default"](this.element).closest('.modal').off('hide.bs.modal', this._hideModalHandler);

      if (this.tip) {
        $__default["default"](this.tip).remove();
      }

      this._isEnabled = null;
      this._timeout = null;
      this._hoverState = null;
      this._activeTrigger = null;
      if (this._popper) {
        this._popper.destroy();
      }

      this._popper = null;
      this.element = null;
      this.config = null;
      this.tip = null;
    }

    show() {
      if ($__default["default"](this.element).css('display') === 'none') {
        throw new Error('Please use show on visible elements')
      }

      const showEvent = $__default["default"].Event(this.constructor.Event.SHOW);
      if (this.isWithContent() && this._isEnabled) {
        $__default["default"](this.element).trigger(showEvent);

        const shadowRoot = Util.findShadowRoot(this.element);
        const isInTheDom = $__default["default"].contains(
          shadowRoot !== null ? shadowRoot : this.element.ownerDocument.documentElement,
          this.element
        );

        if (showEvent.isDefaultPrevented() || !isInTheDom) {
          return
        }

        const tip = this.getTipElement();
        const tipId = Util.getUID(this.constructor.NAME);

        tip.setAttribute('id', tipId);
        this.element.setAttribute('aria-describedby', tipId);

        this.setContent();

        if (this.config.animation) {
          $__default["default"](tip).addClass(CLASS_NAME_FADE$3);
        }

        const placement = typeof this.config.placement === 'function' ?
          this.config.placement.call(this, tip, this.element) :
          this.config.placement;

        const attachment = this._getAttachment(placement);
        this.addAttachmentClass(attachment);

        const container = this._getContainer();
        $__default["default"](tip).data(this.constructor.DATA_KEY, this);

        if (!$__default["default"].contains(this.element.ownerDocument.documentElement, this.tip)) {
          $__default["default"](tip).appendTo(container);
        }

        $__default["default"](this.element).trigger(this.constructor.Event.INSERTED);

        this._popper = new Popper$1(this.element, tip, this._getPopperConfig(attachment));

        $__default["default"](tip).addClass(CLASS_NAME_SHOW$3);
        $__default["default"](tip).addClass(this.config.customClass);

        // If this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
        if ('ontouchstart' in document.documentElement) {
          $__default["default"](document.body).children().on('mouseover', null, $__default["default"].noop);
        }

        const complete = () => {
          if (this.config.animation) {
            this._fixTransition();
          }

          const prevHoverState = this._hoverState;
          this._hoverState = null;

          $__default["default"](this.element).trigger(this.constructor.Event.SHOWN);

          if (prevHoverState === HOVER_STATE_OUT) {
            this._leave(null, this);
          }
        };

        if ($__default["default"](this.tip).hasClass(CLASS_NAME_FADE$3)) {
          const transitionDuration = Util.getTransitionDurationFromElement(this.tip);

          $__default["default"](this.tip)
            .one(Util.TRANSITION_END, complete)
            .emulateTransitionEnd(transitionDuration);
        } else {
          complete();
        }
      }
    }

    hide(callback) {
      const tip = this.getTipElement();
      const hideEvent = $__default["default"].Event(this.constructor.Event.HIDE);
      const complete = () => {
        if (this._hoverState !== HOVER_STATE_SHOW && tip.parentNode) {
          tip.parentNode.removeChild(tip);
        }

        this._cleanTipClass();
        this.element.removeAttribute('aria-describedby');
        $__default["default"](this.element).trigger(this.constructor.Event.HIDDEN);
        if (this._popper !== null) {
          this._popper.destroy();
        }

        if (callback) {
          callback();
        }
      };

      $__default["default"](this.element).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return
      }

      $__default["default"](tip).removeClass(CLASS_NAME_SHOW$3);

      // If this is a touch-enabled device we remove the extra
      // empty mouseover listeners we added for iOS support
      if ('ontouchstart' in document.documentElement) {
        $__default["default"](document.body).children().off('mouseover', null, $__default["default"].noop);
      }

      this._activeTrigger[TRIGGER_CLICK] = false;
      this._activeTrigger[TRIGGER_FOCUS] = false;
      this._activeTrigger[TRIGGER_HOVER] = false;

      if ($__default["default"](this.tip).hasClass(CLASS_NAME_FADE$3)) {
        const transitionDuration = Util.getTransitionDurationFromElement(tip);

        $__default["default"](tip)
          .one(Util.TRANSITION_END, complete)
          .emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }

      this._hoverState = '';
    }

    update() {
      if (this._popper !== null) {
        this._popper.scheduleUpdate();
      }
    }

    // Protected
    isWithContent() {
      return Boolean(this.getTitle())
    }

    addAttachmentClass(attachment) {
      $__default["default"](this.getTipElement()).addClass(`${CLASS_PREFIX$1}-${attachment}`);
    }

    getTipElement() {
      this.tip = this.tip || $__default["default"](this.config.template)[0];
      return this.tip
    }

    setContent() {
      const tip = this.getTipElement();
      this.setElementContent($__default["default"](tip.querySelectorAll(SELECTOR_TOOLTIP_INNER)), this.getTitle());
      $__default["default"](tip).removeClass(`${CLASS_NAME_FADE$3} ${CLASS_NAME_SHOW$3}`);
    }

    setElementContent($element, content) {
      if (typeof content === 'object' && (content.nodeType || content.jquery)) {
        // Content is a DOM node or a jQuery
        if (this.config.html) {
          if (!$__default["default"](content).parent().is($element)) {
            $element.empty().append(content);
          }
        } else {
          $element.text($__default["default"](content).text());
        }

        return
      }

      if (this.config.html) {
        if (this.config.sanitize) {
          content = sanitizeHtml(content, this.config.whiteList, this.config.sanitizeFn);
        }

        $element.html(content);
      } else {
        $element.text(content);
      }
    }

    getTitle() {
      let title = this.element.getAttribute('data-original-title');

      if (!title) {
        title = typeof this.config.title === 'function' ?
          this.config.title.call(this.element) :
          this.config.title;
      }

      return title
    }

    // Private
    _getPopperConfig(attachment) {
      const defaultBsConfig = {
        placement: attachment,
        modifiers: {
          offset: this._getOffset(),
          flip: {
            behavior: this.config.fallbackPlacement
          },
          arrow: {
            element: SELECTOR_ARROW
          },
          preventOverflow: {
            boundariesElement: this.config.boundary
          }
        },
        onCreate: data => {
          if (data.originalPlacement !== data.placement) {
            this._handlePopperPlacementChange(data);
          }
        },
        onUpdate: data => this._handlePopperPlacementChange(data)
      };

      return {
        ...defaultBsConfig,
        ...this.config.popperConfig
      }
    }

    _getOffset() {
      const offset = {};

      if (typeof this.config.offset === 'function') {
        offset.fn = data => {
          data.offsets = {
            ...data.offsets,
            ...this.config.offset(data.offsets, this.element)
          };

          return data
        };
      } else {
        offset.offset = this.config.offset;
      }

      return offset
    }

    _getContainer() {
      if (this.config.container === false) {
        return document.body
      }

      if (Util.isElement(this.config.container)) {
        return $__default["default"](this.config.container)
      }

      return $__default["default"](document).find(this.config.container)
    }

    _getAttachment(placement) {
      return AttachmentMap[placement.toUpperCase()]
    }

    _setListeners() {
      const triggers = this.config.trigger.split(' ');

      triggers.forEach(trigger => {
        if (trigger === 'click') {
          $__default["default"](this.element).on(
            this.constructor.Event.CLICK,
            this.config.selector,
            event => this.toggle(event)
          );
        } else if (trigger !== TRIGGER_MANUAL) {
          const eventIn = trigger === TRIGGER_HOVER ?
            this.constructor.Event.MOUSEENTER :
            this.constructor.Event.FOCUSIN;
          const eventOut = trigger === TRIGGER_HOVER ?
            this.constructor.Event.MOUSELEAVE :
            this.constructor.Event.FOCUSOUT;

          $__default["default"](this.element)
            .on(eventIn, this.config.selector, event => this._enter(event))
            .on(eventOut, this.config.selector, event => this._leave(event));
        }
      });

      this._hideModalHandler = () => {
        if (this.element) {
          this.hide();
        }
      };

      $__default["default"](this.element).closest('.modal').on('hide.bs.modal', this._hideModalHandler);

      if (this.config.selector) {
        this.config = {
          ...this.config,
          trigger: 'manual',
          selector: ''
        };
      } else {
        this._fixTitle();
      }
    }

    _fixTitle() {
      const titleType = typeof this.element.getAttribute('data-original-title');

      if (this.element.getAttribute('title') || titleType !== 'string') {
        this.element.setAttribute(
          'data-original-title',
          this.element.getAttribute('title') || ''
        );

        this.element.setAttribute('title', '');
      }
    }

    _enter(event, context) {
      const dataKey = this.constructor.DATA_KEY;
      context = context || $__default["default"](event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(
          event.currentTarget,
          this._getDelegateConfig()
        );
        $__default["default"](event.currentTarget).data(dataKey, context);
      }

      if (event) {
        context._activeTrigger[
          event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER
        ] = true;
      }

      if ($__default["default"](context.getTipElement()).hasClass(CLASS_NAME_SHOW$3) || context._hoverState === HOVER_STATE_SHOW) {
        context._hoverState = HOVER_STATE_SHOW;
        return
      }

      clearTimeout(context._timeout);

      context._hoverState = HOVER_STATE_SHOW;

      if (!context.config.delay || !context.config.delay.show) {
        context.show();
        return
      }

      context._timeout = setTimeout(() => {
        if (context._hoverState === HOVER_STATE_SHOW) {
          context.show();
        }
      }, context.config.delay.show);
    }

    _leave(event, context) {
      const dataKey = this.constructor.DATA_KEY;
      context = context || $__default["default"](event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(
          event.currentTarget,
          this._getDelegateConfig()
        );
        $__default["default"](event.currentTarget).data(dataKey, context);
      }

      if (event) {
        context._activeTrigger[
          event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER
        ] = false;
      }

      if (context._isWithActiveTrigger()) {
        return
      }

      clearTimeout(context._timeout);

      context._hoverState = HOVER_STATE_OUT;

      if (!context.config.delay || !context.config.delay.hide) {
        context.hide();
        return
      }

      context._timeout = setTimeout(() => {
        if (context._hoverState === HOVER_STATE_OUT) {
          context.hide();
        }
      }, context.config.delay.hide);
    }

    _isWithActiveTrigger() {
      for (const trigger in this._activeTrigger) {
        if (this._activeTrigger[trigger]) {
          return true
        }
      }

      return false
    }

    _getConfig(config) {
      const dataAttributes = $__default["default"](this.element).data();

      Object.keys(dataAttributes)
        .forEach(dataAttr => {
          if (DISALLOWED_ATTRIBUTES.indexOf(dataAttr) !== -1) {
            delete dataAttributes[dataAttr];
          }
        });

      config = {
        ...this.constructor.Default,
        ...dataAttributes,
        ...(typeof config === 'object' && config ? config : {})
      };

      if (typeof config.delay === 'number') {
        config.delay = {
          show: config.delay,
          hide: config.delay
        };
      }

      if (typeof config.title === 'number') {
        config.title = config.title.toString();
      }

      if (typeof config.content === 'number') {
        config.content = config.content.toString();
      }

      Util.typeCheckConfig(
        NAME$4,
        config,
        this.constructor.DefaultType
      );

      if (config.sanitize) {
        config.template = sanitizeHtml(config.template, config.whiteList, config.sanitizeFn);
      }

      return config
    }

    _getDelegateConfig() {
      const config = {};

      if (this.config) {
        for (const key in this.config) {
          if (this.constructor.Default[key] !== this.config[key]) {
            config[key] = this.config[key];
          }
        }
      }

      return config
    }

    _cleanTipClass() {
      const $tip = $__default["default"](this.getTipElement());
      const tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX$1);
      if (tabClass !== null && tabClass.length) {
        $tip.removeClass(tabClass.join(''));
      }
    }

    _handlePopperPlacementChange(popperData) {
      this.tip = popperData.instance.popper;
      this._cleanTipClass();
      this.addAttachmentClass(this._getAttachment(popperData.placement));
    }

    _fixTransition() {
      const tip = this.getTipElement();
      const initConfigAnimation = this.config.animation;

      if (tip.getAttribute('x-placement') !== null) {
        return
      }

      $__default["default"](tip).removeClass(CLASS_NAME_FADE$3);
      this.config.animation = false;
      this.hide();
      this.show();
      this.config.animation = initConfigAnimation;
    }

    // Static
    static _jQueryInterface(config) {
      return this.each(function () {
        const $element = $__default["default"](this);
        let data = $element.data(DATA_KEY$4);
        const _config = typeof config === 'object' && config;

        if (!data && /dispose|hide/.test(config)) {
          return
        }

        if (!data) {
          data = new Tooltip(this, _config);
          $element.data(DATA_KEY$4, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError(`No method named "${config}"`)
          }

          data[config]();
        }
      })
    }
  }

  /**
   * jQuery
   */

  $__default["default"].fn[NAME$4] = Tooltip._jQueryInterface;
  $__default["default"].fn[NAME$4].Constructor = Tooltip;
  $__default["default"].fn[NAME$4].noConflict = () => {
    $__default["default"].fn[NAME$4] = JQUERY_NO_CONFLICT$4;
    return Tooltip._jQueryInterface
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.6.1): popover.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * Constants
   */

  const NAME$3 = 'popover';
  const VERSION$3 = '4.6.1';
  const DATA_KEY$3 = 'bs.popover';
  const EVENT_KEY$3 = `.${DATA_KEY$3}`;
  const JQUERY_NO_CONFLICT$3 = $__default["default"].fn[NAME$3];
  const CLASS_PREFIX = 'bs-popover';
  const BSCLS_PREFIX_REGEX = new RegExp(`(^|\\s)${CLASS_PREFIX}\\S+`, 'g');

  const CLASS_NAME_FADE$2 = 'fade';
  const CLASS_NAME_SHOW$2 = 'show';

  const SELECTOR_TITLE = '.popover-header';
  const SELECTOR_CONTENT = '.popover-body';

  const Default$2 = {
    ...Tooltip.Default,
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip">' +
                '<div class="arrow"></div>' +
                '<h3 class="popover-header"></h3>' +
                '<div class="popover-body"></div></div>'
  };

  const DefaultType$2 = {
    ...Tooltip.DefaultType,
    content: '(string|element|function)'
  };

  const Event = {
    HIDE: `hide${EVENT_KEY$3}`,
    HIDDEN: `hidden${EVENT_KEY$3}`,
    SHOW: `show${EVENT_KEY$3}`,
    SHOWN: `shown${EVENT_KEY$3}`,
    INSERTED: `inserted${EVENT_KEY$3}`,
    CLICK: `click${EVENT_KEY$3}`,
    FOCUSIN: `focusin${EVENT_KEY$3}`,
    FOCUSOUT: `focusout${EVENT_KEY$3}`,
    MOUSEENTER: `mouseenter${EVENT_KEY$3}`,
    MOUSELEAVE: `mouseleave${EVENT_KEY$3}`
  };

  /**
   * Class definition
   */

  class Popover extends Tooltip {
    // Getters
    static get VERSION() {
      return VERSION$3
    }

    static get Default() {
      return Default$2
    }

    static get NAME() {
      return NAME$3
    }

    static get DATA_KEY() {
      return DATA_KEY$3
    }

    static get Event() {
      return Event
    }

    static get EVENT_KEY() {
      return EVENT_KEY$3
    }

    static get DefaultType() {
      return DefaultType$2
    }

    // Overrides
    isWithContent() {
      return this.getTitle() || this._getContent()
    }

    addAttachmentClass(attachment) {
      $__default["default"](this.getTipElement()).addClass(`${CLASS_PREFIX}-${attachment}`);
    }

    getTipElement() {
      this.tip = this.tip || $__default["default"](this.config.template)[0];
      return this.tip
    }

    setContent() {
      const $tip = $__default["default"](this.getTipElement());

      // We use append for html objects to maintain js events
      this.setElementContent($tip.find(SELECTOR_TITLE), this.getTitle());
      let content = this._getContent();
      if (typeof content === 'function') {
        content = content.call(this.element);
      }

      this.setElementContent($tip.find(SELECTOR_CONTENT), content);

      $tip.removeClass(`${CLASS_NAME_FADE$2} ${CLASS_NAME_SHOW$2}`);
    }

    // Private
    _getContent() {
      return this.element.getAttribute('data-content') ||
        this.config.content
    }

    _cleanTipClass() {
      const $tip = $__default["default"](this.getTipElement());
      const tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);
      if (tabClass !== null && tabClass.length > 0) {
        $tip.removeClass(tabClass.join(''));
      }
    }

    // Static
    static _jQueryInterface(config) {
      return this.each(function () {
        let data = $__default["default"](this).data(DATA_KEY$3);
        const _config = typeof config === 'object' ? config : null;

        if (!data && /dispose|hide/.test(config)) {
          return
        }

        if (!data) {
          data = new Popover(this, _config);
          $__default["default"](this).data(DATA_KEY$3, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError(`No method named "${config}"`)
          }

          data[config]();
        }
      })
    }
  }

  /**
   * jQuery
   */

  $__default["default"].fn[NAME$3] = Popover._jQueryInterface;
  $__default["default"].fn[NAME$3].Constructor = Popover;
  $__default["default"].fn[NAME$3].noConflict = () => {
    $__default["default"].fn[NAME$3] = JQUERY_NO_CONFLICT$3;
    return Popover._jQueryInterface
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.6.1): scrollspy.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * Constants
   */

  const NAME$2 = 'scrollspy';
  const VERSION$2 = '4.6.1';
  const DATA_KEY$2 = 'bs.scrollspy';
  const EVENT_KEY$2 = `.${DATA_KEY$2}`;
  const DATA_API_KEY$1 = '.data-api';
  const JQUERY_NO_CONFLICT$2 = $__default["default"].fn[NAME$2];

  const CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item';
  const CLASS_NAME_ACTIVE$1 = 'active';

  const EVENT_ACTIVATE = `activate${EVENT_KEY$2}`;
  const EVENT_SCROLL = `scroll${EVENT_KEY$2}`;
  const EVENT_LOAD_DATA_API = `load${EVENT_KEY$2}${DATA_API_KEY$1}`;

  const METHOD_OFFSET = 'offset';
  const METHOD_POSITION = 'position';

  const SELECTOR_DATA_SPY = '[data-spy="scroll"]';
  const SELECTOR_NAV_LIST_GROUP$1 = '.nav, .list-group';
  const SELECTOR_NAV_LINKS = '.nav-link';
  const SELECTOR_NAV_ITEMS = '.nav-item';
  const SELECTOR_LIST_ITEMS = '.list-group-item';
  const SELECTOR_DROPDOWN$1 = '.dropdown';
  const SELECTOR_DROPDOWN_ITEMS = '.dropdown-item';
  const SELECTOR_DROPDOWN_TOGGLE$1 = '.dropdown-toggle';

  const Default$1 = {
    offset: 10,
    method: 'auto',
    target: ''
  };

  const DefaultType$1 = {
    offset: 'number',
    method: 'string',
    target: '(string|element)'
  };

  /**
   * Class definition
   */

  class ScrollSpy {
    constructor(element, config) {
      this._element = element;
      this._scrollElement = element.tagName === 'BODY' ? window : element;
      this._config = this._getConfig(config);
      this._selector = `${this._config.target} ${SELECTOR_NAV_LINKS},` +
                            `${this._config.target} ${SELECTOR_LIST_ITEMS},` +
                            `${this._config.target} ${SELECTOR_DROPDOWN_ITEMS}`;
      this._offsets = [];
      this._targets = [];
      this._activeTarget = null;
      this._scrollHeight = 0;

      $__default["default"](this._scrollElement).on(EVENT_SCROLL, event => this._process(event));

      this.refresh();
      this._process();
    }

    // Getters
    static get VERSION() {
      return VERSION$2
    }

    static get Default() {
      return Default$1
    }

    // Public
    refresh() {
      const autoMethod = this._scrollElement === this._scrollElement.window ?
        METHOD_OFFSET : METHOD_POSITION;

      const offsetMethod = this._config.method === 'auto' ?
        autoMethod : this._config.method;

      const offsetBase = offsetMethod === METHOD_POSITION ?
        this._getScrollTop() : 0;

      this._offsets = [];
      this._targets = [];

      this._scrollHeight = this._getScrollHeight();

      const targets = [].slice.call(document.querySelectorAll(this._selector));

      targets
        .map(element => {
          let target;
          const targetSelector = Util.getSelectorFromElement(element);

          if (targetSelector) {
            target = document.querySelector(targetSelector);
          }

          if (target) {
            const targetBCR = target.getBoundingClientRect();
            if (targetBCR.width || targetBCR.height) {
              // TODO (fat): remove sketch reliance on jQuery position/offset
              return [
                $__default["default"](target)[offsetMethod]().top + offsetBase,
                targetSelector
              ]
            }
          }

          return null
        })
        .filter(item => item)
        .sort((a, b) => a[0] - b[0])
        .forEach(item => {
          this._offsets.push(item[0]);
          this._targets.push(item[1]);
        });
    }

    dispose() {
      $__default["default"].removeData(this._element, DATA_KEY$2);
      $__default["default"](this._scrollElement).off(EVENT_KEY$2);

      this._element = null;
      this._scrollElement = null;
      this._config = null;
      this._selector = null;
      this._offsets = null;
      this._targets = null;
      this._activeTarget = null;
      this._scrollHeight = null;
    }

    // Private
    _getConfig(config) {
      config = {
        ...Default$1,
        ...(typeof config === 'object' && config ? config : {})
      };

      if (typeof config.target !== 'string' && Util.isElement(config.target)) {
        let id = $__default["default"](config.target).attr('id');
        if (!id) {
          id = Util.getUID(NAME$2);
          $__default["default"](config.target).attr('id', id);
        }

        config.target = `#${id}`;
      }

      Util.typeCheckConfig(NAME$2, config, DefaultType$1);

      return config
    }

    _getScrollTop() {
      return this._scrollElement === window ?
        this._scrollElement.pageYOffset : this._scrollElement.scrollTop
    }

    _getScrollHeight() {
      return this._scrollElement.scrollHeight || Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      )
    }

    _getOffsetHeight() {
      return this._scrollElement === window ?
        window.innerHeight : this._scrollElement.getBoundingClientRect().height
    }

    _process() {
      const scrollTop = this._getScrollTop() + this._config.offset;
      const scrollHeight = this._getScrollHeight();
      const maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

      if (this._scrollHeight !== scrollHeight) {
        this.refresh();
      }

      if (scrollTop >= maxScroll) {
        const target = this._targets[this._targets.length - 1];

        if (this._activeTarget !== target) {
          this._activate(target);
        }

        return
      }

      if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
        this._activeTarget = null;
        this._clear();
        return
      }

      for (let i = this._offsets.length; i--;) {
        const isActiveTarget = this._activeTarget !== this._targets[i] &&
            scrollTop >= this._offsets[i] &&
            (typeof this._offsets[i + 1] === 'undefined' ||
                scrollTop < this._offsets[i + 1]);

        if (isActiveTarget) {
          this._activate(this._targets[i]);
        }
      }
    }

    _activate(target) {
      this._activeTarget = target;

      this._clear();

      const queries = this._selector
        .split(',')
        .map(selector => `${selector}[data-target="${target}"],${selector}[href="${target}"]`);

      const $link = $__default["default"]([].slice.call(document.querySelectorAll(queries.join(','))));

      if ($link.hasClass(CLASS_NAME_DROPDOWN_ITEM)) {
        $link.closest(SELECTOR_DROPDOWN$1)
          .find(SELECTOR_DROPDOWN_TOGGLE$1)
          .addClass(CLASS_NAME_ACTIVE$1);
        $link.addClass(CLASS_NAME_ACTIVE$1);
      } else {
        // Set triggered link as active
        $link.addClass(CLASS_NAME_ACTIVE$1);
        // Set triggered links parents as active
        // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
        $link.parents(SELECTOR_NAV_LIST_GROUP$1)
          .prev(`${SELECTOR_NAV_LINKS}, ${SELECTOR_LIST_ITEMS}`)
          .addClass(CLASS_NAME_ACTIVE$1);
        // Handle special case when .nav-link is inside .nav-item
        $link.parents(SELECTOR_NAV_LIST_GROUP$1)
          .prev(SELECTOR_NAV_ITEMS)
          .children(SELECTOR_NAV_LINKS)
          .addClass(CLASS_NAME_ACTIVE$1);
      }

      $__default["default"](this._scrollElement).trigger(EVENT_ACTIVATE, {
        relatedTarget: target
      });
    }

    _clear() {
      [].slice.call(document.querySelectorAll(this._selector))
        .filter(node => node.classList.contains(CLASS_NAME_ACTIVE$1))
        .forEach(node => node.classList.remove(CLASS_NAME_ACTIVE$1));
    }

    // Static
    static _jQueryInterface(config) {
      return this.each(function () {
        let data = $__default["default"](this).data(DATA_KEY$2);
        const _config = typeof config === 'object' && config;

        if (!data) {
          data = new ScrollSpy(this, _config);
          $__default["default"](this).data(DATA_KEY$2, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError(`No method named "${config}"`)
          }

          data[config]();
        }
      })
    }
  }

  /**
   * Data API implementation
   */

  $__default["default"](window).on(EVENT_LOAD_DATA_API, () => {
    const scrollSpys = [].slice.call(document.querySelectorAll(SELECTOR_DATA_SPY));
    const scrollSpysLength = scrollSpys.length;

    for (let i = scrollSpysLength; i--;) {
      const $spy = $__default["default"](scrollSpys[i]);
      ScrollSpy._jQueryInterface.call($spy, $spy.data());
    }
  });

  /**
   * jQuery
   */

  $__default["default"].fn[NAME$2] = ScrollSpy._jQueryInterface;
  $__default["default"].fn[NAME$2].Constructor = ScrollSpy;
  $__default["default"].fn[NAME$2].noConflict = () => {
    $__default["default"].fn[NAME$2] = JQUERY_NO_CONFLICT$2;
    return ScrollSpy._jQueryInterface
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.6.1): tab.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * Constants
   */

  const NAME$1 = 'tab';
  const VERSION$1 = '4.6.1';
  const DATA_KEY$1 = 'bs.tab';
  const EVENT_KEY$1 = `.${DATA_KEY$1}`;
  const DATA_API_KEY = '.data-api';
  const JQUERY_NO_CONFLICT$1 = $__default["default"].fn[NAME$1];

  const CLASS_NAME_DROPDOWN_MENU = 'dropdown-menu';
  const CLASS_NAME_ACTIVE = 'active';
  const CLASS_NAME_DISABLED = 'disabled';
  const CLASS_NAME_FADE$1 = 'fade';
  const CLASS_NAME_SHOW$1 = 'show';

  const EVENT_HIDE$1 = `hide${EVENT_KEY$1}`;
  const EVENT_HIDDEN$1 = `hidden${EVENT_KEY$1}`;
  const EVENT_SHOW$1 = `show${EVENT_KEY$1}`;
  const EVENT_SHOWN$1 = `shown${EVENT_KEY$1}`;
  const EVENT_CLICK_DATA_API = `click${EVENT_KEY$1}${DATA_API_KEY}`;

  const SELECTOR_DROPDOWN = '.dropdown';
  const SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
  const SELECTOR_ACTIVE = '.active';
  const SELECTOR_ACTIVE_UL = '> li > .active';
  const SELECTOR_DATA_TOGGLE = '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]';
  const SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
  const SELECTOR_DROPDOWN_ACTIVE_CHILD = '> .dropdown-menu .active';

  /**
   * Class definition
   */

  class Tab {
    constructor(element) {
      this._element = element;
    }

    // Getters
    static get VERSION() {
      return VERSION$1
    }

    // Public
    show() {
      if (this._element.parentNode &&
          this._element.parentNode.nodeType === Node.ELEMENT_NODE &&
          $__default["default"](this._element).hasClass(CLASS_NAME_ACTIVE) ||
          $__default["default"](this._element).hasClass(CLASS_NAME_DISABLED)) {
        return
      }

      let target;
      let previous;
      const listElement = $__default["default"](this._element).closest(SELECTOR_NAV_LIST_GROUP)[0];
      const selector = Util.getSelectorFromElement(this._element);

      if (listElement) {
        const itemSelector = listElement.nodeName === 'UL' || listElement.nodeName === 'OL' ? SELECTOR_ACTIVE_UL : SELECTOR_ACTIVE;
        previous = $__default["default"].makeArray($__default["default"](listElement).find(itemSelector));
        previous = previous[previous.length - 1];
      }

      const hideEvent = $__default["default"].Event(EVENT_HIDE$1, {
        relatedTarget: this._element
      });

      const showEvent = $__default["default"].Event(EVENT_SHOW$1, {
        relatedTarget: previous
      });

      if (previous) {
        $__default["default"](previous).trigger(hideEvent);
      }

      $__default["default"](this._element).trigger(showEvent);

      if (showEvent.isDefaultPrevented() ||
          hideEvent.isDefaultPrevented()) {
        return
      }

      if (selector) {
        target = document.querySelector(selector);
      }

      this._activate(
        this._element,
        listElement
      );

      const complete = () => {
        const hiddenEvent = $__default["default"].Event(EVENT_HIDDEN$1, {
          relatedTarget: this._element
        });

        const shownEvent = $__default["default"].Event(EVENT_SHOWN$1, {
          relatedTarget: previous
        });

        $__default["default"](previous).trigger(hiddenEvent);
        $__default["default"](this._element).trigger(shownEvent);
      };

      if (target) {
        this._activate(target, target.parentNode, complete);
      } else {
        complete();
      }
    }

    dispose() {
      $__default["default"].removeData(this._element, DATA_KEY$1);
      this._element = null;
    }

    // Private
    _activate(element, container, callback) {
      const activeElements = container && (container.nodeName === 'UL' || container.nodeName === 'OL') ?
        $__default["default"](container).find(SELECTOR_ACTIVE_UL) :
        $__default["default"](container).children(SELECTOR_ACTIVE);

      const active = activeElements[0];
      const isTransitioning = callback && (active && $__default["default"](active).hasClass(CLASS_NAME_FADE$1));
      const complete = () => this._transitionComplete(
        element,
        active,
        callback
      );

      if (active && isTransitioning) {
        const transitionDuration = Util.getTransitionDurationFromElement(active);

        $__default["default"](active)
          .removeClass(CLASS_NAME_SHOW$1)
          .one(Util.TRANSITION_END, complete)
          .emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }
    }

    _transitionComplete(element, active, callback) {
      if (active) {
        $__default["default"](active).removeClass(CLASS_NAME_ACTIVE);

        const dropdownChild = $__default["default"](active.parentNode).find(
          SELECTOR_DROPDOWN_ACTIVE_CHILD
        )[0];

        if (dropdownChild) {
          $__default["default"](dropdownChild).removeClass(CLASS_NAME_ACTIVE);
        }

        if (active.getAttribute('role') === 'tab') {
          active.setAttribute('aria-selected', false);
        }
      }

      $__default["default"](element).addClass(CLASS_NAME_ACTIVE);
      if (element.getAttribute('role') === 'tab') {
        element.setAttribute('aria-selected', true);
      }

      Util.reflow(element);

      if (element.classList.contains(CLASS_NAME_FADE$1)) {
        element.classList.add(CLASS_NAME_SHOW$1);
      }

      let parent = element.parentNode;
      if (parent && parent.nodeName === 'LI') {
        parent = parent.parentNode;
      }

      if (parent && $__default["default"](parent).hasClass(CLASS_NAME_DROPDOWN_MENU)) {
        const dropdownElement = $__default["default"](element).closest(SELECTOR_DROPDOWN)[0];

        if (dropdownElement) {
          const dropdownToggleList = [].slice.call(dropdownElement.querySelectorAll(SELECTOR_DROPDOWN_TOGGLE));

          $__default["default"](dropdownToggleList).addClass(CLASS_NAME_ACTIVE);
        }

        element.setAttribute('aria-expanded', true);
      }

      if (callback) {
        callback();
      }
    }

    // Static
    static _jQueryInterface(config) {
      return this.each(function () {
        const $this = $__default["default"](this);
        let data = $this.data(DATA_KEY$1);

        if (!data) {
          data = new Tab(this);
          $this.data(DATA_KEY$1, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError(`No method named "${config}"`)
          }

          data[config]();
        }
      })
    }
  }

  /**
   * Data API implementation
   */

  $__default["default"](document)
    .on(EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
      event.preventDefault();
      Tab._jQueryInterface.call($__default["default"](this), 'show');
    });

  /**
   * jQuery
   */

  $__default["default"].fn[NAME$1] = Tab._jQueryInterface;
  $__default["default"].fn[NAME$1].Constructor = Tab;
  $__default["default"].fn[NAME$1].noConflict = () => {
    $__default["default"].fn[NAME$1] = JQUERY_NO_CONFLICT$1;
    return Tab._jQueryInterface
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.6.1): toast.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * Constants
   */

  const NAME = 'toast';
  const VERSION = '4.6.1';
  const DATA_KEY = 'bs.toast';
  const EVENT_KEY = `.${DATA_KEY}`;
  const JQUERY_NO_CONFLICT = $__default["default"].fn[NAME];

  const CLASS_NAME_FADE = 'fade';
  const CLASS_NAME_HIDE = 'hide';
  const CLASS_NAME_SHOW = 'show';
  const CLASS_NAME_SHOWING = 'showing';

  const EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY}`;
  const EVENT_HIDE = `hide${EVENT_KEY}`;
  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
  const EVENT_SHOW = `show${EVENT_KEY}`;
  const EVENT_SHOWN = `shown${EVENT_KEY}`;

  const SELECTOR_DATA_DISMISS = '[data-dismiss="toast"]';

  const Default = {
    animation: true,
    autohide: true,
    delay: 500
  };

  const DefaultType = {
    animation: 'boolean',
    autohide: 'boolean',
    delay: 'number'
  };

  /**
   * Class definition
   */

  class Toast {
    constructor(element, config) {
      this._element = element;
      this._config = this._getConfig(config);
      this._timeout = null;
      this._setListeners();
    }

    // Getters
    static get VERSION() {
      return VERSION
    }

    static get DefaultType() {
      return DefaultType
    }

    static get Default() {
      return Default
    }

    // Public
    show() {
      const showEvent = $__default["default"].Event(EVENT_SHOW);

      $__default["default"](this._element).trigger(showEvent);
      if (showEvent.isDefaultPrevented()) {
        return
      }

      this._clearTimeout();

      if (this._config.animation) {
        this._element.classList.add(CLASS_NAME_FADE);
      }

      const complete = () => {
        this._element.classList.remove(CLASS_NAME_SHOWING);
        this._element.classList.add(CLASS_NAME_SHOW);

        $__default["default"](this._element).trigger(EVENT_SHOWN);

        if (this._config.autohide) {
          this._timeout = setTimeout(() => {
            this.hide();
          }, this._config.delay);
        }
      };

      this._element.classList.remove(CLASS_NAME_HIDE);
      Util.reflow(this._element);
      this._element.classList.add(CLASS_NAME_SHOWING);
      if (this._config.animation) {
        const transitionDuration = Util.getTransitionDurationFromElement(this._element);

        $__default["default"](this._element)
          .one(Util.TRANSITION_END, complete)
          .emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }
    }

    hide() {
      if (!this._element.classList.contains(CLASS_NAME_SHOW)) {
        return
      }

      const hideEvent = $__default["default"].Event(EVENT_HIDE);

      $__default["default"](this._element).trigger(hideEvent);
      if (hideEvent.isDefaultPrevented()) {
        return
      }

      this._close();
    }

    dispose() {
      this._clearTimeout();

      if (this._element.classList.contains(CLASS_NAME_SHOW)) {
        this._element.classList.remove(CLASS_NAME_SHOW);
      }

      $__default["default"](this._element).off(EVENT_CLICK_DISMISS);

      $__default["default"].removeData(this._element, DATA_KEY);
      this._element = null;
      this._config = null;
    }

    // Private
    _getConfig(config) {
      config = {
        ...Default,
        ...$__default["default"](this._element).data(),
        ...(typeof config === 'object' && config ? config : {})
      };

      Util.typeCheckConfig(
        NAME,
        config,
        this.constructor.DefaultType
      );

      return config
    }

    _setListeners() {
      $__default["default"](this._element).on(EVENT_CLICK_DISMISS, SELECTOR_DATA_DISMISS, () => this.hide());
    }

    _close() {
      const complete = () => {
        this._element.classList.add(CLASS_NAME_HIDE);
        $__default["default"](this._element).trigger(EVENT_HIDDEN);
      };

      this._element.classList.remove(CLASS_NAME_SHOW);
      if (this._config.animation) {
        const transitionDuration = Util.getTransitionDurationFromElement(this._element);

        $__default["default"](this._element)
          .one(Util.TRANSITION_END, complete)
          .emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }
    }

    _clearTimeout() {
      clearTimeout(this._timeout);
      this._timeout = null;
    }

    // Static
    static _jQueryInterface(config) {
      return this.each(function () {
        const $element = $__default["default"](this);
        let data = $element.data(DATA_KEY);
        const _config = typeof config === 'object' && config;

        if (!data) {
          data = new Toast(this, _config);
          $element.data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError(`No method named "${config}"`)
          }

          data[config](this);
        }
      })
    }
  }

  /**
   * jQuery
   */

  $__default["default"].fn[NAME] = Toast._jQueryInterface;
  $__default["default"].fn[NAME].Constructor = Toast;
  $__default["default"].fn[NAME].noConflict = () => {
    $__default["default"].fn[NAME] = JQUERY_NO_CONFLICT;
    return Toast._jQueryInterface
  };

  /**
   * File skip-link-focus-fix.js.
   *
   * Helps with accessibility for keyboard only users.
   *
   * Learn more: https://git.io/vWdr2
   */
  (function () {
    var isWebkit = navigator.userAgent.toLowerCase().indexOf('webkit') > -1,
        isOpera = navigator.userAgent.toLowerCase().indexOf('opera') > -1,
        isIe = navigator.userAgent.toLowerCase().indexOf('msie') > -1;

    if ((isWebkit || isOpera || isIe) && document.getElementById && window.addEventListener) {
      window.addEventListener('hashchange', function () {
        var id = location.hash.substring(1),
            element;

        if (!/^[A-z0-9_-]+$/.test(id)) {
          return;
        }

        element = document.getElementById(id);

        if (element) {
          if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
            element.tabIndex = -1;
          }

          element.focus();
        }
      }, false);
    }
  })();

  exports.Alert = Alert;
  exports.Button = Button;
  exports.Carousel = Carousel;
  exports.Collapse = Collapse;
  exports.Dropdown = Dropdown;
  exports.Modal = Modal;
  exports.Popover = Popover;
  exports.Popper = Popper$3;
  exports.Scrollspy = ScrollSpy;
  exports.Tab = Tab;
  exports.Toast = Toast;
  exports.Tooltip = Tooltip;
  exports.Util = Util;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=theme-bootstrap4.js.map

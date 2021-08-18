/*!
  * Understrap v0.9.6 (https://understrap.com)
  * Copyright 2013-2021 The UnderStrap Authors (https://github.com/understrap/understrap/graphs/contributors)
  * Licensed under GPL (http://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery'), require('popper.js')) :
  typeof define === 'function' && define.amd ? define(['exports', 'jquery', 'popper.js'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.understrap = {}, global.jQuery, global.Popper));
}(this, (function (exports, $, Popper) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var $__default = /*#__PURE__*/_interopDefaultLegacy($);
  var Popper__default = /*#__PURE__*/_interopDefaultLegacy(Popper);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.6.0): util.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Private TransitionEnd Helpers
   * ------------------------------------------------------------------------
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
        if ($__default['default'](event.target).is(this)) {
          return event.handleObj.handler.apply(this, arguments) // eslint-disable-line prefer-rest-params
        }

        return undefined
      }
    }
  }

  function transitionEndEmulator(duration) {
    let called = false;

    $__default['default'](this).one(Util.TRANSITION_END, () => {
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
    $__default['default'].fn.emulateTransitionEnd = transitionEndEmulator;
    $__default['default'].event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
  }

  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */

  const Util = {
    TRANSITION_END: 'bsTransitionEnd',

    getUID(prefix) {
      do {
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
      let transitionDuration = $__default['default'](element).css('transition-duration');
      let transitionDelay = $__default['default'](element).css('transition-delay');

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
      $__default['default'](element).trigger(TRANSITION_END);
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
      if (typeof $__default['default'] === 'undefined') {
        throw new TypeError('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.')
      }

      const version = $__default['default'].fn.jquery.split(' ')[0].split('.');
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
   * Bootstrap (v4.6.0): alert.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME$a = 'alert';
  const VERSION$a = '4.6.0';
  const DATA_KEY$a = 'bs.alert';
  const EVENT_KEY$a = `.${DATA_KEY$a}`;
  const DATA_API_KEY$7 = '.data-api';
  const JQUERY_NO_CONFLICT$a = $__default['default'].fn[NAME$a];

  const SELECTOR_DISMISS = '[data-dismiss="alert"]';

  const EVENT_CLOSE = `close${EVENT_KEY$a}`;
  const EVENT_CLOSED = `closed${EVENT_KEY$a}`;
  const EVENT_CLICK_DATA_API$6 = `click${EVENT_KEY$a}${DATA_API_KEY$7}`;

  const CLASS_NAME_ALERT = 'alert';
  const CLASS_NAME_FADE$5 = 'fade';
  const CLASS_NAME_SHOW$7 = 'show';

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
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
      $__default['default'].removeData(this._element, DATA_KEY$a);
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
        parent = $__default['default'](element).closest(`.${CLASS_NAME_ALERT}`)[0];
      }

      return parent
    }

    _triggerCloseEvent(element) {
      const closeEvent = $__default['default'].Event(EVENT_CLOSE);

      $__default['default'](element).trigger(closeEvent);
      return closeEvent
    }

    _removeElement(element) {
      $__default['default'](element).removeClass(CLASS_NAME_SHOW$7);

      if (!$__default['default'](element).hasClass(CLASS_NAME_FADE$5)) {
        this._destroyElement(element);
        return
      }

      const transitionDuration = Util.getTransitionDurationFromElement(element);

      $__default['default'](element)
        .one(Util.TRANSITION_END, event => this._destroyElement(element, event))
        .emulateTransitionEnd(transitionDuration);
    }

    _destroyElement(element) {
      $__default['default'](element)
        .detach()
        .trigger(EVENT_CLOSED)
        .remove();
    }

    // Static

    static _jQueryInterface(config) {
      return this.each(function () {
        const $element = $__default['default'](this);
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
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $__default['default'](document).on(
    EVENT_CLICK_DATA_API$6,
    SELECTOR_DISMISS,
    Alert._handleDismiss(new Alert())
  );

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $__default['default'].fn[NAME$a] = Alert._jQueryInterface;
  $__default['default'].fn[NAME$a].Constructor = Alert;
  $__default['default'].fn[NAME$a].noConflict = () => {
    $__default['default'].fn[NAME$a] = JQUERY_NO_CONFLICT$a;
    return Alert._jQueryInterface
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.6.0): button.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME$9 = 'button';
  const VERSION$9 = '4.6.0';
  const DATA_KEY$9 = 'bs.button';
  const EVENT_KEY$9 = `.${DATA_KEY$9}`;
  const DATA_API_KEY$6 = '.data-api';
  const JQUERY_NO_CONFLICT$9 = $__default['default'].fn[NAME$9];

  const CLASS_NAME_ACTIVE$3 = 'active';
  const CLASS_NAME_BUTTON = 'btn';
  const CLASS_NAME_FOCUS = 'focus';

  const SELECTOR_DATA_TOGGLE_CARROT = '[data-toggle^="button"]';
  const SELECTOR_DATA_TOGGLES = '[data-toggle="buttons"]';
  const SELECTOR_DATA_TOGGLE$4 = '[data-toggle="button"]';
  const SELECTOR_DATA_TOGGLES_BUTTONS = '[data-toggle="buttons"] .btn';
  const SELECTOR_INPUT = 'input:not([type="hidden"])';
  const SELECTOR_ACTIVE$2 = '.active';
  const SELECTOR_BUTTON = '.btn';

  const EVENT_CLICK_DATA_API$5 = `click${EVENT_KEY$9}${DATA_API_KEY$6}`;
  const EVENT_FOCUS_BLUR_DATA_API = `focus${EVENT_KEY$9}${DATA_API_KEY$6} ` +
                            `blur${EVENT_KEY$9}${DATA_API_KEY$6}`;
  const EVENT_LOAD_DATA_API$2 = `load${EVENT_KEY$9}${DATA_API_KEY$6}`;

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
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
      const rootElement = $__default['default'](this._element).closest(SELECTOR_DATA_TOGGLES)[0];

      if (rootElement) {
        const input = this._element.querySelector(SELECTOR_INPUT);

        if (input) {
          if (input.type === 'radio') {
            if (input.checked && this._element.classList.contains(CLASS_NAME_ACTIVE$3)) {
              triggerChangeEvent = false;
            } else {
              const activeElement = rootElement.querySelector(SELECTOR_ACTIVE$2);

              if (activeElement) {
                $__default['default'](activeElement).removeClass(CLASS_NAME_ACTIVE$3);
              }
            }
          }

          if (triggerChangeEvent) {
            // if it's not a radio button or checkbox don't add a pointless/invalid checked property to the input
            if (input.type === 'checkbox' || input.type === 'radio') {
              input.checked = !this._element.classList.contains(CLASS_NAME_ACTIVE$3);
            }

            if (!this.shouldAvoidTriggerChange) {
              $__default['default'](input).trigger('change');
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
          $__default['default'](this._element).toggleClass(CLASS_NAME_ACTIVE$3);
        }
      }
    }

    dispose() {
      $__default['default'].removeData(this._element, DATA_KEY$9);
      this._element = null;
    }

    // Static

    static _jQueryInterface(config, avoidTriggerChange) {
      return this.each(function () {
        const $element = $__default['default'](this);
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
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $__default['default'](document)
    .on(EVENT_CLICK_DATA_API$5, SELECTOR_DATA_TOGGLE_CARROT, event => {
      let button = event.target;
      const initialButton = button;

      if (!$__default['default'](button).hasClass(CLASS_NAME_BUTTON)) {
        button = $__default['default'](button).closest(SELECTOR_BUTTON)[0];
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
          Button._jQueryInterface.call($__default['default'](button), 'toggle', initialButton.tagName === 'INPUT');
        }
      }
    })
    .on(EVENT_FOCUS_BLUR_DATA_API, SELECTOR_DATA_TOGGLE_CARROT, event => {
      const button = $__default['default'](event.target).closest(SELECTOR_BUTTON)[0];
      $__default['default'](button).toggleClass(CLASS_NAME_FOCUS, /^focus(in)?$/.test(event.type));
    });

  $__default['default'](window).on(EVENT_LOAD_DATA_API$2, () => {
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
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $__default['default'].fn[NAME$9] = Button._jQueryInterface;
  $__default['default'].fn[NAME$9].Constructor = Button;
  $__default['default'].fn[NAME$9].noConflict = () => {
    $__default['default'].fn[NAME$9] = JQUERY_NO_CONFLICT$9;
    return Button._jQueryInterface
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.6.0): carousel.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME$8 = 'carousel';
  const VERSION$8 = '4.6.0';
  const DATA_KEY$8 = 'bs.carousel';
  const EVENT_KEY$8 = `.${DATA_KEY$8}`;
  const DATA_API_KEY$5 = '.data-api';
  const JQUERY_NO_CONFLICT$8 = $__default['default'].fn[NAME$8];
  const ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key
  const ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key
  const TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch
  const SWIPE_THRESHOLD = 40;

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

  const CLASS_NAME_CAROUSEL = 'carousel';
  const CLASS_NAME_ACTIVE$2 = 'active';
  const CLASS_NAME_SLIDE = 'slide';
  const CLASS_NAME_RIGHT = 'carousel-item-right';
  const CLASS_NAME_LEFT = 'carousel-item-left';
  const CLASS_NAME_NEXT = 'carousel-item-next';
  const CLASS_NAME_PREV = 'carousel-item-prev';
  const CLASS_NAME_POINTER_EVENT = 'pointer-event';

  const SELECTOR_ACTIVE$1 = '.active';
  const SELECTOR_ACTIVE_ITEM = '.active.carousel-item';
  const SELECTOR_ITEM = '.carousel-item';
  const SELECTOR_ITEM_IMG = '.carousel-item img';
  const SELECTOR_NEXT_PREV = '.carousel-item-next, .carousel-item-prev';
  const SELECTOR_INDICATORS = '.carousel-indicators';
  const SELECTOR_DATA_SLIDE = '[data-slide], [data-slide-to]';
  const SELECTOR_DATA_RIDE = '[data-ride="carousel"]';

  const PointerType = {
    TOUCH: 'touch',
    PEN: 'pen'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
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
      const $element = $__default['default'](this._element);
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
        $__default['default'](this._element).one(EVENT_SLID, () => this.to(index));
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
      $__default['default'](this._element).off(EVENT_KEY$8);
      $__default['default'].removeData(this._element, DATA_KEY$8);

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
        $__default['default'](this._element).on(EVENT_KEYDOWN, event => this._keydown(event));
      }

      if (this._config.pause === 'hover') {
        $__default['default'](this._element)
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
        if (event.originalEvent.touches && event.originalEvent.touches.length > 1) {
          this.touchDeltaX = 0;
        } else {
          this.touchDeltaX = event.originalEvent.touches[0].clientX - this.touchStartX;
        }
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

      $__default['default'](this._element.querySelectorAll(SELECTOR_ITEM_IMG))
        .on(EVENT_DRAG_START, e => e.preventDefault());

      if (this._pointerEvent) {
        $__default['default'](this._element).on(EVENT_POINTERDOWN, event => start(event));
        $__default['default'](this._element).on(EVENT_POINTERUP, event => end(event));

        this._element.classList.add(CLASS_NAME_POINTER_EVENT);
      } else {
        $__default['default'](this._element).on(EVENT_TOUCHSTART, event => start(event));
        $__default['default'](this._element).on(EVENT_TOUCHMOVE, event => move(event));
        $__default['default'](this._element).on(EVENT_TOUCHEND, event => end(event));
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
      const slideEvent = $__default['default'].Event(EVENT_SLIDE, {
        relatedTarget,
        direction: eventDirectionName,
        from: fromIndex,
        to: targetIndex
      });

      $__default['default'](this._element).trigger(slideEvent);

      return slideEvent
    }

    _setActiveIndicatorElement(element) {
      if (this._indicatorsElement) {
        const indicators = [].slice.call(this._indicatorsElement.querySelectorAll(SELECTOR_ACTIVE$1));
        $__default['default'](indicators).removeClass(CLASS_NAME_ACTIVE$2);

        const nextIndicator = this._indicatorsElement.children[
          this._getItemIndex(element)
        ];

        if (nextIndicator) {
          $__default['default'](nextIndicator).addClass(CLASS_NAME_ACTIVE$2);
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

      if (nextElement && $__default['default'](nextElement).hasClass(CLASS_NAME_ACTIVE$2)) {
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

      const slidEvent = $__default['default'].Event(EVENT_SLID, {
        relatedTarget: nextElement,
        direction: eventDirectionName,
        from: activeElementIndex,
        to: nextElementIndex
      });

      if ($__default['default'](this._element).hasClass(CLASS_NAME_SLIDE)) {
        $__default['default'](nextElement).addClass(orderClassName);

        Util.reflow(nextElement);

        $__default['default'](activeElement).addClass(directionalClassName);
        $__default['default'](nextElement).addClass(directionalClassName);

        const transitionDuration = Util.getTransitionDurationFromElement(activeElement);

        $__default['default'](activeElement)
          .one(Util.TRANSITION_END, () => {
            $__default['default'](nextElement)
              .removeClass(`${directionalClassName} ${orderClassName}`)
              .addClass(CLASS_NAME_ACTIVE$2);

            $__default['default'](activeElement).removeClass(`${CLASS_NAME_ACTIVE$2} ${orderClassName} ${directionalClassName}`);

            this._isSliding = false;

            setTimeout(() => $__default['default'](this._element).trigger(slidEvent), 0);
          })
          .emulateTransitionEnd(transitionDuration);
      } else {
        $__default['default'](activeElement).removeClass(CLASS_NAME_ACTIVE$2);
        $__default['default'](nextElement).addClass(CLASS_NAME_ACTIVE$2);

        this._isSliding = false;
        $__default['default'](this._element).trigger(slidEvent);
      }

      if (isCycling) {
        this.cycle();
      }
    }

    // Static

    static _jQueryInterface(config) {
      return this.each(function () {
        let data = $__default['default'](this).data(DATA_KEY$8);
        let _config = {
          ...Default$7,
          ...$__default['default'](this).data()
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
          $__default['default'](this).data(DATA_KEY$8, data);
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

      const target = $__default['default'](selector)[0];

      if (!target || !$__default['default'](target).hasClass(CLASS_NAME_CAROUSEL)) {
        return
      }

      const config = {
        ...$__default['default'](target).data(),
        ...$__default['default'](this).data()
      };
      const slideIndex = this.getAttribute('data-slide-to');

      if (slideIndex) {
        config.interval = false;
      }

      Carousel._jQueryInterface.call($__default['default'](target), config);

      if (slideIndex) {
        $__default['default'](target).data(DATA_KEY$8).to(slideIndex);
      }

      event.preventDefault();
    }
  }

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $__default['default'](document).on(EVENT_CLICK_DATA_API$4, SELECTOR_DATA_SLIDE, Carousel._dataApiClickHandler);

  $__default['default'](window).on(EVENT_LOAD_DATA_API$1, () => {
    const carousels = [].slice.call(document.querySelectorAll(SELECTOR_DATA_RIDE));
    for (let i = 0, len = carousels.length; i < len; i++) {
      const $carousel = $__default['default'](carousels[i]);
      Carousel._jQueryInterface.call($carousel, $carousel.data());
    }
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $__default['default'].fn[NAME$8] = Carousel._jQueryInterface;
  $__default['default'].fn[NAME$8].Constructor = Carousel;
  $__default['default'].fn[NAME$8].noConflict = () => {
    $__default['default'].fn[NAME$8] = JQUERY_NO_CONFLICT$8;
    return Carousel._jQueryInterface
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.6.0): collapse.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME$7 = 'collapse';
  const VERSION$7 = '4.6.0';
  const DATA_KEY$7 = 'bs.collapse';
  const EVENT_KEY$7 = `.${DATA_KEY$7}`;
  const DATA_API_KEY$4 = '.data-api';
  const JQUERY_NO_CONFLICT$7 = $__default['default'].fn[NAME$7];

  const Default$6 = {
    toggle: true,
    parent: ''
  };

  const DefaultType$6 = {
    toggle: 'boolean',
    parent: '(string|element)'
  };

  const EVENT_SHOW$4 = `show${EVENT_KEY$7}`;
  const EVENT_SHOWN$4 = `shown${EVENT_KEY$7}`;
  const EVENT_HIDE$4 = `hide${EVENT_KEY$7}`;
  const EVENT_HIDDEN$4 = `hidden${EVENT_KEY$7}`;
  const EVENT_CLICK_DATA_API$3 = `click${EVENT_KEY$7}${DATA_API_KEY$4}`;

  const CLASS_NAME_SHOW$6 = 'show';
  const CLASS_NAME_COLLAPSE = 'collapse';
  const CLASS_NAME_COLLAPSING = 'collapsing';
  const CLASS_NAME_COLLAPSED = 'collapsed';

  const DIMENSION_WIDTH = 'width';
  const DIMENSION_HEIGHT = 'height';

  const SELECTOR_ACTIVES = '.show, .collapsing';
  const SELECTOR_DATA_TOGGLE$3 = '[data-toggle="collapse"]';

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
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
      if ($__default['default'](this._element).hasClass(CLASS_NAME_SHOW$6)) {
        this.hide();
      } else {
        this.show();
      }
    }

    show() {
      if (this._isTransitioning ||
        $__default['default'](this._element).hasClass(CLASS_NAME_SHOW$6)) {
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
        activesData = $__default['default'](actives).not(this._selector).data(DATA_KEY$7);
        if (activesData && activesData._isTransitioning) {
          return
        }
      }

      const startEvent = $__default['default'].Event(EVENT_SHOW$4);
      $__default['default'](this._element).trigger(startEvent);
      if (startEvent.isDefaultPrevented()) {
        return
      }

      if (actives) {
        Collapse._jQueryInterface.call($__default['default'](actives).not(this._selector), 'hide');
        if (!activesData) {
          $__default['default'](actives).data(DATA_KEY$7, null);
        }
      }

      const dimension = this._getDimension();

      $__default['default'](this._element)
        .removeClass(CLASS_NAME_COLLAPSE)
        .addClass(CLASS_NAME_COLLAPSING);

      this._element.style[dimension] = 0;

      if (this._triggerArray.length) {
        $__default['default'](this._triggerArray)
          .removeClass(CLASS_NAME_COLLAPSED)
          .attr('aria-expanded', true);
      }

      this.setTransitioning(true);

      const complete = () => {
        $__default['default'](this._element)
          .removeClass(CLASS_NAME_COLLAPSING)
          .addClass(`${CLASS_NAME_COLLAPSE} ${CLASS_NAME_SHOW$6}`);

        this._element.style[dimension] = '';

        this.setTransitioning(false);

        $__default['default'](this._element).trigger(EVENT_SHOWN$4);
      };

      const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      const scrollSize = `scroll${capitalizedDimension}`;
      const transitionDuration = Util.getTransitionDurationFromElement(this._element);

      $__default['default'](this._element)
        .one(Util.TRANSITION_END, complete)
        .emulateTransitionEnd(transitionDuration);

      this._element.style[dimension] = `${this._element[scrollSize]}px`;
    }

    hide() {
      if (this._isTransitioning ||
        !$__default['default'](this._element).hasClass(CLASS_NAME_SHOW$6)) {
        return
      }

      const startEvent = $__default['default'].Event(EVENT_HIDE$4);
      $__default['default'](this._element).trigger(startEvent);
      if (startEvent.isDefaultPrevented()) {
        return
      }

      const dimension = this._getDimension();

      this._element.style[dimension] = `${this._element.getBoundingClientRect()[dimension]}px`;

      Util.reflow(this._element);

      $__default['default'](this._element)
        .addClass(CLASS_NAME_COLLAPSING)
        .removeClass(`${CLASS_NAME_COLLAPSE} ${CLASS_NAME_SHOW$6}`);

      const triggerArrayLength = this._triggerArray.length;
      if (triggerArrayLength > 0) {
        for (let i = 0; i < triggerArrayLength; i++) {
          const trigger = this._triggerArray[i];
          const selector = Util.getSelectorFromElement(trigger);

          if (selector !== null) {
            const $elem = $__default['default']([].slice.call(document.querySelectorAll(selector)));
            if (!$elem.hasClass(CLASS_NAME_SHOW$6)) {
              $__default['default'](trigger).addClass(CLASS_NAME_COLLAPSED)
                .attr('aria-expanded', false);
            }
          }
        }
      }

      this.setTransitioning(true);

      const complete = () => {
        this.setTransitioning(false);
        $__default['default'](this._element)
          .removeClass(CLASS_NAME_COLLAPSING)
          .addClass(CLASS_NAME_COLLAPSE)
          .trigger(EVENT_HIDDEN$4);
      };

      this._element.style[dimension] = '';
      const transitionDuration = Util.getTransitionDurationFromElement(this._element);

      $__default['default'](this._element)
        .one(Util.TRANSITION_END, complete)
        .emulateTransitionEnd(transitionDuration);
    }

    setTransitioning(isTransitioning) {
      this._isTransitioning = isTransitioning;
    }

    dispose() {
      $__default['default'].removeData(this._element, DATA_KEY$7);

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
      const hasWidth = $__default['default'](this._element).hasClass(DIMENSION_WIDTH);
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

      $__default['default'](children).each((i, element) => {
        this._addAriaAndCollapsedClass(
          Collapse._getTargetFromElement(element),
          [element]
        );
      });

      return parent
    }

    _addAriaAndCollapsedClass(element, triggerArray) {
      const isOpen = $__default['default'](element).hasClass(CLASS_NAME_SHOW$6);

      if (triggerArray.length) {
        $__default['default'](triggerArray)
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
        const $element = $__default['default'](this);
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
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $__default['default'](document).on(EVENT_CLICK_DATA_API$3, SELECTOR_DATA_TOGGLE$3, function (event) {
    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
    if (event.currentTarget.tagName === 'A') {
      event.preventDefault();
    }

    const $trigger = $__default['default'](this);
    const selector = Util.getSelectorFromElement(this);
    const selectors = [].slice.call(document.querySelectorAll(selector));

    $__default['default'](selectors).each(function () {
      const $target = $__default['default'](this);
      const data = $target.data(DATA_KEY$7);
      const config = data ? 'toggle' : $trigger.data();
      Collapse._jQueryInterface.call($target, config);
    });
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $__default['default'].fn[NAME$7] = Collapse._jQueryInterface;
  $__default['default'].fn[NAME$7].Constructor = Collapse;
  $__default['default'].fn[NAME$7].noConflict = () => {
    $__default['default'].fn[NAME$7] = JQUERY_NO_CONFLICT$7;
    return Collapse._jQueryInterface
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.6.0): dropdown.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME$6 = 'dropdown';
  const VERSION$6 = '4.6.0';
  const DATA_KEY$6 = 'bs.dropdown';
  const EVENT_KEY$6 = `.${DATA_KEY$6}`;
  const DATA_API_KEY$3 = '.data-api';
  const JQUERY_NO_CONFLICT$6 = $__default['default'].fn[NAME$6];
  const ESCAPE_KEYCODE$1 = 27; // KeyboardEvent.which value for Escape (Esc) key
  const SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key
  const TAB_KEYCODE = 9; // KeyboardEvent.which value for tab key
  const ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key
  const ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key
  const RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)
  const REGEXP_KEYDOWN = new RegExp(`${ARROW_UP_KEYCODE}|${ARROW_DOWN_KEYCODE}|${ESCAPE_KEYCODE$1}`);

  const EVENT_HIDE$3 = `hide${EVENT_KEY$6}`;
  const EVENT_HIDDEN$3 = `hidden${EVENT_KEY$6}`;
  const EVENT_SHOW$3 = `show${EVENT_KEY$6}`;
  const EVENT_SHOWN$3 = `shown${EVENT_KEY$6}`;
  const EVENT_CLICK = `click${EVENT_KEY$6}`;
  const EVENT_CLICK_DATA_API$2 = `click${EVENT_KEY$6}${DATA_API_KEY$3}`;
  const EVENT_KEYDOWN_DATA_API = `keydown${EVENT_KEY$6}${DATA_API_KEY$3}`;
  const EVENT_KEYUP_DATA_API = `keyup${EVENT_KEY$6}${DATA_API_KEY$3}`;

  const CLASS_NAME_DISABLED$1 = 'disabled';
  const CLASS_NAME_SHOW$5 = 'show';
  const CLASS_NAME_DROPUP = 'dropup';
  const CLASS_NAME_DROPRIGHT = 'dropright';
  const CLASS_NAME_DROPLEFT = 'dropleft';
  const CLASS_NAME_MENURIGHT = 'dropdown-menu-right';
  const CLASS_NAME_POSITION_STATIC = 'position-static';

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
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
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
      if (this._element.disabled || $__default['default'](this._element).hasClass(CLASS_NAME_DISABLED$1)) {
        return
      }

      const isActive = $__default['default'](this._menu).hasClass(CLASS_NAME_SHOW$5);

      Dropdown._clearMenus();

      if (isActive) {
        return
      }

      this.show(true);
    }

    show(usePopper = false) {
      if (this._element.disabled || $__default['default'](this._element).hasClass(CLASS_NAME_DISABLED$1) || $__default['default'](this._menu).hasClass(CLASS_NAME_SHOW$5)) {
        return
      }

      const relatedTarget = {
        relatedTarget: this._element
      };
      const showEvent = $__default['default'].Event(EVENT_SHOW$3, relatedTarget);
      const parent = Dropdown._getParentFromElement(this._element);

      $__default['default'](parent).trigger(showEvent);

      if (showEvent.isDefaultPrevented()) {
        return
      }

      // Totally disable Popper for Dropdowns in Navbar
      if (!this._inNavbar && usePopper) {
        /**
         * Check for Popper dependency
         * Popper - https://popper.js.org
         */
        if (typeof Popper__default['default'] === 'undefined') {
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
          $__default['default'](parent).addClass(CLASS_NAME_POSITION_STATIC);
        }

        this._popper = new Popper__default['default'](referenceElement, this._menu, this._getPopperConfig());
      }

      // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
      if ('ontouchstart' in document.documentElement &&
          $__default['default'](parent).closest(SELECTOR_NAVBAR_NAV).length === 0) {
        $__default['default'](document.body).children().on('mouseover', null, $__default['default'].noop);
      }

      this._element.focus();
      this._element.setAttribute('aria-expanded', true);

      $__default['default'](this._menu).toggleClass(CLASS_NAME_SHOW$5);
      $__default['default'](parent)
        .toggleClass(CLASS_NAME_SHOW$5)
        .trigger($__default['default'].Event(EVENT_SHOWN$3, relatedTarget));
    }

    hide() {
      if (this._element.disabled || $__default['default'](this._element).hasClass(CLASS_NAME_DISABLED$1) || !$__default['default'](this._menu).hasClass(CLASS_NAME_SHOW$5)) {
        return
      }

      const relatedTarget = {
        relatedTarget: this._element
      };
      const hideEvent = $__default['default'].Event(EVENT_HIDE$3, relatedTarget);
      const parent = Dropdown._getParentFromElement(this._element);

      $__default['default'](parent).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return
      }

      if (this._popper) {
        this._popper.destroy();
      }

      $__default['default'](this._menu).toggleClass(CLASS_NAME_SHOW$5);
      $__default['default'](parent)
        .toggleClass(CLASS_NAME_SHOW$5)
        .trigger($__default['default'].Event(EVENT_HIDDEN$3, relatedTarget));
    }

    dispose() {
      $__default['default'].removeData(this._element, DATA_KEY$6);
      $__default['default'](this._element).off(EVENT_KEY$6);
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
      $__default['default'](this._element).on(EVENT_CLICK, event => {
        event.preventDefault();
        event.stopPropagation();
        this.toggle();
      });
    }

    _getConfig(config) {
      config = {
        ...this.constructor.Default,
        ...$__default['default'](this._element).data(),
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
      const $parentDropdown = $__default['default'](this._element.parentNode);
      let placement = PLACEMENT_BOTTOM;

      // Handle dropup
      if ($parentDropdown.hasClass(CLASS_NAME_DROPUP)) {
        placement = $__default['default'](this._menu).hasClass(CLASS_NAME_MENURIGHT) ?
          PLACEMENT_TOPEND :
          PLACEMENT_TOP;
      } else if ($parentDropdown.hasClass(CLASS_NAME_DROPRIGHT)) {
        placement = PLACEMENT_RIGHT;
      } else if ($parentDropdown.hasClass(CLASS_NAME_DROPLEFT)) {
        placement = PLACEMENT_LEFT;
      } else if ($__default['default'](this._menu).hasClass(CLASS_NAME_MENURIGHT)) {
        placement = PLACEMENT_BOTTOMEND;
      }

      return placement
    }

    _detectNavbar() {
      return $__default['default'](this._element).closest('.navbar').length > 0
    }

    _getOffset() {
      const offset = {};

      if (typeof this._config.offset === 'function') {
        offset.fn = data => {
          data.offsets = {
            ...data.offsets,
            ...(this._config.offset(data.offsets, this._element) || {})
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
        let data = $__default['default'](this).data(DATA_KEY$6);
        const _config = typeof config === 'object' ? config : null;

        if (!data) {
          data = new Dropdown(this, _config);
          $__default['default'](this).data(DATA_KEY$6, data);
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
        const context = $__default['default'](toggles[i]).data(DATA_KEY$6);
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
        if (!$__default['default'](parent).hasClass(CLASS_NAME_SHOW$5)) {
          continue
        }

        if (event && (event.type === 'click' &&
            /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) &&
            $__default['default'].contains(parent, event.target)) {
          continue
        }

        const hideEvent = $__default['default'].Event(EVENT_HIDE$3, relatedTarget);
        $__default['default'](parent).trigger(hideEvent);
        if (hideEvent.isDefaultPrevented()) {
          continue
        }

        // If this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for iOS support
        if ('ontouchstart' in document.documentElement) {
          $__default['default'](document.body).children().off('mouseover', null, $__default['default'].noop);
        }

        toggles[i].setAttribute('aria-expanded', 'false');

        if (context._popper) {
          context._popper.destroy();
        }

        $__default['default'](dropdownMenu).removeClass(CLASS_NAME_SHOW$5);
        $__default['default'](parent)
          .removeClass(CLASS_NAME_SHOW$5)
          .trigger($__default['default'].Event(EVENT_HIDDEN$3, relatedTarget));
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
          $__default['default'](event.target).closest(SELECTOR_MENU).length) : !REGEXP_KEYDOWN.test(event.which)) {
        return
      }

      if (this.disabled || $__default['default'](this).hasClass(CLASS_NAME_DISABLED$1)) {
        return
      }

      const parent = Dropdown._getParentFromElement(this);
      const isActive = $__default['default'](parent).hasClass(CLASS_NAME_SHOW$5);

      if (!isActive && event.which === ESCAPE_KEYCODE$1) {
        return
      }

      event.preventDefault();
      event.stopPropagation();

      if (!isActive || (event.which === ESCAPE_KEYCODE$1 || event.which === SPACE_KEYCODE)) {
        if (event.which === ESCAPE_KEYCODE$1) {
          $__default['default'](parent.querySelector(SELECTOR_DATA_TOGGLE$2)).trigger('focus');
        }

        $__default['default'](this).trigger('click');
        return
      }

      const items = [].slice.call(parent.querySelectorAll(SELECTOR_VISIBLE_ITEMS))
        .filter(item => $__default['default'](item).is(':visible'));

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
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $__default['default'](document)
    .on(EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE$2, Dropdown._dataApiKeydownHandler)
    .on(EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown._dataApiKeydownHandler)
    .on(`${EVENT_CLICK_DATA_API$2} ${EVENT_KEYUP_DATA_API}`, Dropdown._clearMenus)
    .on(EVENT_CLICK_DATA_API$2, SELECTOR_DATA_TOGGLE$2, function (event) {
      event.preventDefault();
      event.stopPropagation();
      Dropdown._jQueryInterface.call($__default['default'](this), 'toggle');
    })
    .on(EVENT_CLICK_DATA_API$2, SELECTOR_FORM_CHILD, e => {
      e.stopPropagation();
    });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $__default['default'].fn[NAME$6] = Dropdown._jQueryInterface;
  $__default['default'].fn[NAME$6].Constructor = Dropdown;
  $__default['default'].fn[NAME$6].noConflict = () => {
    $__default['default'].fn[NAME$6] = JQUERY_NO_CONFLICT$6;
    return Dropdown._jQueryInterface
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.6.0): modal.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME$5 = 'modal';
  const VERSION$5 = '4.6.0';
  const DATA_KEY$5 = 'bs.modal';
  const EVENT_KEY$5 = `.${DATA_KEY$5}`;
  const DATA_API_KEY$2 = '.data-api';
  const JQUERY_NO_CONFLICT$5 = $__default['default'].fn[NAME$5];
  const ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

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

  const CLASS_NAME_SCROLLABLE = 'modal-dialog-scrollable';
  const CLASS_NAME_SCROLLBAR_MEASURER = 'modal-scrollbar-measure';
  const CLASS_NAME_BACKDROP = 'modal-backdrop';
  const CLASS_NAME_OPEN = 'modal-open';
  const CLASS_NAME_FADE$4 = 'fade';
  const CLASS_NAME_SHOW$4 = 'show';
  const CLASS_NAME_STATIC = 'modal-static';

  const SELECTOR_DIALOG = '.modal-dialog';
  const SELECTOR_MODAL_BODY = '.modal-body';
  const SELECTOR_DATA_TOGGLE$1 = '[data-toggle="modal"]';
  const SELECTOR_DATA_DISMISS$1 = '[data-dismiss="modal"]';
  const SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
  const SELECTOR_STICKY_CONTENT = '.sticky-top';

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
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

      if ($__default['default'](this._element).hasClass(CLASS_NAME_FADE$4)) {
        this._isTransitioning = true;
      }

      const showEvent = $__default['default'].Event(EVENT_SHOW$2, {
        relatedTarget
      });

      $__default['default'](this._element).trigger(showEvent);

      if (this._isShown || showEvent.isDefaultPrevented()) {
        return
      }

      this._isShown = true;

      this._checkScrollbar();
      this._setScrollbar();

      this._adjustDialog();

      this._setEscapeEvent();
      this._setResizeEvent();

      $__default['default'](this._element).on(
        EVENT_CLICK_DISMISS$1,
        SELECTOR_DATA_DISMISS$1,
        event => this.hide(event)
      );

      $__default['default'](this._dialog).on(EVENT_MOUSEDOWN_DISMISS, () => {
        $__default['default'](this._element).one(EVENT_MOUSEUP_DISMISS, event => {
          if ($__default['default'](event.target).is(this._element)) {
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

      const hideEvent = $__default['default'].Event(EVENT_HIDE$2);

      $__default['default'](this._element).trigger(hideEvent);

      if (!this._isShown || hideEvent.isDefaultPrevented()) {
        return
      }

      this._isShown = false;
      const transition = $__default['default'](this._element).hasClass(CLASS_NAME_FADE$4);

      if (transition) {
        this._isTransitioning = true;
      }

      this._setEscapeEvent();
      this._setResizeEvent();

      $__default['default'](document).off(EVENT_FOCUSIN);

      $__default['default'](this._element).removeClass(CLASS_NAME_SHOW$4);

      $__default['default'](this._element).off(EVENT_CLICK_DISMISS$1);
      $__default['default'](this._dialog).off(EVENT_MOUSEDOWN_DISMISS);

      if (transition) {
        const transitionDuration = Util.getTransitionDurationFromElement(this._element);

        $__default['default'](this._element)
          .one(Util.TRANSITION_END, event => this._hideModal(event))
          .emulateTransitionEnd(transitionDuration);
      } else {
        this._hideModal();
      }
    }

    dispose() {
      [window, this._element, this._dialog]
        .forEach(htmlElement => $__default['default'](htmlElement).off(EVENT_KEY$5));

      /**
       * `document` has 2 events `EVENT_FOCUSIN` and `EVENT_CLICK_DATA_API`
       * Do not move `document` in `htmlElements` array
       * It will remove `EVENT_CLICK_DATA_API` event that should remain
       */
      $__default['default'](document).off(EVENT_FOCUSIN);

      $__default['default'].removeData(this._element, DATA_KEY$5);

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
      const hideEventPrevented = $__default['default'].Event(EVENT_HIDE_PREVENTED);

      $__default['default'](this._element).trigger(hideEventPrevented);
      if (hideEventPrevented.isDefaultPrevented()) {
        return
      }

      const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

      if (!isModalOverflowing) {
        this._element.style.overflowY = 'hidden';
      }

      this._element.classList.add(CLASS_NAME_STATIC);

      const modalTransitionDuration = Util.getTransitionDurationFromElement(this._dialog);
      $__default['default'](this._element).off(Util.TRANSITION_END);

      $__default['default'](this._element).one(Util.TRANSITION_END, () => {
        this._element.classList.remove(CLASS_NAME_STATIC);
        if (!isModalOverflowing) {
          $__default['default'](this._element).one(Util.TRANSITION_END, () => {
            this._element.style.overflowY = '';
          })
            .emulateTransitionEnd(this._element, modalTransitionDuration);
        }
      })
        .emulateTransitionEnd(modalTransitionDuration);
      this._element.focus();
    }

    _showElement(relatedTarget) {
      const transition = $__default['default'](this._element).hasClass(CLASS_NAME_FADE$4);
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

      if ($__default['default'](this._dialog).hasClass(CLASS_NAME_SCROLLABLE) && modalBody) {
        modalBody.scrollTop = 0;
      } else {
        this._element.scrollTop = 0;
      }

      if (transition) {
        Util.reflow(this._element);
      }

      $__default['default'](this._element).addClass(CLASS_NAME_SHOW$4);

      if (this._config.focus) {
        this._enforceFocus();
      }

      const shownEvent = $__default['default'].Event(EVENT_SHOWN$2, {
        relatedTarget
      });

      const transitionComplete = () => {
        if (this._config.focus) {
          this._element.focus();
        }

        this._isTransitioning = false;
        $__default['default'](this._element).trigger(shownEvent);
      };

      if (transition) {
        const transitionDuration = Util.getTransitionDurationFromElement(this._dialog);

        $__default['default'](this._dialog)
          .one(Util.TRANSITION_END, transitionComplete)
          .emulateTransitionEnd(transitionDuration);
      } else {
        transitionComplete();
      }
    }

    _enforceFocus() {
      $__default['default'](document)
        .off(EVENT_FOCUSIN) // Guard against infinite focus loop
        .on(EVENT_FOCUSIN, event => {
          if (document !== event.target &&
              this._element !== event.target &&
              $__default['default'](this._element).has(event.target).length === 0) {
            this._element.focus();
          }
        });
    }

    _setEscapeEvent() {
      if (this._isShown) {
        $__default['default'](this._element).on(EVENT_KEYDOWN_DISMISS, event => {
          if (this._config.keyboard && event.which === ESCAPE_KEYCODE) {
            event.preventDefault();
            this.hide();
          } else if (!this._config.keyboard && event.which === ESCAPE_KEYCODE) {
            this._triggerBackdropTransition();
          }
        });
      } else if (!this._isShown) {
        $__default['default'](this._element).off(EVENT_KEYDOWN_DISMISS);
      }
    }

    _setResizeEvent() {
      if (this._isShown) {
        $__default['default'](window).on(EVENT_RESIZE, event => this.handleUpdate(event));
      } else {
        $__default['default'](window).off(EVENT_RESIZE);
      }
    }

    _hideModal() {
      this._element.style.display = 'none';
      this._element.setAttribute('aria-hidden', true);
      this._element.removeAttribute('aria-modal');
      this._element.removeAttribute('role');
      this._isTransitioning = false;
      this._showBackdrop(() => {
        $__default['default'](document.body).removeClass(CLASS_NAME_OPEN);
        this._resetAdjustments();
        this._resetScrollbar();
        $__default['default'](this._element).trigger(EVENT_HIDDEN$2);
      });
    }

    _removeBackdrop() {
      if (this._backdrop) {
        $__default['default'](this._backdrop).remove();
        this._backdrop = null;
      }
    }

    _showBackdrop(callback) {
      const animate = $__default['default'](this._element).hasClass(CLASS_NAME_FADE$4) ?
        CLASS_NAME_FADE$4 : '';

      if (this._isShown && this._config.backdrop) {
        this._backdrop = document.createElement('div');
        this._backdrop.className = CLASS_NAME_BACKDROP;

        if (animate) {
          this._backdrop.classList.add(animate);
        }

        $__default['default'](this._backdrop).appendTo(document.body);

        $__default['default'](this._element).on(EVENT_CLICK_DISMISS$1, event => {
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

        $__default['default'](this._backdrop).addClass(CLASS_NAME_SHOW$4);

        if (!callback) {
          return
        }

        if (!animate) {
          callback();
          return
        }

        const backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);

        $__default['default'](this._backdrop)
          .one(Util.TRANSITION_END, callback)
          .emulateTransitionEnd(backdropTransitionDuration);
      } else if (!this._isShown && this._backdrop) {
        $__default['default'](this._backdrop).removeClass(CLASS_NAME_SHOW$4);

        const callbackRemove = () => {
          this._removeBackdrop();
          if (callback) {
            callback();
          }
        };

        if ($__default['default'](this._element).hasClass(CLASS_NAME_FADE$4)) {
          const backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);

          $__default['default'](this._backdrop)
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
        $__default['default'](fixedContent).each((index, element) => {
          const actualPadding = element.style.paddingRight;
          const calculatedPadding = $__default['default'](element).css('padding-right');
          $__default['default'](element)
            .data('padding-right', actualPadding)
            .css('padding-right', `${parseFloat(calculatedPadding) + this._scrollbarWidth}px`);
        });

        // Adjust sticky content margin
        $__default['default'](stickyContent).each((index, element) => {
          const actualMargin = element.style.marginRight;
          const calculatedMargin = $__default['default'](element).css('margin-right');
          $__default['default'](element)
            .data('margin-right', actualMargin)
            .css('margin-right', `${parseFloat(calculatedMargin) - this._scrollbarWidth}px`);
        });

        // Adjust body padding
        const actualPadding = document.body.style.paddingRight;
        const calculatedPadding = $__default['default'](document.body).css('padding-right');
        $__default['default'](document.body)
          .data('padding-right', actualPadding)
          .css('padding-right', `${parseFloat(calculatedPadding) + this._scrollbarWidth}px`);
      }

      $__default['default'](document.body).addClass(CLASS_NAME_OPEN);
    }

    _resetScrollbar() {
      // Restore fixed content padding
      const fixedContent = [].slice.call(document.querySelectorAll(SELECTOR_FIXED_CONTENT));
      $__default['default'](fixedContent).each((index, element) => {
        const padding = $__default['default'](element).data('padding-right');
        $__default['default'](element).removeData('padding-right');
        element.style.paddingRight = padding ? padding : '';
      });

      // Restore sticky content
      const elements = [].slice.call(document.querySelectorAll(`${SELECTOR_STICKY_CONTENT}`));
      $__default['default'](elements).each((index, element) => {
        const margin = $__default['default'](element).data('margin-right');
        if (typeof margin !== 'undefined') {
          $__default['default'](element).css('margin-right', margin).removeData('margin-right');
        }
      });

      // Restore body padding
      const padding = $__default['default'](document.body).data('padding-right');
      $__default['default'](document.body).removeData('padding-right');
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
        let data = $__default['default'](this).data(DATA_KEY$5);
        const _config = {
          ...Default$4,
          ...$__default['default'](this).data(),
          ...(typeof config === 'object' && config ? config : {})
        };

        if (!data) {
          data = new Modal(this, _config);
          $__default['default'](this).data(DATA_KEY$5, data);
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
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $__default['default'](document).on(EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE$1, function (event) {
    let target;
    const selector = Util.getSelectorFromElement(this);

    if (selector) {
      target = document.querySelector(selector);
    }

    const config = $__default['default'](target).data(DATA_KEY$5) ?
      'toggle' : {
        ...$__default['default'](target).data(),
        ...$__default['default'](this).data()
      };

    if (this.tagName === 'A' || this.tagName === 'AREA') {
      event.preventDefault();
    }

    const $target = $__default['default'](target).one(EVENT_SHOW$2, showEvent => {
      if (showEvent.isDefaultPrevented()) {
        // Only register focus restorer if modal will actually get shown
        return
      }

      $target.one(EVENT_HIDDEN$2, () => {
        if ($__default['default'](this).is(':visible')) {
          this.focus();
        }
      });
    });

    Modal._jQueryInterface.call($__default['default'](target), config, this);
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $__default['default'].fn[NAME$5] = Modal._jQueryInterface;
  $__default['default'].fn[NAME$5].Constructor = Modal;
  $__default['default'].fn[NAME$5].noConflict = () => {
    $__default['default'].fn[NAME$5] = JQUERY_NO_CONFLICT$5;
    return Modal._jQueryInterface
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.6.0): tools/sanitizer.js
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
   * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
   */
  const SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/gi;

  /**
   * A pattern that matches safe data URLs. Only matches image, video and audio types.
   *
   * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
   */
  const DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;

  function allowedAttribute(attr, allowedAttributeList) {
    const attrName = attr.nodeName.toLowerCase();

    if (allowedAttributeList.indexOf(attrName) !== -1) {
      if (uriAttrs.indexOf(attrName) !== -1) {
        return Boolean(attr.nodeValue.match(SAFE_URL_PATTERN) || attr.nodeValue.match(DATA_URL_PATTERN))
      }

      return true
    }

    const regExp = allowedAttributeList.filter(attrRegex => attrRegex instanceof RegExp);

    // Check if a regular expression validates the attribute.
    for (let i = 0, len = regExp.length; i < len; i++) {
      if (attrName.match(regExp[i])) {
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
   * Bootstrap (v4.6.0): tooltip.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME$4 = 'tooltip';
  const VERSION$4 = '4.6.0';
  const DATA_KEY$4 = 'bs.tooltip';
  const EVENT_KEY$4 = `.${DATA_KEY$4}`;
  const JQUERY_NO_CONFLICT$4 = $__default['default'].fn[NAME$4];
  const CLASS_PREFIX$1 = 'bs-tooltip';
  const BSCLS_PREFIX_REGEX$1 = new RegExp(`(^|\\s)${CLASS_PREFIX$1}\\S+`, 'g');
  const DISALLOWED_ATTRIBUTES = ['sanitize', 'whiteList', 'sanitizeFn'];

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

  const HOVER_STATE_SHOW = 'show';
  const HOVER_STATE_OUT = 'out';

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

  const CLASS_NAME_FADE$3 = 'fade';
  const CLASS_NAME_SHOW$3 = 'show';

  const SELECTOR_TOOLTIP_INNER = '.tooltip-inner';
  const SELECTOR_ARROW = '.arrow';

  const TRIGGER_HOVER = 'hover';
  const TRIGGER_FOCUS = 'focus';
  const TRIGGER_CLICK = 'click';
  const TRIGGER_MANUAL = 'manual';

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  class Tooltip {
    constructor(element, config) {
      if (typeof Popper__default['default'] === 'undefined') {
        throw new TypeError('Bootstrap\'s tooltips require Popper (https://popper.js.org)')
      }

      // private
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
        let context = $__default['default'](event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(
            event.currentTarget,
            this._getDelegateConfig()
          );
          $__default['default'](event.currentTarget).data(dataKey, context);
        }

        context._activeTrigger.click = !context._activeTrigger.click;

        if (context._isWithActiveTrigger()) {
          context._enter(null, context);
        } else {
          context._leave(null, context);
        }
      } else {
        if ($__default['default'](this.getTipElement()).hasClass(CLASS_NAME_SHOW$3)) {
          this._leave(null, this);
          return
        }

        this._enter(null, this);
      }
    }

    dispose() {
      clearTimeout(this._timeout);

      $__default['default'].removeData(this.element, this.constructor.DATA_KEY);

      $__default['default'](this.element).off(this.constructor.EVENT_KEY);
      $__default['default'](this.element).closest('.modal').off('hide.bs.modal', this._hideModalHandler);

      if (this.tip) {
        $__default['default'](this.tip).remove();
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
      if ($__default['default'](this.element).css('display') === 'none') {
        throw new Error('Please use show on visible elements')
      }

      const showEvent = $__default['default'].Event(this.constructor.Event.SHOW);
      if (this.isWithContent() && this._isEnabled) {
        $__default['default'](this.element).trigger(showEvent);

        const shadowRoot = Util.findShadowRoot(this.element);
        const isInTheDom = $__default['default'].contains(
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
          $__default['default'](tip).addClass(CLASS_NAME_FADE$3);
        }

        const placement = typeof this.config.placement === 'function' ?
          this.config.placement.call(this, tip, this.element) :
          this.config.placement;

        const attachment = this._getAttachment(placement);
        this.addAttachmentClass(attachment);

        const container = this._getContainer();
        $__default['default'](tip).data(this.constructor.DATA_KEY, this);

        if (!$__default['default'].contains(this.element.ownerDocument.documentElement, this.tip)) {
          $__default['default'](tip).appendTo(container);
        }

        $__default['default'](this.element).trigger(this.constructor.Event.INSERTED);

        this._popper = new Popper__default['default'](this.element, tip, this._getPopperConfig(attachment));

        $__default['default'](tip).addClass(CLASS_NAME_SHOW$3);
        $__default['default'](tip).addClass(this.config.customClass);

        // If this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
        if ('ontouchstart' in document.documentElement) {
          $__default['default'](document.body).children().on('mouseover', null, $__default['default'].noop);
        }

        const complete = () => {
          if (this.config.animation) {
            this._fixTransition();
          }

          const prevHoverState = this._hoverState;
          this._hoverState = null;

          $__default['default'](this.element).trigger(this.constructor.Event.SHOWN);

          if (prevHoverState === HOVER_STATE_OUT) {
            this._leave(null, this);
          }
        };

        if ($__default['default'](this.tip).hasClass(CLASS_NAME_FADE$3)) {
          const transitionDuration = Util.getTransitionDurationFromElement(this.tip);

          $__default['default'](this.tip)
            .one(Util.TRANSITION_END, complete)
            .emulateTransitionEnd(transitionDuration);
        } else {
          complete();
        }
      }
    }

    hide(callback) {
      const tip = this.getTipElement();
      const hideEvent = $__default['default'].Event(this.constructor.Event.HIDE);
      const complete = () => {
        if (this._hoverState !== HOVER_STATE_SHOW && tip.parentNode) {
          tip.parentNode.removeChild(tip);
        }

        this._cleanTipClass();
        this.element.removeAttribute('aria-describedby');
        $__default['default'](this.element).trigger(this.constructor.Event.HIDDEN);
        if (this._popper !== null) {
          this._popper.destroy();
        }

        if (callback) {
          callback();
        }
      };

      $__default['default'](this.element).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return
      }

      $__default['default'](tip).removeClass(CLASS_NAME_SHOW$3);

      // If this is a touch-enabled device we remove the extra
      // empty mouseover listeners we added for iOS support
      if ('ontouchstart' in document.documentElement) {
        $__default['default'](document.body).children().off('mouseover', null, $__default['default'].noop);
      }

      this._activeTrigger[TRIGGER_CLICK] = false;
      this._activeTrigger[TRIGGER_FOCUS] = false;
      this._activeTrigger[TRIGGER_HOVER] = false;

      if ($__default['default'](this.tip).hasClass(CLASS_NAME_FADE$3)) {
        const transitionDuration = Util.getTransitionDurationFromElement(tip);

        $__default['default'](tip)
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
      $__default['default'](this.getTipElement()).addClass(`${CLASS_PREFIX$1}-${attachment}`);
    }

    getTipElement() {
      this.tip = this.tip || $__default['default'](this.config.template)[0];
      return this.tip
    }

    setContent() {
      const tip = this.getTipElement();
      this.setElementContent($__default['default'](tip.querySelectorAll(SELECTOR_TOOLTIP_INNER)), this.getTitle());
      $__default['default'](tip).removeClass(`${CLASS_NAME_FADE$3} ${CLASS_NAME_SHOW$3}`);
    }

    setElementContent($element, content) {
      if (typeof content === 'object' && (content.nodeType || content.jquery)) {
        // Content is a DOM node or a jQuery
        if (this.config.html) {
          if (!$__default['default'](content).parent().is($element)) {
            $element.empty().append(content);
          }
        } else {
          $element.text($__default['default'](content).text());
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
            ...(this.config.offset(data.offsets, this.element) || {})
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
        return $__default['default'](this.config.container)
      }

      return $__default['default'](document).find(this.config.container)
    }

    _getAttachment(placement) {
      return AttachmentMap[placement.toUpperCase()]
    }

    _setListeners() {
      const triggers = this.config.trigger.split(' ');

      triggers.forEach(trigger => {
        if (trigger === 'click') {
          $__default['default'](this.element).on(
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

          $__default['default'](this.element)
            .on(eventIn, this.config.selector, event => this._enter(event))
            .on(eventOut, this.config.selector, event => this._leave(event));
        }
      });

      this._hideModalHandler = () => {
        if (this.element) {
          this.hide();
        }
      };

      $__default['default'](this.element).closest('.modal').on('hide.bs.modal', this._hideModalHandler);

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
      context = context || $__default['default'](event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(
          event.currentTarget,
          this._getDelegateConfig()
        );
        $__default['default'](event.currentTarget).data(dataKey, context);
      }

      if (event) {
        context._activeTrigger[
          event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER
        ] = true;
      }

      if ($__default['default'](context.getTipElement()).hasClass(CLASS_NAME_SHOW$3) || context._hoverState === HOVER_STATE_SHOW) {
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
      context = context || $__default['default'](event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(
          event.currentTarget,
          this._getDelegateConfig()
        );
        $__default['default'](event.currentTarget).data(dataKey, context);
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
      const dataAttributes = $__default['default'](this.element).data();

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
      const $tip = $__default['default'](this.getTipElement());
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

      $__default['default'](tip).removeClass(CLASS_NAME_FADE$3);
      this.config.animation = false;
      this.hide();
      this.show();
      this.config.animation = initConfigAnimation;
    }

    // Static

    static _jQueryInterface(config) {
      return this.each(function () {
        const $element = $__default['default'](this);
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
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $__default['default'].fn[NAME$4] = Tooltip._jQueryInterface;
  $__default['default'].fn[NAME$4].Constructor = Tooltip;
  $__default['default'].fn[NAME$4].noConflict = () => {
    $__default['default'].fn[NAME$4] = JQUERY_NO_CONFLICT$4;
    return Tooltip._jQueryInterface
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.6.0): popover.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME$3 = 'popover';
  const VERSION$3 = '4.6.0';
  const DATA_KEY$3 = 'bs.popover';
  const EVENT_KEY$3 = `.${DATA_KEY$3}`;
  const JQUERY_NO_CONFLICT$3 = $__default['default'].fn[NAME$3];
  const CLASS_PREFIX = 'bs-popover';
  const BSCLS_PREFIX_REGEX = new RegExp(`(^|\\s)${CLASS_PREFIX}\\S+`, 'g');

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

  const CLASS_NAME_FADE$2 = 'fade';
  const CLASS_NAME_SHOW$2 = 'show';

  const SELECTOR_TITLE = '.popover-header';
  const SELECTOR_CONTENT = '.popover-body';

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
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
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
      $__default['default'](this.getTipElement()).addClass(`${CLASS_PREFIX}-${attachment}`);
    }

    getTipElement() {
      this.tip = this.tip || $__default['default'](this.config.template)[0];
      return this.tip
    }

    setContent() {
      const $tip = $__default['default'](this.getTipElement());

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
      const $tip = $__default['default'](this.getTipElement());
      const tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);
      if (tabClass !== null && tabClass.length > 0) {
        $tip.removeClass(tabClass.join(''));
      }
    }

    // Static

    static _jQueryInterface(config) {
      return this.each(function () {
        let data = $__default['default'](this).data(DATA_KEY$3);
        const _config = typeof config === 'object' ? config : null;

        if (!data && /dispose|hide/.test(config)) {
          return
        }

        if (!data) {
          data = new Popover(this, _config);
          $__default['default'](this).data(DATA_KEY$3, data);
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
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $__default['default'].fn[NAME$3] = Popover._jQueryInterface;
  $__default['default'].fn[NAME$3].Constructor = Popover;
  $__default['default'].fn[NAME$3].noConflict = () => {
    $__default['default'].fn[NAME$3] = JQUERY_NO_CONFLICT$3;
    return Popover._jQueryInterface
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.6.0): scrollspy.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME$2 = 'scrollspy';
  const VERSION$2 = '4.6.0';
  const DATA_KEY$2 = 'bs.scrollspy';
  const EVENT_KEY$2 = `.${DATA_KEY$2}`;
  const DATA_API_KEY$1 = '.data-api';
  const JQUERY_NO_CONFLICT$2 = $__default['default'].fn[NAME$2];

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

  const EVENT_ACTIVATE = `activate${EVENT_KEY$2}`;
  const EVENT_SCROLL = `scroll${EVENT_KEY$2}`;
  const EVENT_LOAD_DATA_API = `load${EVENT_KEY$2}${DATA_API_KEY$1}`;

  const CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item';
  const CLASS_NAME_ACTIVE$1 = 'active';

  const SELECTOR_DATA_SPY = '[data-spy="scroll"]';
  const SELECTOR_NAV_LIST_GROUP$1 = '.nav, .list-group';
  const SELECTOR_NAV_LINKS = '.nav-link';
  const SELECTOR_NAV_ITEMS = '.nav-item';
  const SELECTOR_LIST_ITEMS = '.list-group-item';
  const SELECTOR_DROPDOWN$1 = '.dropdown';
  const SELECTOR_DROPDOWN_ITEMS = '.dropdown-item';
  const SELECTOR_DROPDOWN_TOGGLE$1 = '.dropdown-toggle';

  const METHOD_OFFSET = 'offset';
  const METHOD_POSITION = 'position';

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
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

      $__default['default'](this._scrollElement).on(EVENT_SCROLL, event => this._process(event));

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
                $__default['default'](target)[offsetMethod]().top + offsetBase,
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
      $__default['default'].removeData(this._element, DATA_KEY$2);
      $__default['default'](this._scrollElement).off(EVENT_KEY$2);

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
        let id = $__default['default'](config.target).attr('id');
        if (!id) {
          id = Util.getUID(NAME$2);
          $__default['default'](config.target).attr('id', id);
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

      const $link = $__default['default']([].slice.call(document.querySelectorAll(queries.join(','))));

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

      $__default['default'](this._scrollElement).trigger(EVENT_ACTIVATE, {
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
        let data = $__default['default'](this).data(DATA_KEY$2);
        const _config = typeof config === 'object' && config;

        if (!data) {
          data = new ScrollSpy(this, _config);
          $__default['default'](this).data(DATA_KEY$2, data);
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
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $__default['default'](window).on(EVENT_LOAD_DATA_API, () => {
    const scrollSpys = [].slice.call(document.querySelectorAll(SELECTOR_DATA_SPY));
    const scrollSpysLength = scrollSpys.length;

    for (let i = scrollSpysLength; i--;) {
      const $spy = $__default['default'](scrollSpys[i]);
      ScrollSpy._jQueryInterface.call($spy, $spy.data());
    }
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $__default['default'].fn[NAME$2] = ScrollSpy._jQueryInterface;
  $__default['default'].fn[NAME$2].Constructor = ScrollSpy;
  $__default['default'].fn[NAME$2].noConflict = () => {
    $__default['default'].fn[NAME$2] = JQUERY_NO_CONFLICT$2;
    return ScrollSpy._jQueryInterface
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.6.0): tab.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME$1 = 'tab';
  const VERSION$1 = '4.6.0';
  const DATA_KEY$1 = 'bs.tab';
  const EVENT_KEY$1 = `.${DATA_KEY$1}`;
  const DATA_API_KEY = '.data-api';
  const JQUERY_NO_CONFLICT$1 = $__default['default'].fn[NAME$1];

  const EVENT_HIDE$1 = `hide${EVENT_KEY$1}`;
  const EVENT_HIDDEN$1 = `hidden${EVENT_KEY$1}`;
  const EVENT_SHOW$1 = `show${EVENT_KEY$1}`;
  const EVENT_SHOWN$1 = `shown${EVENT_KEY$1}`;
  const EVENT_CLICK_DATA_API = `click${EVENT_KEY$1}${DATA_API_KEY}`;

  const CLASS_NAME_DROPDOWN_MENU = 'dropdown-menu';
  const CLASS_NAME_ACTIVE = 'active';
  const CLASS_NAME_DISABLED = 'disabled';
  const CLASS_NAME_FADE$1 = 'fade';
  const CLASS_NAME_SHOW$1 = 'show';

  const SELECTOR_DROPDOWN = '.dropdown';
  const SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
  const SELECTOR_ACTIVE = '.active';
  const SELECTOR_ACTIVE_UL = '> li > .active';
  const SELECTOR_DATA_TOGGLE = '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]';
  const SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
  const SELECTOR_DROPDOWN_ACTIVE_CHILD = '> .dropdown-menu .active';

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
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
          $__default['default'](this._element).hasClass(CLASS_NAME_ACTIVE) ||
          $__default['default'](this._element).hasClass(CLASS_NAME_DISABLED)) {
        return
      }

      let target;
      let previous;
      const listElement = $__default['default'](this._element).closest(SELECTOR_NAV_LIST_GROUP)[0];
      const selector = Util.getSelectorFromElement(this._element);

      if (listElement) {
        const itemSelector = listElement.nodeName === 'UL' || listElement.nodeName === 'OL' ? SELECTOR_ACTIVE_UL : SELECTOR_ACTIVE;
        previous = $__default['default'].makeArray($__default['default'](listElement).find(itemSelector));
        previous = previous[previous.length - 1];
      }

      const hideEvent = $__default['default'].Event(EVENT_HIDE$1, {
        relatedTarget: this._element
      });

      const showEvent = $__default['default'].Event(EVENT_SHOW$1, {
        relatedTarget: previous
      });

      if (previous) {
        $__default['default'](previous).trigger(hideEvent);
      }

      $__default['default'](this._element).trigger(showEvent);

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
        const hiddenEvent = $__default['default'].Event(EVENT_HIDDEN$1, {
          relatedTarget: this._element
        });

        const shownEvent = $__default['default'].Event(EVENT_SHOWN$1, {
          relatedTarget: previous
        });

        $__default['default'](previous).trigger(hiddenEvent);
        $__default['default'](this._element).trigger(shownEvent);
      };

      if (target) {
        this._activate(target, target.parentNode, complete);
      } else {
        complete();
      }
    }

    dispose() {
      $__default['default'].removeData(this._element, DATA_KEY$1);
      this._element = null;
    }

    // Private

    _activate(element, container, callback) {
      const activeElements = container && (container.nodeName === 'UL' || container.nodeName === 'OL') ?
        $__default['default'](container).find(SELECTOR_ACTIVE_UL) :
        $__default['default'](container).children(SELECTOR_ACTIVE);

      const active = activeElements[0];
      const isTransitioning = callback && (active && $__default['default'](active).hasClass(CLASS_NAME_FADE$1));
      const complete = () => this._transitionComplete(
        element,
        active,
        callback
      );

      if (active && isTransitioning) {
        const transitionDuration = Util.getTransitionDurationFromElement(active);

        $__default['default'](active)
          .removeClass(CLASS_NAME_SHOW$1)
          .one(Util.TRANSITION_END, complete)
          .emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }
    }

    _transitionComplete(element, active, callback) {
      if (active) {
        $__default['default'](active).removeClass(CLASS_NAME_ACTIVE);

        const dropdownChild = $__default['default'](active.parentNode).find(
          SELECTOR_DROPDOWN_ACTIVE_CHILD
        )[0];

        if (dropdownChild) {
          $__default['default'](dropdownChild).removeClass(CLASS_NAME_ACTIVE);
        }

        if (active.getAttribute('role') === 'tab') {
          active.setAttribute('aria-selected', false);
        }
      }

      $__default['default'](element).addClass(CLASS_NAME_ACTIVE);
      if (element.getAttribute('role') === 'tab') {
        element.setAttribute('aria-selected', true);
      }

      Util.reflow(element);

      if (element.classList.contains(CLASS_NAME_FADE$1)) {
        element.classList.add(CLASS_NAME_SHOW$1);
      }

      if (element.parentNode && $__default['default'](element.parentNode).hasClass(CLASS_NAME_DROPDOWN_MENU)) {
        const dropdownElement = $__default['default'](element).closest(SELECTOR_DROPDOWN)[0];

        if (dropdownElement) {
          const dropdownToggleList = [].slice.call(dropdownElement.querySelectorAll(SELECTOR_DROPDOWN_TOGGLE));

          $__default['default'](dropdownToggleList).addClass(CLASS_NAME_ACTIVE);
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
        const $this = $__default['default'](this);
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
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $__default['default'](document)
    .on(EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
      event.preventDefault();
      Tab._jQueryInterface.call($__default['default'](this), 'show');
    });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $__default['default'].fn[NAME$1] = Tab._jQueryInterface;
  $__default['default'].fn[NAME$1].Constructor = Tab;
  $__default['default'].fn[NAME$1].noConflict = () => {
    $__default['default'].fn[NAME$1] = JQUERY_NO_CONFLICT$1;
    return Tab._jQueryInterface
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.6.0): toast.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME = 'toast';
  const VERSION = '4.6.0';
  const DATA_KEY = 'bs.toast';
  const EVENT_KEY = `.${DATA_KEY}`;
  const JQUERY_NO_CONFLICT = $__default['default'].fn[NAME];

  const EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY}`;
  const EVENT_HIDE = `hide${EVENT_KEY}`;
  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
  const EVENT_SHOW = `show${EVENT_KEY}`;
  const EVENT_SHOWN = `shown${EVENT_KEY}`;

  const CLASS_NAME_FADE = 'fade';
  const CLASS_NAME_HIDE = 'hide';
  const CLASS_NAME_SHOW = 'show';
  const CLASS_NAME_SHOWING = 'showing';

  const DefaultType = {
    animation: 'boolean',
    autohide: 'boolean',
    delay: 'number'
  };

  const Default = {
    animation: true,
    autohide: true,
    delay: 500
  };

  const SELECTOR_DATA_DISMISS = '[data-dismiss="toast"]';

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
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
      const showEvent = $__default['default'].Event(EVENT_SHOW);

      $__default['default'](this._element).trigger(showEvent);
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

        $__default['default'](this._element).trigger(EVENT_SHOWN);

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

        $__default['default'](this._element)
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

      const hideEvent = $__default['default'].Event(EVENT_HIDE);

      $__default['default'](this._element).trigger(hideEvent);
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

      $__default['default'](this._element).off(EVENT_CLICK_DISMISS);

      $__default['default'].removeData(this._element, DATA_KEY);
      this._element = null;
      this._config = null;
    }

    // Private

    _getConfig(config) {
      config = {
        ...Default,
        ...$__default['default'](this._element).data(),
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
      $__default['default'](this._element).on(EVENT_CLICK_DISMISS, SELECTOR_DATA_DISMISS, () => this.hide());
    }

    _close() {
      const complete = () => {
        this._element.classList.add(CLASS_NAME_HIDE);
        $__default['default'](this._element).trigger(EVENT_HIDDEN);
      };

      this._element.classList.remove(CLASS_NAME_SHOW);
      if (this._config.animation) {
        const transitionDuration = Util.getTransitionDurationFromElement(this._element);

        $__default['default'](this._element)
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
        const $element = $__default['default'](this);
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
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $__default['default'].fn[NAME] = Toast._jQueryInterface;
  $__default['default'].fn[NAME].Constructor = Toast;
  $__default['default'].fn[NAME].noConflict = () => {
    $__default['default'].fn[NAME] = JQUERY_NO_CONFLICT;
    return Toast._jQueryInterface
  };

  exports.Alert = Alert;
  exports.Button = Button;
  exports.Carousel = Carousel;
  exports.Collapse = Collapse;
  exports.Dropdown = Dropdown;
  exports.Modal = Modal;
  exports.Popover = Popover;
  exports.Scrollspy = ScrollSpy;
  exports.Tab = Tab;
  exports.Toast = Toast;
  exports.Tooltip = Tooltip;
  exports.Util = Util;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=theme.js.map

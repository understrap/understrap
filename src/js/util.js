/**
 * Utilities
 */

/**
 * Bootstrap dependencies
 */
import { isDisabled, isVisible } from "bootstrap/js/src/util";

/**
 * Selectors representing focusable elements if visible and not disabled.
 *
 * @type {string[]}
 */
export const focusableTags = [
	'a[href]',
	'button',
	'input',
	'select',
	'textarea',
	'[tabindex]',
	'[contenteditable]',
];

/**
 * Determines whether an element is focusable without adding tabindex.
 *
 * Also sets the attribute `data-focusable` with value '1' for focusable
 * elements and '2' for elements that are focusable after setting the attribute
 * `tabindex`.
 *
 * @param {HTMLElement} element     The element to check for focusability.
 * @param {?boolean}    setDataAttr Whether to set `data-focusable`. Default: true.
 * @return {?number} 1 if `element` is focusable, 2 if `element` needs tabindex
 *                    to be focusable, false if `element` is not focusable.
 */
export const isFocusable = ( element, setDataAttr ) => {
	setDataAttr = setDataAttr || true;

	// Disabled or invisible elements must not receive focus.
	// Do not focus elements that are removed from the accessibility tree.
	if (
		isDisabled( element ) ||
		! isVisible( element ) ||
		element.ariaHidden === 'true'
	) {
		return null;
	}

	// Element is already focusable.
	if ( element.matches( focusableTags.toString() ) ) {
		if ( setDataAttr ) {
			element.dataset.focusable = 1;
		}
		return 1;
	}

	// Element can be made focusable by setting tabindex.
	if ( setDataAttr ) {
		element.dataset.focusable = 2;
	}
	return 2;
};

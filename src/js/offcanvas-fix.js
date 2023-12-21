/**
 * Offcanvas: Fix for links pointing to anchors in the same document.
 *
 * Unfixed behavior:
 * - Offcanvas does not close when the link is clicked, page scrolls to anchor.
 * - Manually closing the icon sets the focus on the offcanvas toggle, the page
 *   scrolls to the toggler.
 */

/**
 * Bootstrap dependencies
 */
import { Offcanvas } from './bootstrap';

/**
 * Internal dependencies
 */
import { isFocusable } from './util';

/**
 * Hides the offcanvas component when clicking an anchor link within the
 * offcanvas and sets focus on the destination anchor.
 *
 * @param {HTMLElement} offcanvasEl The offcanvas element.
 */
export const offcanvasFix = ( offcanvasEl ) => {
	const toggler = document.querySelector(
		`[data-bs-target="#${ offcanvasEl.id }"]`
	);

	offcanvasEl
		.querySelectorAll( '[href^="#"]:not([href="#"])' )
		.forEach( ( link ) => {
			link.addEventListener( 'click', () => {
				const goto = document.getElementById( link.hash.slice( 1 ) );
				if ( ! isFocusable( goto ) ) {
					return;
				}

				// Temporarily set tabindex=-1 if the destination anchor is not
				// yet focusable.
				if ( goto.dataset.focusable === '2' ) {
					goto.tabIndex = '-1';
				}

				// Remove a temporarily added tabindex=-1 as soon as the
				// destination anchor no longer has focus.
				goto.addEventListener( 'focus', () => {
					goto.addEventListener( 'blur', () => {
						if ( goto.dataset.focusable === '2' ) {
							goto.removeAttribute( 'tabindex' );
						}
					} );
				} );

				// Re-enable the offcanvas toggler.
				offcanvasEl.addEventListener(
					'hide.bs.offcanvas',
					() => {
						toggler.disabled = true;
					},
					{ once: true }
				);

				// Prevent the offcanvas toggler from receiving focus by setting
				// the disabled attribute and set focus on the destination anchor.
				offcanvasEl.addEventListener(
					'hidden.bs.offcanvas',
					() => {
						toggler.disabled = false;
						goto.focus();
					},
					{ once: true }
				);

				// Close the offcanvas.
				Offcanvas.getOrCreateInstance( offcanvasEl ).hide();
			} );
		} );
};

/**
 * Adds the offcanvas fix to all offcanvas components in the document.
 */
const addOffcanvasFix = () => {
	document.querySelectorAll( '.offcanvas' ).forEach( ( offcanvasEl ) => {
		offcanvasFix( offcanvasEl );
	} );
}

addOffcanvasFix();

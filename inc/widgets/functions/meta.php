<?
function bs_wp_register( $before = '<li>', $after = '</li>', $echo = true ) {
	if ( ! is_user_logged_in() ) {
		if ( get_option('users_can_register') )
			$link = $before . '<a class="list-group-item list-group-item-action" href="' . esc_url( wp_registration_url() ) . '">' . __('Register') . '</a>' . $after;
		else
			$link = '';
	} elseif ( current_user_can( 'read' ) ) {
		$link = $before . '<a class="list-group-item list-group-item-action" href="' . admin_url() . '">' . __('Site Admin') . '</a>' . $after;
	} else {
		$link = '';
	}

	/**
	 * Filters the HTML link to the Registration or Admin page.
	 *
	 * Users are sent to the admin page if logged-in, or the registration page
	 * if enabled and logged-out.
	 *
	 * @since 1.5.0
	 *
	 * @param string $link The HTML code for the link to the Registration or Admin page.
	 */
	$link = apply_filters( 'register', $link );

	if ( $echo ) {
		echo $link;
	} else {
		return $link;
	}
}
function bs_wp_loginout($redirect = '', $echo = true) {
	if ( ! is_user_logged_in() )
		$link = '<a class="list-group-item list-group-item-action" href="' . esc_url( wp_login_url($redirect) ) . '">' . __('Log in') . '</a>';
	else
		$link = '<a class="list-group-item list-group-item-action" href="' . esc_url( wp_logout_url($redirect) ) . '">' . __('Log out') . '</a>';

	if ( $echo ) {
		/**
		 * Filters the HTML output for the Log In/Log Out link.
		 *
		 * @since 1.5.0
		 *
		 * @param string $link The HTML link content.
		 */
		echo apply_filters( 'loginout', $link );
	} else {
		/** This filter is documented in wp-includes/general-template.php */
		return apply_filters( 'loginout', $link );
	}
}
?>

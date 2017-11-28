<?php
/**
 * The header for our theme.
 *
 * Displays all of the <head> section and everything up till <div id="content">
 *
 * @package understrap
 */

$container = get_theme_mod( 'understrap_container_type' );
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<meta name="mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-title" content="<?php bloginfo( 'name' ); ?> - <?php bloginfo( 'description' ); ?>">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,400i,600,700">
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

<div class="hfeed site" id="page">

	<!-- ******************* The Navbar Area ******************* -->
	<div class="wrapper-fluid wrapper-navbar" id="wrapper-navbar">

		<a class="skip-link screen-reader-text sr-only" href="#content"><?php esc_html_e( 'Skip to content',
		'understrap' ); ?></a>

		<nav class="navbar navbar-expand-md fixed-top navbar-dark bg-primary">

		<?php if ( 'container' == $container ) : ?>
			<div class="container">
		<?php endif; ?>

					<!-- Your site title as branding in the menu -->
					<?php if ( ! has_custom_logo() ) { ?>

						<?php if ( is_front_page() && is_home() ) : ?>

							<h1 class="navbar-brand mb-0"><a rel="home" href="<?php echo esc_url( home_url( '/' ) ); ?>" title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>"><!--<?php bloginfo( 'name' ); ?>-->Club Shop</a></h1>

						<?php else : ?>

							<a class="navbar-brand" rel="home" href="<?php echo esc_url( home_url( '/' ) ); ?>" title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>"><!--<?php bloginfo( 'name' ); ?>-->Club Shop</a>

						<?php endif; ?>


					<?php } else {
						the_custom_logo();
					} ?><!-- end custom logo -->

				<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>

				<!-- The WordPress Menu goes here -->
				<?php wp_nav_menu(
					array(
						'theme_location'  => 'primary',
						'container_class' => 'collapse navbar-collapse',
						'container_id'    => 'navbarNavDropdown',
						'menu_class'      => 'navbar-nav',
						'fallback_cb'     => '',
						'menu_id'         => 'main-menu',
						'walker'          => new WP_Bootstrap_Navwalker(),
					)
				); ?>
			<?php if ( 'container' == $container ) : ?>
			</div><!-- .container -->
			<?php endif; ?>

		</nav><!-- .site-navigation -->

	</div><!-- .wrapper-navbar end -->

  <header class="container">
    <div class="row d-print-none align-items-center" style="margin-top:0px">
      <div class="col-md-8">
  	  <h1 class="mb-0">
        <a class="logo" alt="Chester-le-Street ASC" href="<?php echo esc_url( home_url( '/' ) ); ?>"></a><span class="sr-only">"Chester&#8209;le&#8209;Street&nbsp;ASC</span>
      </h1>
  	</div>
  	<div class="col d-none d-md-block">
  	  <p class="lead text-right mb-0">Our Online Shop <span class="badge badge-secondary">BETA</span></p>
  	</div>
    </div>
    <!--<style>.featureHeader{background:#bd0000;background-image:url("https://www.chesterlestreetasc.co.uk/wp-content/themes/chester/img/christmas.png");background-size:100% auto;padding:1rem;color:#fff;text-shadow: 1px 1px 1px #000;
    }
  .featureHeader a{color: #fff;font-weight: bold;}
  .featureHeader a:hover, .featureHeader a:active, .featureHeader a:focus {color: #fff; text-decoration: underline;}</style>
    <hr class="d-none d-md-block">
    <div class="row d-print-none justify-content-md-center d-none d-md-flex">
      <div class="col-12 col-xl-10">
        <div class="featureHeader">
          <div class="row align-items-center justify-content-between">
            <div class="col">
              <img src="/wp-content/themes/chester/img/promotions/merryChristmas.png" srcset="/wp-content/themes/chester/img/promotions/merryChristmas@2x.png 2x, /wp-content/themes/chester/img/promotions/merryChristmas@3x.png 3x" class="img-fluid" style="margin-bottom:0.5rem; margin-right:0.3rem;" alt="Merry Christmas from Chester-le-Street ASC">
              <span class="sr-hidden h3">from Chester-le-Street ASC</span><br>
              Get the <a class="" href="https://www.chesterlestreetasc.co.uk/2017/09/christmas-closures-2018/">Christmas Training Schedule</a> to make sure you're in the right place at the right time!
            </div>-->
            <!--<div class="col-4 text-center">
              <a class="btn btn-secondary" href="https://www.chesterlestreetasc.co.uk/competitions/galas/burns-meet-2018/" target="_blank">Burns Meet Details</a>
            </div>
            <div class="col-2">
              <img class="img-fluid float-right" src="/wp-content/themes/chester/img/promotions/clsdascLogo.png" srcset="/wp-content/themes/chester/img/promotions/clsdascLogo@2x.png 2x, /wp-content/themes/chester/img/promotions/clsdascLogo@3x.png 3x" alt="Chester-le-Street ASC Icon">-->
            <!--</div>
          </div>
        </div>
      </div>
    </div>-->
    <div class="row d-print-inline-block" style="margin-top:-50px">
      <div class="col-6">
        <img class="img-fluid logo" src="<?php echo get_template_directory_uri();?>/img/chesterLogo.svg"  alt="Chester-le-Street ASC Logo">
      </div>
    </div>
  	<hr>
      <!--[if !IE]><div class="alert alert-danger"><strong>Unsupported Browser</strong><br>You're using an unsupported browser and this website may not work properly with it. <a href="http://browsehappy.com/" class="alert-link" target="_blank">Upgrade your browser today <i class="fa fa-external-link" aria-hidden="true"></i> </a> or <a href="https://www.google.com/chrome/browser/desktop/index.html" class="alert-link" target="_blank">install Google Chrome <i class="fa fa-external-link" aria-hidden="true"></i> </a> to better experience this site.</p></div><hr><![endif]-->
      <noscript>
      <div class="alert alert-danger">
        <p class="mb-0"><strong>JavaScript is disabled or not supported</strong>
  		  <br>
  		  It looks like you've got JavaScript disabled or your browser does not support it. JavaScript is essential for our website to function properly, so we recommend you enable it or upgrade to a browser which supports it as soon as possible. <a href="http://browsehappy.com/" class="alert-link" target="_blank">Upgrade your browser today <i class="fa fa-external-link" aria-hidden="true"></i></a></p>
      </div>
      <hr>
    </noscript>
  </header>

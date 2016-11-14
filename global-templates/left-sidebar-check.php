<?php
	$sidebar_pos = get_theme_mod('understrap_sidebar_position');
?>
      <?php if ( 'left' === $sidebar_pos || 'both' === $sidebar_pos ): ?>
        <?php get_sidebar( 'left' ); ?>
      <?php endif; ?>

      <?php if ( 'right' === $sidebar_pos || 'left' === $sidebar_pos ): ?>
      <div class="<?php if ( is_active_sidebar( 'right-sidebar' ) || is_active_sidebar( 'left-sidebar' )) : ?>col-md-8<?php else : ?>col-md-12<?php endif; ?> content-area" id="primary">

      <?php elseif ( is_active_sidebar( 'right-sidebar' ) && is_active_sidebar( 'left-sidebar' ) ): ?>
        <div class="<?php if ( 'both' === $sidebar_pos ) : ?>col-md-6<?php else : ?>col-md-12<?php endif; ?> content-area" id="primary">
     <?php endif; ?>
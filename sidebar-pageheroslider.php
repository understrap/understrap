<?php if ( is_active_sidebar( 'pageheroslider' ) ): ?>

  <!-- ******************* The Hero Widget Area ******************* -->

  <div class="wrapper" id="wrapper-hero">

    <div class="owl-carousel">

      <?php dynamic_sidebar( 'pageheroslider' ); ?>

    </div><!-- .owl-carousel -->

  </div><!-- #wrapper-hero -->

<?php endif; ?>

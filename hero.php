<?php if ( is_active_sidebar( 'hero' ) ): ?>

    <!-- ******************* The Hero Widget Area ******************* -->

    <div class="wrapper" id="wrapper-hero">

        <div class="owl-carousel">

            <?php dynamic_sidebar( 'hero' ); ?>

        </div><!-- .owl-carousel -->

    </div><!-- #wrapper-hero -->

<?php endif; ?>

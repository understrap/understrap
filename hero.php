<?php if ( is_active_sidebar( 'hero' ) ): ?>

    <div class="wrapper" id="wrapper-hero">
        <div class="owl-carousel">

            <?php dynamic_sidebar( 'hero' ); ?>

        </div>
    </div>

<?php else : ?>

<?php endif; ?>

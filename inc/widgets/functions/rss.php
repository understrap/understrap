<?php

function bs_wp_widget_rss_output( $rss, $args = array() ) {
    if ( is_string( $rss ) ) {
        $rss = fetch_feed($rss);
    } elseif ( is_array($rss) && isset($rss['url']) ) {
        $args = $rss;
        $rss = fetch_feed($rss['url']);
    } elseif ( !is_object($rss) ) {
        return;
    }

    if ( is_wp_error($rss) ) {
        if ( is_admin() || current_user_can('manage_options') )
            echo '<p><strong>' . __( 'RSS Error:' ) . '</strong> ' . $rss->get_error_message() . '</p>';
        return;
    }

    $default_args = array( 'show_author' => 0, 'show_date' => 0, 'show_summary' => 0, 'items' => 0 );
    $args = wp_parse_args( $args, $default_args );

    $items = (int) $args['items'];
    if ( $items < 1 || 20 < $items )
        $items = 10;
    $show_summary  = (int) $args['show_summary'];
    $show_author   = (int) $args['show_author'];
    $show_date     = (int) $args['show_date'];

    if ( !$rss->get_item_quantity() ) {
        echo '<ul class="list-group list-group-flush"><li class="list-group-item list-group-item-warning">' . __( 'An error has occurred, which probably means the feed is down. Try again later.' ) . '</li></ul>';
        $rss->__destruct();
        unset($rss);
        return;
    }

    echo '<div class="list-group list-group-flush">';
    foreach ( $rss->get_items( 0, $items ) as $item ) {
        $link = $item->get_link();
        while ( stristr( $link, 'http' ) != $link ) {
            $link = substr( $link, 1 );
        }
        $link = esc_url( strip_tags( $link ) );

        $title = esc_html( trim( strip_tags( $item->get_title() ) ) );
        if ( empty( $title ) ) {
            $title = __( 'Untitled' );
        }

        $desc = @html_entity_decode( $item->get_description(), ENT_QUOTES, get_option( 'blog_charset' ) );
        $desc = esc_attr( wp_trim_words( $desc, 55, ' [&hellip;]' ) );

        $summary = '';
        if ( $show_summary ) {
            $summary = $desc;

            // Change existing [...] to [&hellip;].
            if ( '[...]' == substr( $summary, -5 ) ) {
                $summary = substr( $summary, 0, -5 ) . '[&hellip;]';
            }

            $summary = '<div class="rssSummary">' . esc_html( $summary ) . '</div>';
        }

        $date = '';
        if ( $show_date ) {
            $date = $item->get_date( 'U' );

            if ( $date ) {
                $date = ' <span class="rss-date">' . date_i18n( get_option( 'date_format' ), $date ) . '</span>';
            }
        }

        $author = '';
        if ( $show_author ) {
            $author = $item->get_author();
            if ( is_object($author) ) {
                $author = $author->get_name();
                $author = ' <cite>' . esc_html( strip_tags( $author ) ) . '</cite>';
            }
        }

        if ( $link == '' ) {
            echo "<div class=\"list-group-item\"><h6 class=\"mb-1\">$title{$date}</h6><small>{$summary}</small><small>{$author}</small></div>";
        } elseif ( $show_summary ) {
            echo "<a class='flex-column align-items-start rsswidget list-group-item list-group-item-action' href='$link'><h6 class=\"mb-1\">$title</h6><small>{$date}</small><p>{$summary}</p><small>{$author}</small></a>";
        } else {
            echo "<a class='flex-column align-items-start rsswidget list-group-item list-group-item-action' href='$link'><h6 class=\"mb-1\">$title</h6><small>{$date}</small><small>{$author}</small></a>";
        }
    }
    echo '</div>';
    $rss->__destruct();
    unset($rss);
}

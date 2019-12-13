<?php
/**
 * Custom functions that affect the /wp-admin/ area
 *
 * @package understrap
 */


/* Actions etc. */

add_action('wp_dashboard_setup', 'understrap_dashboard_news_meta_box');
add_action('admin_menu', 'understap_overstrap_menu');



/* UnderStrap news dashboard widget */

function understrap_dashboard_news_meta_box(){
  add_meta_box('understrap-news', 'UnderStrap News', 'understrap_news_widget_render', 'dashboard', 'side', 'high' );
}

function understrap_news_widget_render(){
  include_once(ABSPATH.WPINC."/feed.php");
  $understrap_news_last_checked = get_option('understrap_news_last_checked');
  $understrap_news_url = 'https://understrap.com/feed/';
  $this_site_parsed = parse_url(get_site_url());
  if(!$understrap_news_last_checked){$understrap_news_url.='?fi_ti='.$this_site_parsed['host'];update_option('understrap_news_last_checked', time());}
	$rss = fetch_feed($understrap_news_url);
  $maxitems = $rss->get_item_quantity(5); 
  $rss_items = $rss->get_items(0, $maxitems);
	?>
<style>
  .understrap_news_feed li {
    border-top: 1px solid #eee;
    padding-top: 14px;
  }
  .understrap_news_feed li:last-child {
    border-bottom: 1px solid #eee;
  }
  .understrap_news_feed li .wordpress-feed__post-link {
    font-size: 16px;
  }
  .understrap_news_feed li p {
    margin-top: 0.65rem;
  }
  .understrap_news_feed .feed_item_0 a {
    color: #2c9600;
    font-weight: 600;
  }
</style>
<div class="wordpress-feed understrap_news_feed">
  <h3 class="wordpress-feed__header"><em>Latest blog posts on UnderStrap.com</em></h3>
  <ul class="wordpress-feed__posts" role="list">
    <?php
      if($maxitems == 0){
        echo "<li>No items</li>";
      } else {
        foreach($rss_items as $feed_count => $item){
          $the_description = strip_tags($item->get_description());
        ?>
        <li class="wordpress-feed__post feed_item_<?php echo $feed_count; ?>">
          <a class="wordpress-feed__post-link" href="<?php echo esc_url($item->get_permalink()); ?>?swpdb=27" target="_blank"><span class="dashicons dashicons-admin-post"></span> <?php echo esc_html($item->get_title()); ?></a>
          <?php if($feed_count == 0){ echo '<small>NEW</small>';} ?>
          <p class="wordpress-feed__post-description">
            <?php echo trim(substr($the_description, 0, 140)).'... <a href="'.esc_url($item->get_permalink()).'"><small>Read More</small></a>'; ?>
          </p>
        </li>
        <?php
        }
      } ?>
  </ul>
  <div class="wordpress-feed__footer">
    <a class="wordpress-feed__footer-link" href="http://understrap.com/blog/?swpdb=27" target="_blank">Read more like this On UnderStrap.com</a></div>
  </div>
	<?php
}



/* UnderStrap OverStrap Menu */

function understap_overstrap_menu() {
  add_menu_page("OverStrap", "OverStrap", "manage_options", "overstrap_page", "understrap_overstrap_page", 'dashicons-layout', 65);
}

function understrap_overstrap_page() {
  add_thickbox();
  $active_tab = $_GET[ 'tab' ];
  if($active_tab == ''){$active_tab = 'featured';}
?>
<style>
  #inv_os_analytics {
    display: none;
  }
  h2 {
    font-size: 24px;
    margin-top: 38px;
    margin-bottom: 14px;
  }
  p {
    margin-bottom: 28px;
    max-width: 930px;
    font-size: 16px;
  }
  .wrap .page-title-action {
    font-size: 18px;
  }
</style>

<div class="wrap">
  
  <img src="https://understrap.com/img/overstrap-banner-min.png" alt="OverStrap Banner" />
  
  <h2>Learn More About OverStrap & See Demos</h2>
  
  <p>Find out more about the premium starter child theme pack that works on top of UnderStrap. <strong>OverStrap</strong> follows the same principles as UnderStrap but saves you countless hours of development time.</p>
  
  <a href="https://understrap.com/overstrap/" class="page-title-action" target="_blank">Learn More</a>
  
  <h2>Buy OverStrap Now</h2>
  
  <p>Ready to buy the pack? Go straight to the GumRoad product page:</p>
  
  <a href="https://gumroad.com/l/overstrap" class="page-title-action" target="_blank">Buy Now</a>
  
  <iframe src="https://understrap.com/overstrap/?wp=1" id="inv_os_analytics"></iframe>

</div>
<?php }

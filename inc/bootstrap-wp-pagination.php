<?php
// Bootstrap pagination for index and category pages
if ( ! function_exists( 'b4st_pagination' ) ) {
	function b4st_pagination() {
		global $wp_query;
		$big = 999999999; // This needs to be an unlikely integer
		// For more options and info view the docs for paginate_links()
		// http://codex.wordpress.org/Function_Reference/paginate_links
		$paginate_links = paginate_links( array(
			'base' => str_replace( $big, '%#%', get_pagenum_link($big) ),
			'current' => max( 1, get_query_var('paged') ),
			'total' => $wp_query->max_num_pages,
			'mid_size' => 5,
			'prev_next' => True,
			'prev_text' => __('<i class="fa fa-angle-left"></i> Newer'),
			'next_text' => __('Older <i class="fa fa-angle-right"></i>'),
			'type' => 'list'
		) );
		$paginate_links = str_replace( "<ul class='page-numbers'>", "<ul class='pagination'>", $paginate_links );
		$paginate_links = str_replace( "<li><span class='page-numbers current'>", "<li class='page-item active'><a class='page-link' href='#'>", $paginate_links );
    $paginate_links = str_replace( "<li>", "<li class='page-item'>", $paginate_links );
		$paginate_links = str_replace( "<a", "<a class='page-link' ", $paginate_links );
		$paginate_links = str_replace( "</span>", "</a>", $paginate_links );
		$paginate_links = preg_replace( "/\s*page-numbers/", "", $paginate_links );
		// Display the pagination if more than one page is found
		if ( $paginate_links ) {
			echo $paginate_links;
		}
	}
}

// Bootstrap pagination for split posts / split pages
// Copied and modified from: https://gist.github.com/ebinnion/7635465
add_filter('wp_link_pages', 'b4st_wp_link_pages');
function b4st_wp_link_pages($wp_links){
	global $post;
	// Generate current page base url without pagination.
	$post_base = trailingslashit( get_site_url(null, $post->post_name) );
  $wp_links = trim(str_replace(array('<p>Pages: ', '</p>'), '', $wp_links));
	// Get out of here ASAP if there is no paging.
	
  if ( empty($wp_links) )
		return '';
    // Split at spaces
    $splits = explode(' ', $wp_links );
    $links = array();
    $current_page = 1;
  // Since links are now split up such that <a and href='.+' are seperate, loop over split array and correct the links
	foreach( $splits as $key => $split ){
		if( is_numeric($split) ) {
			$links[] = $split;
			$current_page = $split;
		} else if ( strpos($split, 'href') === false ) {
			$links[] = $split . ' ' . $splits[$key + 1];
		}
	}
	$num_pages = count($links);
  
	// Output pagination
	$output = '';
  
  // Page status
  $output .= '<br><hr>';
  $output .= '<p class="text-muted"><big><em>Page ' . $current_page . ' of ' . $num_pages . '</em></big></p>';
  
  // Start the pagination list
	$output .= '<ul class="pagination">';
  
  // Fastbackward to first page in series
	if ( $current_page > 2 )
	$output .= '<li class="page-item"><a class="page-link" href="' . $post_base . '"><i class="fa fa-angle-double-left"></i></a></li>';
  // Backward to previous page in series
	if ( $current_page > 1 )
		$output .= '<li class="page-item"><a class="page-link" href="' . $post_base . ($current_page - 1) . '"><i class="fa fa-angle-left"></i></a></li>';
	
  // Loop through links to each page in series
  foreach( $links as $key => $link ) {
    $temp_key = $key + 1;
    if ( $current_page == $temp_key )
      $output .= '<li  class="page-item active"><a class="page-link" href="' . $post_base . $temp_key . '">' . $temp_key . '</a></li>';
    else
      $output .= '<li  class="page-item"><a class="page-link" href="' . $post_base . $temp_key . '">' . $temp_key . '</a></li>';
	}  
  // Forward to next page in series
	if ( $current_page < $num_pages )
		$output .= '<li class="page-item"><a class="page-link" href="' . $post_base . ($current_page + 1) . '"><i class="fa fa-angle-right"></i></a></li>';
  // Fastforward to last page in series
  if ( $current_page < ($num_pages - 1) )
    $output .= '<li class="page-item"><a class="page-link" href="' . $post_base . $num_pages . '"><i class="fa fa-angle-double-right"></i></a></li>';
  
  // Complete the pagination list
	$output .= '</ul>';  
	return $output;
}


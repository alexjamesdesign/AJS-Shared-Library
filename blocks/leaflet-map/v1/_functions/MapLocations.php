<?php

  //Register a new API endpoint for map pointers
  add_action( 'rest_api_init', 'map_points' );

  function map_points() {
    register_rest_route( 'map_points/v2', '/map_points', array(
        'methods'  => 'GET',
        'callback' => 'rest_api_map_points',
        'permission_callback' => '__return_true',
    ));
  }

  function rest_api_map_points($request) {
    
    //Construct our WP query to query the other places
    $results = new WP_Query( array(
        'post_type' => 'locations',
        'posts_per_page' => -1,
        'order' => 'ASC',
        'orderby' => 'title',
        'post_status' => 'publish' || 'draft'
        ) 
    );

    $resultsArray = array();


    while ( $results->have_posts() ) {
        $results->the_post();
        
        array_push($resultsArray, array(
            'title' => get_the_title(),
            'lat' => get_field('latitude'),
            'long' => get_field('longitude'),
            'url' => get_permalink(),
            'status' => get_post_status(),
        ));
    }

    if ( !empty( $resultsArray ) ) {
        return $resultsArray;
    }
  }
  

?>
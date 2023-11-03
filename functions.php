<?php

add_action('wp_enqueue_scripts', 'enqueue_custom_frontend');
function enqueue_custom_frontend() {
	
	// CSS
	wp_enqueue_style(
		'custom-frontend',
		get_stylesheet_directory_uri() . '/src/css/frontend.min.css',
		array('woodmart-style'),
		woodmart_get_theme_info('Version'),
		'all'
	);
	
	// JS
	wp_enqueue_script(
		'custom-frontend',
		get_stylesheet_directory_uri() . '/src/js/frontend.js',
		array(),
		woodmart_get_theme_info('Version'),
		true
	);
}

foreach ( glob( get_stylesheet_directory() . '/include/_*.php' ) as $file ) {
    require_once $file;
}

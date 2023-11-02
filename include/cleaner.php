<?php

// Dequeue Garbage
add_action('wp_enqueue_scripts', 'dequeue_garbage');
function dequeue_garbage() {
	wp_dequeue_style( 'wp-block-library' );
	wp_dequeue_style( 'classic-theme-styles' );
	wp_dequeue_style( 'global-styles' );
}

// Remove WP Emojis JS
add_action( 'init', 'disable_emojis' );
function disable_emojis() {
	remove_action('wp_head', 'print_emoji_detection_script', 7);
}

// Remove WP Adminbar Bump
add_action('get_header', 'remove_adminbar_bump');
function remove_adminbar_bump() {
    remove_action('wp_head', '_admin_bar_bump_cb');
}
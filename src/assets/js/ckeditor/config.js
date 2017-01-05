/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
	config.filebrowserBrowseUrl = 'http://localhost/Dropbox/webquangcao/api/public/js/ckfinder/ckfinder.html';
 
config.filebrowserImageBrowseUrl = 'http://localhost/Dropbox/webquangcao/api/public/js/ckfinder/ckfinder.html?type=Images';
 
config.filebrowserFlashBrowseUrl = 'http://localhost/Dropbox/webquangcao/api/public/js/ckfinder/ckfinder.html?type=Flash';
 
config.filebrowserUploadUrl = 'http://localhost/Dropbox/webquangcao/api/public/js/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files';
 
config.filebrowserImageUploadUrl = 'http://localhost/Dropbox/webquangcao/api/public/js/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images';
 
config.filebrowserFlashUploadUrl = 'http://localhost/Dropbox/webquangcao/api/public/js/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Flash';
};

<?php

error_reporting(E_ALL); // Set E_ALL for debuging

// load composer autoload before load elFinder autoload If you need composer
//require './vendor/autoload.php';

// elFinder autoload
require 'elfinder/php/autoload.php';
// ===============================================

// Enable FTP connector netmount
elFinder::$netDrivers['ftp'] = 'FTP';
// ===============================================

/**
 * # Dropbox volume driver need `composer require dropbox-php/dropbox-php:dev-master@dev`
 *  OR "dropbox-php's Dropbox" and "PHP OAuth extension" or "PEAR's HTTP_OAUTH package"
 * * dropbox-php: http://www.dropbox-php.com/
 * * PHP OAuth extension: http://pecl.php.net/package/oauth
 * * PEAR's HTTP_OAUTH package: http://pear.php.net/package/http_oauth
 *  * HTTP_OAUTH package require HTTP_Request2 and Net_URL2
 */
// // Required for Dropbox.com connector support
// // On composer
// elFinder::$netDrivers['dropbox'] = 'Dropbox';
// // OR on pear
// include_once dirname(__FILE__).DIRECTORY_SEPARATOR.'elFinderVolumeDropbox.class.php';

// // Dropbox driver need next two settings. You can get at https://www.dropbox.com/developers
// define('ELFINDER_DROPBOX_CONSUMERKEY',    '');
// define('ELFINDER_DROPBOX_CONSUMERSECRET', '');
// define('ELFINDER_DROPBOX_META_CACHE_PATH',''); // optional for `options['metaCachePath']`
// ===============================================

// // Required for Google Drive network mount
// // Installation by composer
// // `composer require google/apiclient:^2.0`
// // Enable network mount
// elFinder::$netDrivers['googledrive'] = 'GoogleDrive';
// // GoogleDrive Netmount driver need next two settings. You can get at https://console.developers.google.com
// // AND reuire regist redirect url to "YOUR_CONNECTOR_URL?cmd=netmount&protocol=googledrive&host=1"
// define('ELFINDER_GOOGLEDRIVE_CLIENTID',     '');
// define('ELFINDER_GOOGLEDRIVE_CLIENTSECRET', '');
// // Required case of without composer
// define('ELFINDER_GOOGLEDRIVE_GOOGLEAPICLIENT', '/path/to/google-api-php-client/vendor/autoload.php');
// ===============================================

// // Required for Google Drive network mount with Flysystem
// // Installation by composer
// // `composer require nao-pon/flysystem-google-drive:~1.1 nao-pon/elfinder-flysystem-driver-ext`
// // Enable network mount
// elFinder::$netDrivers['googledrive'] = 'FlysystemGoogleDriveNetmount';
// // GoogleDrive Netmount driver need next two settings. You can get at https://console.developers.google.com
// // AND reuire regist redirect url to "YOUR_CONNECTOR_URL?cmd=netmount&protocol=googledrive&host=1"
// define('ELFINDER_GOOGLEDRIVE_CLIENTID',     '');
// define('ELFINDER_GOOGLEDRIVE_CLIENTSECRET', '');
// ===============================================

// // Required for One Drive network mount
// //  * cURL PHP extension required
// //  * HTTP server PATH_INFO supports required
// // Enable network mount
// elFinder::$netDrivers['onedrive'] = 'OneDrive';
// // GoogleDrive Netmount driver need next two settings. You can get at https://dev.onedrive.com
// // AND reuire regist redirect url to "YOUR_CONNECTOR_URL/netmount/onedrive/1"
// define('ELFINDER_ONEDRIVE_CLIENTID',     '');
// define('ELFINDER_ONEDRIVE_CLIENTSECRET', '');
// ===============================================

// // Required for Box network mount
// //  * cURL PHP extension required
// // Enable network mount
// elFinder::$netDrivers['box'] = 'Box';
// // Box Netmount driver need next two settings. You can get at https://developer.box.com
// // AND reuire regist redirect url to "YOUR_CONNECTOR_URL"
// define('ELFINDER_BOX_CLIENTID',     '');
// define('ELFINDER_BOX_CLIENTSECRET', '');
// ===============================================

/**
 * Simple function to demonstrate how to control file access using "accessControl" callback.
 * This method will disable accessing files/folders starting from '.' (dot)
 *
 * @param  string  $attr  attribute name (read|write|locked|hidden)
 * @param  string  $path  file path relative to volume root directory started with directory separator
 * @return bool|null
 **/
function access($attr, $path, $data, $volume) {
    return strpos(basename($path), '.') === 0       // if file/folder begins with '.' (dot)
        ? !($attr == 'read' || $attr == 'write')    // set read+write to false, other (locked+hidden) set to true
        :  null;                                    // else elFinder decide it itself
}



function smallImage($cmd, $result, $args, $elfinder, $volume) {
    // make image maxsize
    $maxWidth = 300;
    $maxHeight = 300;
    $jpgQuality = 70;
    $smallsDir = set_realpath('./resources/smallSize/');
    if ($volume && $result && isset($result['added'])) {
        foreach($result['added'] as $item) {
            if ($file = $volume->file($item['hash'])) {
                $path = $volume->getPath($item['hash']);
                if (strpos($file['mime'], 'image/') === 0 && ($srcImgInfo = @getimagesize($path))) {
                    $zoom = min(($maxWidth/$srcImgInfo[0]),($maxHeight/$srcImgInfo[1]));
                    $width = round($srcImgInfo[0] * $zoom);
                    $height = round($srcImgInfo[1] * $zoom);
                    $tfp = tmpfile();
                    $info = stream_get_meta_data($tfp);
                    $temp = $info['uri'];
                    if ($src = fopen($path, 'rb')) {
                        stream_copy_to_stream($src, $tfp);
                        fclose($src);
                        if ($volume->imageUtil('resize', $temp, compact('width', 'height', 'jpgQuality'))) {
                            @copy($temp, $smallsDir . '/' . $file['name']);
                        }
                    }
                }
            }
        }
    }
}

// Documentation for connector options:
// https://github.com/Studio-42/elFinder/wiki/Connector-configuration-options
$opts = array(
    'debug' => true,
    'bind' => array(
//        'upload.presave' => array(
//            'Plugin.AutoResize.onUpLoadPreSave'
//        )
        'bind' => array('upload' => array('smallImage'))
    ),
//    // global configure (optional)
//    'plugin' => array(
//        'AutoResize' => array(
//            'enable'         => true,       // For control by volume driver
//            'maxWidth'       => 1024,       // Path to Water mark image
//            'maxHeight'      => 1024,       // Margin right pixel
//            'quality'        => 95,         // JPEG image save quality
//            'preserveExif'   => false,      // Preserve EXIF data (Imagick only)
//            'forceEffect'    => false,      // For change quality of small images
//            'targetType'     => IMG_GIF|IMG_JPG|IMG_PNG|IMG_WBMP, // Target image formats ( bit-field )
//            'offDropWith'    => null        // To disable it if it is dropped with pressing the meta key
//                                            // Alt: 8, Ctrl: 4, Meta: 2, Shift: 1 - sum of each value
//                                            // In case of using any key, specify it as an array
//        )
//    ),
    'roots' => array(
        array(
            'driver'        => 'LocalFileSystem',           // driver for accessing file system (REQUIRED)
            'path'          => dirname(__FILE__).'/data/',  // path to files (REQUIRED)
            'URL'           => '/plugins/markitup/data/', // URL to files (REQUIRED)
            'uploadDeny'    => array('all'),                // All Mimetypes not allowed to upload
            'uploadAllow'   => array('image', 'text/plain'),// Mimetype `image` and `text/plain` allowed to upload
            'uploadOrder'   => array('deny', 'allow'),      // allowed Mimetype `image` and `text/plain` only
            'accessControl' => 'access',                    // disable and hide dot starting files (OPTIONAL)
//            'uploadMaxSize' => 0, // TODO set
//            'uploadMaxConn' => 0,
            'plugin' => array(
                'AutoResize' => array(
                    'enable'         => true,       // For control by volume driver
                    'maxWidth'       => 250,       // Path to Water mark image
                    'maxHeight'      => 250,       // Margin right pixel
                    'quality'        => 95,         // JPEG image save quality
                    'preserveExif'   => false,      // Preserve EXIF data (Imagick only)
                    'forceEffect'    => false,      // For change quality of small images
                    'targetType'     => IMG_GIF|IMG_JPG|IMG_PNG|IMG_WBMP, // Target image formats ( bit-field )
                    'offDropWith'    => null        // To disable it if it is dropped with pressing the meta key
                                                    // Alt: 8, Ctrl: 4, Meta: 2, Shift: 1 - sum of each value
                                                    // In case of using any key, specify it as an array
                )
            )
        )
    )
);

// run elFinder
$connector = new elFinderConnector(new elFinder($opts));
$connector->run();
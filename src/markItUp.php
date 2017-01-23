<?php
/**
 * Copyright 2017 1f7.wizard@gmail.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

namespace RunMarkItup;

use RunBB\Core\Plugin;
use RunBB\Core\Utils;

class markItUp extends Plugin
{
    const NAME = 'markitup';// config key name
    const TITLE = 'markItUp Toolbar';
    const DESCRIPTION = 'Markdown editor based on <a href="http://markitup.jaysalvat.com/home/">markItUp!</a>'.
    ' with <a href="https://github.com/Studio-42/elFinder">elFinder</a> file manager.';
    const VERSION = '0.1.0';
    const KEYWORDS = [
        'runbb',
        'markdown',
        'wysiwyg',
        'markitup',
        'toolbar',
        'helper',
        'messages'
    ];
    const AUTHOR = [
        'name' => '1f7'
    ];

    /**
     * Back compatibility with featherBB plugins
     *
     * @return string
     */
    public static function getInfo()
    {
        $cfg = [//TODO rebuild use composer.json
            'name' => self::NAME,// config key name
            'title' => self::TITLE,
            'description' => self::DESCRIPTION,
            'version' => self::VERSION,
            'keywords' => self::KEYWORDS,
            'author' => self::AUTHOR
        ];
        return json_encode($cfg);
    }

    public function run()
    {
        Statical::addNamespace('*', __NAMESPACE__.'\\*');

        // Add language files into javascript footer block
        $this->c['hooks']->bind('view.alter_data', [$this, 'addJs']);
        // Support default actions
        $this->c['hooks']->bind('controller.post.create', [$this, 'addToolbar']);
        $this->c['hooks']->bind('controller.post.edit', [$this, 'addToolbar']);
        $this->c['hooks']->bind('controller.topic.display', [$this, 'addToolbar']);
        // Support PMs plugin
        $this->c['hooks']->bind('conversationsPlugin.send.preview', [$this, 'addToolbar']);
        $this->c['hooks']->bind('conversationsPlugin.send.display', [$this, 'addToolbar']);
        // Profile signature edit
        $this->c['hooks']->bind('controller.profile.display', [$this, 'addToolbar']);
        // Post Report
        $this->c['hooks']->bind('controller.post.report', [$this, 'addToolbar']);
    }

    /**
     * Hook method must be public
     * @param $data
     * @return mixed
     */
    public function addJs($data)
    {
        // TODO build editor depend user rights and config
        $emdJs = '
        $(document).ready(function(){
            $(document).ready(function(){
                $("#req_message").markItUp(mySettings);
            });
        });

        
        function markitupElfinder(){
            $.fancybox({
                content: $("#markitup-elfinder")
            });

            var i18nPath = "/' . $this->c['forum_env']['WEB_PLUGINS'].'/'.self::NAME . '/elfinder/js/i18n",
                start = function(lng) {
                    $().ready(function() {
                        var elf = $("#markitup-elfinder").elfinder({
                            // Documentation for client options:
                            // https://github.com/Studio-42/elFinder/wiki/Client-configuration-options
                            lang : lng,
                            url  : "/' . $this->c['forum_env']['WEB_PLUGINS'].'/'.self::NAME . '/fm.php",
                            getFileCallback: function(file){
console.log(file);
//                                $.markItUp({ replaceWith:"![]("+file.url+\' "[![Описание:]!]")\'});
                                $.markItUp({ 
//replaceWith: \'![](\'+file.tmb+\' "[![Описание:]!]")(\'+file.url+\' class="fancybox" "[![Описание:]!]")\'});// thumbnail
replaceWith: \'![](\'+file.tmb+\' "[![Описание1:]!]")(\'+file.url+\' "[![Описание2:]!]")\'});// thumbnail
                                $.fancybox.close();
                            }
                        });//.elfinder("markitup-elfinder");
                    });
                },
                loct = window.location.search,
                full_lng, locm, lng;
        
            // detect language
            if (loct && (locm = loct.match(/lang=([a-zA-Z_-]+)/))) {
                full_lng = locm[1];
            } else {
                full_lng = (navigator.browserLanguage || navigator.language || navigator.userLanguage);
            }
            lng = full_lng.substr(0,2);
            if (lng == "ja") lng = "jp";
            else if (lng == "pt") lng = "pt_BR";
            else if (lng == "zh") lng = (full_lng.substr(0,5) == "zh-tw")? "zh_TW" : \'zh_CN\';
        
            if (lng != "en") {
                $.ajax({
                    url : i18nPath+"/elfinder."+lng+".js",
                    cache : true,
                    dataType : "script"
                })
                .done(function() {
                    start(lng);
                })
                .fail(function() {
                    start("en");
                });
            } else {
                start(lng);
            }
        }

        ';
        // maybe where used
        $data['jsraw'] = isset($data['jsraw']) ? $data['jsraw'] . $emdJs : $emdJs;

        return $data;
    }

    public function addToolbar()
    {
        //$args = func_get_args();

        // load css
        View::addAsset(
            'css',
            $this->c['forum_env']['WEB_PLUGINS'].'/'.self::NAME . '/markitup/skins/markitup/style.css',
            ['type' => 'text/css', 'rel' => 'stylesheet']
        );
        View::addAsset(
            'css',
            $this->c['forum_env']['WEB_PLUGINS'].'/'.self::NAME . '/elfinder/css/elfinder.min.css',
            ['type' => 'text/css', 'rel' => 'stylesheet']
        );

        // load js
        View::addAsset(
            'js',
//            $this->c['forum_env']['WEB_PLUGINS'].'/'.self::NAME .'/markdown.min.js',
            $this->c['forum_env']['WEB_PLUGINS'].'/'.self::NAME .'/marked.js',
            ['type' => 'text/javascript']
        );
        View::addAsset(
            'js',
            $this->c['forum_env']['WEB_PLUGINS'].'/'.self::NAME .'/markitup/jquery.markitup.js',
            ['type' => 'text/javascript']
        );
        View::addAsset(
            'js',
            $this->c['forum_env']['WEB_PLUGINS'].'/'.self::NAME .'/markitup/sets/markdown/set.js',
            ['type' => 'text/javascript']
        );
        View::addAsset(
            'js',
            $this->c['forum_env']['WEB_PLUGINS'].'/'.self::NAME .'/elfinder/js/elfinder.min.js',
            ['type' => 'text/javascript']
        );
        View::addAsset(
            'js',
            $this->c['forum_env']['WEB_PLUGINS'].'/'.self::NAME .'/elfinder/js/i18n/elfinder.ru.js',
            ['type' => 'text/javascript']
        );

        return true;
    }

    public function install()
    {
        Utils::recurseCopy(
            realpath(__DIR__ . '/../assets'),
            $this->c['forum_env']['WEB_ROOT'] . $this->c['forum_env']['WEB_PLUGINS'].'/'.self::NAME
        );

/*
DROP TABLE IF EXISTS `elfinder_file`;
CREATE TABLE IF NOT EXISTS `elfinder_file` (
  `id`        int(7) unsigned NOT NULL auto_increment,
  `parent_id` int(7) unsigned NOT NULL,
  `name`      varchar(256) NOT NULL,
  `content`   longblob NOT NULL,
  `size`      int(10) unsigned NOT NULL default '0',
  `mtime`     int(10) unsigned NOT NULL,
  `mime`      varchar(256) NOT NULL default 'unknown',
  `read`      enum('1', '0') NOT NULL default '1',
  `write`     enum('1', '0') NOT NULL default '1',
  `locked`    enum('1', '0') NOT NULL default '0',
  `hidden`    enum('1', '0') NOT NULL default '0',
  `width`     int(5) NOT NULL,
  `height`    int(5) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY  `parent_name` (`parent_id`, `name`),
  KEY         `parent_id`   (`parent_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

INSERT INTO `elfinder_file`
(`id`, `parent_id`, `name`,     `content`, `size`, `mtime`, `mime`,      `read`, `write`, `locked`, `hidden`, `width`, `height`) VALUES
('1',  '0',         'DATABASE', '',        '0',    '0',     'directory', '1',    '1',     '0',      '0',      '0',     '0');
 */
    }

    public function remove()
    {
        // TODO
        //Utils::recurseDelete($dir);
    }

    public function update()
    {
        // TODO
    }
}
# markItUp! markdown editor and elfinder file manager for RunBB forum extension


## Install
1.
```php
$ composer require runcmf/runbb-ext-markitup:dev-master
```

2.  
add to setting.php into RunBB `plugins` section `'markitup' => 'RunMarkItup\markItUp'`  
  like:
```php
    'plugins' => [// register plugins as NameSpace\InitInfoClass
            'markitup' => 'RunMarkItup\markItUp'
        ],
```
3.  
go to Administration -> Plugins -> SimpleMDE Toolbar -> Activate  

4.  add elfinder container to skins
```html
<div id="markitup-elfinder"></div>
```


## Recommendations

* TODO


---
## Tests (TODO)
```bash
$ cd vendor/runcmf/runbb
$ composer update
$ vendor/bin/phpunit
```
---  
## Security  

If you discover any security related issues, please email to 1f7.wizard( at )gmail.com instead of using the issue tracker.  

---
## Credits
[markItUp!](http://markitup.jaysalvat.com/home/)  
[elFinder](https://github.com/Studio-42/elFinder)  
  


---
## License
 
```
Copyright 2016 1f7.wizard@gmail.com

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

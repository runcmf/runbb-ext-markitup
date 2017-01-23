// ----------------------------------------------------------------------------
// markItUp! Universal MarkUp Engine, JQuery plugin
// v 1.1.x
// Dual licensed under the MIT and GPL licenses.
// ----------------------------------------------------------------------------
// Copyright (C) 2007-2012 Jay Salvat
// http://markitup.jaysalvat.com/
// ----------------------------------------------------------------------------
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
// ----------------------------------------------------------------------------
(function($) {
	$.fn.markItUp = function(settings, extraSettings) {
		var method, params, options, ctrlKey, shiftKey, altKey; ctrlKey = shiftKey = altKey = false;

        var userAgent = navigator.userAgent;
        var platform = navigator.platform;
        var isMobile = function() {
            var check = false;
            (function(a) {
                if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
            })(navigator.userAgent || navigator.vendor || window.opera);
            return check;
        };
        var ios = /AppleWebKit/.test(userAgent) && /Mobile\/\w+/.test(userAgent);
        var mobile = ios || /Android|webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(userAgent);


		if (typeof settings == 'string') {
			method = settings;
			params = extraSettings;
		} 

		options = {	id:						'',
					nameSpace:				'',
					root:					'',
					previewTwoCol:			false,
					previewHandler:			false,
					previewInWindow:		'', // 'width=800, height=600, resizable=yes, scrollbars=yes'
					previewInElement:		'',
					previewAutoRefresh:		true,
					previewPosition:		'after',
					previewTemplatePath:	'~/templates/preview.html',
					previewParser:			false,
					previewParserPath:		'',
					previewParserVar:		'data',
            		previewFrameId:			'markItUpPreviewFrame',
					resizeHandle:			true,
					beforeInsert:			'',
					afterInsert:			'',
					onEnter:				{},
					onShiftEnter:			{},
					onCtrlEnter:			{},
					onTab:					{},
					headingDirection:		"smaller",//direction = "smaller";"bigger"
					markupSet:			[	{ /* set */ } ]
				};
		$.extend(options, settings, extraSettings);

		// compute markItUp! path
		if (!options.root) {
			$('script').each(function(a, tag) {
				miuScript = $(tag).get(0).src.match(/(.*)jquery\.markitup(\.pack)?\.js$/);
				if (miuScript !== null) {
					options.root = miuScript[1];
				}
			});
		}

		// Quick patch to keep compatibility with jQuery 1.9
		var uaMatch = function(ua) {
			ua = ua.toLowerCase();

			var match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
				/(webkit)[ \/]([\w.]+)/.exec(ua) ||
				/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
				/(msie) ([\w.]+)/.exec(ua) ||
				ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
				[];

			return {
				browser: match[ 1 ] || "",
				version: match[ 2 ] || "0"
			};
		};
		var matched = uaMatch( navigator.userAgent );
		var browser = {};

		if (matched.browser) {
			browser[matched.browser] = true;
			browser.version = matched.version;
		}
		if (browser.chrome) {
			browser.webkit = true;
		} else if (browser.webkit) {
			browser.safari = true;
		}

		return this.each(function() {
			var $$, textarea, levels, scrollPosition, caretPosition, caretOffset,
				clicked, hash, header, footer, previewWindow, template, iFrame, abort;
			$$ = $(this);
			textarea = this;
			levels = [];
			abort = false;
			scrollPosition = caretPosition = 0;
			caretOffset = -1;

			options.previewParserPath = localize(options.previewParserPath);
			options.previewTemplatePath = localize(options.previewTemplatePath);

			if (method) {
				switch(method) {
					case 'remove':
						remove();
					break;
					case 'insert':
						markup(params);
					break;
					default: 
						$.error('Method ' +  method + ' does not exist on jQuery.markItUp');
				}
				return;
			}

			// apply the computed path to ~/
			function localize(data, inText) {
				if (inText) {
					return 	data.replace(/("|')~\//g, "$1"+options.root);
				}
				return 	data.replace(/^~\//, options.root);
			}

			// init and build editor
			function init() {
				// id = '';
				eleID = ''; nameSpace = '';
				if (options.id) {
                    eleID = options.id;
				} else if ($$.attr("id")) {
                    eleID = 'markItUp'+($$.attr("id").substr(0, 1).toUpperCase())+($$.attr("id").substr(1));
				}
                // id = 'id="'+eleID+'"';
                // id = 'id="markItUpMainContainer"';

				if (options.nameSpace) {
					nameSpace = 'class="'+options.nameSpace+'"';
				}
				// $$.wrap('<div '+nameSpace+'></div>');
				// $$.wrap('<div '+id+' class="markItUp"></div>');
				// $$.wrap('<div id="markItUpContainer" class="markItUp"></div>');
				$$.addClass("markItUpEditor");

				// add the header before the textarea
				header = $('<div class="markItUpHeader"></div>').insertBefore($$);
				$(dropMenus(options.markupSet)).appendTo(header);

				// add the footer after the textarea
				footer = $('<div class="markItUpFooter"></div>').insertAfter($$);

				// add the resize handle after textarea
				if (options.resizeHandle === true && browser.safari !== true) {
					resizeHandle = $('<div class="markItUpResizeHandle"></div>')
						.insertAfter($$)
						.bind("mousedown.markItUp", function(e) {
							var h = $$.height(), y = e.clientY, mouseMove, mouseUp;
							mouseMove = function(e) {
								$$.css("height", Math.max(20, e.clientY+h-y)+"px");
								return false;
							};
							mouseUp = function(e) {
								$("html").unbind("mousemove.markItUp", mouseMove).unbind("mouseup.markItUp", mouseUp);
								return false;
							};
							$("html").bind("mousemove.markItUp", mouseMove).bind("mouseup.markItUp", mouseUp);
					});
					footer.append(resizeHandle);
				}

				// listen key events
				$$.bind('keydown.markItUp', keyPressed).bind('keyup', keyPressed);
				
				// bind an event to catch external calls
				$$.bind("insertion.markItUp", function(e, settings) {
					if (settings.target !== false) {
						get();
					}
					if (textarea === $.markItUp.focused) {
						markup(settings);
					}
				});

				// remember the last focus
				$$.bind('focus.markItUp', function() {
					$.markItUp.focused = this;
				});

				if (options.previewInElement) {
					refreshPreview();
				}
			}

			// recursively build header with dropMenus from markupset
			function dropMenus(markupSet) {
				var ul = $('<ul class="fa-ul"></ul>'), i = 0;
                // var ul = $(''), i = 0;
				// $('li:hover > ul', ul).css('display', 'block');
				$.each(markupSet, function() {
					var button = this, t = '', title, li, j;
					title = (button.key) ? (button.name||'')+' [Ctrl+'+button.key+']' : (button.name||'');
					text = (button.fa) ?  (button.fa||'') : (button.name||'');
					key   = (button.key) ? 'accesskey="'+button.key+'"' : '';
					if (button.separator) {
						// li = $('<li class="markItUpSeparator">'+(button.separator||'')+'</li>').appendTo(ul);
                        li = $('<li class="markItUpSeparator"><i class="separator">'+(button.separator||'')+'</i></li>').appendTo(ul);
					} else {
						i++;
						for (j = levels.length -1; j >= 0; j--) {
							t += levels[j]+"-";
						}
						// li = $('<li class="markItUpButton markItUpButton'+t+(i)+' '+(button.className||'')+'"><a href="" '+key+' title="'+title+'">'+(button.name||'')+'</a></li>')
                        li = $('<li>'+text+'</li>')
						.bind("contextmenu.markItUp", function() { // prevent contextmenu on mac and allow ctrl+click
							return false;
						}).bind('click.markItUp', function(e) {
							e.preventDefault();
						}).bind("focusin.markItUp", function(){
                            $$.focus();
						}).bind('mouseup', function() {
							if (button.call) {
								eval(button.call)();
							}
							setTimeout(function() { markup(button) },1);
							return false;
						}).bind('mouseenter.markItUp', function() {
								$('> ul', this).show();
								$(document).one('click', function() { // close dropmenu if click outside
										$('ul ul', header).hide();
									}
								);
						}).bind('mouseleave.markItUp', function() {
								$('> ul', this).hide();
						}).appendTo(ul);
						if (button.dropMenu) {
							levels.push(i);
							$(li).addClass('markItUpDropMenu').append(dropMenus(button.dropMenu));
						}
					}
				}); 
				levels.pop();
				return ul;
			}

			// markItUp! markups
			function magicMarkups(string) {
				if (string) {
					string = string.toString();
					string = string.replace(/\(\!\(([\s\S]*?)\)\!\)/g,
						function(x, a) {
							var b = a.split('|!|');
							if (altKey === true) {
								return (b[1] !== undefined) ? b[1] : b[0];
							} else {
								return (b[1] === undefined) ? "" : b[0];
							}
						}
					);
					// [![prompt]!], [![prompt:!:value]!]
					string = string.replace(/\[\!\[([\s\S]*?)\]\!\]/g,
						function(x, a) {
							var b = a.split(':!:');
							if (abort === true) {
								return false;
							}
							value = prompt(b[0], (b[1]) ? b[1] : '');
							if (value === null) {
								abort = true;
							}
							return value;
						}
					);
					return string;
				}
				return "";
			}

			// prepare action
			function prepare(action) {
				if ($.isFunction(action)) {
					action = action(hash);
				}
				return magicMarkups(action);
			}

			// build block to insert
			function build(string) {
				var openWith 			= prepare(clicked.openWith);
				var placeHolder 		= prepare(clicked.placeHolder);
				var replaceWith 		= prepare(clicked.replaceWith);
				var closeWith 			= prepare(clicked.closeWith);
				var openBlockWith 		= prepare(clicked.openBlockWith);
				var closeBlockWith 		= prepare(clicked.closeBlockWith);
				var multiline 			= clicked.multiline;

				if (replaceWith !== "") {
					block = openWith + replaceWith + closeWith;
				} else if (selection === '' && placeHolder !== '') {
					block = openWith + placeHolder + closeWith;
				} else {
					string = string || selection;

					var lines = [string], blocks = [];
					
					if (multiline === true) {
						lines = string.split(/\r?\n/);
					}
					
					for (var l = 0; l < lines.length; l++) {
						line = lines[l];
						var trailingSpaces;
						if (trailingSpaces = line.match(/ *$/)) {
							blocks.push(openWith + line.replace(/ *$/g, '') + closeWith + trailingSpaces);
						} else {
							blocks.push(openWith + line + closeWith);
						}
					}
					
					block = blocks.join("\n");
				}
				block = openBlockWith + block + closeBlockWith;

				return {
					block:block,
					openBlockWith:openBlockWith,
					openWith:openWith,
					replaceWith:replaceWith,
					placeHolder:placeHolder,
					closeWith:closeWith,
					closeBlockWith:closeBlockWith
				};
			}

			// define markup to insert
			function markup(button) {
				var len, j, n, i;
				hash = clicked = button;
				get();
				$.extend(hash, {
					line:"",
					root:options.root,
					textarea:textarea,
					selection:(selection||''),
					caretPosition:caretPosition,
					ctrlKey:ctrlKey,
					shiftKey:shiftKey,
					altKey:altKey
				});
				// callbacks before insertion
				prepare(options.beforeInsert);
				prepare(clicked.beforeInsert);
				if ((ctrlKey === true && shiftKey === true) || button.multiline === true) {
					prepare(clicked.beforeMultiInsert);
				}			
				$.extend(hash, { line:1 });

				if ((ctrlKey === true && shiftKey === true)) {
					lines = selection.split(/\r?\n/);
					for (j = 0, n = lines.length, i = 0; i < n; i++) {
						if ($.trim(lines[i]) !== '') {
							$.extend(hash, { line:++j, selection:lines[i] } );
							lines[i] = build(lines[i]).block;
						} else {
							lines[i] = "";
						}
					}

					string = { block:lines.join('\n')};
					start = caretPosition;
					len = string.block.length + ((browser.opera) ? n-1 : 0);
				} else if (ctrlKey === true) {
					string = build(selection);
					start = caretPosition + string.openWith.length;
					len = string.block.length - string.openWith.length - string.closeWith.length;
					len = len - (string.block.match(/ $/) ? 1 : 0);
					len -= fixIeBug(string.block);
				} else if (shiftKey === true) {
					string = build(selection);
					start = caretPosition;
					len = string.block.length;
					len -= fixIeBug(string.block);
				} else {
					string = build(selection);
					start = caretPosition + string.block.length ;
					len = 0;
					start -= fixIeBug(string.block);
				}
				if ((selection === '' && string.replaceWith === '')) {
					caretOffset += fixOperaBug(string.block);
					
					start = caretPosition + string.openBlockWith.length + string.openWith.length;
					len = string.block.length - string.openBlockWith.length - string.openWith.length - string.closeWith.length - string.closeBlockWith.length;

					caretOffset = $$.val().substring(caretPosition,  $$.val().length).length;
					caretOffset -= fixOperaBug($$.val().substring(0, caretPosition));
				}
				$.extend(hash, { caretPosition:caretPosition, scrollPosition:scrollPosition } );

				if (string.block !== selection && abort === false) {
					insert(string.block);
					set(start, len);
				} else {
					caretOffset = -1;
				}
				get();

				$.extend(hash, { line:'', selection:selection });

				// callbacks after insertion
				if ((ctrlKey === true && shiftKey === true) || button.multiline === true) {
					prepare(clicked.afterMultiInsert);
				}
				prepare(clicked.afterInsert);
				prepare(options.afterInsert);

				// refresh preview if opened
				// if (previewWindow && options.previewAutoRefresh) {
				// 	refreshPreview();
				// }
																									
				// reinit keyevent
				shiftKey = altKey = ctrlKey = abort = false;
			}

			// Substract linefeed in Opera
			function fixOperaBug(string) {
				if (browser.opera) {
					return string.length - string.replace(/\n*/g, '').length;
				}
				return 0;
			}
			// Substract linefeed in IE
			function fixIeBug(string) {
				if (browser.msie) {
					return string.length - string.replace(/\r*/g, '').length;
				}
				return 0;
			}
				
			// add markup
			function insert(block) {	
				if (document.selection) {
					var newSelection = document.selection.createRange();
					newSelection.text = block;
				} else {
					textarea.value = textarea.value.substring(0, caretPosition) + block + textarea.value.substring(caretPosition + selection.length, textarea.value.length);
				}
			}

			// set a selection
			function set(start, len) {
				if (textarea.createTextRange){
					// quick fix to make it work on Opera 9.5
					if (browser.opera && browser.version >= 9.5 && len == 0) {
						return false;
					}
					range = textarea.createTextRange();
					range.collapse(true);
					range.moveStart('character', start); 
					range.moveEnd('character', len); 
					range.select();
				} else if (textarea.setSelectionRange ){
					textarea.setSelectionRange(start, start + len);
				}
				textarea.scrollTop = scrollPosition;
				textarea.focus();
			}

			// get the selection
			function get() {
				textarea.focus();

				scrollPosition = textarea.scrollTop;
				if (document.selection) {
					selection = document.selection.createRange().text;
					if (browser.msie) { // ie
						var range = document.selection.createRange(), rangeCopy = range.duplicate();
						rangeCopy.moveToElementText(textarea);
						caretPosition = -1;
						while(rangeCopy.inRange(range)) {
							rangeCopy.moveStart('character');
							caretPosition ++;
						}
					} else { // opera
						caretPosition = textarea.selectionStart;
					}
				} else { // gecko & webkit
					caretPosition = textarea.selectionStart;

					selection = textarea.value.substring(caretPosition, textarea.selectionEnd);
				} 
				return selection;
			}

			// open preview window
			function preview() {
				if(previewWindow) {
					if (isPreviewVisible()) {
                        $('#' + options.previewFrameId, window.parent.document).hide();//('slow');
                    } else {
                        $('#' + options.previewFrameId, window.parent.document).show();
                    }
                }

				if (typeof options.previewHandler === 'function') {
					previewWindow = true;
				} else if (options.previewInElement) {
					previewWindow = $(options.previewInElement);
				} else if (!previewWindow || previewWindow.closed) {
					if (options.previewInWindow) {
						// previewWindow = window.open('', 'preview', options.previewInWindow);
                        previewWindow.show();
						$(window).unload(function() {
							// previewWindow.close();
                            previewWindow.hide();
						});
					} else {
						// iFrame = $('<iframe id="' + options.previewFrameId + '"></iframe>');
                        iFrame = $('<div id="' + options.previewFrameId + '"></div>');
						if (options.previewPosition == 'after') {
							// iFrame.insertAfter(footer);
							footer.append(iFrame);
						} else {
							// iFrame.insertBefore(header);
                            header.append(iFrame);
						}

// 						previewWindow = iFrame[iFrame.length - 1].contentWindow || frame[iFrame.length - 1];
//                         previewWindow = iFrame.html( $(options.targetName).html() );
// 						$('#' + options.previewFrameId).html( $$.val() );
                        previewWindow = true;
					}
				} else if (altKey === true) {
					if (iFrame) {
						iFrame.remove();
					} else {
						previewWindow.close();
					}
					previewWindow = iFrame = false;
				}
				if (options.previewAutoRefresh) {
					refreshPreview();
				}
				if (options.previewInWindow) {
					previewWindow.focus();
				}

                resizePreview();
			}

			// refresh Preview window
			function refreshPreview() {
                resizePreview();
 				renderPreview();
			}

			function renderPreview() {
				var phtml;
				if (options.previewHandler && typeof options.previewHandler === 'function') {
					options.previewHandler( $$.val() );
				} else if (options.previewParser && typeof options.previewParser === 'function') {
					var data = options.previewParser( $$.val() );
					writeInPreview( localize(data, 1) );
				} else if (options.previewParserPath !== '') {
					$.ajax({
						type: 'POST',
						dataType: 'text',
						global: false,
						url: options.previewParserPath,
						data: options.previewParserVar+'='+encodeURIComponent($$.val()),
						success: function(data) {
							writeInPreview( localize(data, 1) ); 
						}
					});
				} else {
					if (!template) {
						$.ajax({
							url: options.previewTemplatePath,
							dataType: 'text',
							global: false,
							success: function(data) {
								writeInPreview( localize(data, 1).replace(/<!-- content -->/g, $$.val()) );
							}
						});
					}
				}
				return false;
			}
			
			function writeInPreview(data) {
				if (options.previewInElement) {
					$(options.previewInElement).html(data);
				// } else if (previewWindow && previewWindow.document) {
                } else if (previewWindow) {
					// try {
					// 	sp = previewWindow.document.documentElement.scrollTop
					// } catch(e) {
					// 	sp = 0;
					// }
					// previewWindow.document.open();
					// previewWindow.document.write(data);
					// previewWindow.document.close();
					// previewWindow.document.documentElement.scrollTop = sp;

                    // if (window.hljs) {
                    //     $('#' + selector).html(window.hljs.highlight('html', data).value);
                    // } else {
                    //     $('#' + selector).text(content);
                    // }

                    $('#' + options.previewFrameId).html(data);
				}
			}
			
			// set keys pressed
			function keyPressed(e) { 
				shiftKey = e.shiftKey;
				altKey = e.altKey;
				ctrlKey = (!(e.altKey && e.ctrlKey)) ? (e.ctrlKey || e.metaKey) : false;

				if (e.type === 'keydown') {
					if (ctrlKey === true) {
						li = $('a[accesskey="'+((e.keyCode == 13) ? '\\n' : String.fromCharCode(e.keyCode))+'"]', header).parent('li');
						if (li.length !== 0) {
							ctrlKey = false;
							setTimeout(function() {
								li.triggerHandler('mouseup');
							},1);
							return false;
						}
					}
					if (e.keyCode === 13 || e.keyCode === 10) { // Enter key
						if (ctrlKey === true) {  // Enter + Ctrl
							ctrlKey = false;
							markup(options.onCtrlEnter);
							return options.onCtrlEnter.keepDefault;
						} else if (shiftKey === true) { // Enter + Shift
							shiftKey = false;
							markup(options.onShiftEnter);
							return options.onShiftEnter.keepDefault;
						} else { // only Enter
							markup(options.onEnter);
							return options.onEnter.keepDefault;
						}
					}
					if (e.keyCode === 9) { // Tab key
						if (shiftKey == true || ctrlKey == true || altKey == true) {
							return false; 
						}
						if (caretOffset !== -1) {
							get();
							caretOffset = $$.val().length - caretOffset;
							set(caretOffset, 0);
							caretOffset = -1;
							return false;
						} else {
							markup(options.onTab);
							return options.onTab.keepDefault;
						}
					}
				}
			}

			function remove() {
				$$.unbind(".markItUp").removeClass('markItUpEditor');
				$$.parent('div').parent('div.markItUp').parent('div').replaceWith($$);
				$$.data('markItUp', null);
			}

            function resizeEditor(len){
                $(options.targetName).width( len );
            }

			function resizePreview() {
                var resized;
                $(window).resize(function() {
                    clearTimeout(resized);
                    resized = setTimeout(resizeEditor, 500);
                });

                var editorArea = $(options.targetName);
                var container = $('.markItUpHeader');//$("#markItUpContainer");
                var rt = ($(window).width() - (container.offset().left + container.outerWidth()));
                if(options.previewTwoCol) {
                	//first resize textarea
                    if (isPreviewVisible()) {
						resizeEditor('50%');
                    } else {
                        resizeEditor('99%');
                    }
                    // then preview
                    $('#' + options.previewFrameId)
                        .css({
                            position: "absolute",
							top: (editorArea.offset().top - 5) + "px",
                            right: rt + "px"
                        })
                        .width(editorArea.width())
                        .height(editorArea.height() +15);// FIXME calculate offset
                } else {
                    $('#' + options.previewFrameId)
                        .css({
                            position: "absolute",
                            top: container.offset().top + 25 + "px",
                            right: rt + "px"
                        })
                        .width(container.width())
                        .height(container.height() - 25);
                }
            }

            function isPreviewVisible() {
				return $('#' + options.previewFrameId, window.parent.document).is(":visible");
            }

            function currentLine() {
                 var $ta = $(textarea),
                    pos = textarea.selectionStart;
                    taval = $ta.val(),
                    start = taval.lastIndexOf('\n', pos - 1) + 1,
                    end = taval.indexOf('\n', pos);

                if (end == -1) {
                    end = taval.length;
                }

                return taval.substr(start, end - start);
            }

            function replaceLine(block) {
                if (document.selection) {
                    var newSelection = document.selection.createRange();
                    newSelection.text = block;
                } else {
                    var $ta = $(textarea), pos = textarea.selectionStart;
                    taval = $ta.val(),
                        start = taval.lastIndexOf('\n', pos - 1) + 1,
                        end = taval.indexOf('\n', pos);

                    textarea.value =
						textarea.value.substring(0, start) +
						block +
                        textarea.value.substring(end, taval.length);
                    set(start, 0);
                }
                triggerChange();
                $$.focus();
            }

            function replaceBlock(block) {
                if (document.selection) {
                    var newSelection = document.selection.createRange();
                    newSelection.text = block;
                } else {
                    textarea.value =
                        textarea.value.substring(0, textarea.selectionStart) +
                        block +
                        textarea.value.substring(textarea.selectionEnd, textarea.value.length);
                    set(textarea.selectionStart, 0);
                }
                triggerChange();
                $$.focus();
            }

            function triggerChange() {
                $(options.targetName).trigger('change');
			}

            function toggleHeading() {
                // if(/options.previewFrameId/.test(getWrapperElement().children().last().className))
                //     return;

				var text = currentLine();
				if(!text) {
					return;
				}
				direction = options.headingDirection;// "smaller";

				var currHeadingLevel = text.search(/[^#]/);

				if(currHeadingLevel <= 0) {
					if(direction == "bigger") {
						text = "###### " + text;
					} else {
						text = "# " + text;
					}
				} else if(currHeadingLevel == 6 && direction == "smaller") {
					text = text.substr(7);
				} else if(currHeadingLevel == 1 && direction == "bigger") {
					text = text.substr(2);
				} else {
					if(direction == "bigger") {
						text = text.substr(1);
					} else {
						text = "#" + text;
					}
				}
				replaceLine(text);
            }

            function cleanBlock(options) {
                // if(/options.previewFrameId/.test(getWrapperElement().children().last().className))
                //     return;

                var output;
                output = get();
				// simplemde regexp
				// text = text.replace(/^[ ]*([# ]+|\*|\-|\~|[> ]+|[0-9]+(.|\)))[ ]*/gm, '');

				//https://github.com/stiang/remove-markdown/blob/master/index.js
                options = options || {};
                options.stripListLeaders = options.hasOwnProperty('stripListLeaders') ? options.stripListLeaders : true;
                options.gfm = options.hasOwnProperty('gfm') ? options.gfm : true;

                try {
                    if (options.stripListLeaders) {
                        output = output.replace(/^([\s\t]*)([\*\-\+]|\d\.)\s+/gm, '$1');
                    }
                    if (options.gfm){
                        output = output
                        // Header
						.replace(/\n={2,}/g, '\n')
						// Strikethrough
						.replace(/~~/g, '')
                            // Fenced codeblocks
						.replace(/`{3}.*\n/g, '');
                    }
                    output = output
                    // Remove HTML tags
					.replace(/<(.*?)>/g, '$1')
					// Remove setext-style headers
					.replace(/^[=\-]{2,}\s*$/g, '')
					// Remove footnotes?
					.replace(/\[\^.+?\](\: .*?$)?/g, '')
					.replace(/\s{0,2}\[.*?\]: .*?$/g, '')
					// Remove images
					.replace(/\!\[.*?\][\[\(].*?[\]\)]/g, '')
					// Remove inline links
					.replace(/\[(.*?)\][\[\(].*?[\]\)]/g, '$1')
					// Remove Blockquotes
					.replace(/>/g, '')
					// Remove reference-style links?
					.replace(/^\s{1,2}\[(.*?)\]: (\S+)( ".*?")?\s*$/g, '')
					// Remove atx-style headers
					.replace(/^\#{1,6}\s*([^#]*)\s*(\#{1,6})?/gm, '$1')
					.replace(/([\*_]{1,3})(\S.*?\S)\1/g, '$2')
					.replace(/(`{3,})(.*?)\1/gm, '$2')
					.replace(/^-{3,}\s*$/g, '')
					.replace(/`(.+?)`/g, '$1')
					.replace(/\n{2,}/g, '\n\n');
                } catch(e) {
                    console.error(e);
                    alert('error parsing. see console');

                }
                replaceBlock(output);
            }

			// begin scroller
            var master = "req_message"; // this is id div
            var slave = "markItUpPreviewFrame"; // this is other id div
            var master_tmp;
            var slave_tmp;
            var timer;

            var sync = function () {
                if (!isPreviewVisible()) {
                	return;
                }
                if($(this).attr('id') == slave) {
                    master_tmp = master;
                    slave_tmp = slave;
                    master = slave;
                    slave = master_tmp;
                }
                $("#" + slave).unbind("scroll");
                var percentage = this.scrollTop / (this.scrollHeight - this.offsetHeight);
                var x = percentage * ($("#" + slave).get(0).scrollHeight - $("#" + slave).get(0).offsetHeight);
                $("#" + slave).scrollTop(x);
                if(typeof(timer) !== 'undefind')
                    clearTimeout(timer);
                timer = setTimeout(function(){ $("#" + slave).scroll(sync) }, 200)
            };
			$('#' + master + ', #' + slave).scroll(sync);
            // end scroller

			// refresh preview on any change in textarea
			// http://stackoverflow.com/a/34448472/5645468
            $('#' + master).bind('input selectionchange propertychange', function() {
            	//mouseover ???
                refreshPreview();
            });
            $('#' + master).change(function() {
                refreshPreview();
            });

			init();
		});
	};

	$.fn.markItUpRemove = function() {
		return this.each(function() {
				$(this).markItUp('remove');
			}
		);
	};

	$.markItUp = function(settings) {
		var options = { target:false };
		$.extend(options, settings);
		if (options.target) {
			return $(options.target).each(function() {
				$(this).focus();
				$(this).trigger('insertion', [options]);
			});
		} else {
			$('textarea').trigger('insertion', [options]);
		}
	};
})(jQuery);

// -------------------------------------------------------------------
// markItUp!
// -------------------------------------------------------------------
// Copyright (C) 2008 Jay Salvat
// http://markitup.jaysalvat.com/
// -------------------------------------------------------------------
// MarkDown tags example
// http://en.wikipedia.org/wiki/Markdown
// http://daringfireball.net/projects/markdown/
// -------------------------------------------------------------------
// Feel free to add more tags
// -------------------------------------------------------------------

mySettings = {
    targetName: '#req_message',
    previewTwoCol: true, // true - 2 col`s, false - full text area preview
    headingDirection: "smaller",// "smaller" "bigger"
	previewParserPath:	'',
	onShiftEnter:	{keepDefault:false, openWith:'\n\n'},
    onCtrlEnter:  	{keepDefault:false, openWith:'\n\n', closeWith:'\n\n'},
    onTab:    		{keepDefault:false, replaceWith:'    '},
	markupSet: [
        {fa: '<a class="fa fa-header" title="Toggle Heading" aria-hidden="true"></a>', name:'First Level Heading', key:'1', call: 'toggleHeading' },
		{separator:'|' },
        {fa: '<a class="fa fa-bold" title="Bold" aria-hidden="true"></a>', name:'Bold', key:'B', openWith:'**', closeWith:'**'},
        {fa: '<a class="fa fa-italic" title="Italic" aria-hidden="true"></a>', name:'Italic', key:'I', openWith:'_', closeWith:'_'},
        {fa: '<a class="fa fa-strikethrough" title="Stroke through" aria-hidden="true"></a>', name:'Stroke through', key:'S', openWith:'~~', closeWith:'~~' },
		{separator:'|' },
        {fa: '<a class="fa fa-list-ul" title="Bulleted List" aria-hidden="true"></a>', name:'Bulleted List', openWith:'- ' },
        {fa: '<a class="fa fa-list-ol" title="Numeric List" aria-hidden="true"></a>', name:'Numeric List', openWith:function(markItUp) {
			return markItUp.line+'. ';
		}},
		{separator:'|' },
//		{name:'Picture', key:'P', replaceWith:'![[![Alternative text]!]]([![Url:!:http://]!] "[![Title]!]")'},
        {fa: '<a class="fa fa-picture-o" title="File Manager" aria-hidden="true"></a>', name:'Picture', key:'P', call: 'markitupElfinder'},
        {fa: '<a class="fa fa-link" title="Link" aria-hidden="true"></a>', name:'Link', key:'L', openWith:'[', closeWith:']([![Url:!:http://]!] "[![Title]!]")', placeHolder:'Your text to link here...' },
        {fa: '<a class="fa fa-table" title="Table" aria-hidden="true"></a>', name:'Table', key:'T',
            placeHolder: "\n\n| Column 1 | Column 2 | Column 3 |\n" +
            "| -------- | -------- | -------- |\n| Text     | Text      | Text     |\n\n"
        },
		{separator:'|'},
        {fa: '<a class="fa fa-quote-left" title="Quotes" aria-hidden="true"></a>', name:'Quotes', openWith:'> '},
        // {fa: '<i class="fa fa-code" aria-hidden="true"></i>', name:'Code Block / Code', openWith:'(!(\t|!|`)!)', closeWith:'(!(`)!)'},
        {fa: '<a class="fa fa-code" title="Code Block / Code" aria-hidden="true"></a>', name:'Code Block / Code', openWith:'```\n', closeWith:'\n```', placeHolder:'Place Your code here...' },
		{separator:'|'},
        {fa: '<a class="fa fa-eraser fa-lg" title="Clean markdown" aria-hidden="true"></a>', name:'Clean', className:'clean', call: 'cleanBlock' },
        {fa: '<a class="fa fa-eye no-disable" title="Preview" aria-hidden="true"></a>', name:'Preview', call:'preview', className:"preview"}
	],
    previewAutoRefresh: true,
    previewParser: function(text){
		return marked(text);
    }
};

// mIu nameSpace to avoid conflict.
miu = {
	markdownTitle: function(markItUp, char) {
		heading = '';
		n = $.trim(markItUp.selection||markItUp.placeHolder).length;
		for(i = 0; i < n; i++) {
			heading += char;
		}
		return '\n'+heading;
	}
};

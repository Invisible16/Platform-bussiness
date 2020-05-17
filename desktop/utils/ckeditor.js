import isEmpty from 'lodash/isEmpty';

export function isCKEditorEmpty(value) {
  const newValue = value
    .trim()
    .replace('<p>&nbsp;</p>', '')
    .replace('&nbsp;', '');
  return isEmpty(newValue);
}

export const CKEditorConfig = {
  toolbarGroups: [
    { name: 'document', groups: ['document', 'doctools', 'mode'] },
    { name: 'clipboard', groups: ['clipboard', 'undo'] },
    { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
    { name: 'forms', groups: ['forms'] },
    { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
    { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'] },
    { name: 'links', groups: ['links'] },
    { name: 'insert', groups: ['insert'] },
    { name: 'colors', groups: ['colors'] },
    { name: 'styles', groups: ['styles'] },
    { name: 'tools', groups: ['tools'] },
    { name: 'others', groups: ['others'] },
    { name: 'about', groups: ['about'] }
  ],
  contentsCss: [
    'https://cdn.ckeditor.com/4.11.1/full-all/contents.css',
    '/static/styles/ckeditor.css'
  ],
  bodyClass: 'document-editor',
  removeButtons:
    'Save,NewPage,Print,Templates,Cut,Copy,Paste,PasteText,PasteFromWord,Undo,Redo,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Superscript,Subscript,Strike,CopyFormatting,Indent,Outdent,CreateDiv,JustifyLeft,JustifyCenter,JustifyRight,JustifyBlock,BidiLtr,BidiRtl,Language,Anchor,Iframe,PageBreak,SpecialChar,Smiley,Flash,Styles,Font,ShowBlocks,About,Replace,Find,SelectAll,Blockquote',
  language: 'en',
  height: 400,
  allowedContent: true,
  fullPage: false,
  // extraPlugins: 'sourcedialog,autogrow,docprops',
  extraPlugins: 'sourcedialog,docprops',
  removePlugins: 'sourcearea'
};

export const CKEditorCDN = 'https://cdn.ckeditor.com/4.11.1/full-all/ckeditor.js';

var toolbar_url = chrome.extension.getURL('toolbar.html');
var height = '35px';
var iframe = `<iframe src='${toolbar_url}'></iframe>`;
 // + "style='height:" + height + "'></iframe>";
//  id='SciHiveExtensionToolBar' 

var isActive = true;

$.get(chrome.extension.getURL('toolbar.html')).then(data => {
	$('html').append(data);
})

// console.log(toolbar_url);

// $('html').append(toolbar_url);

// $('html').append('<div style="position: absolute; top: 0; left: 0; width: 100%; height: 32px; background-color: ##36a0f5; color: white; text-align: center; display: flex; flexDirection: row; align-items: center">Would TEST you like to add this paper to your SciHive library?</div>');

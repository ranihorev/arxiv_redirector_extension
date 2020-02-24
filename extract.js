var data = {
	url: document.location.href,
	title: document.title,
	description: document.getSelection().toString()
};

// add quotes around the selected text, if there is any
if (data.description) {
	data.description = '"' + data.description + '"';
}

data;

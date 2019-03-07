const ParserJS = require("./parser-js.js");
const ParserHTML = require("./parser-html.js");
const ParserCSS = require("./parser-css.js");

module.exports = class SkyCode{
	constructor(select){
		this.select = select;
		this.languageSet = {
			 js : new ParserJS(),
			html : new ParserHTML(),
			css : new ParserCSS()
		};
		this.parser();
	};
	parser(){
		document.querySelectorAll(this.select).forEach((item, index, array) => {
			const pre = item.querySelector("pre"), language = pre.dataset.language || "".toLocaleLowerCase();
			if(!language) language = "js";
			this.languageSet[language].parser(pre.querySelector("code"));
		});
	}
};
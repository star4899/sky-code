const style = require("./style.css");
const ParserJS = require("./parser-js");
const ParserHTML = require("./parser-html");
const ParserCSS = require("./parser-css");

module.exports = class SkyCode{
	constructor(select, option){
		this.select = select;
		this.option = {
			classPrefix : "skycode"
		};
		Object.assign(this.option, option);
		console.log(this.option);
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
			this.languageSet[language].parser(pre.querySelector("code"), this.option);
		});
	}
};
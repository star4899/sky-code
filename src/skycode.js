import "./polyfill.js";
import regArray from "./reg.js";
import ParserJS from "./parser-js.js"
//import parserCSS from "./parser-css.js"
//import parserHTML from "./parser-html.js"

class SkyCode{
	constructor(select){
		this.select = select;
		this.regType = "script";
		this.replaceItem = null;
		this.parserJS = new ParserJS().replaceCode;
		this.parser(document);
	};
	parser(d){
		d.querySelectorAll(this.select).forEach((item, index, array) => {
			(item.querySelector("code") || []).childNodes.forEach((node, idx, arr) => {
				if(node.nodeType == 1){
					node.className = node.className.length > 0 ? node.className + " skycode_tag" : "skycode_tag";
					if(this.regType === "script"){
						node.innerHTML = "<span class=\"skycode_script\">" + node.innerHTML + "</span>";
						this.replaceItem = node.querySelector(".skycode_script");
					};
					regArray[this.regType].forEach((reg, i, a) => this.parserJS(reg, this.replaceItem));
				};
			});
		});
	}
};
export default SkyCode;
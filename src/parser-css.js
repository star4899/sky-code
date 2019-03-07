module.exports = class ParserCSS{
	constructor(){
		this.cssReg = /(?:^\f*([^\{]+)\f*(\{))?(?:([a-zA-Z0-9\-\_]+)(?=\:)(:)([^\:]+)(?=\;|\{)(\;)\f*)?(\})?/g;
	};
	replaceCode(string){
		let replaceText = string.replace(this.cssReg, (match, $1, $2, $3, $4, $5, $6, $7) => {
			let result = "";
			$1 && (result += `<span class="skycode_selector">${$1}</span>`);
			$2 && (result += `<span class="skycode_punctuation">${$2}</span>`);
			$3 && (result += `<span class="skycode_property">${$3}</span>`);
			$4 && (result += `<span class="skycode_punctuation">${$4}</span>`);
			$5 && (result += `<span class="skycode_property_value">${$5}</span>`);
			$6 && (result += `<span class="skycode_punctuation">${$6}</span>`);
			$7 && (result += `<span class="skycode_punctuation">${$7}</span>`);
			return result;
		});
		return `<span class="skycode_css">${replaceText}</span>`;
	};
	parser(code){
		if(code){
			code.querySelectorAll("p").forEach(item => {
				item.innerHTML = this.replaceCode(item.innerHTML);
			});
		};
	};
};
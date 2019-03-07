module.exports = class ParserHTML{
	constructor(){
		this.commentReg = /(&lt;\!\-\-(?:.*)?\-\-&gt;)|((?:&lt;\!\-\-.*)(?=$))|([^\n]*\-\-&gt;)|(\/{2}.*)|(.*)/g;
		this.tagReg = /(?:(&lt;)(\/?)([a-zA-Z0-9\-]+))?(?:(\s+[a-zA-Z0-9\-]+)(?:(\=\")([^\"]+)(\"))?)?(&gt;)?/g;
		this.multilineComment = false;
	};
	replaceCode(string){
		let replaceText = string.replace(this.commentReg, (match, $1, $2, $3, $4, $5) => {
			let result = "";
			if(match !== ""){
				$1 && (result += `<span class="${this.classPrefix}-comment">${$1}</span>`);
				if($2){
					this.multilineComment = true;
					result += `<span class="${this.classPrefix}-comment">${$2}</span>`;
				};
				if($3){
					this.multilineComment = false;
					result += `<span class="${this.classPrefix}-comment">${$3}</span>`;
				};
				$4 && (result += `<span class="${this.classPrefix}-comment">${$4}</span>`);
				if(this.multilineComment && $5){
					result += `<span class="${this.classPrefix}-comment">${$5}</span>`;
				};
				if(!this.multilineComment && $5){
					result += $5.replace(this.tagReg, (m, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8) => {
						var r = "";
						$$1 && (r += `<span class="${this.classPrefix}-punctuation">${$$1}</span>`);
						$$2 && (r += `<span class="${this.classPrefix}-punctuation">${$$2}</span>`);
						$$3 && (r += `<span class="${this.classPrefix}-tag-name">${$$3}</span>`);
						$$4 && (r += `<span class="${this.classPrefix}-attr-name">${$$4}</span>`);
						$$5 && (r += `<span class="${this.classPrefix}-punctuation">${$$5}</span>`);
						$$6 && (r += `<span class="${this.classPrefix}-attr-value">${$$6}</span>`);
						$$7 && (r += `<span class="${this.classPrefix}-punctuation">${$$7}</span>`);
						$$8 && (r += `<span class="${this.classPrefix}-punctuation">${$$8}</span>`);
						return r;
					});
				};
			};
			return result;
		});
		return `<span class="${this.classPrefix}">${replaceText}</span>`;
	};
	parser(code, option){
		if(code){
			this.classPrefix = option.classPrefix;
			code.querySelectorAll("p").forEach(item => {
				item.innerHTML = this.replaceCode(item.innerHTML);
			});
		};
	};
};
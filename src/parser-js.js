module.exports = class ParserJS{
	constructor(){
		this.jsReg = [
			{
				type : "multiLineComment",
				name : "comment",
				reg : /(\/\*[^(?:\*\/)]*)|([^(?:\/\*)]*\*\/)/g
			},
			{
				type : "singleLineComment",
				name : "comment",
				reg : /(^\/{2}.*)\n?/g
			},
			{
				type : "scriptString",
				name : "string",
				reg : /(\"([^\"]*?)\")/g
			},
			{
				type : "scriptNumber",
				name : "number",
				reg : /(\d+|NaN)/g
			},
			{
				type : "scriptBloolean",
				name : "boolean",
				reg : /(true|false)\w?/g
			},
			{
				type : "scriptKeyword",
				name : "keyword",
				reg : /(^(?:\s|\t)?var(?= )|function(?=\()|^let(?=[ ])|^const(?=[ ])|^if(?=[ ]?\()|^forEach(?=[ ]?\()|^for(?=[ ]?\()|\$(?=\(|\.)|[ ]new(?=[ ])|^return(?=[ ])|^get(?=[ ])|^set(?=[ ])|extends|class(?=[ ]?\w+[ ]?{)|typeof(?=[ ]?\()|else(?=[ ]?\{)|undefined(?=[ ])|\w+(?=[ ]?\:)|this(?!\w)|module(?=\.)|exports(?=[ ]?\=))/g
			},
			{
				type : "scriptFunction",
				name : "function",
				reg : /(\w+(?=[ ]?\())/g
			},
			{
				type : "scriptPunctuation",
				name : "spunctuation",
				reg : /(\{|\}|\(|\)|\[|\]|\,|\.|\:|\;)/g
			},
			{
				type : "scriptOperator",
				name : "operator",
				reg : /(\={1,3}(?!\>)|\&{1,2}|\|{1,2}|\<\=|\>\=|\+{1,2}\=?|\-{1,2}\=?|\?{1}|\=\>)/g
			}
		];
		this.multiLineCommentOpen = false;
	};
	replaceCode(regItem, target){
		let t = "";
		target.childNodes.forEach((node, index, array) => {
			if(node.nodeType === 3){
				if(regItem.reg.test(node.textContent)){
					regItem.reg.lastIndex = 0;
					t += node.textContent.replace(regItem.reg, (m, $1, $2) => {
						if($1){
							if(regItem.type === "multiLineComment"){
								this.multiLineCommentOpen = true;
								return `<span class="${this.classPrefix}-comment">${$1}</span>`;
							}else{
								return `<span class="${this.classPrefix}-${regItem.name}">${$1}</span>`;
							};
						}else if($2){
							if(regItem.type === "multiLineComment"){
								if(this.multiLineCommentOpen){
									this.multiLineCommentOpen = false;
									return `<span class="${this.classPrefix}-comment">${$2}</span>`;
								}else{
									return m;
								};
							};
						};
					});
				}else{
					t += this.multiLineCommentOpen && regItem.type === "multiLineComment" ? `<span class="${this.classPrefix}-comment">${node.textContent}</span>` : node.textContent;
				};
			}else{
				t += node.outerHTML;
			};
		});
		target.innerHTML = t;
	};
	parser(code, option){
		if(code){
			this.classPrefix = option.classPrefix;
			code.querySelectorAll("p").forEach((node, idx, arr) => {
				if(node.nodeType == 1){
					node.innerHTML = `<span class="${this.classPrefix}">${node.innerHTML}</span>`;
					this.jsReg.forEach((reg, i, a) => {
						this.replaceCode(reg, node.querySelector(`.${this.classPrefix}`));
					});
				};
			});
		};
	};
};
module.exports = class ParserJS{
	constructor(){
		this.jsReg = [
			{
				type : "multiLineComment",
				name : "skycode_comment",
				reg : /(\/\*[^(?:\*\/)]*)|([^(?:\/\*)]*\*\/)/g
			},
			{
				type : "singleLineComment",
				name : "skycode_comment",
				reg : /(^\/{2}.*)\n?/g
			},
			{
				type : "scriptString",
				name : "skycode_string",
				reg : /(\"([^\"]*?)\")/g
			},
			{
				type : "scriptNumber",
				name : "skycode_number",
				reg : /(\d+|NaN)/g
			},
			{
				type : "scriptBloolean",
				name : "skycode_boolean",
				reg : /(true|false)\w?/g
			},
			{
				type : "scriptKeyword",
				name : "skycode_keyword",
				reg : /(^(?:\s|\t)?var(?= )|function(?=\()|^let(?=[ ])|^const(?=[ ])|^if(?=[ ]?\()|^forEach(?=[ ]?\()|^for(?=[ ]?\()|\$(?=\(|\.)|[ ]new(?=[ ])|^return(?=[ ])|^get(?=[ ])|^set(?=[ ])|extends|class(?=[ ]?\w+[ ]?{)|typeof(?=[ ]?\()|else(?=[ ]?\{)|undefined(?=[ ])|\w+(?=[ ]?\:)|this(?!\w)|module(?=\.)|exports(?=[ ]?\=))/g
			},
			{
				type : "scriptFunction",
				name : "skycode_function",
				reg : /(\w+(?=[ ]?\())/g
			},
			{
				type : "scriptPunctuation",
				name : "skycode_punctuation",
				reg : /(\{|\}|\(|\)|\[|\]|\,|\.|\:|\;)/g
			},
			{
				type : "scriptOperator",
				name : "skycode_operator",
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
								return `<span class="skycode_comment">${$1}</span>`;
							}else{
								return `<span class="${regItem.name}">${$1}</span>`;
							};
						}else if($2){
							if(regItem.type === "multiLineComment"){
								if(this.multiLineCommentOpen){
									this.multiLineCommentOpen = false;
									return `<span class="skycode_comment">${$2}</span>`;
								}else{
									return m;
								};
							};
						};
					});
				}else{
					t += this.multiLineCommentOpen && regItem.type === "multiLineComment" ? `<span class="skycode_comment">${node.textContent}</span>` : node.textContent;
				};
			}else{
				t += node.outerHTML;
			};
		});
		target.innerHTML = t;
	};
	parser(code){
		if(code){
			code.querySelectorAll("p").forEach((node, idx, arr) => {
				if(node.nodeType == 1){
					node.innerHTML = `<span class="skycode_script">${node.innerHTML}</span>`;
					this.jsReg.forEach((reg, i, a) => {
						this.replaceCode(reg, node.querySelector(".skycode_script"));
					});
				};
			});
		};
	};
};
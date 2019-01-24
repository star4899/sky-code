module.exports = class ParserJS{
	constructor(){
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
};
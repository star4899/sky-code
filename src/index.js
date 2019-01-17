(function(w, d){

	const attrReg = /( [a-z\-]+)\=\"(.*?)\"/gi;
	const tagOpen = /&lt;(\/)?([a-z0-9]*)/gi;
	const tagClose = /(&gt;)/gi;
	const multiLineCommentStart = /^(\&lt;!--.*|\/\*.*)/gi;
	const multiLineCommentEnd = /(.*--&gt;|\*\/)$/gi;
	const singleLineComment = /(^\/{2}.*)\n?/g;
	const htmlLine = /(&lt;\/?[a-z].*[^\-]&gt;)( *\<)?/gi;
	const docType = /(^&lt;\!doctype.*&gt;$)/gi

	const regGroup = {
		js : [
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
				reg : /(^var(?= )|function(?=\()|^let(?=[ ])|^const(?=[ ])|^if(?=[ ]?\()|^forEach(?=[ ]?\()|^for(?=[ ]?\()|\$(?=\(|\.)|[ ]new(?=[ ])|^return(?=[ ])|^get(?=[ ])|^set(?=[ ])|extends|class(?=[ ]?\w+[ ]?{)|typeof(?=[ ]?\()|else(?=[ ]?\{)|undefined(?=[ ])|\w+(?=[ ]?\:)|this(?!\w)|module(?=\.)|exports(?=[ ]?\=))/g
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
			},
		],
		html : [],
		css : []
	};
	function replaceTarget(ragObj, target){
		let t = "";
		target.childNodes.forEach((item, i, a) => {
			ragObj.reg.lastIndex = 0;
			if(item.nodeType === 3){
				if(ragObj.reg.test(item.textContent)){
					t += item.textContent.replace(ragObj.reg, `<span class="${ragObj.name}">$1</span>`);
				}else{
					t += item.textContent;
				};
			}else{
				t += item.outerHTML;
			};
		});
		target.innerHTML = t;
	};
	d.querySelectorAll(".code_box").forEach((item, index, arry) => {
		item.querySelector("code").childNodes.forEach((t, i, a) => {
			if(t.nodeType == 1){
				t.className = `${t.className} skycode_tag`;
				t.innerHTML = `<span class="skycode_script">${t.innerHTML}</span>`;
				regGroup.js.forEach((obj) => {
					replaceTarget(obj, t.querySelector(".skycode_script"));
				});
			};
		});
	});
})(window, document);
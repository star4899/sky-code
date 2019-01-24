module.exports = {
	script : [
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
	]
};
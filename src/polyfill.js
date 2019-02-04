module.exports.forEach = () => {
	if(window.NodeList && !NodeList.prototype.forEach){
		NodeList.prototype.forEach = (callback, thisArg) => {
			thisArg = thisArg || window;
			for(var i = 0; i < this.length; i++){
				callback.call(thisArg, this[i], i, this);
			};
		};
	}
};
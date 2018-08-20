var XmlDoc = require('xmldoc').XmlDocument;

var secondsToTimestamp = function (seconds) {
	var extraSeconds = seconds % 60;
	var minutes = (seconds - extraSeconds) / 60;
	var extraMinutes = minutes % 60;
	var hours = (minutes - extraMinutes) / 60;

	var timestamp = "";
	if (hours > 0) {
		timestamp += hours + ":";
	}
	if (hours > 0 && extraMinutes < 10) {
		timestamp += "0" + extraMinutes + ":";
	} else {
		timestamp += extraMinutes + ":";
	}
	if (extraSeconds < 10) {
		timestamp += "0" + extraSeconds;
	} else {
		timestamp += "" + extraSeconds;
	}

	return timestamp;
};

var VlcStatus = function(xmlString) {
	var doc = new XmlDoc(xmlString);
	this.fullscreen = doc.valueWithPath("fullscreen");
	this.aspectRatio = doc.valueWithPath("aspectratio");
	this.time = doc.valueWithPath("time");
	this.timeDisplay = secondsToTimestamp(this.time);
	this.volume = ((doc.valueWithPath("volume") * 200) / 512).toFixed(0);
	this.duration = doc.valueWithPath("length");
	this.durationDisplay = secondsToTimestamp(this.duration);
	this.currentId =  doc.valueWithPath("currentplid");
	this.loop = doc.valueWithPath("loop");
	this.state = doc.valueWithPath("state");
	this.repeat = doc.valueWithPath("repeat");
	this.random = doc.valueWithPath("random");
	this.rate = doc.valueWithPath("rate");
	this.position = doc.valueWithPath("position");
	//console.log(doc.descendantWithPath("information").childWithAttribute("name","meta").childWithAttribute("name","title"))
	if(doc.descendantWithPath("information").childWithAttribute("name","meta").childWithAttribute("name","title")){
		this.title=doc.descendantWithPath("information").childWithAttribute("name","meta").childWithAttribute("name","title").val;
	}else{
		if (doc.descendantWithPath("information").childWithAttribute("name", "meta").childWithAttribute("name", "filename").val){
			this.title=doc.descendantWithPath("information").childWithAttribute("name", "meta").childWithAttribute("name", "filename").val;
		}else{
			this.title="Unknown"
		}
	}
	if(doc.descendantWithPath("information").childWithAttribute("name","meta").childWithAttribute("name","artist")){
		this.artist=doc.descendantWithPath("information").childWithAttribute("name","meta").childWithAttribute("name","artist").val;
	}else{
		this.artist="Unknown Artist"
	}
	if(doc.descendantWithPath("information").childWithAttribute("name","meta").childWithAttribute("name","album")){
		this.album=doc.descendantWithPath("information").childWithAttribute("name","meta").childWithAttribute("name","album").val;
	}else{
		this.album="Unknown Album"
	}
	this.filename = doc.descendantWithPath("information")
						.childWithAttribute("name", "meta")
						.childWithAttribute("name", "filename").val;
	this.isVideo = !!this.filename.match(/^.*\.(avi|AVI|wmv|WMV|flv|FLV|mpg|MPG|mp4|MP4)$/)
};

module.exports = VlcStatus;

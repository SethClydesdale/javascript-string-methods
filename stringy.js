// Method to encode a text string as hex
// 'Seth'.toHex(); returns '53657468'
String.prototype.toHex = function() {
  for (var i = 0, j = this.length, $ = ''; i<j; i++) $ += this.charCodeAt(i).toString(16);
  return $;
};


// Method to decode a hex string as text
// '53657468'.fromHex(); returns 'Seth'
String.prototype.fromHex = function() {
  for (var i = 0, j = this.length, $ = ''; i<j; i+=2) $ += String.fromCharCode(parseInt(this[i] + this[i+1], 16));
  return $;
};


// Method to reverse a string so that it's backwards. Use the same method on a backwards string so that it's readable.
// 'Hello world !'.mirror(); returns '! dlrow olleH'.mirror(); returns 'Hello world !'
String.prototype.mirror = function() {
  for (var i = this.length - 1, $ = ''; i > -1; i--) $ += this[i];
  return $;
};


// Method to trim whitespace from the beginning and end of a string on naughty browsers
// '  Hello world !  '.protoTrim(); returns 'Hello world !'
// You can also pass along "left" or "right" as an argument to trim a specific side of a string
String.prototype.protoTrim = function(param) {
  var reg = /^\s+|\s+$/g;
  
  if (param) {
    param = param.toLowerCase();
    
    switch (param) {
      case 'left' :
        reg = /^\s+/;
        break;
      
      case 'right' :
        reg = /\s+$/;
        break;
    }
  }
  
  return this.replace(reg, ''); 
};


// Method to convert a string to a DOM node
// The default element is <P>, but you can change this by passing along a tagname as the argument
// 'Hello world !'.toNode('STRONG');
String.prototype.toNode = function(tag) {
  var $ = document.createElement(tag ? tag : 'P');
  $.innerHTML = this;
  return $;
};


// Method to convert a string to a text node
// 'Hello world !'.toTextNode();
String.prototype.toTextNode = function() {
  return document.createTextNode(this);
};

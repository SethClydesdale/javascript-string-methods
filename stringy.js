/*
 * PROTOSTRING
 * https://github.com/SethClydesdale/protostring
 * Miscellaneous prototype methods for manipulating JavaScript text strings
 */

/* !--- CONVERSION METHODS ---! */

// Method to encode a text string as hex
// 'Seth'.toHex(); returns '53 65 74 68'
String.prototype.toHex = function() {
  for (var i = 1, j = this.length, $ = this.charCodeAt(0).toString(16); i<j; i++) $ += ' ' + this.charCodeAt(i).toString(16);
  return $;
};


// Method to decode a hex string as text
// '53 65 74 68'.fromHex(); returns 'Seth'
String.prototype.fromHex = function() {
  for (var hex = this.split(' '), i = 0, $ = '', h; h = hex[i]; i++) $ += String.fromCharCode(parseInt(h, 16));
  return $;
};


// Method to encode a string as a series of bits
// 'Seth'.toBinary(); returns '1010011 1100101 1110100 1101000'
String.prototype.toBinary = function() {
  for (var i = 1, j = this.length, $ = this.charCodeAt(0).toString(2); i<j; i++) $ += ' ' + this.charCodeAt(i).toString(2);
  return $;
};

// Method to decode a string of bits
// '1010011 1100101 1110100 1101000'.fromBinary(); returns 'Seth'
String.prototype.fromBinary = function() {
  for (var bits = this.split(' '), i = 0, $ = '', b; b = bits[i]; i++) $ += String.fromCharCode('0b' + b);
  return $;
};


/* !--- MISCELLANEOUS METHODS ---! */

// Method to reverse a string so that it's backwards. Use the same method on a backwards string so that it's readable.
// 'Hello world !'.mirror(); returns '! dlrow olleH'.mirror(); returns 'Hello world !'
String.prototype.mirror = function() {
  for (var i = this.length - 1, $ = ''; i > -1; i--) $ += this[i];
  return $;
};


// Method to capitalize the first letter of each word
// 'hello world !'.capitalize(); returns 'Hello World !'
String.prototype.capitalize = function() {
  return this.replace(/(^|\s)([a-z])/gm, function(M, $1, $2) {
    return $1 + $2.toUpperCase();
  });
};


/* !--- REMAKES OF EXISTING METHODS ---! */

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


/* !--- DOM NODE METHODS ---! */

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

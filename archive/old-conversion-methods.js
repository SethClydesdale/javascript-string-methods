/*
 * PROTOSTRING
 * https://github.com/SethClydesdale/protostring
 * Old methods for encoding and decoding encoded text strings
 * Saved in the archive for reference !
 */

/* !--- CONVERSION METHODS ---! */

// Method to encode a text string as decimal
// 'Seth'.toDecimal(); returns '83 101 116 104'
String.prototype.toDecimal = function() {
  for (var i = 1, j = this.length, $ = this.charCodeAt(0); i<j; i++) $ += ' ' + this.charCodeAt(i);
  return $;
};


// Method to decode a decimal string
// '83 101 116 104'.fromDecimal(); returns 'Seth'
String.prototype.fromDecimal = function() {
  for (var dec = this.split(' '), i = 0, $ = '', d; d = dec[i]; i++) $ += String.fromCharCode(d);
  return $;
};


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


// Method to convert a string of characters into HTML entities
// 'Seth'.toEntity(); returns '&#83;&#101;&#116;&#104;'
String.prototype.toEntity = function() {
  for (var i = 0, j = this.length, $ = ''; i<j; i++) $ += '&#' + this.charCodeAt(i) + ';';
  return $;
};


// Method to convert a string of HTML entities into text
// '&#83;&#101;&#116;&#104;'.fromEntity(); returns 'Seth'
// !! Currently only decodes entity numbers, not names
String.prototype.fromEntity = function() {
  return this.replace(/&#(\d+);/g, function(M, $1) {
    return String.fromCharCode($1);
  });
};

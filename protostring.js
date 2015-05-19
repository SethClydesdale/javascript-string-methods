/*
 * PROTOSTRING
 * https://github.com/SethClydesdale/protostring
 * Miscellaneous prototype methods for manipulating JavaScript text strings
 */

/* !--- CONVERSION METHODS ---! */

// Method to encode a text string as : decimal, hex, binary, or HTML entity
// 'Hello'.encodeAs('decimal'); // returns '72 101 108 108 111'
// 'Hello'.encodeAs('hex'); // returns '48 65 6c 6c 6f'
// 'Hello'.encodeAs('binary'); // returns '1001000 1100101 1101100 1101100 1101111'
// '&$♥♦♣'.encodeAs('entity'); // returns '&#38;&#36;&#9829;&#9830;&#9827;'
String.prototype.encodeAs = function(type) {
  !type && (type = 'decimal');
  
  var i = 1, j = this.length, $ = this.charCodeAt(0), $1 = ' ', $2 = '', n;
  
  switch (type.toLowerCase()) {
    case 'decimal' :
      break;
      
    case 'hex' :
      n = 16;
      $ = $.toString(n);
      break;
      
    case 'binary' :
      n = 2;
      $ = $.toString(n);
      break;
      
    case 'entity' :
      i = 0;
      $ = '';
      $1 = '&#';
      $2 = ';';
      break;
  }
  
  for (; i<j; i++) $ += $1 + this.charCodeAt(i).toString(n) + $2;
  
  return $;
};


// Method to decode a text string encoded as : decimal, hex, binary, or HTML entity
// '72 101 108 108 111'.decodeAs('decimal'); // returns 'Hello'
// '48 65 6c 6c 6f'.decodeAs('hex'); // returns 'Hello'
// '1001000 1100101 1101100 1101100 1101111'.decodeAs('binary'); // returns 'Hello'
// '&#38;&#36;&#9829;&#9830;&#9827;'.decodeAs('entity'); // returns '&$♥♦♣'
String.prototype.decodeAs = function(type) {
  !type && (type = 'decimal');
  type = type.toLowerCase();
  
  if (type != 'entity') {
    for (var str = this.split(' '), i = 0, $ = '', S; S = str[i]; i++) {
      switch (type) {
        case 'decimal' :
          break;
          
        case 'hex' :
          S = parseInt(S, 16);
          break
          
        case 'binary' :
          S = '0b' + S;
          break;
      }
      
      $ += String.fromCharCode(S);
    }
    return $;
  } else return this.replace(/&#(\d+);/g, function(M, $1) {
    return String.fromCharCode($1);
  });
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

/*
 * PROTOSTRING
 * https://github.com/SethClydesdale/protostring
 * A library of methods that extend upon the JavaScript String Object
 */

/* !--- CONVERSION METHODS ---! */

// Method to encode a text string as : decimal, hex, binary, or HTML entity
// 'Hello'.encodeAs('decimal'); // returns '72 101 108 108 111'
// 'Hello'.encodeAs('hex'); // returns '48 65 6c 6c 6f'
// 'Hello'.encodeAs('binary'); // returns '1001000 1100101 1101100 1101100 1101111'
// '&$♥♦♣'.encodeAs('entity'); // returns '&#38;&#36;&#9829;&#9830;&#9827;'
String.prototype.encodeAs = function(type) {
  type = type ? type.toLowerCase() : 'decimal';
  
  var i = 1, j = this.length, $ = this.charCodeAt(0), $1 = ' ', $2 = '', n;
  switch (type) {
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
      
    default :
      throw new ReferenceError('"' + type + '" is not an encoding method\n@https://github.com/SethClydesdale/protostring/wiki/ProtoString-encodeAs%28%29-Method');
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
  type = type ? type.toLowerCase() : 'decimal';
  
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
          
        default :
          throw new ReferenceError('"' + type + '" is not a decoding method\n@https://github.com/SethClydesdale/protostring/wiki/ProtoString-decodeAs%28%29-Method');
      }
      
      $ += String.fromCharCode(S);
    }
    return $;
  } else return this.replace(/&#(\d+);/g, function(M, $1) {
    return String.fromCharCode($1);
  });
};


// Method to convert Alphanumerics into Enclosed Alphanumerics
// 'Coffee'.toEnclosed(); // returns 'Ⓒⓞⓕⓕⓔⓔ'
String.prototype.toEnclosed = function() {
  for (var i = 0, $ = '', S; S = this[i]; i++) {
    S = S.charCodeAt(0);
    
    if (S > 64 && S < 91) S = 9398 + Math.abs(65 - S);
    else if (S > 96 && S < 123) S = 9424 + Math.abs(97 - S);
    else if (S > 48 && S < 58) S = 9312 + Math.abs(49 - S);
    else if (S == 48) S = 9450;
    
    $ += String.fromCharCode(S);
  }
  return $;
};


/* !--- CASE METHODS ---! */

// Method to capitalize the character of a string and lowercase the rest
// 'coffee TIME'.capitalize(); // returns 'Coffee time'
String.prototype.capitalize = function(keepCase) {
  return this[0].toUpperCase() + (keepCase ? this : this.toLowerCase()).slice(1);
};


// Method to convert a string to camel case
// 'To camel case'.toCamelCase(); // returns 'toCamelCase'
String.prototype.toCamelCase = function(upper) {
  for (var i = 0, $ = '', W = false, S; S = this[i]; i++) {
    if (/[A-Z]/i.test(S)) {
      switch (W) {
        case false :
          $ += S;
          break;
        
        case true :
          $ += S.toUpperCase();
          W = false;
          break;
      }
    } else if (/\s/.test(S)) W = true;
  }
  
  $ = (upper ? $[0].toUpperCase() : $[0].toLowerCase()) + $.slice(1);
  
  return $;
};


// Method to capitalize the first word of every newline and new sentence
// 'sentence one. sentence two.'.capitalize(); // returns 'Sentence one. Sentence two.'
String.prototype.toSentenceCase = function() {
  for (var i = 0, N = false, $ = '', S; S = this[i]; i++) {
    if (!N && !/\n|\r|\s/.test(S)) {
      $ += S.toUpperCase();
      N = true;
    } else $ += S;
    
    if (/\n|\r|\.|!|\?/.test(S)) N = false;
  }
  return $;
};


// Method to capitalize the first letter of each word, except for articles, conjunctions, and prepositions.
// 'the wizard of oz'.toTitleCase(); // returns 'The Wizard of Oz'
String.prototype.toTitleCase = function(ignore) {
  for (var i = 1, $ = this[0].toUpperCase(), W = false, S; S = this[i]; i++) {
    switch (W) {
      case false :
        $ += S;
        break;
        
      case true :
        $ += S.toUpperCase();
        W = false;
        break;
    }
    if (/\s/.test(S)) W = true;
  }
  
  if (ignore) return $;
  else return $.replace(/\s(a|about|above|across|against|along|also|although|among|an|and|around|at|because|before|behind|below|beneath|beside|between|beyond|but|by|down|during|either|except|for|from|in|inside|into|like|near|neither|nor|not|of|off|on|only|or|since|the|through|to|toward|under|unless|until|up|upon|while|with|within)(?=\s)/ig, function(M, $1) {
    return ' ' + $1.toLowerCase();
  });
};


/* !--- MISCELLANEOUS METHODS ---! */

// Function to produce a range of characters in the following types : string, array, and object
// String.charRange('A', 'Z'); // returns 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
// String.charRange('0', '9', 'array'); // returns [0,1,2,3,4,5,6,7,8,9]
// String.charRange('A', 'F', 'object'); // returns {u65:'A',u66:'B',u67:'C',u68:'D',u69:'E',u70:'F'}
String.charRange = function(alpha, omega, type) {
  var $, $1;
  alpha = alpha ? alpha.charCodeAt(0) : 0;
  omega = omega ? omega.charCodeAt(0) + 1 : 65536;
  type = type ? type.toLowerCase() : 'string';
  
  if (alpha > omega) {
    $1 = ++alpha;
    alpha = --omega;
    omega = $1;
  }
  
  switch (type) {
    case 'string' :
      for ($ = ''; alpha < omega; alpha++) $ += String.fromCharCode(alpha);
      break;
      
    case 'array' :
      for ($ = [], $1 = 0; alpha < omega; alpha++) $[$1++] = String.fromCharCode(alpha);
      break;
      
    case 'object' :
      for ($ = {}; alpha < omega; alpha++) $['u' + alpha] = String.fromCharCode(alpha);
      break;
      
    default :
      throw new ReferenceError('"' + type + '" is not a supported data type\n@https://github.com/SethClydesdale/protostring/wiki/ProtoString-charRange%28%29-Method');
  }
  
  return $;
};


// Method to calculate the Levenshtein distance between two strings
// 'Kitten'.distance('Sitting'); // returns 3
String.prototype.distance = function(str, i) {
  var a = i ? this.toLowerCase() : this, b = str ? i ? str.toLowerCase() : str : a, i = 0, j = a.length, k = b.length, l = Math.abs(j - k), $ = 0;
  
  if (a == b) return 0;
  if (j > k) j = k;
  for (; i < j; i++) a[i] != b[i] && $++;
  
  return $ + l;
};


// Method to reverse a string so that it's backwards. Use the same method on a backwards string so that it's readable.
// 'Hello world !'.mirror(); returns '! dlrow olleH'.mirror(); returns 'Hello world !'
String.prototype.mirror = function() {
  for (var i = this.length - 1, $ = ''; i > -1; i--) $ += this[i];
  return $;
};


/* !--- POLYFILL METHODS ---! */

// Method to repeat a string
// 'Ho'.protoRepeat(3, '-'); // returns 'Ho-Ho-Ho'
String.prototype.protoRepeat = function(count, separator) {
  count = count ? Math.floor(count) : 0;
  separator = separator ? separator : '';
  
  if (count == Infinity || count * this.length > 1<<28) throw new RangeError('Repeat count must be less than Infinity, and not exceed maximum string length\n@https://github.com/SethClydesdale/protostring/wiki/ProtoString-protoRepeat%28%29-Method');
  for (var i = 1, $ = this; i < count; i++) $ += separator + this;
  
  return $;
};


// Method to trim whitespace from the beginning and end of a string on naughty browsers
// '  Hello world !  '.protoTrim(); returns 'Hello world !'
// You can also pass along "left" or "right" as an argument to trim a specific side of a string
String.prototype.protoTrim = function(param) {
  param = param ? param.toLowerCase() : 'both';
  
  switch (param) {
    case 'both' :
      param = /^\s+|\s+$/g;
      break
    
    case 'left' :
      param = /^\s+/;
      break;
      
    case 'right' :
      param = /\s+$/;
      break;
        
    default :
      throw new ReferenceError('"' + param + '" is not a trimming method\n@https://github.com/SethClydesdale/protostring/wiki/ProtoString-protoTrim%28%29-Method');
  }
  
  return this.replace(param, ''); 
};


/* !--- DOM NODE METHODS ---! */

// Method to clean a string of text so that it can be used as an ID
// Filters out invalid characters, keeps case, and ensures the ID starts with a character if it doesn't
// 'my identifier!'.cleanId(); // returns 'my-identifier'
String.prototype.cleanId = function() {
  for (var i = 0, $ = '', S; S = this[i]; i++) {
    if (/\s/.test(S)) $ += '-';
    else if (/[0-9A-Z\-_]/i.test(S)) $ += S;
  }
  
  if (/[0-9\-_]/.test($[0])) $ = 'id-' + $; 
  
  return $;
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

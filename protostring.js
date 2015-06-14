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
      throw new TypeError('"' + type + '" is not an encoding method');
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
          break;
          
        case 'binary' :
          S = '0b' + S;
          break;
          
        default :
          throw new TypeError('"' + type + '" is not a decoding method');
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


// Method to convert accented and some special characters to basic latin
// 'Crème à l\'Orange'.toLatin(); // returns 'Creme a l'Orange'
String.prototype.toLatin = function() {
  for (var i = 0, j = this.length, $ = '', S; i < j; i++) {
    S = this[i];

    // uppercase characters
    if (/[ÁĂẮẶẰẲẴǍÂẤẬẦẨẪÄǞȦǠẠȀÀẢȂĀĄÅǺḀȺÃⱯᴀ]/.test(S)) S = 'A';
    else if ('Ꜳ' == S) S = 'AA';
    else if (/[ÆǼǢᴁ]/.test(S)) S = 'AE';
    else if ('Ꜵ' == S) S = 'AO';
    else if ('Ꜷ' == S) S = 'AU';
    else if (/[ꜸꜺ]/.test(S)) S = 'AV'
    else if ('Ꜽ' == S) S = 'AY';
    else if (/[ḂḄƁḆɃƂʙᴃ]/.test(S)) S = 'B';
    else if (/[ĆCČCÇCḈCĈCĊCƇCȻCꜾᴄ]/.test(S)) S = 'C';
    else if (/[ĎḐḒḊḌƊḎǲǅĐƋꝹᴅ]/.test(S)) S = 'D';
    else if (/[ǱǄ]/.test(S)) S = 'DZ';
    else if (/[ÉĔĚȨḜÊẾỆỀỂỄḘËĖẸȄÈẺȆĒḖḔĘɆẼḚƐƎᴇⱻ]/.test(S)) S = 'E';
    else if ('Ꝫ' == S) S = 'ET';
    else if (/[ḞƑꝻꜰ]/.test(S)) S = 'F';
    else if (/[ǴĞǦĢĜĠƓḠǤꝽɢʛ]/.test(S)) S = 'G';
    else if (/[ḪȞḨĤⱧḦḢḤĦʜ]/.test(S)) S = 'H';
    else if (/[ÍIĬIǏIÎIÏIḮIİIỊIȈIÌIỈIȊIĪIĮIƗIĨIḬIɪ]/.test(S)) S = 'I';
    else if ('Ĳ' == S) S = 'IJ';
    else if ('Ꝭ' == S) S = 'IS';
    else if (/[ĴɈᴊ]/.test(S)) S = 'J';
    else if (/[ḰǨĶⱩꝂḲƘḴꝀꝄᴋ]/.test(S)) S = 'K';
    else if (/[ĹȽĽĻḼḶḸⱠꝈḺĿⱢǈŁꞀʟᴌ]/.test(S)) S = 'L';
    else if ('Ǉ' == S) S = 'LJ';
    else if (/[ḾṀṂⱮƜᴍ]/.test(S)) S = 'M';
    else if (/[ŃŇŅṊṄṆǸƝṈȠǋÑɴᴎ]/.test(S)) S = 'N';
    else if ('Ǌ' == S) S = 'NJ';
    else if (/[ÓŎǑÔỐỘỒỔỖÖȪȮȰỌŐȌÒỎƠỚỢỜỞỠȎꝊꝌŌṒṐƟǪǬØǾÕṌṎȬƆᴏᴐ]/.test(S)) S = 'O';
    else if (/[Œɶ]/.test(S)) S = 'OE';
    else if ('Ƣ' == S) S = 'OI';
    else if ('Ꝏ' == S) S = 'OO';
    else if (/[Ȣᴕ]/.test(S)) S = 'OU';
    else if (/[ṔṖꝒƤꝔⱣꝐᴘ]/.test(S)) S = 'P';
    else if (/[ꝘꝖ]/.test(S)) S = 'Q';
    else if (/[ŔŘŖṘṚṜȐȒṞɌⱤꞂʁʀᴙᴚ]/.test(S)) S = 'R';
    else if (/[ŚṤŠṦŞŜȘṠṢṨꞄꜱ]/.test(S)) S = 'S';
    else if ('ẞ' == S) S = 'SS';
    else if (/[ꞆŤŢṰȚȾṪṬƬṮƮŦᴛ]/.test(S)) S = 'T';
    else if ('Ꜩ' == S) S = 'TZ';
    else if (/[ÚŬǓÛṶÜǗǙǛǕṲỤŰȔÙỦƯỨỰỪỬỮȖŪṺŲŮŨṸṴᴜ]/.test(S)) S = 'U';
    else if (/[ɅꝞṾƲṼᴠ]/.test(S)) S = 'V';
    else if ('Ꝡ' == S) S = 'VY';
    else if (/[ẂŴẄẆẈẀⱲᴡ]/.test(S)) S = 'W';
    else if (/[ẌẊ]/.test(S)) S = 'X';
    else if (/[ÝŶŸẎỴỲƳỶỾȲɎỸʏ]/.test(S)) S = 'Y';
    else if (/[ŹŽẐⱫŻẒȤẔƵᴢ]/.test(S)) S = 'Z';
    
    // lowercase characters
    else if (/[áăắặằẳẵǎâấậầẩẫäǟȧǡạȁàảȃāąᶏẚåǻḁⱥãɐₐ]/.test(S)) S = 'a';
    else if ('ꜳ' == S) S = 'aa';
    else if (/[æǽǣᴂ]/.test(S)) S = 'ae';
    else if ('ꜵ' == S) S = 'ao';
    else if ('ꜷ' == S) S = 'au';
    else if (/[ꜹꜻ]/.test(S)) S = 'av';
    else if ('ꜽ' == S) S = 'ay';
    else if (/[ḃḅɓḇᵬᶀƀƃ]/.test(S)) S = 'b';
    else if (/[ćčçḉĉɕċƈȼↄꜿ]/.test(S)) S = 'c';
    else if (/[ďḑḓȡḋḍɗᶑḏᵭᶁđɖƌꝺ]/.test(S)) S = 'd';
    else if (/[ǳǆ]/.test(S)) S = 'dz';
    else if (/[éĕěȩḝêếệềểễḙëėẹȅèẻȇēḗḕⱸęᶒɇẽḛɛᶓɘǝₑ]/.test(S)) S = 'e';
    else if ('ꝫ' == S) S = 'et';
    else if (/[ḟƒᵮᶂꝼ]/.test(S)) S = 'f';
    else if ('ﬀ' == S) S = 'ff';
    else if ('ﬁ' == S) S = 'fi';
    else if ('ﬂ' == S) s = 'fl';
    else if ('ﬃ' == S) S = 'ffi';
    else if ('ﬄ' == S) S = 'ffl';
    else if (/[ǵğǧģĝġɠḡᶃǥᵹᵷɡ]/.test(S)) S = 'g';
    else if (/[ḫȟḩĥⱨḧḣḥɦẖħɥʮʯ]/.test(S)) S = 'h';
    else if ('ƕ' == S) S = 'hv';
    else if (/[ıíĭǐîïḯịȉìỉȋīįᶖɨĩḭᴉᵢ]/.test(S)) S = 'i';
    else if ('ĳ' == S) S = 'ij';
    else if ('ꝭ' == S) S = 'is';
    else if (/[ȷɟʄǰĵʝɉⱼ]/.test(S)) S = 'j';
    else if (/[ḱǩķⱪꝃḳƙḵᶄꝁꝅʞ]/.test(S)) S = 'k';
    else if (/[ĺƚɬľļḽȴḷḹⱡꝉḻŀɫᶅɭłꞁ]/.test(S)) S = 'l';
    else if ('ǉ' == S) S = 'lj';
    else if (/[ḿṁṃɱᵯᶆɯɰ]/.test(S)) S = 'm';
    else if (/[ńňņṋȵṅṇǹɲṉƞᵰᶇɳñ]/.test(S)) S = 'n';
    else if ('ǌ' == S) S = 'nj';
    else if (/[ɵóŏǒôốộồổỗöȫȯȱọőȍòỏơớợờởỡȏꝋꝍⱺōṓṑǫǭøǿõṍṏȭɔᶗᴑᴓₒ]/.test(S)) S = 'o';
    else if (/[ᴔœ]/.test(S)) S = 'oe';
    else if ('ƣ' == S) S = 'oi';
    else if ('ꝏ' == S) S = 'oo';
    else if ('ȣ' == S) S = 'ou';
    else if (/[ṕṗꝓƥᵱᶈꝕᵽꝑ]/.test(S)) S = 'p';
    else if (/[ꝙʠɋꝗ]/.test(S)) S = 'q';
    else if (/[ꞃŕřŗṙṛṝȑɾᵳȓṟɼᵲᶉɍɽɿɹɻɺⱹᵣ]/.test(S)) S = 'r';
    else if (/[ꞅſẜẛẝśṥšṧşŝșṡṣṩʂᵴᶊȿ]/.test(S)) S = 's';
    else if ('ß' == S) S = 'ss';
    else if ('ﬆ' == S) S = 'st';
    else if (/[ťţṱțȶẗⱦṫṭƭṯᵵƫʈŧʇꞇ]/.test(S)) S = 't';
    else if ('ᵺ' == S) S = 'th';
    else if ('ꜩ' == S) S = 'tz';
    else if (/[ᴝúŭǔûṷüǘǚǜǖṳụűȕùủưứựừửữȗūṻųᶙůũṹṵᵤ]/.test(S)) S = 'u';
    else if ('ᵫ' == S) S = 'ue';
    else if ('ꝸ' == S) S = 'um';
    else if (/[ʌⱴꝟṿʋᶌⱱṽᵥ]/.test(S)) S = 'v';
    else if ('ꝡ' == S) S = 'vy';
    else if (/[ẃŵẅẇẉẁⱳẘʍ]/.test(S)) S = 'w';
    else if (/[ẍẋᶍₓ]/.test(S)) S = 'x';
    else if (/[ʎýŷÿẏỵỳƴỷỿȳẙɏỹ]/.test(S)) S = 'y';
    else if (/[źžẑʑⱬżẓȥẕᵶᶎʐƶɀ]/.test(S)) S = 'z';
    
    $ += S;
  }
  
  return $;
};


// Method to convert a String literal into an Object
// 'Hi'.toObject() // returns { 0:'H', 1:'i', length:2, toString:func() }
String.prototype.toObject = function() {
  var i = 0, j = this.length,
      $ = {
        length : j,
        toString : function() {
          var i, $ = '';
          for (i in this) $ += /\d+/.test(i) ? this[i] : '';
          return $;
        }
      };
  
  for (; i < j; i++) $[i] = this.charAt(i);
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
      $ += W ? S.toUpperCase() : S;
      W = false;
    } else if (/\s|\n|\r|_|-/.test(S)) W = true;
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


// Method to change the casing of a string to snake_case
// 'To Snake Case'.toSnakeCase(); // returns 'to_snake_case'
String.prototype.toSnakeCase = function(upper) {
  for (var i = 0, $ = '', S; S = this[i]; i++) $ += /[A-Z]/i.test(S) ? S : /\s|\n|\r|-|_/.test(S) ? '_' : '';
  $ = upper ? $.toUpperCase() : $.toLowerCase();
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
      throw new TypeError('"' + type + '" is not a supported data type');
  }
  
  return $;
};


// Method for checking if a string contains the specified substring
// 'ProtoString'.containsString('String', false, 'end'); // returns true
String.prototype.containsString = function(str, i, at) {
  at = at ? at.toLowerCase() : '';
  return new RegExp((at == 'start' ? '^' : '') + (str ? str : this).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + (at == 'end' ? '$' : ''), i ? 'i' : '').test(this);
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


// Method to number all lines
// 'line 1\nline 2\nline 3'.enumerateLines(); // returns '1. line 1\n2. line 2\n3. line 3'
String.prototype.enumerateLines = function(zero) {
  for (var i = 1, l = zero ? 0 : 1, $ = l + '. ' + this[0], S; S = this[i]; i++) $ += /\n|\r/.test(S) ? S + ++l + '. ' : S;
  return $;
};


// Method to escape regular expression characters
// 'Would you like ${food}?'.escapeRegExp(); // returns 'Would you like \$\{food\}\?'
String.prototype.escapeRegExp = function() {
  for (var i = 0, j = this.length, $ = ''; i < j; i++) $ += (/[.*+?^${}()|[\]\\]/.test(this[i]) ? '\\' : '') + this[i];
  return $;
};


// Method to indent a string with tabs or a specified character
// 'Coffee\nCream\nSugar'.indent(1, '• '); // returns '• Coffee\n• Cream\n• Sugar'
String.prototype.indent = function(amount, spacer) {
  amount = Math.floor(amount) || 1;
  spacer = spacer || '\x09';
  
  if (amount == Infinity) throw new RangeError('The indent amount must be less than Infinity');
  for (var i = 0, j = this.length, tabs = '', $; i < amount; i++) tabs += spacer;
  for (i = 1, $ = tabs + this[0]; i < j; i++) {
    $ += this[i];
    if (/\n|\r/.test(this[i])) $ += tabs;
  }
  
  return $;
};


// Method to pad a string with characters or whitespace
// 'Coffee'.pad(3, '♥', 'both'); // returns '♥♥♥Coffee♥♥♥'
String.prototype.pad = function(n, str, type) {
  n = Math.floor(n) || 1;
  str = str || '\xA0';
  type = type ? type.toLowerCase() : 'right';
  
  for (var i = 0, $ = this; i < n; i++) {
    switch (type) {
      case 'right' :
        $ += str;
        break;
        
      case 'left' :
        $ = str + $;
        break;
        
      case 'both' :
        $ = str + $ + str;
        break;
    }
  }
  
  return $;
};


// Method to return the total amount of words in a string
// 'Coffee is good. :)'.wordCount(); // returns 3
String.prototype.wordCount = function(type) {
  type = type ? type.toLowerCase() : 'number';
  
  var $ = type == 'number' ? 0 : type == 'array' ? [] : {}, i = 0;
  this.replace(/(?:^|\W)(\w+)(?=$|\W)/g, function(M, $1) {
    type == 'number' ? $++ : $[i++] = $1;
  });
  
  if (type == 'object') $.words = i;
  
  return $;
};


// Method to wrap words when they exceed the specified line width
// 'Want to go out for a cup of coffee?'.wordWrap(13, '<br/>'); // returns 'Want to go out <br/>for a cup of <br/>coffee?'
String.prototype.wordWrap = function(width, newline, cut) {
  width = Math.floor(width) || 50;
  newline = newline || '\n';
  
  for (var i = 0, min = 0, j = this.length, $ = ''; i < j; i++) {
    if (++min >= width && (/\W/.test(this[i]) || cut)) {
      $ += cut ? newline + this[i] : this[i] + newline;
      min = 0;
    } else $ += this[i];
  }
  
  return $;
};


// Method to wrap a string with tags or specific characters
// 'Bingo!'.wrap('<strong>'); // returns '<strong>Bingo!</strong>'
String.prototype.wrap = function(alpha, omega) {
  alpha = alpha || '<p>';
  omega = omega ? omega : alpha == '<p>' ? '</p>' : alpha;
  
  // test and clean the end string if it matches an unclosed tag
  if (/<.*?>|\[.*?\]|\{.*?\}/.test(omega) && !/^(?:<|\[\{)\//.test(omega)) {
    omega = omega.replace(/^\s+|\s+$/g, '');
    omega = omega[0] + '/' + omega.slice(1);
    if (/=/.test(omega)) omega = omega.replace(/(?:=.*|\s+.*)(?=>|\]|\})/g, '');
  }
  
  return alpha + this + omega;
};


/* !--- POSITION METHODS ---! */

// Method to reverse a string so that it's backwards. Use the same method on a backwards string so that it's readable.
// 'Hello world !'.mirror(); returns '! dlrow olleH'.mirror(); returns 'Hello world !'
String.prototype.mirror = function() {
  for (var i = this.length - 1, $ = ''; i > -1; i--) $ += this[i];
  return $;
};


// Method to shuffle a string
// 'string'.shuffle(); // returns 'gitsrn'
String.prototype.shuffle = function(n) {
  n = Math.floor(n) || 1;
  
  if (n == Infinity) throw new RangeError('shuffle count must be less than Infinity');
  
  var str = this;
  while (n --> 0) {
    for (var i = 0, $ = '', S; S = str[i]; i++) $ = i % 2 == 0 ? $ + S : S + $;
    str = $;
  }
  
  return $;
};


// Method to unshuffle a shuffled string
// 'gitsrn'.unshuffle(); // returns 'string'
String.prototype.unshuffle = function(n) {
  n = Math.floor(n) || 1;
  
  if (n == Infinity) throw new RangeError('unshuffle count must be less than Infinity');
  
  var str = this;
  while (n --> 0) {
    for (var i = 1, j = str.length, offset = Math.ceil(j / 2) - (j % 2 == 0 ? 0 : 1), $ = str[offset]; i < j; i++) $ += str[offset = i % 2 == 0 ? offset + i : offset - i];
    str = $;
  }
  
  return $;
};


// Method to skip through a string's characters to form a new one
// 'The quick brown fox jumps over the lazy dog'.skip(13); // returns 'Two '
String.prototype.skip = function(n) {
  n = Math.floor(n) || 1;
  for (var i = 0, j = this.length, $ = ''; i < j; i += n) $ += this[i];
  
  return $;
};


/* !--- POLYFILL METHODS ---! */

// Method to repeat a string
// 'Ho'.protoRepeat(3, '-'); // returns 'Ho-Ho-Ho'
String.prototype.protoRepeat = function(count, separator) {
  count = Math.floor(count) || 0;
  separator = separator || '';
  
  if (count == Infinity || count * this.length > 1<<28) throw new RangeError('Repeat count must be less than Infinity, and not exceed maximum string length');
  for (var i = 1, $ = this; i < count; i++) $ += separator + this;
  
  return $;
};


// Method to trim whitespace from the beginning and end of a string on naughty browsers
// '  Hello world !  '.protoTrim(); returns 'Hello world !'
// You can also pass along "left" or "right" as an argument to trim a specific side of a string
String.prototype.protoTrim = function(type) {
  type = type ? type.toLowerCase() : 'both';
  
  switch (type) {
    case 'both' :
      type = /^\s+|\s+$/g;
      break;
    
    case 'left' :
      type = /^\s+/;
      break;
      
    case 'right' :
      type = /\s+$/;
      break;
        
    default :
      throw new TypeError('"' + type + '" is not a trimming method');
  }
  
  return this.replace(type, ''); 
};


// Method to simulate a similar functionality to the ES6 template strings
// 'Hello ${name}, would you like some ${food}?'.template({ name : 'Seth', food : 'coffee' }); // returns 'Hello Seth, would you like some coffee?'
String.prototype.template = function(data) {
  if (typeof data != 'object') throw new TypeError('Template data must be an object');
  
  var $ = this, i;
  for (i in data) $ = $.replace(new RegExp('\\$\\{' + i.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\}', 'gm'), data[i]);
  
  return $;
};


/* !--- DOM NODE METHODS ---! */

// Method to clean a string by removing HTML tags and entities
// '<p>Coffee &amp; Cookies</p>'.cleanHTML(); // returns 'Coffee Cookies'
String.prototype.cleanHTML = function(ignore) {
  return this.replace(new RegExp('<.*?>' + (ignore ? '' : '|&.*?;\\s?'), 'gm'), '');
};


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


// Method to convert newline characters into HTML breaks
// 'Coffee\nCream\nSugar'.newlineToBreak(); // returns 'Coffee<br/>Cream<br/>Sugar'
String.prototype.newlineToBreak = function() {
  for (var i = 0, j = this.length, $ = ''; i < j; i++) $ += /\n|\r/.test(this[i]) ? '<br/>' : this[i];
  return $;
};


// Method to convert a string into an anchor point
// 'my anchor'.toAnchor(); // returns <a href="#my-anchor" id="my-anchor">my anchor</a>
// /!\ Dependent upon the cleanId() method
String.prototype.toAnchor = function(type, id) {
  type = type ? type.toLowerCase() : 'node';
  id = id ? id : this.cleanId();
  
  var $;
  switch (type) {
    case 'node' :
      $ = document.createElement('A');
      $.id = id;
      $.href = '#' + id;
      $.innerHTML = this;
      break;
      
    case 'string' :
      $ = '<a href="#' + id + '" id="' + id + '">' + this + '</a>';
      break;
      
    default :
      throw new TypeError('"' + type + '" is not a supported data type');
  }
  
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

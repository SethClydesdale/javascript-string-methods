# Using the ProtoString Methods
The methods are simple to use as they're an extension of the ``String`` object ! Simply define a variable or write a string literal, then execute the method on it. See the examples below for more information.

1. [Conversion Methods](#conversion)
2. [Miscellaneous Methods](#miscellaneous)
3. [Polyfill Methods](#polyfill)
4. [DOM Node Methods](#dom-nodes)
5. [Information](#information)


## Conversion
These methods are for encoding and decoding encoded text strings.


#### String.prototype.encodeAs(type);

Encodes a string of text as : decimal, hex, binary, and HTML entity numbers.

***type*** : A string that determines the encoding method. Defaults to decimal conversion if left undefined. All possible encoding methods are : 

``'decimal'``

Encodes the string as a series of decimal character numbers.
```javascript
'Hello'.encodeAs('decimal'); // returns '72 101 108 108 111'
```

``'hex'``

Encodes the string as a series of hexadecimal character numbers.
```javascript
'Hello'.encodeAs('hex'); // returns '48 65 6c 6c 6f'
```

``'binary'``

Encodes the string as a series of bits.
```javascript
'Hello'.encodeAs('binary'); // returns '1001000 1100101 1101100 1101100 1101111'
```

``'entity'``

Encodes the string as a series of HTML entity numbers.
```javascript
'&$♥♦♣'.encodeAs('entity'); // returns '&#38;&#36;&#9829;&#9830;&#9827;'
```


#### String.prototype.decodeAs(type);

Decodes an encoded text string into readable text.

***type*** : A string that determines the decoding method. Defaults to decimal conversion if left undefined. All possible decoding methods are : 

``'decimal'``

Decodes a decimal encoded string of text.
```javascript
'72 101 108 108 111'.decodeAs('decimal'); // returns 'Hello'
```

``'hex'``

Decodes a hexadecimal encoded string of text.
```javascript
'48 65 6c 6c 6f'.decodeAs('hex'); // returns 'Hello'
```

``'binary'``

Decodes a binary encoded string of text.
```javascript
'1001000 1100101 1101100 1101100 1101111'.decodeAs('binary'); // returns 'Hello'
```

``'entity'``

Decodes a series of HTML entity numbers.
```javascript
'&#38;&#36;&#9829;&#9830;&#9827;'.decodeAs('entity'); // returns '&$♥♦♣'
```


## Miscellaneous
Miscellaneous methods that do crazy or useful jobs.


#### String.prototype.mirror();

Mirrors a string of text so that it displays backwards. Can be used to unmirror text as well !
```javascript
'Hello world !'.mirror(); // returns '! dlrow olleH'
'! dlrow olleH'.mirror(); // returns 'Hello world !'
```

#### String.prototype.toTitleCase(ignore);

Capitalizes the first letter of every word, except for Articles, Conjunctions, and Prepositions.

***ignore*** : A boolean value specifying that you want to ignore Articles, Conjunctions, and Prepositions. Setting this to ``true`` would return "War of the Worlds" as "War Of The Worlds"

```javascript
'the wizard of oz'.toTitleCase(); // returns 'The Wizard of Oz'
'war of the worlds'.toTitleCase(); // returns 'War of the Worlds'
'snow white and the seven dwarves'.toTitleCase(); // returns 'Snow White and the Seven Dwarves'

// using ignore
'war of the worlds'.toTitleCase(true); // returns 'War Of The Worlds'
```

#### String.prototype.toCamelCase();

Converts a string of text to camelCase, by converting the first letter to lowercase, removing whitespace, and converting letters after whitespace to uppercase. Strips characters that are NOT alphabetical (A-Z and a-z).
```javascript
'To camel case'.toCamelCase(); // returns 'toCamelCase'
```

#### String.prototype.cleanId();

Cleans a string of text so that it can be used as a valid id in an HTML element's attribute, or as a hash in the href attribute.
```javascript
'my identifier!'.cleanId(); // returns 'my-identifier'
```

#### String.charRange(alpha, omega, type);

Produces a range of characters in the form of a ``String``, ``Array``, or ``Object``. This is a static method for ``String``, so it should always be used as ``String.charRange()``.

***alpha*** : A string that determines the starting point of the range. Defaults to character code **0** if left undefined.

***omega*** : A string that determines the ending point of the range. Defaults to character code **65535** if left undefined.

***type*** : A string that determines the type of range returned. This can be : ``'string'``, ``'array'``, or ``'object'``; it always defaults to String if left undefined.

```javascript
// String based range
var alphabet = String.charRange('A', 'Z'); // returns the alphabet 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

// Array based range
// Characters can be iterated or accessed by their index; charArray[0] returns 0
var charArray = String.charRange('0', '9', 'array'); // returns [0,1,2,3,4,5,6,7,8,9]

// Object based range
// Characters can be accessed with their unicode ID; charObject.u65 returns A
var charObject = String.charRange('A', 'F', 'object'); // returns {u65:'A',u66:'B',u67:'C',u68:'D',u69:'E',u70:'F'}
```


## Polyfill
Remakes of existing methods that can be used for bad-apple browsers.


#### String.prototype.protoTrim(param);

Works similar to the native method **String.trim();** by trimming whitespace from the beginning and end of a string. Meant for backwards compatibility.

***param*** : A string specifying where the whitespace should be trimmed. Possible values are **"left"** and **"right"**, leave blank to trim both sides of the string.

```javascript
var str = '    Hello world !    ';
str.protoTrim(); // returns 'Hello world !'
str.protoTrim('left'); // returns 'Hello world !    '
str.protoTrim('right'); // returns '    Hello world !'
```


## DOM Nodes
Methods to convert text strings to DOM nodes. Useless, or not ? You decide !

#### String.prototype.toNode(tag);

Converts a string of text to a DOM node, with the text being the node's innerHTML content.

***tag*** : A string specifiying the tagname of the element that the string will be converted to. Defaults to a ``<P>`` element if left undefined.
```javascript
var str = 'Hello world !';
// 'Hello world !' is set as the innerHTML of the node
document.body.appendChild(str.toNode()); // appends a P node to the body
document.body.appendChild(str.toNode('STRONG')); // appends a STRONG node to the body
```

What's returned is a DOM node, so you can use all ``Node`` methods like usual. Here's another example.
```javascript
var str = 'I\'m STRONG and nobody can beat me !'.toNode('STRONG');
str.id = 'theStrongElementThatCould';
str.style.color = 'red';
document.body.appendChild(str);
```

#### String.prototype.toTextNode();

Converts a string of text into a text node that can be appended to any element. This method makes use of ``document.createTextNode()`` to create a node of text and return it.

```javascript
var str = 'A simple text node !'.toTextNode();
document.body.appendChild(str);
```


## Information
This project is for fun, and aims to provide people with useful or silly methods for the String object. You're free to use any of the methods provided here. If you have any suggestions, feel free to let me know. See you, and have fun maniplating those Strings ! :)

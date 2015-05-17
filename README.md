# Using the ProtoString Methods
The methods are simple to use as they're an extension of the ``String`` object ! Simply define a variable or write a string literal, then execute the method on it. See the examples below for more information.

1. [Conversion Methods](#conversion)
2. [Miscellaneous Methods](#miscellaneous)
3. [Remakes of Existing Methods](#remakes)
4. [DOM Node Methods](#dom-nodes)
5. [Information](#information)


## Conversion
These methods are for encoding and decoding encoded text strings.


#### String.prototype.toDecimal();

Encodes a text string as decimal
```javascript
'Hello world !'.toDecimal(); // returns '72 101 108 108 111 32 119 111 114 108 100 32 33'
```

#### String.prototype.fromDecimal();

Decodes a decimal encoded text string
```javascript
'72 101 108 108 111 32 119 111 114 108 100 32 33'.fromDecimal(); // returns 'Hello world !'
```

#### String.prototype.toHex();

Encodes a text string as hexadecimal
```javascript
'Hello world !'.toHex(); // returns '48 65 6c 6c 6f 20 77 6f 72 6c 64 20 21'
```

#### String.prototype.fromHex();

Decodes a hexadecimal encoded text string
```javascript
'48 65 6c 6c 6f 20 77 6f 72 6c 64 20 21'.fromHex(); // returns 'Hello world !'
```

#### String.prototype.toBinary();

Encodes a string as a series of bits
```javascript
'Seth'.toBinary(); // returns '1010011 1100101 1110100 1101000'
```

#### String.prototype.fromBinary();

Decodes a string of bits
```javascript
'1010011 1100101 1110100 1101000'.fromBinary(); // returns 'Seth'
```


## Miscellaneous
Miscellaneous methods that do crazy or useful jobs.


#### String.prototype.mirror();

Mirrors a string of text so that it displays backwards. Can be used to unmirror text as well !
```javascript
'Hello world !'.mirror(); // returns '! dlrow olleH'
'! dlrow olleH'.mirror(); // returns 'Hello world !'
```

#### String.prototype.capitalize();

Capitalizes the first letter of every word.
```javascript
'my name is seth'.capitalize(); // returns 'My Name Is Seth'
```


## Remakes
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

***tag*** : A string specifiying the tagname of the element that the string will be converted to. If no argument is passed, the string will be converted to a ``<P>`` element.
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

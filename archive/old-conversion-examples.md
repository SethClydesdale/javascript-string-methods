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

#### String.prototype.toEntity();

Converts a text string to a string of HTML entity numbers
```javascript
'&$♥'.toEntity(); // returns '&#38;&#36;&#9829;'
```

#### String.prototype.fromEntity();

Converts a string of HTML entity numbers to text
```javascript
'&#38;&#36;&#9829;'.fromEntity(); // returns '&$♥'
```

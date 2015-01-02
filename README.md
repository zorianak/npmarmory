npmarmory
=========

This gives a utility to import characters from the Armory using
BNet's API. It also has an easy-to-use utility for creating an object
that would be your character's name/realm/etc, stats, and items.

## Usage
========

* var npmarmory = require('npmarmory');
* var importChar = npmarmory.importChar;
* var Char = npmarmory.Char;

Importing uses ajax, so a call would look like this:
    importChar('US', 'Caligraphy', 'Windrunner', function(data) {
        var theChar = data;
        console.log(theChar);
        return theChar;
    });

The gist being that the function(data){} is where the handle results
are dealt with.

Creating a new character is fairly simple, though. Just pass it the data
object from your import - and it then at the end, it retunrs your
char object.
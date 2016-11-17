
// if using Node.js export module
if (typeof exports !== 'undefined' && this.exports !== exports) {
    var Token = require("../scripts/Token.js").Token;
    var TokenAggregate = require("../scripts/TokenAggregate.js").TokenAggregate;
}

/**
 * A MultiwordToken is any token which consists of subtokens
 * For example, a MultiwordToken may represent the following lines in a Conllu file:
 *
 * 2-3  haven't ...
 * 2    have    ...
 * 3    n't     ...
 *
 * @property tokens {Array}
 * The tokens property is the list of subtokens this MultiwordToken is responsible for.
 *
 * @extends Token
 * @inherits TokenAggregate
 *
 * @constructor
 */
var MultiwordToken = function() { //constructor for Multiword Tokens
    Token.call(this); // gives the MWT all the properties created in the Token constructor (note: not token prototype)
    this.tokens = []; // creates the array that contains the children of the MWT
    TokenAggregate.call(this,'tokens'); //gives the MWT all the properties created in the TA constructor
};
MultiwordToken.prototype = new Token(); // gives new instance of MWT the properties of a new instance of Token
//note: still working this out.

/**
 * The id in a MultiwordToken is based on the MultiwordToken's subtokens.
 * The id will be: smallestid-largestid
 * The id cannot be updated here.
 * @type {String}
 */
Object.defineProperty(MultiwordToken.prototype,'id',{ //to prototype or not to prototype...
    get: function() {
        if (this.tokens.length < 1){
            return "?-?"; // if the multi-word token doesn't have any children (length of sub-array tokens is 0), alert. Do not allow to save.
        }
        var first = this.tokens[0];
        var last = this.tokens[this.tokens.length-1];
        id = first.id + "-" + last.id; // assign mwt id to be "smallestID-largestID"
        return String(id); //return in string version
    },

    set: function(value) { // does nothing
    }
});

Object.defineProperty(MultiwordToken.prototype,'serial',{
    get: function() {
        var finalString = "";

        // handle apostrophes in token forms
        var parentForm = this.form;
        if (parentForm.includes("'")){
            parentForm = parentForm.replace("'", "\'")
        }

        // Find the serial property from the Token object, and use that to serialize the MWT line
        var parentSerialGetter = Object.getOwnPropertyDescriptor(Token.prototype,'serial');
        var parentMWT = parentSerialGetter.get.call(this);

        finalString = finalString + parentMWT; // add parent mwt to the final string

        for (word in this.tokens){
            finalString = finalString + "\n" + this.tokens[word].serial;// iteratively add each child to the final string.
        }

        return finalString;
    },

    set: function(mwtString) {
        // Split the initial string into the separate lines as would be found in Conllu format
        var mwtLines = mwtString.split("\n");

        // First item in array (first line) turned into mwt "parent"
        // Find the serial property from the Token object, and use that to serialize the MWT line
        var parentSerialSetter = Object.getOwnPropertyDescriptor(Token.prototype,'serial');
        parentSerialSetter.set.call(this, mwtLines[0]);

        this.tokens = []; //ensure the subtokens array is clear

        // Iterate over the subtokens and set them using the existing Token setter. Push them to subtokens array.
        for (i = 1; i < mwtLines.length; i++){
            var subToken = new Token();
            subToken.serial = mwtLines[i];
            this.tokens.push(subToken);
        }
    }
});


// if using Node.js export module
if (typeof exports !== 'undefined' && this.exports !== exports) {
    exports.MultiwordToken = MultiwordToken;
}

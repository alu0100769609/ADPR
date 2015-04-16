"use strict";
// tokens.js
// 2010-02-23

// Produce an array of simple token objects from a string.
// A simple token object contains these members:
//      type: 'name', 'string', 'number', 'operator'
//      value: string or number value of the token
//      from: index of first character of the token
//      to: index of the last character + 1

// Comments are ignored.

RegExp.prototype.bexec = function(str) {
  var i = this.lastIndex;
  var m = this.exec(str);
  if (m && m.index == i) return m;
  return null;
}

String.prototype.tokens = function () {
    var from;                   // The index of the start of the token.
    var i = 0;                  // The index of the current character.
    var n;                      // The number value.
    var m;                      // Matching
    var result = [];            // An array to hold the results.

    //tokens basicos de PL/0
    var WHITES              = /\s+/g;
    var ID                  = /[a-zA-Z_]\w*/g;
    var NUM                 = /\b\d+(\.\d*)?([eE][+-]?\d+)?\b/g;
    //versiones de PL/0
    var TWOCHAROPERATORS    = /(:=|<=|>=)/g;
    var ONECHAROPERATORS    = /[-+.=,;?!#<>*/()]/g;

    var tokens = [WHITES, ID, NUM, TWOCHAROPERATORS, ONECHAROPERATORS ];


    // Make a token object.
    var make = function (type, value) {
        return {
            type: type,
            value: value,
            from: from,
            to: i
        };
    };

    var getTok = function() {
      var str = m[0];
      i += str.length; // Warning! side effect on i
      return str;
    };

    // Begin tokenization. If the source string is empty, return nothing.
    if (!this) return;

    // Loop through this text
    while (i < this.length) {
        tokens.forEach( function(t) { t.lastIndex = i;}); // Only ECMAScript5
        from = i;
        // Ignore whitespace and comments
        if (m = WHITES.bexec(this)) { getTok(); }
        // name.
        else if (m = ID.bexec(this)) {
            result.push(make('ID', getTok()));
        }
        // number.
        else if (m = NUM.bexec(this)) {
            n = +getTok();

            if (isFinite(n)) {
                result.push(make('NUM', n));
            } else {
                make('NUM', m[0]).error("Bad number");
            }
        }
        // two char operator
        else if (m = TWOCHAROPERATORS.bexec(this)) {
            result.push(make('operator', getTok()));
        // single-character operator
        } else if (m = ONECHAROPERATORS.bexec(this)){
            result.push(make('operator', getTok()));
        } else {
          throw "Syntax error near '"+this.substr(i)+"'";
        }
    }
    return result;
};

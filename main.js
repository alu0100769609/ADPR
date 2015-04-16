/*jslint evil: true */

/*members create, error, message, name, prototype, stringify, toSource,
    toString, write
*/

/*global JSON, make_parse, parse, source, tree */

// Transform a token object into an exception object and throw it.
//  http://stackoverflow.com/questions/17857670/javascript-prototype-throw-the-error-as-object-object-object-has-no-method
// Thanks Eliasib for pointing the error
Object.constructor.prototype.error = function (message, t) {
    t = t || this;
    t.name = "SyntaxError";
    t.message = message;
    throw t;
};

function main_tokenize() {
    var source = INPUT.value;
    var string, tree;
    //string = "Intento de tokenizacion";
    string = JSON.stringify(source.tokens());
    string = string.replace(/\},/g, '},\n');
    //string = string.replace(/,/g, ',\t');
    OUTPUT.innerHTML = string.replace(/&/g, '&amp;').replace(/[<]/g, '&lt;');
};

function main_parse() {
    var parse = make_parse();

    var source = INPUT.value;
    var string, tree;
    try {
        tree = parse(source);
        //string = JSON.stringify(tree, ['type', 'value', 'from', 'to'],  4);
        string = JSON.stringify(tree, ['key', 'name', 'message',
             'value', 'arity', 'first', 'second', 'third', 'fourth'], 4);
    } catch (e) {
        string = JSON.stringify(e, ['name', 'message', 'from', 'to', 'key',
                'value', 'arity', 'first', 'second', 'third', 'fourth'], 4);
    }
    OUTPUT.innerHTML = string.replace(/&/g, '&amp;').replace(/[<]/g, '&lt;');
};

window.onload = function() {
  TOKENIZE.onclick = main_tokenize;
  PARSE.onclick = main_parse;
}

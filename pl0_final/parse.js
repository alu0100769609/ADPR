var parse = function(input) {
  var tokens = input.tokens();
  var lookahead = tokens.shift();

  var match = function(t) {
    if (lookahead.type === t) {
      lookahead = tokens.shift();
      if (typeof lookahead === 'undefined') {
       lookahead = null; // end of input
      }
    } else { // Error. Throw exception
        throw "Syntax Error. Expected "+t+" found '"+lookahead.value+
              "' near '"+input.substr(lookahead.from)+"'";
    }
  };

  var statements = function() {
    var result = [ statement() ];
    while (lookahead && lookahead.type === ';') {
      match(';');
      result.push(statement());
    }
    return result.length === 1? result[0] : result;
  };

  var statement = function() {
    var result = null;

    // throw "Hola pulpo:" + lookahead.type;

    if (lookahead && lookahead.type === 'ID') {
      var left = { type: 'ID', value: lookahead.value };
      match('ID');
      match('=');
      right = expression();
      result = { type: '=', left: left, right: right };
    } else if (lookahead && lookahead.type === 'P') {
      match('P');
      right = expression();
      result = { type: 'P', value: right };
    } else { // Error!
      throw "Syntax Error. Expected identifier but found "+
            (lookahead? lookahead.value : "end of input")+
            " near '"+input.substr(lookahead.from)+"'";
    }
    return result;
  };

  var expression = function() {
    var result = term();
    if (lookahead && lookahead.type === '+') {
      match('+');
      var right = expression();
      result = {type: '+', left: result, right: right};
    }
    return result;
  };

  var term = function() {
    var result = factor();
    if (lookahead && lookahead.type === '*') {
      match('*');
      var right = term();
      result = {type: '*', left: result, right: right};
    }
    return result;
  };

  var factor = function() {
    var result = null;

    if (lookahead.type === 'NUM') {
      result = {type: 'NUM', value: lookahead.value};
      match('NUM');
    }
    else if (lookahead.type === 'ID') {
      result = {type: 'ID', value: lookahead.value};
      match('ID');
    }
    else if (lookahead.type === '(') {
      match('(');
      result = expression();
      match(')');
    } else { // Throw exception
      throw "Syntax Error. Expected number or identifier or '(' but found "+
            (lookahead? lookahead.value : "end of input")+
            " near '"+input.substr(lookahead.from)+"'";
    }
    return result;
  };
  var tree = statements(input);
  if (lookahead != null) {
      throw "Syntax Error parsing statements. Expected end of input and found '"+
            input.substr(lookahead.from)+"'";
  }
  return tree;
}

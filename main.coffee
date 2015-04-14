###jslint evil: true ###

###members create, error, message, name, prototype, stringify, toSource,
    toString, write
###

###global JSON, make_parse, parse, source, tree ###

# Transform a token object into an exception object and throw it.
#  http://stackoverflow.com/questions/17857670/javascript-prototype-throw-the-error-as-object-object-object-has-no-method
# Thanks Eliasib for pointing the error

main = ->
  parse = make_parse()
  source = INPUT.value
  string = undefined
  tree = undefined
  try
    tree = parse(source)
    #string = JSON.stringify(tree, ['type', 'value', 'from', 'to'],  4);
    string = JSON.stringify(tree, [
      'key'
      'name'
      'message'
      'value'
      'arity'
      'first'
      'second'
      'third'
      'fourth'
    ], 4)
  catch e
    string = JSON.stringify(e, [
      'name'
      'message'
      'from'
      'to'
      'key'
      'value'
      'arity'
      'first'
      'second'
      'third'
      'fourth'
    ], 4)
  OUTPUT.innerHTML = string.replace(/&/g, '&amp;').replace(/[<]/g, '&lt;')
  return

Object.constructor::error = (message, t) ->
  t = t or this
  t.name = 'SyntaxError'
  t.message = message
  throw t
  return

window.onload = ->
  PARSE.onclick = main
  return

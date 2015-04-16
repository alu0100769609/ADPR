chai     = require 'chai'
expect   = chai.expect
routes = require "../routes/index"

describe "routes", ->
  req = {}
  res = {}
  describe "index", ->
    it "should display index with posts", ->
      res.render = (view, vars) ->
          expect(view).equal "index"
          expect(vars.title).equal "My Coffeepress Blog"
      routes.index(req, res)

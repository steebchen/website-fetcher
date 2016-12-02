'use strict'

const assert = require('assert')

let ws

describe('init', function () {
  it('should require the app', function () {
    ws = require('..')
  })
})

describe('description', function () {
  it('should throw an error if no url or callback is given', function () {
    try {
      ws('')
    } catch (err) {
      assert(err.message === 'No data provided')
    }

    try {
      ws('asdf')
    } catch (err) {
      assert(err.message === 'No callback provided')
    }
  })

  it('should return no results on an invalid domain', function (done) {
    ws('http://url', (err, result) => {
      if (err) return done(err)

      assert(result.notEnough === true)
      assert(result.rank === Infinity)
      assert(result.views === 0)

      done()
    })
  })

  it('should return results on correct domain', function (done) {
    ws('https://www.google.com', (err, result) => {
      if (err) return done(err)

      assert(result.rank === 1)
      assert(result.views === 104943144672)
      assert(result.rankF === '1')
      assert(result.viewsF === '104.943.144.672')

      done()
    })
  })
})

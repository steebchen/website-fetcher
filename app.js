const request = require('request')
const parseXml = require('xml2js').parseString

module.exports = function (url, done) {
  if (!url) throw new Error('No data provided')
  if (!done) throw new Error('No callback provided')

  request.get({
    url: 'http://data.alexa.com/data?cli=10&url=' + url
  }, function (err, resp, body) {
    if (err) return done(err)

    parseXml(body, {
      attrkey: 'attr',
      tagNameProcessors: [trim],
      attrNameProcessors: [trim],
      explicitArray: false
    }, function (err, result) {
      if (err) return done(err)

      try {
        if (!result.alexa.sd) {
          return done(null, {
            notEnough: true,
            rank: Infinity,
            views: 0
          })
        }

        const r = {
          rank: parseInt(result.alexa.sd.reach.attr.rank),
          views: parseInt(104943144672 * Math.pow(parseInt(result.alexa.sd.reach.attr.rank), -1.008))
        }

        r.rankF = addCommas(r.rank)
        r.viewsF = addCommas(r.views)

        done(null, r)
      } catch (e) {
        done(e)
      }
    })
  })
}

function addCommas(s) {
  return (s + '').replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

function trim(s) {
  s = s.replace(/aws:/, '').replace(/:aws/, '')
  s = s.toLowerCase()
  return s
}

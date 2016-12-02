# install

```sh
npm i website-info --save
```

# usage

```js
const ws = require('ws')

ws('https://www.google.com', (err, result) => {
  if (err) console.error(err) // handle error

  console.log(result)

  // result:
  // {
  //   rank: 1,
  //   views: 104943144672,
  //   rankF: '1',
  //   viewsF: '104.943.144.672'
  // }
})

// when a website has too little pageviews
ws('http://this-website.is/not-really/popular', (err, result) => {
  if (err) console.error(err) // handle error

  console.log(result)

  // result:
  // {
  //   notEnough: true,
  //   rank: Infinity,
  //   views: 0
  // }
})
```

You can also use Promises – simply leave off the callback:

```js
ws('https://www.google.com').then(console.log).catch(console.error)
```

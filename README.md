[![](https://circleci.com/gh/steebchen/website-info.png)](https://circleci.com/gh/steebchen/website-info)

# install

```sh
npm i website-info --save
```

# usage

```js
const ws = require('website-info')

ws('https://www.google.com', (err, result) => {
  if (err) console.error(err) // handle error

  console.log(result)

  // result:
  // {
  //   rank: 1, // global website rank. 1 means most popular website
  //   views: 104943144672, // estimated monthly pageviews
  //   rankF: '1', // formatted rank
  //   viewsF: '104.943.144.672' // formatted views
  // }
})

// when a website has too little pageviews
ws('http://this-website.is/not-really/popular', (err, result) => {
  if (err) console.error(err) // handle error

  console.log(result)

  // result:
  // {
  //   notEnough: true, // not enough data to estimate rank/pageviews
  //   rank: Infinity,
  //   views: 0
  // }
})
```

You can also use Promises – simply leave off the callback:

```js
ws('https://www.google.com').then(console.log).catch(console.error)
```

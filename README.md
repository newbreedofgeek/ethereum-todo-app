# ethereum-todo-app
TODO app with Ethereum Blockchain based backend. Based on the tutorial series by Eat the Blocks https://www.youtube.com/channel/UCZM8XQjNOyG2ElPpEUtNasA with the following updates so far.

1) Using Solidity 0.4.22

### Requirements (to be installed globally via NPM - rest can be found in package.json):
- Ganache CLI (This is the blockchain we will connect to)
- Truffle
- Nodemon

### Why I like this setup:
- Back and Front ends in a single project
- Using Web3.js via NPM
- Using Webpack driven `truffle-solidity-loader` to load .sol files and automatically complile and load the abstraction into web3 whenever your .sol contracts change. This is very cool!
import $ from 'jquery'; 
import Web3 from 'web3';
import TruffleContract from 'truffle-contract'; 
import artifact from '../../contracts/Counter.sol';
import config from '../js/config'; 

// const { ethereumUrl } = config;
// const web3 = new Web3(new Web3.providers.HttpProvider(ethereumUrl));

// const Counter = new TruffleContract(artifact);
// Counter.setProvider(web3.currentProvider);

// const networks = Object.keys(artifact.networks);
// const network = networks[networks.length - 1];
// const address = artifact.networks[network].address;
// const ethAccountToUse = web3.eth.accounts[0];

// web3.eth.defaultAccount = ethAccountToUse;
// web3.personal.unlockAccount(web3.eth.defaultAccount);

// // log(address);
// // console.log(ethAccountToUse);

// Counter.at(address).then((ToDo) => {
//   ToDo.getCount().then(i => {
//     console.log(i);
//     ToDo.increment({from: ethAccountToUse}).then(() => {
//       ToDo.getCount().then(n => {
//         console.log(n);
//       });
//     });
//   });
// })

function log(message) {
  $('#log').append($('<p>').text(message));
  $('#log').scrollTop($('#log').prop('scrollHeight'));
}

function error(message) {
  $('#log').append($('<p>').addClass('dark-red').text(message));
  $('#log').scrollTop($('#log').prop('scrollHeight'));
}

function waitForReceipt(hash, web3, cb) {
  console.log('waitForReceipt');
  console.log(hash);

  var receipt = web3.eth.getTransactionReceipt(hash).then((v) => {
    console.log(v);
  });

  // web3.eth.getTransactionReceipt(hash, function(err, receipt) {
  //   if (err) {
  //     error(err);
  //   }

  //   if (receipt !== null) {
  //     // Transaction went through
  //     if (cb) {
  //       cb(receipt);
  //     }
  //   } else {
  //     // Try again in 1 second
  //     window.setTimeout(function () {
  //       waitForReceipt(hash, web3, cb);
  //     }, 1000);
  //   }
  // });
}

$(() => { 
  if (typeof(web3) === "undefined") {
    error("Unable to find web3. Please run MetaMask (or something else that injects web3).");
  } 
  else {
    var counter;
    var ethAccountToUse;

    $('#clearlog').click(function (e) {
      e.preventDefault();

      $('#log').text('');
    });

    $('#getcount').click(function (e) {
      e.preventDefault();

      log("Calling getCount...");

      counter.getCount().then((result) => {
        log("getCount call executed successfully.");
        $('#count').text(result.toString());
      });
    });

    $('#increment').click(function (e) {
      e.preventDefault();

      if(web3.eth.defaultAccount === undefined) {
        return error("No accounts found. If you're using MetaMask, " +
                     "please unlock it first and reload the page.");
      }

      log("Calling increment...");

      counter.increment({from: ethAccountToUse, gas: 1000000, gasPrice: 0}).then((i) => {
        log("Transaction sent. waiting for confirmation...");

        waitForReceipt(i.tx, web3, function() {
          log("Transaction succeeded. Call getCount again to see the latest count.");
        });
      })
      .catch((err) => {
        error(`Oops... There was an error: ${err}`);
      });
    });

    // init via metamask provider
    log("Found injected web3.");
    web3 = new Web3(web3.currentProvider);

    log(`web3.version.network ID ${web3.version.network}`);
    
    if (web3.version.network != 1540178304393) {
      error("Wrong network detected. Please switch to the adviced test network.");
    } 
    else {
      log("Connected to the network.");

      const Counter = new TruffleContract(artifact);
      Counter.setProvider(web3.currentProvider);

      const networks = Object.keys(artifact.networks);
      const network = networks[networks.length - 1];
      const address = artifact.networks[network].address;

      getAccount(web3)
        .then((account) => {
          ethAccountToUse = account;

          web3.eth.defaultAccount = ethAccountToUse;

          log(`Contract address - ${address}`);
          log(`My address - ${ethAccountToUse}`);

          Counter.at(address).then((counterIns) => {
            counter = counterIns;
          })
        })
        .catch((e) => error(`Oops... There was an error: ${error}`))
    }
  }
});

const getAccount = (web3) => {
  return new Promise((resolve, reject) => {
    web3.eth.getAccounts((error, accounts) => {
      if(typeof error === null) {
        return reject(error);
      } 
      resolve(accounts[0]);
    });
  });
}


// https://programtheblockchain.com/posts/2017/12/13/building-decentralized-apps-with-ethereum-and-javascript/

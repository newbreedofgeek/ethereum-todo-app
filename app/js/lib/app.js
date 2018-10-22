import $ from 'jquery'; 
import Web3 from 'web3'; 
import TruffleContract from 'truffle-contract'; 
import artifact from '../../../contracts/ToDo.sol'; 
import { renderTasks } from './render';

class App { 
  constructor(config) { 
    this.config = config; 
  }

  setup() { 
    const { ethereumUrl } = this.config; 
    const web3 = new Web3(new Web3.providers.HttpProvider(ethereumUrl));

    const Todo = new TruffleContract(artifact);
    Todo.setProvider(web3.currentProvider);

    const networks = Object.keys(artifact.networks);
    const network = networks[networks.length - 1];
    const address = artifact.networks[network].address;

    console.log(web3.eth.accounts[0]);

    web3.eth.defaultAccount = web3.eth.accounts[0];
    web3.personal.unlockAccount(web3.eth.defaultAccount);

    this.web3 = web3;
    this.address = address;
    this.Todo = Todo;
    this.$tasks = $('#tasks');

    return new Promise((resolve, reject) => {
      Todo.at(address)
      .then((todo) => {
         this.todo = todo;
         resolve(todo);
      })
      .catch((error) => {
        reject(error);
      });
    });   
  }

  init() { 
    return new Promise((resolve, reject) => { 
      this.todo.getTaskFixtures(0)
      .then((task) => { 
        renderTasks(this.$tasks, [task]); 

        this.todo.getTaskIds()
          .then(t => console.log(t));

          this.todo.getBalance({from: this.web3.eth.accounts[0]})
            .then((dd) => {
              console.log(dd);

              console.log('%%%%%%%');
              const we = this.web3.toWei('1', 'ether');
              console.log(we);

              this.todo.deposit(we, {from: this.web3.eth.accounts[0]})
                .then((dd) => {
                  console.log(dd);

                  this.todo.getBalanceOfAddress(this.web3.eth.accounts[0], {from: this.web3.eth.accounts[0]})
                    .then((a) => {
                      console.log(a);
                    });
                });
            });
        
          // this.todo.getBalanceOfAddress('0x3F91A49947d373973dF9c4Aac01Ff439681AF912')
          //   .then(z => {
          //     console.log('************** getBalanceOfAddress');
          //     console.log(z);
          //     console.log('**************');

          //     this.todo.getBalanceOfSender()
          //       .then(a => {
          //         console.log('************** getBalanceOfSender');
          //         console.log(a);
          //         console.log('**************');

          //         console.log('%%%%%%%');
          //         const we = this.web3.toWei('1', 'ether');
          //         console.log(we);

          //         this.todo.transfer(we)
          //           .then(b => {
          //             console.log('************** transfer');
          //             console.log(b);
          //             console.log('**************');

          //             this.todo.getBalanceOfAddress('0x3F91A49947d373973dF9c4Aac01Ff439681AF913')
          //               .then(c => {
          //                 console.log('************** getBalanceOfAddress');
          //                 console.log(c);
          //                 console.log('**************');

          //                 this.todo.getBalanceOfSender()
          //                   .then(d => {
          //                     console.log('************** getBalanceOfSender');
          //                     console.log(d);
          //                     console.log('**************');
          //                   });
          //               });
          //           });
          //       });
          //   });
      }); 
    }); 
  } 
}

export default App;
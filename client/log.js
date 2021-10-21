App = {
    
    contracts: {},

    init: async () => {
        console.log("Loaded");
        await App.loadEthereum();
        await App.loadAccount();
        await App.loadContracts();
        App.render();
        await App.renderTask();
        await App.toggleDone();
    },

    loadEthereum: async () => {
        if (window.ethereum){
        App.web3Privoder = window.ethereum
        await window.ethereum.request({method: 'eth_requestAccounts'})
        } else if (window.web3){
            web3 = new Web3(window.web3.currentProvider)
        } else {
            console.log("Try installing Metamask");
        }
    },

    loadAccount: async () => {

        const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
        App.account = accounts[0]

    },

    loadContracts: async () => {
        const response = await fetch("TaskContract.json")
        const taskContractJSON = await response.json()
        
        App.contracts.taskContract = TruffleContract(taskContractJSON)

        //Conecting the contract to Metamask
        App.contracts.taskContract.setProvider(App.web3Privoder)
        
        App.taskContract = await App.contracts.taskContract.deployed()
        
    },

    render: () => {
        document.getElementById("account").innerText = App.account;
    }, 

    renderTask: async () => {
        const tasksCounter = await App.taskContract.taskCounter()
        const taskCounterNumber = tasksCounter.toNumber()
        
        let html = ''
        for (let i = 1; i <= taskCounterNumber; i++) {
            const task = await App.taskContract.tasks(i)
            const taskId = task[0]
            const taskTitle = task[1]
            const taskDescription = task[2]
            const taskDone = task[3]
            const taskTimeStamp = task[4]
            
            let taskElement = `
        <div class="card bg-dark rounded-0 mb-2">
            <div class="card-header d-flex justify-content-between align-items-center">
                <span>${taskTitle}</span>
                <div class="form-check form-switch">
                <input class="form-check-input" data-id="${taskId}" type="checkbox" onchange="App.toggleDone(this)" ${
                taskDone === true && "checked"
                }>
            </div>
         </div>
        <div class="card-body">
          <span>${taskDescription}</span>
          <span>${taskDone}</span>
          <p class="text-muted">Task was created ${new Date(
            taskTimeStamp * 1000
          ).toLocaleString()}</p>
          </label>
        </div>
      </div>
            `
            html += taskElement
        }
        document.querySelector('#taskList').innerHTML = html;
    },

    createTask: async (title, description) => {
        const result = await App.taskContract.createTask(title, description, {from: App.account})
    },

    toggleDone: async (element) => {
        const taskId = element.dataset.id

        await App.taskContract.toggleDone(taskId, {
            from: App.account
        })
        window.location.reload()
    }

}
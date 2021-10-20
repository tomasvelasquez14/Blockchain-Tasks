const TaskContract = artifacts.require("TaskContract")

contract("TaskContract", () => {

    before( async () => {
        this.taskcontract = await TaskContract.deployed()
    })

    it('The contract has been deployed succesfully', async () => {
        const address = await this.taskcontract.address
        
    assert.notEqual(address, null);
    assert.notEqual(address, undefined);
    assert.notEqual(address, 0x0);
    assert.notEqual(address, "");
    })

    it('Get task list', async () => {
    const tasksCounter = await this.taskcontract.taskCounter();
    const task = await this.taskcontract.tasks(tasksCounter);

    assert.equal(task.id.toNumber(), tasksCounter);
    assert.equal(task.title, "Just an example");
    assert.equal(task.description, "Just an example of what I have to do");
    assert.equal(task.done, false);
    assert.equal(tasksCounter, 1);
    })

    it("Task created succesfully", async () => {
        const result = await this.taskcontract.createTask("Some task", "Description two")
        const taskEvent = result.logs[0].args;
        const tasksCounter = await this.taskcontract.taskCounter()

        assert.equal(tasksCounter, 2)
        assert.equal(taskEvent.id.toNumber(), 2);
        assert.equal(taskEvent.title, "Some task");
        assert.equal(taskEvent.description, "Description two");
        assert.equal(taskEvent.done, false);
    })

    it("Task toggle done", async () => {
        const result = await this.taskcontract.toggleDone(1);
        const taskEvent = result.logs[0].args;
        const task = await this.taskcontract.tasks(1);

        assert.equal(task.done, true);
        assert.equal(taskEvent.id, 1);
        assert.equal(taskEvent.done, true);

    })
})

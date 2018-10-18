pragma experimental ABIEncoderV2;
pragma solidity ^0.4.22;

contract ToDo {
  struct Task {
    uint id;
    uint date;
    string content;
    string author;
    bool done;
  }

  uint lastTaskId;
  uint[] taskIds;
  mapping(uint => Task) tasks;

  event TaskCreated(uint id, uint date, string content, string author, bool done);

  constructor() public {
    lastTaskId = 0;
  }

  function createTask(string _content, string _author) public {
    lastTaskId++;
    tasks[lastTaskId] = Task(lastTaskId, now, _content, _author, false);
    taskIds.push(lastTaskId);
    emit TaskCreated(lastTaskId, now, _content, _author, false);
  }

  function getTaskIds() public view returns(uint[]) {
    return taskIds;
  }

  function getTaskFixtures(uint _id) public view
    returns(
      uint,
      uint,
      string,
      string,
      bool
     ) {
    return (0, now, "Create more tutorials for ETB", "Julien", false); 
  }

  function getTask(uint id) public view taskExists(id) 
    returns(
      uint,
      uint,
      string,
      string,
      bool
    ) {
    return(
      id,
      tasks[id].date,
      tasks[id].content,
      tasks[id].author,
      tasks[id].done
    );
  }

  modifier taskExists(uint id) {
    if (tasks[id].id == 0) {
      revert();
    }
    _;
  }
}
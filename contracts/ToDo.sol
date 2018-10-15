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

  event TaskCreated(uint, uint, string, string, bool);

  constructor() public {
    lastTaskId = 0;
  }

  function createTask(string _content, string _author) public {
    lastTaskId++;
    tasks[lastTaskId] = Task(lastTaskId, now, _content, _author, false);
    taskIds.push(lastTaskId);
    emit TaskCreated(lastTaskId, now, _content, _author, false);
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

  function getTaskIds() public view returns(uint[]) {
    return taskIds;
  }

  modifier taskExists(uint id) {
    if (tasks[id].id == 0) {
      revert();
    }
    _;
  }
}

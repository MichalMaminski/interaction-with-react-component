import React from "react";
import { render } from "react-dom";
import lodash from 'lodash';

class ConsoleApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueToLog: "",
      loggedMessages: [],
      duplicatedLoggedMessages: []
    };
  }

  addDuplicatedLoggedMessage(duplicatedMessage) {
    this.setState(prevState => {
      const indexOfDuplication = prevState.duplicatedLoggedMessages.findIndex(
        element => element.message === duplicatedMessage
      );

      var newState = lodash.cloneDeep(prevState);

      if (
        prevState.duplicatedLoggedMessages.length === 0 ||
        indexOfDuplication === -1
      ) {
        newState.duplicatedLoggedMessages.push({
          message: duplicatedMessage,
          numberOfDuplication: 2
        });
      } else {
        newState.duplicatedLoggedMessages[
          indexOfDuplication
        ].numberOfDuplication += 1;
      }
      return newState;
    });
  }

  messageIsNotDuplicated(messageToLog) {
    return this.state.loggedMessages.indexOf(messageToLog) === -1;
  }

  updateValueToLog(e) {
    this.setState({
      valueToLog: e.target.value
    });
  }

  logToConsole(messageToLog) {
    if (this.messageIsNotDuplicated(messageToLog)) {
      this.setState(prevState => {
        prevState.loggedMessages.push(prevState.valueToLog);
        return prevState;
      });
      console.log(
        `Value passed from user to console: ${this.state.valueToLog}`
      );
    } else {
      this.addDuplicatedLoggedMessage(this.state.valueToLog);
    }
  }

  render() {
    var loggedMessages = this.state.loggedMessages;
    var duplicatedLoggedMessages = this.state.duplicatedLoggedMessages;
    var loggedMessagesElement =
      loggedMessages.length > 0 ? (
        <div>
          <h4>Logged unique messages:</h4>
          <ol>
            {loggedMessages.map(message => <li key={message}>{message}</li>)}
          </ol>
        </div>
      ) : (
        ""
      );

    var duplicatedMessagesElement =
      duplicatedLoggedMessages.length > 0 ? (
        <div>
          <h4>Duplicated logged messages:</h4>

          {duplicatedLoggedMessages.map(duplicationState => (
            <p key={duplicationState.message}>
              {duplicationState.message} logged{" "}
              {duplicationState.numberOfDuplication} times.
            </p>
          ))}
        </div>
      ) : (
        ""
      );

    return (
      <div>
        <p>Type something and press 'Log to console' buttton</p>
        <input type="text" onChange={e => this.updateValueToLog(e)} />
        <input
          type="button"
          value="Log to console"
          onClick={() => this.logToConsole(this.state.valueToLog)}
        />
        {loggedMessagesElement}
        {duplicatedMessagesElement}
      </div>
    );
  }
}

render(<ConsoleApp />, document.getElementById("root-container"));

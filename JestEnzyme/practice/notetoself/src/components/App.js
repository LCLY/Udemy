import React, { Component } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
class App extends Component {
  state = {
    text: ""
  };
  render() {
    return (
      <div>
        <h1>NOTE TO SELF</h1>
        <Form inline>
          <FormControl
            onChange={e => {
              this.setState({ text: e.target.value });
            }}
          />&nbsp;
          <Button onClick={() => console.log(this.state.text)}>Submit</Button>
        </Form>
      </div>
    );
  }
}
export default App;

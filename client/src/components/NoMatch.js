import React, { Component } from "react";

class NoMatch extends Component {
    render() {
      return (
        <div style={{textAlign: "center", color: "#1C517C"}}>
          <br/>
          <h3>The url doesn't exist!</h3>
        </div>
      )
    }
}
export default NoMatch;

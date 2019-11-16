import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Table } from "reactstrap";
import { Button } from "reactstrap";

class Student extends Component {
  state = {
    editing: false,
    score: {
      english: "",
      history: "",
      math: ""
    }
  };
  // 삭제 버튼은 여기에 존재하니, 여기까지 Props를 받아서 사용해야 하나???
  // onRemove가 어디서 부터 왔는지, 알려주는 확장(extensions)이나 다른게 있나...?
  handleRemove = () => {
    const { info, onRemove } = this.props;
    onRemove(info.id);
  };

  handleToglleEdit = () => {
    const { editing } = this.state;
    this.setState({
      editing: !editing
    });
  };

  handleChange = e => {
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
    this.setState({
      score: {
        [name]: value
      }
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { info, onUpdate } = this.props;
    if (!prevState.editing && this.state.editing) {
      this.setState({
        score: info.score
      });
    }
    if (prevState.editing && !this.state.editing) {
      onUpdate(info.id, {
        score: this.state.score
      });
    }
  }

  render() {
    const { name, id, score } = this.props.info;
    const { No } = this.props;
    const { editing } = this.state;
    const input = {
      width: "100px",
      height: "30px",
      boder: "1px solid black"
    };
    if (editing) {
      return (
        <tr>
          <td>{No}</td>
          <td>{name}</td>
          <td>{id}</td>
          <td>
            <input
              name="english"
              style={input}
              value={this.state.score.english || ""}
              onChange={this.handleChange}
            />
          </td>
          <td>
            <input
              name="history"
              style={input}
              value={this.state.score.history || ""}
              onChange={this.handleChange}
            />
          </td>
          <td>
            <input
              name="math"
              style={input}
              value={this.state.score.math || ""}
              onChange={this.handleChange}
            />
          </td>
          <td>
            <Button onClick={this.handleToglleEdit}>완료</Button>
          </td>
          <td>
            <Button onClick={this.handleRemove}>삭제</Button>
          </td>
        </tr>
      );
    }

    return (
      <tr>
        <td>{No}</td>
        <td>{name}</td>
        <td>{id}</td>
        <td>{score.english}</td>
        <td>{score.history}</td>
        <td>{score.math}</td>
        <td>
          <Button color="warning" onClick={this.handleToglleEdit}>
            수정
          </Button>
        </td>
        <td>
          <Button onClick={this.handleRemove}>삭제</Button>
        </td>
      </tr>
    );
  }
}

export default Student;

// 이 컴포넌트에 수정을 넣는게 Velopert의 방식 // 왜 그럴까???
import React, { Component } from "react";
import PartsView from "./partsView";
import PartDetails from "./partDetails";
import axios from "axios";

class PartsPage extends Component {
  state = {
    partList: [],
    selectedPart: null
  };

  async componentDidMount() {
    const response = await axios.get("http://127.0.0.1:8123/parts");

    this.setState({ partList: response.data });
  }

  onSelectPart(part) {
    if (part === this.state.selectedPart) return null;

    this.setState({ selectedPart: part });
  }

  async onAlterPart(part) {
    console.log("part was altered: " + part.name);

    const response = await axios.get("http://127.0.0.1:8123/parts");

    console.log("updating with new parts list");
    const match = response.data.find(val => val["_id"] === this.state.selectedPart._id);
    this.setState({ partList: response.data, selectedPart: match });
  }

  async onDelete() {
    console.log("refreshing after delete");
    const response = await axios.get("http://127.0.0.1:8123/parts");

    this.setState({ partList: response.data, selectedPart: response.data[0] });
  }

  async onCreate() {
    let response = await axios.post("http://127.0.0.1:8123/parts", {
      name: "NEW PART",
      description: "",
      cost: 0.0,
      inStock: 0,
      shipped: 0,
      onOrder: 0,
      flagThreshold: 5
    });

    response = await axios.get("http://127.0.0.1:8123/parts");

    this.setState({
      partList: response.data,
      selectedPart: response.data[response.data.length - 1]
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-9">
            <PartsView
              onSelect={part => this.onSelectPart(part)}
              partList={this.state.partList}
              selectedPart={this.state.selectedPart}
            />
          </div>
          <div className="col">
            <button className="btn btn-outline-dark" onClick={() => this.onCreate()}>
              Create New
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col">
            {this.state.selectedPart && (
              <PartDetails
                selectedPart={this.state.selectedPart}
                onAlter={part => this.onAlterPart(part)}
                onDelete={() => this.onDelete()}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default PartsPage;

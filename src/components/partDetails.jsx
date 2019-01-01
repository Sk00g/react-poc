import React, { Component } from "react";
import axios from "axios";

class PartDetails extends Component {
  state = {
    localPart: {
      name: "new part",
      inStock: 0,
      onOrder: 0,
      shipped: 0
    }
  };

  componentDidMount() {
    console.log("did mount");
    this.setState({ localPart: { ...this.props.selectedPart } });
  }

  componentWillReceiveProps(props) {
    console.log("will receive props: " + JSON.stringify(props));
    this.setState({ localPart: { ...props.selectedPart } });
    this.render();
  }

  valueChanged = e => {
    const localPart = { ...this.state.localPart };
    localPart[e.currentTarget.id] = e.currentTarget.value;
    this.setState({ localPart });
  };

  handleSave = async e => {
    const partCopy = { ...this.state.localPart };
    delete partCopy._id;
    partCopy.inStock = parseInt(partCopy.inStock);
    partCopy.onOrder = parseInt(partCopy.onOrder);
    partCopy.shipped = parseInt(partCopy.shipped);

    const response = await axios.patch(
      "http://127.0.0.1:8123/parts/" + this.state.localPart._id,
      partCopy
    );

    console.log("patch response: " + JSON.stringify(response.status));

    this.props.onAlter(this.props.selectedPart);
  };

  handleReset = e => {
    this.setState({ localPart: { ...this.props.selectedPart } });
  };

  handleDelete = async e => {
    const response = await axios.delete("http://127.0.0.1:8123/parts/" + this.state.localPart._id);

    console.log("delete response: " + response.status);

    this.props.onDelete();
  };

  render() {
    const { localPart } = this.state;

    return (
      <div className="container">
        <div className="d-flex border-bottom align-items-center justify-content-between pb-1 mb-2">
          <h1 className="h2">Details</h1>
          <div className="btn-toolbar">
            <div className="btn-group">
              <button className="btn btn-outline-dark" onClick={this.handleSave}>
                Save
              </button>
              <button className="btn btn-outline-dark" onClick={this.handleReset}>
                Reset
              </button>
              <button className="btn btn-outline-dark" onClick={this.handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
        <div className="container">
          <form>
            <div className="row">
              <div className="col-6 mb-2">
                <div className="form-group row">
                  <label className="col-3 col-form-label" htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    className="form-control col-9"
                    type="text"
                    value={localPart.name}
                    onChange={this.valueChanged}
                    required
                  />
                </div>
                <div className="form-group row">
                  <label className="col-3 col-form-label" htmlFor="onOrder">
                    Order
                  </label>
                  <input
                    id="onOrder"
                    className="form-control col-9"
                    type="text"
                    value={localPart.onOrder}
                    onChange={this.valueChanged}
                    required
                  />
                </div>
              </div>
              <div className="col-6 mb-2">
                <div className="form-group row">
                  <label htmlFor="inStock" className="col-3 col-form-label">
                    Stock
                  </label>
                  <input
                    type="text"
                    className="form-control col-9"
                    id="inStock"
                    value={localPart.inStock}
                    onChange={this.valueChanged}
                  />
                </div>
                <div className="form-group row">
                  <label className="col-3 col-form-label" htmlFor="shipped">
                    Sold
                  </label>
                  <input
                    id="shipped"
                    className="form-control col-9"
                    type="text"
                    value={localPart.shipped}
                    onChange={this.valueChanged}
                    required
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default PartDetails;

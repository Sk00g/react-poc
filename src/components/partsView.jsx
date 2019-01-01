import React, { Component } from "react";
import { formatMoney } from "../util.js";

class PartsView extends Component {
  getFontColor(stock, flag) {
    if (stock < flag) {
      return "#CC3322";
    } else if (stock - 5 < flag) {
      return "#d88a1c";
    } else {
      return "#222222";
    }
  }

  render() {
    return (
      <table className="table table-striped table-sm table-hover">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Stock</th>
            <th scope="col">On Order</th>
            <th scope="col">Sold</th>
            <th scope="col">Cost</th>
            <th scope="col">Total Value</th>
            <th scope="col">Flag</th>
          </tr>
        </thead>
        <tbody>
          {this.props.partList.map(part => (
            <tr
              key={part.name}
              onClick={() => this.props.onSelect(part)}
              style={{ backgroundColor: part === this.props.selectedPart ? "#BBBBCC" : null }}
            >
              <td style={{ color: "#222222" }}>{part.name}</td>
              <td style={{ color: this.getFontColor(part.inStock, part.flagThreshold) }}>
                <b>{part.inStock}</b>
              </td>
              <td>{part.onOrder}</td>
              <td>{part.shipped}</td>
              <td>{formatMoney(part.cost)}</td>
              <td>{formatMoney(part.cost * (part.onOrder + part.inStock))}</td>
              <td>{`(${part.flagThreshold})`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default PartsView;

//  * (part.inStock + part.onOrder)

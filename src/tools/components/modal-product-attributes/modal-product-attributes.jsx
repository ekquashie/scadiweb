import {Component} from "react";
import {v4 as uuidv4} from "uuid";
import s from "./modal-product-attributes.module.css";

class ModalProductAttributes extends Component {
  state = {
    color: "", size: "", capacity: "", withPorts: "", withTouch: "", attrs: [], loading: false
  };

  loading = false;
  attrs = (e) => {
    this.setState({loading: true})
    const {name, value} = e.target;

    if (name === "Size") {
      this.setState({size: value});
    }
    if (name === "Color") {
      this.setState({color: value});
    }
    if (name === "Capacity") {
      this.setState({capacity: value});
    }
    if (name === "With USB 3 ports") {
      this.setState({withPorts: value});
    }
    if (name === "Touch ID in keyboard") {
      this.setState({withTouch: value});
    }

    setTimeout(() => {
      const {color, size, capacity, withPorts, withTouch} = this.state;
      const onAttributesClick = this.props.onAttributesClick;
      onAttributesClick([color, size, capacity, withPorts, withTouch]);
      this.setState({loading: this.loading})
    }, 100)

  };

  render() {
    const {name, inStock, attributes, selectedAttribute} = this.props.product;
    const index = this.props.index;

    return (<div>{attributes?.map((attr) => {
      return (<div key={attr.name + name + "modal" + index} className={s.attributes}>
        <h2 className={s.attributesTitle}>{attr.name.toUpperCase()}:</h2>
        <div className={s.attributesList}>
          {attr.items.map((item) => {
            const key = uuidv4();
            return (<div key={item.value} className={s.attributesForm}>
              <input
                onChange={this.attrs}
                className={s.attrButton}
                id={key}
                checked={selectedAttribute.includes(item.value)}
                type="radio"
                name={attr.name + name + "modal" + index}
                value={item.value}
                disabled={!inStock || this.state.loading}
              />
              <label
                className={attr.name === "Color" ? s.coloredLabel : s.attrLabel}
                htmlFor={key}
                style={{
                  backgroundColor: attr.name === "Color" && `${item.value}`,
                }}
              >
                {item.value}
              </label>
            </div>);
          })}
        </div>
      </div>);
    })}</div>);
  }
}

export default ModalProductAttributes;
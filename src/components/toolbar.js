import PropTypes from "prop-types";
import React from "react";
import css from "./toolbar.less";
const DRAG_IMAGE_DOM_ID = "flow-icon-draged-image";
class Toolbar extends React.Component {
  handleDragStart({ type, action, name }) {
    return e => {
      e.dataTransfer.setData("type", type);
      e.dataTransfer.setData("action", action);
      e.dataTransfer.setData("nodeName", name);
      e.dataTransfer.setData("method", "new");
      const dragImage = e.target.cloneNode();
      dragImage.innerHTML = name;
      dragImage.style.width = "150px";
      dragImage.style.height = "23px";
      dragImage.style.display = "block";
      dragImage.style.border = "1px solid black";
      dragImage.style.backgroundColor = "lightyellow";
      dragImage.style.textAlign = "center";
      dragImage.id = DRAG_IMAGE_DOM_ID;
      document.body.append(dragImage);
      dragImage.style.position = "absolute";
      dragImage.style.left = "-100px";
      dragImage.style.top = "-100px";
      e.dataTransfer.setDragImage(dragImage, 10, 10);
    };
  }
  handleDragEnd() {
    // 删除拖拽的图片
    const dragImage = document.getElementById(DRAG_IMAGE_DOM_ID);
    if (dragImage) {
      document.body.removeChild(dragImage);
    }
  }
  render() {
    const { width, iconWritingMode } = this.props;
    const {
      nodes,
      entities: { node: nodeEntity },
    } = this.props.template;
    const tools = nodes.filter(x => nodeEntity[x].props.showInToolbar === "Y");
    return (
      <div
        className={`flow-icon-toolbar ${css.mainClass}`}
        style={{ width: `${width}px`, writingMode: iconWritingMode }}>
        {tools.map(x => (
          <div
            className="icon-wrap"
            key={x}
            title={nodeEntity[x].props.name}
            draggable="true"
            onDragStart={this.handleDragStart({
              type: nodeEntity[x].type,
              action: nodeEntity[x].props.action,
              name: nodeEntity[x].props.name,
            })}
            onDragEnd={this.handleDragEnd}>
            <div className="icon">
              <img src={nodeEntity[x].icon} alt="" />
            </div>
          </div>
        ))}
      </div>
    );
  }
}

Toolbar.propsType = {
  template: PropTypes.object,
};

export default Toolbar;

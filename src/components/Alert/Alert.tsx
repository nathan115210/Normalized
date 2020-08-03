import React, { FC, useState } from "react";
import Transition from "../Transition/Transition";
import classNames from "classnames";
import Icon from "../Icon/Icon";

export type AlertType = "success" | "default" | "danger" | "warning";
export interface AlertProps {
  /**Title */
  title: string;
  /**Description */
  description?: string;
  /**Type: 4 options to choose */
  type?: AlertType;
  /**Callback of closing alert */
  onClose?: () => void;
  /**If alert is closable */
  closable?: boolean;
}

/**
 * Used to display important prompt information on the page.
 * Click the cross on the right to automatically disappear
 * ### Usage
 *
 * ~~~js
 * import { Alert } from 'normalized'
 * ~~~
 */
export const Alert: FC<AlertProps> = (props) => {
  const [hide, setHide] = useState(false);
  const { title, description, type, onClose, closable } = props;
  const classes = classNames("normalized-alert", {
    [`normalized-alert-${type}`]: type,
  });
  const titleClass = classNames("normalized-alert-title", {
    "bold-title": description,
  });
  const handleClose = (e: React.MouseEvent) => {
    if (onClose) {
      onClose();
    }
    setHide(true);
  };
  return (
    <Transition in={!hide} timeout={300} animation="zoom-in-top">
      <div className={classes}>
        <span className={titleClass}>{title}</span>
        {description && <p className="normalized-alert-desc">{description}</p>}
        {closable && (
          <span className="normalized-alert-close" onClick={handleClose}>
            <Icon icon="times" />
          </span>
        )}
      </div>
    </Transition>
  );
};
Alert.defaultProps = {
  type: "default",
  closable: true,
};
export default Alert;

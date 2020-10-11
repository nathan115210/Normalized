import React, { FC } from "react";
import { ThemeProps } from "../Icon/Icon";
interface ProgressBarProps {
  percent: number;
  strokeHeight?: number;
  showText?: boolean;
  styles?: React.CSSProperties;
  theme?: ThemeProps;
}

const ProgressBar: FC<ProgressBarProps> = (props) => {
  const { percent, strokeHeight, showText, styles, theme } = props;
  return (
    <div className="normalized-progress-bar" style={styles}>
      <div
        className="normalized-progress-bar-outer"
        style={{ height: `${strokeHeight}px` }}
      >
        <div
          className={`normalized-progress-bar-inner color-${theme}`}
          style={{ width: `${percent}%` }}
        >
          {showText && <span className="inner-text">{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  );
};
ProgressBar.defaultProps = {
  strokeHeight: 15,
  showText: true,
  theme: "primary",
};

export default ProgressBar;

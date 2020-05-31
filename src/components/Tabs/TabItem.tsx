import React, { FC } from "react";

export interface TabItemProps {
  /** tab title */
  label: string | React.ReactElement;
  /** if disabled the tab item */
  disabled?: boolean;
}

export const TabItem: FC<TabItemProps> = ({ children }) => {
  return <div className="normalized-tab-panel">{children}</div>;
};

export default TabItem;

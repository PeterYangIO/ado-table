import { ObservableValue } from "azure-devops-ui/Core/Observable";
import { ScreenBreakpoints } from "azure-devops-ui/Core/Util/Screen";
import { ISimpleListCell } from "azure-devops-ui/List";
import { Status, Statuses, StatusSize } from "azure-devops-ui/Status";
import {
  Table,
  ITableBreakpoint,
  renderSimpleCell,
  TableColumnLayout,
  ISimpleTableCell,
} from "azure-devops-ui/Table";
import { css } from "azure-devops-ui/Util";
import { ArrayItemProvider } from "azure-devops-ui/Utilities/Provider";
import React from "react";

interface ITableItem extends ISimpleTableCell {
  name: ISimpleListCell;
  age: number;
  gender: string;
}

const renderStatus = (className?: string) => {
  return (
    <Status
      {...Statuses.Success}
      ariaLabel="Success"
      className={css(className, "bolt-table-status-icon")}
      size={StatusSize.s}
    />
  );
};

const fixedColumns = [
  {
    columnLayout: TableColumnLayout.singleLinePrefix,
    id: "name",
    name: "Name",
    readonly: true,
    renderCell: renderSimpleCell,
    width: new ObservableValue(-30),
  },
  {
    id: "age",
    name: "Age",
    readonly: true,
    renderCell: renderSimpleCell,
    width: new ObservableValue(-30),
  },
  {
    columnLayout: TableColumnLayout.none,
    id: "gender",
    name: "Gender",
    readonly: true,
    renderCell: renderSimpleCell,
    width: new ObservableValue(-40),
  },
];

export const rawTableItems: ITableItem[] = [
  {
    age: 50,
    gender: "M",
    name: { iconProps: { render: renderStatus }, text: "Rory Boisvert" },
  },
  {
    age: 49,
    gender: "F",
    name: {
      iconProps: { iconName: "Home", ariaLabel: "Home" },
      text: "Sharon Monroe",
    },
  },
  {
    age: 18,
    gender: "F",
    name: {
      iconProps: { iconName: "Home", ariaLabel: "Home" },
      text: "Lucy Booth",
    },
  },
];

export const tableItemsNoIcons = new ArrayItemProvider<ITableItem>(
  rawTableItems.map((item: ITableItem) => {
    const newItem = Object.assign({}, item);
    newItem.name = { text: newItem.name.text };
    return newItem;
  })
);

export default class TableWithBreakpointsExample extends React.Component {
  private tableBreakpoints: ITableBreakpoint[] = [
    {
      breakpoint: ScreenBreakpoints.xsmall,
      columnWidths: [-50, -25, -25],
    },
    {
      breakpoint: ScreenBreakpoints.small,
      columnWidths: [-40, -20, -40],
    },
  ];

  public render(): JSX.Element {
    return (
      <Table
        columns={fixedColumns}
        itemProvider={tableItemsNoIcons}
        // Uncommenting tableBreakpoints will cause the table to render as invisible
        tableBreakpoints={this.tableBreakpoints}
      />
    );
  }
}

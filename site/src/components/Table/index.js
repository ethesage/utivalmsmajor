import React, { memo } from "react";
import "./style.scss";

const Table = ({ children, keys, usedefaultTh }) => {
  let tbody;
  let thead;

  if (Array.isArray(children)) {
    if (children.length > 2) throw new Error("Only 2 children are allowed");
  }

  thead = Array.isArray(children)
    ? children.filter(
        (child) =>
          typeof child !== "function" && child.type.name === "TableHead"
      )
    : typeof children !== "function" &&
      children.type.name === "TableHead" &&
      children;

  tbody = Array.isArray(children)
    ? children.filter(
        (child) =>
          typeof child === "function" || child.type.name === "TableBody"
      )[0]
    : (typeof children === "function" || children.type.name === "TableBody") &&
      children;

  return (
    <div className="g_tbl box-shade">
      <table>
        {(!!!thead || usedefaultTh) && (
          <thead>
            <tr>
              {keys.map((tkey, i) => (
                <th key={`table_head_${i}`} style={{ textAlign: tkey.align }}>
                  {typeof tkey === "string" ? tkey : tkey.name}
                </th>
              ))}
            </tr>
          </thead>
        )}
        {thead}
        {typeof tbody === "function" ? tbody({ keys }) : tbody}
      </table>
    </div>
  );
};

const TableHead = ({ keys }) => (
  <thead>
    <tr>
      {keys.map((tkey, i) => (
        <th key={`table_head_${i}`}>{tkey}</th>
      ))}
    </tr>
  </thead>
);

const TableBody = ({ keys, children }) => {
  return (
    <tbody>
      {children.map((child) =>
        React.cloneElement(child, { ...child.props, keys: keys })
      )}
    </tbody>
  );
};

const Trow = ({ values, keys, attr = {} }) => {
  return (
    <tr>
      {keys.map((key, i) => (
        <td
          key={`table_rows_xx_${i}`}
          style={{ textAlign: key.align }}
          {...attr}
        >
          {values[typeof key === "string" ? key : key.name]}
        </td>
      ))}
    </tr>
  );
};

export default {
  Table: memo(Table),
  Head: memo(TableHead),
  Body: memo(TableBody),
  Trow: memo(Trow),
};

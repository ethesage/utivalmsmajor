import React from 'react';
import './style.scss';

const Table = ({ children, keys, usedefaultTh }) => {
  let tbody;
  let thead;

  if (Array.isArray(children)) {
    if (children.length > 2) throw new Error('Only 2 children are allowed');
  }

  thead = Array.isArray(children)
    ? children.filter(
        (child) =>
          typeof child !== 'function' && child.type.name === 'TableHead'
      )
    : typeof children !== 'function' &&
      children.type.name === 'TableHead' &&
      children;

  tbody = Array.isArray(children)
    ? children.filter(
        (child) =>
          typeof child === 'function' || child.type.name === 'TableBody'
      )[0]
    : (typeof children === 'function' || children.type.name === 'TableBody') &&
      children;

  return (
    <div className="g_tbl shadow_div">
      <table>
        {(!!!thead || usedefaultTh) && (
          <thead>
            <tr>
              {keys.map((tkey, i) => (
                <th key={`table_head_${i}`}>{tkey}</th>
              ))}
            </tr>
          </thead>
        )}
        {thead}
        {typeof tbody === 'function' ? tbody({ keys }) : tbody}
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

const Trow = ({ values, keys }) => {
  return (
    <tr>
      {keys.map((key, i) => (
        <td key={`table_rows_xx_${i}`}>{values[key]}</td>
      ))}
    </tr>
  );
};

export default { Table: Table, Head: TableHead, Body: TableBody, Trow: Trow };

import React  from 'react';
import {NavLink} from 'react-router-dom';

export const LinksList = ({links}) => {
  if(!links.length) {
    return <p className="center">There are no links</p>
  }

  return (
    <table>
      <thead>
        <tr>
            <th>ID</th>
            <th>Origin</th>
            <th>Short link</th>
            <th>Open link</th>
        </tr>
      </thead>

      <tbody>
        {links.map((link, index) => {
          return (
            <tr key={link._id}>
              <td>{++index}</td>
              <td>{link.from}</td>
              <td>{link.to}</td>
              <td>
              <NavLink to={`/detail/${link._id}`}>Follow</NavLink>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
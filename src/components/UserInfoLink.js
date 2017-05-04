import React from 'react';
import HeaderLink from '../components/HeaderLink';

export default function UserInfoLink(props) {
  return (
    <span>
      <HeaderLink to="/">Welcome, {props.user.userName}</HeaderLink>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <HeaderLink to='/calendar'>Admin</HeaderLink>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <HeaderLink to='/more'>Search</HeaderLink>
    </span>
  )
}

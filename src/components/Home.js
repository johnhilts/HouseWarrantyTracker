import React from 'react';
import LoginContainer from '../containers/LoginContainer';

const Home = (props) => {
  return (
    // props.user && props.user.owner !== 0
    // ? <CalendarContainer {...props} />
    // :
    <LoginContainer user={props.user} onAuthorize={props.onAuthorize} />
  )
}

export default Home;

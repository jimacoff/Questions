import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './app';
import SessionFormContainerNew from './session_form_container_new';
import AuthForm from './auth_form';
import UserProfileContainer from './user/user_profile_container';




const Root = ({ store }) => {
// debugger
const _ensureLogIn = (nextState, replace) => {
  const currentUser = store.getState().session.currentUser;
  if (!currentUser) {
    replace('/login');
  }
}


const _redirectIfLoggedIn = () => {
  const currentUser = store.getState().session.currentUser;
  if (currentUser) {
    replace('/');
  }
}

return (
    <Provider store={ store }>
    <Router history={ hashHistory }>
      <Route path="/" component={ App } >
        <IndexRoute onEnter={_ensureLogIn}/>
        <Route path="/login" component={ AuthForm } />
        <Route path="/users/:id" component={ UserProfileContainer } onEnter={_ensureLogIn}/>
      </Route>
    </Router>
  </Provider>
  )
};

export default Root;
// <Route path="/users/:id" component={ UserProfile } />
// onEnter={_ensureLogIn}
// <Route path="/checkuser" component={ UserProfileContainer } />
// onEnter={_redirectIfLoggedIn}
// <Route path="/signup" component={ AuthForm } />

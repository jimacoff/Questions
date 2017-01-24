import React from 'react';
import SideBar from './sidebar/sidebar';
import Feed from './feed/feed';
import { withRouter } from 'react-router';

class Main extends React.Component {
  constructor(props) {
    super(props);
  }


  componentDidMount() {
  }

  componentWillReceiveProps(newProps) {
  }

  render() {
    if(this.props.currentUser && this.props.location.pathname !== "/settopics"){
      return (
        <div className="page-wraper">
          <div className="grid_page">
            <div className="sidebar-container">
              <SideBar currentUser={this.props.currentUser} />
            </div>

          </div>
        </div>
      );
    }
    return <div></div>
  }
}


export default withRouter(Main);


// <div className="feed-container">
// </div>

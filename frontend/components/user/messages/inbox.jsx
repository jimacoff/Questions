import React from 'react';


class Inbox extends React.Component {
constructor(props) {
  super(props);
}

  componentDidMount() {
    debugger
  }


  getTitle(msg) {
    if (msg.title == null) {
      return <span></span>
    }
    return <span>{msg.title}</span>
  }


  getMsgList() {
    const messages = this.props.currentUser.received_messages
    return (
      <ul>

      <table>
        <thead>
          <tr>
            <li>
              <td width="150px">From</td>
              <td width="250px">Title</td>
              <td width="100px">Date</td>
            </li>
          </tr>
        </thead>
        <tboby>

        {messages.map(message => {
          const date = new Date(message.created_at)
          const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          const Mon = monthNames[date.getMonth()];
          const Day = date.getDate();
          const Yr = date.getFullYear()
          return (


                <tr>
          <li key={message.id}>
              <td width="150px">{`${message.author_id}`}</td>
              <td width="250px">{this.getTitle(message)}</td>
              <td width="100px">{Mon} {Day}, {Yr}</td>
          </li>
        </tr>
        )
        })}
    </tboby>
    </table>
  </ul>
    )
  }


  render() {
    return (
      <div className="feed">
        {this.getMsgList()}
      </div>
    );
  }
}

export default Inbox;
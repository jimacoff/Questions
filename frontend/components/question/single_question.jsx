import React from 'react';
import { withRouter, Link } from 'react-router';



class SingleQuestion extends React.Component {

constructor(props) {
  super(props);
  this.state = { answer: false, answer_body: "" };
}


componentDidMount() {
  this.getQuestion()
    // if (this.props.question.body === "") {
    //   const topicId = this.props.params.topic_id;
    //   this.props.router.push(`/topics/${topicId}/questions/`);
    // }
}

getQuestion() {
  const question_data = {topic_id: this.props.params.topic_id , question_id: this.props.params.question_id };
  this.props.fetchSingleQuestion({question_data});
}

componentWillReceiveProps(nextProps) {
  if (this.props !== nextProps) {
    this.setState(nextProps)
  }
}

componentDidUpdate() {
}

componentWillMount() {
}

componentWillUnmount() {
}

update(field) {
  return e => this.setState({
    [field]: e.currentTarget.value
  });
}

// question likes

addLike(question) {
  this.props.likeQuestion(this.props.currentUser.id, question.id).then(() => {
    this.getQuestion();
  });
}

dislike(question) {
  this.props.dislikeQuestion(this.props.currentUser.id, question.id, 2).then(() => {
    this.getQuestion();
  });
}

checkIfLiked(question) {
  if (question) {
    if (question.liked_users && question.liked_users.length > 0) {
      for (let i = 0; i < question.liked_users.length; i++ ) {
        if (question.liked_users[i].id === this.props.currentUser.id) {
          return true;
        }
      }
    }
  } else {
  return false;
  }
}

getLikeButton(question) {
  if (question) {
    let likeBtn;
      if (this.checkIfLiked(question)) {
        likeBtn = <span>
        <button className="ans-btn-liked" id="vote-btn">Upvoters | {question.liked_users.length}</button>
        <span><a onClick={() => this.dislike(question)} className="downvote-link">Downvote</a></span>
        </span>
      } else {
        let likes;
        if (typeof question.liked_users === 'undefined') {
          likes = 0
        } else {
          likes = question.liked_users.length;
        }
        likeBtn = <button className="ans-btn" id="vote-btn" onClick={() => this.addLike(question)}>Upvoters | {likes}</button>
      }
    return likeBtn;
  } else {
    return null;
  }
}

// answer likes

addAnswerLike(answer) {
  this.props.likeAnswer(this.props.currentUser.id, answer.id).then(() => {
    this.getQuestion();
  });
}

dislikeAnswer(answer) {
  this.props.dislikeAnswer(this.props.currentUser.id, answer.id).then(() => {
    this.getQuestion();
  });
}

checkIfAnswerLiked(answer) {
if (answer.liked_users && answer.liked_users.length !== 0) {
  for (let i = 0; i < answer.liked_users.length; i++ ) {
    if (answer.liked_users[i].id === this.props.currentUser.id) {
      return true;
    }
  }
}
return false;
}

getAnswerLikeButton(answer) {
  let likeBtn;
    if (this.checkIfAnswerLiked(answer)) {
      likeBtn =
      <span>
      <button className="ans-btn-liked">Upvoters | {answer.liked_users.length}</button>
      <span><a onClick={() => this.dislikeAnswer(answer)} className="downvote-link">Downvote</a></span>
      </span>
    } else {
      let likes;
       if (typeof answer.liked_users === 'undefined') {
         likes = 0;
       } else {
         likes = answer.liked_users.length;
       }
      likeBtn = <button className="ans-btn" onClick={() => this.addAnswerLike(answer)}>Upvoters | {likes}</button>
    }
  return likeBtn;
}



renderAnswersQuntity() {
  if (typeof this.props.answers === 'undefined'){
    return null;
  } else {
    if (this.props.answers.length === 0) {
      return 'No answers yet...';
    } else {
      return (
        `Answers: ${this.props.answers.length}`
      );
    }
  }
}

sortByKey(array, key) {
  return array.sort((a, b) => {
      const x = a[key];
      const y = b[key];
      return ((x < y) ? 1 : ((x > y) ? -1 : 0));
  });
}

renderAnswers() {
  if (typeof this.props.answers === 'undefined'){
    return null;
  } else {
    this.sortByKey(this.props.answers, "created_at");
    return (
      <div>

        <ul className="answers-list">
            {this.props.answers.map((ans, i) => {
              const author = ans.ans_auth_first_name + ' ' + ans.ans_auth_last_name;
              const singleAnswer = ans;
              const now = new Date();
              return (
                <li key={ans.id + now}>
                  <div className="single-answer-list">
                    <div className="ans-date">
                      <div className="auth-answer-pic"><Link to={`/users/${ans.author_id}`}><img src={ans.ans_auth_userpic_url} /></Link></div>
                      <p className="ans-date"><span id="ans-auth"><Link to={`/users/${ans.author_id}`}>{author}</Link></span>{this.getAnswerDate(ans, now)}</p>
                    </div>
                    <div className="answer-body">
                      {ans.body}
                    </div>
                    <div className="questions-attr">
                      {this.getAnswerLikeButton(singleAnswer)}
                      <button className="attt-links">Comments</button>
                      <button className="comments-count">{Math.ceil(this.props.params.topic_id/2-i)}+</button>
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}

getRandomTen() {
  return Math.ceil(Math.random()*10)
}

getRandomHundred() {
  return Math.ceil(Math.random()*100)
}

handleCreateAnswer(e) {
  e.preventDefault();
  const topic_id = parseInt(this.props.params.topic_id);
  const question_id = parseInt(this.props.params.question_id);
  const newAnswer = {question_id: question_id, author_id: this.props.currentUser.id, body: this.state.answer_body }
  this.setState({answer: false});
  this.props.createAnswer(newAnswer, topic_id).then(() => {
    this.getQuestion();
  });
}

goToUserProfile(e) {
  e.preventDefault();
  if (this.props.location.pathname !== `/users/${this.props.currentUser.id}`) {
    this.props.router.push(`/users/${this.props.currentUser.id}`)
  }
}

updateDescrLength(str){
  if (str && str.length > 125) {
    return str.slice(0, 124) + '...';
  }
  return str;
}

checkLoggedIn(){
  if (!this.props.currentUser) {
    this.props.router.push("/login");
  }
}

cutTitle(str) {
  if (str.length > 75) {
    return str.slice(0, 70) + "...";
  }
  return str;
}

getInnerNav() {
  if (this.props.question.body !== "") {
    const topic_id = this.props.question.topic_id;
    const topic_title = this.props.question.topic_title;
    const quest_id = this.props.question.id;
    const quest_title = this.cutTitle(this.props.question.body);
    return (
    <div className="inner-nav">
      <Link to={`/topics/${topic_id}/questions`}>{topic_title}</Link>
      <span>{` >> `}</span><Link to={`/topics/${topic_id}/questions/${quest_id}`}>{quest_title}</Link>
    </div>
    );
  }
}

getAnswerDate(answer, now) {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const date = new Date(answer.created_at);
  const qMon = monthNames[date.getMonth()];
  const qDay = date.getDate();
  const qYr = date.getFullYear()
  const dif = Math.floor((now - date) / 1000);
  if (dif < 30) {
    return ' wrote just now'
  } else if (dif < 60) {
    return ' wrote less than a minute ago'
  } else if (dif < 120) {
    return ' wrote less than 2 minutes ago'
  } else if (dif < 300) {
    return ' wrote less than 5 minutes ago'
  } else if (dif < 600) {
    return ' wrote less than 10 minutes ago'
  } else if (dif < 3600) {
    return ' wrote less than an hour ago'
  } else if (dif < 86400) {
    return ' wrote today'
  } else if (dif < 172800) {
    return ' wrote yesterday'
  } else {
    return ` wrote on ${qMon} ${qDay} ${qYr}`
  }
}

getQuestionDate(question, now) {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const date = new Date(question.created_at);
  const qMon = monthNames[date.getMonth()];
  const qDay = date.getDate();
  const qYr = date.getFullYear()
  const dif = Math.floor((now - date) / 1000);
  if (dif < 30) {
    return 'asked just now'
  } else if (dif < 60) {
    return 'asked less than a minute ago'
  } else if (dif < 120) {
    return 'asked less than 2 minutes ago'
  } else if (dif < 300) {
    return 'asked less than 5 minutes ago'
  } else if (dif < 600) {
    return 'asked less than 10 minutes ago'
  } else if (dif < 3600) {
    return 'asked less than an hour ago'
  } else if (dif < 86400) {
    return 'asked today'
  } else if (dif < 172800) {
    return 'asked yesterday'
  } else {
    return `asked on ${qMon} ${qDay} ${qYr}`
  }
}

render () {
  this.checkLoggedIn();
  let authName, userpic, userId, descr, now;
  if (this.props.question.topic_id !== 0) {
    const author = this.props.question.user;
    now = new Date();
    authName = this.props.question.first_name + ' ' + this.props.question.last_name;
    userpic = this.props.question.author_userpic_url;
    userId = this.props.question.author_id;
    descr = this.props.question.description;
  }

  if (!this.state.answer) {
  return (
    <div className="single-question-container">
      {this.getInnerNav()}
      <div className="question-part">
        <div className="question-author-info">
          <div className="question-author-userpic">
            <Link to={`/users/${userId}`}><img src={userpic} /></Link>
          </div>
          <div className="question-author-name">
            <span id="link-auth-name"><Link to={`/users/${userId}`}>{authName}</Link></span>
            <span className="question-author-descr">, {this.updateDescrLength(descr)}</span>
            <p className="question-date">{this.getQuestionDate(this.props.question, now)}</p>
          </div>
        </div>
        <div className="single-question-body">{this.props.question.body}</div>
        <div className="question-buttons">
          <button className="ans-btn" onClick={() => this.setState({answer: true})}>Add answer</button>
          {this.getLikeButton(this.state.question)}
          <span className="ans-number">{this.renderAnswersQuntity()}</span>
        </div>
      </div>
      <div className="answers-part">
        <div className="answers">
          {this.renderAnswers()}
        </div>
      </div>
    </div>
  );
} else {
  now = new Date();
  return (
    <div className="single-question-container">
      {this.getInnerNav()}
      <div className="question-part">
        <div className="question-author-info">
          <div className="question-author-userpic">
            <Link to={`/users/${userId}`}><img src={userpic} /></Link>
          </div>
          <div className="question-author-name">
            <span id="link-auth-name"><Link to={`/users/${userId}`}>{authName}</Link></span>
            <span className="question-author-descr">, {this.updateDescrLength(descr)}</span>
            <p className="question-date">{this.renderAnswersQuntity()}</p>
          </div>
        </div>
        <div className="single-question-body">{this.props.question.body}</div>
        <div className="ans-form">
          <form className="answer-form" onSubmit={(e) => this.handleCreateAnswer(e)}>
            <div className="answer-input">
                <textarea
                onChange={this.update("answer_body")}
                className="auth-form-input answer-input"/>
            </div>

            <div className="answer-buttons">
                <button onClick={() => this.setState({answer: false})}>Cancel</button>
                <input className="ans-btn"
                  type="submit"
                  value="Add answer"/>
            </div>
          </form>
        </div>
      </div>
      <div className="answers-part">
        <div className="answers-2">
          {this.renderAnswers()}
        </div>
      </div>

    </div>
  );
}
}

}

export default SingleQuestion;

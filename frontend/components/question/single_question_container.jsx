import React from 'react';
import { connect } from 'react-redux';
import SingleQuestion from './single_question';
import { fetchSingleQuestion } from '../../actions/question_actions';
import { createAnswer } from '../../actions/answer_actions';


const mapStateToProps = ({question}) => {
  return ({
    question: question.question,
    answers: question.question.answers,
    views: question.question.views,
    rating: question.question.rating
  })
}


const mapDispatchToProps = (dispatch) => {
  return ({
    fetchSingleQuestion: ({question_data}) => dispatch(fetchSingleQuestion({question_data})),
    createAnswer: (answer, topic_id) => dispatch(createAnswer(answer, topic_id))
  });
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleQuestion);

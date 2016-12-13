import * as APIUtil from '../util/questions_api_util';

export const RECEIVE_SINGLE_QUESTION = "RECEIVE_SINGLE_QUESTION";
export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS"


export const receiveSingleQuestion = (question) => {
  debugger
  return ({
    type: RECEIVE_SINGLE_QUESTION,
    question: question
  });
}

export const receiveQuestions = (questions) => {
  return ({
    type: RECEIVE_QUESTIONS,
    questions
  })
}

export const receiveErrors = (errors) => {
  return ({
    type: RECEIVE_ERRORS,
    errors
  })
}




export const createQuestion = (question) => {
  return (dispatch) => {
    return APIUtil.createQuestion(question).then((result) => {
      return dispatch(receiveSingleQuestion(result));
      },
      (errors) => {
        return dispatch(receiveErrors(errors));
      })
  }
}



export const fetchSingeleQuestion = (question) => {
  debugger
  return (dispatch) => {
    return APIUtil.fetchSingeleQuestion(question).then(result => dispatch(receiveSingleQuestion(result)) );
  }
}

export const fetchQuestions = (topic_id) => {
  debugger
  return (dispatch) => {
    return APIUtil.fetchQuestions(topic_id).then(result => dispatch(receiveQuestions(result)) );
  }
}

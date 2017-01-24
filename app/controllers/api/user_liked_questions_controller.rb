class Api::UserLikedQuestionsController < ApplicationController

  def index
    @user_liked_questions = current_user.liked_questions
  end


  def create
    @user_liked_question = UserLikedQuestion.new(question_params)
    if @user_liked_question.save
      @question = @user_liked_question.liked_question
      @user = @question.user
      render 'api/questions/show'
    else
      render json: @user_liked_question.errors.full_messages, status: 422
    end
  end


  def destroy
    idx = params[:id].to_i
    liked_question = UserLikedQuestion.all.where({user_id: question_params[:user_id]}).where({question_id: question_params[:question_id]})
    @question = liked_question[0].liked_question
    @topic = @question.topic
    @topic_questions = @topic.questions
    @user = current_user
    unless liked_question.nil?
      UserLikedQuestion.delete(liked_question)
      render 'api/topics/show' if idx == 1
      render 'api/questions/show' if idx == 2
    else
      render json: ['no such liked question'], status: 404
    end
  end


  private

  def question_params
    params.require(:user_liked_question).permit(:user_id, :question_id)
  end


end

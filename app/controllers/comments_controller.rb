class CommentsController < ApplicationController

  skip_before_action :verify_authenticity_token, if: :json_request?
  before_action :set_post

  def create
    comment = Comment.new comment_params
    if comment.save
      @post.reload
      render partial: 'posts/show'
    else
      render json: {errors: comment.errors}, status: :unprocessable_entity
    end
  end

  private

  def set_post
    @post = Post.find params[:post_id]
  end

  def json_request?
    request.format.json?
  end

  def comment_params
    _comment_params = params.require(:comment).permit(:content, :user_id)
    _comment_params[:post_id] = @post.id
    _comment_params
  end

end

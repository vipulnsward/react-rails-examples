class PostsController < ApplicationController

  skip_before_action :verify_authenticity_token, if: :json_request?

  before_action :set_post, except: [:index, :create]

  def index
    @posts = Post.includes(:comments).to_a
  end

  def show
    render
  end

  def create
    post = Post.new post_params
    if post.save
      @posts = Post.includes(:comments).to_a
      render partial: 'index'
    else
      render json: {errors: post.errors}, status: :unprocessable_entity
    end
  end

  def set_post
    @post = Post.find params[:id]
  end

  private

  def post_params
    params.require(:post).permit(:id, :content, :title, :user_id)
  end

  def json_request?
    request.format.json?
  end

end

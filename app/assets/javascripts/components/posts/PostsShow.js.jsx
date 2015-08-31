class PostsShow extends React.Component {
  constructor(props){
    super(props);
    var {post} = props;

    post = JSON.parse(post);
    this.state = {post: post, comments: post.comments}
  }

  render() {
    let {post, comments} = this.state;
    let commentsDisplay = comments.map((comment) => {
      return this.renderComment(comment)
    });


    return (
        <div>
          <h1>{post.title}</h1>
          <well>
            {post.content}
          </well>
          <br/>
          <br/>
          <h3>Comments: </h3><br/>
          <ul>{commentsDisplay}</ul>
          <CommentsNew {...this.props} setComments={::this.setComments}/>
        </div>
    );
  }

  renderComment(comment) {
    return ( <li>
      {comment.user_name}- {comment.content}
    </li>)
  }

  setComments(comments){
    this.setState({comments: comments});
  }
}



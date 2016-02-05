let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

class PostsIndex extends React.Component {
  constructor(props){
    super(props);
    var {posts} = this.props;
    posts = JSON.parse(posts);
    console.log(posts);
    this.state = {posts: posts};
  }

  render() {
    let postsDisplay = this.state.posts.map((post) => {
      return this.renderPost(post)
    });
    return (
        <div>
          <h1>All Posts</h1>
          <ul>
            <ReactCSSTransitionGroup transitionName="posts-list" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
              {postsDisplay}
            </ReactCSSTransitionGroup>
          </ul>
          <br/><br/>
          New Post: <br/>
          <PostsNew {...this.props} setPosts={::this.setPosts}/>
        </div>
    );
  }

  setPosts(posts){
    this.setState({posts: posts});
  }

  renderPost(post) {
    return ( <li key={post.id}>
      <a href={post.url}>{post.title}: {post.content}</a>
    </li>)
  }

}

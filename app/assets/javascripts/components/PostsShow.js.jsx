class PostsShow extends React.Component {
  render() {
    var {post} = this.props;
    console.log('props');
    console.log(this.props);
    post = JSON.parse(post);
    console.log(post);

    return (
        <div>
          <h1>{post.title}</h1>
          <well>
            {post.content}
          </well>
          <br/>
          <br/>
        </div>
    );
  }

}



class CommentsNew extends React.Component {
  constructor(props) {
    super(props);
    var {post} = this.props;
    post = JSON.parse(post);

    this.state = {user_id: this.props.user_id, post: post}
  }

  render() {
    var errorMessage = this.renderError();
    return (
        <div>
          {errorMessage}
          <form onSubmit={::this.submitComment}>

            <div className="form-group">
              <textarea className="form-control"
                        placeholder="Content"
                        value={this.state.content}
                        onChange={(event) => this.handleChange(event, 'content')}/>
            </div>

            <div className="form-group">
              <button type="submit"
                      ref="submit"
                      className="btn btn-success">
                Commment on this
              </button>
            </div>
          </form>
        </div>
    );
  }

  renderError() {
    if (this.state.errors) {
      var errors = this.state.errors;
      return (
          <div className="alert alert-danger">
            <ul>
              {Object.keys(errors).map((error_key) => {
                return <li>{error_key} : {errors[error_key].join(', ')} </li>
              })}
            </ul>
          </div>
      );
    }
  }

  handleChange(event, attribute) {
    var newState = this.state;
    newState[attribute] = event.target.value;
    newState.errors = null;
    this.setState(newState);
    console.log(this.state);
  }


  setComments(comments_response) {
    if (comments_response.errors) {
      this.setState({errors: comments_response.errors})
    } else {
      this.props.setComments(comments_response.comments);
    }
  }

  parseJSON(response) {
    return response.json()
  }

  submitComment(event) {
    event.preventDefault();

    fetch(this.state.post.new_comment_url, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({comment: this.state})
    }).then(::this.parseJSON)
      .then(::this.setComments)
      .catch(function (ex) {
        console.log('parsing failed', ex)
      });

    this.setState({content: null});

  }
}



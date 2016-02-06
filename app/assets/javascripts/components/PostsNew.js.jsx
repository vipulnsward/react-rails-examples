class PostsNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {user_id: this.props.user_id}
  }

  render() {
    var errorMessage = this.renderError();
    return (
        <div>
          {errorMessage}
          <form onSubmit={::this.submitPost}>

            <div className="form-group">
              <textarea className="form-control"
                        placeholder="Title"
                        value={this.state.title}
                        onChange={(event) => this.handleChange(event, 'title')}/>
            </div>


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
                Submit
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


  setPosts(posts) {
    if (posts.errors) {
      this.setState({errors: posts.errors, title: '', content: ''})
    } else {
      this.props.setPosts(posts);
      this.setState({errors: null, title: '', content: ''})
    }
  }

  parseJSON(response) {
    return response.json()
  }

  submitPost(event) {
    event.preventDefault();

    fetch('/posts', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({post: this.state})
    }).then(::this.parseJSON)
      .then(::this.setPosts)
      .catch(function (ex) {
      console.log('parsing failed', ex)
    });

  }
}

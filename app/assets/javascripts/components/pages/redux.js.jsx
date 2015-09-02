"use strict";

let {createStore} = Redux;
let { Provider, connect } = ReactRedux;

// React component
class Counter extends React.Component {
  render() {
    const { value, onIncreaseClick } = this.props;
    return (
        <div className='text-center'>
          <span>Counter Value is {value}</span><br/>
          <button className= 'btn btn-large btn-success' onClick={onIncreaseClick}>Increase</button>
        </div>
    );
  }
}

// Action:
const increaseAction = {type: 'increase'};

// Reducer:
function counter(state = {count: 0}, action) {
  let count = state.count;
  switch (action.type) {
    case 'increase':
      return {count: count + 1};
    default:
      return state;
  }
}

// Store:
let store = createStore(counter);

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    value: state.count
  };
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onIncreaseClick: () => dispatch(increaseAction)
  };
}

// Connected Component:
let App = connect(
    mapStateToProps,
    mapDispatchToProps
)(Counter);


$(document).ready(function () {
  if (document.getElementById('redux-root')) {
    React.render(
        <Provider store={store}>
          {() => <App />}
        </Provider>,
        document.getElementById('redux-root')
    );
  }
});


"use strict";

let {createStore} = Redux;

// React component
class Counter extends React.Component {
  render() {
    const { count, onIncreaseClick } = this.props;
    return (
        <div className='text-center'>
          <span>Counter Value is {count}</span><br/>
          <button className= 'btn btn-large btn-success' onClick={onIncreaseClick}>Increase</button>
        </div>
    );
  }
}

// Action:
const increaseAction = {type: 'increase'};

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    count: state.count
  };
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onIncreaseClick: () => dispatch(increaseAction)
  };
}

$(document).on(window.ReactRailsUJS.setReduxStoreEvent, function(){
  // Store:
  window.ReactRailsUJS.reduxStore = createStore(counter);

  // Reducer:
  function counter(state = window.ReactRailsUJS.reduxState, action) {
    let count = state.count;
    switch (action.type) {
      case 'increase':
        return {count: count + 1};
      default:
        return state;
    }
  }

});

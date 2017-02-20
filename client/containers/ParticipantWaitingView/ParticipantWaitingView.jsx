import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { actions } from '../actions/index.js';

class ParticipantWaitingView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>ParticipantWaitingView</h1>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    counter: state._reducer
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({ }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantWaitingView);
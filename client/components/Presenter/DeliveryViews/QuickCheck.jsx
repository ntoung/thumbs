import React from 'react';
import socket from '../../../config/socket';
import styles from '../../../styles/components/_questionPrompt';

import Results from './Results';

class QuickCheck extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleCardToggle = this.handleCardToggle.bind(this);

    this.state = {
      buttonName: '',
      showDetails: true,
      showResults: false,
      responses: null
    };

  }

  handleCardToggle(e) {
    this.setState({showDetails: !this.state.showDetails});
  }

  handleClick(e) {
    if (this.props.status === 'WAITING') {
      socket.emit('startVote', {
        room: 'FRED',
        questionTitle: this.props.questionTitle,
        choices: this.props.choices,
        questionType: e.target.value
      });
      this.setState({
        buttonName: 'Stop Vote',
        showResults: true,
        responses: responses
      });
    } else if (this.props.status === 'IN_PROGRESS') {
      if (this.props.questionType === 'THUMBS') {
        var responses = this.props.thumbs;
      } else if (this.props.questionType === 'YES_NO') {
        var responses = this.props.yesNo;
      } else if (this.props.questionType === 'SCALE') {
        var responses = this.props.scale;
      }
      this.setState({
        buttonName: 'Ask Another Question',
        responses: responses });
      socket.emit('endVote', {room: 'FRED'});
    } else if (this.props.status === 'ENDED') {
      socket.emit('newVote', {room: 'FRED'});
      this.setState({
        buttonName: 'Resend Question',
        showResults: false
      });
    }
  }

  toggleArrow () {
    if (this.state.showDetails) {
      return (
        <div className={styles.icons}>
          <i className="fa fa-angle-up" aria-hidden="true"></i>
        </div>
      );
    } else {
      return (
        <div className={styles.icons}>
          <i className="fa fa-angle-down" aria-hidden="true"></i>
        </div>
      );
    }
  }

  showDetails () {
    if (this.state.showDetails) {
      return (
        <div>
          <button className={styles.quickCheckButton} onClick={this.handleClick} value="YES_NO">Y/N</button>
          <button className={`fa fa-thumbs-up ${styles.quickCheckButton}`} onClick={this.handleClick} aria-hidden="true" value="THUMBS" />
          <button className={`fa fa-sliders ${styles.quickCheckButton}`} onClick={this.handleClick} value="SCALE" />
          { this.showResults() }
          { this.showButton() }
        </div>
      );
    }
  }

  showButton() {
    if (this.props.status !== 'WAITING') {
      return (
        <div className={styles.right}>
          <button className={styles.primaryButton} onClick={this.handleClick}>{this.state.buttonName}</button>
        </div>
      );
    }
  }

  showResults() {
    if (this.state.showResults) {
      return (
        <Results
          questionType={this.props.questionType}
          responses={this.state.responses || this.props.scale}
        />
      );
    }
  }

  render() {
    return (
      <div className={styles.card}>
        <div className={styles.label}>
          Quick Check
          <span className={styles.questionIcons} onClick={this.handleCardToggle}>{this.toggleArrow()}</span>
        </div>
        { this.showDetails() }
    </div>
    );
  }
}

export default QuickCheck;

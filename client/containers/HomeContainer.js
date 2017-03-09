import React from 'react';
import styles from '../styles/pages/_Home';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { login } from '../actions/loginActions.js';

class HomeContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      validRoom: false,
      roomCode: '',
      deliveryCode: '',
      availableRooms: []
    };

    this.onEnterRoomChange = this.onEnterRoomChange.bind(this);
    this.onEnterRoomSubmit = this.onEnterRoomSubmit.bind(this);
    this.checkRoom = this.checkRoom.bind(this);

    this.onEnterDeliveryChange = this.onEnterDeliveryChange.bind(this);
    this.onEnterDeliverySubmit = this.onEnterDeliverySubmit.bind(this);
    this.checkDelivery = this.checkDelivery.bind(this);
  }

  checkRoom(roomCodeAttempt) {
    const context = this;
    return axios.get(`/db/c/${roomCodeAttempt}`)
    .then(function (response) {
      if (response.data.length !== 0) {
        context.setState({'roomCode': roomCodeAttempt, 'validRoom': true});
      } else {
        context.setState({'validRoom': false});
      }

    })
    .catch(function (error) {
      console.log(error);
    });
  }

  onEnterRoomChange(e) {
    let roomCodeAttempt = e.target.value.toUpperCase();
    
    if (roomCodeAttempt.length === 4) {
      this.checkRoom(roomCodeAttempt);
    } else {
      // attempt isn't 4 letters
      this.setState({'validRoom': false});
    }
  }

  onEnterRoomSubmit(e) {
    this.state.validRoom && browserHistory.push('/r/' + this.state.roomCode);
    e.preventDefault();
  }

  checkDelivery(deliveryCodeAttempt) {
    const context = this;
    return axios.get(`/db/s/${deliveryCodeAttempt}`)
    .then(function (response) {
      if (response.data.length !== 0) {
        context.setState({'deliveryCode': deliveryCodeAttempt, 'validDelivery': true});
      } else {
        context.setState({'validDelivery': false});
      }

    })
    .catch(function (error) {
      console.log(error);
    });
  }

  onEnterDeliveryChange(e) {
    let deliveryCodeAttempt = e.target.value.toUpperCase();
    
    if (deliveryCodeAttempt.length === 4) {
      this.checkDelivery(deliveryCodeAttempt);
    } else {
      // attempt isn't 4 letters
      this.setState({'validDelivery': false});
    }
  }

  onEnterDeliverySubmit(e) {
    this.state.validDelivery && browserHistory.push('/s/' + this.state.deliveryCode);
    e.preventDefault();
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <form className={styles.enterRoomInput} onSubmit={this.onEnterRoomSubmit}>
            <div className={styles.label}>Participant</div>
            <input 
              onChange={this.onEnterRoomChange}
              type="text" 
              placeholder="Enter Valid Room Code: ABCD"
              maxLength="4"
              required
            >
            </input>
            <button className={styles.enterRoom}>
                <span className={(this.state.validRoom) ? styles.validRoom : ''} >
                <i className="fa fa-sign-in" aria-hidden="true"></i>
                </span>
            </button> 
          </form>
        </div>
        <div className={styles.card}>
          <form className={styles.enterSlidesInput} onSubmit={this.onEnterDeliverySubmit}>
            <div className={styles.label}>Presenter</div>
            
            <input 
              onChange={this.onEnterDeliveryChange}
              type="text" 
              placeholder="Enter Valid Delivery Code: ABCD"
              maxLength="4"
              required
            >
            </input>
            <button className={styles.enterDelivery}>
                <span className={(this.state.validDelivery) ? styles.validDelivery : ''} >
                <i className="fa fa-television" aria-hidden="true"></i>
                </span>
            </button> 
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  login
}, dispatch);

export default connect(null, mapDispatchToProps)(HomeContainer);

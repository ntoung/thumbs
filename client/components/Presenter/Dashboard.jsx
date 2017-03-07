import React from 'react';
import styles from '../../styles/pages/_Dashboard';
import axios from 'axios';

import { Link, browserHistory } from 'react-router';

import { connect } from 'react-redux';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lectures: []
    };

    this.getLectures = this.getLectures.bind(this);
    this.displayLectures = this.displayLectures.bind(this);

    this.getLectures();
  }

  getLectures() {
    const context = this;

    // This endpoint returns all lectures given a userId
    axios.get('/db/l')
    .then(function (response) {
      console.log('Dashboard: getLectures ', response);
      var lectures = response.data;
      context.setState({lectures: lectures});
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  displayLectures() {
    return (
      this.state.lectures.map(lecture => {
        return (
          <Link to={`/l/${lecture.id}`}>
            <div className={styles.card}>
              <div className={styles.label}>Lecture</div>
              {lecture.title}
            </div>
          </Link>
        );
      })
    );
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <div className={styles.label}>
          Dashboard
          </div>
          <h3>Welcome {this.props.name}</h3>
        </div>
        {this.displayLectures()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.loginReducer.name,
  email: state.loginReducer.email
});

export default connect(mapStateToProps, null)(Dashboard);
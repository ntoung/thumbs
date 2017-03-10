import React from 'react';
import { Radar } from 'react-chartjs';
import styles from '../../styles/components/_radarChart';

export default class RadarChart extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    var labels = this.props.data.map(choice => {
      return choice.label;
    });

    var dataValues = this.props.data.map(choice => {
      return choice.values;
    });

    var data = {
      labels: labels,
      datasets: [
        {
          label: "Results",
          backgroundColor: "rgb(204, 204, 204, .2)",
          borderColor: "rgba(12, 164, 165, 1)",
          pointBackgroundColor: "rgba(34, 34, 34, .8)",
          pointBorderColor: "rgba(34, 34, 34, 1)",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(179,181,198,1)",
          data: dataValues
        }
      ]
    };
    return (
      <div className={styles.radarWrapper}>
        <Radar data={data} redraw/>
      </div>
    );
  }
}

// data={this.props.data}

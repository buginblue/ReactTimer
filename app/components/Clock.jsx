var React = require('react');

var Clock = React.createClass({
  getDefaultProps: function () {
    totalSeconds: 0     // default prop if not passed down from parent
  },
  propTypes: {
    totalSeconds: React.PropTypes.number
  },
  formatSeconds: function (totalSeconds) {  // method to take in seconds and return string
    var seconds = totalSeconds % 60;    // remainder when total divided by 60 = secs
    var minutes = Math.floor(totalSeconds / 60); // round down to whole hour

    if (seconds < 10) {
      seconds = '0' + seconds;
    }

    if (minutes < 10) {
      minutes = '0' + minutes;
    }

    return minutes + ':' + seconds;
  },
  render: function () {
    var {totalSeconds} = this.props;   // put passed prop into variable

    return (     // pass through formating and render
      <div className="clock">
        <span className="clock-text">
          {this.formatSeconds(totalSeconds)}
        </span>
      </div>
    );
  }
});

module.exports = Clock;

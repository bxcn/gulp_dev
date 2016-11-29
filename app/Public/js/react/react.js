var Component = React.createClass({
  render: function() {
    return <div>{this.props.foo}</div>;
  }
});
ReactDOM.render(
  <Component foo="123"></Component>,
  document.getElementById("react")
);

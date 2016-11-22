var Component = React.createClass({
  getDefaultProps: function() {
    return {
      "data-price"
    }
  },
  render: function() {
    return <div>{{this.props.foo}}</div>;
  }
});

var props = {};
props.foo = x;
props.bar = y;

ReactDOM.render(
  <Component {...props}>
    
  </Component>,
  document.getElementById("react")
);

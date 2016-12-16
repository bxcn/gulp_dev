class Point {
  constructor( x, y ) {
    this.x = x;
    this.y = y;
  }
  foo() {
    console.log( 'Point foo' );
  }
}

var p = new Point( 1, 2 );

module.exports = p;

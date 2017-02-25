const JwtStrategy = require( 'passport-jwt' ).Strategy;
const ExtractJwt = require( 'passport-jwt' ).ExtractJwt;
const User = require( '../models/user' );
const config = require( './database' );


module.exports = function ( passport ) {
  let opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = config.secret;
  passport.use( new JwtStrategy( opts, ( jwt_payload, done ) => {
    console.log( jwt_payload );
    User.getUserById( jwt_payload._doc._id, ( err, user ) => {
      if ( err ) {
        return done( err, false );
      }
      if ( user ) {
        done( null, user );
      } else {
        done( null, false );
        // or you could create a new account
      }
    } );
  } ) );
}

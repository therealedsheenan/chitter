import * as passport from 'passport';
import * as passportLocal from 'passport-local';
import { getRepository } from 'typeorm';

const LocalStrategy = passportLocal.Strategy;
import { User } from '../entities/user';

// login passport strategy
const passportStrategy = () => {
  return passport.use(new LocalStrategy({
    usernameField: 'user[email]',
    passwordField: 'user[password]',
  }, async (email, password, done) => {
    const getUser = await getRepository(User).find({email});
    if (!getUser ) {
      return done(null, false, {errors: {'email or password': 'is invalid'}});
    }

    return done(null, getUser);
  }));
};

export default passportStrategy;

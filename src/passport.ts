import passport from 'passport';
import { Strategy, IStrategyOptions } from 'passport-local';

import User from './models/User';

const opt: IStrategyOptions = {
  usernameField: 'email'
};

passport.use(new Strategy(opt, async (
  email: string,
  password: string,
  done
) => {

  const user = await User.findOne({ email });

  if(!user) {
    return done(null, false, { message: 'Incorrect email or password' });
  } else {
    if(await user.matchPassword(password)) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Incorrect email or password' });
    }
  }

}));

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id).lean();
  done(null, user);
});
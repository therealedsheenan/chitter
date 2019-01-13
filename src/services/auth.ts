import { AuthChecker } from 'type-graphql';

import { User } from '../interfaces/user.interface';

export interface Context {
  user?: User;
}
// create auth checker function
export const authChecker = ({ context }, roles) => {
  // tslint:disable-next-line
  // console.log(context.req.headers);
  // console.log(context);
  // if (roles.length === 0) {
  //   // if `@Authorized()`, check only is user exist
  //   return user !== undefined;
  // }
  // // there are some roles defined now
  //
  // if (!user) {
  //   // and if no user, restrict access
  //   return false;
  // }

  // no roles matched, restrict access
  return false;
};

export const getToken = (token: string) => {
  return token;
};

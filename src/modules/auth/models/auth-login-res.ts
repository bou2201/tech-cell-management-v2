import { User } from '~user-mnt/models';

export class AuthLoginResponse {
  accessToken: string = '';
  accessTokenExpires: number = 0;
  refreshToken: string = '';
  user: User = new User();

  constructor(data?: AuthLoginResponse) {
    if (data) {
      Object.assign(this, data);
    }
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
type LoginResponse = {
  accessToken: string;
};
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string): Promise<LoginResponse> {
    const existingUser: User = await this.usersService.fetchSingleUser({
      username,
    });
    if (!existingUser) {
      throw new UnauthorizedException();
    }

    if (!existingUser.comparePassword(password)) {
      throw new UnauthorizedException();
    }

    const payload = { sub: existingUser.id, username: existingUser.username };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}

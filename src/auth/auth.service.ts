import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async genrateToken(payload: any): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      secret: jwtConstants.secret,
      expiresIn:21600,
    });
  }

  async decodeRefreshToken(oldRefreshToken: string): Promise<string> {
    try {
      const payload = await this.jwtService.decode(oldRefreshToken);
      const userId = payload;
      return userId;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
  async validateToken(token: string) {
    return this.jwtService.verify(token, {
      secret: jwtConstants.secret,
    });
  }
  async generateRefreshToken(userId: number) {
    const tokenId = uuidv4();
    const refreshToken = await this.jwtService.signAsync(
      { id: userId, tokenId: tokenId },
      { expiresIn: '7d', secret: jwtConstants.secret },
    );
    return refreshToken;
  }
}

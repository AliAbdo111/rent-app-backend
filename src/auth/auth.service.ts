import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async genrateToken(payload: any): Promise<string> {
    console.log("generate ")
    return await this.jwtService.signAsync(payload,{
      secret:'strrooossdd,'
    });
  }

  async decodeRefreshToken(oldRefreshToken: string): Promise<string> {
    try {
      const payload = await this.jwtService.decode(oldRefreshToken);
      const userId = payload;
      return userId;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }
  }
  async generateRefreshToken(userId: number) {
    const tokenId = uuidv4();
    const refreshToken = await this.jwtService.signAsync(
      { id: userId, tokenId: tokenId },
      { expiresIn: '7d', secret: 'strrooossdd,' },
    );
    return refreshToken;
  }
}

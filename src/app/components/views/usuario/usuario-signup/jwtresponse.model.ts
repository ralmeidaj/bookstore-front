export interface JwtResponse{
      id: string;
      username: string,
      email: string,
      roles: Array<string>,
      tokenType: string,
      accessToken: string
}
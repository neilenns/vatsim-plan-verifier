export interface IAuth0User {
  _id: string;
  sub: string;
  email?: string;
  isPending: boolean;
  roles: string[];
}

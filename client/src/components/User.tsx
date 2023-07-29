import { IUser } from "../interfaces/IUser.mjs";

type UserProps = {
  user: IUser;
};

const User = ({ user }: UserProps) => {
  return <div>{user.firstName}</div>;
};

export default User;

export type UserLoginData = {
  userName: string;
  password: string;
};

export type UserNoId = UserLoginData & {
  firstName: string;
  lastName: string;
  email: string;
  friends: User[];
  enemies: User[];
};

export type UserWithId = {
  id: string;
};

export type User = UserNoId & UserWithId;

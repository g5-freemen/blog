export type ActionType = {
  type?: string;
  payload?: any;
};

export type UserType = {
  email: string;
  username: string;
  bio: string | null;
  image: string | null;
};

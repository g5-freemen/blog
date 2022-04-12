export type RequestType = {
  method?: 'POST' | 'PUT' | 'DELETE';
  headers: {
    'Content-Type': string;
    Authorization?: string;
  };
  body?: string;
};

export type ErrorType = {
  message: string;
};

export type UpdateUserType = {
  email?: string;
  username?: string;
  password?: string;
  bio?: string | null;
  image?: string | null;
};

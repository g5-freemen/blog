export type RequestType = {
  method?: 'POST' | 'PUT' | 'DELETE';
  headers: {
    'Content-Type': string;
    Authorization?: string;
  };
  body?: string;
};

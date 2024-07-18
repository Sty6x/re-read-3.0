export type jsonResponse = {
  message: string;
  isError: boolean;
  redirect: {
    canNavigate: boolean;
    route: string;
  };
  data?: any;
};

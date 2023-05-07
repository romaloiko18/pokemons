export type Comment = {
  user: {
    _id: string;
    email: string;
  };
  content: string;
  createdAt: Date;
};

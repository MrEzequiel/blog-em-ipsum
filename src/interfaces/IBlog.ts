import IBlogComments from "./IBlogComments";

interface IBlog {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface BlogWithComments extends IBlog {
  comments: IBlogComments[];
}

export default IBlog;

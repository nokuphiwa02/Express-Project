export interface Authors {
  id: number; //primary key
  name: string;
  email: string;
}

export interface Books {
  id: number;
  title: string;
  authorId: number; // foreign key because its contain an existing Id from authors
  year: number;
}

import { ObjectId } from 'mongodb';

export interface BlogCategory {
  _id?: ObjectId;
  name: string;
}

export interface BlogEntry {
  _id?: ObjectId;
  title: string;
  author: ObjectId;
  description: string;
  creationDate: Date;
  editDates: Date[];
  impressionCount: number;
  content: {
    [key: string]: any;
  };
  commentsAllowed: boolean;
  category: ObjectId;
  viewedBy?: ObjectId[];
}

export interface Comment {
  _id?: ObjectId;
  blogEntry: ObjectId;
  author: ObjectId;
  text: string;
  createdAt: Date;
}

export interface BlogEntryCreationData {
  title: string;
  description: string;
  content: {
    text: string;
    images: string[];
  };
  commentsAllowed: boolean;
  category: string;
}
import { User } from "./auth.model";

export interface PostModel {
    id: number;
    title: string;
    content: string;
    user: User;
    date: Date;
    category: string;
    imageId?: number;
}
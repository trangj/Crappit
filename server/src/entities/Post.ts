import { User, Topic } from ".";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Template } from "./Template";

enum PostType {
    TEXT = 'text',
    LINK = 'link',
    PHOTO = 'photo'
}

@Entity()
export class Post extends Template {
    @Column()
    title!: string;

    @Column({ type: 'enum', enum: PostType })
    type!: PostType;

    @Column({ type: 'text' })
    content?: string;

    @Column()
    image_url?: string;

    @Column()
    image_name?: string;

    @Column({ default: 0 })
    vote: number;

    @Column({ default: 0 })
    number_of_comments: number;

    @ManyToOne(() => User)
    @JoinColumn([{ name: 'author_id', referencedColumnName: 'id' }])
    author!: User;

    @ManyToOne(() => Topic)
    @JoinColumn([{ name: 'topic_id', referencedColumnName: 'id' }])
    topic!: Topic;
}
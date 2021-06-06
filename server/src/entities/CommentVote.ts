import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Comment, User } from ".";

@Entity()
export class CommentVote extends BaseEntity {
    @ManyToOne(() => User, user => user.id, { onDelete: 'CASCADE' })
    @JoinColumn()
    user!: User;

    @PrimaryColumn()
    user_id: number;

    @ManyToOne(() => Comment, comment => comment.id, { onDelete: 'CASCADE' })
    @JoinColumn()
    comment!: Comment;

    @PrimaryColumn()
    comment_id: number;

    @Column()
    value!: 1 | 0 | -1;
}
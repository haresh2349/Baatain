import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user-entity";

export enum MessageType {
  TEXT = "text",
  IMAGE = "image",
  VIDEO = "video",
  FILE = "file",
}

@Entity("messages")
export class Message {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  text?: string;

  @Column({
    type: "enum",
    enum: MessageType,
    default: MessageType.TEXT,
  })
  type?: string;

  @Column({ nullable: true })
  mediaURL?: string;

  @Column({ default: false })
  isRead?: boolean;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: "sender_id" })
  sender: User;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: "receiver_id" })
  receiver: User;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}

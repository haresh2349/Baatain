import { Repository } from "typeorm";
import { AppDataSource } from "../config/database";
import { Message } from "../entities/mesage-entity";
import { User } from "../entities/user-entity";

const messageRepository: Repository<Message> =
  AppDataSource.getRepository(Message);
const userRepository = AppDataSource.getRepository(User);

export type MessagePayload = {
  sender: string;
  receiver: string;
  text: string;
  type?: string;
  mediaURL?: string;
};
export class MessageService {
  static async sendMessageService(payload: MessagePayload): Promise<Message> {
    const sender = await userRepository.findOne({
      where: { id: payload.sender },
    });
    const receiver = await userRepository.findOne({
      where: { id: payload.receiver },
    });

    if (!sender || !receiver) {
      throw new Error("Sender or Receiver not found");
    }

    const modifiedPayload = {
      text: payload.text,
      type: payload.type || "text",
      mediaURL: payload.mediaURL || "",
      sender,
      receiver,
    };
    const message = await messageRepository.create(modifiedPayload);
    return await messageRepository.save(message);
  }
}

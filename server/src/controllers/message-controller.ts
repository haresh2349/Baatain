import { NextFunction, Request, Response } from "express";
import { APIError } from "../utils/api-error";
import { Message } from "../entities/mesage-entity";
import { instanceToPlain } from "class-transformer";
import { MessagePayload, MessageService } from "../services/message-service";

export class MessageController {
  static async sendMessage(req: Request, res: Response, next: NextFunction) {
    const sender = req.user?.id;
    const { text, receiver } = req.body;

    if (!receiver) {
      return next(new APIError(400, "Please provide a valid receiver id!"));
    }
    if (!sender) {
      return next(new APIError(400, "Please provide a valid sender id!"));
    }
    if (!text) {
      return next(new APIError(400, "Please provide a message!"));
    }

    const reqestPayload: MessagePayload = {
      sender,
      receiver,
      text,
    };

    const createdMessage = await MessageService.sendMessageService(
      reqestPayload
    );

    res.status(201).json({ message: "Message sent successfully." });
  }
}

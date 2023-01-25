import { ApiError } from "../exceptions/ApiError";
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

import { noteService } from "../service/noteService";
import { RequestWithUser } from "../types";

class NoteController {
  async getNoteNames(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const noteNames = await noteService.getNoteNames(req.user?.id as string);

      res.json(noteNames);
    } catch (error) {
      next(error);
    }
  }

  async createNote(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation error", errors.array()));
      }

      const { id, title } = req.body;

      const note = await noteService.createNote(
        req.user?.id as string,
        id,
        title
      );

      res.json(note);
    } catch (error) {
      next(error);
    }
  }

  async getNote(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const { id } = req.query;

      if (typeof id !== "string") {
        throw ApiError.BadRequest("bla");
      }

      const note = await noteService.getNote(id);

      res.json(note);
    } catch (error) {
      next(error);
    }
  }

  async updateNote(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const { id, updates } = req.body;

      const note = await noteService.updateNote(id, updates);

      res.json(note);
    } catch (error) {
      next(error);
    }
  }

  async deleteNote(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const { id } = req.query;

      if (typeof id !== "string") {
        throw ApiError.BadRequest("bla");
      }

      const note = await noteService.deleteNote(id);

      res.json(note);
    } catch (error) {
      next(error);
    }
  }
}

export const noteController = new NoteController();

import prisma from "../utils/prisma";

class NoteService {
  async getNoteNames(userId: string) {
    const noteNames = await prisma.note.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        title: true,
      },
    });

    return noteNames;
  }

  async createNote(userId: string, id: string, title: string) {
    const lastNotePlace = await prisma.note.findMany({
      where: { userId },
      select: { place: true },
      orderBy: { place: "asc" },
      take: -1,
    });

    const newPlace =
      typeof lastNotePlace[0]?.place === "number"
        ? lastNotePlace[0].place + 1
        : 0;

    const note = await prisma.note.create({
      data: {
        id,
        userId,
        place: newPlace,
        title,
        text: "",
      },
    });

    return note;
  }

  async getNote(id: string) {
    const note = await prisma.note.findUnique({
      where: {
        id,
      },
    });

    return note;
  }

  async updateNote(id: string, updates: any) {
    const note = await prisma.note.update({
      where: { id },
      data: updates,
    });

    return note;
  }

  async deleteNote(id: string) {
    const note = await prisma.note.delete({
      where: { id },
    });

    return note;
  }
}

export const noteService = new NoteService();

import { MyContext } from "../..";
import { AppDataSource } from "../../data-source";
import { Note } from "../../entity/Note";
import { User } from "../../entity/User";
import { isAuth } from "../../helpers/isAuth";

export const noteResolver = {
    Query: {
        listNotesByUser: async (_:any , __:any , context:MyContext) => {
            if(!await isAuth(context)) throw new Error("User not authenticate");
            
            try {
                const user = await User.findOneBy({
                    id: context.tokenPayload?.userId
                })
                if(!user) throw new Error("User not found");
                console.log(user);
                
                return await Note.find({
                    where: {author: {
                        id: user.id
                    }},
                    relations: ["author"]
                });

            } catch (error) {
                throw new Error("Unable to fetch user")
            }
        },
        getNoteByNoteId: async (_:any , args:any , context:MyContext) => {
            if(!await isAuth(context)) throw new Error("User not authenticate");
            
            try {
                if(!args.noteId) throw new Error("noteId is not include in request")
                const noteId = args.noteId.replace("%7D","");
                const note = await Note.findOne({
                    where: {id: noteId},
                    relations: ['author']
                });
                if(!note) throw new Error("Invalid noteId: cannot fetch note")

                return note;
            } catch (error) {
                throw error;
            }
        }
    },

    Mutation: {
        addNote: async (_:any, args:any , context:MyContext) => {
            if(!await isAuth(context)) throw new Error("User not authenticate");
            
            try {
                const user = await User.findOneBy({
                    id: context.tokenPayload?.userId
                })
                
                if(!user) throw new Error("Invalid Authentication");
                if(!args.note.title || !args.note.content) throw new Error("Add Note Failed");

                const newNote = new Note();
                newNote.title = args.note.title;
                newNote.content = args.note.content;
                newNote.author = user;
                
                await newNote.save();
                return newNote;
            } catch (error) {
                throw error;
            }
        },

        updateNote: async (_:any, args:any , context:MyContext) => {
            if(!await isAuth(context)) throw new Error("User not authenticate");
            
            try {
                const updatedNote = {
                    id: args.note.id,
                    title: args.note.title,
                    content: args.note.content
                }                
                
                if(!updatedNote.id || !updatedNote.title || !updatedNote.content) throw new Error("Invalid Note");
                
                const note = await Note.findOne({
                    where: {id: updatedNote.id},
                    relations: ["author"]
                })

                if(!note) throw new Error("Note is not found");

                note.title = updatedNote.title;
                note.content = updatedNote.content;
                await note.save();
                return note;
            } catch (error) {
                throw error;
            }
        },

        deleteNote: async (_:any, args:any , context:MyContext) => {
            if(!await isAuth(context)) throw new Error("User not authenticate");
            
            try {               
                if(!args.noteId) throw new Error("No noteId in request");
                const targetNote = await Note.findOneBy({
                    id: args.noteId
                })

                if(!targetNote) throw new Error("Note is not found");
                await targetNote.remove();
                return true;
            } catch (error) {
                throw error;
            }
        },
    }
}
import { gql } from "@apollo/client"

export const getNoteListQuery = gql`
  query Query {
    listNotesByUser {
      id
      title
    }
  }
`;

/*
{
  "noteId": "245b4b3d-cd82-44df-a121-66dfa5abc790%7D"
}
*/
export const getNoteByNoteIdQuery = gql`
  query Query($noteId: ID!) {
    getNoteByNoteId(noteId: $noteId) {
      id
      title
      content
      updated_at
      created_at
      author {
        id
        email
        username
      }
    }
  }
`;

/*
{
  "note": {
    "content": "fdfdfdf",
    "title": "hihihihi"
  }
}
*/
export const addNoteMutation = gql`
    mutation Mutation($note: addNoteInput!) {
        addNote(note: $note) {
            content
            created_at
            id
            title
            updated_at
            author {
            id
            username
            email
            }
        }
    }
`;

/*
{
  "noteId": "SDFSDFSDF"
}
*/
export const deleteNoteMutation = gql`
  mutation Mutation($noteId: ID!) {
    deleteNote(noteId: $noteId)
  }
`;

/*
{
  "note": {
    "id": null,
    "title": null,
    "content": null
  }
}
*/
export const updateNoteMutation = gql`
  mutation Mutation($note: updateNoteInput!) {
    updateNote(note: $note) {
      id
      title
      content
      updated_at
      created_at
      author {
        id
        username
        email
      }
    }
  }
`;
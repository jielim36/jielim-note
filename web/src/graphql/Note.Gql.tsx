import { gql } from "@apollo/client"

export const getNoteListQuery = gql`
  query Query {
    listNotesByUser {
      id
      title
    }
  }
`;

// export const getDetailsNoteById = gql`

// `;

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
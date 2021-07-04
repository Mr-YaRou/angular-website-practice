export class User {
    id: string;
    idType: string; // idType to tell between Admin or Paitent, preferable enum type.
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    token: string;
}
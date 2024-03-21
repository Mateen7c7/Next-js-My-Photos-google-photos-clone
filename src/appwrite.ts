import { Client, Account, Storage } from "appwrite";

export const client = new Client();

client
  .setEndpoint("http://localhost:3030/v1")
  .setProject("65fbb47d705df78cbc66");

export const storage = new Storage(client);

export const photosId = "65fbb53b741465c89cb4";

export const account = new Account(client);
export { ID } from "appwrite";

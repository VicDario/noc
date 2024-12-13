import mongoose from "mongoose";
import { MongoDatabase } from "./init"

describe('init MongoDB', () => {
  afterEach(() => {
    mongoose.connection.close();
  });

  test('should connect to MongoDB', async () => {
    const connected = await MongoDatabase.connect({
      dbName: process.env.MONGO_DB_NAME!,
      mongoUrl: process.env.MONGO_URL!
    });

    expect(connected).toBeTruthy();
  });

  test('should throw an error', async () => {
    try {
      await MongoDatabase.connect({
        dbName: '',
        mongoUrl: 'mongodb://invalidUser:invalidPassword@localhost:27017'
      });
      expect(true).toBe(false);
    } catch (error) {
      expect((error as any).message).toBe('Authentication failed.');
    }
  })
})

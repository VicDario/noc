import mongoose from "mongoose";
import { envs } from "../../../config/plugins/env.plugin";
import { MongoDatabase } from "../init";
import { LogModel } from "./log.model";

describe('log.model.test.ts', () => {
  beforeAll(async () => {
    await MongoDatabase.connect({
      mongoUrl: envs.MONGO_URL!,
      dbName: envs.MONGO_DB_NAME!,
    })
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  test('should return LogModel', async () => {
    const logData = {
      origin: 'log.model.test.ts',
      message: 'test_message',
      level: 'low'
    };
    const log = await LogModel.create(logData);

    expect(log).toEqual(expect.objectContaining({
      ...logData,
      createAt: expect.any(Date),
      id: expect.any(String)
    }))

    await log.deleteOne();
  });

  test('should return the schema object', () => {
    const schema = LogModel.schema.obj;
     
    expect(schema).toEqual({
      message: { type: expect.any(Function), required: true },
      origin: { type: expect.any(Function), required: true },
      level: {
        type: expect.any(Function),
        enum: [ 'low', 'medium', 'high' ],
        default: 'low'
      },
      createAt: { type: expect.any(Function), default: expect.any(Date) }
    });
  });
})

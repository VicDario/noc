import { envs } from "./env.plugin";

describe('env.plugin.ts', () => {
  test('should return env option', () => {
    expect(envs).toEqual({
      PORT: 3000,
      PROD: false,
      MAILER_SERVICE: 'gmail',
      MAILER_EMAIL: 'email@email.com',
      MAILER_SECRET_KEY: 'secret_key',
      MONGO_URL: 'mongodb://vicdario:12345@localhost:27017',
      MONGO_DB_NAME: 'NOC-test'
    });
  });

  test('should return error if not found env', async () => {
    jest.resetModules();
    process.env.PORT = 'ABC';
    try {
      await import('./env.plugin');
      // If there's no error importing then tets failed
      expect(true).toBe(false);
    } catch (error) {
      expect((error as any).message).toContain("\"PORT\" should be a valid integer");
    }
  })
})

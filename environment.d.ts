declare global {
    namespace NodeJS {
      interface ProcessEnv {
        POSTGRES_HOST: string;
        POSTGRES_DB: string;
        POSTGRES_TEST_DB: string;
        POSTGRES_USER: string;
        POSTGRES_PASSWORD: string;
        BCRYPT_PASSWORD: string;
        SALT_ROUNDS: number;
        TOKEN_SECRET: string;
        PORT: number;
        ENV: string;
      }
    }
  }
  export {};
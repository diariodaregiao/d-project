export { };

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DEFAULT_USER_AVATAR: string;
      DEFAULT_ANONYMIZED_EMAIL: string
    }
  }
}
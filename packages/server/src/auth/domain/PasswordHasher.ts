abstract class PasswordHasher {
  abstract hash(str: string): Promise<string>;
  abstract match(provided: string, expected: string): Promise<boolean>;
}

export { PasswordHasher };

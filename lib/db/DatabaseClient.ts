export class DatabaseClient {
  private static instance: DatabaseClient;
  private constructor() {
    console.log("Database connected.");
  }

  static getInstance(): DatabaseClient {
    if (!DatabaseClient.instance) {
      DatabaseClient.instance = new DatabaseClient();
    }
    return DatabaseClient.instance;
  }

  query(sql: string): void {
    console.log("Executing SQL:", sql);
  }
}

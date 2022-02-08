import { DatabaseModule } from "@fullstack/database";
import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { env } from "./env";

@Global()
@Module({
  imports: [DatabaseModule, MongooseModule.forRoot(env.MONGO_URL, {
    authSource: "admin"
  })]
})
class MongoModule {}

export { MongoModule };
import { bootstrap } from "./infra-nest-server/src/index";
import { AppModule } from "./app/app.module";

bootstrap({
  appModule: AppModule,
  name: "api",
  port: 4444,
  stripNonClassValidatorInputs: false,
});

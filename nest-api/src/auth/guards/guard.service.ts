import { AuthGuard } from "@nestjs/passport";


export class GaurdService extends AuthGuard('jwt') {

}
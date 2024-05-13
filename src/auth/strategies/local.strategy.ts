import { BadRequestException, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";



@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        protected readonly auth: AuthService
    ) {
        super({
            usernameField: 'email'
        })
    }

    async validate(email: string, password: string) {
        const user = await this.auth.validateUser(email, password)
        if (!user) throw new BadRequestException('Whats went wrong')
        return user.id
    }
}
import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(): string {
    return 'EVO PLACE. Server application for the EVO community.'
  }
}

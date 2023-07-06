import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Navigation, NavigationDocument } from './navigation.schema'

@Injectable()
export class NavigationService {
  constructor(
    @InjectModel(Navigation.name)
    private navigationModel: Model<NavigationDocument>
  ) {}

  async find() {
    const navigation = await this.navigationModel.find()

    if (!navigation) throw new NotFoundException('Navigation not found')

    return navigation
  }
}

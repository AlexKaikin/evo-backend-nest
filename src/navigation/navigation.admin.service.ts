import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateNavigationDto } from './dto/create-navigation.dto'
import { UpdateNavigationDto } from './dto/update-navigation.dto'
import { Navigation, NavigationDocument } from './navigation.schema'

@Injectable()
export class AdminNavigationService {
  constructor(
    @InjectModel(Navigation.name)
    private navigationModel: Model<NavigationDocument>
  ) {}

  async create(navigation: CreateNavigationDto) {
    navigation.id = 1

    const newNavigation = new this.navigationModel(navigation)

    newNavigation.save()

    return newNavigation
  }

  async find() {
    const navigation = await this.navigationModel.findOne({ id: 1 })

    if (!navigation) throw new NotFoundException('Navigation not found')

    return navigation
  }

  async update(navigation: UpdateNavigationDto) {
    const updatedNavigation = await this.navigationModel.findOneAndUpdate(
      { id: 1 },
      {
        ...navigation,
      }
    )

    return updatedNavigation
  }

  async remove() {
    const order = await this.navigationModel.findOneAndDelete({ id: 1 })

    return order
  }
}

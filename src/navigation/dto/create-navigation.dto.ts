export class CreateNavigationDto {
  id: number
  title: string
  url: string
  filter: CategoryItemType[]
  sort: SortItemType[]
}

export class CategoryItemType {
  id: number
  title: string
  type: string
}

export class SortItemType {
  id: number
  title: string
  type: string
}

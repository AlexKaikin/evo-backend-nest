import { Test, TestingModule } from '@nestjs/testing'
import { PostsService } from './posts.service'
import { getModelToken } from '@nestjs/mongoose'
import { Post } from './posts.schema'

describe('PostsService', () => {
  let service: PostsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        { provide: getModelToken(Post.name), useValue: jest.fn() },
      ],
    }).compile()

    service = module.get<PostsService>(PostsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})

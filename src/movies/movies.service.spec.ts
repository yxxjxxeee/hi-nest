import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a movie', () => {
      service.create({
        title: 'testMovie',
        year: 2000,
        genres: ['test'],
      });

      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('should throw a NotFoundException', () => {
      try {
        service.getOne(999);
      } catch (e: unknown) {
        if (e instanceof NotFoundException) {
          expect(e.message).toEqual('Movie with ID 999 not found');
        } else {
          throw e;
        }
      }
    });
  });

  describe('deleteOne', () => {
    it('deletes a movie', () => {
      service.create({
        title: 'testMovie',
        year: 2000,
        genres: ['test'],
      });

      const allMovies = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeLessThan(allMovies);
    });

    it('should throw a NotFoundException', () => {
      try {
        service.deleteOne(999);
      } catch (e: unknown) {
        if (e instanceof NotFoundException) {
          expect(e.message).toEqual('Movie with ID 999 not found');
        } else {
          throw e;
        }
      }
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'testMovie',
        year: 2000,
        genres: ['test'],
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.create({
        title: 'testMovie',
        year: 2000,
        genres: ['test'],
      });
      service.update(1, { title: 'updatedTest' });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('updatedTest');
    });

    it('should throw a NotFoundException', () => {
      try {
        service.update(999, { title: 'updatedTest' });
      } catch (e: unknown) {
        if (e instanceof NotFoundException) {
          expect(e.message).toEqual('Movie with ID 999 not found');
        } else {
          throw e;
        }
      }
    });
  });
});

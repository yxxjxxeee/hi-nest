import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Patch,
  Body,
  Query,
} from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'This will return all movies';
  }

  @Get('search')
  search(@Query('year') Searchingyear: string) {
    return `We are searching for a movie made after: ${Searchingyear}`;
  }

  @Get(':id')
  getOne(@Param('id') movieId: string) {
    return `This will return one movie with the id: ${movieId}`;
  }

  @Post()
  create(@Body() movieData) {
    return movieData;
  }

  @Delete(':id')
  remove(@Param('id') movieId: number) {
    return `This will delete a movie with the id: ${movieId}`;
  }

  @Patch(':id')
  patch(@Param('id') movieId: string, @Body() updatedData) {
    return {
      updatedMovie: movieId,
      ...updatedData,
    };
  }
}

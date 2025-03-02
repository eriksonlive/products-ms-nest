import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { CommentsModule } from './comments/comments.module';
import { MapdataModule } from './mapdata/mapdata.module';

@Module({
  imports: [ProductsModule, CommentsModule, MapdataModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

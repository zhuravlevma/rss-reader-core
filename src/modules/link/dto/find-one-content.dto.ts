import { PartialType } from '@nestjs/mapped-types';
import { FindAllContentDto } from './find-all-content.dto';

export class FindOneContentDto extends PartialType(FindAllContentDto) {
  link_id: string;
}

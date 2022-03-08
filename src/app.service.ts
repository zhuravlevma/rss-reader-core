import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as convert from 'xml-js';

@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    const { data } = await axios.get(
      'https://habr.com/ru/rss/flows/management/all/?fl=ru',
    );
    const result = convert.xml2js(data);
    console.log(result.elements);
    return 'Hello World!';
  }
}

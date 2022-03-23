import { ElementCompact } from 'xml-js';
import * as convert from 'xml-js';

// interface Channel {
//   type: 'string';
//   name: 'string';
//   elements: [Item];
// }

// interface Item {
//   type: 'string';
//   name: 'string';
// }

export class XmlService {
  convertFromXml(data): ElementCompact {
    return convert.xml2js(data);
  }

  getChannelElement(initData) {
    return initData?.elements[0]?.elements;
  }

  getItems(channelData) {
    return channelData?.elements;
  }

  getImage(itemData) {
    for (const elem of itemData.elements) {
      if (elem?.name === 'url') {
        this.getXmlTextFromColumn(elem);
      }
    }
    return null;
  }

  getXmlTextFromColumn(element): string {
    if (element?.elements[0]?.text) {
      return element.elements[0].text;
    }
    if (element?.elements[0]?.cdata) {
      return element.elements[0].cdata;
    }
    return null;
  }
}

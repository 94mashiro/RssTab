import xml2js from 'xml2js';

export const parseXmlToJson = async (xml: string) => {
  const parser = new xml2js.Parser();
  const result = await parser.parseStringPromise(xml);
  return result;
};

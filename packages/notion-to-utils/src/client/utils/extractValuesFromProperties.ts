export const extractValuesFromProperties = (
  properties: Record<string, any>
) => {
  const extractedValues: Record<string, any> = {};
  Object.entries(properties).forEach(([key, property]) => {
    switch (property.type) {
      case 'date':
        extractedValues[key] = property.date;
        break;
      case 'multi_select':
        if (property.multi_select.length > 0) {
          extractedValues[key] = property.multi_select[0];
        } else {
          extractedValues[key] = null;
        }
        break;
      case 'rich_text':
        if (property.rich_text.length > 0) {
          extractedValues[key] = property.rich_text[0].plain_text;
        } else {
          extractedValues[key] = '';
        }
        break;
      case 'checkbox':
        extractedValues[key] = property.checkbox;
        break;
      case 'title':
        if (property.title.length > 0) {
          extractedValues[key] = property.title[0].plain_text;
        } else {
          extractedValues[key] = '';
        }
        break;
      case 'url':
        extractedValues[key] = property.url;
        break;
      default:
        extractedValues[key] = property;
    }
  });
  return extractedValues;
};

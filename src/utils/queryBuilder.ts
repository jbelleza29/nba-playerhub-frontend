export const convertToQuery = (baseUrl: string, dataObject: {[key: string]: any}): string => {
  const queryString = Object.keys(dataObject)
                        .map(key => `${key}=${dataObject[key] || ''}`)
                        .join('&')
  return `${baseUrl}?${queryString}`;
}

export const importLocaleFile = async (localesPath: string, lang: string = "en"): Promise<{ [key: string]: string; }> => {
  return import(`${localesPath}/${lang}.json`);
};

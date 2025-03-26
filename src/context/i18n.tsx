import useLocalStorage from "@/hooks/use-local-storage";
import React, { useCallback, useEffect } from "react";
import { useCookies } from "react-cookie";

import { importLocaleFile } from "./importLocaleFile";

type I18nContextProps = {
  t: (key: string) => string;
  currentLanguage: string;
}
export const I18nContext = React.createContext<I18nContextProps>({} as I18nContextProps)

type Props = {
  children: React.ReactNode
  localesPath: string;
}

export const I18nProvider = ({ children, localesPath }: Props) => {
  const [cookie, setCookie] = useCookies(["Accept-Language"]);
  const [localLanguage, setLocalLanguage] = useLocalStorage<string>("lang", cookie["Accept-Language"]);

  const loadLanguage = useCallback(async (): Promise<{ [key: string]: string }> => {
    const selectedLanguage = localLanguage;
    const data = await importLocaleFile(localesPath, selectedLanguage);
    return data.default as any
  }, [localLanguage]);

  const [languageData, setLanguageData] = React.useState<{ [key: string]: string }>();

  useEffect(() => {
    if (localLanguage !== cookie) {
      setCookie("Accept-Language", localLanguage)
      loadLanguage().then(setLanguageData)
    }
  }, [loadLanguage])

  useEffect(() => {
    if (cookie['Accept-Language'] !== localLanguage) {
      setLocalLanguage(cookie["Accept-Language"])
      loadLanguage().then(setLanguageData)
    }
  }, [cookie])


  const t = (key: string) => {
    const value = languageData?.[key]
    if (!value) return key
    return value
  }

  return (
    <I18nContext.Provider value={{ t, currentLanguage: localLanguage }}>
      {children}
    </I18nContext.Provider>
  )
}


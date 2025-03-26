import { useCookies } from 'react-cookie';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui';

export const SelectLanguage = () => {
  const [lang, setLang] = useCookies(["Accept-Language"]);
  return (
    <Select onValueChange={(value) => setLang("Accept-Language", value)} value={lang["Accept-Language"]}>
      <SelectTrigger>
        <SelectValue placeholder="English" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="pt-BR">Português</SelectItem>
        <SelectItem value="en">English</SelectItem>
      </SelectContent>
    </Select>
  )
}
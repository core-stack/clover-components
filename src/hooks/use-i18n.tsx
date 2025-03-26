import React from "react";

import { I18nContext } from "../context/i18n";

export const useI18n = () => {
  return React.useContext(I18nContext);
};

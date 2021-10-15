import React from 'react';
import { Select } from "hds-react";

import useLanguageSwitcher from "../../talons/header/useLanguageSwitcher";
import { Option } from '../../types/header/languageSwitcher/types';
import { useTranslation } from "react-i18next"

const LanguageSwitcher = () => {
    const {
        availableLanguages,
        currentLangAsOption,
        handleSwitchLanguage
    } = useLanguageSwitcher();

    const { t } = useTranslation();

    if (!availableLanguages || availableLanguages.length <= 1) return null;

    // TODO: style to look like in UI sketches if possible...
    return (
        <div className="language-switcher-root" aria-label={t("common.language.language-selector")}>
            <Select<Option>
                label=""
                className="language-switcher"
                onChange={handleSwitchLanguage}
                value={currentLangAsOption}
                options={availableLanguages}/>
        </div>
    );
};

export default LanguageSwitcher;

import React from 'react';
import { Select } from "hds-react";

import useLanguageSwitcher from "../../talons/header/useLanguageSwitcher";
import { Option } from '../../types/header/languageSwitcher/types';

const LanguageSwitcher = () => {
    const {
        availableLanguages,
        currentLangAsOption,
        handleSwitchLanguage
    } = useLanguageSwitcher();

    if (!availableLanguages || availableLanguages.length <= 1) return null;

    // TODO: style to look like in UI sketches if possible...
    return (
        <div className="language-switcher-root">
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

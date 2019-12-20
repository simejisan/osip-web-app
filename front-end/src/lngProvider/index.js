import viLang from './entries/vi-VN';
import {addLocaleData} from 'react-intl';

const AppLocale = {
    vi: viLang
};

addLocaleData(AppLocale.vi.data);

export default AppLocale;


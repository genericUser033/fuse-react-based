import { lazy } from 'react';
import i18next from 'i18next';
import tr from '../breakdown-note/i18n/tr';
import ar from '../breakdown-note/i18n/ar';
import en from '../breakdown-note/i18n/en';

i18next.addResourceBundle('en', 'breakdownPage', en);
i18next.addResourceBundle('tr', 'breakdownPage', tr);
i18next.addResourceBundle('ar', 'breakdownPage', ar);

const BreakDown = lazy(() => import('./BreakDown'));

/**
 * The BreakDown page config.
 */
const BreakDownConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'staff-management',
			element: <BreakDown />
		}
	]
};

export default BreakDownConfig;
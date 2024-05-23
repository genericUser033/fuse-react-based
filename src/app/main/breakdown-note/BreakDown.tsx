import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';

function BreakDown() {
	const { t } = useTranslation('breakdownPage');
	return (
		<Typography>
			<Typography>
				{t('BREAKDOWN_TITLE')}
			</Typography>
			<hr />
			<Typography>
				<div>
					.ts file: typescript
					.tsx typescript xml that contains rendered code
					i18n = internationalization, for multiple languages switch
				</div>
				<div>
					- tailwind-base.css for self-defined CSS
					- public folder: assets, ... things can be accessed anywhere
					- @fuse/*
					color directory: color hexa code
					core directory: tsx files, for rendering tasks: nav, search, layout, ...
				</div>

				<div>
					- @fuse/default-settings: default theme settings
					- hooks directory: defined effect for the apps using useEffect hooks
					- tailwind directory: defined a function called iconSize for setting the size of icons
					- utils: utility functions that will be used during the project
				</div>
				<div>
					1. ErrorBoundary
					ErrorBoundary wraps AppContext.Provider, so whenever there is any error happends inside, react will update
					the state(hasError) of ErrorBoundary to true and render something went wrong!
				</div>

				<div>
					- @mock-api directory: mock fake data to return when calling mocked apis
					MockAdapterProvider: wraps all the components in App.tsx, responsible for managing mock API behavior
				</div>

				<div>
					- app
					AppContext: with AppContextType type, it is an array of routes objects
				</div>

				<div>
					- withAppProviders: provides the necessary context providers for the App component.
					inside, useMemo to cache the routes and then pass to the AppContext Provider
					(routes are imported from routeConfig, using spread operator to get [ExampleConfig, SignOutConfig, SignInConfig, SignUpConfig];
					under FuseRouteConfigsType type)
				</div>
				<div>
					- App entry: App.tsx(whatever returned inside this will be rendered)
					It will render Layout1/2/3 based on the layoutStyle gotton from settings.layout.style

					index.tsx = render App component in the root element
				</div>
			</Typography>
		</Typography>
	);
}

export default BreakDown;
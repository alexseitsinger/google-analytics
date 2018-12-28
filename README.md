# Google Analytics

## Description

A react component that uses an event emitter with React-GA to connect to Google Analytics.

## Props

-   location - (Object, Required) - Location of the browser.
-   isEnvironment - (Boolean, Required) - Specify what environmen is being used to determine if the component should connect to Google Analytics. Useful to avoid using it in development.
-   id - (String, Required) - The Google Analytics ID.
-   emitter - (Object, Required) - The event emitter to use.
-   modalviewEventName (String, Optional) - The event name to use for modalviews.
-   pageviewEventName - (String, Optional) - The event name to use for the pageviews.
-   eventEventName - (String, Optional) - The event name to use for the events.
-   timingEventName - (String, Optional) - The event name to use for the timings.

## Usage

```javascript
import React from "react"
import PropTypes from "prop-types"
import { withRouter } from "react-router"

import emitter from "../events"

// NOTE: ENVIRONMENT_NAME is a global variable via webpack.DefinePlugin
// NOTE: GOOGLE_ANALYTICS_ID is served via dotenv-webpack

function Layout({ location }) {
	return (
		<div>
			<GoogleAnalytics
				isEnvironment={ENVIRONMENT_NAME === "production"}
				id={process.env.GOOGLE_ANALYTICS_ID}
				emitter={emitter}
				location={location}
			/>
			<div>Page</div>
		</div>
	)
}

Layout.propTypes = {
	location: PropTypes.object.isRequired
}

const LayoutWithRouter = withRouter(Layout)

export default LayoutWithRouter
```

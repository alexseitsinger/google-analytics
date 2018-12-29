import React from "react"
import PropTypes from "prop-types"
import ReactGA from "react-ga"
import _ from "underscore"

class GoogleAnalytics extends React.Component {
	static propTypes = {
		location: PropTypes.object.isRequired,
		isEnvironment: PropTypes.bool.isRequired,
		trackingId: PropTypes.string.isRequired,
		emitter: PropTypes.object.isRequired,
		modalviewEventName: PropTypes.string,
		pageviewEventName: PropTypes.string,
		eventEventName: PropTypes.string,
		timingEventName: PropTypes.string
	}
	static defaultProps = {
		modalviewEventName: "GOOGLE_ANALYTICS_MODAL_VIEW",
		pageviewEventName: "GOOGLE_ANALYTICS_PAGE_VIEW",
		eventEventName: "GOOGLE_ANALYTICS_EVENT",
		timingEventName: "GOOGLE_ANALYTICS_TIMING"
	}
	state = {
		modalviewToken: null,
		pageviewToken: null,
		eventToken: null,
		timingToken: null
	}
	getModalviewToken = () => {
		const { isEnvironment, emitter, modalviewEventName } = this.props
		if (!isEnvironment) {
			return
		}
		const { modalviewToken } = this.state
		if (modalviewToken) {
			return modalviewToken
		}
		if (!_.isFunction(emitter.addListener)) {
			return
		}
		return emitter.addListener(modalviewEventName, this.modalview)
	}
	getPageviewToken = () => {
		const { isEnvironment, emitter, pageviewEventName } = this.props
		if (!isEnvironment) {
			return
		}
		const { pageviewToken } = this.state
		if (pageviewToken) {
			return pageviewToken
		}
		if (!_.isFunction(emitter.addListener)) {
			return
		}
		return emitter.addListener(pageviewEventName, this.pageview)
	}
	getEventToken = () => {
		const { isEnvironment, emitter, eventEventName } = this.props
		if (!isEnvironment) {
			return
		}
		const { eventToken } = this.state
		if (eventToken) {
			return eventToken
		}
		if (!_.isFunction(emitter.addListener)) {
			return
		}
		return emitter.addListener(eventEventName, this.event)
	}
	getTimingToken = () => {
		const { isEnvironment, emitter, timingEventName } = this.props
		if (!isEnvironment) {
			return
		}
		const { timingToken } = this.state
		if (timingToken) {
			return timingToken
		}
		if (!_.isFunction(emitter.addListener)) {
			return
		}
		return emitter.addListener(timingEventName, this.timing)
	}
	modalview = (modalName) => {
		ReactGA.modalview(modalName)
	}
	pageview = (path) => {
		ReactGA.pageview(path)
	}
	event = (opts) => {
		ReactGA.event(opts)
	}
	timing = (opts) => {
		ReactGA.timing(opts)
	}
	addAllListeners = () => {
		// Add global listeners for different events.
		const modalviewToken = this.getModalviewToken()
		const pageviewToken = this.getPageviewToken()
		const eventToken = this.getEventToken()
		const timingToken = this.getTimingToken()
		this.setState({
			modalviewToken,
			pageviewToken,
			eventToken,
			timingToken
		})
	}
	removeModalviewListener = () => {
		const token = this.getModalviewToken()
		if (_.isFunction(token.remove)) {
			token.remove()
		}
	}
	removePageviewListener = () => {
		const token = this.getPageviewToken()
		if (_.isFunction(token.remove)) {
			token.remove()
		}
	}
	removeEventListener = () => {
		const token = this.getEventToken()
		if (_.isFunction(token.remove)) {
			token.remove()
		}
	}
	removeTimingListener = () => {
		const token = this.getTimingToken()
		if (_.isFunction(token.remove)) {
			token.remove()
		}
	}
	removeAllListeners = () => {
		this.removeModalviewListener()
		this.removePageviewListener()
		this.removeEventListener()
		this.removeTimingListener()
	}
	componentWillUnmount() {
		this.removeAllListeners()
	}
	componentDidMount() {
		// initialize google analytics on the page.
		this.initialize()
	}
	componentDidUpdate(prevProps, prevState) {
		this.pageviewForLocation()
	}
	pageviewForLocation = () => {
		// post analytics for each page view change.
		const { isEnvironment, location } = this.props
		if (isEnvironment) {
			const path = location.pathname + location.search
			this.pageview(path)
		}
	}
	initialize = () => {
		const { isEnvironment } = this.props
		if (isEnvironment) {
			// initialize google analytics service
			const { trackingId } = this.props
			ReactGA.initialize(trackingId)
			// add event listeners for each google analytics method
			this.addAllListeners()
		}
	}
	render() {
		return null
	}
}

export default GoogleAnalytics

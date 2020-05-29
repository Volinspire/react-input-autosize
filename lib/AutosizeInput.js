"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");
var PropTypes = require("prop-types");

var sizerStyle = {
	position: "absolute",
	visibility: "hidden",
	height: 0,
	width: 0,
	overflow: "scroll",
	whiteSpace: "nowrap"
};

var nextFrame = typeof window !== "undefined" ? (function () {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
		window.setTimeout(callback, 1000 / 60);
	};
})().bind(window) : undefined; // If window is undefined, then we can't define a nextFrame function

var AutosizeInput = (function (_React$Component) {
	_inherits(AutosizeInput, _React$Component);

	function AutosizeInput(props) {
		_classCallCheck(this, AutosizeInput);

		_get(Object.getPrototypeOf(AutosizeInput.prototype), "constructor", this).call(this, props);
		this.copyInputStyles = this.copyInputStyles.bind(this);
		this.queueUpdateInputWidth = this.queueUpdateInputWidth.bind(this);
		this.updateInputWidth = this.updateInputWidth.bind(this);
		this.getInput = this.getInput.bind(this);
		this.focus = this.focus.bind(this);
		this.blur = this.blur.bind(this);
		this.select = this.select.bind(this);
		this.state = {
			inputWidth: this.props.minWidth
		};
	}

	_createClass(AutosizeInput, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			this.copyInputStyles();
			this.updateInputWidth();
		}
	}, {
		key: "componentDidUpdate",
		value: function componentDidUpdate() {
			this.updateInputWidth();
			this.queueUpdateInputWidth();
		}
	}, {
		key: "copyInputStyles",
		value: function copyInputStyles() {
			if (!this.isMounted() || !window.getComputedStyle) {
				return;
			}
			var inputStyle = window.getComputedStyle(this.refs.input);
			var widthNode = this.refs.sizer;
			widthNode.style.fontSize = inputStyle.fontSize;
			widthNode.style.fontFamily = inputStyle.fontFamily;
			widthNode.style.fontWeight = inputStyle.fontWeight;
			widthNode.style.fontStyle = inputStyle.fontStyle;
			widthNode.style.letterSpacing = inputStyle.letterSpacing;
			if (this.props.placeholder) {
				var placeholderNode = this.refs.placeholderSizer;
				placeholderNode.style.fontSize = inputStyle.fontSize;
				placeholderNode.style.fontFamily = inputStyle.fontFamily;
				placeholderNode.style.fontWeight = inputStyle.fontWeight;
				placeholderNode.style.fontStyle = inputStyle.fontStyle;
				placeholderNode.style.letterSpacing = inputStyle.letterSpacing;
			}
		}
	}, {
		key: "queueUpdateInputWidth",
		value: function queueUpdateInputWidth() {
			nextFrame(this.updateInputWidth);
		}
	}, {
		key: "updateInputWidth",
		value: function updateInputWidth() {
			if (!this.isMounted() || typeof this.refs.sizer.scrollWidth === "undefined") {
				return;
			}
			var newInputWidth = undefined;
			if (this.props.placeholder) {
				newInputWidth = Math.max(this.refs.sizer.scrollWidth, this.refs.placeholderSizer.scrollWidth) + 2;
			} else {
				newInputWidth = this.refs.sizer.scrollWidth + 2;
			}
			if (newInputWidth < this.props.minWidth) {
				newInputWidth = this.props.minWidth;
			}
			if (newInputWidth !== this.state.inputWidth) {
				this.setState({
					inputWidth: newInputWidth
				});
			}
		}
	}, {
		key: "getInput",
		value: function getInput() {
			return this.refs.input;
		}
	}, {
		key: "focus",
		value: function focus() {
			this.refs.input.focus();
		}
	}, {
		key: "blur",
		value: function blur() {
			this.refs.input.blur();
		}
	}, {
		key: "select",
		value: function select() {
			this.refs.input.select();
		}
	}, {
		key: "render",
		value: function render() {
			var escapedValue = (this.props.defaultValue || this.props.value || "").replace(/\&/g, "&amp;").replace(/ /g, "&nbsp;").replace(/\</g, "&lt;").replace(/\>/g, "&gt;");
			var wrapperStyle = this.props.style || {};
			if (!wrapperStyle.display) wrapperStyle.display = "inline-block";
			var inputStyle = _extends({}, this.props.inputStyle);
			inputStyle.width = this.state.inputWidth;
			inputStyle.boxSizing = "content-box";
			var placeholder = this.props.placeholder ? React.createElement(
				"div",
				{ ref: "placeholderSizer", style: sizerStyle },
				this.props.placeholder
			) : null;
			return React.createElement(
				"div",
				{ className: this.props.className, style: wrapperStyle },
				React.createElement("input", _extends({}, this.props, {
					ref: "input",
					className: this.props.inputClassName,
					style: inputStyle
				})),
				React.createElement("div", {
					ref: "sizer",
					style: sizerStyle,
					dangerouslySetInnerHTML: { __html: escapedValue }
				}),
				placeholder
			);
		}
	}]);

	return AutosizeInput;
})(React.Component);

AutosizeInput.propTypes = {
	value: PropTypes.any, // field value
	defaultValue: PropTypes.any, // default field value
	onChange: PropTypes.func, // onChange handler: function(newValue) {}
	style: PropTypes.object, // css styles for the outer element
	className: PropTypes.string, // className for the outer element
	minWidth: PropTypes.oneOfType([
	// minimum width for input element
	PropTypes.number, PropTypes.string]),
	inputStyle: PropTypes.object, // css styles for the input element
	inputClassName: PropTypes.string };
// className for the input element
AutosizeInput.defaultProps = {
	minWidth: 1
};

module.exports = AutosizeInput;
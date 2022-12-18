/**
 * Import Tool's icon
 */
import IconIdea from './assets/icon/icon.svg';

/**
 * Build styles
 */
require('./assets/css/index.css').toString();

/**
 * @class Idea
 * @classdesc Idea Tool for Editor.js
 * @property {IdeaData} data - Idea Tool`s input and output data
 * @property {object} api - Editor.js API instance
 *
 * @typedef {object} IdeaData
 * @description Idea Tool`s input and output data
 * @property {string} title - Idea`s title
 * @property {string} message - Idea`s message
 *
 * @typedef {object} IdeaConfig
 * @description Idea Tool`s initial configuration
 * @property {string} titlePlaceholder - placeholder to show in Idea`s title input
 * @property {string} messagePlaceholder - placeholder to show in Idea`s message input
 */
export default class Idea {

	/**
	 * Notify core that read-only mode is supported
	 */
	static get isReadOnlySupported() {
		return true;
	}

	/**
	 * Get Toolbox settings
	 *
	 * @public
	 * @returns {string}
	 */
	static get toolbox() {
		return {
			icon: IconIdea,
			title: 'Idea Box',
		};
	}
	/**
	 * Allow to press Enter inside the Idea
	 *
	 * @public
	 * @returns {boolean}
	 */
	static get enableLineBreaks() {
		return true;
	}

	/**
	 * Default placeholder for Idea title
	 *
	 * @public
	 * @returns {string}
	 */
	static get DEFAULT_TITLE_PLACEHOLDER() {
		return 'Title';
	}

	/**
	 * Default placeholder for Idea message
	 *
	 * @public
	 * @returns {string}
	 */
	static get DEFAULT_MESSAGE_PLACEHOLDER() {
		return 'Message';
	}

	/**
	 * Idea Tool`s styles
	 *
	 * @returns {object}
	 */
	get CSS() {
		return {
			baseClass: this.api.styles.block,
			wrapper: 'cdx-idea',
			title: 'cdx-idea__title',
			input: this.api.styles.input,
			message: 'cdx-idea__message',
		};
	}

	/**
	 * Render plugin`s main Element and fill it with saved data
	 *
	 * @param {IdeaData} data — previously saved data
	 * @param {IdeaConfig} config — user config for Tool
	 * @param {object} api - Editor.js API
	 * @param {boolean} readOnly - read-only mode flag
	 */
	constructor({ data, config, api, readOnly }) {
		this.api = api;
		this.readOnly = readOnly;

		this.titlePlaceholder = config.titlePlaceholder || Idea.DEFAULT_TITLE_PLACEHOLDER;
		this.messagePlaceholder = config.messagePlaceholder || Idea.DEFAULT_MESSAGE_PLACEHOLDER;

		this.data = {
			title: data.title || '',
			message: data.message || '',
		};
	}

	/**
	 * Create Idea Tool container with inputs
	 *
	 * @returns {Element}
	 */
	render() {
		const container = this._make('div', [this.CSS.baseClass, this.CSS.wrapper]);
		const title = this._make('div', [this.CSS.input, this.CSS.title], {
			contentEditable: !this.readOnly,
			innerHTML: this.data.title,
		});
		const message = this._make('div', [this.CSS.input, this.CSS.message], {
			contentEditable: !this.readOnly,
			innerHTML: this.data.message,
		});

		title.dataset.placeholder = this.titlePlaceholder;
		message.dataset.placeholder = this.messagePlaceholder;

		container.appendChild(title);
		container.appendChild(message);

		return container;
	}

	/**
	 * Extract Idea data from Idea Tool element
	 *
	 * @param {HTMLDivElement} ideaElement - element to save
	 * @returns {IdeaData}
	 */
	save(ideaElement) {
		const title = ideaElement.querySelector(`.${this.CSS.title}`);
		const message = ideaElement.querySelector(`.${this.CSS.message}`);

		return Object.assign(this.data, {
			title: title.innerHTML,
			message: message.innerHTML,
		});
	}

	/**
	 * Helper for making Elements with attributes
	 *
	 * @param  {string} tagName           - new Element tag name
	 * @param  {Array|string} classNames  - list or name of CSS classname(s)
	 * @param  {object} attributes        - any attributes
	 * @returns {Element}
	 */
	_make(tagName, classNames = null, attributes = {}) {
		const el = document.createElement(tagName);

		if (Array.isArray(classNames)) {
			el.classList.add(...classNames);
		} else if (classNames) {
			el.classList.add(classNames);
		}

		for (const attrName in attributes) {
			el[attrName] = attributes[attrName];
		}

		return el;
	}

	/**
	 * Sanitizer config for Idea Tool saved data
	 *
	 * @returns {object}
	 */
	static get sanitize() {
		return {
			title: {},
			message: {},
		};
	}
}

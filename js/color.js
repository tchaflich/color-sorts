

class Color {

	/**
	 * Accepts a single argument that describes a color
	 * @param {String|Object} parseable
	 */
	constructor(parseable) {
		if (!parseable) {
			throw new Error('[Color] requires an argument to its constructor');
		}

		// init parameters
		// rgb are always either set or calculated;
		// hsl are set if available, otherwise calculated on the fly

		this.red_ = null; // [0, 255]
		this.green_ = null; // [0, 255]
		this.blue_ = null; // [0, 255]

		this.hue_ = null; // [0, 360)
		this.saturation_ = null; // [0, 100]
		this.lightness_ = null; // [0, 100]

		// pass to the appropriate parsing function based on type

		const type = (
			Object.prototype.toString.call(parseable)
				.replace(/^\[object ([a-z]+)\]$/i, '$1')
				.toLowerCase()
		);

		if (type === 'string') {
			this.parseString_(parseable);
		} else if (type === 'object') {
			this.parseObject_(parseable);
		} else {
			throw new Error('[Color] invalid argument passed to constructor');
		}
	}

	/**
	 * Called from constructor; this parses the string
	 * @param {String} parseableString A color string
	 * @return {void}
	 */
	parseString_(parseableString) {
		const normalized = (
			parseableString
				.replace(/^#/, '')
				.toUpperCase()
		);

		if (normalized.length === 3) {
			// shorthand #RGB => #RRGGBB
			const red = parseInt(normalized.charAt(0), 16);
			const green = parseInt(normalized.charAt(1), 16);
			const blue = parseInt(normalized.charAt(2), 16);

			if (isNaN(red) || isNaN(green) || isNaN(blue)) {
				throw new Error('[Color] Invalid shorthand hex color (' + parseableString + ')');
			}

			this.red_ = (red * 17);
			this.green_ = (green * 17);
			this.blue_ = (blue * 17);
		} else if (normalized.length === 6) {
			// longhand #RRGGBB
			const red = parseInt(normalized.substr(0, 2), 16);
			const green = parseInt(normalized.substr(2, 2), 16);
			const blue = parseInt(normalized.substr(4, 2), 16);

			if (isNaN(red) || isNaN(green) || isNaN(blue)) {
				throw new Error('[Color] Invalid longhand hex color (' + parseableString + ')');
			}

			this.red_ = red;
			this.green_ = green;
			this.blue_ = blue;
		} else {
			throw new Error('[Color] Unparseable color string (' + parseableString + ')');
		}

		// todo: accept non-hex strings
	}

	/**
	 * Called from constructor; this parses an object
	 * If you have RGB values already and don't want to format / parse them,
	 * this way skips all that and sets directly from the numeric values
	 * @param {Object} parseableObject A color object
	 * @return {void}
	 */
	parseObject_(parseableObject) {
		if ('red' in parseableObject) {
			this.red_ = parseableObject.red;
		} else if ('R' in parseableObject) {
			this.red_ = parseableObject.R;
		} else {
			throw new Error('[Color] Unknown red value in parseObject_');
		}

		if ('green' in parseableObject) {
			this.green_ = parseableObject.green;
		} else if ('G' in parseableObject) {
			this.green_ = parseableObject.G;
		} else {
			throw new Error('[Color] Unknown green value in parseObject_');
		}

		if ('blue' in parseableObject) {
			this.blue_ = parseableObject.blue;
		} else if ('B' in parseableObject) {
			this.blue_ = parseableObject.B;
		} else {
			throw new Error('[Color] Unknown blue value in parseObject_');
		}

		// todo: HSL => RGB
	}

	/**
	 * Gets the red component of this color
	 * @return {Number} [0-255]
	 */
	getRed() {
		return this.red_;
	}

	/**
	 * Get the green component of this color
	 * @return {Number} [0-255]
	 */
	getGreen() {
		return this.green_;
	}

	/**
	 * Gets the blue component of this color
	 * @return {Number} [0-255]
	 */
	getBlue() {
		return this.blue_;
	}

	/**
	 * Grabs the currently parsed RGB values and creates HSL from them
	 * Should only be called once, the first time an HSL value is demanded
	 * @return {void}
	 */
	convertHSL_() {
		// http://en.wikipedia.org/wiki/HSL_and_HSV#General_approach
		// http://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
		// https://www.rapidtables.com/convert/color/rgb-to-hsl.html

		// conversion algorithms normalize from [0-255] => [0-1]

		const red = this.red_ / 255;
		const green = this.green_ / 255;
		const blue = this.blue_ / 255;

		const max = Math.max(red, green, blue);
		const min = Math.min(red, green, blue);

		var hue = (max + min) / 2;
		var sat = (max + min) / 2;
		var ltn = (max + min) / 2;

		// if the max(rgb) is min(rgb) then the color is greyscale
		// by convention, hue is zero (red) in this case

		if (max === min) {
			hue = 0;
			sat = 0;
		} else {
			const delta = max - min;

			sat = (ltn > 0.5) ?
				(delta / (2 - max - min)) :
				(delta / (max + min));

			if (max === red) {
				// hue = ((green - blue) / delta) + (green < blue ? 6 : 0);
				hue = ((green - blue) / delta) % 6;
			} else if (max === green) {
				hue = ((blue - red) / delta) + 2;
			} else {
				hue = ((red - green) / delta) + 4;
			}
		}

		// normalize hue to standard degrees
		this.hue_ = (hue * 60) % 360;
		while (this.hue_ < 0) {
			this.hue_ = (this.hue_ + 360);
		}

		// saturation and lightness normalized to "percent"
		this.saturation_ = sat * 100;
		this.lightness_ = ltn * 100;
	}

	/**
	 * Gets the hue component of this color, computing if necessary
	 * @return {Number} [0-360)
	 */
	getHue() {
		if (this.hue_ === null) {
			this.convertHSL_();
		}

		return this.hue_;
	}

	/**
	 * Gets the saturation component of this color, computing if necessary
	 * @return {Number} [0-1]
	 */
	getSaturation() {
		if (this.saturation_ === null) {
			this.convertHSL_();
		}

		return this.saturation_;
	}

	/**
	 * Gets the lightness component of this color, computing if necessary
	 * @return {Number} [0-1]
	 */
	getLightness() {
		if (this.lightness_ === null) {
			this.convertHSL_();
		}

		return this.lightness_;
	}

	/**
	 * Returns the "perceived brightness" of an RGB color
	 * Generally used for determining web text colors
	 * @return {number} [0-255]
	 */
	getBrightness() {
	  // http://www.nbdtech.com/Blog/archive/2008/04/27/Calculating-the-Perceived-Brightness-of-a-Color.aspx

		return Math.sqrt(
			(0.241 * Math.pow(this.getRed(), 2)) +
	    (0.691 * Math.pow(this.getGreen(), 2)) +
	    (0.068 * Math.pow(this.getBlue(), 2))
		);
	}

	// output formatting

	getHexString() {
		function convertDecToHex(dec) {
			var hex = dec.toString(16);
		  while (hex.length < 2) {
				hex = '0' + hex;
			}
			return hex;
		};

		return (
			'#' +
			convertDecToHex(this.getRed()) +
			convertDecToHex(this.getGreen()) +
			convertDecToHex(this.getBlue())
		);
	}

}

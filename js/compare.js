
// Static sorting comparators
// All methods should accept two Color objects as inputs
// Return format is JS sort order:
// -1 (or any negative value) indicates a sorts "lower"
// +1 (or any positive value) indicates b sorts "higher"
// 0 (or any falsy value) indicates that the items are equivalent
// by convention, these functions should all return enum(-1, 0, 1)

class Compare {

  /**
   * Helper for normalizing returns
   * @param {Number} aProperty
   * @param {Number} bProperty
   * @return {Number} -1, 0, 1
   */
  static property(aProperty, bProperty) {
    if (aProperty !== bProperty) {
      return aProperty > bProperty ? 1 : -1;
    }

    return 0;
  }

  static getRGBDistanceBetween(a, b) {
    return Math.sqrt(
      Math.pow(a.getRed() - b.getRed(), 2) +
      Math.pow(a.getGreen() - b.getGreen(), 2) +
      Math.pow(a.getBlue() - b.getBlue(), 2)
    );
  }

  /**
   * Sort by red, green, and blue values
   * The most basic of all possible sorting methods
   * @param {Color} a
   * @param {Color} b
   * @return {Number}
   */
  static simpleRGB(a, b) {
    var result;

    result = Compare.property(a.getRed(), b.getRed());
    if (result) {
      return result;
    }

    result = Compare.property(a.getGreen(), b.getGreen());
    if (result) {
      return result;
    }

    result = Compare.property(a.getBlue(), b.getBlue());
    if (result) {
      return result;
    }

    return 0;
  }

  /**
   * Sort by hue, saturation, and lightness values
   * Less naive than RGB sort, but still very simple
   * @param {Color} a
   * @param {Color} b
   * @return {Number}
   */
  static simpleHSL(a, b) {
    var result;

    result = Compare.property(a.getHue(), b.getHue());
    if (result) {
      return result;
    }

    result = Compare.property(a.getSaturation(), b.getSaturation());
    if (result) {
      return result;
    }

    result = Compare.property(a.getLightness(), b.getLightness());
    if (result) {
      return result;
    }

    return 0;
  }

  static simpleSLH(a, b) {
    var result;

    result = Compare.property(a.getSaturation(), b.getSaturation());
    if (result) {
      return result;
    }

    result = Compare.property(a.getLightness(), b.getLightness());
    if (result) {
      return result;
    }

    result = Compare.property(a.getHue(), b.getHue());
    if (result) {
      return result;
    }

    return 0;
  }

  static simpleSHL(a, b) {
    var result;

    result = Compare.property(a.getSaturation(), b.getSaturation());
    if (result) {
      return result;
    }

    result = Compare.property(a.getHue(), b.getHue());
    if (result) {
      return result;
    }

    result = Compare.property(a.getLightness(), b.getLightness());
    if (result) {
      return result;
    }

    return 0;
  }

  static simpleLinear(a, b) {
    var result;

    var aDistance = Math.sqrt(
      Math.pow(a.getRed(), 2) +
      Math.pow(a.getGreen(), 2) +
      Math.pow(a.getBlue(), 2)
    );

    var bDistance = Math.sqrt(
      Math.pow(b.getRed(), 2) +
      Math.pow(b.getGreen(), 2) +
      Math.pow(b.getBlue(), 2)
    );

    result = Compare.property(aDistance, bDistance);
    if (result) {
      return result;
    }

    return 0; // good chance this returns 0!
  }

  static hueStep(a, b) {
    var result;

    result = Compare.property(a.getHue(), b.getHue());
    if (result) {
      return result;
    }

    const origin = new Color({'red': 0, 'blue': 0, 'green': 0});
    result = Compare.property(
      Compare.getRGBDistanceBetween(a, origin),
      Compare.getRGBDistanceBetween(b, origin)
    );
    if (result) {
      return result;
    }

    return 0;
  }

  static hueBucketBrightness(a, b) {
    var result;

    // keep this divisible into 360 or it'll look weird
    const hueBuckets = 6;

    result = Compare.property(
      Math.floor(a.getHue() * hueBuckets / 360),
      Math.floor(b.getHue() * hueBuckets / 360)
    );

    if (result) {
      return result;
    }

    result = Compare.property(a.getBrightness(), b.getBrightness());
    if (result) {
      return result;
    }

    return 0;
  }

}


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

  static nameThisFunction(a, b) {
    var aHue = a.getHue();
    var bHue = b.getHue();

    if (aHue !== bHue) {
      return aHue - bHue;
    }

    var aSaturation = a.getSaturation();
    var bSaturation = b.getSaturation();
    var aLightness = a.getLightness();
    var bLightness = b.getLightness();

    var aBrightness = a.getBrightness();
    var bBrightness = b.getBrightness();

    if (aBrightness !== bBrightness) {
      return aBrightness - bBrightness;
    }

    return 0;
  }

}

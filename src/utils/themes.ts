import chroma from "chroma-js";

export type ColorPalette = {
  colorFg: string;
  colorFgAlpha: string;
  colorFgIntense: string;
  colorFgFaded: string;
  colorFgFadedMore: string;
  colorFgFadedMost: string;
  colorBg: string;
  colorBgAlpha: string;
  colorBgAlphaHeavy: string;
  colorBgAlphaHeavier: string;
  colorBgAlphaBlur: string;
  colorBgDark: string;
  colorBgDarken: string;
  colorBgLight: string;
  colorBgLighter: string;
  colorBgLightIntense: string;
  colorBgIntense: string;
  colorBgIntenser: string;
  colorBgIntserAlpha: string;
  colorBgInverse: string;
  colorBgInverser: string;
  colorBgFaded: string;
  backgroundBlur: string;
  highlightBgColor: string;
  highlightBgFaded: string;
  highlightBgAlpha: string;
  highlightBgDark: string;
  highlightTextColor: string;
  highlightTextAlpha: string;
  highlightTextAlphaHeavy: string;
  colorAccentBg: string;
  colorAccentBgAlpha: string;
  colorAccentBgAlphaHeavy: string;
  colorAccentBgDark: string;
  colorAccentBgDarker: string;
  colorAccentBgFaded: string;
  colorAccentBgFadedMore: string;
  colorAccentBgFadedMost: string;
  colorAccentBorder: string;
  colorAccentBorderDark: string;
  colorAccentFg: string;
  colorAccentFgFaded: string;
  colorAccentFgAlpha: string;
  colorAccentFgAlphaHeavy: string;
  borderColor: string;
  borderDisabledColor: string;
  borderSubtleColor: string;
  borderIntenseColor: string;
  colorSuccessBg: string;
  colorSuccessBgAlpha: string;
  colorSuccessFg: string;
  colorWarningBg: string;
  colorWarningBgAlpha: string;
  colorWarningFg: string;
  colorErrorBg: string;
  colorErrorBgAlpha: string;
  colorErrorFg: string;
  colorWindowBg: string;
  colorWindowFg: string;
};

export type RadiusInfo = {
  radiusRound: string;
  radiusRounded: string;
  radiusRoundedLess: string;
  radius: string;
  radiusHalf: string;
  radiusCap: string;
  scrollbarWidth: string;
};

export interface ThemeSettings {
  alpha: number;
  blur: number;
  colorAccentBg: string;
  colorBg: string;
  colorFg: string;
  colorHighlightBg: string;
  colorWindowBg: string;
  contrast: number;
  radius: number;
}

type ColorPaletteRaw = {
  [K in keyof ColorPalette]: string | chroma.Color;
};

function colorsToHex<T extends Record<string, string | chroma.Color>>(
  obj: T
): {
  [K in keyof T]: string;
} {
  const newObj = {};

  Object.entries(obj).forEach(([key, value]) => {
    if (typeof value === "string") {
      newObj[key] = value;
    } else {
      newObj[key] = value.hex();
    }
  });

  return newObj as {
    [K in keyof T]: string;
  };
}

const luminanceThreshold = 0.4,
  white = chroma("#fff"),
  black = chroma("#000"),
  green = chroma("#06a700"),
  yellow = chroma("#efaf00"),
  red = chroma("#c64539");

function diffMoreThan(refColor, sampleColor, threshold) {
  return chroma.deltaE(refColor, sampleColor) >= threshold;
}

function adjustColor(initialColor, targetColor, threshold, inverted = false) {
  const isInitialColorDifferent = diffMoreThan(
    initialColor,
    targetColor,
    threshold
  );

  if (isInitialColorDifferent) {
    return initialColor;
  }

  const isInitialLuminanceHigher =
    initialColor.luminance() > targetColor.luminance();

  if (isInitialLuminanceHigher) {
    do {
      initialColor = initialColor.brighten(0.1);

      if (initialColor.num() === white.num()) {
        if (!inverted) return white;

        do {
          initialColor = initialColor.darken(0.1);
        } while (
          initialColor.num() !== black.num() &&
          !diffMoreThan(initialColor, targetColor, threshold)
        );

        if (initialColor.num() === black.num()) return black;
      }
    } while (!diffMoreThan(initialColor, targetColor, threshold));

    return initialColor;
  } else {
    let color = chroma(initialColor.hex());

    do {
      color = color.darken(0.1);

      if (color.num() === black.num()) {
        if (!inverted) return black;

        let brightenedColor = chroma(initialColor.hex());

        do {
          brightenedColor = brightenedColor.brighten(0.1);
        } while (
          brightenedColor.num() !== white.num() &&
          !diffMoreThan(brightenedColor, targetColor, threshold)
        );

        if (brightenedColor.num() === white.num()) return white;
        return brightenedColor;
      }
    } while (!diffMoreThan(color, targetColor, threshold));

    return color;
  }
}

function getFgColors(baseColor, targetColor, threshold) {
  const modifiedBaseColor =
    baseColor.luminance() > luminanceThreshold
      ? baseColor.brighten(0.75)
      : baseColor.darken(0.75);

  const colorMix1 = chroma.mix(baseColor, targetColor, 0.1);
  const colorMix2 = chroma.mix(baseColor, targetColor, 0.2);
  const colorMix3 = chroma.mix(baseColor, targetColor, 0.4);

  return {
    colorFg: baseColor,
    colorFgAlpha: baseColor.alpha(0.1),
    colorFgIntense: adjustColor(modifiedBaseColor, targetColor, threshold),
    colorFgFaded: adjustColor(colorMix1, targetColor, threshold),
    colorFgFadedMore: adjustColor(colorMix2, targetColor, threshold),
    colorFgFadedMost: adjustColor(colorMix3, targetColor, threshold),
  };
}

function getBgColors(
  initialColor,
  targetColor,
  threshold,
  alphaValue,
  blurValue
) {
  const isInitialColorBright = initialColor.luminance() > luminanceThreshold;

  const darkened15 = initialColor.darken(0.15);
  const darkened30 = initialColor.darken(0.3);
  const brightened10 = initialColor.brighten(0.1);
  const brightened50 = initialColor.brighten(0.5);
  const brightened20 = initialColor.brighten(0.2);
  const intenseColor = isInitialColorBright
    ? initialColor.brighten(0.3)
    : initialColor.darken(0.5);
  const intenserColor = isInitialColorBright
    ? initialColor.brighten(0.5)
    : initialColor.darken(0.7);
  const inverseColor = isInitialColorBright
    ? initialColor.darken(0.1)
    : initialColor.brighten(0.1);
  const inverserColor = isInitialColorBright
    ? initialColor.darken(0.4)
    : initialColor.brighten(0.4);
  const fadedColor = isInitialColorBright
    ? initialColor.darken(0.3)
    : initialColor.brighten(0.3);

  const lightestColor = isInitialColorBright
    ? chroma.mix(white, initialColor, 0.4).alpha(0.95)
    : intenserColor.darken(0.1).alpha(0.92);

  return {
    colorBg: initialColor,
    colorBgAlpha: initialColor.alpha(0.9),
    colorBgAlphaHeavy: initialColor.alpha(0.65),
    colorBgAlphaHeavier: initialColor.alpha(0.25),
    colorBgAlphaBlur: initialColor.alpha(alphaValue),
    colorBgDark: adjustColor(darkened15, targetColor, threshold),
    colorBgDarken: adjustColor(darkened30, targetColor, threshold),
    colorBgLight: adjustColor(brightened10, targetColor, threshold),
    colorBgLighter: adjustColor(brightened50, targetColor, threshold),
    colorBgLightIntense: adjustColor(brightened20, targetColor, threshold),
    colorBgIntense: adjustColor(intenseColor, targetColor, threshold),
    colorBgIntenser: adjustColor(intenserColor, targetColor, threshold),
    colorBgIntserAlpha: lightestColor,
    colorBgInverse: adjustColor(inverseColor, targetColor, threshold),
    colorBgInverser: adjustColor(inverserColor, targetColor, threshold),
    colorBgFaded: adjustColor(fadedColor, targetColor, threshold),
    backgroundBlur: blurValue ? `blur(${blurValue}px)` : "",
  };
}

function getHighlightColors(baseColor, targetColor, threshold) {
  const brightenedColor = baseColor.brighten(1);
  const darkenedColor = baseColor.darken(0.5);
  const textColor = baseColor.luminance() > luminanceThreshold ? black : white;

  return {
    highlightBgColor: baseColor,
    highlightBgFaded: brightenedColor,
    highlightBgAlpha: baseColor.alpha(0.1),
    highlightBgDark: adjustColor(darkenedColor, targetColor, threshold),
    highlightTextColor: textColor,
    highlightTextAlpha: textColor.alpha(0.5),
    highlightTextAlphaHeavy: textColor.alpha(0.25),
  };
}

function getAccentColors(baseColor, targetColor, threshold, cond) {
  if (cond && baseColor.luminance() > 0.8) {
    baseColor = baseColor.darken(0.55);
  }

  const isColorBright = baseColor.luminance() > luminanceThreshold;
  const accentFgColor = isColorBright ? black : white;
  const accentBgColor = chroma.mix(accentFgColor, baseColor, 0.4);
  const accentBgDark = baseColor.darken(0.4);
  const accentBgDarker = baseColor.darken(1);
  const accentBgFaded = isColorBright
    ? baseColor.brighten(0.3).desaturate(0.5)
    : baseColor.darken(0.3).desaturate(0.5);
  const accentBgFadedMore = baseColor.brighten(0.5);
  const accentBgFadedMost = baseColor.brighten(1.2);
  const isAccentBright = accentBgFadedMost.luminance() > luminanceThreshold;
  const accentBorderColor = adjustColor(
    baseColor,
    targetColor,
    threshold,
    true
  );
  const accentBorderDark = accentBorderColor.darken(0.25);

  return {
    colorAccentBg: baseColor,
    colorAccentBgAlpha: accentBgFadedMost.alpha(isAccentBright ? 0.45 : 0.55),
    colorAccentBgAlphaHeavy: accentBgFadedMost.alpha(
      isAccentBright ? 0.25 : 0.35
    ),
    colorAccentBgDark: accentBgDark,
    colorAccentBgDarker: accentBgDarker,
    colorAccentBgFaded: accentBgFaded,
    colorAccentBgFadedMore: accentBgFadedMore,
    colorAccentBgFadedMost: accentBgFadedMost,
    colorAccentBorder: accentBorderColor,
    colorAccentBorderDark: accentBorderDark,
    colorAccentFg: accentFgColor,
    colorAccentFgFaded: accentBgColor,
    colorAccentFgAlpha: accentFgColor.alpha(0.15),
    colorAccentFgAlphaHeavy: accentFgColor.alpha(0.05),
  };
}

function getBorderColors(baseColor, threshold) {
  const luminanceThreshold = 0.003 * threshold;

  const adjustedColor =
    baseColor.luminance() < luminanceThreshold
      ? baseColor.brighten(1)
      : baseColor.darken(0.5);
  const adjustedWithTargetColor = adjustColor(
    adjustedColor,
    baseColor,
    threshold
  );

  const isAdjustedBrighter =
    adjustedWithTargetColor.luminance() > baseColor.luminance();

  const mixedColor =
    baseColor.luminance() <= luminanceThreshold
      ? chroma.mix(adjustedWithTargetColor, baseColor, 0.35)
      : chroma.mix(adjustedWithTargetColor, baseColor, 0.7);

  const intensifiedColor = isAdjustedBrighter
    ? adjustedWithTargetColor.brighten(0.4)
    : adjustedWithTargetColor.darken(0.4);

  const halfThresholdAdjusted = adjustColor(
    adjustedColor,
    baseColor,
    threshold / 2
  );

  return {
    borderColor: adjustedWithTargetColor,
    borderDisabledColor: adjustColor(mixedColor, baseColor, threshold / 2),
    borderSubtleColor: chroma.mix(halfThresholdAdjusted, baseColor, 0.25),
    borderIntenseColor: adjustColor(
      intensifiedColor,
      baseColor,
      1.25 * threshold
    ),
  };
}

function getFeedbackColors(baseColor, threshold) {
  const successColor = adjustColor(green, baseColor, threshold);
  const successBgAlpha = successColor.alpha(0.1);
  const successFg =
    successColor.luminance() > luminanceThreshold ? black : white;

  const warningColor = adjustColor(yellow, baseColor, threshold);
  const warningBgAlpha = warningColor.alpha(0.1);
  const warningFg =
    warningColor.luminance() > luminanceThreshold ? black : white;

  const errorColor = adjustColor(red, baseColor, threshold);
  const errorBgAlpha = errorColor.alpha(0.1);
  const errorFg = errorColor.luminance() > luminanceThreshold ? black : white;

  return {
    colorSuccessBg: successColor,
    colorSuccessBgAlpha: successBgAlpha,
    colorSuccessFg: successFg,
    colorWarningBg: warningColor,
    colorWarningBgAlpha: warningBgAlpha,
    colorWarningFg: warningFg,
    colorErrorBg: errorColor,
    colorErrorBgAlpha: errorBgAlpha,
    colorErrorFg: errorFg,
  };
}

const ThemeHelper = {
  forTheme: (themeData: ThemeSettings): ColorPalette => {
    const textContrast = 6 * themeData.contrast;
    const bgContrast = 2 * themeData.contrast;
    const highlightContrast = 1.5 * themeData.contrast;
    const accentBgContrast = 3 * themeData.contrast;
    const borderContrast = 3 * themeData.contrast;
    const windowBgContrast = 6 * themeData.contrast;

    const fgToBgColor = adjustColor(
      chroma(themeData.colorFg),
      chroma(themeData.colorBg),
      textContrast
    );
    const bgToFgColor = adjustColor(
      chroma(themeData.colorBg),
      chroma(themeData.colorFg),
      bgContrast
    );
    const highlightToBgColor = adjustColor(
      chroma(themeData.colorHighlightBg),
      chroma(themeData.colorBg),
      highlightContrast
    );
    const accentToBgColor = adjustColor(
      chroma(themeData.colorAccentBg),
      chroma(themeData.colorBg),
      accentBgContrast,
      true
    );
    const windowBgColor = themeData.colorWindowBg
      ? chroma(themeData.colorWindowBg)
      : bgToFgColor;
    const windowFgColor =
      windowBgColor.luminance() > luminanceThreshold ? black : white;

    const raw: ColorPaletteRaw = {
      ...getFgColors(fgToBgColor, bgToFgColor, textContrast),
      ...getBgColors(
        bgToFgColor,
        fgToBgColor,
        bgContrast,
        themeData.alpha,
        themeData.blur
      ),
      ...getHighlightColors(highlightToBgColor, bgToFgColor, highlightContrast),
      ...getAccentColors(accentToBgColor, bgToFgColor, accentBgContrast, false),
      ...getBorderColors(bgToFgColor, borderContrast),
      ...getFeedbackColors(bgToFgColor, borderContrast),
      colorWindowBg: windowBgColor,
      colorWindowFg: windowFgColor,
    };
    return colorsToHex(raw);
  },
  accentOnly: (baseColor, bgColor, contrast, invert, saturation) => {
    const accentContrast = 2 * contrast;
    const accentBgContrast = 3 * contrast;

    bgColor = adjustColor(bgColor, baseColor, 6 * contrast);
    baseColor = adjustColor(baseColor, bgColor, accentContrast);
    return getAccentColors(
      adjustColor(baseColor, bgColor, accentBgContrast),
      bgColor,
      accentBgContrast,
      saturation
    );
  },
  fgBgHighlight: (fgColor, bgColor, contrast) => {
    bgColor = adjustColor(bgColor, fgColor, 6);
    fgColor = adjustColor(fgColor, bgColor, 2);
    const highlightContrast = 1.5;
    const highlightColor = adjustColor(contrast, bgColor, highlightContrast);

    return {
      ...getFgColors(fgColor, bgColor, 6),
      ...getBgColors(bgColor, fgColor, 2, 0.75, 10),
      ...getHighlightColors(highlightColor, bgColor, highlightContrast),
    };
  },
  getRadiusInfo: (
    radiusValue: number,
    scrollbarWidthValue: boolean
  ): RadiusInfo => {
    const defaultScrollbarWidth = 16;
    const customScrollbarWidth = 12;

    const radiusRound = radiusValue > -1 ? "100px" : "0";
    const radiusRounded = radiusValue > -1 ? "2px" : "0";
    const radiusRoundedLess = radiusValue > 0 ? `${radiusValue - 1}px` : "0";
    const radius = `${radiusValue}px`;
    const radiusHalf = `${Math.round(radiusValue / 2)}px`;
    const radiusCap = `${Math.min(radiusValue, 8)}px`;
    const scrollbarWidth = `${
      scrollbarWidthValue ? customScrollbarWidth : defaultScrollbarWidth
    }px`;

    return {
      radiusRound,
      radiusRounded,
      radiusRoundedLess,
      radius,
      radiusHalf,
      radiusCap,
      scrollbarWidth,
    };
  },
};

export default ThemeHelper;

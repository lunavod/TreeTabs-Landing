import { useState, useEffect } from "react";
import themePresets from "../../utils/theme_presets";
import ThemeHelper from "../../utils/themes";

const ThemeInjector = ({
  incognito,
  selectedTheme,
}: {
  incognito: boolean;
  selectedTheme: string;
}) => {
  const preset = themePresets[selectedTheme];
  const theme = ThemeHelper.forTheme(preset);
  const radiusInfo = ThemeHelper.getRadiusInfo(preset.radius, false);
  const css = [...Object.entries(theme), ...Object.entries(radiusInfo)].reduce(
    (acc, [key, value]) => {
      return `${acc} --${key}: ${value};\n`;
    },
    ""
  );

  return (
    <div style={{ display: "none" }}>
      <style>{`
        :root {
          ${css}
        }
      `}</style>
    </div>
  );
};

export default ThemeInjector;

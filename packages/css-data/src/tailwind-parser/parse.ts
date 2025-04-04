import { UnoGenerator, createGenerator } from "@unocss/core";
import { presetWind3 } from "@unocss/preset-wind3";
import { presetLegacyCompat } from "@unocss/preset-legacy-compat";
import warnOnce from "warn-once";
import { substituteVariables } from "./substitute";
import { parseCss, type ParsedStyleDecl } from "../parse-css";

type Warn = (condition: boolean, message: string) => void;

let unoLazy: UnoGenerator | undefined = undefined;

const createUnoGenerator = async () => {
  unoLazy = await createGenerator({
    presets: [
      presetWind3({ preflight: "on-demand" }),
      // until we support oklch natively
      presetLegacyCompat({ legacyColorSpace: true }),
    ],
  });
  return unoLazy;
};

/**
 * Parses Tailwind classes to CSS by expanding shorthands and substituting variables.
 */
export const parseTailwindToCss = async (
  classes: string,
  warn: Warn = warnOnce
): Promise<string> => {
  const generator = unoLazy ?? (await createUnoGenerator());
  const generated = await generator.generate(classes);
  const cssWithClasses = substituteVariables(generated.css, warn);
  return cssWithClasses;
};

/**
 * Tailwind by default has border-style: solid, but WebStudio doesn't.
 * Provide border-style: solid if border-width is provided.
 **/
const postprocessBorder = (styles: Omit<ParsedStyleDecl, "selector">[]) => {
  const borderPairs = [
    ["border-top-width", "border-top-style"],
    ["border-right-width", "border-right-style"],
    ["border-bottom-width", "border-bottom-style"],
    ["border-left-width", "border-left-style"],
  ] as const;

  const resultStyles = [...styles];

  for (const [borderWidthProperty, borderStyleProperty] of borderPairs) {
    const hasWidth = styles.some(
      (style) => style.property === borderWidthProperty
    );
    const hasStyle = styles.some(
      (style) => style.property === borderStyleProperty
    );
    if (hasWidth && hasStyle === false) {
      resultStyles.push({
        property: borderStyleProperty,
        value: {
          type: "keyword",
          value: "solid",
        },
      });
    }
  }
  return resultStyles;
};

/**
 * Parses Tailwind classes to webstudio template format.
 */
export const parseTailwindToWebstudio = async (
  classes: string,
  warn: Warn = warnOnce
): Promise<Omit<ParsedStyleDecl, "selector">[]> => {
  const css = await parseTailwindToCss(classes, warn);
  // remove properties from parsed declaration to align with embed template
  let styles = parseCss(css).map(({ selector, ...styleDecl }) => styleDecl);
  // postprocessing
  styles = postprocessBorder(styles);

  return styles;
};

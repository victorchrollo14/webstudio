import { ResourceIcon } from "@webstudio-is/icons/svg";
import {
  type WsComponentMeta,
  type WsComponentPropsMeta,
} from "@webstudio-is/sdk";
import { props } from "./__generated__/head-link.props";

export const meta: WsComponentMeta = {
  icon: ResourceIcon,
  contentModel: {
    category: "none",
    children: [],
  },
};

export const propsMeta: WsComponentPropsMeta = {
  props,
  initialProps: ["rel", "hrefLang", "href", "type", "as"],
};

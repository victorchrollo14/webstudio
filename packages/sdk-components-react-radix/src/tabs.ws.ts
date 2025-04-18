import {
  ContentIcon,
  HeaderIcon,
  TabsIcon,
  TriggerIcon,
} from "@webstudio-is/icons/svg";
import {
  defaultStates,
  type PresetStyle,
  type WsComponentMeta,
  type WsComponentPropsMeta,
} from "@webstudio-is/sdk";
import { button, div } from "@webstudio-is/sdk/normalize.css";
import { radix } from "./shared/meta";
import { buttonReset } from "./shared/preset-styles";
import {
  propsTabs,
  propsTabsList,
  propsTabsTrigger,
  propsTabsContent,
} from "./__generated__/tabs.props";

const presetStyle = {
  div,
} satisfies PresetStyle<"div">;

export const metaTabs: WsComponentMeta = {
  type: "container",
  icon: TabsIcon,
  constraints: [
    {
      relation: "descendant",
      component: { $eq: radix.TabsTrigger },
    },
    {
      relation: "descendant",
      component: { $eq: radix.TabsList },
    },
    {
      relation: "descendant",
      component: { $eq: radix.TabsContent },
    },
  ],
  presetStyle,
};

export const metaTabsList: WsComponentMeta = {
  type: "container",
  icon: HeaderIcon,
  constraints: {
    relation: "ancestor",
    component: { $eq: radix.Tabs },
  },
  presetStyle,
};

export const metaTabsTrigger: WsComponentMeta = {
  type: "container",
  icon: TriggerIcon,
  constraints: [
    {
      relation: "ancestor",
      component: { $eq: radix.TabsList },
    },
    {
      relation: "ancestor",
      component: { $neq: radix.TabsTrigger },
    },
  ],
  indexWithinAncestor: radix.Tabs,
  label: "Tab Trigger",
  states: [
    ...defaultStates,
    {
      category: "component-states",
      label: "Active",
      selector: "[data-state=active]",
    },
  ],
  presetStyle: {
    button: [button, buttonReset].flat(),
  },
};

export const metaTabsContent: WsComponentMeta = {
  type: "container",
  label: "Tab Content",
  icon: ContentIcon,
  constraints: {
    relation: "ancestor",
    component: { $eq: radix.Tabs },
  },
  indexWithinAncestor: radix.Tabs,
  presetStyle,
};

export const propsMetaTabs: WsComponentPropsMeta = {
  props: propsTabs,
};

export const propsMetaTabsList: WsComponentPropsMeta = {
  props: propsTabsList,
};

export const propsMetaTabsTrigger: WsComponentPropsMeta = {
  props: propsTabsTrigger,
};

export const propsMetaTabsContent: WsComponentPropsMeta = {
  props: propsTabsContent,
};

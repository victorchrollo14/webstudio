import { useStore } from "@nanostores/react";
import prettyBytes from "pretty-bytes";
import {
  theme,
  Box,
  Flex,
  Grid,
  Text,
  Button,
  Tooltip,
} from "@webstudio-is/design-system";
import {
  CloudIcon,
  AspectRatioIcon,
  DimensionsIcon,
  TrashIcon,
} from "@webstudio-is/icons";
import type { Asset } from "@webstudio-is/sdk";
import { getFormattedAspectRatio } from "./utils";
import { $authPermit } from "~/shared/nano-states";

type ImageInfoProps = {
  asset: Asset;
  onDelete: (ids: Array<string>) => void;
};

export const ImageInfo = ({ asset, onDelete }: ImageInfoProps) => {
  const { size, meta, id, name } = asset;
  const authPermit = useStore($authPermit);

  const isDeleteDisabled = authPermit === "view";
  const tooltipContent = isDeleteDisabled
    ? "View mode. You can't delete assets."
    : undefined;

  const truncateFileName = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) {
      return text;
    }

    const extension = text.split(".").pop() ?? "";
    const trimLength = maxLength - (extension.length + 1);
    const output = `${text.slice(0, trimLength)}.${extension}`;

    return output;
  };

  return (
    <>
      <Box css={{ padding: theme.panel.padding }}>
        <Grid columns={1} align="center" gap={2}>
          <Box css={{ width: 200 }}>
            <Text>{truncateFileName(name, 28)}</Text>
          </Box>
          <Flex align="center" css={{ gap: theme.spacing[3] }}>
            <CloudIcon />
            <Text variant="labelsSentenceCase">{prettyBytes(size)}</Text>
          </Flex>
        </Grid>
      </Box>
      {"width" in meta && "height" in meta ? (
        <Box css={{ padding: theme.panel.padding }}>
          <Grid columns={2} gap={2} align="center">
            <Flex align="center" gap={1}>
              <DimensionsIcon />
              <Text variant="labelsSentenceCase">
                {meta.width} x {meta.height}
              </Text>
            </Flex>{" "}
            <Flex align="center" gap={1}>
              <AspectRatioIcon />
              <Text variant="labelsSentenceCase">
                {getFormattedAspectRatio(meta)}
              </Text>
            </Flex>
          </Grid>
        </Box>
      ) : null}
      <Box css={{ padding: theme.panel.padding }}>
        <Tooltip side="bottom" content={tooltipContent}>
          <Button
            color="destructive"
            onClick={() => onDelete([id])}
            prefix={<TrashIcon />}
            disabled={isDeleteDisabled}
          >
            Delete
          </Button>
        </Tooltip>
      </Box>
    </>
  );
};

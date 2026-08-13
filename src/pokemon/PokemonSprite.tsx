import { createElement, useEffect, useState, type CSSProperties } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";

type PokemonSpriteProps = {
  uri: string | null | undefined;
  /** Fixed box size. Omit to fill the parent. */
  size?: number;
  style?: StyleProp<ViewStyle>;
};

const trimCache = new Map<string, string>();

/** Trim transparent pixels, then center on a square so margins are equal. */
async function prepareSprite(uri: string): Promise<string> {
  const cached = trimCache.get(uri);
  if (cached) {
    return cached;
  }

  if (typeof document === "undefined") {
    return uri;
  }

  const response = await fetch(uri, { mode: "cors" });
  if (!response.ok) {
    throw new Error(`sprite fetch failed: ${response.status}`);
  }
  const blob = await response.blob();
  const bitmap = await createImageBitmap(blob);
  const width = bitmap.width;
  const height = bitmap.height;

  const source = document.createElement("canvas");
  source.width = width;
  source.height = height;
  const ctx = source.getContext("2d", { willReadFrequently: true });
  if (!ctx) {
    bitmap.close();
    throw new Error("2d context unavailable");
  }

  ctx.drawImage(bitmap, 0, 0);
  bitmap.close();
  const { data } = ctx.getImageData(0, 0, width, height);

  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;
  const alphaThreshold = 10;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const alpha = data[(y * width + x) * 4 + 3];
      if (alpha > alphaThreshold) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (maxX < minX || maxY < minY) {
    throw new Error("no opaque pixels");
  }

  const cropW = maxX - minX + 1;
  const cropH = maxY - minY + 1;
  const content = Math.max(cropW, cropH);
  // Keep a small equal margin around the character inside the square.
  const pad = Math.max(2, Math.round(content * 0.08));
  const side = content + pad * 2;

  const out = document.createElement("canvas");
  out.width = side;
  out.height = side;
  const outCtx = out.getContext("2d");
  if (!outCtx) {
    throw new Error("output 2d context unavailable");
  }

  outCtx.imageSmoothingEnabled = false;
  const dx = Math.floor((side - cropW) / 2);
  const dy = Math.floor((side - cropH) / 2);
  outCtx.drawImage(source, minX, minY, cropW, cropH, dx, dy, cropW, cropH);

  const dataUrl = out.toDataURL("image/png");
  trimCache.set(uri, dataUrl);
  return dataUrl;
}

/** Trims sprite padding and fills the frame, centered with equal margins. */
export function PokemonSprite({ uri, size, style }: PokemonSpriteProps) {
  const [displayUri, setDisplayUri] = useState<string | undefined>(
    uri ?? undefined,
  );

  useEffect(() => {
    let cancelled = false;
    if (!uri) {
      setDisplayUri(undefined);
      return;
    }

    setDisplayUri(uri);
    prepareSprite(uri)
      .then((next) => {
        if (!cancelled) {
          setDisplayUri(next);
        }
      })
      .catch((error) => {
        console.warn("[PokemonSprite] trim failed, using original", error);
        if (!cancelled) {
          setDisplayUri(uri);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [uri]);

  const boxStyle =
    size != null
      ? [{ width: size, height: size }, styles.frame, style]
      : [styles.frameFill, style];

  if (Platform.OS === "web") {
    return createElement(
      "div",
      {
        style: {
          ...webFrameStyle,
          ...(size != null
            ? { width: size, height: size, flex: "none" }
            : {
                width: "100%",
                flex: 1,
                alignSelf: "stretch",
                minHeight: 0,
              }),
        },
      },
      displayUri
        ? createElement("img", {
            src: displayUri,
            alt: "",
            draggable: false,
            style: webImageStyle,
          })
        : null,
    );
  }

  return (
    <View style={boxStyle}>
      {displayUri ? (
        <Image
          source={{ uri: displayUri }}
          style={size != null ? { width: size, height: size } : styles.imageFill}
          resizeMode="contain"
        />
      ) : null}
    </View>
  );
}

const webFrameStyle: CSSProperties = {
  borderRadius: 10,
  backgroundColor: "#f3f6ea",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  boxSizing: "border-box",
};

const webImageStyle: CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "contain",
  objectPosition: "center",
  imageRendering: "pixelated",
  display: "block",
};

const styles = StyleSheet.create({
  frame: {
    borderRadius: 10,
    backgroundColor: "#f3f6ea",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  frameFill: {
    flex: 1,
    alignSelf: "stretch",
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#f3f6ea",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  imageFill: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
});

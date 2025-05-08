figma.showUI(__html__, {
  width: 500,
  height: 650,
  title: "Icon Builder",
  themeColors: true,
  visible: true,
  position: {
    x: figma.viewport.center.x - 300,
    y: figma.viewport.center.y - 350,
  },
});

const sanitizeComponentName = (name: string): string => {
  return name.replace(/^As=/, "").replace(/\s+/g, "");
};

const sendFrameNameToUI = async () => {
  const selection = figma.currentPage.selection;

  if (
    (selection.length === 1 && selection[0].type === "FRAME") ||
    selection[0].type === "COMPONENT" ||
    selection[0].type === "INSTANCE"
  ) {
    const frame = selection[0];
    const sanitizedName = sanitizeComponentName(frame.name);

    figma.ui.postMessage({
      type: "set-frame-name",
      frameName: sanitizedName,
    });

    const svgBytes = await frame.exportAsync({ format: "SVG" });
    const svgContent = String.fromCharCode(...new Uint8Array(svgBytes));

    const paths = svgContent.match(/<path[^>]*>/g) || [];
    const motionPaths = paths
      .map((path) => {
        const camelCasePath = path
          .replace(/-([a-z])/g, (_, char) => char.toUpperCase())
          .replace(/<path|\/>/g, "")
          .replace(/stroke="[^"]*"/g, "stroke={color}")
          .replace(/fill="[^"]*"/g, "fill={color}")
          .replace(/>/g, "")
          .trim();

        return `
          <path
            ${camelCasePath}
            {...props}
          />
        `.trim();
      })
      .join("\n\n");

    const tsxContent = `
      import React from "react";

      export const ${sanitizedName}: React.FC<{ color: string }> = ({ color, ...props }) => (
        <g>
          ${motionPaths}
        </g>
      );
    `.trim();

    figma.ui.postMessage({
      type: "preview-code",
      content: tsxContent,
    });
  } else if (selection.length > 1) {
    figma.ui.postMessage({
      type: "multiple-frames-selected",
    });
  } else {
    figma.ui.postMessage({
      type: "set-frame-name",
      frameName: "IconComponent",
    });
    figma.ui.postMessage({
      type: "preview-code",
      content: "",
    });
  }
};

sendFrameNameToUI();

figma.on("selectionchange", () => {
  sendFrameNameToUI();
});

figma.ui.onmessage = async (msg) => {
  if (msg.type === "export-icons") {
    const { useFramerMotion, interfaceName } = msg.options;
    const selection = figma.currentPage.selection;

    if (selection.length === 0) {
      figma.notify("Please select at least one frame.");
      return;
    }

    for (const node of selection) {
      if (
        node.type === "FRAME" ||
        node.type === "COMPONENT" ||
        node.type === "INSTANCE"
      ) {
        const sanitizedName = sanitizeComponentName(node.name);
        const svgBytes = await node.exportAsync({ format: "SVG" });
        const svgContent = String.fromCharCode(...new Uint8Array(svgBytes));

        const paths = svgContent.match(/<path[^>]*>/g) || [];
        const motionPaths = paths
          .map((path, index) => {
            const camelCasePath = path
              .replace(/-([a-z])/g, (_, char) => char.toUpperCase())
              .replace(/<path|\/>/g, "")
              .replace(/stroke="[^"]*"/g, "stroke={color}")
              .replace(/fill="[^"]*"/g, "fill={color}")
              .replace(/>/g, "")
              .trim();

            const childName =
              node.children && node.children[index]?.name.toLowerCase();
            const className =
              childName &&
              childName !== "vector" &&
              !childName.startsWith("rectangle")
                ? `className=\"${childName}\"`
                : "";

            return useFramerMotion
              ? `
                <motion.path
                  ${camelCasePath}
                  ${className}
                  {...props}
                />
              `.trim()
              : `
                <path
                  ${camelCasePath}
                  ${className}
                  {...props}
                />
              `.trim();
          })
          .join("\n\n");

        const tsxContent = `
          import React from "react";
          ${useFramerMotion ? 'import { motion } from "framer-motion";' : ""}

          export const ${sanitizedName}: React.FC<${interfaceName}> = ({ color, ...props }) => (
            <g>
              ${motionPaths}
            </g>
          );
        `.trim();

        figma.ui.postMessage({
          type: "download-file",
          fileName: `${sanitizedName}.tsx`,
          content: tsxContent,
          folderName: "Icons",
        });
      }
    }

    figma.notify(`${selection.length} icons prepared for download.`);
  }

  if (msg.type === "export-wrapper") {
    const { useFramerMotion } = msg.options;

    const wrapperContent = `
      import React from "react";
      ${useFramerMotion ? 'import { motion } from "framer-motion";' : ""}

      export const Icon: React.FC<{
        as: React.FC<React.SVGProps<SVGSVGElement>>;
        size?: number | string;
        color?: string;
        onClick?: () => void;
      }> = ({ as: IconComponent, size = 24, color = "currentColor", onClick, ...props }) => {
        return (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: onClick ? "pointer" : "default",
            }}
          >
            ${
              useFramerMotion
                ? `
            <motion.svg
              width={size}
              height={size}
              fill={color}
              whileHover={onClick ? { scale: 1.2 } : undefined}
              whileTap={onClick ? { scale: 0.8 } : undefined}
              onClick={onClick}
              {...props}
            >
              <IconComponent />
            </motion.svg>
            `
                : `
            <svg width={size} height={size} fill={color} {...props}>
              <IconComponent />
            </svg>
            `
            }
          </div>
        );
      };
    `.trim();

    const indexContent = `
      export * from "./ExampleIcon";
    `.trim();

    figma.ui.postMessage({
      type: "download-file",
      fileName: `Icon.tsx`,
      content: wrapperContent,
      folderName: "IconWrapper",
    });

    figma.ui.postMessage({
      type: "download-file",
      fileName: `index.ts`,
      content: indexContent,
      folderName: "IconWrapper/partials/icons",
    });

    figma.notify("IconWrapper folder prepared for download.");
  }
};

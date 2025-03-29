figma.showUI(__html__, {
  width: 500,
  height: 650,
  title: "Export Icons",
  themeColors: true,
  visible: true,
  position: {
    x: figma.viewport.center.x - 300,
    y: figma.viewport.center.y - 350,
  },
});

const sendFrameNameToUI = async () => {
  const selection = figma.currentPage.selection;
  if (selection.length === 1 && selection[0].type === "FRAME") {
    const frame = selection[0];
    figma.ui.postMessage({
      type: "set-frame-name",
      frameName: frame.name,
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

      export const ${frame.name.replace(
        /\s+/g,
        ""
      )}: React.FC<{ color: string }> = ({ color, ...props }) => (
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
    const { useFramerMotion, interfaceName, componentName } = msg.options;
    const selection = figma.currentPage.selection;

    if (selection.length === 0) {
      figma.notify("Please select at least one frame.");
      return;
    }

    for (const node of selection) {
      if (node.type === "FRAME") {
        const name = componentName
          ? componentName
              .replace(/(?:^\w|[A-Z]|\b\w)/g, (word: string) =>
                word.toUpperCase()
              )
              .replace(/\s+/g, "")
          : node.name.replace(/\s+/g, "");
        const svgBytes = await node.exportAsync({ format: "SVG" });
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

            return useFramerMotion
              ? `
                <motion.path
                  ${camelCasePath}
                  {...props}
                />
              `.trim()
              : `
                <path
                  ${camelCasePath}
                  {...props}
                />
              `.trim();
          })
          .join("\n\n");

        const tsxContent = `
          import React from "react";
          ${useFramerMotion ? 'import { motion } from "framer-motion";' : ""}

          export const ${name}: React.FC<${interfaceName}> = ({ color, ...props }) => (
            <g>
              ${motionPaths}
            </g>
          );
        `.trim();

        figma.ui.postMessage({
          type: "download-file",
          fileName: `${name}.tsx`,
          content: tsxContent,
          folderName: "Downloads",
        });

        figma.ui.postMessage({
          type: "preview-code",
          content: tsxContent,
        });

        figma.notify(`Prepared ${name}.tsx for download.`);
      }
    }
  }
};

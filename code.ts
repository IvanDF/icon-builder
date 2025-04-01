figma.showUI(__html__, {
  width: 500,
  height: 650,
  title: "IconCraft",
  themeColors: true,
  visible: true,
  position: {
    x: figma.viewport.center.x - 300,
    y: figma.viewport.center.y - 350,
  },
});

figma.on("selectionchange", () => {
  const selection = figma.currentPage.selection;
  if (selection.length === 1 && selection[0].type === "FRAME") {
    figma.ui.postMessage({
      type: "set-frame-name",
      frameName: selection[0].name,
    });
  } else {
    figma.ui.postMessage({
      type: "set-frame-name",
      frameName: "IconComponent",
    });
  }
});

figma.ui.onmessage = async (msg) => {
  if (msg.type === "export-icons") {
    const { componentName } = msg.options;
    const selection = figma.currentPage.selection;

    if (selection.length === 0) {
      figma.notify("Please select at least one frame.");
      return;
    }

    for (const node of selection) {
      if (node.type === "FRAME") {
        const name = componentName || node.name.replace(/\s+/g, "");
        const svgBytes = await node.exportAsync({ format: "SVG" });
        const svgContent = String.fromCharCode(...new Uint8Array(svgBytes));

        figma.ui.postMessage({
          type: "download-file",
          fileName: `${name}.tsx`,
          content: svgContent,
        });

        figma.notify(`Prepared ${name}.tsx for download.`);
      }
    }
  }
};

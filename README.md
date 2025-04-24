<div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
  <h1 style={{ margin: 0, padding: 0 }}>Icon Builder</h1>
</div>

<img src="./assets/ui-preview.png" alt="Icon Builder UI" width={350} />

**Icon Builder** is a Figma plugin that transforms your design elements into reusable React components.  
Whether you’re prototyping icons or building design systems, Icon Builder ensures your visuals are scalable, animated, and developer-friendly.

> 🎨 **Try the Plugin on Figma**  
> [Launch Icon Builder →](https://www.figma.com/community/plugin/1489334044911703870/icon-builder)

---

## 🚀 Key Features

- ⚛️ **React Component Export** – Instantly convert Figma frames, components, or instances to React.
- 🎞️ **Framer Motion Support** – Enable smooth, declarative animations right out of the box.
- 🧾 **Custom Naming** – Tailor component and interface names to your codebase.
- 👁️ **Live Code Preview** – Review the output before export.
- 🧱 **Icon Wrapper Included** – Standard and animated wrappers provided.
- 🧙 **Minimal UI** – Designed to stay out of your way and boost productivity.

---

## 🛠️ Local Development

Clone the repo, install dependencies, and build:

```bash
git clone https://github.com/IvanDF/icon-builder.git
cd icon-builder
npm install
npm run build
```

Load the plugin in Figma:
- Open Figma
- Go to `Plugins > Development > Import Plugin from Manifest...`
- Select the `manifest.json` file

---

## 🧩 Included: Icon Wrapper Components

Two React wrappers are provided for easy integration:

- [Standard Wrapper Documentation](./examples/standard/README.md)
- [Framer Motion Wrapper Documentation](./examples/framer/README.md)

They allow centralized control over icon size, color, and animation logic—ideal for design systems and UI libraries.

---

## 📘 How It Works

1. Select a frame, component, or instance.
2. Fill in:
   - **Component Name**
   - **Interface Name**
   - **Enable Framer Motion** (optional)
3. Click **Export Icons** to generate your files.

---

## 👨‍💻 Author

Made with ❤️ by [IvanDF](https://ivandf.netlify.app) –
For feedback, bugs, or collaborative sparks, open an issue or drop a line. ✉️

---

## ⭐ Support & Share

If Icon Builder saves you time (and your sanity):
- ⭐ Star this repo on GitHub!
- 🔁 Share it with fellow designers and developers.

[![GitHub Stars](https://img.shields.io/github/stars/IvanDF/icon-builder?style=social)](https://github.com/IvanDF/icon-builder/stargazers)

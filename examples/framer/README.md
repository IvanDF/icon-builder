# Framer Example

This example demonstrates how to use the `<Icon />` component with `framer-motion` for animations. It includes examples of animated paths and reusable animation configurations.

## 📂 Folder Structure

```
/framer
├── Icon.tsx
├── partials
│   ├── icons
│   │   ├── Info.tsx
│   │   ├── Edit.tsx
│   │   ├── index.ts
│   └── commons.ts
```

## 🛠️ How to Use

1. **Install Dependencies**:
   Ensure you have `framer-motion` and `styled-components` installed in your project:

   ```bash
   npm install framer-motion styled-components
   ```

2. **Integrate the Example**:
   Copy the `Icon.tsx` file and the `partials` folder into your project.

3. **Import and Use the `<Icon />` Component**:

   ```tsx
   import React from "react";
   import { Icon } from "./Icon";

   const App = () => {
     return (
       <div>
         <Icon
           as="Info"
           size={32}
           color="#FF5733"
           pathAnimation={{ opacity: 1 }}
         />
         <Icon
           as="Edit"
           size={40}
           color="#28A745"
           onClick={() => alert("Icon clicked!")}
         />
       </div>
     );
   };

   export default App;
   ```

---

## Notes

- The `partials/icons` folder contains individual icon components with animations.
- The `commons.ts` file contains reusable animation configurations.
- The `index.ts` file aggregates all icons for easier imports.

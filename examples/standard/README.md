# Standard Example

This example demonstrates how to use the `<Icon />` component without animations. It is ideal for projects that do not require `framer-motion`.

## 📂 Folder Structure

```
/standard
├── Icon.tsx
├── partials
│   ├── icons
│   │   ├── Info.tsx
│   │   ├── Edit.tsx
│   │   ├── index.ts
│   └── index.ts
```

## 🛠️ How to Use

1. **Install Dependencies**:
   Ensure you have `styled-components` installed in your project:

   ```bash
   npm install styled-components
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
         <Icon as="Info" size={32} color="#FF5733" />
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

- The `partials/icons` folder contains individual icon components.
- The `index.ts` file aggregates all icons for easier imports.

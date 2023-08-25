
---

![BUILDDIV LTD Logo](https://github.com/builddiv/fluid-drawer-native/assets/143026621/9632cd20-dc9a-4373-aa0f-fdd08b0be43b)

# 🌊 Fluid Drawer Native

Fluid Drawer Native is a highly customizable, fluid, and native-feeling drawer component for React Native. With support for touch gestures, dynamic height adjustments, and seamless integration with device keyboards, this component ensures a premium user experience. Additionally, its lightweight footprint of just 16 kB ensures minimal impact on your application's performance.

Designed by Ginhinio Castelen [(BUILDDIV LTD)](https://builddiv.com).

## 🚀 Demo

![Demo](https://github.com/builddiv/fluid-drawer-native/assets/143026621/7084961e-4916-4a20-b1b8-06ad99e1c9d9)

## 🛠 Installation

To add Fluid Drawer Native to your React Native project:

```bash
npm install @builddiv/fluid-drawer-native
```

Or with Yarn:

```bash
yarn add @builddiv/fluid-drawer-native
```

## ⚙️ Requirements

- React Native version: 0.72.4 or newer
- React version: 18.2.0 or newer

## 🔧 Usage

```jsx
import React from 'react';
import { FluidDrawerNative } from '@builddiv/fluid-drawer-native';

function MyComponent() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button onPress={() => setIsOpen(true)}>Open Drawer</Button>
            <FluidDrawerNative open={isOpen} onClose={() => setIsOpen(false)}>
                <View>
                    <Text>Welcome to the fluid drawer!</Text>
                    <TextInput placeholder="Type here..." />
                </View>
            </FluidDrawerNative>
        </>
    );
}
```

## 🎨 Customization

| Prop               | Type            | Default        | Description                                                                                   |
|--------------------|----------------|----------------|-----------------------------------------------------------------------------------------------|
| open               | boolean        | -              | Whether the drawer is open or closed.                                                          |
| onClose            | function       | -              | Callback for when the drawer needs to be closed.                                               |
| children           | React.ReactNode| -              | The content of the drawer.                                                                     |
| drawerHeight       | number         | 350            | The height of the drawer.                                                                     |
| handleVisible      | boolean        | true           | Whether the handle of the drawer is visible.                                                   |
| handleStyle        | StyleProp      | -              | Custom style for the handle.                                                                   |
| drawerStyle        | StyleProp      | -              | Custom style for the drawer.                                                                   |
| backdropStyle      | StyleProp      | -              | Custom style for the backdrop.                                                                 |
| backdropTouchable  | boolean        | true           | Determines if touching outside the drawer should close it.                                     |

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## 👥 Author

- Ginhinio Castelen - [GitHub](https://github.com/cyber-gin)
- [BUILDDIV LTD](https://builddiv.com)

## 📜 License

This project is licensed under the MIT License. You are free to use it in personal and commercial projects.

---


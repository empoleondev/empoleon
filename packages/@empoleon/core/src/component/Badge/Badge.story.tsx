import { IconStarFilled } from '@tabler/icons-solidjs';
import { Group } from '../Group';
import { Badge } from './Badge';
import { For, JSX } from 'solid-js';
import { EmpoleonProvider } from '../../core';

export default {
  title: 'Badge',
  decorators: [
    (Story: () => JSX.Element) => (
      <Story />
    ),
    (Story: () => JSX.Element) => (
      <EmpoleonProvider>
        <Story />
      </EmpoleonProvider>
    ),
  ],
};

export function Usage() {
  return (
    <div
      style={{
        'padding': '40px',
        'display': 'flex',
        'gap': '1rem',
        'background': 'rgba(0, 0, 0, 0.05)',
        'flex-wrap': 'wrap',
      }}
    >
      <Badge>Filled</Badge>
      <Badge variant="light">Light</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="dot">Dot</Badge>
      <Badge variant="transparent">Transparent</Badge>
      <Badge variant="white">White</Badge>
      <Badge variant="gradient">Gradient</Badge>
      <Badge variant="default">Default</Badge>

      <Badge leftSection="L">Left section</Badge>
      <Badge rightSection="R">Right section</Badge>
      <Badge leftSection="L" rightSection="R">
        Both sections
      </Badge>
    </div>
  );
}

export function WithFixedWidth() {
  return (
    <div style={{ 'padding': '40px' }}>
      <Badge w={200} rightSection="R" leftSection="L">
        Badge
      </Badge>
      <Badge w={200} leftSection="L">
        Badge
      </Badge>
      <Badge w={200} rightSection="R">
        Badge
      </Badge>
      <Badge w={200}>Badge</Badge>
      <span>Other content</span>
    </div>
  );
}

export function WithIconInSection() {
  return (
    <Badge
      leftSection={<IconStarFilled size={12} color="var(--empoleon-color-yellow-5)" />}
      color="dark"
      variant="filled"
    >
      Badge with icon
    </Badge>
  );
}

export function Round() {
  return (
    <div style={{ 'padding': '40px' }}>
      <Badge circle size="md">
        12
      </Badge>
    </div>
  );
}

export function AutoContrast() {
  const buttons = Array.from({ length: 10 }, (_, i) => `blue.${i}`);

  return (
    <div
      style={{
        'display': 'flex',
        'flex-direction': 'column',
        'align-items': 'flex-start',
        'gap': '10px',
        'padding': '40px',
      }}
    >
      <For each={buttons}>
        {(color) => (
          <Badge color={color} autoContrast>
            $$
          </Badge>
        )}
      </For>
    </div>
  );
}

export function Variants() {
  return (
    <Group p={40}>
      <Badge variant="light" rightSection="R" leftSection="L">
        Light
      </Badge>
      <Badge variant="filled">Filled</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="dot">Dot</Badge>
      <Badge variant="gradient">Gradient</Badge>
      <Badge variant="gradient" gradient={{ deg: 30, from: 'red', to: 'orange' }}>
        Custom gradient
      </Badge>
      <Badge variant="gradient" gradient={{ deg: 115, from: '#FC00CF', to: '#CCFFEF' }}>
        hex gradient
      </Badge>
    </Group>
  );
}

export function WithinGroup() {
  return (
    <div style={{ 'display': 'flex', 'flex-direction': 'column' }}>
      <Badge>Single badge within group</Badge>
    </div>
  );
}

export function Unstyled() {
  return (
    <div style={{ 'padding': '40px' }}>
      <Badge unstyled leftSection="$$">
        Unstyled badge
      </Badge>
    </div>
  );
}

export function CustomComponent() {
  return (
    <div style={{ 'padding': '40px' }}>
      <Badge component="a" href="https://empoleon.dev/">
        Anchor
      </Badge>

      <Badge component="button" type="button">
        Button
      </Badge>
    </div>
  );
}

export function ColorsIndex() {
  return (
    <div style={{ 'padding': '40px' }}>
      <Badge color="violet.2" variant="dot">
        Anchor
      </Badge>
    </div>
  );
}

export function Sizes() {
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];

  return <div style={{ 'padding': '40px', display: 'flex', 'gap': '40px' }}>
    <For each={sizes}>
      {(size) => (
        <Badge size={size}>
          Badge {size}
        </Badge>
      )}
    </For>
  </div>;
}

export function DotWithRightSection() {
  return (
    <>
      <Badge variant="dot" rightSection="R" color="red" w={300}>
        Badge
      </Badge>
      <Badge variant="dot" color="red" w={300}>
        Badge
      </Badge>
    </>
  );
}

// import { IconStarFilled } from '@tabler/icons-solidjs';
// import { Group } from '../Group';
// import { Badge } from './Badge';
// import { createEffect, For, JSX, createSignal } from 'solid-js';
// import { EmpoleonProvider, useEmpoleonColorScheme } from '../../core';

// // Self-contained dark mode toggle component
// function DarkModeToggle() {
//   const [isDark, setIsDark] = createSignal(false);
//   const { setColorScheme } = useEmpoleonColorScheme();

//   const toggleTheme = () => {
//     const newTheme = !isDark();
//     setIsDark(newTheme);
//     setColorScheme(newTheme ? 'dark' : 'light');

//     // Update document for global styling
//     if (typeof document !== 'undefined') {
//       document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light');
//       document.body.style.backgroundColor = newTheme ? '#1a1a1a' : '#ffffff';
//       document.body.style.color = newTheme ? '#ffffff' : '#000000';
//     }
//   };

//   return (
//     <button
//       onClick={toggleTheme}
//       style={{
//         position: 'fixed',
//         top: '20px',
//         right: '20px',
//         'z-index': 9999,
//         padding: '8px 12px',
//         border: '1px solid #ccc',
//         'border-radius': '4px',
//         background: isDark() ? '#333' : '#fff',
//         color: isDark() ? '#fff' : '#000',
//         cursor: 'pointer',
//         'font-size': '12px',
//         'font-weight': 'bold',
//       }}
//     >
//       {isDark() ? '☀️ Light' : '🌙 Dark'}
//     </button>
//   );
// }

// // Wrapper component that provides theme context
// function StoryWrapper(props: { children: JSX.Element }) {
//   return (
//     <EmpoleonProvider>
//       <DarkModeToggle />
//       <div style={{ 'min-height': '100vh', padding: '20px' }}>
//         {props.children}
//       </div>
//     </EmpoleonProvider>
//   );
// }

// export default {
//   title: 'Badge',
//   decorators: [
//     (Story: () => JSX.Element) => (
//       <StoryWrapper>
//         <Story />
//       </StoryWrapper>
//     ),
//   ],
// };

// export function Usage() {
//   return (
//     <div
//       style={{
//         'padding': '40px',
//         'display': 'flex',
//         'gap': '1rem',
//         'background': 'rgba(0, 0, 0, 0.05)',
//         'flex-wrap': 'wrap',
//       }}
//     >
//       <Badge>Filled</Badge>
//       <Badge variant="light">Light</Badge>
//       <Badge variant="outline">Outline</Badge>
//       <Badge variant="dot">Dot</Badge>
//       <Badge variant="transparent">Transparent</Badge>
//       <Badge variant="white">White</Badge>
//       <Badge variant="gradient">Gradient</Badge>
//       <Badge variant="default">Default</Badge>

//       <Badge leftSection="L">Left section</Badge>
//       <Badge rightSection="R">Right section</Badge>
//       <Badge leftSection="L" rightSection="R">
//         Both sections
//       </Badge>
//     </div>
//   );
// }

// export function WithFixedWidth() {
//   return (
//     <div style={{ 'padding': '40px' }}>
//       <Badge w={200} rightSection="R" leftSection="L">
//         Badge
//       </Badge>
//       <Badge w={200} leftSection="L">
//         Badge
//       </Badge>
//       <Badge w={200} rightSection="R">
//         Badge
//       </Badge>
//       <Badge w={200}>Badge</Badge>
//       <span>Other content</span>
//     </div>
//   );
// }

// export function WithIconInSection() {
//   return (
//     <Badge
//       leftSection={<IconStarFilled size={12} color="var(--empoleon-color-yellow-5)" />}
//       color="dark"
//       variant="filled"
//     >
//       Badge with icon
//     </Badge>
//   );
// }

// export function Round() {
//   return (
//     <div style={{ 'padding': '40px' }}>
//       <Badge circle size="md">
//         12
//       </Badge>
//     </div>
//   );
// }

// export function AutoContrast() {
//   const buttons = Array.from({ length: 10 }, (_, i) => `blue.${i}`);

//   return (
//     <div
//       style={{
//         'display': 'flex',
//         'flex-direction': 'column',
//         'align-items': 'flex-start',
//         'gap': '10px',
//         'padding': '40px',
//       }}
//     >
//       <For each={buttons}>
//         {(color) => (
//           <Badge color={color} autoContrast>
//             $$
//           </Badge>
//         )}
//       </For>
//     </div>
//   );
// }

// export function Variants() {
//   return (
//     <Group p={40}>
//       <Badge variant="light" rightSection="R" leftSection="L">
//         Light
//       </Badge>
//       <Badge variant="filled">Filled</Badge>
//       <Badge variant="outline">Outline</Badge>
//       <Badge variant="dot">Dot</Badge>
//       <Badge variant="gradient">Gradient</Badge>
//       <Badge variant="gradient" gradient={{ deg: 30, from: 'red', to: 'orange' }}>
//         Custom gradient
//       </Badge>
//       <Badge variant="gradient" gradient={{ deg: 115, from: '#FC00CF', to: '#CCFFEF' }}>
//         hex gradient
//       </Badge>
//     </Group>
//   );
// }

// export function WithinGroup() {
//   return (
//     <div style={{ 'display': 'flex', 'flex-direction': 'column' }}>
//       <Badge>Single badge within group</Badge>
//     </div>
//   );
// }

// export function Unstyled() {
//   return (
//     <div style={{ 'padding': '40px' }}>
//       <Badge unstyled leftSection="$$">
//         Unstyled badge
//       </Badge>
//     </div>
//   );
// }

// export function CustomComponent() {
//   return (
//     <div style={{ 'padding': '40px' }}>
//       <Badge component="a" href="https://empoleon.dev/">
//         Anchor
//       </Badge>

//       <Badge component="button" type="button">
//         Button
//       </Badge>
//     </div>
//   );
// }

// export function ColorsIndex() {
//   return (
//     <div style={{ 'padding': '40px' }}>
//       <Badge color="violet.2" variant="dot">
//         Anchor
//       </Badge>
//     </div>
//   );
// }

// export function Sizes() {
//   const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];

//   return <div style={{ 'padding': '40px', display: 'flex', 'gap': '40px' }}>
//     <For each={sizes}>
//       {(size) => (
//         <Badge size={size}>
//           Badge {size}
//         </Badge>
//       )}
//     </For>
//   </div>;
// }

// export function DotWithRightSection() {
//   return (
//     <>
//       <Badge variant="dot" rightSection="R" color="red" w={300}>
//         Badge
//       </Badge>
//       <Badge variant="dot" color="red" w={300}>
//         Badge
//       </Badge>
//     </>
//   );
// }

// import { IconStarFilled } from '@tabler/icons-solidjs';
// import { Group } from '../Group';
// import { Badge } from './Badge';
// import { createEffect, For, JSX, onMount } from 'solid-js';
// import { EmpoleonProvider, useEmpoleonColorScheme } from '../../core';

// // Background sync component
// function BackgroundSyncWrapper(props: any) {
//   const { setColorScheme } = useEmpoleonColorScheme();

//   onMount(() => {
//     // Function to detect background changes
//     const detectBackgroundChange = () => {
//       const storybook = document.querySelector('.sb-show-main');
//       if (storybook) {
//         const computedStyle = window.getComputedStyle(storybook);
//         const backgroundColor = computedStyle.backgroundColor;

//         // Simple dark/light detection based on background color
//         const isDark = backgroundColor === 'rgb(51, 51, 51)' || // dark background
//                       backgroundColor === 'rgb(26, 26, 26)' ||  // another dark variant
//                       backgroundColor.includes('51, 51, 51') ||
//                       backgroundColor.includes('26, 26, 26');

//         setColorScheme(isDark ? 'dark' : 'light');
//       }
//     };

//     // Initial check
//     detectBackgroundChange();

//     // Watch for changes using MutationObserver
//     const observer = new MutationObserver(() => {
//       setTimeout(detectBackgroundChange, 100); // Small delay to ensure styles are applied
//     });

//     const storybookContainer = document.querySelector('.sb-show-main');
//     if (storybookContainer) {
//       observer.observe(storybookContainer, {
//         attributes: true,
//         attributeFilter: ['style', 'class']
//       });
//     }

//     // Cleanup
//     return () => observer.disconnect();
//   });

//   return <>{props.children}</>;
// }

// const meta = {
//   title: 'Badge',
//   component: Badge,
//   parameters: {
//     backgrounds: {
//       values: [
//         { name: 'light', value: '#ffffff' },
//         { name: 'gray', value: '#f5f5f5' },
//         { name: 'dark', value: '#333333' },
//         { name: 'black', value: '#1a1a1a' },
//       ],
//       default: 'light',
//     },
//   },
//   decorators: [
//     (Story: () => JSX.Element) => (
//       <EmpoleonProvider>
//         <BackgroundSyncWrapper>
//           <Story />
//         </BackgroundSyncWrapper>
//       </EmpoleonProvider>
//     ),
//   ],
// };

// export default meta;

// export const Usage = {
//   render: () => (
//     <div
//       style={{
//         'padding': '40px',
//         'display': 'flex',
//         'gap': '1rem',
//         'background': 'rgba(0, 0, 0, 0.05)',
//         'flex-wrap': 'wrap',
//       }}
//     >
//       <Badge>Filled</Badge>
//       <Badge variant="light">Light</Badge>
//       <Badge variant="outline">Outline</Badge>
//       <Badge variant="dot">Dot</Badge>
//       <Badge variant="transparent">Transparent</Badge>
//       <Badge variant="white">White</Badge>
//       <Badge variant="gradient">Gradient</Badge>
//       <Badge variant="default">Default</Badge>

//       <Badge leftSection="L">Left section</Badge>
//       <Badge rightSection="R">Right section</Badge>
//       <Badge leftSection="L" rightSection="R">
//         Both sections
//       </Badge>
//     </div>
//   ),
// };

// export const OnDark = {
//   globals: {
//     backgrounds: { value: 'dark' },
//   },
//   render: () => (
//     <div
//       style={{
//         'padding': '40px',
//         'display': 'flex',
//         'gap': '1rem',
//         'background': 'rgba(255, 255, 255, 0.05)',
//         'flex-wrap': 'wrap',
//       }}
//     >
//       <Badge>Filled</Badge>
//       <Badge variant="light">Light</Badge>
//       <Badge variant="outline">Outline</Badge>
//       <Badge variant="dot">Dot</Badge>
//       <Badge variant="transparent">Transparent</Badge>
//       <Badge variant="white">White</Badge>
//       <Badge variant="gradient">Gradient</Badge>
//       <Badge variant="default">Default</Badge>
//     </div>
//   ),
// };

// export const WithFixedWidth = {
//   render: () => (
//     <div style={{ 'padding': '40px' }}>
//       <Badge w={200} rightSection="R" leftSection="L">
//         Badge
//       </Badge>
//       <Badge w={200} leftSection="L">
//         Badge
//       </Badge>
//       <Badge w={200} rightSection="R">
//         Badge
//       </Badge>
//       <Badge w={200}>Badge</Badge>
//       <span>Other content</span>
//     </div>
//   ),
// };

// export const WithIconInSection = {
//   render: () => (
//     <Badge
//       leftSection={<IconStarFilled size={12} color="var(--empoleon-color-yellow-5)" />}
//       color="dark"
//       variant="filled"
//     >
//       Badge with icon
//     </Badge>
//   ),
// };

// export const Round = {
//   render: () => (
//     <div style={{ 'padding': '40px' }}>
//       <Badge circle size="md">
//         12
//       </Badge>
//     </div>
//   ),
// };

// export const AutoContrast = {
//   render: () => {
//     const buttons = Array.from({ length: 10 }, (_, i) => `blue.${i}`);

//     return (
//       <div
//         style={{
//           'display': 'flex',
//           'flex-direction': 'column',
//           'align-items': 'flex-start',
//           'gap': '10px',
//           'padding': '40px',
//         }}
//       >
//         <For each={buttons}>
//           {(color) => (
//             <Badge color={color} autoContrast>
//               $$
//             </Badge>
//           )}
//         </For>
//       </div>
//     );
//   },
// };

// export const Variants = {
//   render: () => (
//     <Group p={40}>
//       <Badge variant="light" rightSection="R" leftSection="L">
//         Light
//       </Badge>
//       <Badge variant="filled">Filled</Badge>
//       <Badge variant="outline">Outline</Badge>
//       <Badge variant="dot">Dot</Badge>
//       <Badge variant="gradient">Gradient</Badge>
//       <Badge variant="gradient" gradient={{ deg: 30, from: 'red', to: 'orange' }}>
//         Custom gradient
//       </Badge>
//       <Badge variant="gradient" gradient={{ deg: 115, from: '#FC00CF', to: '#CCFFEF' }}>
//         hex gradient
//       </Badge>
//     </Group>
//   ),
// };

// export const WithinGroup = {
//   render: () => (
//     <div style={{ 'display': 'flex', 'flex-direction': 'column' }}>
//       <Badge>Single badge within group</Badge>
//     </div>
//   ),
// };

// export const Unstyled = {
//   render: () => (
//     <div style={{ 'padding': '40px' }}>
//       <Badge unstyled leftSection="$$">
//         Unstyled badge
//       </Badge>
//     </div>
//   ),
// };

// export const CustomComponent = {
//   render: () => (
//     <div style={{ 'padding': '40px' }}>
//       <Badge component="a" href="https://empoleon.dev/">
//         Anchor
//       </Badge>

//       <Badge component="button" type="button">
//         Button
//       </Badge>
//     </div>
//   ),
// };

// export const ColorsIndex = {
//   render: () => (
//     <div style={{ 'padding': '40px' }}>
//       <Badge color="violet.2" variant="dot">
//         Anchor
//       </Badge>
//     </div>
//   ),
// };

// export const Sizes = {
//   render: () => {
//     const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];

//     return (
//       <div style={{ 'padding': '40px', display: 'flex', 'gap': '40px' }}>
//         <For each={sizes}>
//           {(size) => (
//             <Badge size={size}>
//               Badge {size}
//             </Badge>
//           )}
//         </For>
//       </div>
//     );
//   },
// };

// export const DotWithRightSection = {
//   render: () => (
//     <>
//       <Badge variant="dot" rightSection="R" color="red" w={300}>
//         Badge
//       </Badge>
//       <Badge variant="dot" color="red" w={300}>
//         Badge
//       </Badge>
//     </>
//   ),
// };

// import { IconStarFilled } from '@tabler/icons-solidjs';
// import { Group } from '../Group';
// import { Badge } from './Badge';
// import { createEffect, For, JSX, onMount, onCleanup } from 'solid-js';
// import { EmpoleonProvider, useEmpoleonColorScheme } from '../../core';

// // URL watcher component
// function URLThemeSync(props: any) {
//   const { setColorScheme } = useEmpoleonColorScheme();

//   const getThemeFromURL = () => {
//     const url = window.location.href;

//     // Look for the full globals parameter: &globals=backgrounds.value:dark;backgrounds.grid:!undefined
//     const globalsMatch = url.match(/[&?]globals=([^&]*)/);

//     if (globalsMatch) {
//       const globalsValue = decodeURIComponent(globalsMatch[1]);

//       // Try to match the complete format first: backgrounds.value:dark;backgrounds.grid:!undefined
//       let backgroundsMatch = globalsValue.match(/backgrounds\.value:([^;]+);backgrounds\.grid:([^;]*)/);

//       // If that doesn't work, try the partial format: backgrounds.value:dark
//       if (!backgroundsMatch) {
//         backgroundsMatch = globalsValue.match(/backgrounds\.value:([^;$]+)/);
//       }

//       if (backgroundsMatch) {
//         const backgroundValue = backgroundsMatch[1];
//         // Consider dark, black, or any dark variant as dark theme
//         return backgroundValue === 'dark' || backgroundValue === 'black' || backgroundValue.includes('dark') ? 'dark' : 'light';
//       }
//     }

//     // Default to light if no background specified
//     return 'light';
//   };

//   const ensureCompleteURL = (theme: 'light' | 'dark') => {
//     const currentUrl = window.location.href;
//     const expectedGlobals = `backgrounds.value:${theme === 'dark' ? 'dark' : 'light'};backgrounds.grid:!undefined`;
//     const expectedParam = `globals=${encodeURIComponent(expectedGlobals)}`;

//     if (!currentUrl.includes(expectedParam)) {
//       // If the URL doesn't have the complete parameter, set it
//       const url = new URL(window.location.href);
//       url.searchParams.set('globals', expectedGlobals);
//       window.history.replaceState({}, '', url.toString());
//     }
//   };

//   const updateTheme = () => {
//     const theme = getThemeFromURL();
//     setColorScheme(theme);
//     ensureCompleteURL(theme);
//   };

//   onMount(() => {
//     // Set initial theme and ensure URL is complete
//     updateTheme();

//     // Watch for URL changes (when user clicks toolbar)
//     const handlePopState = () => {
//       updateTheme();
//     };

//     // Also watch for pushState/replaceState (Storybook's navigation)
//     const originalPushState = history.pushState;
//     const originalReplaceState = history.replaceState;

//     history.pushState = function(...args) {
//       originalPushState.apply(history, args);
//       setTimeout(updateTheme, 100); // Increased delay to ensure URL is updated
//     };

//     history.replaceState = function(...args) {
//       originalReplaceState.apply(history, args);
//       setTimeout(updateTheme, 100);
//     };

//     window.addEventListener('popstate', handlePopState);

//     // Watch for URL changes more frequently
//     const checkURL = setInterval(updateTheme, 200); // Check every 200ms

//     onCleanup(() => {
//       window.removeEventListener('popstate', handlePopState);
//       clearInterval(checkURL);
//       history.pushState = originalPushState;
//       history.replaceState = originalReplaceState;
//     });
//   });

//   return <>{props.children}</>;
// }

// export default {
//   title: 'Badge',
//   parameters: {
//     backgrounds: {
//       values: [
//         { name: 'light', value: '#ffffff' },
//         { name: 'gray', value: '#f5f5f5' },
//         { name: 'dark', value: '#333333' },
//         { name: 'black', value: '#1a1a1a' },
//       ],
//       default: 'light',
//     },
//   },
//   decorators: [
//     (Story: () => JSX.Element) => (
//       <EmpoleonProvider>
//         <URLThemeSync>
//           <Story />
//         </URLThemeSync>
//       </EmpoleonProvider>
//     ),
//   ],
// };

// export function Usage() {
//   return (
//     <div
//       style={{
//         'padding': '40px',
//         'display': 'flex',
//         'gap': '1rem',
//         'background': 'rgba(0, 0, 0, 0.05)',
//         'flex-wrap': 'wrap',
//       }}
//     >
//       <Badge>Filled</Badge>
//       <Badge variant="light">Light</Badge>
//       <Badge variant="outline">Outline</Badge>
//       <Badge variant="dot">Dot</Badge>
//       <Badge variant="transparent">Transparent</Badge>
//       <Badge variant="white">White</Badge>
//       <Badge variant="gradient">Gradient</Badge>
//       <Badge variant="default">Default</Badge>

//       <Badge leftSection="L">Left section</Badge>
//       <Badge rightSection="R">Right section</Badge>
//       <Badge leftSection="L" rightSection="R">
//         Both sections
//       </Badge>
//     </div>
//   );
// }

// export function WithFixedWidth() {
//   return (
//     <div style={{ 'padding': '40px' }}>
//       <Badge w={200} rightSection="R" leftSection="L">
//         Badge
//       </Badge>
//       <Badge w={200} leftSection="L">
//         Badge
//       </Badge>
//       <Badge w={200} rightSection="R">
//         Badge
//       </Badge>
//       <Badge w={200}>Badge</Badge>
//       <span>Other content</span>
//     </div>
//   );
// }

// export function WithIconInSection() {
//   return (
//     <Badge
//       leftSection={<IconStarFilled size={12} color="var(--empoleon-color-yellow-5)" />}
//       color="dark"
//       variant="filled"
//     >
//       Badge with icon
//     </Badge>
//   );
// }

// export function Round() {
//   return (
//     <div style={{ 'padding': '40px' }}>
//       <Badge circle size="md">
//         12
//       </Badge>
//     </div>
//   );
// }

// export function AutoContrast() {
//   const buttons = Array.from({ length: 10 }, (_, i) => `blue.${i}`);

//   return (
//     <div
//       style={{
//         'display': 'flex',
//         'flex-direction': 'column',
//         'align-items': 'flex-start',
//         'gap': '10px',
//         'padding': '40px',
//       }}
//     >
//       <For each={buttons}>
//         {(color) => (
//           <Badge color={color} autoContrast>
//             $$
//           </Badge>
//         )}
//       </For>
//     </div>
//   );
// }

// export function Variants() {
//   return (
//     <Group p={40}>
//       <Badge variant="light" rightSection="R" leftSection="L">
//         Light
//       </Badge>
//       <Badge variant="filled">Filled</Badge>
//       <Badge variant="outline">Outline</Badge>
//       <Badge variant="dot">Dot</Badge>
//       <Badge variant="gradient">Gradient</Badge>
//       <Badge variant="gradient" gradient={{ deg: 30, from: 'red', to: 'orange' }}>
//         Custom gradient
//       </Badge>
//       <Badge variant="gradient" gradient={{ deg: 115, from: '#FC00CF', to: '#CCFFEF' }}>
//         hex gradient
//       </Badge>
//     </Group>
//   );
// }

// export function WithinGroup() {
//   return (
//     <div style={{ 'display': 'flex', 'flex-direction': 'column' }}>
//       <Badge>Single badge within group</Badge>
//     </div>
//   );
// }

// export function Unstyled() {
//   return (
//     <div style={{ 'padding': '40px' }}>
//       <Badge unstyled leftSection="$$">
//         Unstyled badge
//       </Badge>
//     </div>
//   );
// }

// export function CustomComponent() {
//   return (
//     <div style={{ 'padding': '40px' }}>
//       <Badge component="a" href="https://empoleon.dev/">
//         Anchor
//       </Badge>

//       <Badge component="button" type="button">
//         Button
//       </Badge>
//     </div>
//   );
// }

// export function ColorsIndex() {
//   return (
//     <div style={{ 'padding': '40px' }}>
//       <Badge color="violet.2" variant="dot">
//         Anchor
//       </Badge>
//     </div>
//   );
// }

// export function Sizes() {
//   const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];

//   return <div style={{ 'padding': '40px', display: 'flex', 'gap': '40px' }}>
//     <For each={sizes}>
//       {(size) => (
//         <Badge size={size}>
//           Badge {size}
//         </Badge>
//       )}
//     </For>
//   </div>;
// }

// export function DotWithRightSection() {
//   return (
//     <>
//       <Badge variant="dot" rightSection="R" color="red" w={300}>
//         Badge
//       </Badge>
//       <Badge variant="dot" color="red" w={300}>
//         Badge
//       </Badge>
//     </>
//   );
// }

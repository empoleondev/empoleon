// import { render as testingLibraryRender } from '@solidjs/testing-library';
// import { EmpoleonProvider, EmpoleonProviderProps, EmpoleonThemeOverride } from '@empoleon/core';
// import { JSX, createSignal } from 'solid-js';

// type RenderResult = ReturnType<typeof testingLibraryRender>;

// export function render(
//   component: () => JSX.Element,
//   themeOverride?: EmpoleonThemeOverride,
//   providerProps?: Omit<EmpoleonProviderProps, 'theme'>
// ): {
//   container: Element;
//   rerender: (newComponent: () => JSX.Element) => RenderResult;
// } {
//   const [currentComponent, setCurrentComponent] = createSignal(component);

//   const finalTheme = themeOverride || {};

//   const result = testingLibraryRender(() => (
//     <EmpoleonProvider theme={finalTheme} env="test" {...providerProps}>
//       {currentComponent()()}
//     </EmpoleonProvider>
//   ));

//   return {
//     container: result.container,
//     rerender: (newComponent: () => JSX.Element): RenderResult => {
//       setCurrentComponent(() => newComponent);
//       return result;
//     }
//   };
// }

// import { render as testingLibraryRender } from '@solidjs/testing-library';
// import { EmpoleonProvider, EmpoleonProviderProps, EmpoleonThemeOverride } from '@empoleon/core';
// import { JSX, createSignal } from 'solid-js';

// type RenderResult = ReturnType<typeof testingLibraryRender>;

// interface RenderOptions {
//   components?: Record<string, any>;
// }

// // Explicit overloads to handle the test case
// export function render(
//   component: () => JSX.Element
// ): {
//   container: Element;
//   rerender: (newComponent: () => JSX.Element) => RenderResult;
// };

// export function render(
//   component: () => JSX.Element,
//   themeOverride: EmpoleonThemeOverride
// ): {
//   container: Element;
//   rerender: (newComponent: () => JSX.Element) => RenderResult;
// };

// export function render(
//   component: () => JSX.Element,
//   themeOverride: EmpoleonThemeOverride,
//   providerProps: Omit<EmpoleonProviderProps, 'theme'>
// ): {
//   container: Element;
//   rerender: (newComponent: () => JSX.Element) => RenderResult;
// };

// export function render(
//   component: () => JSX.Element,
//   renderOptions: RenderOptions,
//   providerProps?: Omit<EmpoleonProviderProps, 'theme'>
// ): {
//   container: Element;
//   rerender: (newComponent: () => JSX.Element) => RenderResult;
// };

// export function render(
//   component: () => JSX.Element,
//   themeOverrideOrOptions?: EmpoleonThemeOverride | RenderOptions,
//   providerProps?: Omit<EmpoleonProviderProps, 'theme'>
// ): {
//   container: Element;
//   rerender: (newComponent: () => JSX.Element) => RenderResult;
// } {
//   console.log('🚨 RENDER FUNCTION CALLED 🚨');
//   console.log('Arguments received:', {
//     component: typeof component,
//     themeOverrideOrOptions,
//     providerProps,
//     argumentsLength: arguments.length,
//     arg0: typeof arguments[0],
//     arg1: arguments[1],
//     arg2: arguments[2]
//   });

//   const [currentComponent, setCurrentComponent] = createSignal(component);

//   // Handle the specific test case: render(component, {}, { classNamesPrefix: 'test' })
//   let themeOverride: EmpoleonThemeOverride = {};
//   let finalProviderProps: any = {};

//   if (arguments.length === 3) {
//     // This is the test case: render(component, {}, { classNamesPrefix: 'test' })
//     themeOverride = arguments[1] as EmpoleonThemeOverride || {};
//     finalProviderProps = arguments[2] || {};
//     console.log('✅ Detected 3-argument call pattern');
//   } else if (arguments.length === 2) {
//     // Check if second argument has 'components' property (RenderOptions)
//     const secondArg = arguments[1];
//     if (secondArg && typeof secondArg === 'object' && 'components' in secondArg) {
//       // RenderOptions pattern
//       finalProviderProps = { components: secondArg.components };
//     } else {
//       // Theme override pattern
//       themeOverride = secondArg || {};
//     }
//   } else if (arguments.length === 1) {
//     // Default case - just component
//     themeOverride = {};
//     finalProviderProps = {};
//   }

//   console.log('Final render configuration:', {
//     themeOverride,
//     finalProviderProps,
//     hasClassNamesPrefix: finalProviderProps?.classNamesPrefix
//   });

//   const result = testingLibraryRender(() => (
//     <EmpoleonProvider theme={themeOverride} env="test" {...finalProviderProps}>
//       {currentComponent()()}
//     </EmpoleonProvider>
//   ));

//   return {
//     container: result.container,
//     rerender: (newComponent: () => JSX.Element): RenderResult => {
//       setCurrentComponent(() => newComponent);
//       return result;
//     }
//   };
// }


// import { render as testingLibraryRender } from '@solidjs/testing-library';
// import { EmpoleonProvider, EmpoleonProviderProps, EmpoleonThemeOverride } from '@empoleon/core';
// import { JSX, createSignal } from 'solid-js';

// type RenderResult = ReturnType<typeof testingLibraryRender>;

// interface RenderOptions {
//   components?: Record<string, any>;
// }

// // Import Card for context wrapping
// import { Card } from '@empoleon/core'; // Adjust import path as needed



// // Explicit overloads to handle the test case
// export function render(
//   component: () => JSX.Element
// ): {
//   container: Element;
//   rerender: (newComponent: () => JSX.Element) => RenderResult;
// };

// export function render(
//   component: () => JSX.Element,
//   themeOverride: EmpoleonThemeOverride
// ): {
//   container: Element;
//   rerender: (newComponent: () => JSX.Element) => RenderResult;
// };

// export function render(
//   component: () => JSX.Element,
//   themeOverride: EmpoleonThemeOverride,
//   providerProps: Omit<EmpoleonProviderProps, 'theme'>
// ): {
//   container: Element;
//   rerender: (newComponent: () => JSX.Element) => RenderResult;
// };

// export function render(
//   component: () => JSX.Element,
//   renderOptions: RenderOptions,
//   providerProps?: Omit<EmpoleonProviderProps, 'theme'>
// ): {
//   container: Element;
//   rerender: (newComponent: () => JSX.Element) => RenderResult;
// };

// export function render(
//   component: () => JSX.Element,
//   themeOverrideOrOptions?: EmpoleonThemeOverride | RenderOptions,
//   providerProps?: Omit<EmpoleonProviderProps, 'theme'>
// ): {
//   container: Element;
//   rerender: (newComponent: () => JSX.Element) => RenderResult;
// } {
//   console.log('🚨 RENDER FUNCTION CALLED 🚨');
//   console.log('Arguments received:', {
//     component: typeof component,
//     themeOverrideOrOptions,
//     providerProps,
//     argumentsLength: arguments.length,
//     arg0: typeof arguments[0],
//     arg1: arguments[1],
//     arg2: arguments[2]
//   });

//   const [currentComponent, setCurrentComponent] = createSignal(component);

//   // Handle the specific test case: render(component, {}, { classNamesPrefix: 'test' })
//   let themeOverride: EmpoleonThemeOverride = {};
//   let finalProviderProps: any = {};

//   if (arguments.length === 3) {
//     // This is the test case: render(component, {}, { classNamesPrefix: 'test' })
//     themeOverride = arguments[1] as EmpoleonThemeOverride || {};
//     finalProviderProps = arguments[2] || {};
//     console.log('✅ Detected 3-argument call pattern');
//   } else if (arguments.length === 2) {
//     // Check if second argument has 'components' property (RenderOptions)
//     const secondArg = arguments[1];
//     if (secondArg && typeof secondArg === 'object' && 'components' in secondArg) {
//       // RenderOptions pattern
//       finalProviderProps = { components: secondArg.components };
//     } else {
//       // Theme override pattern
//       themeOverride = secondArg || {};
//     }
//   } else if (arguments.length === 1) {
//     // Default case - just component
//     themeOverride = {};
//     finalProviderProps = {};
//   }

//   console.log('Final render configuration:', {
//     themeOverride,
//     finalProviderProps,
//     hasClassNamesPrefix: finalProviderProps?.classNamesPrefix
//   });

//   const result = testingLibraryRender(() => {
//     return (
//       <EmpoleonProvider theme={themeOverride} env="test" {...finalProviderProps}>
//         {(() => {
//           // We need to execute the component to check if it needs Card context
//           let needsCardWrapper = false;
//           let componentResult;

//           try {
//             // Try to render the component first
//             componentResult = currentComponent()();
//             console.log('✅ Component rendered successfully without Card wrapper');
//             return componentResult;
//           } catch (error) {
//             // @ts-ignore
//             const errorMessage = error?.message || '';
//             console.log('❌ Component failed to render:', errorMessage);

//             // Check if it's a Card context error
//             if (errorMessage.includes('Card component was not found in tree') ||
//                 errorMessage.includes('useCardContext')) {
//               console.log('🔄 Retrying with Card wrapper...');
//               needsCardWrapper = true;
//             } else {
//               // Re-throw other errors
//               throw error;
//             }
//           }

//           // If we need Card wrapper, try again
//           if (needsCardWrapper) {
//             try {
//               return (
//                 <Card>
//                   {currentComponent()()}
//                 </Card>
//               );
//             } catch (retryError) {
//               // @ts-ignore
//               console.log('💥 Failed even with Card wrapper:', retryError?.message);
//               throw retryError;
//             }
//           }

//           return componentResult;
//         })()}
//       </EmpoleonProvider>
//     );
//   });

//   return {
//     container: result.container,
//     rerender: (newComponent: () => JSX.Element): RenderResult => {
//       setCurrentComponent(() => newComponent);
//       return result;
//     }
//   };
// }

// import { render as testingLibraryRender } from '@solidjs/testing-library';
// import { EmpoleonProvider, EmpoleonProviderProps, EmpoleonThemeOverride } from '@empoleon/core';
// import { JSX, createSignal } from 'solid-js';

// type RenderResult = ReturnType<typeof testingLibraryRender>;

// interface RenderOptions {
//   components?: Record<string, any>;
// }

// // Import Card for context wrapping
// import { Card } from '@empoleon/core'; // Adjust import path as needed

// // Explicit overloads to handle the test case
// export function render(
//   component: () => JSX.Element
// ): {
//   container: Element;
//   rerender: (newComponent: () => JSX.Element) => RenderResult;
// };

// export function render(
//   component: () => JSX.Element,
//   themeOverride: EmpoleonThemeOverride
// ): {
//   container: Element;
//   rerender: (newComponent: () => JSX.Element) => RenderResult;
// };

// export function render(
//   component: () => JSX.Element,
//   themeOverride: EmpoleonThemeOverride,
//   providerProps: Omit<EmpoleonProviderProps, 'theme'>
// ): {
//   container: Element;
//   rerender: (newComponent: () => JSX.Element) => RenderResult;
// };

// export function render(
//   component: () => JSX.Element,
//   renderOptions: RenderOptions,
//   providerProps?: Omit<EmpoleonProviderProps, 'theme'>
// ): {
//   container: Element;
//   rerender: (newComponent: () => JSX.Element) => RenderResult;
// };

// export function render(
//   component: () => JSX.Element,
//   themeOverrideOrOptions?: EmpoleonThemeOverride | RenderOptions,
//   providerProps?: Omit<EmpoleonProviderProps, 'theme'>
// ): {
//   container: Element;
//   rerender: (newComponent: () => JSX.Element) => RenderResult;
// } {
//   console.log('🚨 RENDER FUNCTION CALLED 🚨');
//   console.log('Arguments received:', {
//     component: typeof component,
//     themeOverrideOrOptions,
//     providerProps,
//     argumentsLength: arguments.length,
//     arg0: typeof arguments[0],
//     arg1: arguments[1],
//     arg2: arguments[2]
//   });

//   const [currentComponent, setCurrentComponent] = createSignal(component);

//   // Handle the specific test case: render(component, {}, { classNamesPrefix: 'test' })
//   let themeOverride: EmpoleonThemeOverride = {};
//   let finalProviderProps: any = {};

//   if (arguments.length === 3) {
//     // This is the test case: render(component, {}, { classNamesPrefix: 'test' })
//     themeOverride = arguments[1] as EmpoleonThemeOverride || {};
//     finalProviderProps = arguments[2] || {};
//     console.log('✅ Detected 3-argument call pattern');
//   } else if (arguments.length === 2) {
//     // Check if second argument has 'components' property (RenderOptions)
//     const secondArg = arguments[1];
//     if (secondArg && typeof secondArg === 'object' && 'components' in secondArg) {
//       // RenderOptions pattern
//       finalProviderProps = { components: secondArg.components };
//     } else {
//       // Theme override pattern
//       themeOverride = secondArg || {};
//     }
//   } else if (arguments.length === 1) {
//     // Default case - just component
//     themeOverride = {};
//     finalProviderProps = {};
//   }

//   console.log('Final render configuration:', {
//     themeOverride,
//     finalProviderProps,
//     hasClassNamesPrefix: finalProviderProps?.classNamesPrefix
//   });

//   const result = testingLibraryRender(() => {
//     return (
//       <EmpoleonProvider theme={themeOverride} env="test" {...finalProviderProps}>
//         {(() => {
//           // We need to execute the component to check if it needs Card context
//           let needsCardWrapper = false;
//           let componentResult;

//           try {
//             // Try to render the component first
//             componentResult = currentComponent()();
//             console.log('✅ Component rendered successfully without Card wrapper');
//             return componentResult;
//           } catch (error) {
//             // @ts-ignore
//             const errorMessage = error?.message || '';
//             console.log('❌ Component failed to render:', errorMessage);

//             // Check if it's a Card context error
//             if (errorMessage.includes('Card component was not found in tree') ||
//                 errorMessage.includes('useCardContext')) {
//               console.log('🔄 Retrying with Card wrapper...');
//               needsCardWrapper = true;
//             } else {
//               // Re-throw other errors
//               throw error;
//             }
//           }

//           // If we need Card wrapper, try again
//           if (needsCardWrapper) {
//             try {
//               return (
//                 <Card>
//                   {currentComponent()()}
//                 </Card>
//               );
//             } catch (retryError) {
//               // @ts-ignore
//               console.log('💥 Failed even with Card wrapper:', retryError?.message);
//               throw retryError;
//             }
//           }

//           return componentResult;
//         })()}
//       </EmpoleonProvider>
//     );
//   });

//   return {
//     container: result.container,
//     rerender: (newComponent: () => JSX.Element): RenderResult => {
//       setCurrentComponent(() => newComponent);
//       return result;
//     }
//   };
// }

// // <---- works!--->
// import { render as testingLibraryRender } from '@solidjs/testing-library';
// import { EmpoleonProvider, EmpoleonProviderProps, EmpoleonThemeOverride } from '@empoleon/core';
// import { JSX, createSignal } from 'solid-js';

// type RenderResult = ReturnType<typeof testingLibraryRender>;

// interface RenderOptions {
//   components?: Record<string, any>;
// }

// // Import all the components you might need upfront
// // This avoids the dynamic import issues
// import * as EmpoleonCore from '@empoleon/core';

// // Extract component name from error message
// function extractComponentNameFromError(errorMessage: string): string | null {
//   const match = errorMessage.match(/(\w+) component was not found in tree/);
//   return match ? match[1] : null;
// }

// // Get context component by name from the imported module
// function getContextComponent(componentName: string): any {
//   console.log('🔍 Looking for component:', componentName);
//   console.log('Available in EmpoleonCore:', Object.keys(EmpoleonCore));

//   // Try to get the component directly
//   const component = (EmpoleonCore as any)[componentName];
//   if (component) {
//     console.log(`✅ Found ${componentName} in EmpoleonCore`);
//     return component;
//   }

//   // Try common patterns
//   const patterns = [
//     `${componentName}Provider`,
//     `${componentName}Context`,
//     `${componentName}Wrapper`,
//   ];

//   for (const pattern of patterns) {
//     const patternComponent = (EmpoleonCore as any)[pattern];
//     if (patternComponent) {
//       console.log(`✅ Found ${componentName} as ${pattern} in EmpoleonCore`);
//       return patternComponent;
//     }
//   }

//   console.log(`❌ Could not find ${componentName} in EmpoleonCore`);
//   return null;
// }

// // Explicit overloads
// export function render(
//   component: () => JSX.Element
// ): {
//   container: Element;
//   rerender: (newComponent: () => JSX.Element) => RenderResult;
// };

// export function render(
//   component: () => JSX.Element,
//   themeOverride: EmpoleonThemeOverride
// ): {
//   container: Element;
//   rerender: (newComponent: () => JSX.Element) => RenderResult;
// };

// export function render(
//   component: () => JSX.Element,
//   themeOverride: EmpoleonThemeOverride,
//   providerProps: Omit<EmpoleonProviderProps, 'theme'>
// ): {
//   container: Element;
//   rerender: (newComponent: () => JSX.Element) => RenderResult;
// };

// export function render(
//   component: () => JSX.Element,
//   renderOptions: RenderOptions,
//   providerProps?: Omit<EmpoleonProviderProps, 'theme'>
// ): {
//   container: Element;
//   rerender: (newComponent: () => JSX.Element) => RenderResult;
// };

// export function render(
//   component: () => JSX.Element,
//   themeOverrideOrOptions?: EmpoleonThemeOverride | RenderOptions,
//   providerProps?: Omit<EmpoleonProviderProps, 'theme'>
// ): {
//   container: Element;
//   rerender: (newComponent: () => JSX.Element) => RenderResult;
// } {
//   console.log('🚨 RENDER FUNCTION CALLED 🚨');

//   const [currentComponent, setCurrentComponent] = createSignal(component);

//   // Parse arguments (keeping your existing logic)
//   let themeOverride: EmpoleonThemeOverride = {};
//   let finalProviderProps: any = {};

//   if (arguments.length === 3) {
//     themeOverride = arguments[1] as EmpoleonThemeOverride || {};
//     finalProviderProps = arguments[2] || {};
//     console.log('✅ Detected 3-argument call pattern');
//   } else if (arguments.length === 2) {
//     const secondArg = arguments[1];
//     if (secondArg && typeof secondArg === 'object' && 'components' in secondArg) {
//       finalProviderProps = { components: secondArg.components };
//     } else {
//       themeOverride = secondArg || {};
//     }
//   } else if (arguments.length === 1) {
//     themeOverride = {};
//     finalProviderProps = {};
//   }

//   console.log('Final render configuration:', {
//     themeOverride,
//     finalProviderProps,
//     hasClassNamesPrefix: finalProviderProps?.classNamesPrefix
//   });

//   const result = testingLibraryRender(() => {
//     return (
//       <EmpoleonProvider theme={themeOverride} env="test" {...finalProviderProps}>
//         {(() => {
//           try {
//             // Try to render the component first
//             const componentResult = currentComponent()();
//             console.log('✅ Component rendered successfully without context wrapper');
//             return componentResult;
//           } catch (error) {
//             // @ts-ignore
//             const errorMessage = error?.message || '';
//             console.log('❌ Component failed to render:', errorMessage);

//             // Check if it's a context error and extract component name
//             const componentName = extractComponentNameFromError(errorMessage);

//             if (componentName) {
//               console.log(`🔄 Retrying with ${componentName} wrapper...`);

//               // Get the context component
//               const ContextComponent = getContextComponent(componentName);

//               if (ContextComponent) {
//                 try {
//                   return (
//                     <ContextComponent>
//                       {currentComponent()()}
//                     </ContextComponent>
//                   );
//                 } catch (retryError) {
//                   // @ts-ignore
//                   console.log('💥 Failed even with context wrapper:', retryError?.message);
//                   throw retryError;
//                 }
//               } else {
//                 console.log(`⚠️ Could not find context component for '${componentName}'`);
//               }
//             }

//             // Re-throw the error if we can't handle it
//             throw error;
//           }
//         })()}
//       </EmpoleonProvider>
//     );
//   });

//   return {
//     container: result.container,
//     rerender: (newComponent: () => JSX.Element): RenderResult => {
//       setCurrentComponent(() => newComponent);
//       return result;
//     }
//   };
// }


import { render as testingLibraryRender } from '@solidjs/testing-library';
import { EmpoleonProvider, EmpoleonProviderProps, EmpoleonThemeOverride } from '@empoleon/core';
import { JSX, createSignal } from 'solid-js';
import * as EmpoleonCore from '@empoleon/core'; // Import all components

type RenderResult = ReturnType<typeof testingLibraryRender>;

// Simple registry for context components
const contextComponents = new Map();

// Populate the registry with all components from @empoleon/core
Object.keys(EmpoleonCore).forEach(key => {
  const component = (EmpoleonCore as any)[key];
  if (typeof component === 'function') {
    contextComponents.set(key, component);

    // Also register common patterns
    const baseName = key.replace(/Provider|Context|Wrapper$/, '');
    if (baseName !== key) {
      contextComponents.set(baseName, component);
    }
  }
});

export function render(
  component: () => JSX.Element,
  themeOverride?: EmpoleonThemeOverride,
  providerProps?: Omit<EmpoleonProviderProps, 'theme'>
): {
  container: Element;
  rerender: (newComponent: () => JSX.Element) => RenderResult;
} {
  const [currentComponent, setCurrentComponent] = createSignal(component);
  const finalTheme = themeOverride || {};
  const result = testingLibraryRender(() => (
    <EmpoleonProvider theme={finalTheme} env="test" {...providerProps}>
      {(() => {
        try {
          return currentComponent()();
        } catch (error) {
          // @ts-ignore
          const errorMessage = error?.message || '';
          // Extract component name from context error
          const match = errorMessage.match(/(\w+) component was not found in tree/);
          if (match) {
            const componentName = match[1];
            const ContextComponent = contextComponents.get(componentName);
            if (ContextComponent) {
              return (
                <ContextComponent>
                  {currentComponent()()}
                </ContextComponent>
              );
            }
          }
          throw error;
        }
      })()}
    </EmpoleonProvider>
  ));

  return {
    container: result.container,
    rerender: (newComponent: () => JSX.Element): RenderResult => {
      setCurrentComponent(() => newComponent);
      return result;
    }
  };
}

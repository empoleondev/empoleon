// import { createSignal, createEffect, onCleanup } from 'solid-js';
// import type { Accessor, JSX } from 'solid-js';

// function getAutoHeightDuration(height: number | string) {
//   if (!height || typeof height === 'string') return 0;
//   const constant = height / 36;
//   return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10);
// }

// export function getElementHeight(el?: HTMLElement | null) {
//   return el ? el.scrollHeight : 'auto';
// }

// interface UseCollapse {
//   opened: Accessor<boolean>;
//   transitionDuration?: number;
//   transitionTimingFunction?: string;
//   onTransitionEnd?: () => void;
// }

// export function useCollapse(props: UseCollapse) {
//   const [el, setEl] = createSignal<HTMLElement | null>(null);
//   const [height, setHeight] = createSignal<string>(props.opened() ? 'auto' : '0px');
//   const [isTransitioning, setIsTransitioning] = createSignal(false);
//   let initial = true;
//   let mutationObserver: MutationObserver | null = null;

//   const updateHeightFromContent = (node: HTMLElement) => {
//     if (props.opened() && !isTransitioning()) {
//       const newScrollHeight = node.scrollHeight;
//       const currentHeight = height();

//       // Only update if height actually changed and we're not currently transitioning
//       if (currentHeight === 'auto' || currentHeight !== `${newScrollHeight}px`) {
//         setHeight(`${newScrollHeight}px`);

//         // Force a reflow and then set back to auto to maintain responsiveness
//         requestAnimationFrame(() => {
//           if (props.opened() && !isTransitioning()) {
//             setHeight('auto');
//           }
//         });
//       }
//     }
//   };

//   const setupContentObserver = (node: HTMLElement) => {
//     if (mutationObserver) {
//       mutationObserver.disconnect();
//     }

//     mutationObserver = new MutationObserver(() => {
//       updateHeightFromContent(node);
//     });

//     // Observe changes in child elements, attributes, and subtree
//     mutationObserver.observe(node, {
//       childList: true,
//       subtree: true,
//       attributes: true,
//       attributeFilter: ['style', 'class']
//     });

//     // Also listen for transition events from nested elements
//     const handleNestedTransition = (e: TransitionEvent) => {
//       if (e.target !== node && node.contains(e.target as Node)) {
//         // A nested element finished transitioning, update our height
//         setTimeout(() => updateHeightFromContent(node), 10);
//       }
//     };

//     node.addEventListener('transitionend', handleNestedTransition);

//     onCleanup(() => {
//       node.removeEventListener('transitionend', handleNestedTransition);
//     });
//   };

//   const triggerAnimation = (opened: boolean, node: HTMLElement) => {
//     setIsTransitioning(true);

//     if (opened) {
//       setHeight('0px');
//       node.offsetHeight;

//       requestAnimationFrame(() => {
//         const fullHeight = `${node.scrollHeight}px`;
//         setHeight(fullHeight);
//       });
//     } else {
//       const currentHeight = `${node.scrollHeight}px`;
//       setHeight(currentHeight);

//       node.offsetHeight;

//       requestAnimationFrame(() => {
//         setHeight('0px');
//       });
//     }
//   };

//   createEffect(() => {
//     const opened = props.opened();
//     const node = el();

//     if (initial) {
//       if (node) {
//         setHeight(opened ? 'auto' : '0px');
//         if (opened) {
//           setupContentObserver(node);
//         }
//       }
//       initial = false;
//       return;
//     }

//     if (node) {
//       if (opened) {
//         triggerAnimation(opened, node);
//       } else {
//         if (mutationObserver) {
//           mutationObserver.disconnect();
//           mutationObserver = null;
//         }
//         triggerAnimation(opened, node);
//       }
//     } else {
//       setHeight(opened ? 'auto' : '0px');
//     }
//   });

//   function handleTransitionEnd(e: TransitionEvent) {
//     const node = el();

//     if (e.target !== node || e.propertyName !== 'height') return;

//     setIsTransitioning(false);

//     if (props.opened()) {
//       setHeight('auto');
//       if (node) {
//         setupContentObserver(node);
//       }
//     }

//     props.onTransitionEnd?.();
//   }

//   onCleanup(() => {
//     if (mutationObserver) {
//       mutationObserver.disconnect();
//     }
//   });

//   function getCollapseProps(): JSX.HTMLAttributes<HTMLDivElement> {
//     const opened = props.opened();
//     const node = el();
//     const currentHeight = height();
//     const transitioning = isTransitioning();

//     const duration = props.transitionDuration ?? getAutoHeightDuration(node?.scrollHeight || 0);
//     const timing = props.transitionTimingFunction || 'ease';
//     const shouldDisplay = opened || transitioning || currentHeight !== '0px';

//     return {
//       ref: setEl,
//       'aria-hidden': !opened,
//       onTransitionEnd: handleTransitionEnd as any,
//       style: {
//         height: currentHeight,
//         overflow: 'hidden',
//         transition: `height ${duration}ms ${timing}`,
//         display: 'block',
//         opacity: shouldDisplay ? 1 : 0,
//       },
//     };
//   }

//   return getCollapseProps;
// }

import { createSignal, createEffect, onCleanup } from 'solid-js';
import type { Accessor, JSX } from 'solid-js';

function getAutoHeightDuration(height: number | string) {
  if (!height || typeof height === 'string') return 0;
  const constant = height / 36;
  return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10);
}

export function getElementHeight(el?: HTMLElement | null) {
  return el ? el.scrollHeight : 'auto';
}

interface UseCollapse {
  opened: Accessor<boolean>;
  transitionDuration?: number;
  transitionTimingFunction?: string;
  onTransitionEnd?: () => void;
}

export function useCollapse(props: UseCollapse) {
  const [el, setEl] = createSignal<HTMLElement | null>(null);
  const [height, setHeight] = createSignal<string>(props.opened() ? 'auto' : '0px');
  const [isTransitioning, setIsTransitioning] = createSignal(false);
  let initial = true;
  let mutationObserver: MutationObserver | null = null;
  let resizeObserver: ResizeObserver | null = null;
  let parentObserver: MutationObserver | null = null;

  const updateHeightFromContent = (node: HTMLElement) => {
    if (props.opened() && !isTransitioning()) {
      const newScrollHeight = node.scrollHeight;
      const currentHeight = height();

      // Only update if height actually changed and we're not currently transitioning
      if (currentHeight === 'auto' || Math.abs(parseInt(currentHeight) - newScrollHeight) > 2) {
        // Always use pixel values, never auto during updates to prevent jumps
        setHeight(`${newScrollHeight}px`);

        // Don't set back to auto immediately - let it stay as pixel value
        // Only set to auto after a longer delay when things have settled
        setTimeout(() => {
          if (props.opened() && !isTransitioning()) {
            // Double-check the height hasn't changed before setting to auto
            const finalHeight = node.scrollHeight;
            if (Math.abs(finalHeight - newScrollHeight) <= 2) {
              setHeight('auto');
            }
          }
        }, 500); // Longer delay to ensure stability
      }
    }
  };

  const setupContentObserver = (node: HTMLElement) => {
    // Clean up existing observers
    if (mutationObserver) {
      mutationObserver.disconnect();
    }
    if (resizeObserver) {
      resizeObserver.disconnect();
    }
    if (parentObserver) {
      parentObserver.disconnect();
    }

    // Set up MutationObserver for DOM changes
    mutationObserver = new MutationObserver((mutations) => {
      // Check if any mutations actually affect layout
      const hasLayoutMutation = mutations.some(mutation => {
        if (mutation.type === 'childList') return true;
        if (mutation.type === 'attributes') {
          const target = mutation.target as Element;
          const attrName = mutation.attributeName;
          return attrName === 'style' || attrName === 'class';
        }
        return false;
      });

      if (hasLayoutMutation) {
        // Small delay to allow DOM changes to complete
        setTimeout(() => updateHeightFromContent(node), 0);
      }
    });

    mutationObserver.observe(node, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });

    // Set up observer for sibling accordion changes
    // This helps detect when other accordions in the same container expand/collapse
    const parentElement = node.parentElement;
    if (parentElement) {
      parentObserver = new MutationObserver((mutations) => {
        let shouldUpdate = false;

        mutations.forEach(mutation => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
            const target = mutation.target as HTMLElement;
            // Check if a sibling element's height changed
            if (target !== node && parentElement.contains(target)) {
              shouldUpdate = true;
            }
          }
        });

        if (shouldUpdate) {
          setTimeout(() => updateHeightFromContent(node), 100);
        }
      });

      parentObserver.observe(parentElement, {
        attributes: true,
        subtree: true,
        attributeFilter: ['style']
      });
    }

    // Set up ResizeObserver to detect when child elements change size
    // This is crucial for nested accordions/collapsibles
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver((entries) => {
        let shouldUpdateForChild = false;
        let shouldUpdateForSibling = false;

        entries.forEach(entry => {
          const target = entry.target as HTMLElement;

          // Check if it's a direct child that changed size
          if (target !== node && node.contains(target)) {
            // Check if this is a direct child or deeply nested
            if (target.parentElement === node ||
                (target.closest('[aria-hidden]') && node.contains(target.closest('[aria-hidden]')))) {
              shouldUpdateForChild = true;
            }
          }

          // Check for sibling changes
          if (target !== node &&
              node.parentElement &&
              node.parentElement.contains(target) &&
              !node.contains(target)) {
            shouldUpdateForSibling = true;
          }
        });

        if (shouldUpdateForChild) {
          // Longer delay for child changes to avoid interrupting transitions
          setTimeout(() => updateHeightFromContent(node), 25);
        } else if (shouldUpdateForSibling && props.opened()) {
          // Even longer delay for sibling changes
          setTimeout(() => updateHeightFromContent(node), 150);
        }
      });

      // Function to observe all children recursively, including dynamically added ones
      const observeChildren = (element: Element) => {
        try {
          // @ts-ignore
          for (const child of element.children) {
            resizeObserver!.observe(child);
            observeChildren(child); // Recursively observe nested children
          }
        } catch (e) {
          // Ignore errors if observer is disconnected
        }
      };

      // Initial observation of children
      observeChildren(node);

      // Also observe sibling elements to detect when they change
      const parentElement = node.parentElement;
      if (parentElement) {
        try {
          // Observe all siblings
          // @ts-ignore
          for (const sibling of parentElement.children) {
            if (sibling !== node) {
              resizeObserver.observe(sibling);
            }
          }
        } catch (e) {
          // Ignore errors if observer is disconnected
        }
      }

      // Re-observe when new children are added via mutation observer
      const reObserveNewChildren = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach(addedNode => {
              if (addedNode.nodeType === Node.ELEMENT_NODE) {
                const element = addedNode as Element;
                try {
                  resizeObserver!.observe(element);
                  observeChildren(element);
                } catch (e) {
                  // Ignore errors if observer is disconnected
                }
              }
            });
          }
        });
      });

      reObserveNewChildren.observe(node, {
        childList: true,
        subtree: true
      });

      // Clean up the additional observer
      onCleanup(() => {
        reObserveNewChildren.disconnect();
      });
    }

    // Listen for transition events from nested elements
    const handleNestedTransition = (e: TransitionEvent) => {
      if (e.target !== node && node.contains(e.target as Node)) {
        // A nested element finished transitioning, update our height immediately
        if (e.propertyName === 'height') {
          // Use a longer delay to ensure the nested transition is fully complete
          setTimeout(() => updateHeightFromContent(node), 50);
        }
      }
    };

    // Listen for animationend events as well (some components use animations instead of transitions)
    const handleNestedAnimation = (e: AnimationEvent) => {
      if (e.target !== node && node.contains(e.target as Node)) {
        setTimeout(() => updateHeightFromContent(node), 50);
      }
    };

    node.addEventListener('transitionend', handleNestedTransition);
    node.addEventListener('animationend', handleNestedAnimation);

    onCleanup(() => {
      node.removeEventListener('transitionend', handleNestedTransition);
      node.removeEventListener('animationend', handleNestedAnimation);
    });
  };

  const triggerAnimation = (opened: boolean, node: HTMLElement) => {
    setIsTransitioning(true);

    if (opened) {
      setHeight('0px');
      node.offsetHeight;

      requestAnimationFrame(() => {
        const fullHeight = `${node.scrollHeight}px`;
        setHeight(fullHeight);
      });
    } else {
      const currentHeight = `${node.scrollHeight}px`;
      setHeight(currentHeight);

      node.offsetHeight;

      requestAnimationFrame(() => {
        setHeight('0px');
      });
    }
  };

  createEffect(() => {
    const opened = props.opened();
    const node = el();

    if (initial) {
      if (node) {
        setHeight(opened ? 'auto' : '0px');
        if (opened) {
          setupContentObserver(node);
        }
      }
      initial = false;
      return;
    }

    if (node) {
      if (opened) {
        triggerAnimation(opened, node);
      } else {
        // Clean up observers when closing
        if (mutationObserver) {
          mutationObserver.disconnect();
          mutationObserver = null;
        }
        if (resizeObserver) {
          resizeObserver.disconnect();
          resizeObserver = null;
        }
        if (parentObserver) {
          parentObserver.disconnect();
          parentObserver = null;
        }
        triggerAnimation(opened, node);
      }
    } else {
      setHeight(opened ? 'auto' : '0px');
    }
  });

  function handleTransitionEnd(e: TransitionEvent) {
    const node = el();

    if (e.target !== node || e.propertyName !== 'height') return;

    setIsTransitioning(false);

    if (props.opened()) {
      // Set to the actual measured height first, then to auto after a delay
      // @ts-ignore
      const currentScrollHeight = node.scrollHeight;
      setHeight(`${currentScrollHeight}px`);

      // Set up content observer immediately when opening
      if (node) {
        setupContentObserver(node);
      }

      // Only set to auto after things have settled and no transitions are happening
      setTimeout(() => {
        if (props.opened() && !isTransitioning()) {
          // @ts-ignore
          const finalHeight = node.scrollHeight;
          // Only set to auto if height hasn't changed significantly
          if (Math.abs(finalHeight - currentScrollHeight) <= 2) {
            setHeight('auto');
          } else {
            setHeight(`${finalHeight}px`);
          }
        }
      }, 300);
    }

    props.onTransitionEnd?.();
  }

  onCleanup(() => {
    if (mutationObserver) {
      mutationObserver.disconnect();
    }
    if (resizeObserver) {
      resizeObserver.disconnect();
    }
    if (parentObserver) {
      parentObserver.disconnect();
    }
  });

  function getCollapseProps(): JSX.HTMLAttributes<HTMLDivElement> {
    const opened = props.opened();
    const node = el();
    const currentHeight = height();
    const transitioning = isTransitioning();

    const duration = props.transitionDuration ?? getAutoHeightDuration(node?.scrollHeight || 0);
    const timing = props.transitionTimingFunction || 'ease';
    const shouldDisplay = opened || transitioning || currentHeight !== '0px';

    return {
      ref: setEl,
      'aria-hidden': !opened,
      onTransitionEnd: handleTransitionEnd as any,
      style: {
        height: currentHeight,
        overflow: 'hidden',
        transition: `height ${duration}ms ${timing}`,
        display: 'block',
        opacity: shouldDisplay ? 1 : 0,
      },
    };
  }

  return getCollapseProps;
}

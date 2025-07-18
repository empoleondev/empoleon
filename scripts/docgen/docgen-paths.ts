import { getPath, getPaths } from '../utils/get-path';
import { getDeclarationsPaths } from './get-declarations-paths';

const FILES_PATHS = getPaths([
  // Input
  'packages/@empoleon/core/src/components/Input/InputLabel/InputLabel.tsx',
  'packages/@empoleon/core/src/components/Input/InputWrapper/InputWrapper.tsx',
  'packages/@empoleon/core/src/components/Input/InputDescription/InputDescription.tsx',
  'packages/@empoleon/core/src/components/Input/InputError/InputError.tsx',

  // Button
  'packages/@empoleon/core/src/components/Button/ButtonGroup/ButtonGroup.tsx',

  // ActionIcon
  'packages/@empoleon/core/src/components/ActionIcon/ActionIconGroup/ActionIconGroup.tsx',

  // Popover
  'packages/@empoleon/core/src/components/Popover/PopoverTarget/PopoverTarget.tsx',
  'packages/@empoleon/core/src/components/Popover/PopoverDropdown/PopoverDropdown.tsx',

  // Slider
  'packages/@empoleon/core/src/components/Slider/Slider/Slider.tsx',
  'packages/@empoleon/core/src/components/Slider/RangeSlider/RangeSlider.tsx',

  // Switch
  'packages/@empoleon/core/src/components/Switch/SwitchGroup/SwitchGroup.tsx',

  // Checkbox
  'packages/@empoleon/core/src/components/Checkbox/CheckboxGroup/CheckboxGroup.tsx',
  'packages/@empoleon/core/src/components/Checkbox/CheckboxIndicator/CheckboxIndicator.tsx',
  'packages/@empoleon/core/src/components/Checkbox/CheckboxCard/CheckboxCard.tsx',

  // Radio
  'packages/@empoleon/core/src/components/Radio/RadioGroup/RadioGroup.tsx',
  'packages/@empoleon/core/src/components/Radio/RadioIndicator/RadioIndicator.tsx',
  'packages/@empoleon/core/src/components/Radio/RadioCard/RadioCard.tsx',

  // Tabs
  'packages/@empoleon/core/src/components/Tabs/TabsTab/TabsTab.tsx',
  'packages/@empoleon/core/src/components/Tabs/TabsList/TabsList.tsx',
  'packages/@empoleon/core/src/components/Tabs/TabsPanel/TabsPanel.tsx',

  // Accordion
  'packages/@empoleon/core/src/components/Accordion/AccordionItem/AccordionItem.tsx',
  'packages/@empoleon/core/src/components/Accordion/AccordionControl/AccordionControl.tsx',

  // Pill
  'packages/@empoleon/core/src/components/Pill/PillGroup/PillGroup.tsx',

  // PillsInput
  'packages/@empoleon/core/src/components/PillsInput/PillsInputField/PillsInputField.tsx',

  // Pagination
  'packages/@empoleon/core/src/components/Pagination/PaginationRoot/PaginationRoot.tsx',
  'packages/@empoleon/core/src/components/Pagination/PaginationItems/PaginationItems.tsx',
  'packages/@empoleon/core/src/components/Pagination/PaginationDots/PaginationDots.tsx',
  'packages/@empoleon/core/src/components/Pagination/PaginationEdges/PaginationEdges.tsx',
  'packages/@empoleon/core/src/components/Pagination/PaginationControl/PaginationControl.tsx',

  // Combobox
  'packages/@empoleon/core/src/components/Combobox/ComboboxOption/ComboboxOption.tsx',
  'packages/@empoleon/core/src/components/Combobox/ComboboxDropdown/ComboboxDropdown.tsx',
  'packages/@empoleon/core/src/components/Combobox/ComboboxTarget/ComboboxTarget.tsx',
  'packages/@empoleon/core/src/components/Combobox/ComboboxDropdownTarget/ComboboxDropdownTarget.tsx',
  'packages/@empoleon/core/src/components/Combobox/ComboboxEventsTarget/ComboboxEventsTarget.tsx',
  'packages/@empoleon/core/src/components/Combobox/ComboboxDropdown/ComboboxDropdown.tsx',
  'packages/@empoleon/core/src/components/Combobox/ComboboxGroup/ComboboxGroup.tsx',

  // AppShell
  'packages/@empoleon/core/src/components/AppShell/AppShellAside/AppShellAside.tsx',
  'packages/@empoleon/core/src/components/AppShell/AppShellNavbar/AppShellNavbar.tsx',
  'packages/@empoleon/core/src/components/AppShell/AppShellHeader/AppShellHeader.tsx',
  'packages/@empoleon/core/src/components/AppShell/AppShellFooter/AppShellFooter.tsx',
  'packages/@empoleon/core/src/components/AppShell/AppShellSection/AppShellSection.tsx',

  // Grid
  'packages/@empoleon/core/src/components/Grid/GridCol/GridCol.tsx',

  // HoverCard
  'packages/@empoleon/core/src/components/HoverCard/HoverCardTarget/HoverCardTarget.tsx',

  // Menu
  'packages/@empoleon/core/src/components/Menu/MenuItem/MenuItem.tsx',
  'packages/@empoleon/core/src/components/Menu/MenuTarget/MenuTarget.tsx',
  'packages/@empoleon/core/src/components/Menu/MenuSub/MenuSub.tsx',
  'packages/@empoleon/core/src/components/Menu/MenuSubItem/MenuSubItem.tsx',
  'packages/@empoleon/core/src/components/Menu/MenuSubTarget/MenuSubTarget.tsx',

  // Progress
  'packages/@empoleon/core/src/components/Progress/ProgressSection/ProgressSection.tsx',
  'packages/@empoleon/core/src/components/Progress/ProgressRoot/ProgressRoot.tsx',

  // Chip
  'packages/@empoleon/core/src/components/Chip/ChipGroup/ChipGroup.tsx',

  // Card
  'packages/@empoleon/core/src/components/Card/CardSection/CardSection.tsx',

  // Stepper
  'packages/@empoleon/core/src/components/Stepper/StepperStep/StepperStep.tsx',

  // Timeline
  'packages/@empoleon/core/src/components/Timeline/TimelineItem/TimelineItem.tsx',

  // List
  'packages/@empoleon/core/src/components/List/ListItem/ListItem.tsx',

  // Spotlight
  'packages/@empoleon/spotlight/src/Spotlight.tsx',
  'packages/@empoleon/spotlight/src/SpotlightAction.tsx',
  'packages/@empoleon/spotlight/src/SpotlightActionsGroup.tsx',
  'packages/@empoleon/spotlight/src/SpotlightRoot.tsx',
  'packages/@empoleon/spotlight/src/SpotlightSearch.tsx',

  // Carousel
  'packages/@empoleon/carousel/src/Carousel.tsx',

  // Dropzone
  'packages/@empoleon/dropzone/src/Dropzone.tsx',
  'packages/@empoleon/dropzone/src/DropzoneFullScreen.tsx',

  // CodeHighlight
  'packages/@empoleon/code-highlight/src/CodeHighlight/CodeHighlight.tsx',
  'packages/@empoleon/code-highlight/src/CodeHighlightTabs/CodeHighlightTabs.tsx',
  'packages/@empoleon/code-highlight/src/CodeHighlight/InlineCodeHighlight.tsx',

  // Nprogress
  'packages/@empoleon/nprogress/src/NavigationProgress.tsx',

  // Modals
  'packages/@empoleon/modals/src/ModalsProvider.tsx',

  // Tiptap
  'packages/@empoleon/tiptap/src/RichTextEditor.tsx',

  // Notifications
  'packages/@empoleon/notifications/src/Notifications.tsx',
]);

export const DOCGEN_PATHS = getDeclarationsPaths([
  { type: 'package', path: getPath('packages/@empoleon/core/src/components') },
  { type: 'package', path: getPath('packages/@empoleon/dates/src/components') },
  { type: 'package', path: getPath('packages/@empoleon/charts/src') },
  ...FILES_PATHS.map((filePath) => ({ type: 'file' as const, path: filePath })),
]);

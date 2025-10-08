import { useCombobox } from './use-combobox';

describe('@empoleon/core/Combobox/use-combobox', () => {
  it('supports uncontrolled opened state', () => {
    const hook = useCombobox({ defaultOpened: true });
    expect(hook.dropdownOpened()).toBe(true);

    hook.closeDropdown();
    expect(hook.dropdownOpened()).toBe(false);

    hook.openDropdown();
    expect(hook.dropdownOpened()).toBe(true);

    hook.toggleDropdown();
    expect(hook.dropdownOpened()).toBe(false);
  });

  it('supports controlled opened state', () => {
    const spy = vi.fn();
    const hook = useCombobox({ opened: () => true, onOpenedChange: spy });
    expect(hook.dropdownOpened()).toBe(true);

    hook.closeDropdown();
    expect(hook.dropdownOpened()).toBe(true);
    expect(spy).toHaveBeenCalledWith(false);

    hook.toggleDropdown();
    expect(hook.dropdownOpened()).toBe(true);
    expect(spy).toHaveBeenCalledWith(false);
  });

  it('calls onDropdownOpen when dropdown is opened', () => {
    const spy = vi.fn();
    const hook = useCombobox({ onDropdownOpen: spy });
    expect(spy).not.toHaveBeenCalled();

    hook.openDropdown();
    expect(spy).toHaveBeenCalled();

    hook.closeDropdown();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('calls onDropdownClose when dropdown is closed', () => {
    const spy = vi.fn();
    const hook = useCombobox({ onDropdownClose: spy });
    expect(spy).not.toHaveBeenCalled();

    hook.openDropdown();
    expect(spy).not.toHaveBeenCalled();

    hook.closeDropdown();
    expect(spy).toHaveBeenCalled();
  });
});

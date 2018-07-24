import { mount } from '@vue/test-utils';
import GroupForm from '../GroupForm.vue';
import ReplacementCardForm from '../Group/ReplacementCardForm.vue';
import TemporaryCardForm from '../Group/TemporaryCardForm.vue';

describe('GroupForm.vue', () => {
  let cmp;
  const createCmp = propsData => mount(GroupForm, { propsData });

  describe('the proper form is shown', () => {
    beforeEach(() => {
      cmp = createCmp({ });
    });

    it('shows the correct form', () => {
      expect(cmp.text()).toContain('Print Temporary ID Cards');
      expect(cmp.contains(TemporaryCardForm)).toBe(true);
      expect(cmp.contains(ReplacementCardForm)).toBe(false);
      expect(cmp.contains('a#form-toggle')).toBe(true);
      // when we click the toggle, we go to the Order Replacment cards form
      cmp.find('a#form-toggle').trigger('click');
      expect(cmp.text()).toContain('Order Replacement ID Cards');
      expect(cmp.contains(ReplacementCardForm)).toBe(true);
      expect(cmp.contains(TemporaryCardForm)).toBe(false);
      // and when we click again, we should go back to the Print form
      cmp.find('a#form-toggle').trigger('click');
      expect(cmp.text()).toContain('Print Temporary ID Cards');
      expect(cmp.contains(TemporaryCardForm)).toBe(true);
      expect(cmp.contains(ReplacementCardForm)).toBe(false);
    });
  });

  describe('replacement form handles events!', () => {
    beforeEach(() => {
      cmp = createCmp({ });
      cmp.vm.showTemporaryCardForm = false;
    });

    it('Calls handleMemberSearch when @click happens', () => {
      const stub = jest.fn();
      cmp.setMethods({ handleMemberSearch: stub });
      cmp.find(ReplacementCardForm).vm.$emit('member-search', '902218823');
      expect(stub).toBeCalledWith('902218823');
    });
  });
});

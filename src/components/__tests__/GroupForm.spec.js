import { mount } from '@vue/test-utils';
import GroupForm from '../GroupForm.vue';
import ReplacementCardForm from '../Group/ReplacementCardForm.vue';

describe('GroupForm.vue', () => {
  let cmp;
  const createCmp = propsData => mount(GroupForm, { propsData });

  describe('the proper form is shown', () => {
    beforeEach(() => {
      cmp = createCmp({ });
    });

    it('shows the temp form', () => {
      expect(cmp.text()).toContain('Print Temporary ID Cards');
    });

    it('shows the replacment form', () => {
      cmp.vm.showTemporaryCardForm = false;
      expect(cmp.text()).toContain('Replacement');
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
      cmp.update();
      cmp.find(ReplacementCardForm).vm.$emit('member-search', '902218823');
      expect(stub).toBeCalledWith('902218823');
    });
  });
});

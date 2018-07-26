import { mount } from '@vue/test-utils';
import MemberForm from '../MemberForm.vue';
import ReplacementCardForm from '../Member/ReplacementCardForm.vue';
import TemporaryCardForm from '../Member/TemporaryCardForm.vue';
import FormToggle from '../FormToggle.vue';

describe('MemberForm.vue', () => {
  let cmp;
  const createCmp = propsData => mount(MemberForm, { propsData });

  describe('the proper form is shown', () => {
    beforeEach(() => {
      cmp = createCmp({ });
    });

    it('shows the correct form', () => {
      expect(cmp.contains(TemporaryCardForm)).toBe(true);
      expect(cmp.contains(ReplacementCardForm)).toBe(false);
      expect(cmp.contains(FormToggle)).toBe(true);
      expect(cmp.contains('a#form-toggle')).toBe(true);
      // when we click the toggle, we go to the Order Replacment cards form
      cmp.find('a#form-toggle').trigger('click');
      expect(cmp.contains(ReplacementCardForm)).toBe(true);
      expect(cmp.contains(TemporaryCardForm)).toBe(true);
    });
  });

  describe('replacement form handles events!', () => {
    beforeEach(() => {
      cmp = createCmp({ });
    });

    it('Calls submit when @click happens', () => {
      // const stub = jest.fn();
      // cmp.setMethods({ handleMemberSearch: stub });
      // cmp.find(ReplacementCardForm).vm.$emit('');
      // expect(stub).toBeCalledWith('902218823');
    });
  });
});

import { mount } from '@vue/test-utils';
import ReplacementCardForm from '../ReplacementCardForm.vue';

describe('ReplacementCardForm.vue', () => {
  let cmp;
  const createCmp = propsData => mount(ReplacementCardForm, { propsData });

  describe('Events', () => {
    beforeEach(() => {
      cmp = createCmp({
      });
    });
    it('should have all fields', () => {
      expect(cmp.contains('select#idList')).toBe(true);
      expect(cmp.contains('button#orderCardsBtn')).toBe(true);
    });
    it('should emit submitted event when the order replacement button is clicked', () => {
      jest.spyOn(cmp.vm, 'orderReplacement');
      cmp.find('button#orderCardsBtn').trigger('click');
      expect(cmp.vm.orderReplacement).toBeCalled();
      expect(cmp.emitted('order-submitted')).toHaveLength(1);
    });
  });
});

// import { shallowMount } from '@vue/test-utils';
import { mount } from '@vue/test-utils';
import ReplacementCardForm from '../ReplacementCardForm.vue';
import SubscriberSearch from '../SubscriberSearch.vue';
import groupList from '../../groupList';

describe('ReplacementCardForm.vue', () => {
  let cmp;
  const createCmp = propsData => mount(ReplacementCardForm, { propsData });

  describe('form looks awesome', () => {
    beforeEach(() => {
      cmp = createCmp({
        groupList
      });
    });

    it('should include delivery message', () => {
      expect(cmp.text()).toContain('Please allow 7 to 10 working days to receive your new cards.');
    });
    it('should contain all form fields', () => {
      expect(cmp.props().groupList.length).toBe(2);
      expect(cmp.contains('select#groupid')).toBe(true);
      expect(cmp.findAll('select#groupid > option').length).toBe(3); // the options above + -Select group-
      expect(cmp.contains('input#subscriberid')).toBe(true);
      expect(cmp.contains('select#cards')).toBe(true);
      expect(cmp.findAll('select#cards > option').length).toBe(2);
      expect(cmp.contains('button#subscriberSearch')).toBe(true);
      expect(cmp.contains('button#submit')).toBe(true);
      expect(cmp.contains(SubscriberSearch)).toBe(true);
    });
  });

  describe('Events', () => {
    beforeEach(() => {
      cmp = createCmp({ groupList });
    });
    it('should display error message if form invalid', () => {
      jest.spyOn(cmp.vm, 'submitForm');
      cmp.find('button#submit').trigger('click');
      expect(cmp.vm.submitForm).toBeCalled();
      expect(cmp.emitted('order-submitted')).not.toBeDefined();
      expect(cmp.text()).toContain('Group ID is required');
      expect(cmp.text()).toContain('Subscriber ID is required');
    });
    it('should emit event on submit if form valid', () => {
      jest.spyOn(cmp.vm, 'submitForm');
      // Select a group
      cmp.findAll('#groupid > option').at(1).element.selected = true;
      cmp.find('#groupid').trigger('change');

      cmp.find('input#subscriberid').setValue('902218823');
      expect(cmp.vm.subscriberID).toBe('902218823');

      cmp.find('button#submit').trigger('click');
      expect(cmp.vm.submitForm).toBeCalled();
      expect(cmp.emitted('order-submitted').length).toBe(1);
      expect(cmp.text()).not.toContain('Group ID is required');
      expect(cmp.text()).not.toContain('Subscriber ID is required');
    });
  });
});

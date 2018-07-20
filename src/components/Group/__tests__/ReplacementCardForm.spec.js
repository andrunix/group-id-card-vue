// import { shallowMount } from '@vue/test-utils';
import { mount } from '@vue/test-utils';
import ReplacementCardForm from '../ReplacementCardForm.vue';

describe('ReplacementCardForm.vue', () => {
  let cmp;
  const createCmp = propsData => mount(ReplacementCardForm, { propsData });

  describe('form looks awesome', () => {
    beforeEach(() => {
      cmp = createCmp({
        groupList: [ { groupId: '1', groupName: 'Blah blah' }, { groupId: '2', groupName: 'Blah d Blah' } ]
      });
    });

    it('should include delivery message', () => {
      expect(cmp.text()).toContain('Please allow 7 to 10 working days to receive your new cards.');
    });
    it('should contain all form fields', () => {
      expect(cmp.props().groupList.length).toBe(2);
      expect(cmp.contains('select')).toBe(true);
      expect(cmp.findAll('select#groupid > option').length).toBe(3); // the options above + -Select group-
      expect(cmp.contains('input#subscriberid')).toBe(true);
      expect(cmp.contains('select#cards')).toBe(true);
      expect(cmp.findAll('select#cards > option').length).toBe(2);
      expect(cmp.contains('button#subscriberSearch')).toBe(true);
      expect(cmp.contains('button#submit')).toBe(true);
    });
  });

  describe('Events', () => {
    const submit = jest.fn();
    beforeEach(() => {
      cmp = createCmp({
        groupList: [ { groupId: '1', groupName: 'Blah blah' }, { groupId: '2', groupName: 'Blah d Blah' } ],
        submit
      });
    });

    it('should call submit method when submit button is clicked', () => {
      cmp.find('button#submit').trigger('click');
      expect(submit).toHaveBeenCalled();
    });
    it('should show search form when search member button is clicked', () => {
      jest.spyOn(cmp.vm, 'subscriberSearch');
      cmp.update();
      cmp.find('button#subscriberSearch').trigger('click');
      expect(cmp.vm.subscriberSearch).toBeCalled();
    });
  });
});

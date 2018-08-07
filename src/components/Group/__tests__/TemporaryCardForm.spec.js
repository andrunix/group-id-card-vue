import { mount } from '@vue/test-utils';
import TemporaryCardForm from '../TemporaryCardForm.vue';
import SubscriberSearch from '../SubscriberSearch.vue';

describe('TemporaryCardForm.vue', () => {
  let cmp;
  const groupList = [
    {
      groupID: '100000',
      groupName: 'Blah blah group',
      subgroups: [
        { id: '0001', name: 'Blah Subgroup 1' },
        { id: '0002', name: 'Blah Subgroup 2' },
        { id: '0003', name: 'Blah Subgroup 3' }
      ]
    },
    {
      groupID: '100050',
      groupName: 'Blah d Blah Group',
      subgroups: [
        { id: '0001', name: 'Blah d Subgroup 1' },
        { id: '0002', name: 'Blah d Subgroup 2' },
        { id: '0003', name: 'Blah d Subgroup 3' }
      ]
    }
  ];

  const createCmp = propsData => mount(TemporaryCardForm, { propsData });

  describe('form looks awesome', () => {
    beforeEach(() => {
      cmp = createCmp({
        groupList
      });
    });

    it('should include delivery message', () => {
      expect(cmp.text()).toContain('Temporary ID cards can be produced for a Group, Subgroup, Department, or Subscriber');
    });
    it('should contain all form fields', () => {
      expect(cmp.props().groupList.length).toBe(2);
      expect(cmp.contains('select#groupid')).toBe(true);
      expect(cmp.contains('select#subgroupid')).toBe(true);
      expect(cmp.findAll('select#groupid > option').length).toBe(3); // the options above + -Select group-
      expect(cmp.findAll('select#subgroupid > option').length).toBe(0); // empty if no group selected
      expect(cmp.contains('input#departmentid')).toBe(true);
      expect(cmp.contains('input#subscriberid')).toBe(true);
      expect(cmp.contains(SubscriberSearch)).toBe(true);
      expect(cmp.contains('button#submit')).toBe(true);

      // if the form is empty, it's not valid...
      expect(cmp.vm.formValid).toBe(false);
    });
  });

  describe('Events', () => {
    const submitForm = jest.fn();
    beforeEach(() => {
      cmp = createCmp({
        groupList,
        submitForm
      });
    });
    it('should call submit method when submit button is clicked', () => {
      jest.spyOn(cmp.vm, 'submitForm');
      cmp.findAll('select#groupid > option').at(1).element.selected = true;
      cmp.find('select#groupid').trigger('change');
      cmp.find('button#submit').trigger('click');
      expect(cmp.vm.submitForm).toBeCalled();
      expect(cmp.emitted('form-submitted').length).toBe(1);
    });

    it('should populate the subgroup list when a group is selected', () => {
      expect(cmp.vm.formData.groupID).toBe('');
      expect(cmp.vm.subgroups.length).toBe(0);
      expect(cmp.findAll('select#groupid > option').length).toBe(3); // the options above + -Select group-
      cmp.findAll('select#groupid > option').at(1).element.selected = true;
      cmp.find('select#groupid').trigger('change');
      expect(cmp.vm.formData.groupID).not.toBe('');
      expect(cmp.vm.subgroups.length).toBeGreaterThan(0);

      // at this point, with an effective date and group, the form should be 'valid'
      expect(cmp.vm.formValid).toBe(true);
    });
  });
});

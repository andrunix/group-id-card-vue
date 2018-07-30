// import { shallowMount } from '@vue/test-utils';
import { mount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import SubscriberSearch from '../SubscriberSearch.vue';
jest.mock('api');

describe('SubscriberSearch.vue', () => {
  let cmp;
  const createCmp = propsData => mount(SubscriberSearch, { propsData });

  beforeEach(() => {
    cmp = createCmp({
    });
  });

  describe('Form should be complete', () => {
    it('should have all fields', () => {
      // by default, only the search button is visible
      expect(cmp.contains('button#subscriberSearch')).toBe(true);
      expect(cmp.contains('input#searchOptionSSN')).toBe(false);
      expect(cmp.contains('input#searchOptionName')).toBe(false);
      expect(cmp.contains('input#ssn')).toBe(false);
      expect(cmp.contains('input#lastname')).toBe(false);
      expect(cmp.contains('input#firstname')).toBe(false);
      expect(cmp.contains('input#dob')).toBe(false);
      expect(cmp.contains('button#search')).toBe(false);

      // Show the form and the fields should be visible
      cmp.vm.showForm = true;
      expect(cmp.contains('button#subscriberSearch')).toBe(false);
      expect(cmp.contains('input#searchOptionSSN')).toBe(true);
      expect(cmp.contains('input#searchOptionName')).toBe(true);
      expect(cmp.contains('input#ssn')).toBe(true);
      expect(cmp.contains('input#lastname')).toBe(true);
      expect(cmp.contains('input#firstname')).toBe(true);
      expect(cmp.contains('input#dob')).toBe(true);
      expect(cmp.contains('button#search')).toBe(true);
      expect(cmp.vm.searchResults.length).toBe(0);
    });
  });

  describe('Default View Events', () => {
    it('should show search form when search member button is clicked', () => {
      jest.spyOn(cmp.vm, 'subscriberSearch');
      cmp.find('button#subscriberSearch').trigger('click');
      expect(cmp.vm.subscriberSearch).toBeCalled();
    });
  });

  describe('Show form view Events', () => {
    beforeEach(() => {
      cmp.vm.showForm = true;
    });
    it('should hide the form when cancel is clicked', () => {
      cmp.find('button#cancel').trigger('click');
      expect(cmp.vm.showForm).toBe(false);
    });

    it('should show search results when search button is clicked', async () => {
      // jest.spyOn(cmp.vm, 'handleSearch');
      cmp.find('button#search').trigger('click');
      // expect(cmp.vm.handleSearch).toBeCalled();
      await flushPromises();
      expect(cmp.vm.searchResults.length).not.toBe(0);
      expect(cmp.contains('div#search-results')).toBe(true);
    });
  });
});

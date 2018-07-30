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
      expect(cmp.find('button#search').is('[disabled]')).toBe(true);
      expect(cmp.vm.searchResults.length).toBe(0);
    });
  });

  describe('Form validity checks', () => {
    beforeEach(() => {
      cmp.vm.showForm = true;
    });

    it('should enable the search button when form is valid', () => {
      const ssn = cmp.find('input#searchOptionSSN');
      ssn.checked = true;
      ssn.trigger('change');
      cmp.find('input#ssn').setValue('322244452');
      expect(cmp.find('button#search').is('[disabled]')).toBe(false);

      const rdo = cmp.find('input#searchOptionName');
      rdo.checked = true;
      rdo.trigger('change');
      cmp.find('input#ssn').setValue('');
      expect(cmp.find('button#search').is('[disabled]')).toBe(true);
      cmp.find('input#firstname').setValue('Chris');
      cmp.find('input#lastname').setValue('Hall');
      cmp.find('input#dob').setValue('08/06/1959');
      expect(cmp.find('button#search').is('[disabled]')).toBe(false);
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

    it('should show an error message when no search results match', async () => {
      const ssn = cmp.find('input#searchOptionSSN');
      ssn.checked = true;
      ssn.trigger('change');
      cmp.find('input#ssn').setValue('456885432');
      cmp.find('button#search').trigger('click');
      await flushPromises();
      expect(cmp.text()).toContain('No subscribers found');
    });

    it('should show search results when searching by SSN', async () => {
      const ssn = cmp.find('input#searchOptionSSN');
      ssn.checked = true;
      ssn.trigger('change');
      cmp.find('input#ssn').setValue('322244452');
      cmp.find('button#search').trigger('click');
      await flushPromises();
      expect(cmp.vm.searchResults.length).not.toBe(0);
      expect(cmp.contains('div#search-results')).toBe(true);
    });
  });

  describe('Searching by Name', () => {
    beforeEach(() => {
      cmp.vm.showForm = true;
      const rdo = cmp.find('input#searchOptionName');
      rdo.checked = true;
      rdo.trigger('change');
      cmp.find('input#firstname').setValue('Chris');
      cmp.find('input#lastname').setValue('Hall');
      cmp.find('input#dob').setValue('08/06/1959');
      cmp.find('button#search').trigger('click');
    });

    it('should show search results when searching by Name', async () => {
      cmp.find('button#search').trigger('click');
      await flushPromises();
      expect(cmp.vm.searchResults.length).not.toBe(0);
      expect(cmp.contains('div#search-results')).toBe(true);
    });

    it('should raise an event with the selected subscriber id', async () => {
      cmp.find('button#search').trigger('click');
      await flushPromises();
      expect(cmp.vm.searchResults.length).not.toBe(0);
      expect(cmp.contains('div#search-results')).toBe(true);

      jest.spyOn(cmp.vm, 'handleSubscriberSelected');
      // get the first link and click it
      cmp.findAll('#results-table > tbody > tr > td > a').at(0).trigger('click');
      expect(cmp.vm.handleSubscriberSelected).toBeCalled();
      expect(cmp.emitted('subscriber-selected').length).toBe(1);
      // 100 is defined in ../mocksearch.js
      expect(cmp.emitted('subscriber-selected')[0]).toEqual(['100']);
    });
  });
});

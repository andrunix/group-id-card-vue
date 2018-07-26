import { mount } from '@vue/test-utils';
import TemporaryCardForm from '../TemporaryCardForm.vue';

describe('TemporaryCardForm.vue', () => {
  let cmp;
  const createCmp = propsData => mount(TemporaryCardForm, { propsData });

  describe('form looks awesome', () => {
    beforeEach(() => {
      cmp = createCmp();
    });

    it('should contain all form fields', () => {
      expect(cmp.contains('input#dateSelectionRadioToday')).toBe(true);
      expect(cmp.contains('input#dateSelectionRadio')).toBe(true);
      expect(cmp.contains('input#benefitEffectiveDate')).toBe(true);
      expect(cmp.contains('button#download')).toBe(true);

      expect(cmp.find('input#benefitEffectiveDate').is('[disabled]')).toBe(true);
      const futureRadio = cmp.find('input#dateSelectionRadio');
      futureRadio.checked = true;
      futureRadio.trigger('change');
      expect(cmp.find('input#benefitEffectiveDate').is('[disabled]')).toBe(false);
      // if the form is empty, it's not valid...
      // expect(cmp.vm.formValid).toBe(false);
    });
  });

  describe('Events', () => {
    beforeEach(() => {
      cmp = createCmp({
      });
    });
    it('should download a PDF when the download button is clicked', () => {
      jest.spyOn(cmp.vm, 'downloadPdf');
      cmp.find('button#download').trigger('click');
      expect(cmp.vm.downloadPdf).toBeCalled();
    });

    // it('should display error message if form invalid', () => {
    //   cmp.find('button#submit').trigger('click');
    //   expect(cmp.text()).toContain('Group ID is required');
    // });
  });
});

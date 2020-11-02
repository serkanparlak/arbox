import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class ArbCommentComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-arb-comment-my-suffix div table .btn-danger'));
  title = element.all(by.css('jhi-arb-comment-my-suffix div h2#page-heading span')).first();

  async clickOnCreateButton(timeout?: number) {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(timeout?: number) {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class ArbCommentUpdatePage {
  pageTitle = element(by.id('jhi-arb-comment-my-suffix-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  dateInput = element(by.id('field_date'));
  contentInput = element(by.id('field_content'));
  isSolutionInput = element(by.id('field_isSolution'));
  ticketSelect = element(by.id('field_ticket'));
  ownerSelect = element(by.id('field_owner'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setDateInput(date) {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput() {
    return await this.dateInput.getAttribute('value');
  }

  async setContentInput(content) {
    await this.contentInput.sendKeys(content);
  }

  async getContentInput() {
    return await this.contentInput.getAttribute('value');
  }

  getIsSolutionInput(timeout?: number) {
    return this.isSolutionInput;
  }

  async ticketSelectLastOption(timeout?: number) {
    await this.ticketSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async ticketSelectOption(option) {
    await this.ticketSelect.sendKeys(option);
  }

  getTicketSelect(): ElementFinder {
    return this.ticketSelect;
  }

  async getTicketSelectedOption() {
    return await this.ticketSelect.element(by.css('option:checked')).getText();
  }

  async ownerSelectLastOption(timeout?: number) {
    await this.ownerSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async ownerSelectOption(option) {
    await this.ownerSelect.sendKeys(option);
  }

  getOwnerSelect(): ElementFinder {
    return this.ownerSelect;
  }

  async getOwnerSelectedOption() {
    return await this.ownerSelect.element(by.css('option:checked')).getText();
  }

  async save(timeout?: number) {
    await this.saveButton.click();
  }

  async cancel(timeout?: number) {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class ArbCommentDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-arbComment-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-arbComment'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}

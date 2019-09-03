import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class ArbTicketComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-arb-ticket-my-suffix div table .btn-danger'));
  title = element.all(by.css('jhi-arb-ticket-my-suffix div h2#page-heading span')).first();

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

export class ArbTicketUpdatePage {
  pageTitle = element(by.id('jhi-arb-ticket-my-suffix-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  prioritySelect = element(by.id('field_priority'));
  stateInput = element(by.id('field_state'));
  subjectInput = element(by.id('field_subject'));
  descriptionInput = element(by.id('field_description'));
  dateInput = element(by.id('field_date'));
  ownerSelect = element(by.id('field_owner'));
  assigneeSelect = element(by.id('field_assignee'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setPrioritySelect(priority) {
    await this.prioritySelect.sendKeys(priority);
  }

  async getPrioritySelect() {
    return await this.prioritySelect.element(by.css('option:checked')).getText();
  }

  async prioritySelectLastOption(timeout?: number) {
    await this.prioritySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  getStateInput(timeout?: number) {
    return this.stateInput;
  }
  async setSubjectInput(subject) {
    await this.subjectInput.sendKeys(subject);
  }

  async getSubjectInput() {
    return await this.subjectInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return await this.descriptionInput.getAttribute('value');
  }

  async setDateInput(date) {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput() {
    return await this.dateInput.getAttribute('value');
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

  async assigneeSelectLastOption(timeout?: number) {
    await this.assigneeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async assigneeSelectOption(option) {
    await this.assigneeSelect.sendKeys(option);
  }

  getAssigneeSelect(): ElementFinder {
    return this.assigneeSelect;
  }

  async getAssigneeSelectedOption() {
    return await this.assigneeSelect.element(by.css('option:checked')).getText();
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

export class ArbTicketDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-arbTicket-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-arbTicket'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}

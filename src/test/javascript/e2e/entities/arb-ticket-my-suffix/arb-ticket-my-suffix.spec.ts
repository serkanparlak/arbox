/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ArbTicketComponentsPage, ArbTicketDeleteDialog, ArbTicketUpdatePage } from './arb-ticket-my-suffix.page-object';

const expect = chai.expect;

describe('ArbTicket e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let arbTicketUpdatePage: ArbTicketUpdatePage;
  let arbTicketComponentsPage: ArbTicketComponentsPage;
  let arbTicketDeleteDialog: ArbTicketDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ArbTickets', async () => {
    await navBarPage.goToEntity('arb-ticket-my-suffix');
    arbTicketComponentsPage = new ArbTicketComponentsPage();
    await browser.wait(ec.visibilityOf(arbTicketComponentsPage.title), 5000);
    expect(await arbTicketComponentsPage.getTitle()).to.eq('arboxApp.arbTicket.home.title');
  });

  it('should load create ArbTicket page', async () => {
    await arbTicketComponentsPage.clickOnCreateButton();
    arbTicketUpdatePage = new ArbTicketUpdatePage();
    expect(await arbTicketUpdatePage.getPageTitle()).to.eq('arboxApp.arbTicket.home.createOrEditLabel');
    await arbTicketUpdatePage.cancel();
  });

  it('should create and save ArbTickets', async () => {
    const nbButtonsBeforeCreate = await arbTicketComponentsPage.countDeleteButtons();

    await arbTicketComponentsPage.clickOnCreateButton();
    await promise.all([
      arbTicketUpdatePage.prioritySelectLastOption(),
      arbTicketUpdatePage.setSubjectInput('subject'),
      arbTicketUpdatePage.setDescriptionInput('description'),
      arbTicketUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      arbTicketUpdatePage.ownerSelectLastOption(),
      arbTicketUpdatePage.assigneeSelectLastOption()
    ]);
    const selectedState = arbTicketUpdatePage.getStateInput();
    if (await selectedState.isSelected()) {
      await arbTicketUpdatePage.getStateInput().click();
      expect(await arbTicketUpdatePage.getStateInput().isSelected(), 'Expected state not to be selected').to.be.false;
    } else {
      await arbTicketUpdatePage.getStateInput().click();
      expect(await arbTicketUpdatePage.getStateInput().isSelected(), 'Expected state to be selected').to.be.true;
    }
    expect(await arbTicketUpdatePage.getSubjectInput()).to.eq('subject', 'Expected Subject value to be equals to subject');
    expect(await arbTicketUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
    expect(await arbTicketUpdatePage.getDateInput()).to.contain('2001-01-01T02:30', 'Expected date value to be equals to 2000-12-31');
    await arbTicketUpdatePage.save();
    expect(await arbTicketUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await arbTicketComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last ArbTicket', async () => {
    const nbButtonsBeforeDelete = await arbTicketComponentsPage.countDeleteButtons();
    await arbTicketComponentsPage.clickOnLastDeleteButton();

    arbTicketDeleteDialog = new ArbTicketDeleteDialog();
    expect(await arbTicketDeleteDialog.getDialogTitle()).to.eq('arboxApp.arbTicket.delete.question');
    await arbTicketDeleteDialog.clickOnConfirmButton();

    expect(await arbTicketComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

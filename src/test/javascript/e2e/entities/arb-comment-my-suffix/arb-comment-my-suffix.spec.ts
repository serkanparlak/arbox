/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ArbCommentComponentsPage, ArbCommentDeleteDialog, ArbCommentUpdatePage } from './arb-comment-my-suffix.page-object';

const expect = chai.expect;

describe('ArbComment e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let arbCommentUpdatePage: ArbCommentUpdatePage;
  let arbCommentComponentsPage: ArbCommentComponentsPage;
  let arbCommentDeleteDialog: ArbCommentDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ArbComments', async () => {
    await navBarPage.goToEntity('arb-comment-my-suffix');
    arbCommentComponentsPage = new ArbCommentComponentsPage();
    await browser.wait(ec.visibilityOf(arbCommentComponentsPage.title), 5000);
    expect(await arbCommentComponentsPage.getTitle()).to.eq('arboxApp.arbComment.home.title');
  });

  it('should load create ArbComment page', async () => {
    await arbCommentComponentsPage.clickOnCreateButton();
    arbCommentUpdatePage = new ArbCommentUpdatePage();
    expect(await arbCommentUpdatePage.getPageTitle()).to.eq('arboxApp.arbComment.home.createOrEditLabel');
    await arbCommentUpdatePage.cancel();
  });

  it('should create and save ArbComments', async () => {
    const nbButtonsBeforeCreate = await arbCommentComponentsPage.countDeleteButtons();

    await arbCommentComponentsPage.clickOnCreateButton();
    await promise.all([
      arbCommentUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      arbCommentUpdatePage.setContentInput('content'),
      arbCommentUpdatePage.ticketSelectLastOption(),
      arbCommentUpdatePage.ownerSelectLastOption()
    ]);
    expect(await arbCommentUpdatePage.getDateInput()).to.contain('2001-01-01T02:30', 'Expected date value to be equals to 2000-12-31');
    expect(await arbCommentUpdatePage.getContentInput()).to.eq('content', 'Expected Content value to be equals to content');
    const selectedIsSolution = arbCommentUpdatePage.getIsSolutionInput();
    if (await selectedIsSolution.isSelected()) {
      await arbCommentUpdatePage.getIsSolutionInput().click();
      expect(await arbCommentUpdatePage.getIsSolutionInput().isSelected(), 'Expected isSolution not to be selected').to.be.false;
    } else {
      await arbCommentUpdatePage.getIsSolutionInput().click();
      expect(await arbCommentUpdatePage.getIsSolutionInput().isSelected(), 'Expected isSolution to be selected').to.be.true;
    }
    await arbCommentUpdatePage.save();
    expect(await arbCommentUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await arbCommentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last ArbComment', async () => {
    const nbButtonsBeforeDelete = await arbCommentComponentsPage.countDeleteButtons();
    await arbCommentComponentsPage.clickOnLastDeleteButton();

    arbCommentDeleteDialog = new ArbCommentDeleteDialog();
    expect(await arbCommentDeleteDialog.getDialogTitle()).to.eq('arboxApp.arbComment.delete.question');
    await arbCommentDeleteDialog.clickOnConfirmButton();

    expect(await arbCommentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

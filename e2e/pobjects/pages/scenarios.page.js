var ScenariosPage = function () {

    this.pageHeader = $('#page-title');
    this.createNewScenarioButton = $("button[href='#/scenarios/create-editor']");

    this.get = () => {
        browser.get(browser.baseUrl + 'scenarios');
    };
};
module.exports = ScenariosPage;

var ScenariosPage = require('../pobjects/pages/scenarios.page.js');
var NavWidget = require('../pobjects/widgets/nav.widget.js');

describe('Scenarios Page Test', () => {
    var scenariosPage = new ScenariosPage();
    var navWidget = new NavWidget();

    beforeEach(() => {
        scenariosPage.get();
    });

    it('should check page title and header name', () => {
        expect(browser.getTitle()).toEqual('Smart Home');
        expect(scenariosPage.pageHeader.getText()).toEqual('Scenario list');
    });

    it('should check page brand logo', () => {
        expect(navWidget.brandLogo.getText()).toEqual('Smart House');
    });

    it('should check page links names', () => {
        expect(navWidget.dashboardLink.getText()).toEqual('Dashboard');
        expect(navWidget.devicesLink.getText()).toEqual('Devices');
        expect(navWidget.scenariosLink.getText()).toEqual('Scenarios');
    });

    it('should check Create New Scenario button is present', () => {
        expect(scenariosPage.createNewScenarioButton.isPresent()).toBe(true);
    });
});

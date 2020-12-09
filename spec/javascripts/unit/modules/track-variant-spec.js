describe('Test variant tracker', function() {
  "use strict";

  var tracker,
    element,
    cookielessTracker,
    FakeCookielessTracker,
    gaSpy;
    // window;

  // var GOVUK = window.GOVUK

  beforeEach(function() {
    gaSpy = jasmine.createSpyObj('initGa', ['send']);
    // var mySpy = jasmine.createSpyObj('initCookielessTracker', ['trackEvent']);

    var createCookielessTracker = function(trackingId, fieldsObject) {
      mySpy(trackingId, fieldsObject);
    }

    FakeCookielessTracker = function(trackingId, fieldsObject) {}
    FakeCookielessTracker.prototype.trackEvent = function(category, action, options) {
      gaSpy.send(category, action, options);
    }

    // GOVUK.Modules.CookielessTracker.prototype.constructor = function() {}
    // GOVUK.Modules.CookielessTracker.prototype.trackEvent = function(category, action) {}
    // cookielessTracker = jasmine.createSpyObj('cookielessTracker', ['trackEvent']);
    // cookielessTracker = jasmine.createSpy('cookielessTracker')
    // cookielessTracker = jasmine.createSpy('cookielessTracker')
    GOVUK.Modules.CookielessTracker = FakeCookielessTracker;

    // window = {};
    // window.ga = function () {}
    // GOVUK.CookielessTracker.trackEvent = function() {}

    // GOVUK.CookielessTracker = {
    //
    //   trackEvent: function() {},
    //   configureProfile: function() {}
    // };
    tracker = new GOVUK.Modules.TrackVariant();
  });

  afterEach(function() {
    // delete window.ga;
  });

  it('tracks variants', function() {
    // spyOn(FakeCookielessTracker, 'trackEvent')

    element = $('<meta data-variant="A" data-module="track-variant">');

    tracker.start(element);

    expect(gaSpy.send).toHaveBeenCalledWith('cookieless', 'hit', {
      trackerName: 'CookielessTracker',
      label: 'A',
      javaEnabled: false,
      language: ''
    });
  });
});

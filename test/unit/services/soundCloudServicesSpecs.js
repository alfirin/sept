'use strict';

describe('Sound Cloud Services', function () {
  beforeEach(module('septWebRadioApp', 'mockedGetInitApplication'));

  var $httpBackend, $cookieStore, q, scope;

  beforeEach(inject(function ($rootScope, _$httpBackend_, _$cookieStore_, $q) {
    scope = $rootScope.$new();
    $httpBackend = _$httpBackend_;
    $cookieStore = _$cookieStore_;
    q = $q;
  }));

  function callDeferred(deferred, scope, resolve) {
    // Resolve the promise
    deferred.resolve(resolve);
    scope.$apply();
  }

  describe('soundCloudServices', function () {

    var soundCloudServices;

    beforeEach(inject(function (_soundCloudServices_) {
      soundCloudServices = _soundCloudServices_;
    }));

    it('should init the variables', inject(function () {
      expect(soundCloudServices.soundCloudUser).toBeUndefined();
      expect(soundCloudServices.soundCloudToken).toBeUndefined();
      expect(soundCloudServices.meDeferred).toBeUndefined();
    }));


    describe('getUser', function () {
      afterEach(function () {
        soundCloudServices.soundCloudUser = undefined;
      });

      it('should return undefined', inject(function () {
        soundCloudServices.soundCloudUser = undefined;
        expect(soundCloudServices.getUser()).toBeUndefined();
      }));

      it('should return an user', inject(function () {
        var mockUser = {user: 'User Name'};
        soundCloudServices.soundCloudUser = mockUser;
        expect(soundCloudServices.getUser()).toBe(mockUser);
      }));
    });


    describe('isConnected', function () {
      afterEach(function () {
        soundCloudServices.soundCloudUser = undefined;
      });

      it('should return a user', inject(function () {
        soundCloudServices.soundCloudUser = undefined;
        expect(soundCloudServices.isConnected()).toBeFalsy();
      }));

      it('should return Log Out', inject(function () {
        soundCloudServices.soundCloudUser = {user: 'User Name'};
        expect(soundCloudServices.isConnected()).toBeTruthy();
      }));
    });


    describe('logIn', function () {
      afterEach(function () {
        soundCloudServices.soundCloudUser = undefined;
      });

      it('should call SC.connect method', inject(function () {
        spyOn(SC, 'connect').andCallThrough();
        expect(SC.connect).not.toHaveBeenCalled();

        soundCloudServices.logIn();

        expect(SC.connect).toHaveBeenCalled();
      }));

      it('should set the token', inject(function () {
        var token = 'fgdfg623gdf';
        spyOn(SC, 'accessToken').andReturn(token);
        spyOn(SC, 'connect').andCallFake(function (callback) {
          callback();
        });

        expect(soundCloudServices.soundCloudToken).toBeUndefined();

        soundCloudServices.logIn();

        expect(soundCloudServices.soundCloudToken).toBe(token);
      }));

      it('should set the cookie SC_Token', inject(function () {
        var token = 'fgdfg623gdf';
        spyOn(SC, 'accessToken').andReturn(token);
        spyOn(SC, 'connect').andCallFake(function (callback) {
          callback();
        });

        var tokenFromCookie = $cookieStore.get('SC_Token');

        expect(tokenFromCookie).toBeUndefined();

        soundCloudServices.logIn();

        tokenFromCookie = $cookieStore.get('SC_Token');

        expect(tokenFromCookie).toBe(token);
      }));

      it('should not call the me method', inject(function () {
        spyOn(SC, 'connect').andCallThrough();
        spyOn(soundCloudServices, 'me').andCallThrough();

        expect(soundCloudServices.me).not.toHaveBeenCalled();

        soundCloudServices.logIn();

        // Just apply the resolve called
        scope.$apply();

        expect(soundCloudServices.me).not.toHaveBeenCalled();
      }));

      it('should call the me method', inject(function () {
        spyOn(SC, 'connect').andCallFake(function (callback) {
          callback();
        });

        spyOn(soundCloudServices, 'me').andCallThrough();

        expect(soundCloudServices.me).not.toHaveBeenCalled();

        soundCloudServices.logIn();

        // Just apply the resolve called
        scope.$apply();

        expect(soundCloudServices.me).toHaveBeenCalled();
      }));
    });


    describe('logOut', function () {
      var mockToken, mockUser;

      beforeEach(function () {
        mockToken = 'fdfdfsfdsfd';
        mockUser = {user: 'UserName'};

        $cookieStore.put('SC_Token', mockToken);
        $cookieStore.put('SC_User', mockUser);

        soundCloudServices.soundCloudToken = mockToken;
        soundCloudServices.soundCloudUser = mockUser;
      });

      afterEach(function () {
        $cookieStore.remove('SC_Token');
        $cookieStore.remove('SC_User');

        soundCloudServices.soundCloudToken = undefined;
        soundCloudServices.soundCloudUser = undefined;
      });


      it('should remove all the cookies', inject(function () {
        var token = $cookieStore.get('SC_Token');
        var user = $cookieStore.get('SC_User');

        expect(token).toEqual(mockToken);
        expect(user).toEqual(mockUser);

        soundCloudServices.logOut();

        token = $cookieStore.get('SC_Token');
        user = $cookieStore.get('SC_User');

        expect(token).toBeUndefined();
        expect(user).toBeUndefined();
      }));

      it('should set the variables to undefined', inject(function () {
        var token = $cookieStore.get('SC_Token');
        var user = $cookieStore.get('SC_User');

        expect(soundCloudServices.soundCloudToken).toEqual(mockToken);
        expect(soundCloudServices.soundCloudUser).toEqual(mockUser);

        soundCloudServices.logOut();

        expect(soundCloudServices.soundCloudToken).toBeUndefined();
        expect(soundCloudServices.soundCloudUser).toBeUndefined();
      }));
    });


    describe('me', function () {
      afterEach(function () {
        soundCloudServices.soundCloudUser = undefined;
      });

      describe('meCallBack', function () {
        it('should set the user inside the session and the service', inject(function () {
          var mockUser = {user: 'User Name'};

          soundCloudServices.me();

          soundCloudServices.meCallBack(mockUser);

          expect(soundCloudServices.soundCloudUser).toBe(mockUser);

          var newUserFromCookie = $cookieStore.get('SC_User');
          expect(newUserFromCookie).toEqual(mockUser);
        }));


        it('should call the deferred method with the new user', inject(function () {
          var mockUser = {user: 'User Name'};

          soundCloudServices.me();

          spyOn(soundCloudServices.meDeferred, 'resolve');

          soundCloudServices.meCallBack(mockUser);

          expect(soundCloudServices.meDeferred.resolve).toHaveBeenCalledWith(mockUser);
        }));
      });
    });

    describe('getTracks', function () {

      it('should create the correct array and call the SC.get method', inject(function () {
        var trackIds = [1, 2, 3];
        var trackIdsStr = trackIds.join(',');

        spyOn(SC, 'get');
        expect(SC.get).not.toHaveBeenCalled();
        soundCloudServices.getTracks(trackIds);
        expect(SC.get).toHaveBeenCalledWith('/tracks', { ids: trackIdsStr }, soundCloudServices.getTracksCallBack);
      }));

      describe('getTracksCallBack', function () {
        it('should call the resolve with the correct result', inject(function () {
          var tracks = [
            {track: 1},
            {track: 2}
          ];
          var promise = soundCloudServices.getTracks([1, 2, 3]);

          spyOn(soundCloudServices.getTracksDeferred, 'resolve');
          expect(soundCloudServices.getTracksDeferred.resolve).not.toHaveBeenCalled();

          soundCloudServices.getTracksCallBack(tracks);
          expect(soundCloudServices.getTracksDeferred.resolve).toHaveBeenCalledWith(tracks);
        }));
      });

      it('should resolve the promise with the correct response', inject(function () {
        var tracks = [
          {track: 1},
          {track: 2}
        ];
        var promise = soundCloudServices.getTracks([1, 2, 3]);

        promise.then(function (response) {
          expect(response).toBe(tracks);
        });
        callDeferred(soundCloudServices.getTracksDeferred, scope, tracks);
      }));
    });
  });
});
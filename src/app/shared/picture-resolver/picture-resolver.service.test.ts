import { PictureResolverService } from './picture-resolver.service';

describe('PictureResolverService', () => {
    const fileUrl = 'fileUrl';
    const response = {};

    let sut;
    let http;
    let result;
    let filesService;
    let requestOptions;

    beforeEach(() => {

        http = {
            get: jasmine.createSpy('get').and.returnValue(response),
        };

        filesService = {
            resolveFileUrl: jasmine.createSpy('resolveFileUrl').and.returnValue('fileUrl')
        };

        requestOptions = {
            merge: jasmine.createSpy('merge').and.returnValue({url: 'some url'})
        };

        sut = new PictureResolverService(filesService, requestOptions);
    });

    describe('resolve picture upload url', () => {

        const mapView = { _id: 'pictureId' };

        beforeEach(() => {
            result = sut.resolvePictureUploadUrl(mapView);
        });

        it('should resolve file url by picture name', () => {
            expect(requestOptions.merge).toHaveBeenCalledWith({ url: `/map-view/${mapView._id}/picture` });
        });

        it('should return resolved picture url', () => {
            expect(result).toEqual('some url');
        });

    });

    describe('resolve picture url', () => {

        const mapView = { pictureName: 'pictureName' };

        beforeEach(() => {
            result = sut.resolvePictureUrl(mapView);
        });

        it('should resolve file url by picture name', () => {
            expect(filesService.resolveFileUrl).toHaveBeenCalledWith(mapView.pictureName);
        });

        it('should return resolved picture url', () => {
            expect(result).toEqual(fileUrl);
        });

    });

});

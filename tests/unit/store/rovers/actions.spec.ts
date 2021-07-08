import { api } from '@/api';
import { actions } from '@/store/modules/rovers/actions';
import { roversMutationTypesEnum } from '@/store/modules/rovers/mutations/mutation-types';
import { ROVERS_MANIFEST_FIXTURE } from './../../fixtures/rovers-manifest.fixtures';
import { ROVER_IMAGES_FIXTURE } from './../../fixtures/rover-images.fixtures';

describe('Rovers Store Module actions', () => {
  let commit: typeof jest.fn;
  let dispatch: typeof jest.fn;

  describe('[fetchRoverManifestWithStorage]', () => {
    it.todo('should take data from storage if there exists manifest');
    it.todo('should dispatch fetch manifest action if storage dosent has manifest');
  });
  describe('[fetchRoverManifest]', () => {
    it.todo('should commit succes mutations');
    it.todo('should commit error mutationsdescribe');
  });
  describe('[fetchRoverPhotos]', () => {
    it.todo('should commit succes mutations');
    it.todo('should commit error mutationsdescribe');
  });
});

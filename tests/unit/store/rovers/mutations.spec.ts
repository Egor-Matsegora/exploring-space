import { TRoversState } from '@/store/modules/rovers/types';
import { IRoverPhoto } from '@/views/Rovers/interfaces/rover-photo';
import { IRoverManifest } from '@/views/Rovers/interfaces/rover-manifest';
import { roversMutationTypesEnum } from '@/store/modules/rovers/mutations/mutation-types';
import { ROVERS_MANIFEST_FIXTURE } from '../../fixtures/rovers-manifest.fixtures';
import { ROVER_IMAGES_FIXTURE } from '../../fixtures/rover-images.fixtures';
import { mutations } from '@/store/modules/rovers/mutations';

describe('Rovers store module mutations', () => {
  const INITIAL_STATE: TRoversState = {
    activeRover: '',
    manifestLoading: false,
    imagesLoading: false,
    roverManifest: null,
    roverPhotos: [],
    page: 1,
    error: null,
  };
  const MOCKED_ERROR = new Error('its a mocked error');

  const setStateConfig = (config: Partial<TRoversState> = {}): TRoversState => ({
    ...INITIAL_STATE,
    ...config,
  });

  it('[roversMutationTypesEnum.SET_ACTIVE_ROVER] should set active rover name to state', () => {
    const MOCK_ACTIVE_ROVER_NAME = 'mockedrover';
    const MOCKED_STATE = setStateConfig();

    mutations[roversMutationTypesEnum.SET_ACTIVE_ROVER](MOCKED_STATE, MOCK_ACTIVE_ROVER_NAME);

    expect(MOCKED_STATE.activeRover).toBe(MOCK_ACTIVE_ROVER_NAME);
  });

  it('[roversMutationTypesEnum.FILL_ROVER_MANIFEST] should change manifest loading flag to true', () => {
    const MOCKED_STATE = setStateConfig();

    mutations[roversMutationTypesEnum.FILL_ROVER_MANIFEST](MOCKED_STATE);

    expect(MOCKED_STATE.manifestLoading).toBeTruthy();
  });

  it('[roversMutationTypesEnum.FILL_ROVER_MANIFEST_SUCCESS] should add rovers manifest to state and change manifest loading flag to false and reset error', () => {
    const MOCKED_STATE = setStateConfig({ error: MOCKED_ERROR, manifestLoading: true });
    const MOCKED_MANIFEST = ROVERS_MANIFEST_FIXTURE;

    mutations[roversMutationTypesEnum.FILL_ROVER_MANIFEST_SUCCESS](MOCKED_STATE, MOCKED_MANIFEST);

    expect(MOCKED_STATE.manifestLoading).toBeFalsy();
    expect(MOCKED_STATE.error).toBeNull();
    expect(MOCKED_STATE.roverManifest).toBe(MOCKED_MANIFEST);
  });

  it('[roversMutationTypesEnum.FILL_ROVER_MANIFEST_ERROR] should add error and reset manifest loading and maifest data', () => {
    const MOCKED_STATE = setStateConfig({
      manifestLoading: true,
      roverManifest: ROVERS_MANIFEST_FIXTURE as IRoverManifest,
    });

    mutations[roversMutationTypesEnum.FILL_ROVER_MANIFEST_ERROR](MOCKED_STATE, MOCKED_ERROR);

    expect(MOCKED_STATE.roverManifest).toBeNull();
    expect(MOCKED_STATE.manifestLoading).toBeFalsy();
    expect(MOCKED_STATE.error).toBe(MOCKED_ERROR);
  });

  it('[roversMutationTypesEnum.FILL_ROVER_IMAGES] should change image loading flag', () => {
    const MOCKED_STATE = setStateConfig();

    mutations[roversMutationTypesEnum.FILL_ROVER_IMAGES](MOCKED_STATE);

    expect(MOCKED_STATE.imagesLoading).toBeTruthy();
  });

  it('[roversMutationTypesEnum.FILL_ROVER_IMAGES_SUCCESS] should add images data and reset images loading and error', () => {
    const MOCKED_STATE = setStateConfig({
      error: MOCKED_ERROR,
      imagesLoading: true,
    });

    mutations[roversMutationTypesEnum.FILL_ROVER_IMAGES_SUCCESS](MOCKED_STATE, ROVER_IMAGES_FIXTURE.photos);

    expect(MOCKED_STATE.imagesLoading).toBeFalsy();
    expect(MOCKED_STATE.error).toBeNull();
    expect(MOCKED_STATE.roverPhotos).toBe(ROVER_IMAGES_FIXTURE.photos);
  });

  it('[roversMutationTypesEnum.FILL_ROVER_IMAGES_ERROR] should add error and reset images loading and images data', () => {
    const MOCKED_STATE = setStateConfig({
      roverPhotos: ROVER_IMAGES_FIXTURE.photos as IRoverPhoto[],
      imagesLoading: true,
    });

    mutations[roversMutationTypesEnum.FILL_ROVER_IMAGES_ERROR](MOCKED_STATE, MOCKED_ERROR);

    expect(MOCKED_STATE.roverPhotos).toStrictEqual([]);
    expect(MOCKED_STATE.imagesLoading).toBeFalsy();
    expect(MOCKED_STATE.error).toBe(MOCKED_ERROR);
  });

  it('[roversMutationTypesEnum.SET_PAGE] should set page', () => {
    const MOCKED_STATE = setStateConfig();
    const MOCKED_PAGE = 2;

    mutations[roversMutationTypesEnum.SET_PAGE](MOCKED_STATE, MOCKED_PAGE);

    expect(MOCKED_STATE.page).toBe(MOCKED_PAGE);
  });
});

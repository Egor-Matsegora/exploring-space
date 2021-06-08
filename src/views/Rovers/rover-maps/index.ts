import { CamerasEnum } from './../enums/cameras-enum';
import { RoversEnum } from './../enums/rovers-enum';

export const roverMap: Readonly<Array<Readonly<{ [Value in RoversEnum]?: Array<string> }>>> = [
  {
    [RoversEnum.CURIOSITY]: [
      CamerasEnum.FRONT_HAZARD_AVOIDANCE_CAMERA,
      CamerasEnum.REAR_HAZARD_AVIODANCE_CAMERA,
      CamerasEnum.MAST_CAMERA,
      CamerasEnum.CHEMISTRY_AND_CAMERA_COMPLEX,
      CamerasEnum.MARS_HAND_LENS_IMAGER,
      CamerasEnum.MARS_DESERT_IMAGER,
      CamerasEnum.NAVIGATION_CAMERA,
    ],
  },
  {
    [RoversEnum.OPPORTUNITY]: [
      CamerasEnum.FRONT_HAZARD_AVOIDANCE_CAMERA,
      CamerasEnum.REAR_HAZARD_AVIODANCE_CAMERA,
      CamerasEnum.NAVIGATION_CAMERA,
      CamerasEnum.PANORAMIC_CAMERA,
      CamerasEnum.MINIATURE_TERMINAL_EMISSION_SPECTROMETER,
    ],
  },
  {
    [RoversEnum.SPIRIT]: [
      CamerasEnum.FRONT_HAZARD_AVOIDANCE_CAMERA,
      CamerasEnum.REAR_HAZARD_AVIODANCE_CAMERA,
      CamerasEnum.NAVIGATION_CAMERA,
      CamerasEnum.PANORAMIC_CAMERA,
      CamerasEnum.MINIATURE_TERMINAL_EMISSION_SPECTROMETER,
    ],
  },
];

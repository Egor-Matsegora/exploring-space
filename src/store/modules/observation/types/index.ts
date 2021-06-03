export type TObservationState = {
  observationImageData?: string | null,
  notExistsMessage?: string,
  observationLoading: boolean,
  observationError: unknown,
}

export type TObservationNotExistsResponse = {
    msg: string,
    service_version: string,
  }


export type TObservationImageResponse = TObservationNotExistsResponse | string | never
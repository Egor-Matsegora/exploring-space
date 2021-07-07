export const ROVERS_MANIFEST_FIXTURE = {
  photo_manifest: {
    name: 'Spirit',
    landing_date: '2004-01-04',
    launch_date: '2003-06-10',
    status: 'complete',
    max_sol: 2208,
    max_date: '2004-01-06',
    total_photos: 202,
    photos: [
      { sol: 1, earth_date: '2004-01-05', total_photos: 77, cameras: ['ENTRY', 'FHAZ', 'NAVCAM', 'PANCAM', 'RHAZ'] },
      { sol: 2, earth_date: '2004-01-06', total_photos: 125, cameras: ['MINITES', 'NAVCAM', 'PANCAM'] },
    ],
  },
};

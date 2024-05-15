import {createClient} from '@sanity/client'

export const client = createClient({
  projectId: "1un6ew91",
  dataset: "production",
  useCdn: true,
  apiVersion: "2022-03-07"
})

export const writeClient = createClient({
  projectId: "1un6ew91",
  dataset: "production",
  useCdn: false,
  apiVersion: "2022-03-07",
  token: "skLessNbydKNBA0QsRiDJ0QN0HT9q5TkWVEFgIcd3GpfmMISD59E70pVkym5k6Jgm4Cg86PrZMOwxBLNPGvyCSOIVm7V3U60fVvnFr9Qk7IzP5H3Vomn2fLh8s0egVAU4po4GXr87jsbQQsMcfVRmkz3Y6fAbwEShqnaeETSLa1qPnPf9APc"
})
import {createClient} from '@sanity/client'

export const client = createClient({
  projectId: "1un6ew91",
  dataset: "production",
  useCdn: true,
  apiVersion: "2022-03-07"
})


import configPromise from '@payload-config'
import { getPayloadHMR as getPayloadInstance } from '@payloadcms/next/utilities'

export async function getPayload(): ReturnType<typeof getPayloadInstance> {
  return getPayloadInstance({ config: await configPromise })
}

import { getProviders } from '@/lib/services/providers/providers.services'
import ProvidersCarousel from '../design-layout/ProvidersCarousel'

export default async function GetProviders() {
    const result = await getProviders()
    const providers = result.success ? result.data : []
  return (
    <ProvidersCarousel providers={providers} />
  )
}

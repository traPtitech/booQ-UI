import type { Ref } from 'vue'
import { computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getFirstParam } from '/@/lib/params'

const useSyncParam = (paramName: string, sourceRef: Ref<string>): void => {
  const router = useRouter()
  const route = useRoute()

  const param = computed(
    () => getFirstParam(route.query?.[paramName] ?? '') ?? ''
  )

  watch(
    [param, sourceRef] as const,
    ([newParam, newSource], [oldParam, oldSource]) => {
      if (newParam === oldParam) {
        router.replace({
          query: {
            ...route.query,
            [paramName]: newSource !== '' ? newSource : undefined
          }
        })
        return
      }
      if (newSource === oldSource) {
        sourceRef.value = newParam
        return
      }
    }
  )
}

export default useSyncParam

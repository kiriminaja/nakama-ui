import { defu } from 'defu'
import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  installModule,
  hasNuxtModule,
  addComponentsDir,
  addImportsDir
} from '@nuxt/kit'
import { name, version } from '../package.json'
import { defaultOptions } from './defaults'

export interface ModuleOptions {
  prefix?: string
  coloMode?: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    docs: 'https://github.com/kiriminaja/nakama-ui',
    configKey: 'nakama',
    compatibility: {
      nuxt: '>=3.16.0'
    }
  },
  // Default configuration options of the Nuxt module
  defaults: defaultOptions,
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    async function registerModule(
      name: string,
      key: string,
      options: Record<string, any>
    ) {
      if (!hasNuxtModule(name)) {
        await installModule(name, options)
      } else {
        ;(nuxt.options as any)[key] = defu((nuxt.options as any)[key], options)
      }
    }

    await registerModule('@nuxt/icon', 'icon', {
      cssLayer: 'components'
    })

    addPlugin(resolve('./runtime/plugin'))

    addComponentsDir({
      path: resolve('./runtime/components'),
      prefix: options.prefix,
      pathPrefix: false
    })

    addImportsDir(resolve('./runtime/composables'))
  }
})

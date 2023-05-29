import { Context, Schema, useColorMode, useConfig } from '@koishijs/client'

declare module '@koishijs/client' {
  interface Config {
    martin: {
      enabled: boolean
    }
  }
}

export default function (ctx: Context) {
  const config = useConfig()
  const mode = useColorMode()

  ctx.on('ready', () => {
    if (config.value.martin?.enabled === false) return
    const suffix = '-' + mode.value
    const current = config.value.theme[mode.value]
    const themes = Object
      .keys(ctx.internal.themes)
      .filter(name => name.endsWith(suffix) && name !== current)
    config.value.theme[mode.value] = themes[Math.floor(Math.random() * themes.length)]
  })

  ctx.settings({
    id: 'appearance',
    schema: Schema.object({
      martin: Schema.object({
        enabled: Schema.boolean().description('启用主题随机切换。').default(true),
      }).description('马丁的早晨'),
    }),
  })
}

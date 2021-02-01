import { Plugin, DefineComponent } from 'vue'

declare module 'v-calendar' {
  export const DatePicker:
    | Exclude<Plugin['install'], undefined>
    | DefineComponent
}

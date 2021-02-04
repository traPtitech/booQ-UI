import { Plugin, DefineComponent } from 'vue'

// TODO: とりあえず型を書いてるだけ
declare module 'v-calendar' {
  export const DatePicker:
    | Exclude<Plugin['install'], undefined>
    | DefineComponent
}

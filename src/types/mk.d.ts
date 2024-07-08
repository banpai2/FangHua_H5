declare const mk: {
  queryUser: () => MkUser
  updateUser: (user: MkUser) => void
  getAreaColumns: () => Promise<AreaColumns>
  pickerPhoto: () => string
  pickerCamera: () => string
  vibrator: () => MkUser
}
// 区域数据
declare interface AreaColumns {
  province_list: Record<number, string>
  city_list: Record<number, string>
  county_list: Record<number, string>
}

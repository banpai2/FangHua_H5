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
// 用户信息
declare interface ProfileInfo {
  account: string
  avatar: string
  birthday: string
  fullLocation: string
  gender: '男' | '女' | '未知'
  id: string
  nickname: string
  profession: string
}
// 通用返回值类型
declare interface MkResponse<T> {
  code: number
  message: string
  result: T
}
// mk.queryUser 的返回值类型
declare interface MkUser {
  token: string
  nickname: string
  avatar: string
  account: string
}

declare const mk: {
  queryUser: () => MkUser
  updateUser: (user: MkUser) => void
  getAreaColumns: () => Promise<AreaColumns>
  pickerPhoto: () => string
  pickerCamera: () => string
  vibrator: () => MkUser
}

export const features = Object.freeze([
  Object.freeze({ id: 'hide', number: '01', title: 'Hide 服务', summary: '隐藏 Bootloader 解锁 / verified-boot 状态', detail: '把一组 ro.boot.* 属性伪装成已锁定 / green。' }),
  Object.freeze({ id: 'umount', number: '02', title: 'Umount 服务', summary: '开机自动卸载指定挂载点', detail: '复用内核 try-umount，并可按 App 生效。' }),
  Object.freeze({ id: 'kernel-mask', number: '03', title: '内核伪装', summary: '伪装内核版本与构建时间', detail: '改写 utsname，使 uname、/proc/version、osrelease 报告伪装值。' }),
  Object.freeze({ id: 'path-hide', number: '04', title: '路径隐藏', summary: '向指定 App 隐藏文件与目录', detail: '命中路径对目标 App 返回 ENOENT，并从目录枚举中抹去名字。' }),
  Object.freeze({ id: 'network-isolation', number: '05', title: '网络隔离', summary: '内核层阻止所选 App 联网', detail: '通过 LSM 钩子按 App 拦截外发连接。' })
]);

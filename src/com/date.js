export function formDate(e) {
  try {
    if (!(e instanceof Date)) {
      e = new Date(e);
    }
    let year = e.getFullYear();
    let month = e.getMonth() + 1;
    let date = e.getDate();
    return [year, month, date]
      .map((v) => {
        return (v + '').length > 1 ? v : '0' + v;
      })
      .join('/');
  } catch (error) {
    throw new Error(e + '必须是符合日期格式的字符串,或者时间戳,或者日期对象');
  }
}

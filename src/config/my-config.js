window.Date.prototype.formatDate = (time) => {
  const date = new Date(time)
  const hours =  date.getHours(),
        minutes =  date.getMinutes(),
        day =  date.getUTCDate(),
        month =  date.getMonth() + 1,
        year =  date.getFullYear(),
        filterTime = param => param.toString().length == 1 ? '0'+param : param
  return `${filterTime(hours)}:${filterTime(minutes)} | ${filterTime(day)}-${filterTime(month)}-${year}`
}
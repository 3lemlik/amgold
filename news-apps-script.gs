function doGet() {
  var cache = CacheService.getScriptCache();
  var v = cache.get('ff');
  if (!v) {
    var r = UrlFetchApp.fetch('https://nfs.faireconomy.media/ff_calendar_thisweek.json', { muteHttpExceptions: true });
    if (r.getResponseCode() == 200) {
      v = r.getContentText();
      if (v.length < 95000) { cache.put('ff', v, 1800); cache.put('ff_old', v, 21600); }
    } else {
      v = cache.get('ff_old') || '[]';
    }
  }
  return ContentService.createTextOutput(v).setMimeType(ContentService.MimeType.JSON);
}

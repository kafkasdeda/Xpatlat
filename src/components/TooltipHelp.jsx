export default function TooltipHelp() {
  return (
    <div className="text-sm bg-white p-4 border rounded shadow-md mt-2">
      <p><strong>#mizah</strong>: Belirli bir hashtag</p>
      <p><strong>"tam eşleşme"</strong>: Tırnak içinde tam arama</p>
      <p><strong>caps OR thread</strong>: Veya koşullu arama</p>
      <p><strong>-reklam</strong>: "reklam" kelimesini dışlar</p>
    </div>
  );
}

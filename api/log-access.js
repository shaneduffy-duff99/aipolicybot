module.exports = function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") return res.status(200).end();
  var b = req.body || {};
  console.log("ACCESS " + (b.label || "unknown") + " " + new Date().toISOString());
  return res.status(200).json({ ok: true });
};
